#!/usr/bin/env bun

/**
 * 飞书内容增量同步脚本 v2
 * 
 * 功能：
 * 1. 增量同步 - 只同步新增或修改的文档
 * 2. 智能发现 - 自动获取知识库文档列表
 * 3. 控制标记 - 飞书文档中的 sync 标记控制同步行为
 * 
 * 控制标记（在飞书文档中添加注释）：
 *   <!-- sync: false -->   不同步此文档
 *   <!-- sync: manual --> 仅手动同步
 * 
 * 使用方式：
 *   bun run src/sync/sync.ts                    # 同步所有
 *   bun run src/sync/sync.ts --check            # 仅检查，不同步
 *   bun run src/sync/sync.ts --id=xxx           # 同步指定文档
 */

import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// 知识库根 token
const WIKI_TOKEN = 'M1C1wcAdpiBAIOk54V3cSffGnAc';

interface WikiDoc {
  token: string;
  objToken: string;
  title: string;
  nodeToken: string;
  hasChild: boolean;
  updateTime: string;
}

interface SyncResult {
  id: string;
  title: string;
  status: 'synced' | 'skipped' | 'error';
  reason?: string;
}

/**
 * 执行 shell 命令
 */
function runCommand(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf-8', cwd: ROOT, maxBuffer: 10 * 1024 * 1024 });
  } catch (error: any) {
    console.error(`命令执行失败: ${cmd}`);
    if (error.stdout) console.error(error.stdout);
    return '';
  }
}

/**
 * 获取知识库中的所有文档
 */
async function getWikiDocs(wikiToken: string): Promise<WikiDoc[]> {
  console.log('📚 获取知识库文档列表...');
  
  // 先获取根节点
  const rootResult = runCommand(`lark-cli wiki spaces get_node --params '{"token": "${wikiToken}"}'`);
  const rootData = JSON.parse(rootResult);
  if (!rootData.data) {
    console.error('❌ 无法获取知识库根节点');
    return [];
  }
  
  const spaceId = rootData.data.node.space_id;
  const docs: WikiDoc[] = [];
  
  // 使用 search API 搜索知识库中的所有文档
  const searchResult = runCommand(`lark-cli docs +search --query "" --page-size 20`);
  const searchData = JSON.parse(searchResult);
  
  if (searchData.data?.results) {
    for (const item of searchData.data.results) {
      if (item.entity_type === 'WIKI' && item.result_meta?.token) {
        const nodeResult = runCommand(`lark-cli wiki spaces get_node --params '{"token": "${item.result_meta.token}"}'`);
        const nodeData = JSON.parse(nodeResult);
        
        if (nodeData.data?.node) {
          const node = nodeData.data.node;
          // 只获取属于同一知识空间的文档
          if (node.space_id === spaceId) {
            docs.push({
              token: node.node_token,
              objToken: node.obj_token,
              title: node.title,
              nodeToken: node.node_token,
              hasChild: node.has_child,
              updateTime: node.obj_edit_time,
            });
          }
        }
      }
    }
  }
  
  console.log(`✅ 发现 ${docs.length} 个文档`);
  return docs;
}

/**
 * 拉取文档内容
 */
function fetchDoc(token: string): any {
  const result = runCommand(`lark-cli docs +fetch --doc ${token} --format json`);
  try {
    return JSON.parse(result);
  } catch {
    return null;
  }
}

/**
 * 解析 sync 控制标记
 */
function parseSyncMarker(markdown: string): { shouldSync: boolean; reason: string } {
  // 检查 sync: false
  if (markdown.includes('sync: false') || markdown.includes('sync:off')) {
    return { shouldSync: false, reason: '文档标记为不同步' };
  }
  
  // 检查 sync: manual
  if (markdown.includes('sync: manual') || markdown.includes('sync:manual')) {
    return { shouldSync: false, reason: '文档标记为仅手动同步' };
  }
  
  return { shouldSync: true, reason: '' };
}

/**
 * 下载图片
 */
function downloadImage(token: string, outputPath: string): boolean {
  const cmd = `lark-cli docs +media-download --token ${token} --output ${outputPath} --overwrite`;
  const result = runCommand(cmd);
  return result.includes('"ok": true');
}

/**
 * 解析图片 token
 */
function parseImageTokens(markdown: string): string[] {
  const tokens: string[] = [];
  const regex = /<image token="([^"]+)"/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    tokens.push(match[1]);
  }
  return tokens;
}

/**
 * 转换 markdown
 */
function convertMarkdown(markdown: string, articleId: string): string {
  let converted = markdown;
  
  // 替换图片 token
  const regex = /<image token="([^"]+)"[^>]*\/?>/g;
  converted = converted.replace(regex, (match, token) => {
    const ext = token.startsWith('HX') ? 'png' : 'jpg';
    const filename = `${token.substring(0, 8)}.${ext}`;
    return `![图](./assets/images/articles/${articleId}/${filename})\n`;
  });
  
  // 清理飞书特有标签
  converted = converted
    .replace(/<callout[^>]*>/g, '')
    .replace(/<\/callout>/g, '')
    .replace(/<text[^>]*>/g, '')
    .replace(/<\/text>/g, '')
    .replace(/<mention-doc[^>]*>([^<]*)<\/mention-doc>/g, '[$1]')
    .replace(/<wiki-catalog[^>]*\/>/g, '')
    .replace(/<reference-synced[^>]*>/g, '')
    .replace(/<\/reference-synced>/g, '')
    .replace(/<!--[^>]*-->/g, ''); // 移除 HTML 注释（包括 sync 标记）
  
  return converted;
}

