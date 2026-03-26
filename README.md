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
├── content/              # 内容目录
│   ├── articles/         # 博客文章
│   ├── events/           # 活动内容
│   └── seasons/          # 主题季内容
├── src/
│   ├── components/       # Vue 组件
│   │   ├── Home.vue      # 首页
│   │   ├── Events.vue    # 活动页
│   │   ├── Seasons.vue   # 主题季页
│   │   ├── Knowledge.vue # 知识库页
│   │   ├── Article.vue   # 文章详情页
│   │   ├── Navbar.vue    # 导航栏
│   │   └── Footer.vue    # 页脚
│   ├── lib/
│   │   └── utils.ts      # 工具函数
│   ├── App.vue           # 根组件
│   ├── content.ts        # 内容数据管理
│   ├── main.ts           # 入口文件
│   ├── router.ts         # 路由配置
│   ├── index.css         # 全局样式
│   └── env.d.ts          # 类型声明
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── CONTENT_GUIDE.md      # 内容添加详细指南
└── README.md
```

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

### 添加新文章

在 `content/articles/` 目录下创建新的 Markdown 文件，例如 `content/articles/2.md`：

```markdown
---
id: '2'
title: '您的文章标题'
excerpt: '文章的简短摘要'
category: '分类名称'
readTime: '5 分钟'
author: '作者姓名'
date: '2024年XX月XX日'
image: 'https://example.com/cover-image.jpg'
tips:
  title: '小贴士标题（可选）'
  content: '小贴士内容（可选）'
  image: 'https://example.com/tips-image.jpg（可选）'
---

这里是文章的正文内容，支持 Markdown 格式。

## 一级标题

段落内容...

### 二级标题

更多内容...
```

### 添加新活动

在 `content/events/` 目录下创建新的 Markdown 文件，例如 `content/events/5.md`：

```markdown
---
id: '5'
title: '活动标题'
description: '活动描述'
date: '2024.XX.XX'
time: 'XX:00 - XX:00'
location: '活动地点'
category: '活动类型'
image: 'https://example.com/event-image.jpg'
seatsRemaining: 10  # 可选，剩余座位
attendeesCount: 50  # 可选，参与人数
---
```

### 添加新主题季

在 `content/seasons/` 目录下创建新的 Markdown 文件，例如 `content/seasons/s5.md`：

```markdown
---
id: 's5'
number: 'Season 05'
title: '主题季标题'
goal: '主题季的目标描述'
outputs:
  - '成果1'
  - '成果2'
image: 'https://example.com/season-image.jpg'
icon: 'lock_person'  # 图标名称，来自 lucide-vue-next
color: 'primary'  # 可选值: primary, secondary, tertiary
---
```

### 注意事项

- **文件命名**：建议使用简单的 ID 命名，如 `2.md`、`5.md`、`s5.md`
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
