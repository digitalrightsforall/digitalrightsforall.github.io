# 内容添加指南

本网站支持通过 Markdown+YAML 格式添加新内容。以下是详细的添加指南。

## 目录结构

```
content/
├── articles/      # 博客文章
├── events/        # 活动
└── seasons/       # 主题季
```

## 文章 (Articles)

### 文件位置
`content/articles/{id}.md`

### 格式示例

```markdown
---
id: '1'
title: '文章标题'
excerpt: '文章摘要'
category: '分类名称'
readTime: '5 分钟'
author: '作者名称'
date: '2024年10月24日'
image: 'https://example.com/image.jpg'
tips:
  title: '小贴士标题'
  content: '小贴士内容'
  image: 'https://example.com/tips-image.jpg'
---

这里是文章的正文内容，支持 Markdown 格式。

## 标题

段落内容...

### 子标题

更多内容...
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识符，用于路由 |
| title | string | 是 | 文章标题 |
| excerpt | string | 是 | 文章摘要 |
| category | string | 是 | 分类名称 |
| readTime | string | 是 | 阅读时间 |
| author | string | 是 | 作者名称 |
| date | string | 是 | 发布日期 |
| image | string | 是 | 封面图片 URL |
| tips | object | 否 | 可选的小贴士 |

## 活动 (Events)

### 文件位置
`content/events/{id}.md`

### 格式示例

```markdown
---
id: '1'
title: '活动标题'
description: '活动描述'
date: '2024.05.20'
time: '14:00 - 17:00'
location: '活动地点'
category: '活动类型'
image: 'https://example.com/image.jpg'
seatsRemaining: 8
attendeesCount: 42
---
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识符 |
| title | string | 是 | 活动标题 |
| description | string | 是 | 活动描述 |
| date | string | 是 | 活动日期 |
| time | string | 是 | 活动时间 |
| location | string | 是 | 活动地点 |
| category | string | 是 | 活动类型 |
| image | string | 是 | 活动图片 URL |
| seatsRemaining | number | 否 | 剩余座位数 |
| attendeesCount | number | 否 | 参与人数 |

## 主题季 (Seasons)

### 文件位置
`content/seasons/{id}.md`

### 格式示例

```markdown
---
id: 's1'
number: 'Season 01'
title: '主题季标题'
goal: '主题季目标'
outputs:
  - '成果1'
  - '成果2'
image: 'https://example.com/image.jpg'
icon: 'lock_person'
color: 'primary'
---
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 唯一标识符 |
| number | string | 是 | 季数编号 |
| title | string | 是 | 主题季标题 |
| goal | string | 是 | 主题季目标 |
| outputs | array | 是 | 成果列表 |
| image | string | 是 | 主题季图片 URL |
| icon | string | 是 | 图标名称 |
| color | string | 是 | 颜色主题 (primary/secondary/tertiary) |

## 添加新内容步骤

1. 在对应的目录中创建新的 Markdown 文件
2. 使用上述格式填写 YAML 前置元数据
3. 在 `---` 下方添加正文内容（文章类型需要）
4. 保存文件
5. 重新运行 `npm run dev` 或重新构建项目

## 部署到 GitHub Pages

运行以下命令部署到 GitHub Pages：

```bash
npm run deploy
```

该命令会自动构建项目并推送到 `gh-pages` 分支。
