<template>
  <footer class="footer">
    <!-- 顶部漏光效果（镌宇铭星 footer_light_1.webp） -->
    <div class="footer__light" aria-hidden="true" />

    <div class="footer__inner container">
      <!-- 左侧系统状态 -->
      <div class="footer__left">
        <p class="footer__status">SYSTEM OFFLINE / MEMORY SAVED</p>
        <p class="footer__copy akrobat">© {{ currentYear }} · BUILT WITH VUE 3 + VITE</p>
      </div>

      <!-- 右侧：社交 + 回到顶部 -->
      <div class="footer__right">
        <!-- 回到顶部 -->
        <button class="footer__top-btn" @click="scrollToTop">
          <span class="footer__top-icon" aria-hidden="true">↑</span>
          <span class="footer__top-label">TOP</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentYear = new Date().getFullYear()

// UI_Click 音效
const clickAudio = ref<HTMLAudioElement | null>(null)

function scrollToTop() {
  // 播放点击音效
  if (!clickAudio.value) {
    clickAudio.value = new Audio('/assets/endfield/audios/UI_Click.mp3')
    clickAudio.value.volume = 0.4
  }
  clickAudio.value.currentTime = 0
  clickAudio.value.play().catch(() => {/* 自动播放限制，忽略 */})

  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  z-index: 3;
  background: #E8E8E8;
  border-top: 3px solid #FFFF0F;
  overflow: hidden;
}

// 顶部漏光（镌宇铭星 footer_light_1.webp）
.footer__light {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-image: url('/assets/endfield/imgs/footer_light_1.webp');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  opacity: 0.18;
  pointer-events: none;
}

.footer__inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.8rem;
  padding-bottom: 1.8rem;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

// 左侧状态文字
.footer__left {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.footer__status {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.footer__copy {
  font-size: 0.65rem;
  color: var(--accent-steel);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

// 右侧区域
.footer__right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

// 回到顶部按钮
.footer__top-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.18);
  color: var(--text-dim);
  cursor: pointer;
  padding: 0.45rem 0.9rem;
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
  transition: color 0.2s, border-color 0.2s, background 0.2s;

  &:hover {
    color: var(--text-primary);
    border-color: rgba(0, 0, 0, 0.38);
    background: rgba(0, 0, 0, 0.04);
  }
}

.footer__top-icon {
  font-size: 0.75rem;
}

.footer__top-label {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
}
</style>
