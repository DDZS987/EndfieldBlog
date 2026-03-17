<template>
  <canvas ref="canvasRef" class="scene-bg" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThreeScene } from '@/composables/useThreeScene'

const canvasRef = ref<HTMLCanvasElement | null>(null)
useThreeScene(canvasRef)
</script>

<style lang="scss" scoped>
.scene-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;
}
</style>
