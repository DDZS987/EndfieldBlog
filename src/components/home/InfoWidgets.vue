<template>
  <section class="info-section" id="info">
    <div class="container">
      <p class="info-section__label mono">// real-time data</p>
      <div class="info-section__grid">
        <HistoryToday />
        <NewsWidget />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HistoryToday from '@/components/widgets/HistoryToday.vue'
import NewsWidget from '@/components/widgets/NewsWidget.vue'
</script>

<style lang="scss" scoped>
.info-section {
  padding: 6rem 0;
  background: var(--bg-primary);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) { padding: 4rem 0; }
  @media (max-width: 640px) { padding: 3rem 0; }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--accent-cyan), transparent);
    opacity: 0.3;
  }
}

.info-section__label {
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
}

.info-section__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
