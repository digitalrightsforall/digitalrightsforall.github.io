<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 数字权利全民行官网

基于 Google Stitch 设计和 Google AI Studio 生成的 Demo，构建的可部署到 GitHub Pages 的官网项目。

## 项目概述

我们是一个致力于提升公众数字素养、守护个人数字权利的共创社区。通过知识普及、技术实验与社会倡导，让每一个人都能在数字时代有尊严地生活。

### 技术栈

- **框架**: Vue 3 + Vite
- **路由**: Vue Router 5
- **样式**: Tailwind CSS 4
- **UI 图标**: Lucide Vue
- **内容格式**: Markdown + YAML Frontmatter
- **内容解析**: gray-matter

## 本地开发

### 前置要求

- Node.js (推荐 v18 或更高版本)

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

### 其他命令

```bash
npm run build      # 生产构建
npm run preview    # 预览构建结果
npm run lint       # TypeScript 类型检查
npm run deploy     # 部署到 GitHub Pages
npm run clean      # 清理构建目录
```

## 项目结构

```
digitalrights-web/
├── src/content/           # 内容目录
│   ├── articles/          # 知识库文章
│   ├── publications/      # 资讯（双周刊/月度盘点）
│   ├── workshops/        # 工作坊
│   ├── campaigns/        # 行动项目
│   ├── events/           # 活动
│   └── seasons/          # 主题季
├── src/
│   ├── components/       # Vue 组件
│   │   ├── Home.vue          # 首页
│   │   ├── NewsList.vue     # 资讯列表页
│   │   ├── LearnIndex.vue   # 数字素养首页
│   │   ├── WorkshopDetail.vue   # 工作坊详情页
│   │   ├── CampaignList.vue     # 行动项目列表页
│   │   ├── CampaignDetail.vue   # 行动项目详情页
│   │   ├── Events.vue        # 活动页
│   │   ├── Seasons.vue       # 主题季页
│   │   ├── Knowledge.vue     # 知识库页
│   │   ├── Article.vue      # 文章详情页（支持资讯和知识库）
│   │   ├── About.vue        # 关于我们页
│   │   ├── Navbar.vue        # 导航栏
│   │   └── Footer.vue       # 页脚
│   ├── lib/
│   │   └── utils.ts         # 工具函数
│   ├── App.vue              # 根组件
│   ├── content.ts           # 内容数据管理（支持多类型内容）
│   ├── main.ts              # 入口文件
│   ├── router.ts           # 路由配置
│   ├── index.css            # 全局样式
│   └── env.d.ts             # 类型声明
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── CONTENT_GUIDE.md         # 内容添加详细指南
└── README.md
```

## 页面与路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页（四大模块） |
| `/news` | NewsList | 资讯列表（双周刊/月度盘点） |
| `/news/:id` | Article | 资讯详情 |
| `/learn` | LearnIndex | 数字素养首页 |
| `/learn/workshop/:id` | WorkshopDetail | 工作坊详情 |
| `/campaign` | CampaignList | 行动项目列表 |
| `/campaign/:id` | CampaignDetail | 行动项目详情 |
| `/events` | Events | 活动列表 |
| `/seasons` | Seasons | 主题季列表 |
| `/knowledge` | Knowledge | 知识库列表 |
| `/article/:id` | Article | 知识库文章详情 |
| `/about` | About | 关于我们 |

## 部署到 GitHub Pages

### 1. 准备工作

确保您已经：
- 创建了 GitHub 仓库
- 将代码推送到 GitHub

### 2. 临时修改配置（仅用于部署）

#### 修改路由模式

编辑 `src/router.ts`：

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'; // 改成 createWebHashHistory

// ...

const router = createRouter({
  history: createWebHashHistory(), // 改成 createWebHashHistory
  // ...
});
```

#### 修改 Vite 配置

编辑 `vite.config.ts`，添加 `base` 配置：

```typescript
export default defineConfig(({mode}) => {
  return {
    // ...
    base: './', // 添加这一行
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
  };
});
```

### 3. 执行部署

```bash
npm run deploy
```

这个命令会：
- 自动构建项目到 `dist` 目录
- 将 `dist` 目录推送到 `gh-pages` 分支

### 4. 配置 GitHub Pages

1. 进入您的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Build and deployment** 部分：
   - Source: 选择 **Deploy from a branch**
   - Branch: 选择 **gh-pages** 分支，文件夹选择 **/(root)**
4. 点击 **Save**

几分钟后，您的网站就可以通过以下地址访问了：
`https://<您的用户名>.github.io/<仓库名>/`

