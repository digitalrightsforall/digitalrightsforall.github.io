---
name: DigitalRights
version: "1.0"
description: 数字权利全民行官网设计系统 - 为普通人构建的数字素养与权利保护社区平台
colors:
  primary: "#5e40e0"
  primary-dim: "#5130d4"
  primary-container: "#c3b8ff"
  on-primary: "#fcf7ff"
  on-primary-container: "#3a00bd"

  secondary: "#455e93"
  secondary-container: "#d8e2ff"
  on-secondary: "#f9f8ff"
  on-secondary-container: "#375184"

  tertiary: "#715e00"
  tertiary-container: "#fdd400"
  on-tertiary: "#fff8ed"
  on-tertiary-container: "#594a00"

  background: "#f7f9fc"
  on-background: "#2d3338"

  surface: "#f7f9fc"
  on-surface: "#2d3338"
  on-surface-variant: "#596065"

  surface-container-lowest: "#ffffff"
  surface-container-low: "#f1f4f7"
  surface-container: "#eaeef3"
  surface-container-high: "#e3e9ee"
  surface-container-highest: "#dde3e9"

  outline: "#757c81"
  outline-variant: "#acb3b8"

typography:
  headline:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "3rem"
    fontWeight: "800"
    lineHeight: "1.1"
  h2:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "2rem"
    fontWeight: "700"
  h3:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1.5rem"
    fontWeight: "700"
  body-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1.125rem"
    fontWeight: "400"
    lineHeight: "1.75"
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.75"
  body-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "0.875rem"
    fontWeight: "400"
  label:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "0.875rem"
    fontWeight: "700"
  label-caps:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "0.75rem"
    fontWeight: "700"
    textTransform: "uppercase"
    letterSpacing: "0.1em"

rounded:
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "3rem"
  pill: "9999px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    fontWeight: "700"
    fontSize: "0.875rem"
    shadow: "shadow-lg"
    hoverTransform: "translateY(-2px)"
    hoverShadow: "shadow-xl"

  button-secondary:
    backgroundColor: "{colors.surface-container-lowest}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.outline-variant}"
    borderWidth: "2px"
    rounded: "{rounded.lg}"
    padding: "16px 40px"
    fontWeight: "700"
    fontSize: "1.125rem"

  card:
    backgroundColor: "{colors.surface-container-lowest}"
    rounded: "{rounded.lg}"
    padding: "32px"
    shadow: "shadow-none"
    hoverShadow: "shadow-xl"
    hoverTransform: "translateY(-4px)"
    transition: "all 0.3s ease"

  card-glass:
    backgroundColor: "rgba(255,255,255,0.8)"
    backdropFilter: "blur(12px)"
    rounded: "{rounded.lg}"
    padding: "24px"

  nav-link:
    textColor: "{colors.on-surface-variant}"
    fontWeight: "700"
    fontSize: "0.875rem"
    hoverTextColor: "{colors.primary}"
    activeTextColor: "{colors.primary}"
    underlineColor: "{colors.primary}"
    underlineHeight: "2px"
    underlineExpand: "width 0 to 100%"

  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    fontWeight: "700"
    fontSize: "0.75rem"
    textTransform: "uppercase"
    letterSpacing: "0.1em"

  badge-secondary:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    fontWeight: "700"
    fontSize: "0.75rem"

  badge-tertiary:
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary-container}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
    fontWeight: "700"
    fontSize: "0.75rem"

  icon-box-primary:
    backgroundColor: "{colors.primary-container}"
    rounded: "{rounded.lg}"
    padding: "24px"
    iconColor: "{colors.primary}"

  icon-box-secondary:
    backgroundColor: "{colors.secondary-container}"
    rounded: "{rounded.lg}"
    padding: "24px"
    iconColor: "{colors.secondary}"

  icon-box-tertiary:
    backgroundColor: "{colors.tertiary-container}"
    rounded: "{rounded.lg}"
    padding: "24px"
    iconColor: "{colors.tertiary}"
---

## Overview

普通人的数字权利 (Digital Rights for All) 是一个致力于提升公众数字素养、守护个人数字权利的共创社区官网。设计风格融合现代极简主义与人文关怀，营造专业、可信赖且平易近人的视觉体验。

The UI balances professional authority with approachable warmth — like a trusted guide that speaks human, not legal.

## Colors

### Primary Palette

核心品牌色采用紫色系，传达专业性与创新精神：

