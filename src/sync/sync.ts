#!/usr/bin/env bun

/**
 * 飞书内容同步脚本
 * 
 * 功能：
 * 1. 从飞书拉取文档内容
 * 2. 下载文档中的图片到本地
 * 3. 将图片 token 替换为本地相对路径
 * 4. 生成 .md 文件
 * 
 * 使用方式：
 *   bun run src/sync/sync.ts              # 同步所有文档
 *   bun run src/sync/sync.ts --id xxx     # 同步指定文档
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '../..');

// 文档映射配置
const syncList = [
  {
    id: 'data-trustee-1',
    feishuToken: 'TP3HdXIb8owmPZx1o64cFQ7PnTe',
    category: '数据受托者',
    featured: true,
  },
  {
    id: 'data-trustee-functions',
    feishuToken: 'ML4HdV95EoRW9XxENYFcE5klnhd',
    category: '数据受托者',
    featured: true,
  },
  {
    id: 'data-trustee-trust',
    feishuToken: 'GuMgdDU8JoSYRixo9uUckek4nVV',
    category: '数据受托者',
    featured: true,
  },
];

interface ImageToken {
  token: string;
  width?: string;
  height?: string;
  align?: string;
}

interface SyncItem {
  id: string;
  feishuToken: string;
  category: string;
  featured?: boolean;
}

/**
 * 执行 shell 命令
 */
function runCommand(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf-8', cwd: ROOT });
  } catch (error: any) {
    console.error(`命令执行失败: ${cmd}`);
    console.error(error.stdout || error.message);
    return '';
  }
}

/**
 * 解析图片 token
 */
function parseImageTokens(markdown: string): ImageToken[] {
  const tokens: ImageToken[] = [];
  const regex = /<image token="([^"]+)"(?:\s+width="([^"]+)")?(?:\s+height="([^"]+)")?(?:\s+align="([^"]+)")?/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    tokens.push({
      token: match[1],
      width: match[2],
      height: match[3],
      align: match[4],
    });
  }
  return tokens;
}

/**
 * 解析 frontmatter
 */
function parseFrontmatter(doc: any, item: SyncItem): string {
  const date = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return `---
id: ${item.id}
title: ${doc.title || item.id}
excerpt: ${extractExcerpt(doc.markdown || '')}
category: ${item.category}
readTime: 5 分钟
author: 数字权利圆桌派
date: ${date}
image: ./assets/images/articles/${item.id}/cover.jpg
featured: ${item.featured || false}
---

`;
}

/**
 * 提取摘要
 */
function extractExcerpt(markdown: string): string {
  // 移除 frontmatter、HTML 标签等
  let text = markdown
    .replace(/<[^>]+>/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();
  
  // 取前 150 个字符
  if (text.length > 150) {
    text = text.substring(0, 150) + '...';
  }
  
  return text;
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
 * 转换 markdown（替换图片 token 为本地路径）
 */
function convertMarkdown(markdown: string, articleId: string): string {
  let converted = markdown;
  
  // 替换 <image token="xxx" /> 为 ![图](./assets/images/articles/{id}/xxx.jpg)
  const regex = /<image token="([^"]+)"(?:\s+width="([^"]+)")?(?:\s+height="([^"]+)")?(?:\s+align="([^"]+)")?\/?>/g;
  
  converted = converted.replace(regex, (match, token) => {
    const ext = token.substring(0, 2) === 'HX' ? 'png' : 'jpg'; // 简单判断类型
    const filename = `${token.substring(0, 8)}.${ext}`;
    return `![图](./assets/images/articles/${articleId}/${filename})\n`;
  });
  
  // 清理飞书特有标签
  converted = converted
    // 清理 callout
    .replace(/<callout[^>]*>/g, '')
    .replace(/<\/callout>/g, '')
    // 清理 text 标签
    .replace(/<text[^>]*>/g, '')
    .replace(/<\/text>/g, '')
    // 清理 mention-doc 标签（保留文本）
    .replace(/<mention-doc[^>]*>([^<]*)<\/mention-doc>/g, '[$1]')
    // 清理 wiki-catalog 标签
    .replace(/<wiki-catalog[^>]*\/>/g, '')
    // 清理引用标签
    .replace(/<reference-synced[^>]*>/g, '')
    .replace(/<\/reference-synced>/g, '');
  
  return converted;
}

/**
 * 同步单个文档
 */
async function syncDocument(item: SyncItem): Promise<boolean> {
  console.log(`\n📄 同步文档: ${item.id}`);
  
  // 1. 创建图片目录
  const imgDir = join(ROOT, `src/assets/images/articles/${item.id}`);
  mkdirSync(imgDir, { recursive: true });
  
  // 2. 从飞书拉取文档
  console.log('  ⏳ 从飞书拉取文档...');
  const fetchCmd = `lark-cli docs +fetch --doc ${item.feishuToken} --format json`;
  let fetchResult: any;
  
  try {
    const rawResult = runCommand(fetchCmd);
    fetchResult = JSON.parse(rawResult);
    if (!fetchResult.ok) {
      console.error(`  ❌ 拉取失败: ${fetchResult.message}`);
      return false;
    }
  } catch (error) {
    console.error(`  ❌ 解析结果失败`);
    return false;
  }
  
  const doc = fetchResult.data;
  console.log(`  ✅ 文档标题: ${doc.title}`);
  
  // 3. 解析并下载图片
  const imageTokens = parseImageTokens(doc.markdown || '');
  console.log(`  📷 发现 ${imageTokens.length} 张图片`);
  
  for (let i = 0; i < imageTokens.length; i++) {
    const img = imageTokens[i];
    const ext = img.token.substring(0, 2) === 'HX' ? 'png' : 'jpg';
    const filename = `${img.token.substring(0, 8)}.${ext}`;
    const outputPath = `./src/assets/images/articles/${item.id}/${filename}`;
    
    process.stdout.write(`    下载 ${i + 1}/${imageTokens.length}: ${filename}... `);
    
    if (downloadImage(img.token, outputPath)) {
      console.log('✅');
    } else {
      console.log('❌ (跳过)');
    }
  }
  
  // 4. 生成 frontmatter
  const frontmatter = parseFrontmatter(doc, item);
  
  // 5. 转换 markdown
  let content = convertMarkdown(doc.markdown || '', item.id);
  
  // 移除 callout 等飞书特有标签（简单处理）
  content = content
    .replace(/<callout[^>]*>/g, '')
    .replace(/<\/callout>/g, '')
    .replace(/<text[^>]*>/g, '')
    .replace(/<\/text>/g, '');
  
  // 6. 写入文件
  const outputFile = join(ROOT, `src/content/articles/${item.id}.md`);
  const fullContent = frontmatter + content;
  writeFileSync(outputFile, fullContent, 'utf-8');
  console.log(`  ✅ 已生成: src/content/articles/${item.id}.md`);
  
  return true;
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const idFilter = args.find(arg => arg.startsWith('--id='))?.split('=')[1];
  
  console.log('🚀 开始同步飞书内容到网站');
  console.log('=' .repeat(50));
  
  const itemsToSync = idFilter
    ? syncList.filter(item => item.id === idFilter)
    : syncList;
  
  if (itemsToSync.length === 0) {
    console.log('❌ 没有找到匹配的文档');
    process.exit(1);
  }
  
  let successCount = 0;
  
  for (const item of itemsToSync) {
    const success = await syncDocument(item);
    if (success) successCount++;
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 同步完成: ${successCount}/${itemsToSync.length} 成功`);
  
  if (successCount < itemsToSync.length) {
    process.exit(1);
  }
}

main().catch(console.error);
