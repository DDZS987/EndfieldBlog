import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { HitokotoResponse } from '@/types'

export const useHitokotoStore = defineStore('hitokoto', () => {
  const data = ref<HitokotoResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      const res = await window.fetch('https://v1.hitokoto.cn/')
      if (!res.ok) throw new Error('Request failed')
      data.value = await res.json() as HitokotoResponse
    } catch (e) {
      error.value = '一言加载失败'
      data.value = {
        id: 0,
        hitokoto: '山川异域，风月同天。',
        type: 'i',
        from: '—',
        from_who: null,
        creator: '',
        created_at: '',
      }
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch }
})
