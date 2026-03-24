<template>
  <div class="tech-badge" :class="`tech-badge--${category}`">
    <span class="tech-badge__prefix" aria-hidden="true">&gt;</span>
    <span class="tech-badge__name">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  category: 'frontend' | 'backend' | 'ai' | 'tool' | 'language'
}>()
</script>

<style lang="scss" scoped>
// ─── 全局统一基础底色：冷灰调，克制一致 ───────────────────────────────────────
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.32rem;
  padding: 0.32rem 0.78rem;
  background: transparent;
  // 所有标签统一冷灰半透明边框
  border: 1px solid rgba(0, 0, 0, 0.12);
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.84rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  // 所有标签文字统一冷白
  color: #303030;
  transition: border-color 0.18s ease,
              color 0.18s ease,
              transform 0.18s var(--ease-out-expo),
              box-shadow 0.18s ease;
  cursor: default;

  // ── 终端 > 前缀（静止时暗灰，AI 类特化为黄色）─────────────────────────────
  .tech-badge__prefix {
    font-family: var(--font-code);
    font-size: 0.76rem;
    // 基础颜色：暗灰
    color: rgba(0, 0, 0, 0.28);
    flex-shrink: 0;
    transition: color 0.18s;
  }

  // ── Hover：边框黄 + 文字纯白 + 右移 + 黄色发光 ────────────────────────────
  &:hover {
    border-color: var(--accent-yellow);
    color: #FFFFFF;
    transform: translateX(2px);
    box-shadow: 0 0 10px rgba(255, 255, 15, 0.18), inset 0 0 8px rgba(255, 255, 15, 0.04);

    .tech-badge__prefix {
      color: rgba(255, 255, 15, 0.6);
    }
  }
}

// ── 分类差异：仅通过 > 前缀颜色区分，边框和文字保持统一冷灰 ────────────────
// AI & DB：前缀显示为终末黄，是视觉重点的唯一提示
.tech-badge--ai .tech-badge__prefix {
  color: rgba(255, 255, 15, 0.7);
}

// Frontend：前缀稍深
.tech-badge--frontend .tech-badge__prefix {
  color: rgba(0, 0, 0, 0.38);
}

// Backend / Tool / Language：使用基础暗灰前缀（无需特化，继承基础样式）

.tech-badge__name {
  white-space: nowrap;
}
</style>