- **Primary (#5E40E0)**: 主品牌色，用于按钮、重点元素、强调内容
- **Primary-dim (#5130D4)**: 深一度，用于 hover 状态
- **Primary-container (#C3B8FF)**: 浅色背景，用于徽章、小型标签

### Secondary Palette

蓝色系作为辅助色，增加沉稳与可信度：

- **Secondary (#455E93)**: 资讯类内容、辅助按钮、次要强调
- **Secondary-container (#D8E2FF)**: 资讯徽章背景

### Tertiary Palette

金色系用于行动号召与特殊标记：

- **Tertiary (#715E00)**: 行动项目、进度指示
- **Tertiary-container (#FDD400)**: 亮黄色高亮背景，手绘下划线效果

### Neutral Palette

中性色构建层次与可读性：

- **Background (#F7F9FC)**: 页面底色，浅灰蓝调
- **Surface variations**: 从 lowest (纯白) 到 highest 形成8级层次
- **Outline**: 边框与分割线

### Color Usage Patterns

| Context | Color | Usage |
|---------|-------|-------|
| 主按钮 | primary | CTA、主要行动 |
| 次按钮 | surface-container-lowest | 辅助操作 |
| 资讯标签 | secondary | 双周刊 |
| 行动标签 | tertiary | 月度盘点、行动项目 |
| 背景层次 | surface-container-* | 卡片、内容区块 |
| 文字层级 | on-surface, on-surface-variant | 正文、辅助文字 |

## Typography

使用 **Plus Jakarta Sans** 作为唯一字体，营造简洁一致的阅读体验。

### Type Scale

- **H1/Headline**: 3rem (48px), weight 800, line-height 1.1, tracking tight
- **H2**: 2rem (32px), weight 700
- **H3**: 1.5rem (24px), weight 700
- **Body Large**: 1.125rem (18px), weight 400, line-height 1.75
- **Body Medium**: 1rem (16px), weight 400, line-height 1.75
- **Body Small**: 0.875rem (14px), weight 400
- **Label**: 0.875rem (14px), weight 700
- **Label Caps**: 0.75rem (12px), weight 700, uppercase, letter-spacing 0.1em

### Font Loading

```html
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

## Layout

### Container

- **Max width**: 1280px (max-w-7xl)
- **Horizontal padding**: 24px (px-6)
- **Vertical section padding**: 80px (py-20)

### Grid System

- **Base grid**: 12 columns
- **Card grid**: 1-3 columns responsive (grid-cols-1 md:grid-cols-3)
- **Gap**: 24px (gap-6) for cards, 48px (gap-12) for larger layouts

### Page Structure

1. **Fixed Navbar**: 80px height, glass-morphism on scroll
2. **Hero**: min-height 90vh, centered content
3. **Content Sections**: alternating backgrounds using surface-container variations
4. **Footer**: rich link grid with brand info

## Elevation & Depth

### Shadows

- **None (default)**: 无阴影，用于 flat 设计
- **shadow-sm**: 轻微阴影，用于 scroll 后的 navbar
- **shadow-lg**: 中等阴影，用于卡片 hover
- **shadow-xl**: 强阴影，用于重要卡片
- **shadow-2xl**: 极强阴影，用于 Hero 图片

### Glass Effect

```css
.bg-white\/80.backdrop-blur-xl {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
}
```

## Shapes

### Border Radius

- **sm**: 8px — 小元素、徽章
- **md**: 16px — 按钮、输入框
- **lg**: 32px — 卡片、容器
- **xl**: 48px — 大型卡片
- **pill/9999px**: 胶囊形，用于标签和按钮

### Special Shapes

**Hand-drawn Underline** (手绘下划线):
```css
.after\:bg-tertiary-container::after {
  background: #fdd400;
  opacity: 0.6;
  border-radius: 100% 10% 80% 20%;
  height: 8px;
  bottom: 4px;
}
```

**Asymmetric Blob** (不对称形状):
```css
.asymmetric-shape {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
}
```

## Components

### Navigation

**Navbar**: 固定顶部，滚动后变为 glass-morphism 效果

**Desktop nav links**: 底部下划线动画扩展效果
**Mobile menu**: 从顶部滑入的全屏抽屉

### Buttons

**Primary CTA**: 紫色圆角胶囊，大号粗体，hover 上浮 + 阴影

**Secondary**: 白色背景，浅边框，hover 背景变化

### Cards

**Content Card**: 纯白背景，大圆角，内边距 32px，hover 上浮 + 阴影

**Module Card**: 浅灰背景，用于信息模块展示

### Badges

**Type badges**: 双周刊用 secondary，行动项目用 tertiary

## Do's and Don'ts

### Do

- 使用 Primary 作为主要 CTA
- 保持足够的留白 (section padding 80px)
- 在文字下方使用手绘下划线强调关键词
- 卡片使用 hover 上浮效果增加交互感
- 使用 surface-container-* 层级颜色区分区块

### Don't

- 不要在非必要处使用过多颜色
- 不要让文字直接放在纯白背景上 (应使用 surface-container-lowest)
- 不要使用过于尖锐的边角 (避免 border-radius < 8px)
- 不要混用字体 (仅使用 Plus Jakarta Sans)
- 不要忽略移动端导航体验

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| sm | 640px | 小型手机 |
| md | 768px | 平板、桌面侧栏 |
| lg | 1024px | 中等桌面 |
| xl | 1280px | 大屏桌面 |

## Motion & Animation

### Transitions

- Default duration: 300ms
- Easing: ease-out for entries, ease-in-out for state changes

### Animations

- **Pulse**: 用于活跃指示器 (2px dot)
- **Hover lift**: translateY(-2px) to translateY(-4px)
- **Link underline expand**: width 0 → 100%
- **Arrow slide**: translateX(0) → translateX(4px)

## Icons

使用 **Lucide Vue Next** 图标库。

常用图标:
- Shield: 品牌 logo
- Users: 社区/活动
- FileText: 资讯
- GraduationCap: 数字素养
- Target: 行动项目
- Calendar: 日程
- Info: 关于
- ArrowRight/ArrowUpRight: 链接指示

## Accessibility

- 确保所有按钮和链接可键盘导航
- 颜色对比度符合 WCAG AA 标准
- 使用语义化 HTML 标签
- 图片添加 alt 文本
- 移动端触控目标至少 44px