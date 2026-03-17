<template>
  <main class="stack-page">
    <div class="stack-page__header container">
      <p class="stack-page__label mono">03 // stack</p>
      <h1 class="stack-page__title">技术栈 & 学习历程</h1>
      <p class="stack-page__sub">从零到现在，记录每一个技术节点。</p>
    </div>

    <div class="stack-page__body container row gx-5">
      <!-- 左：技术图标 -->
      <aside class="stack-page__badges col-lg-4 col-12">
        <div
          v-for="group in techGroups"
          :key="group.label"
          class="stack-page__group"
        >
          <p class="stack-page__group-label mono">{{ group.label }}</p>
          <div class="stack-page__badge-list">
            <TechBadge
              v-for="tech in group.items"
              :key="tech"
              :name="tech"
              :category="group.category"
            />
          </div>
        </div>
      </aside>

      <!-- 右：时间线 -->
      <section class="stack-page__timeline col-lg-8 col-12">
        <Timeline />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import TechBadge from '@/components/stack/TechBadge.vue'
import Timeline from '@/components/stack/Timeline.vue'

const techGroups = [
  {
    label: '// frontend',
    category: 'frontend' as const,
    items: ['Vue3', 'React', 'TypeScript', 'Vite', 'GSAP', 'Three.js'],
  },
  {
    label: '// language',
    category: 'language' as const,
    items: ['JavaScript', 'Python', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    label: '// backend',
    category: 'backend' as const,
    items: ['Node.js', 'Express', 'Django', 'FastAPI'],
  },
  {
    label: '// ai & db',
    category: 'ai' as const,
    items: ['GraphRAG', '知识图谱', 'Milvus', 'Qdrant', 'SQLite', 'MongoDB', 'MySQL'],
  },
  {
    label: '// tools',
    category: 'tool' as const,
    items: ['Git', 'pnpm', 'Webpack', 'ESLint', 'Prettier'],
  },
]
</script>

<style lang="scss" scoped>
.stack-page {
  min-height: 100vh;
  padding-top: var(--nav-height);
  background: var(--bg-primary);
}

.stack-page__header {
  padding-top: 4rem;
  padding-bottom: 3rem;
}

.stack-page__label {
  color: var(--accent-cyan);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}

.stack-page__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
}

.stack-page__sub {
  color: var(--text-secondary);
  font-size: 1rem;
}

.stack-page__body {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 4rem;
  padding-bottom: 6rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.stack-page__badges {
  position: sticky;
  top: calc(var(--nav-height) + 2rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    position: static;
  }
}

.stack-page__group-label {
  font-size: 0.72rem;
  color: var(--text-dim);
  letter-spacing: 0.2em;
  margin-bottom: 0.75rem;
}

.stack-page__badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
