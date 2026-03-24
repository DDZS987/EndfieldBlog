<template>
  <!-- 开屏加载动画 -->
  <LoadingOverlay :duration="4000" @complete="onLoadingComplete" />
  <!-- 全局等高线纹理叠加层（临行事项 contourline.png） -->
  <div class="app-contour" aria-hidden="true" />
  <!-- 全局 title-endfield SVG 水印叠层 -->
  <div class="app-title-endfield" aria-hidden="true" />
  <NavBar />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <SiteFooter />
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import NavBar from '@/components/common/NavBar.vue'
import SiteFooter from '@/components/common/SiteFooter.vue'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'

const loadingDone = ref(false)
provide('loadingDone', loadingDone)

function onLoadingComplete() {
  loadingDone.value = true
}
</script>

<style lang="scss">
// 全局 maskBg 纹理叠层（白底之上，multiply 混合使白区透明）
.app-contour {
  position: fixed;
  inset: 0;
  z-index: 8000;
  pointer-events: none;
  background-image: url('/assets/endfield/imgs/maskBg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  mix-blend-mode: multiply;
  opacity: 0.55;

  @media (max-width: 768px) {
    background-image:
      url('/assets/endfield/imgs/dash_line.png'),
      url('/assets/endfield/imgs/bg-cloud.png');
    background-size:
      100vw auto,
      contain;
    background-position:
      left 75px,
      left bottom;
    background-repeat:
      no-repeat,
      no-repeat;
    mix-blend-mode: normal;
    filter: invert(1);
    opacity: 0.2;
  }
}

// ─── title-endfield SVG 水印（全局，右下角贴边）────────────────────────────
.app-title-endfield {
  position: fixed;
  inset: 0;
  z-index: 7999;
  pointer-events: none;
  background-image: url('/assets/endfield/imgs/title-endfield.svg');
  background-repeat: no-repeat;
  background-size: 40vw auto;
  background-position: right bottom;
  opacity: 0.1;
  mix-blend-mode: multiply;
}

// ─── 页面切换过渡 ───────────────────────────────────────────────────────────
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s var(--ease-out-expo),
    transform 0.35s var(--ease-out-expo);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
