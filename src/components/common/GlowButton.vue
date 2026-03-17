<template>
  <component
    :is="tag"
    class="glow-btn btn"
    :class="[`glow-btn--${variant}`, { 'glow-btn--outline': outline }]"
    v-bind="$attrs"
  >
    <span class="glow-btn__inner">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  tag?: string
  variant?: 'cyan' | 'purple' | 'gold'
  outline?: boolean
}>(), {
  tag: 'button',
  variant: 'cyan',
  outline: false,
})
</script>

<style lang="scss" scoped>
.glow-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  text-transform: uppercase;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: inherit;
  }

  &:hover {
    transform: translateY(-2px);
    &::before { opacity: 1; }
  }

  &:active { transform: translateY(0); }

  // ── 青色变体 ──
  &--cyan {
    background: linear-gradient(135deg, rgba(0, 210, 255, 0.15), rgba(0, 210, 255, 0.05));
    border: 1px solid rgba(0, 210, 255, 0.4);
    color: var(--accent-cyan);

    &::before {
      background: linear-gradient(135deg, rgba(0, 210, 255, 0.25), rgba(0, 210, 255, 0.1));
    }

    &:hover { box-shadow: var(--glow-cyan); }
  }

  // ── 紫色变体 ──
  &--purple {
    background: linear-gradient(135deg, rgba(123, 47, 247, 0.15), rgba(123, 47, 247, 0.05));
    border: 1px solid rgba(123, 47, 247, 0.4);
    color: var(--accent-purple);

    &::before {
      background: linear-gradient(135deg, rgba(123, 47, 247, 0.25), rgba(123, 47, 247, 0.1));
    }

    &:hover { box-shadow: var(--glow-purple); }
  }
}
</style>
