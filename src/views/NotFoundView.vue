<template>
  <main class="not-found">
    <div class="not-found__content">
      <p class="not-found__code mono">404</p>
      <h1 class="not-found__title">页面未找到</h1>
      <p class="not-found__desc">你访问的页面不存在或已被移除。</p>
      <GlowButton tag="RouterLink" to="/" variant="cyan">返回首页</GlowButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import GlowButton from '@/components/common/GlowButton.vue'
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-void);
}

.not-found__content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.not-found__code {
  font-size: clamp(4rem, 18vw, 8rem);
  font-weight: 700;
  color: var(--accent-cyan);
  text-shadow: var(--glow-cyan);
  line-height: 1;
  opacity: 0.3;
}

.not-found__title {
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: var(--text-primary);
}

.not-found__desc {
  color: var(--text-secondary);
}
</style>
