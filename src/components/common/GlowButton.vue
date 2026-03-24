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
  variant?: 'white' | 'yellow' | 'steel'
  outline?: boolean
}>(), {
  tag: 'button',
  variant: 'white',
  outline: false,
})
</script>

<style lang="scss" scoped>
.glow-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.8rem;
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  cursor: pointer;
  transition: box-shadow 0.25s ease, transform 0.2s ease, background-color 0.2s;
  text-transform: uppercase;
  overflow: hidden;
  border-radius: 0;
  // 终末地斜切角
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.25s;
  }

  &:hover {
    transform: translateY(-2px);
    &::before { opacity: 1; }
  }

  &:active { transform: translateY(0); }

  // ── 冷白变体（主要按钮）
  &--white {
    background: rgba(208, 208, 208, 0.08);
    border: 1px solid rgba(208, 208, 208, 0.3);
    color: var(--text-primary);

    &::before {
      background: rgba(208, 208, 208, 0.12);
    }

    &:hover { box-shadow: var(--glow-primary); }
  }

  // ── 终端黄变体（强调按钮）
  &--yellow {
    background: rgba(255, 255, 15, 0.08);
    border: 1px solid rgba(255, 255, 15, 0.4);
    color: var(--accent-yellow);

    &::before {
      background: rgba(255, 255, 15, 0.12);
    }

    &:hover { box-shadow: var(--glow-yellow); }
  }

  // ── 钢铁灰变体（次要按钮）
  &--steel {
    background: rgba(99, 99, 99, 0.08);
    border: 1px solid rgba(99, 99, 99, 0.35);
    color: var(--accent-steel);

    &::before {
      background: rgba(99, 99, 99, 0.12);
    }

    &:hover {
      box-shadow: 0 0 16px rgba(99, 99, 99, 0.25);
      color: var(--text-secondary);
    }
  }

  // 兼容旧 variant 名（向后兼容）
  &--cyan   { @extend .glow-btn--white; }
  &--purple { @extend .glow-btn--yellow; }
}
</style>
