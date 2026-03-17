<template>
  <section class="carousel" id="projects" ref="sectionRef">
    <div class="carousel__pin" ref="pinRef">
      <div class="carousel__track" ref="trackRef">
        <ProjectSlide
          v-for="(project, i) in projects"
          :key="project.id"
          :project="project"
          :index="i"
        />
      </div>

      <!-- 分页指示器 -->
      <div class="carousel__dots" ref="dotsRef">
        <button
          v-for="(_, i) in projects"
          :key="i"
          class="carousel__dot"
          :class="{ active: activeIndex === i }"
          :aria-label="`跳到项目 ${i + 1}`"
          @click="goTo(i)"
        />
      </div>

      <!-- 项目计数 -->
      <div class="carousel__counter mono" ref="counterRef">
        <span class="carousel__counter-current">{{ String(activeIndex + 1).padStart(2, '0') }}</span>
        <span class="carousel__counter-sep">/</span>
        <span class="carousel__counter-total">{{ String(projects.length).padStart(2, '0') }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import ProjectSlide from './ProjectSlide.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef  = ref<HTMLElement | null>(null)
const pinRef      = ref<HTMLElement | null>(null)
const trackRef    = ref<HTMLElement | null>(null)
const dotsRef     = ref<HTMLElement | null>(null)
const counterRef  = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

let ctx: gsap.Context | undefined
let mobileObserver: IntersectionObserver | undefined
let mobileScrollHandler: (() => void) | undefined
let currentMode: 'mobile' | 'desktop' | null = null
let resizeTimer: ReturnType<typeof setTimeout> | undefined

const isMobile = () => window.matchMedia('(max-width: 768px)').matches

// ── 桌面：GSAP ScrollTrigger Pin ─────────────────────────────────────────────
function initDesktop() {
  const track = trackRef.value
  const pin   = pinRef.value
  if (!track || !pin) return

  // 清除移动端可能残留的横向滚动位置
  pin.scrollLeft = 0

  ctx = gsap.context(() => {
    const slides = Array.from(track.children) as HTMLElement[]
    if (!slides.length) return

    gsap.set(track, { width: `${100 * projects.length}%`, xPercent: 0 })
    gsap.set(slides, { width: `${100 / projects.length}%` })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        pin,
        pinType: 'fixed', // 使用 position:fixed 而非 transform，避免影响其他 fixed 元素的 containing block
        start: 'top top',
        end: `+=${window.innerHeight * (projects.length - 1)}`,
        scrub: 1,
        snap: 1 / (projects.length - 1),
        onUpdate(self) {
          activeIndex.value = Math.round(self.progress * (projects.length - 1))
        },
      },
    })

    tl.to(track, {
      xPercent: -100 * (projects.length - 1) / projects.length,
      ease: 'none',
    })
  }, sectionRef.value ?? undefined)
}

function destroyDesktop() {
  ctx?.revert()
  ctx = undefined
  // 清除 GSAP 留下的内联样式
  if (trackRef.value) gsap.set(trackRef.value, { clearProps: 'all' })
  const slides = trackRef.value ? Array.from(trackRef.value.children) : []
  if (slides.length) gsap.set(slides, { clearProps: 'all' })
}

// ── 移动端：CSS scroll-snap + JS 补偿 UI 位置 ────────────────────────────────
function initMobile() {
  const pin   = pinRef.value
  const track = trackRef.value
  if (!pin || !track) return

  // 清除 GSAP 可能留下的内联样式，让 CSS 媒体查询接管布局
  gsap.set(track, { clearProps: 'all' })
  gsap.set(Array.from(track.children), { clearProps: 'all' })

  // dots/counter 是 position:absolute，在 overflow-x:auto 的 pin 中会随内容滚离视口。
  // 通过监听 scroll 事件，用 translateX(scrollLeft) 抵消偏移，使其始终锚定在视口内。
  //   dots:    left:50% (=50vw 在滚动坐标系中) + translateX(sl) translateX(-50%) → 始终居中
  //   counter: right:1.25rem (left edge 在 100vw-w-1.25rem) + translateX(sl) → 始终贴右
  const dots    = dotsRef.value
  const counter = counterRef.value

  function syncUI() {
    if (!pin) return
    const sl = pin.scrollLeft
    if (dots)    dots.style.transform    = `translateX(${sl}px) translateX(-50%)`
    if (counter) counter.style.transform = `translateX(${sl}px)`
  }

  mobileScrollHandler = syncUI
  pin.addEventListener('scroll', mobileScrollHandler, { passive: true })
  syncUI() // 初始同步，确保首屏就显示正确

  // IntersectionObserver 感知当前可见的 slide，同步指示器高亮
  mobileObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Array.from(track.children).indexOf(entry.target as HTMLElement)
          if (idx !== -1) activeIndex.value = idx
        }
      })
    },
    { root: pin, threshold: 0.6 },
  )
  Array.from(track.children).forEach((slide) => mobileObserver!.observe(slide))
}

