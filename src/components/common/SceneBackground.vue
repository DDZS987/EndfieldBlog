<template>
  <!-- 宇宙行星底层（镌宇铭星 bg_planet.webp） -->
  <div class="scene-planet" aria-hidden="true" />

  <!-- Three.js 粒子星空 -->
  <canvas ref="canvasRef" class="scene-bg" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThreeScene } from '@/composables/useThreeScene'

const canvasRef = ref<HTMLCanvasElement | null>(null)
useThreeScene(canvasRef)
</script>

<style lang="scss" scoped>
// 漆黑深空半球行星（镌宇铭星 bg.44de5c.webp）
.scene-planet {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url('/assets/endfield/imgs/bg_planet.webp');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 0.03;

  @media (max-width: 768px) { display: none; }
}

// Three.js 粒子层（叠加在行星之上）
.scene-bg {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.25;

  @media (max-width: 768px) { display: none; }
}
</style>
