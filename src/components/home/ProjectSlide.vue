<template>
  <div class="slide">
    <!-- 封面图层 -->
    <div class="slide__cover" :class="{ 'slide__cover--contain-blur': project.coverStyle === 'contain-blur' }">
      <img v-if="project.coverImage" :src="project.coverImage" :alt="project.title" class="slide__img" loading="lazy" />
      <!-- 无封面图时的占位渐变 -->
      <div v-else class="slide__cover-placeholder" />
      <div class="slide__cover-overlay" />
    </div>

    <!-- 内容面板 -->
    <div class="slide__panel">
      <!-- 序号 -->
      <p class="slide__index mono">
        Project_{{ String(index + 1).padStart(2, '0') }}
      </p>

      <!-- 标题 -->
      <h2 class="slide__title">{{ project.title }}</h2>
      <p class="slide__subtitle">{{ project.subtitle }}</p>

      <!-- 描述 -->
      <p class="slide__desc">{{ project.description }}</p>

      <!-- 技术标签 -->
      <div class="slide__tags">
        <span v-for="tech in project.techStack" :key="tech" class="slide__tag mono">{{ tech }}</span>
      </div>

      <!-- 操作按钮 -->
      <div class="slide__actions">
        <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener"
          class="slide__btn slide__btn--outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          源码
        </a>
        <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener"
          class="slide__btn slide__btn--primary">
          查看演示 →
        </a>
      </div>

      <!-- 年份 -->
      <p class="slide__year mono">{{ project.year }}</p>
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
  // 截图类横向图片的深色底衬
  background:
    radial-gradient(ellipse at 30% 50%, rgba(0, 210, 255, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 50%, rgba(123, 47, 247, 0.06) 0%, transparent 60%),
    var(--bg-void);

  // ── contain-blur 特化模式 ──
  &--contain-blur {
    display: flex;
    align-items: center;
    justify-content: center;

    .slide__img {
      // 完整展示，不裁切
      width: auto;
      height: auto;
      max-width: 92%;
      max-height: 86%;
      object-fit: unset;
      object-position: unset;
      border-radius: 4px;
      // mask 直接作用于图片本身，30% 是相对图片尺寸的渐变区域
      mask-image:
        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
        linear-gradient(to right,  transparent 0%, black 15%, black 85%, transparent 100%);
      mask-composite: intersect;
      -webkit-mask-image:
        linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
        linear-gradient(to right,  transparent 0%, black 15%, black 85%, transparent 100%);
      -webkit-mask-composite: source-in;
      // 轻微投影
      filter: drop-shadow(0 0 24px rgba(0, 0, 0, 0.8));
      transition: transform 0.8s var(--ease-out-expo), filter 0.8s ease;

      .slide:hover & {
        transform: scale(1.04);
        filter: drop-shadow(0 0 32px rgba(0, 210, 255, 0.15));
      }
    }
  }
}

.slide__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center top;
  transition: transform 0.8s var(--ease-out-expo);

  .slide:hover & {
    transform: scale(1.03);
  }
}

.slide__cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,
      rgba(0, 210, 255, 0.08) 0%,
      rgba(123, 47, 247, 0.08) 50%,
      rgba(6, 10, 15, 0.8) 100%);
}

.slide__cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right,
      transparent 60%,
      var(--bg-void) 100%);

  @media (max-width: 768px) {
    background: linear-gradient(to bottom, transparent 60%, var(--bg-void) 100%);
  }
}

// ── 内容面板 ──────────────────────────────────────────────────────────────────
.slide__panel {
  padding: 4rem 3rem 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.slide__index {
  font-size: 0.75rem;
  color: var(--accent-cyan);
  letter-spacing: 0.2em;
  opacity: 0.7;
}

.slide__title {
  font-size: clamp(1.8rem, 3vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
}

.slide__subtitle {
  font-size: 1rem;
  color: var(--accent-cyan);
  font-style: italic;
}

.slide__desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 480px;
}

.slide__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.slide__tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 2px;
  background: rgba(0, 210, 255, 0.08);
  border: 1px solid rgba(0, 210, 255, 0.2);
  color: var(--accent-cyan);
  letter-spacing: 0.05em;
}

.slide__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.slide__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.2rem;
  border-radius: 3px;
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.05em;
  transition: all 0.25s ease;
  cursor: pointer;

  &--outline {
    border: var(--border-glow);
    color: var(--text-secondary);

    &:hover {
      color: var(--accent-cyan);
      box-shadow: var(--glow-cyan);
    }
  }

  &--primary {
    background: linear-gradient(135deg, rgba(0, 210, 255, 0.15), rgba(123, 47, 247, 0.15));
    border: var(--border-glow);
    color: var(--accent-cyan);

    &:hover {
      box-shadow: var(--glow-cyan);
      transform: translateX(3px);
    }
  }
}

.slide__year {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-top: auto;
}
</style>
