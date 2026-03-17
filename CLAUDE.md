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
| GSAP | 动画 |
| Three.js | 首页星空粒子背景 |
| SCSS | 样式（scoped） |

## 目录结构

```
src/
├── components/
│   ├── common/          # 通用组件（GlowButton、SceneBackground 等）
│   ├── home/            # 首页专属组件（HeroSection、ProjectCarousel、InfoWidgets）
│   └── widgets/         # 数据展示小组件
│       ├── HitokotoWidget.vue   # 一言（首页展示）
│       ├── HistoryToday.vue     # 历史上的今天
│       └── NewsWidget.vue       # 掘金热榜
├── stores/              # Pinia stores
│   ├── hitokoto.ts      # 一言 API
│   ├── history.ts       # 历史上的今天 API
│   └── news.ts          # 掘金热榜 API
├── views/               # 页面视图
├── types/index.ts       # 全局类型定义
├── styles/              # 全局样式、CSS 变量
└── data/                # 静态数据（项目、技术栈等）
```

## API 接口

| 组件 | API | 说明 |
|------|-----|------|
| HitokotoWidget | `https://v1.hitokoto.cn/` | 一言，展示在首页 Hero 区域 |
| HistoryToday | `https://v2.xxapi.cn/api/history` | 历史上的今天，返回 `{ code, data: string[] }` |
| NewsWidget | `https://orz.ai/api/v1/dailynews/?platform=juejin` | 掘金热榜，返回 `{ status, data: [{title,url,score,desc}] }` |

## 页面结构

```
HomeView
├── SceneBackground   # Three.js 星空背景（全页面固定）
├── HeroSection       # 首屏：名字打字机 + 职业标签 + 一言 + CTA 按钮
├── ProjectCarousel   # 项目展示轮播
└── InfoWidgets       # 实时数据区：历史上的今天 + 掘金热榜
```

## 开发约定

- 样式变量统一在 `src/styles/` 中定义，使用 CSS 变量（`var(--accent-cyan)` 等）
- 组件内样式使用 `<style lang="scss" scoped>`
- API 数据统一通过 Pinia store 管理，store 内含本地缓存逻辑（localStorage）
- 不要修改 `dist/` 目录，由 `pnpm build` 生成
