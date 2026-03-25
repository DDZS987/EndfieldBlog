# Personal Portfolio

> 基于 Vue 3 + TypeScript 构建的个人作品集网站，采用 Endfield 风格设计语言

[![Deploy to GitHub Pages](https://github.com/DDZS987/EndfieldBlog/actions/workflows/deploy.yml/badge.svg)](https://github.com/DDZS987/EndfieldBlog/actions/workflows/deploy.yml)

🌐 **在线预览**: [endfieldblog.online](https://endfieldblog.online)

---

## 功能特性

- **首页展示** - Hero 区域、技术栈预览、项目轮播
- **技术栈页面** - 分类展示技术能力与学习历程时间线
- **博客系统** - Markdown 驱动的技术文章，支持前置元数据
- **精美动画** - GSAP + Anime.js 驱动的流畅交互动画
- **3D 效果** - Three.js 实现的背景粒子场景
- **响应式设计** - 完美适配桌面端与移动端
- **暗色/亮色主题** - Endfield 风格的视觉系统

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 + TypeScript |
| 构建 | Vite 6 |
| 路由 | Vue Router 4 |
| 状态管理 | Pinia |
| 动画 | GSAP + Anime.js |
| 3D | Three.js |
| 样式 | SCSS + Bootstrap 5 |
| 博客 | unplugin-vue-markdown |

## 项目结构

```
src/
├── components/          # 组件
│   ├── common/          # 通用组件 (NavBar, Footer, LoadingOverlay)
│   ├── home/            # 首页组件 (Hero, StackPreview, ProjectCarousel)
│   ├── stack/           # 技术栈组件 (TechBadge, Timeline)
│   ├── blog/            # 博客组件 (PostCard)
│   └── widgets/         # 小部件 (Hitokoto, HistoryToday, News)
├── views/               # 页面视图
├── composables/         # 组合式函数
├── stores/              # Pinia 状态
├── data/                # 静态数据
├── posts/               # Markdown 博客文章
├── styles/              # 全局样式
├── types/               # TypeScript 类型定义
└── router/              # 路由配置
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm (推荐)

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 博客文章

文章存放在 `src/posts/` 目录，使用 Markdown 格式，支持以下前置元数据：

```yaml
---
title: 文章标题
date: 2026-03-25
tags:
  - Vue
  - TypeScript
cover: /images/cover.webp
summary: 文章摘要
---

文章内容...
```

## 部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages：

1. 推送到 `main` 分支自动触发部署
2. 自定义域名: `endfieldblog.online`
3. 构建产物输出到 `dist/` 目录

## 设计灵感

UI 设计灵感来源于《明日方舟：终末地》(Arknights: Endfield)，采用：

- 黄色 (#FFFF0F) 作为主强调色
- 粉色 (#FF1AAC) / 绿色 (#00FFA2) 作为辅助色
- 等高线纹理、虚线装饰条等工业风格元素
- Akrobat / Gilroy / HarmonyOS Sans 字体组合

## 开源协议

MIT License

---

> ARKNIGHTS: ENDFIELD © Hypergryph. This project is a fan-made portfolio and is not affiliated with Hypergryph.
