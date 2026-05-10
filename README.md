<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<h1 align="center">普通人的数字权利</h1>

<p align="center">
帮助每一个普通人在机器时代保护自己
</p>

<p align="center">
<a href="https://putongren.org">🌐 在线访问</a> · <a href="#技术栈">技术栈</a> · <a href="#本地开发">本地开发</a> · <a href="#内容管理">内容管理</a>
</p>

---

## 关于我们

我们是一个致力于提升公众数字素养、守护个人数字权利的共创社区。通过知识普及、技术实验与社会倡导，让每一个人都能在数字时代有尊严地生活。

## 五大板块

| 板块 | 说明 | 内容类型 |
|------|------|---------|
| 🎙️ 圆桌派 | 讲座型活动回顾 | 专家分享与讨论 |
| 🌱 共创营 | 黑客松与共创计划 | 行动项目共创 |
| 📚 指北 | 学习资源 | 工作坊与工具 |
| 💭 观点 | 深度分析与思考 | 文章与资讯 |
| 🎮 Play | 互动体验 | 游戏与工具 |

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
| `/` | 首页 | 内容瀑布流展示 |
| `/roundtable` | 圆桌派 | 活动回顾列表 |
| `/cocreation` | 共创营 | 共创项目列表 |
| `/cocreation/:id` | 共创项目详情 | 项目详情页 |
| `/guide` | 指北 | 学习资源列表 |
| `/guide/:id` | 指北详情 | 工作坊详情 |
| `/opinions` | 观点 | 文章列表 |
| `/opinions/:id` | 文章详情 | 文章详情页 |
| `/play` | Play | 互动体验列表 |

## 内容管理

内容以 Markdown 格式存储在 `src/content/` 目录下，支持以下类型：

| 类型 | 目录 | 说明 |
|------|------|------|
| 圆桌派 | `roundtable/` | 讲座型活动回顾 |
| 共创营 | `cocreation/` | 共创项目 |
| 指北 | `guide/` | 工作坊与工具 |
| 观点 | `opinions/` | 文章与资讯 |

详细的内容格式说明请参考 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。

## 设计规范

项目使用完整的设计系统，详见 [DESIGN.md](./DESIGN.md)。

### 色彩系统

- **Primary**: `#5e40e0`（紫色）- 主品牌色
- **Secondary**: `#455e93`（蓝色）- 资讯类内容
- **Tertiary**: `#715e00`（金色）- 行动号召

### 字体

使用 Google Fonts 的 **Plus Jakarta Sans**。

## 许可证

© 2026 普通人的数字权利. 保留所有权利.
