import { defineStore } from 'pinia'
import { ref } from 'vue'

const CACHE_KEY = 'history_today'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24h

function getCache(): string[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw) as { data: string[]; ts: number }
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function setCache(data: string[]) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
}

export const useHistoryStore = defineStore('history', () => {
  const content = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    const cached = getCache()
    if (cached) {
      content.value = cached
      return
    }

    loading.value = true
    error.value = null

    try {
      const res = await window.fetch('https://v2.xxapi.cn/api/history')
      if (!res.ok) throw new Error('Request failed')
      const json = await res.json() as { code: number; data: string[] }
      if (json.code !== 200) throw new Error('API error')
      content.value = json.data ?? []
      setCache(json.data)
    } catch {
      error.value = '历史数据加载失败'
      content.value = []
    } finally {
      loading.value = false
    }
  }

  return { content, loading, error, fetch }
})
