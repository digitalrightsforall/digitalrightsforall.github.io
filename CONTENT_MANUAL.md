# 普通人的数字权利圆桌派 - 内容管理手册

## 目录

1. [快速开始](#快速开始)
2. [内容目录结构](#内容目录结构)
3. [文章管理](#文章管理)
4. [主题季管理](#主题季管理)
5. [社区活动管理](#社区活动管理)
6. [首页精选文章设置](#首页精选文章设置)
7. [内容同步：从飞书拉取](#内容同步从飞书知识库自动拉取)
8. [图片管理](#图片管理)
9. [常见问题](#常见问题)

---

## 快速开始

### 环境准备

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 编辑内容文件

所有内容文件位于 `src/content/` 目录下，使用 Markdown 格式编写，带有 YAML frontmatter 元数据。

---

## 内容目录结构

```
src/content/
├── articles/          # 知识库文章
│   ├── data-trustee-1.md
│   ├── data-trustee-functions.md
│   ├── data-trustee-trust.md
│   └── toolbox-overview.md
├── seasons/          # 主题季
│   ├── s1.md
│   ├── s2.md
│   ├── s3.md
│   └── s4.md
└── events/          # 社区活动
    ├── 1.md
    ├── 2.md
    ├── 3.md
    └── workshop-*.md
```

---

## 文章管理

### 创建新文章

1. 在 `src/content/articles/` 目录下创建 `.md` 文件
2. 文件名（不含扩展名）将成为文章 ID

**文件名规则**：
- 使用小写字母、数字和连字符
- 示例：`my-new-article.md`

### 文章 Frontmatter 格式

```yaml
---
id: my-new-article                    # 唯一标识符（与文件名一致）
title: 我的新文章                      # 文章标题
excerpt: 这是文章的简短描述...          # 列表页显示的摘要
category: 数据受托者                    # 分类名称
readTime: 10 分钟                     # 预估阅读时间
author: 数字权利圆桌派                 # 作者名称
date: 2025年01月15日                  # 发布日期
image: https://example.com/image.jpg  # 封面图片 URL
featured: true                        # 是否在首页精选展示（可选）
tips:                                 # 文章提示框（可选）
  title: 关键点
  content: 这是提示内容
  image: https://example.com/tip.jpg
---

# 文章正文

这里是文章的正文内容，支持 Markdown 格式...

## 小标题

正文段落...
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识，与文件名一致 |
| `title` | 是 | 文章标题 |
| `excerpt` | 是 | 简短描述，用于列表展示 |
| `category` | 是 | 文章分类 |
| `readTime` | 是 | 阅读时间，如"5 分钟" |
| `author` | 是 | 作者名称 |
| `date` | 是 | 日期，格式如"2025年01月15日" |
| `image` | 是 | 封面图片 URL |
| `featured` | 否 | 是否在首页精选展示（设为 `true`） |
| `tips` | 否 | 可折叠的提示框内容 |

### 文章排序

文章按 `id` 字段的字母顺序排序。如需调整顺序，可修改文件名前缀：
- `1-article.md` < `2-article.md` < `3-article.md`

---

## 主题季管理

### 文件位置

`src/content/seasons/`

### Frontmatter 格式

```yaml
---
id: 's3'                              # 唯一标识符
number: 'Season 03'                   # 显示的季数
title: '消费者放心的个人数据受托者'      # 主题季标题
goal: '集结普通消费者，通过共创...'
outputs:                              # 成果列表
  - '68名共创者参与'
  - '「个人数据受托者的职能」共创成果'
image: 'https://example.com/cover.jpg'
icon: 'users'                         # 图标名称（lucide 图标库）
color: 'primary'                      # 颜色：primary | secondary | tertiary
---
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `number` | 是 | 季数显示文本 |
| `title` | 是 | 主题季标题 |
| `goal` | 是 | 目标描述 |
| `outputs` | 是 | 成果列表（数组） |
| `image` | 是 | 封面图片 URL |
| `icon` | 否 | lucide 图标名称 |
| `color` | 否 | 主题色 primary/secondary/tertiary |

### 首页显示逻辑

首页"当前主题季"固定显示 `seasons[0]`（按 id 字母排序的第一个）。

---

## 社区活动管理

### 文件位置

`src/content/events/`

### Frontmatter 格式

```yaml
---
id: '1'                               # 唯一标识符
title: '隐私护航：个人数据资产化探讨'    # 活动标题
description: '活动详细描述...'
date: '2024.05.20'                    # 日期
time: '14:00 - 17:00'                 # 时间
location: '上海市徐汇区数字创新港'       # 地点
category: '主题研讨会'                  # 活动类型
image: 'https://example.com/event.jpg'
seatsRemaining: 20                    # 剩余名额（可选）
attendeesCount: 45                   # 参与人数（可选）
---
```

### 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `title` | 是 | 活动标题 |
| `description` | 是 | 活动描述 |
| `date` | 是 | 日期 |
| `time` | 是 | 时间 |
| `location` | 是 | 地点 |
| `category` | 是 | 活动类型 |
| `image` | 是 | 封面图片 URL |
| `seatsRemaining` | 否 | 剩余名额 |
| `attendeesCount` | 否 | 已报名人数 |

---

## 首页精选文章设置

### 如何设置精选

在文章的 frontmatter 中添加 `featured: true`：

```yaml
---
id: my-article
title: 我的文章
featured: true   # 添加这行
---
```

### 精选逻辑

1. 系统首先显示所有 `featured: true` 的文章
2. 如果精选文章不足 3 篇，自动补充非精选文章
3. 默认显示 3 篇，可在 `Home.vue` 中修改 `getFeaturedArticles(3)` 的参数

### 修改首页精选数量

编辑 `src/components/Home.vue` 第 6 行：

```typescript
const featuredArticles = getFeaturedArticles(3);  // 修改数字即可
```

---

## 图片管理

### 推荐图片来源

1. **飞书文档图片**
   - 在飞书文档中上传图片
   - 使用文档 URL 作为图片地址

2. **Google 图片**
   - 使用 Google 图片搜索
   - 右键复制图片地址

3. **图床服务**
   - 推荐使用稳定的图床服务
   - 确保图片可公开访问

### 图片规格建议

| 位置 | 推荐尺寸 | 比例 |
|------|----------|------|
| 文章封面 | 1200x630 | 1.91:1 |
| 主题季封面 | 800x1000 | 4:5 |
| 活动封面 | 1200x630 | 1.91:1 |

### 图片 URL 格式

```yaml
# 飞书文档
image: https://opendatachina.feishu.cn/docx/TOKEN

# 直接 URL
image: https://example.com/images/cover.jpg

# Google 图片（需添加 referrerPolicy="no-referrer"）
image: https://lh3.googleusercontent.com/...
```

---

## 常见问题

### Q: 如何删除一篇文章？

直接删除对应的 `.md` 文件即可。网站会自动重新构建内容索引。

### Q: 文章没有显示在首页精选？

确认 frontmatter 中有 `featured: true` 字段，且没有语法错误。

### Q: 如何修改文章内容而不改变发布时间？

保持 `date` 字段不变，只修改正文内容。

### Q: 文件名可以修改吗？

可以，但修改后需要同步更新 frontmatter 中的 `id` 字段。

### Q: 如何添加新分类？

直接在文章的 `category` 字段中填写新分类名称即可，无需预定义。

### Q: 首页"当前主题季"显示的不是最新一季？

主题季按 `id` 字母排序。修改文件名使最新一季的 id 在字母排序中最靠前（如 `s4.md` 排在 `s1.md` 之前）。

---

## 内容同步：从飞书知识库增量同步

网站支持从飞书知识库自动发现并增量同步内容。

### 同步命令

```bash
# 检查知识库中的文档状态（不执行同步）
bun run src/sync/sync.ts --check

# 同步所有文档
bun run src/sync/sync.ts

# 同步指定文档（按标题或 token 匹配）
bun run src/sync/sync.ts --id=数据受托者

# 强制同步所有文档（忽略增量检查）
bun run src/sync/sync.ts --force
```

### 增量同步机制

脚本会自动比较本地文件和飞书文档的修改时间：
- 飞书文档较新 → 自动同步
- 本地文件较新 → 跳过
- 本地文件不存在 → 自动创建

### 同步控制标记

在飞书文档中添加以下注释来控制同步行为：

```markdown
<!-- sync: false -->   不同步此文档
<!-- sync: manual -->  不同步此文档（仅手动同步）
```

### 同步流程

1. 自动获取知识库中的所有文档
2. 比较本地文件与飞书文档的修改时间
3. 下载文档图片到 `src/assets/images/articles/{slug}/`
4. 生成/更新 `.md` 文件（包含 frontmatter）

### 生成的文件

```
src/content/articles/
└── {标题slug}.md        # 自动从标题生成

src/assets/images/articles/
└── {标题slug}/
    ├── xxx.jpg          # 下载的图片
    └── cover.jpg        # 可手动添加封面
```

### frontmatter 新增字段

```yaml
feishu_token: GuMgdDU8JoSYRixo9uUckek4nVV
feishu_url: https://opendatachina.feishu.cn/wiki/xxx
```

---

## 技术信息

- **框架**: Vue 3 + TypeScript + Vite
- **样式**: Tailwind CSS v4
- **内容格式**: Markdown + YAML frontmatter
- **解析库**: gray-matter

### 相关文件

| 文件 | 说明 |
|------|------|
| `src/content.ts` | 内容加载和解析逻辑 |
| `src/content/articles/*.md` | 知识库文章 |
| `src/content/seasons/*.md` | 主题季 |
| `src/content/events/*.md` | 社区活动 |
| `src/components/Home.vue` | 首页组件 |
| `src/components/Events.vue` | 活动页组件 |
| `src/components/Seasons.vue` | 主题季页组件 |
| `src/components/Knowledge.vue` | 知识库页组件 |
| `src/components/Article.vue` | 文章详情页组件 |

---

*最后更新: 2025年4月*
