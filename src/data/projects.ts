import type { Project } from '@/types'

const base = import.meta.env.BASE_URL

export const projects: Project[] = [
  {
    id: 'project-xiuxian',
    title: '开源修仙文游',
    subtitle: '纯文字 MUD 游戏 · Gitee 开源 · 5万+ 用户存档',
    description:
      '最早期作品。基于 Node.js 构建的纯文字修仙游戏，支持角色养成、战斗系统与多人存档。游戏官方群用户存档运营最高达 5 万人+（不含第三方开服），Gitee 仓库访问量突破 1.5 万。',
    coverImage: `${base}images/project-xiuxian.webp`,
    techStack: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
    githubUrl: 'https://gitee.com/hutao222/DDZS-XIUXIAN-V1.3.0',
    year: 2023,
    featured: true,
  },
  {
    id: 'project-sgs',
    title: '三国杀钓鱼脚本',
    subtitle: '游戏自动化脚本 · 教程播放量 50 万 · 频道 6 万成员',
    description:
      '基于 Python + Android ADB 的三国杀手游自动化脚本。从零自研钓鱼逻辑与图像识别方案，相关教程视频累计播放量达 50 万，创立的阿超钓鱼频道成员近 6 万人。版本数据通过自建 API 动态下发，支持多版本在线更新。',
    coverImage: `${base}images/project-sgs.webp`,
    coverStyle: 'contain-blur',
    techStack: ['Python', 'Android', 'ADB', 'Vue3', 'Django'],
    demoUrl: 'https://wwcw.lanzoue.com/b00uyg8l2d',
    year: 2025,
    featured: true,
  },
  {
    id: 'project-mnemosyne',
    title: 'Mnemosyne 记忆插件',
    subtitle: 'AstrBot 长期记忆 · 五层架构 · GraphRAG 双螺旋检索 · 开发中',
    description:
      'AstrBot 的高级长期记忆插件，实现仿人类记忆的五层递进架构（L1–L5）。引入三评审员管道进行 CBAS 四级记忆分级，结合 GraphRAG 双螺旋检索技术。融合荣格心理分析与弗洛伊德心理学构建 L5 用户画像层，附带 Vue 3 + FastAPI 可视化管理面板。',
    coverImage: `${base}images/project-memory.webp`,
    techStack: ['Python', 'Vue3', 'FastAPI', 'Milvus', 'GraphRAG', 'AI Agent', 'MCP'],
    year: 2026,
    featured: true,
  },
  {
    id: 'project-opensource',
    title: 'GitHub 开源社区贡献',
    subtitle: '高质量 PR & Issues · 18.9k★ 项目 · 持续活跃',
    description:
      '深度参与开源社区，向 18.9k star 的 sub2api 项目提交高质量 Bug 修复 PR（#385），并向 AstrBot 提交 PR（#4893）。同时主动提出 P0 级高质量 Issues，推动核心功能改进，获得项目维护者认可。',
    coverImage: `${base}images/project-github.webp`,
    techStack: ['GitHub', 'Open Source', 'Python', 'Bug Fix', 'Code Review'],
    githubUrl: 'https://github.com/Wei-Shaw/sub2api/pull/385',
    year: 2026,
    featured: true,
  },
]
