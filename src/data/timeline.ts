import type { TimelineNode } from '@/types'

export const timeline: TimelineNode[] = [
  {
    date: '2023-01',
    title: '编程起点：Python + Web 三件套',
    description: '从 Python 入门编程，同步学习 HTML / CSS / JavaScript 原生三件套，掌握基础数据结构与 Node.js 后端开发，完成第一个完整项目——开源修仙文游。',
    techs: ['Python', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    type: 'milestone',
  },
  {
    date: '2023-06',
    title: '开源修仙文游上线',
    description: '独立开发纯文字 MUD 修仙游戏并在 Gitee 开源。游戏官方群用户存档最高达 5 万人+，仓库访问量突破 1.5 万，是第一个获得大规模用户验证的项目。',
    techs: ['Node.js', 'JavaScript', 'Gitee', 'MUD'],
    type: 'project',
  },
  {
    date: '2024-06',
    title: '全栈扩展：Vue3 + Django',
    description: '在脚本开发同期系统学习现代前端框架与 Python 后端，掌握组件化开发、RESTful API 设计，为后续项目搭建完整的前后端技术体系。',
    techs: ['Vue3', 'TypeScript', 'Django', 'RESTful API', 'Pinia'],
    type: 'learning',
  },
  {
    date: '2024-09',
    title: '三国杀钓鱼脚本 · Python 脚本专精',
    description: '深入 Python 脚本开发，基于 Android ADB 实现三国杀手游全自动化。相关教程视频累计播放量 50 万，创立的阿超钓鱼频道成员规模近 6 万人。',
    techs: ['Python', 'Android', 'ADB', 'PIL', '图像识别', 'API'],
    type: 'project',
  },
  {
    date: '2025-11至今',
    title: 'Mnemosyne · AI Agent 落地实践',
    description: '开发 AstrBot 长期记忆插件，将荣格心理分析学与弗洛伊德心理学融入 L5 用户画像层。深入实践知识图谱存储检索、GraphRAG 双螺旋架构，以及 AI Agent、MCP、Skills 等前沿 AI 工程技术。',
    techs: ['Python', 'GraphRAG', 'Milvus', 'FastAPI', 'AI Agent', 'MCP', 'Skills', '知识图谱'],
    type: 'milestone',
  },
  {
    date: '2025-至今',
    title: '活跃开源社区 · 高质量贡献',
    description: '向 18.9k star 的 sub2api 项目提交 Bug 修复 PR，向 AstrBot 提交核心 PR，并主动提出 P0 级高质量 Issues，深度参与大型开源项目的迭代与维护。',
    techs: ['GitHub', 'Open Source', 'Code Review', 'Bug Fix'],
    type: 'project',
  },
]
