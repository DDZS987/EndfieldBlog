<template>
  <div class="tech-badge" :class="`tech-badge--${category}`">
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
.tech-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.9rem;
  border-radius: 3px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  transition: all 0.25s ease;
  cursor: default;

  &:hover {
    transform: translateY(-2px);
  }

  &--frontend {
    background: rgba(0, 210, 255, 0.08);
    border: 1px solid rgba(0, 210, 255, 0.25);
    color: var(--accent-cyan);
    &:hover { box-shadow: var(--glow-cyan); }
  }

  &--backend {
    background: rgba(123, 47, 247, 0.08);
    border: 1px solid rgba(123, 47, 247, 0.25);
    color: var(--accent-purple);
    &:hover { box-shadow: var(--glow-purple); }
  }

  &--ai {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.25);
    color: #10b981;
    &:hover {
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.35);
    }
  }

  &--tool {
    background: rgba(200, 169, 110, 0.08);
    border: 1px solid rgba(200, 169, 110, 0.25);
    color: var(--accent-gold);
    &:hover { box-shadow: var(--glow-gold); }
  }

  &--language {
    background: rgba(255, 255, 255, 0.04);
    border: var(--border-subtle);
    color: var(--text-secondary);
    &:hover { border-color: rgba(255, 255, 255, 0.15); }
  }
}

.tech-badge__name {
  white-space: nowrap;
}
</style>
