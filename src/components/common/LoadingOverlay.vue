<template>
  <Transition name="loader-fade">
    <div v-if="isVisible" class="loader-container" :class="{ 'loader-exit': isExiting }">
      <div class="loader">
        <!-- 旋转圆环 -->
        <div class="anim-item"></div>
        <!-- 填充圆 -->
        <div class="anim-fill"></div>
        <!-- LOADING 文字 -->
        <div class="anim-text">
          <span v-for="(letter, i) in letters" :key="i" class="anim-text-letter">{{ letter }}</span>
        </div>
        <!-- 进度条 -->
        <div class="anim-loader-bar"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import anime from 'animejs'

const props = defineProps<{
  duration?: number // 加载时间（毫秒）
}>()

const emit = defineEmits<{
  complete: []
}>()

const duration = props.duration ?? 4000
const isVisible = ref(true)
const isExiting = ref(false)
const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

let spinAnim: anime.AnimeInstance | null = null
let quirkAnim: anime.AnimeInstance | null = null

onMounted(() => {
  // 旋转动画（循环）
  spinAnim = anime({
    targets: '.anim-item',
    rotate: '20turn',
    easing: 'easeInOutExpo',
    duration: 5000,
    delay: 200,
    loop: true,
    autoplay: false
  })

  // 文字抖动动画（循环）
  quirkAnim = anime({
    targets: '.anim-text-letter',
    rotate: () => anime.random(-45, 45),
    duration: () => anime.random(1000, 2000),
    delay: (_el: HTMLElement, i: number) => i * 400,
    direction: 'alternate',
    easing: 'easeInOutExpo',
    loop: true,
    autoplay: false
  })

  // 主时间线
  const timeline = anime.timeline({
    complete: handleComplete
  })

  timeline
    // 1. 填充圆出现
    .add({
      targets: '.anim-fill',
      scale: 0.5,
      opacity: 1,
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    })
    // 2. 旋转环出现并开始旋转
    .add({
      targets: '.anim-item',
      scale: 1,
      duration: 600,
      easing: 'easeOutElastic(1, .4)',
      complete: () => spinAnim?.play()
    }, '-=400')
    // 3. 文字逐字出现
    .add({
      targets: '.anim-text-letter',
      marginTop: '0px',
      opacity: 0.9,
      duration: 400,
      delay: (_el: HTMLElement, i: number) => i * 100,
      easing: 'easeOutExpo',
      complete: () => quirkAnim?.play()
    }, '-=800')
    // 4. 进度条
    .add({
      targets: '.anim-loader-bar',
      width: '100%',
      duration: duration,
      easing: 'easeInOutQuad'
    })
    // 5. 进度条高度展开
    .add({
      targets: '.anim-loader-bar',
      height: '100%',
      duration: 800,
      easing: 'easeInOutExpo'
    })
    // 6. 整体退出
    .add({
      targets: '.loader-container',
      top: '100%',
      duration: 800,
      easing: 'easeInOutExpo',
      begin: () => { isExiting.value = true }
    })
})

function handleComplete() {
  spinAnim?.pause()
  quirkAnim?.pause()
  isVisible.value = false
  emit('complete')
}

onUnmounted(() => {
  spinAnim?.pause()
  quirkAnim?.pause()
})
</script>

<style lang="scss" scoped>
$spinner-size: 40px;
$spinner-color: #4A4A4A;      // 旋转环颜色
$fill-color: #0E0E0E;          // 填充圆颜色
$text-color: rgba(14, 14, 14, 0.9); // 文字颜色

.loader-container {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #FFFF0F 0%, #E5E500 100%);
}

.loader {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// 旋转圆环
.anim-item {
  width: $spinner-size;
  height: $spinner-size;
  border: 4px solid transparent;
  border-top-color: $spinner-color;
  border-bottom-color: $spinner-color;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
  will-change: transform;
}

// 填充圆
.anim-fill {
  position: relative;
  width: $spinner-size;
  height: $spinner-size;
  margin-top: -$spinner-size;
  background: $spinner-color;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
  opacity: 0;
  will-change: transform, opacity;
}

// LOADING 文字
.anim-text {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-top: 75px;
  font-family: var(--font-display, 'Gilroy', sans-serif);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.35em;
  color: $text-color;
}

.anim-text-letter {
  display: inline-block;
  margin-top: 25px;
  opacity: 0;
  will-change: transform, opacity;
}

// 进度条
.anim-loader-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: rgba(255, 255, 15, 0.3);
  will-change: width, height;
}

// 过渡动画
.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.3s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}
</style>
