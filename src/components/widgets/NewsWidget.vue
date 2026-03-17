<template>
  <div class="news-widget glow-border glass">
    <div class="news-widget__header">
      <span class="news-widget__icon">⚡</span>
      <h3 class="news-widget__title mono">掘金热榜</h3>
      <button class="news-widget__refresh mono" @click="store.fetch()" title="刷新">↻</button>
    </div>

    <!-- 加载中 -->
    <div v-if="store.loading" class="news-widget__list">
      <div v-for="i in 8" :key="i" class="news-widget__skeleton" />
    </div>

    <!-- 错误 -->
    <p v-else-if="store.error" class="news-widget__empty mono">{{ store.error }}</p>

    <!-- 数据 -->
    <ul v-else class="news-widget__list">
      <li v-for="(item, i) in store.data" :key="i" class="news-widget__item">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener"
          class="news-widget__link"
        >
          <span class="news-widget__index mono" :class="{ top: i < 3 }">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="news-widget__text">{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/news'

const store = useNewsStore()
onMounted(() => store.fetch())
</script>

<style lang="scss" scoped>
.news-widget {
  padding: 1.5rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: var(--glow-purple);
    border-color: rgba(123, 47, 247, 0.3);
  }
}

.news-widget__header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.news-widget__icon {
  font-size: 1.1rem;
}

.news-widget__title {
  font-size: 0.85rem;
  color: var(--accent-purple);
  letter-spacing: 0.1em;
  flex: 1;
}

.news-widget__refresh {
  font-size: 1rem;
  color: var(--text-dim);
  transition: color 0.2s, transform 0.3s;
  cursor: pointer;

  &:hover {
    color: var(--accent-purple);
    transform: rotate(180deg);
  }
}

.news-widget__list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 0.25rem;

  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(123, 47, 247, 0.2); border-radius: 2px; }
}

.news-widget__skeleton {
  height: 0.9rem;
  margin: 0.45rem 0;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  &:nth-child(odd) { width: 88%; }
  &:nth-child(even) { width: 70%; }
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.news-widget__item {
  border-bottom: var(--border-subtle);

  &:last-child { border-bottom: none; }
}

.news-widget__link {
  display: flex;
  gap: 0.6rem;
  align-items: baseline;
  padding: 0.5rem 0;
  text-decoration: none;
  transition: background 0.2s;

  &:hover .news-widget__text { color: var(--accent-purple); }
}

.news-widget__index {
  font-size: 0.68rem;
  color: var(--text-dim);
  flex-shrink: 0;
  width: 1.6rem;

  &.top { color: var(--accent-cyan); }
}

.news-widget__text {
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.4;
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-widget__empty {
  font-size: 0.82rem;
  color: var(--text-dim);
  text-align: center;
  padding: 1rem 0;
}
</style>
