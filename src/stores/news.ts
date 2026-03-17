import { defineStore } from 'pinia'
import { ref } from 'vue'

interface NewsItem {
  title: string
  url: string
  score: string
  desc: string
}

const CACHE_KEY = 'news_juejin'
const CACHE_TTL = 30 * 60 * 1000 // 30min（与 API 刷新频率一致）

function getCache(): NewsItem[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw) as { data: NewsItem[]; ts: number }
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function setCache(data: NewsItem[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
}

export const useNewsStore = defineStore('news', () => {
  const data = ref<NewsItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    const cached = getCache()
    if (cached) {
      data.value = cached
      return
    }

    loading.value = true
    error.value = null

    try {
      const res = await window.fetch('https://orz.ai/api/v1/dailynews/?platform=juejin')
      if (!res.ok) throw new Error('Request failed')
      const json = await res.json() as { status: string; data: NewsItem[] }
      const items = (json.data ?? []).slice(0, 15)
      data.value = items
      setCache(items)
    } catch {
      error.value = '掘金热榜加载失败'
      data.value = []
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch }
})
