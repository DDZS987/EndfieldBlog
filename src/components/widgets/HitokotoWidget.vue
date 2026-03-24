<template>
  <div class="hitokoto-widget">
    <!-- 加载中 -->
    <div v-if="store.loading" class="hitokoto-widget__skeleton-wrap">
      <div class="hitokoto-widget__skeleton hitokoto-widget__skeleton--long" />
      <div class="hitokoto-widget__skeleton hitokoto-widget__skeleton--short" />
    </div>

    <!-- 有数据 -->
    <template v-else-if="store.data">
      <p class="hitokoto-widget__text">{{ store.data.hitokoto }}</p>
      <span class="hitokoto-widget__from mono">
        —— {{ store.data.from_who ? `${store.data.from_who} · ` : '' }}{{ store.data.from }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHitokotoStore } from '@/stores/hitokoto'

const store = useHitokotoStore()

onMounted(() => {
  if (!store.data) store.fetch()
})
</script>

<style lang="scss" scoped>
.hitokoto-widget {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
//  padding: 0 1.25rem;
  border-left: 2px solid rgba(242, 242, 242, 0.25);
  text-align: left;
}

.hitokoto-widget__text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-style: italic;
}

.hitokoto-widget__from {
  font-size: 0.78rem;
  color: var(--text-dim);
}

.hitokoto-widget__skeleton-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hitokoto-widget__skeleton {
  height: 0.9rem;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  &--long  { width: 80%; }
  &--short { width: 35%; }
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