/**
 * 生成文件名（从标题生成 slug）
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 获取本地文件修改时间
 */
function getLocalMtime(filePath: string): number | null {
  try {
    const stats = statSync(filePath);
    return stats.mtimeMs;
  } catch {
    return null;
  }
}

/**
 * 同步单个文档
 */
async function syncDoc(wikiDoc: WikiDoc, force: boolean = false): Promise<SyncResult> {
  const result: SyncResult = { id: wikiDoc.objToken, title: wikiDoc.title, status: 'error' };
  
  // 拉取文档
  const docData = fetchDoc(wikiDoc.objToken);
  if (!docData?.ok || !docData.data) {
    result.status = 'error';
    return result;
  }
  
  const doc = docData.data;
  const markdown = doc.markdown || '';
  
  // 检查 sync 标记
  const { shouldSync, reason } = parseSyncMarker(markdown);
  if (!shouldSync) {
    console.log(`  ⏭️ 跳过: ${reason}`);
    result.status = 'skipped';
    result.reason = reason;
    return result;
  }
  
  // 生成 article ID
  const articleId = generateSlug(wikiDoc.title);
  const outputFile = join(ROOT, `src/content/articles/${articleId}.md`);
  const imgDir = join(ROOT, `src/assets/images/articles/${articleId}`);
  
  // 检查增量同步
  const localMtime = getLocalMtime(outputFile);
  const remoteTime = parseInt(wikiDoc.updateTime) * 1000; // 转换为毫秒
  
  if (!force && localMtime !== null && localMtime > remoteTime) {
    console.log(`  ⏭️ 跳过: 本 地文件较新`);
    result.status = 'skipped';
    result.reason = '本地文件较新';
    return result;
  }
  
  // 创建图片目录
  mkdirSync(imgDir, { recursive: true });
  
  // 下载图片
  const imageTokens = parseImageTokens(markdown);
  for (const token of imageTokens) {
    const ext = token.startsWith('HX') ? 'png' : 'jpg';
    const filename = `${token.substring(0, 8)}.${ext}`;
    const outputPath = `./src/assets/images/articles/${articleId}/${filename}`;
    downloadImage(token, outputPath);
  }
  
  // 生成 frontmatter
  const date = new Date(remoteTime).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // 提取摘要
  let excerpt = markdown
    .replace(/<[^>]+>/g, ' ')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, 150);
  if (excerpt.length === 150) excerpt += '...';
  
  const frontmatter = `---
id: ${articleId}
title: ${doc.title}
excerpt: ${excerpt}
category: 知识库
readTime: 5 分钟
author: 数字权利圆桌派
date: ${date}
image: ./assets/images/articles/${articleId}/cover.jpg
feishu_token: ${wikiDoc.objToken}
feishu_url: https://opendatachina.feishu.cn/wiki/${wikiDoc.token}
---

`;
  
  // 转换内容
  const content = convertMarkdown(markdown, articleId);
  
  // 写入文件
  writeFileSync(outputFile, frontmatter + content, 'utf-8');
  
  console.log(`  ✅ 已同步: ${articleId}.md`);
  result.status = 'synced';
  return result;
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const forceArg = args.find(arg => arg.startsWith('--force'));
  const force = forceArg === '--force';
  const idArg = args.find(arg => arg.startsWith('--id='));
  const targetId = idArg?.split('=')[1];
  
  console.log('🚀 飞书内容增量同步');
  console.log('='.repeat(50));
  
  if (checkOnly) {
    console.log('🔍 仅检查模式，不执行同步\n');
  }
  
  // 获取知识库文档
  const docs = await getWikiDocs(WIKI_TOKEN);
  
  if (docs.length === 0) {
    console.log('❌ 未找到文档');
    process.exit(1);
  }
  
  const results: SyncResult[] = [];
  
  for (const doc of docs) {
    // 如果指定了 --id，只处理匹配的文档
    if (targetId && !doc.title.includes(targetId) && !doc.objToken.includes(targetId)) {
      continue;
    }
    
    console.log(`\n📄 ${doc.title}`);
    console.log(`   Token: ${doc.objToken}`);
    console.log(`   更新时间: ${new Date(parseInt(doc.updateTime) * 1000).toLocaleString()}`);
    
    if (checkOnly) {
      results.push({ id: doc.objToken, title: doc.title, status: 'skipped', reason: '检查模式' });
      continue;
    }
    
    const result = await syncDoc(doc, force);
    results.push(result);
  }
  
  // 输出汇总
  console.log('\n' + '='.repeat(50));
  console.log('📊 同步结果汇总:');
  console.log(`   总计: ${results.length}`);
  console.log(`   已同步: ${results.filter(r => r.status === 'synced').length}`);
  console.log(`   跳过: ${results.filter(r => r.status === 'skipped').length}`);
  console.log(`   错误: ${results.filter(r => r.status === 'error').length}`);
  
  if (checkOnly) {
    console.log('\n💡 使用 --force 强制同步所有文档');
    console.log('   使用 --id=xxx 同步指定文档');
  }
}

main().catch(console.error);
