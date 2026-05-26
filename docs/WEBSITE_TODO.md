# 网站待办清单

> 更新时间：2026-05-13
> 当前分支：main

---

## 🎯 已完成

### ✅ 1. 网站架构调整
- 5 个主要板块：圆桌派、共创营、指北、观点、Play
- 导航栏 ([Navbar.vue](file:///Users/gaofeng/Documents/trae_projects/digitalrights-web/src/components/Navbar.vue)) 和 Footer ([Footer.vue](file:///Users/gaofeng/Documents/trae_projects/digitalrights-web/src/components/Footer.vue)) 已更新

### ✅ 2. 首页展示逻辑
- 从「当前进行中」改为「精选项目」
- 精选项目使用 `homeFeatured` 和 `homeOrder` 字段控制
- 可从任意内容类型（共创营、观点、指北）中选择首页展示内容

### ✅ 3. Logo 更新
- Favicon 已更新为 `/images/logo.png`
- 导航栏和 Footer 的品牌 Logo 已替换

### ✅ 4. Play 页面
- 三个项目截图已添加到 `public/images/`
- 链接已更新（数字人格已更新到 persona.putongren.org）

### ✅ 5. 图标库切换
- 从 Lucide + 内联 SVG 切换到 **Remix Icon**
- 统一使用 `remixicon.css` 管理图标

---

## 🔴 高优先级

### 1. 社交媒体链接占位符
**文件**：[Footer.vue](file:///Users/gaofeng/Documents/trae_projects/digitalrights-web/src/components/Footer.vue)

| 平台 | 当前状态 |
|-----|---------|
| Github | ✅ 已更新 |
| 微博 | ❌ `#` 占位符 |
| 抖音 | ❌ `#` 占位符 |
| 邮箱 | ✅ 已更新 |

---

## 🟡 中优先级

### 2. 内容正文完善
以下文件需要补充完整正文：

| 板块 | 文件 | 状态 |
|-----|------|------|
| **圆桌派** | `src/content/roundtable/1.md` | ❌ 只有 frontmatter |
| | `src/content/roundtable/2.md` | ❌ 只有 frontmatter |
| | `src/content/roundtable/3.md` | ❌ 只有 frontmatter |
| | `src/content/roundtable/4.md` | ❌ 只有 frontmatter |
| **共创营** | `src/content/cocreation/s1.md` | ❌ 只有 frontmatter |
| | `src/content/cocreation/s2.md` | ❌ 只有 frontmatter |
| | `src/content/cocreation/s4.md` | ❌ 只有 frontmatter |

### 3. 外部图片链接替换
以下内容使用了 Google 图片链接，需要替换为本地图片或稳定 CDN：

- `src/content/roundtable/1.md`
- `src/content/roundtable/2.md`
- `src/content/roundtable/3.md`
- `src/content/roundtable/4.md`
- `src/content/cocreation/s1.md`
- `src/content/cocreation/s2.md`
- `src/content/opinions/1.md`

### 4. 指北页面外部链接确认
**文件**：[GuideIndex.vue](file:///Users/gaofeng/Documents/trae_projects/digitalrights-web/src/components/GuideIndex.vue)

| 工作坊 | 飞书链接 | 状态 |
|-------|---------|------|
| 个人数据 | https://opendatachina.feishu.cn/wiki/DCVNwerZsirOZKkd2dicCpycnqc | ⚠️ 待验证 |
| 算法 | https://opendatachina.feishu.cn/wiki/D4tYwqaMLiyvenkYr1EceG6fn9c | ⚠️ 待验证 |
| AI与社会 | https://opendatachina.feishu.cn/wiki/VXY5w0ZbbilZKlkHE5IcyA81nic | ⚠️ 待验证 |

---

## 🟢 低优先级

### 5. 清理未使用的文件
以下组件和路由已不再使用，可以考虑删除或保留以备后用：

| 组件/目录 | 说明 |
|---------|------|
| `src/components/Events.vue` | 原事件列表页 |
| `src/components/CampaignList.vue` | 原活动列表页 |
| `src/components/CampaignDetail.vue` | 原活动详情页 |
| `src/components/Seasons.vue` | 原季节目录页 |
| `src/components/NewsList.vue` | 原资讯列表页 |
| `src/components/About.vue` | 原关于页面 |
| `src/components/Knowledge.vue` | 原知识库页面 |
| `src/components/LearnIndex.vue` | 原学习页面 |

### 6. 首页精选配置
参考 [CONTENT_MANUAL.md](file:///Users/gaofeng/Documents/trae_projects/digitalrights-web/docs/User_Manual/CONTENT_MANUAL.md) 配置首页精选内容：

- 在需要首页展示的内容 frontmatter 中添加 `homeFeatured: true`
- 使用 `homeOrder: 1` 等控制排序

---

## 📚 文档

- 内容管理指南：[docs/User_Manual/CONTENT_MANUAL.md](file:///Users/gaofeng/Documents/trae_projects/digitalrights-web/docs/User_Manual/CONTENT_MANUAL.md)
- Git 工作流程：[AGENTS.md](file:///Users/gaofeng/Documents/trae_projects/digitalrights-web/AGENTS.md)

---

*本文档根据当前实际状态更新*
