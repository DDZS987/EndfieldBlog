<template>
  <div class="history-widget glow-border glass">
    <div class="history-widget__header">
      <span class="history-widget__icon">📅</span>
      <h3 class="history-widget__title mono">历史上的今天</h3>
      <span class="history-widget__date mono">{{ todayLabel }}</span>
    </div>

    <!-- 加载中 -->
    <div v-if="store.loading" class="history-widget__list">
      <div v-for="i in 5" :key="i" class="history-widget__skeleton" />
    </div>

    <!-- 错误 -->
    <p v-else-if="store.error" class="history-widget__empty mono">
      {{ store.error }}
    </p>

    <!-- 数据 -->
    <ul v-else class="history-widget__list">
      <li
        v-for="(item, i) in store.content"
        :key="i"
        class="history-widget__item"
      >
        <span class="history-widget__index mono">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="history-widget__text">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useHistoryStore } from '@/stores/history'

const store = useHistoryStore()

const todayLabel = computed(() => {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}年${m}月${day}日`
})

onMounted(() => store.fetch())
</script>

<style lang="scss" scoped>
.history-widget {
  padding: 1.5rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: var(--glow-cyan);
  }
}

.history-widget__header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.history-widget__icon {
  font-size: 1.1rem;
}

.history-widget__title {
  font-size: 0.85rem;
  color: var(--accent-cyan);
  letter-spacing: 0.1em;
  flex: 1;
}

.history-widget__date {
  font-size: 0.75rem;
  color: var(--text-dim);
}

.history-widget__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.25rem;

  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(0, 210, 255, 0.2); border-radius: 2px; }
}

.history-widget__skeleton {
  height: 1rem;
  margin: 0.4rem 0;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  &:nth-child(odd) { width: 90%; }
  &:nth-child(even) { width: 75%; }
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.history-widget__item {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  padding: 0.45rem 0;
  border-bottom: var(--border-subtle);

  &:last-child { border-bottom: none; }
}

.history-widget__index {
  font-size: 0.68rem;
  color: var(--accent-cyan);
  flex-shrink: 0;
  width: 1.6rem;
  opacity: 0.6;
}

.history-widget__text {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.history-widget__empty {
  font-size: 0.82rem;
  color: var(--text-dim);
  text-align: center;
  padding: 1rem 0;
}
</style>