function destroyMobile() {
  mobileObserver?.disconnect()
  mobileObserver = undefined

  if (mobileScrollHandler) {
    pinRef.value?.removeEventListener('scroll', mobileScrollHandler)
    mobileScrollHandler = undefined
  }
  // 重置 JS 注入的 transform，避免切回桌面模式时样式残留
  if (dotsRef.value)    dotsRef.value.style.transform    = ''
  if (counterRef.value) counterRef.value.style.transform = ''
}

// ── 跳转到指定幻灯片 ─────────────────────────────────────────────────────────
function goTo(i: number) {
  activeIndex.value = i
  if (isMobile()) {
    // 移动端：驱动原生横向滚动
    const slide = trackRef.value?.children[i] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  } else {
    // 桌面端：通过滚动窗口来驱动 ScrollTrigger（避免与 scrub 冲突）
    const section = sectionRef.value
    if (!section) return
    const targetScroll = section.offsetTop + i * window.innerHeight
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }
}

// ── 响应窗口大小变化（横竖屏切换 / 浏览器缩放）──────────────────────────────
function handleResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const shouldBeMobile = isMobile()
    if (shouldBeMobile && currentMode !== 'mobile') {
      destroyDesktop()
      initMobile()
      currentMode = 'mobile'
    } else if (!shouldBeMobile && currentMode !== 'desktop') {
      destroyMobile()
      initDesktop()
      currentMode = 'desktop'
    }
  }, 150)
}

onMounted(() => {
  if (isMobile()) {
    initMobile()
    currentMode = 'mobile'
  } else {
    initDesktop()
    currentMode = 'desktop'
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  clearTimeout(resizeTimer)
  destroyDesktop()
  destroyMobile()
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
// ── 桌面布局（默认）──────────────────────────────────────────────────────────
.carousel {
  position: relative;
  // 桌面：section 足够高以容纳 ScrollTrigger 滚动空间
  height: calc(100vh * v-bind('projects.length'));

  @media (max-width: 768px) {
    // 移动端：section 占一个全屏，页面可正常垂直滚动经过此区域
    height: 100vh;
  }
}

.carousel__pin {
  position: relative;
  width: 100%;
  height: 100vh;
  // 桌面：溢出隐藏，由 GSAP 控制横向位移
  overflow: hidden;

  @media (max-width: 768px) {
    // 移动端：改为横向原生滚动容器
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    // iOS 惯性滚动
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.carousel__track {
  display: flex;
  height: 100%;
  // 桌面：由 GSAP 写入内联 width/transform，will-change 优化合成层
  will-change: transform;

  @media (max-width: 768px) {
    // 强制覆盖 GSAP 可能残留的内联样式（clearProps 有时机问题时的兜底）
    width: max-content !important;
    transform: none !important;
  }
}

// 移动端每张 slide 占满视口宽度，并参与 scroll-snap
// 用 :deep 穿透 scoped 作用于 ProjectSlide 根元素
@media (max-width: 768px) {
  :deep(.slide) {
    width: 100vw;
    min-width: 100vw;
    flex-shrink: 0;
    scroll-snap-align: start;
  }
}

// ── 共用：指示器 & 计数 ───────────────────────────────────────────────────────
.carousel__dots {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: 1.25rem;
  }
}

.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &.active {
    background: var(--accent-cyan);
    box-shadow: var(--glow-cyan);
    transform: scale(1.3);
  }
}

.carousel__counter {
  position: absolute;
  bottom: 2.5rem;
  right: 3rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  z-index: 10;

  @media (max-width: 768px) {
    right: 1.25rem;
    bottom: 1.25rem;
  }
}

.carousel__counter-current {
  color: var(--accent-cyan);
  font-size: 1.2rem;
  font-weight: 600;
}

.carousel__counter-sep,
.carousel__counter-total {
  color: var(--text-dim);
}
</style>
