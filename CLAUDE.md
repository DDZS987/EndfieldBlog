# CLAUDE.md — Personal Portfolio 项目说明

## 项目概览

个人作品集网站，基于 **Vue 3 + Vite + TypeScript**，深色星空风格设计。

- 包管理器：**pnpm**
- 启动开发服务器：`pnpm dev`
- 构建：`pnpm build`
- 预览构建产物：`pnpm preview`

## 技术栈

| 依赖 | 用途 |
|------|------|
| Vue 3 + `<script setup>` | 框架 |
| Vue Router | 路由 |
| Pinia | 状态管理 |
| GSAP | 动画（ScrollTrigger、scrub） |
| Three.js | 首页星空粒子背景 |
| Bootstrap 5 | UI 框架（表面引入，自定义 SCSS 完全覆盖） |
| SCSS | 样式主体（scoped + 全局） |

## Bootstrap 使用策略（重要）

Bootstrap 5 作为**真实依赖**安装，但视觉上完全由自定义 SCSS 控制：

- `main.ts` 中 Bootstrap CSS 在 `global.scss` **之前** import，自定义样式自然覆盖
- 组件模板上撒有 BS5 语义类名，功能性类名位置：
  - `NavBar.vue`：`navbar-dark navbar-expand-md`、`navbar-brand`、`nav-link`、`navbar-toggler`
  - `GlowButton.vue`：`btn`（与 `glow-btn` 并列）
  - `BlogView.vue`：`row g-4` / `col-12 col-md-6 col-xl-4`（包 PostCard）
  - `StackView.vue`：`row gx-5` / `col-lg-4` / `col-lg-8`
- **不要移除这些 BS5 类名**，也不要为了"整洁"将其拆分

## 目录结构

```
src/
├── components/
│   ├── common/          # NavBar、GlowButton、SceneBackground
│   ├── home/            # HeroSection、ProjectCarousel、StackPreview、InfoWidgets
│   ├── stack/           # TechBadge、Timeline
│   ├── blog/            # PostCard
│   └── widgets/         # HitokotoWidget、HistoryToday、NewsWidget
├── stores/              # Pinia stores（含 localStorage 缓存）
│   ├── hitokoto.ts
│   ├── history.ts
│   └── news.ts
├── views/               # HomeView、StackView、BlogView、BlogPostView
├── posts/               # Markdown 博客文章（frontmatter: title/date/tags/cover/summary）
├── types/index.ts       # PostMeta、Project 等全局类型
├── styles/              # 全局样式
│   ├── _variables.scss  # CSS 变量 + SCSS 断点变量
│   ├── _reset.scss      # 基础重置
│   ├── _animations.scss # @keyframes + 工具类
│   └── global.scss      # 全局工具类、字体、滚动条
└── data/                # 项目列表、技术栈等静态数据
```

## CSS 变量体系

```scss
// 背景层级
--bg-void: #020508       --bg-primary: #060a0f
--bg-secondary: #0d1421  --bg-card: rgba(13,20,33,0.7)

// 强调色
--accent-cyan: #00d2ff   --accent-purple: #7b2ff7
--accent-gold: #c8a96e   --accent-red: #ff4d6d

// 文字
--text-primary: #e8f4fd  --text-secondary: #8ba3c7
--text-dim: #3a5070

// 发光效果（box-shadow）
--glow-cyan / --glow-purple / --glow-gold

// 边框
--border-glow  --border-subtle

// 缓动
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
```

## 组件复杂度参考

| 组件 | 复杂度 | 核心技术 |
|------|--------|---------|
| ProjectCarousel | 极高 | GSAP ScrollTrigger pin + scrub，移动端 scroll-snap |
| Timeline | 极高 | GSAP scroll 触发，绝对定位竖线/圆点 |
| ProjectSlide | 极高 | CSS mask-image 遮罩，径向渐变 |
| HeroSection | 高 | 打字机动画，clamp() 响应式字体 |
| NavBar | 高 | 固定定位，汉堡菜单动画，drawer 抽屉 |
| BlogPostView | 高 | Markdown 全局渲染样式（非 scoped） |
| TechBadge | 中 | 5 种 category 颜色变体 |
| PostCard | 高 | 玻璃态卡片，glow-line scaleX 动画 |
| StackView / StackPreview | 中 | sticky 侧边栏，响应式 Grid |
| GlowButton | 中 | 渐变边框，3 种 variant |

## API 接口

| 组件 | API | 返回格式 |
|------|-----|---------|
| HitokotoWidget | `https://v1.hitokoto.cn/` | `{ hitokoto, from }` |
| HistoryToday | `https://v2.xxapi.cn/api/history` | `{ code, data: string[] }` |
| NewsWidget | `https://orz.ai/api/v1/dailynews/?platform=juejin` | `{ status, data: [{title,url,score,desc}] }` |

## 页面结构

```
HomeView
├── SceneBackground   # Three.js 星空（fixed z-index:0，pointer-events:none）
├── HeroSection       # 打字机 + 职业标签 + 一言 + CTA 按钮
├── StackPreview      # 技术栈预览（桌面 sticky 侧栏）
└── ProjectCarousel   # GSAP ScrollTrigger 轮播

StackView
├── TechBadge 列表（sticky aside）
└── Timeline（GSAP 动画）

BlogView → PostCard 网格
BlogPostView → Markdown 渲染（含全局非 scoped 样式）
```

## 开发约定

- 样式变量统一在 `src/styles/` 中定义，使用 CSS 变量（`var(--accent-cyan)` 等）
- 组件内样式使用 `<style lang="scss" scoped>`，BlogPostView 有额外 unscoped 块
- API 数据统一通过 Pinia store 管理，store 内含本地缓存逻辑（localStorage）
- 不要修改 `dist/` 目录，由 `pnpm build` 生成
- 博客文章放在 `src/posts/*.md`，frontmatter 字段：`title`、`date`、`tags`、`cover`、`summary`
