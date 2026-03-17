<template>
  <section class="stack-section" id="stack">
    <div class="stack-section__body container">

      <!-- 左：标题 + 技术图标，整体 sticky -->
      <aside class="stack-section__aside">
        <p class="stack-section__label mono">// 02 · stack</p>
        <h2 class="stack-section__title">技术栈 &<br>学习历程</h2>
        <p class="stack-section__sub">从零到现在，记录每一个技术节点。</p>

        <div class="stack-section__groups">
          <div v-for="group in techGroups" :key="group.label" class="stack-section__group">
            <p class="stack-section__group-label mono">{{ group.label }}</p>
            <div class="stack-section__badge-list">
              <TechBadge v-for="tech in group.items" :key="tech" :name="tech" :category="group.category" />
            </div>
          </div>
        </div>
      </aside>

      <!-- 右：时间线 -->
      <div class="stack-section__timeline">
        <Timeline />
      </div>

    </div>
  </section>
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
    items: ['GraphRAG', 'Milvus', 'Qdrant', 'SQLite', 'MongoDB', 'MySQL'],
  },
  {
    label: '// tools',
    category: 'tool' as const,
    items: ['Git', 'pnpm', 'Webpack', 'ESLint', 'Prettier'],
  },
]
</script>

<style lang="scss" scoped>
.stack-section {
  background: var(--bg-primary);
  position: relative;
  z-index: 1;

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

.stack-section__body {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 4rem;
  align-items: start;
  padding-top: 5rem;
  padding-bottom: 5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  @media (max-width: 640px) {
    gap: 2rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

// 左侧整体 sticky，标题和徽章一起固定
.stack-section__aside {
  position: sticky;
  top: var(--nav-height);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1rem;

  @media (max-width: 1024px) {
    position: static;
  }
}

.stack-section__label {
  font-size: 0.72rem;
  color: var(--accent-cyan);
  letter-spacing: 0.2em;
}

.stack-section__title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.stack-section__sub {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.stack-section__groups {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stack-section__group-label {
  font-size: 0.72rem;
  color: var(--text-dim);
  letter-spacing: 0.2em;
  margin-bottom: 0.6rem;
}

.stack-section__badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.stack-section__timeline {
  padding-top: 1rem;
}
</style>
