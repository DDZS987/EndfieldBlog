# 《明日方舟:终末地》风格个人博客

> 基于 Vue 3 + TypeScript 构建的个人作品集网站，采用 Endfield 风格设计语言（只是一个作业）

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

### 核心框架

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.5.13 | 组合式 API + `<script setup>` 语法，响应式数据驱动 |
| TypeScript | ~5.6.2 | 类型安全，接口定义，代码提示与静态检查 |
| Vite | ^6.0.5 | 下一代构建工具，HMR 热更新，ESM 原生支持 |

### 路由与状态

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue Router | ^4.5.0 | SPA 路由管理，懒加载，滚动行为控制 |
| Pinia | ^2.2.6 | 轻量级状态管理，支持组合式 API，模块化 Store |

### 动画与 3D

| 技术 | 版本 | 用途 |
|------|------|------|
| GSAP | ^3.12.5 | 专业级动画库，ScrollTrigger 滚动驱动，时间线编排 |
| Anime.js | ^3 | 轻量动画引擎，复杂序列动画，DOM 属性动画 |
| Three.js | ^0.170.0 | WebGL 3D 渲染，背景粒子场景，自定义着色器 |

### 样式系统

| 技术 | 版本 | 用途 |
|------|------|------|
| SCSS | ^1.82.0 | CSS 预处理器，变量、嵌套、混合宏 |
| Bootstrap | ^5.3.8 | 响应式栅格系统，基础组件样式 |

### 博客系统

| 技术 | 版本 | 用途 |
|------|------|------|
| unplugin-vue-markdown | ^0.26.2 | Markdown 作为 Vue 组件，支持 frontmatter 元数据 |

### 开发工具

| 技术 | 版本 | 用途 |
|------|------|------|
| vue-tsc | ^2.1.10 | Vue 单文件组件类型检查 |
| @fullhuman/postcss-purgecss | ^8.0.0 | 生产构建 CSS 清理，移除未使用样式 |

### 构建优化

```typescript
// vite.config.ts - 代码分割策略
manualChunks: {
  'three': ['three'],      // Three.js 独立打包 (~500KB)
  'gsap': ['gsap'],        // GSAP 独立打包
  'vue-core': ['vue', 'vue-router', 'pinia'], // Vue 生态合并
}
```

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

UI 设计灵感来源于《明日方舟：终末地》(Arknights: Endfield)，融合工业科幻美学与现代前端技术，构建了一套完整的视觉系统。

### 色彩系统

| 用途 | 色值 | 说明 |
|------|------|------|
| 终端黄 | `#FFFF0F` | 主色调，模拟工业终端显示器的荧光质感 |
| 警戒粉 | `#FF1AAC` | 辅助色，用于三色横条装饰与状态提示 |
| 信号绿 | `#00FFA2` | 辅助色，与粉/黄构成终末地经典三色组合 |
| 深炭黑 | `#1A1A1A` | 主强调色，用于标题与重要文字 |
| 多层级灰 | `#FAFAFA` → `#EFEFEF` | 背景层级，通过微妙的灰度差异构建空间感 |

### 设计风格

- **工业科幻美学** — 等高线纹理 (contourline)、虚线分隔条、HUD 扫描线动画，营造未来工业基地的终端界面感
- **斜切角面板** — 采用 `clip-path: polygon()` 实现双斜切角（右上 + 左下），模仿游戏 UI 的硬朗边缘
- **毛玻璃效果** — `backdrop-filter: blur()` 实现半透明卡片，在纹理叠加层之上保持内容可读性
- **发光效果** — 终端黄呼吸灯动画 (`yellowBreath`)、光晕脉冲 (`glowPulse`)，强化交互反馈

### 字体系统

| 字体 | 用途 | 特点 |
|------|------|------|
| Gilroy | 英文标题/展示 | 几何无衬线，字重 500–900，现代工业感 |
| HarmonyOS Sans SC | 中文正文 | 华为鸿蒙字体，字重 400–900，清晰易读 |
| Akrobat | 数字/版本号 | 窄体字，用于编号与技术标签 |
| JetBrains Mono | 代码块 | 等宽字体，清晰区分 `1lI` 与 `0O` |

### 视觉元素

- **三色横条** — 粉:黄:绿 = 1:1:2 比例竖向堆叠，作为页面区块标识
- **黄圈节点** — 带呼吸动画的圆形装饰，暗示数据流动与系统状态
- **点阵装饰** — 3×3 网格点阵，用于标题区域视觉平衡
- **UI 分隔条** — 黄条 + 灰条 + 纹理边框组合，划分内容层级
- **ENDFIELD 水印** — 底部大字水印，带从左到右渐隐的遮罩效果

### 动画体系

- **GSAP ScrollTrigger** — 滚动驱动的入场动画与视差效果
- **Anime.js** — 复杂序列动画编排
- **CSS Keyframes** — 呼吸灯、漂浮、扫描线等轻量循环动画
- **缓动函数** — `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) 实现弹性结束感

## 开源协议

MIT License

---

> ARKNIGHTS: ENDFIELD © Hypergryph. This project is a fan-made portfolio and is not affiliated with Hypergryph.
