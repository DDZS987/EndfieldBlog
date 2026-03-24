<template>
  <div class="slide">
    <!-- 封面图层 -->
    <div class="slide__cover" :class="{ 'slide__cover--contain-blur': project.coverStyle === 'contain-blur' }">
      <img v-if="project.coverImage" :src="project.coverImage" :alt="project.title" class="slide__img" loading="lazy" />
      <div v-else class="slide__cover-placeholder" />
    </div>

    <!-- 内容面板：endfield-card 全局类注入等高线纹理 -->
    <div class="slide__panel endfield-card">

      <!-- 序号 -->
      <p class="slide__index akrobat">
        PROJECT_{{ String(index + 1).padStart(2, '0') }}
      </p>

      <!-- 标题 -->
      <h2 class="slide__title">{{ project.title }}</h2>
      <p class="slide__subtitle">{{ project.subtitle }}</p>

      <!-- 描述 -->
      <p class="slide__desc">{{ project.description }}</p>

      <!-- 技术标签（统一终端风格） -->
      <div class="slide__tags">
        <span v-for="tech in project.techStack" :key="tech" class="slide__tag">
          <span class="slide__tag-prefix" aria-hidden="true">&gt;</span>{{ tech }}
        </span>
      </div>

      <!-- 操作按钮 -->
      <div class="slide__actions">
        <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener"
          class="slide__btn slide__btn--outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          SOURCE
        </a>
        <span v-else class="slide__btn slide__btn--wip">开发中</span>
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener"
          class="slide__btn slide__btn--primary">
          DEMO →
        </a>
      </div>

      <!-- 年份 -->
      <p class="slide__year akrobat">{{ project.year }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types'

defineProps<{
  project: Project
  index: number
}>()
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 40% 1fr;
  }
}

// ── 封面 ──────────────────────────────────────────────────────────────────────
.slide__cover {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: transparent;

  &--contain-blur {
    display: flex;
    align-items: center;
    justify-content: center;

    .slide__img {
      width: auto;
      height: auto;
      max-width: 92%;
      max-height: 86%;
      object-fit: unset;
      object-position: unset;
      border-radius: 2px;
      mask-image:
        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
        linear-gradient(to right,  transparent 0%, black 15%, black 85%, transparent 100%);
      mask-composite: intersect;
      -webkit-mask-image:
        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
        linear-gradient(to right,  transparent 0%, black 15%, black 85%, transparent 100%);
      -webkit-mask-composite: source-in;
      filter: drop-shadow(0 0 24px rgba(0, 0, 0, 0.8));
      transition: transform 0.8s var(--ease-out-expo);

      .slide__cover:hover & { transform: scale(1.04); }
    }
  }
}

.slide__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
  mask-image:
    linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%),
    linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-image:
    linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%),
    linear-gradient(to right,  transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-composite: source-in;
  transition: transform 0.8s var(--ease-out-expo);

  .slide__cover:hover & { transform: scale(1.03); }
}

.slide__cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
    rgba(240, 240, 240, 0.9) 0%,
    rgba(230, 230, 230, 0.95) 100%);
}


// ── 内容面板（背景/切角/纹理由全局 .endfield-card 处理）─────────────────────
.slide__panel {
  padding: 3.5rem 3rem 3.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  // 左侧引导线
  border-left: 3px solid rgba(255, 255, 15, 0.28);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.slide__index {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  color: var(--accent-steel);
}

.slide__title {
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: clamp(1.6rem, 2.8vw, 2.6rem);
  letter-spacing: -0.02em;
  color: #0E0E0E;
  line-height: 1.05;
}

.slide__subtitle {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 0.88rem;
  color: #6B6B6B;
  font-style: normal;
  letter-spacing: 0.04em;
}

.slide__desc {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 0.88rem;
  // 提升正文对比度
  color: #505060;
  line-height: 1.75;
  max-width: 460px;
  // 左侧引导线（琥珀金，适配浅色背景）
  padding-left: 0.8rem;
  border-left: 3px solid rgba(255, 255, 15, 0.45);
}

// ── 技术标签（与 TechBadge 统一冷灰风格） ─────────────────────────────────────
.slide__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.slide__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.28rem;
  padding: 0.28rem 0.65rem;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.12);
  clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%);
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #303030;
  white-space: nowrap;
  transition: border-color 0.18s, color 0.18s, transform 0.18s var(--ease-out-expo);

  &:hover {
    border-color: var(--accent-yellow);
    color: var(--accent-yellow);
    transform: translateX(2px);
  }
}

.slide__tag-prefix {
  font-family: var(--font-code);
  font-size: 0.58rem;
  color: rgba(0, 0, 0, 0.25);
}

// ── 操作按钮 ──────────────────────────────────────────────────────────────────
.slide__actions {
  display: flex;
  gap: 0.65rem;
  margin-top: 0.2rem;
}

.slide__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 1.1rem;
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.22s ease;
  cursor: pointer;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));

  &--outline {
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: var(--text-secondary);
    background: transparent;

    &:hover {
      border-color: rgba(0, 0, 0, 0.35);
      color: var(--text-primary);
    }
  }

  &--wip {
    border: 1px solid rgba(200, 169, 110, 0.3);
    color: var(--accent-gold);
    background: rgba(200, 169, 110, 0.06);
    cursor: default;
    opacity: 0.7;
  }

  &--primary {
    background: rgba(255, 255, 15, 0.06);
    border: 1px solid rgba(255, 255, 15, 0.40);
    color: var(--accent-yellow);

    &:hover {
      background: rgba(255, 255, 15, 0.10);
      box-shadow: var(--glow-yellow);
    }
  }
}

.slide__year {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  margin-top: auto;
}
</style>
