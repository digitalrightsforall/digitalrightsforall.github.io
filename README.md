<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<h1 align="center">普通人的数字权利</h1>

<p align="center">
一个致力于提升公众数字素养、守护个人数字权利的共创社区官网
</p>

<p align="center">
<a href="https://digitalrightsforall.github.io">🌐 在线访问</a> · <a href="#技术栈">技术栈</a> · <a href="#本地开发">本地开发</a> · <a href="#内容管理">内容管理</a>
</p>

---

## 关于我们

我们是一个致力于提升公众数字素养、守护个人数字权利的共创社区。通过知识普及、技术实验与社会倡导，让每一个人都能在数字时代有尊严地生活。

## 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 | 前端框架 |
| Vite | 构建工具 |
| TypeScript | 类型安全 |
| Tailwind CSS 4 | 样式框架 |
| Vue Router 5 | 路由管理 |
| Lucide Vue | 图标库 |
| Markdown + gray-matter | 内容管理 |

## 本地开发

### 环境要求

- Node.js v18 或更高版本

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看网站。

### 其他命令

```bash
npm run build      # 生产构建
npm run preview    # 预览构建结果
npm run lint       # TypeScript 类型检查
```

## 页面结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页 |
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

## 内容管理

内容以 Markdown 格式存储在 `src/content/` 目录下，支持以下类型：

| 类型 | 目录 | 说明 |
|------|------|------|
| 资讯 | `publications/` | 双周刊、月度盘点 |
| 工作坊 | `workshops/` | 数字素养工作坊 |
| 行动项目 | `campaigns/` | 公众参与项目 |
| 知识库 | `articles/` | 科普文章 |
| 活动 | `events/` | 线下/线上活动 |
| 主题季 | `seasons/` | 季度主题 |

详细的内容格式说明请参考 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) 和 [CONTENT_MANUAL.md](./CONTENT_MANUAL.md)。

## 设计规范

项目使用完整的设计系统，详见 [DESIGN.md](./DESIGN.md)。

### 色彩系统

- **Primary**: `#5e40e0`（紫色）- 主品牌色
- **Secondary**: `#455e93`（蓝色）- 资讯类内容
- **Tertiary**: `#715e00`（金色）- 行动号召

### 字体

使用 Google Fonts 的 **Plus Jakarta Sans**。

## 许可证

© 2026 数字权利全民行社区. 保留所有权利.
