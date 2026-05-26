# 普通人的数字权利 - 内容管理手册

## 目录

1. [快速开始](#快速开始)
2. [内容目录结构](#内容目录结构)
3. [内容板块说明](#内容板块说明)
4. [首页精选配置](#首页精选配置)
5. [图片管理](#图片管理)
6. [常见问题](#常见问题)
7. [技术信息](#技术信息)

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
├── topics/          # 议题（专题）
│   ├── personal-data.md
│   └── collective-governance.md
├── projects/       # 项目
│   └── data-trustee.md
├── roundtable/     # 圆桌派
│   ├── 1.md
│   ├── 2.md
│   └── workshop-*.md
├── cocreation/     # 共创营
│   ├── s1.md
│   ├── s2.md
│   ├── s3.md
│   ├── s4.md
│   └── *.md
├── guide/          # 指北（工作坊）
│   ├── personal-data.md
│   ├── algorithm.md
│   └── ai-society.md
├── opinions/       # 观点
│   ├── biweekly-*.md
│   └── data-trustee-*.md
└── play/           # Play
    └── *.md
```

---

## 内容板块说明

### 议题（专题）

**文件位置**: `src/content/topics/`

```yaml
---
id: 'personal-data'
title: '个人数据权益'
description: '探索以普通人为中心的个人数据治理和权益保护'
order: 1
homeFeatured: true
homeOrder: 1
projects:
  - data-trustee
---
```

**字段说明**:

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `title` | 是 | 议题标题 |
| `description` | 是 | 议题描述 |
| `order` | 是 | 列表排序 |
| `projects` | 否 | 关联的项目 ID 列表 |
| `homeFeatured` | 否 | 首页精选标记 |
| `homeOrder` | 否 | 首页排序（数字越小越靠前） |

---

### 项目

**文件位置**: `src/content/projects/`

```yaml
---
id: 'data-trustee'
topicId: 'personal-data'
title: '消费者放心的个人数据受托者'
year: '2025'
status: 'completed'
goal: '集结普通消费者，通过共创描绘能让消费者放心托管个人数据的第三方"受托者"，发出普通人的声音。'
participants: 68
image: '/images/campaign-trustee-cover.png'
homeFeatured: true
homeOrder: 10
outputs:
  - name: '消费者放心的个人数据受托者报告'
    url: 'https://...'
    type: pdf
wikiUrl: 'https://...'
color: 'primary'
---
```

**字段说明**:

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `topicId` | 是 | 关联的议题 ID |
| `title` | 是 | 项目标题 |
| `year` | 是 | 年份 |
| `status` | 是 | `active` 进行中 / `completed` 已完成 |
| `goal` | 是 | 目标描述 |
| `participants` | 否 | 参与人数 |
| `image` | 是 | 封面图片 URL |
| `outputs` | 否 | 成果列表 |
| `wikiUrl` | 否 | 飞书文档链接 |
| `color` | 否 | 主题色 `primary` / `secondary` / `tertiary` |
| `homeFeatured` | 否 | 首页精选标记 |
| `homeOrder` | 否 | 首页排序 |

---

### 圆桌派

**文件位置**: `src/content/roundtable/`

```yaml
---
id: '1'
title: '隐私护航：个人数据资产化探讨'
description: '活动详细描述...'
date: '2024.05.20'
time: '14:00 - 17:00'
location: '上海市徐汇区数字创新港'
category: '主题研讨会'
image: 'https://example.com/event.jpg'
seatsRemaining: 20
attendeesCount: 45
---
```

**字段说明**:

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `title` | 是 | 活动标题 |
| `description` | 是 | 活动描述 |
| `date` | 是 | 日期 |
| `time` | 否 | 时间 |
| `location` | 否 | 地点 |
| `category` | 是 | 活动类型 |
| `image` | 是 | 封面图片 URL |
| `seatsRemaining` | 否 | 剩余名额 |
| `attendeesCount` | 否 | 已报名人数 |

---

### 共创营

**文件位置**: `src/content/cocreation/`

```yaml
---
id: 's4'
number: 'Season 04'
title: '数据权利在中国'
goal: '集结普通消费者，通过共创...'
year: '2025'
status: 'active'
outputs:
  - '68名共创者参与'
  - '「个人数据受托者的职能」共创成果'
participants: 68
image: 'https://example.com/cover.jpg'
color: 'primary'
wikiUrl: 'https://...'
---
```

**字段说明**:

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `number` | 是 | 季数显示文本 |
| `title` | 是 | 共创营标题 |
| `goal` | 是 | 目标描述 |
| `status` | 是 | `active` 进行中 / `completed` 已完成 |
| `outputs` | 否 | 成果列表 |
| `participants` | 否 | 参与人数 |
| `image` | 是 | 封面图片 URL |
| `color` | 否 | 主题色 `primary` / `secondary` / `tertiary` |
| `wikiUrl` | 否 | 飞书文档链接 |

---

### 指北（工作坊）

**文件位置**: `src/content/guide/`

> **注意**: 指北内容详情存储在飞书文档中，网站仅展示配置信息并提供外链跳转。

```yaml
---
id: 'algorithm'
title: '算法如何悄悄影响我们？'
shortTitle: '身边的算法决策工作坊'
type: 'algorithm'
goal: '认识算法如何影响我们的日常生活和决策'
description: '通过互动工作坊，探讨算法推荐...'
participants: 2755
image: '/workshop-algorithm-cover.JPEG'
color: 'secondary'
topicId: 'personal-data'
feishuUrl: 'https://opendatachina.feishu.cn/wiki/...'
---
```

**type 类型**:

| 值 | 说明 |
|----|------|
| `personal-data` | 个人数据保护 |
| `algorithm` | 算法与AI |
| `ai-society` | AI与社会 |

**字段说明**:

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `title` | 是 | 工作坊标题 |
| `shortTitle` | 是 | 简短标题（列表显示） |
| `type` | 是 | 工作坊类型 |
| `goal` | 是 | 目标描述 |
| `description` | 是 | 工作坊描述 |
| `participants` | 是 | 参与人数 |
| `image` | 是 | 封面图片 URL |
| `color` | 否 | 主题色 `primary` / `secondary` / `tertiary` |
| `topicId` | 否 | 关联的议题 ID |
| `feishuUrl` | 是 | 飞书文档外链地址 |

---

### 观点

**文件位置**: `src/content/opinions/`

```yaml
---
id: 'biweekly-1'
title: '双周刊 第1期：数字权利动态'
excerpt: '本期双周刊为您带来最新的数字权利相关资讯...'
author: '数字权利圆桌派'
date: '2024年08月24日'
readTime: 8 分钟
image: '/images/placeholder.png'
topicId: 'personal-data'
homeFeatured: true
homeOrder: 1
---
```

**type 类型**:

| 值 | 说明 |
|----|------|
| `biweekly` | 双周刊 |
| `monthly` | 月度盘点 |
| `article` | 观点文章 |

**字段说明**:

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 唯一标识符 |
| `title` | 是 | 文章标题 |
| `excerpt` | 是 | 简短摘要 |
| `author` | 是 | 作者 |
| `date` | 是 | 日期（格式：YYYY年MM月DD日） |
| `readTime` | 是 | 阅读时间 |
| `image` | 是 | 封面图片 URL |
| `topicId` | 否 | 关联的议题 ID |
| `homeFeatured` | 否 | 首页精选标记（推荐阅读板块） |
| `homeOrder` | 否 | 首页排序 |

---

## 首页精选配置

首页有三个主要板块，可以从不同内容类型中灵活选择展示内容。

### 首页板块

| 板块 | 说明 | 数据来源 | homeFeatured 控制 |
|------|------|----------|------------------|
| 我们在探索 | 首页横幅大区块轮播 | 议题 + 项目 | topics + projects |
| 推荐阅读 | 3篇文章卡片 | 观点 | opinions |
| 想学习更多 | 3个工作坊卡片 | 指北 | guides |

### 配置方法

在内容的 frontmatter 中添加两个字段：

```yaml
homeFeatured: true    # 标记为首页精选
homeOrder: 1          # 排序顺序（可选，默认999）
```

### 「我们在探索」板块

此板块仅显示 **议题（topics）** 和 **项目（projects）** 内容，按 `homeOrder` 排序显示。

**示例：把一个议题设为首页精选**

```yaml
---
id: 'personal-data'
title: '个人数据权益'
description: '探索以普通人为中心的个人数据治理和权益保护'
order: 1
homeFeatured: true
homeOrder: 1
projects:
  - data-trustee
---
```

**示例：把一个项目设为首页精选**

```yaml
---
id: 'data-trustee'
topicId: 'personal-data'
title: '消费者放心的个人数据受托者'
year: '2025'
status: 'completed'
goal: '集结普通消费者，通过共创...'
participants: 68
image: '/images/campaign-trustee-cover.png'
homeFeatured: true
homeOrder: 10
---
```

### 「推荐阅读」板块

此板块显示 **观点（opinions）** 内容，按 `homeOrder` 排序取前3篇。

**示例：把一篇观点文章设为首页精选**

```yaml
---
id: 'important-opinion'
title: '重要观点文章'
excerpt: '这是摘要...'
author: '普通人的数字权利'
date: '2025-01-15'
readTime: '5 分钟'
image: '/images/placeholder.png'
homeFeatured: true
homeOrder: 1
---
```

### 精选逻辑

1. 系统筛选所有 `homeFeatured: true` 的内容
2. 按 `homeOrder` 字段排序（数字越小越靠前）
3. 如果精选内容不足3个，自动补充非精选内容
4. 如果没有任何精选内容，显示最新的3个非精选内容

### homeOrder 排序规则

- 同一板块内，`homeOrder` 数字小的排在前面
- 没有设置 `homeOrder` 的内容默认排序为 999
- 不同板块的 `homeOrder` 互不影响
- 建议：议题使用 1-9，项目使用 10-99，观点使用 1-99

### 配置示例

假设首页想这样配置：

| 板块 | 精选内容 |
|------|----------|
| 我们在探索 | 议题 personal-data（homeOrder: 1）<br>议题 collective-governance（homeOrder: 2）<br>项目 data-trustee（homeOrder: 10） |
| 推荐阅读 | 观点 1（homeOrder: 1）<br>观点 biweekly-1（homeOrder: 2）<br>观点 data-trustee-trust（homeOrder: 3） |

只需在对应内容文件中添加 `homeFeatured: true` 和 `homeOrder` 即可。

---

## 图片管理

### 推荐图片来源

1. **飞书文档图片**
   - 在飞书文档中上传图片
   - 使用文档 URL 作为图片地址

2. **本地图片**
   - 放入 `public/images/` 目录
   - 使用 `/images/文件名.png` 引用

### 图片规格建议

| 位置 | 推荐尺寸 | 比例 |
|------|----------|------|
| 首页横幅 | 1200x630 | 1.91:1 |
| 议题封面 | 800x600 | 4:3 |
| 项目封面 | 800x1000 | 4:5 |
| 共创营封面 | 800x1000 | 4:5 |
| 观点封面 | 1200x630 | 1.91:1 |
| 工作坊封面 | 800x600 | 4:3 |
| Play 列表 | 800x450 | 16:9 |

### 图片 URL 格式

```yaml
# 本地图片
image: '/images/play-mbti.png'

# 飞书文档
image: 'https://opendatachina.feishu.cn/docx/TOKEN'

# 直接 URL
image: 'https://example.com/images/cover.jpg'
```

---

## 常见问题

### Q: 如何删除一个内容？

直接删除对应的 `.md` 文件即可。网站会自动重新构建内容索引。

### Q: 内容没有显示在首页精选？

确认 frontmatter 中有 `homeFeatured: true` 字段，且没有语法错误（注意 YAML 格式）。

### Q: 如何修改内容而不改变排序？

保持文件顺序不变，只修改正文内容即可。

### Q: 文件名可以修改吗？

可以，但修改后需要同步更新 frontmatter 中的 `id` 字段。

### Q: 想让多个内容同时显示在首页同一板块？

给多个内容添加 `homeFeatured: true`，它们会按 `homeOrder` 排序显示。

### Q: 如何取消某个内容的首页精选？

删除或修改 `homeFeatured: true` 为 `homeFeatured: false` 或直接删除该字段。

### Q: 指北详情页在哪里编辑？

指北内容详情存储在飞书文档中，网站 `guide/*.md` 文件仅配置显示信息。编辑 `feishuUrl` 字段指向正确的飞书文档链接即可。

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
| `src/content/topics/*.md` | 议题内容 |
| `src/content/projects/*.md` | 项目内容 |
| `src/content/roundtable/*.md` | 圆桌派内容 |
| `src/content/cocreation/*.md` | 共创营内容 |
| `src/content/guide/*.md` | 指北内容 |
| `src/content/opinions/*.md` | 观点内容 |
| `src/content/play/*.md` | Play 内容 |
| `src/components/Home.vue` | 首页组件 |
| `src/components/HomeCarousel.vue` | 首页轮播组件 |
| `src/components/GuideIndex.vue` | 指北页面组件 |
| `public/images/` | 本地图片目录 |

---

*最后更新: 2025年5月*