### 5. 部署后的恢复

部署完成后，记得把 `src/router.ts` 和 `vite.config.ts` 恢复到原来的状态，以便本地开发时能正常使用。

## 扩展内容

### 内容类型

网站支持以下内容类型，存储在 `src/content/` 目录下：

#### 1. 资讯（publications）
双周刊和月度盘点，存储在 `src/content/publications/`：

```markdown
---
id: 'biweekly-1'
title: '双周刊 第1期：标题'
excerpt: '摘要'
type: 'biweekly'  # 或 'monthly'
issue: '1'
date: '2024年08月24日'
readTime: '5 分钟'
author: '开放数据中国'
image: 'https://example.com/image.jpg'
---

正文内容...
```

#### 2. 工作坊（workshops）
互动工作坊，存储在 `src/content/workshops/`：

```markdown
---
id: 'workshop-personal-data'
title: '我的数据去哪儿了？'
shortTitle: '个人数据工作坊'
type: 'personal-data'  # personal-data | algorithm | ai-society
goal: '学习目标'
description: '工作坊描述'
participants: 30
materials:
  - '配套指南1'
  - '配套指南2'
image: 'https://example.com/image.jpg'
color: 'primary'  # primary | secondary | tertiary
---

工作坊详情...
```

#### 3. 行动项目（campaigns）
公众参与项目，存储在 `src/content/campaigns/`：

```markdown
---
id: 'data-trustee-2025'
title: '消费者放心的个人数据受托者'
year: '2025'
status: 'completed'  # active | completed
goal: '项目目标'
participants: 68
outputs:
  - '产出1'
  - '产出2'
image: 'https://example.com/image.jpg'
color: 'primary'
---

项目详情...
```

#### 4. 知识库文章（articles）
科普文章，存储在 `src/content/articles/`：

```markdown
---
id: '1'
title: '文章标题'
excerpt: '摘要'
category: '分类'
readTime: '5 分钟'
author: '作者'
date: '2024年XX月XX日'
image: 'https://example.com/image.jpg'
featured: true  # 可选，是否在首页推荐
tips:           # 可选，小贴士
  title: '小贴士标题'
  content: '小贴士内容'
  image: 'https://example.com/tip.jpg'
---

正文...
```

#### 5. 活动（events）
线下/线上活动，存储在 `src/content/events/`：

```markdown
---
id: '1'
title: '活动标题'
description: '活动描述'
date: '2024.XX.XX'
time: 'XX:00 - XX:00'
location: '地点'
category: '类型'
image: 'https://example.com/image.jpg'
---

活动详情...
```

#### 6. 主题季（seasons）
季度主题项目，存储在 `src/content/seasons/`：

```markdown
---
id: 's3'
number: 'Season 03'
title: '主题标题'
goal: '目标描述'
outputs:
  - '成果1'
  - '成果2'
image: 'https://example.com/image.jpg'
icon: 'users'
color: 'primary'
---

主题季详情...
```

### 注意事项

- **文件路径**：内容文件放在 `src/content/` 对应子目录下，不是根目录的 `content/`
- **文件命名**：建议使用简单的 ID 命名，如 `biweekly-1.md`、`workshop-personal-data.md`
- **ID 唯一性**：确保每个内容项的 `id` 字段都是唯一的
- **图片链接**：可以使用外部图片 URL，或者将图片放在 `public/` 目录下
- **热更新**：开发时修改内容文件会自动热更新，无需重启服务器

详细的格式说明请参考 [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md) 文件！

## 设计规范

### 色彩系统

- Primary: `#5e40e0`（紫色）
- Secondary: `#455e93`（蓝色）
- Tertiary: `#715e00`（金色）
- Background: `#f7f9fc`（浅灰蓝）

### 字体

使用 Google Fonts 的 **Plus Jakarta Sans**。

## Git 工作流

根据项目规范，开发时请遵循以下工作流：

1. **创建分支**：从 `main` 分支创建新的 feature 分支
   ```bash
   git checkout -b feat/your-feature-description
   ```

2. **开发和提交**：进行小步提交
   ```bash
   git add .
   git commit -m "feat: 描述您的更改"
   ```

3. **Review 和合并**：任务完成后，等待 Review 通过后再合并

## 许可证

© 2026 数字权利全民行社区. 保留所有权利.
