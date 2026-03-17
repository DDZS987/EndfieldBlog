// ─── 项目数据 ────────────────────────────────────────────────────────────────
export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  coverStyle?: 'default' | 'contain-blur'
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  year: number
  featured: boolean
}

// ─── 时间线节点 ──────────────────────────────────────────────────────────────
export interface TimelineNode {
  date: string
  title: string
  description: string
  techs: string[]
  type: 'learning' | 'project' | 'milestone'
}

// ─── API 响应 ────────────────────────────────────────────────────────────────
export interface HitokotoResponse {
  id: number
  hitokoto: string
  type: string
  from: string
  from_who: string | null
  creator: string
  created_at: string
}


export interface NewsItem {
  title: string
  url?: string
  hint?: string        // 作者 / 阅读时长
  thumbnail?: string   // 缩略图
  image?: string       // 大图
}

// ─── 博客文章 ────────────────────────────────────────────────────────────────
export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  cover?: string
  summary?: string
  readingTime?: number
}

// ─── 通用状态 ────────────────────────────────────────────────────────────────
export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}
