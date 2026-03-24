<template>
  <section class="carousel-section" id="projects">

    <!-- ── 页头区（深灰面板）───────────────────────────────────── -->
    <header class="proj-header">
      <div class="proj-header__bg" aria-hidden="true">
        <div class="proj-header__map" />
      </div>
      <div class="container proj-header__inner">
        <div class="proj-header__left">
          <div class="proj-header__icon" aria-hidden="true">
            <img src="/assets/endfield/imgs/icon-rule.svg" width="22" height="26"
              style="filter: brightness(0) invert(1);" alt="" />
          </div>

          <div class="proj-header__stripe" aria-hidden="true">
            <span class="hstripe hstripe--pink" />
            <span class="hstripe hstripe--yellow" />
            <span class="hstripe hstripe--green" />
          </div>

          <div class="proj-header__text">
            <p class="proj-header__sys akrobat">03 // PROJECTS</p>
            <h2 class="proj-header__title">
              项目
              <span class="proj-header__title-en akrobat">/ PROJECTS</span>
            </h2>
            <p class="proj-header__sub">全屏轮播作品集</p>
            <div class="proj-header__deco-bar" aria-hidden="true">
              <img src="/assets/endfield/imgs/icon-deco.svg" alt="" />
            </div>
          </div>
        </div>

        <div class="proj-header__right" aria-hidden="true">
          <div class="proj-header__dots">
            <span v-for="i in 9" :key="i" class="proj-header__dot" />
          </div>
          <img class="proj-header__circle" src="/assets/endfield/imgs/yellowCircle.png" alt="" />
        </div>
      </div>
    </header>

    <!-- ── 分隔 UI 条 ──────────────────────────────────────────── -->
    <div class="ui-bar" aria-hidden="true">
      <div class="ui-bar__gray" />
      <div class="ui-bar__yellow" />
    </div>

    <!-- ── 轮播区（全屏高度）──────────────────────────────────── -->
    <div class="carousel" ref="sectionRef">
      <div class="carousel__pin" ref="pinRef">
        <div class="carousel__track" ref="trackRef">
          <ProjectSlide
            v-for="(project, i) in projects"
            :key="project.id"
            :project="project"
            :index="i"
          />
        </div>

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

        <div class="carousel__counter mono" ref="counterRef">
          <span class="carousel__counter-current">{{ String(activeIndex + 1).padStart(2, '0') }}</span>
          <span class="carousel__counter-sep">/</span>
          <span class="carousel__counter-total">{{ String(projects.length).padStart(2, '0') }}</span>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUnmounted, nextTick } from 'vue'
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

function initDesktop() {
  const track = trackRef.value
  const pin   = pinRef.value
  if (!track || !pin) return

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
        pinType: 'fixed',
        start: 'top top',
        // 函数式 end：实际轨道总宽度 - 单屏宽度，随 resize/refresh 自动重算
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: 1,
        snap: 1 / (projects.length - 1),
        invalidateOnRefresh: true,
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
  if (trackRef.value) gsap.set(trackRef.value, { clearProps: 'all' })
  const slides = trackRef.value ? Array.from(trackRef.value.children) : []
  if (slides.length) gsap.set(slides, { clearProps: 'all' })
}

function initMobile() {
  const pin   = pinRef.value
  const track = trackRef.value
  if (!pin || !track) return

  gsap.set(track, { clearProps: 'all' })
  gsap.set(Array.from(track.children), { clearProps: 'all' })

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
  syncUI()

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
  if (dotsRef.value)    dotsRef.value.style.transform    = ''
  if (counterRef.value) counterRef.value.style.transform = ''
}

function goTo(i: number) {
  activeIndex.value = i
  if (isMobile()) {
    const slide = trackRef.value?.children[i] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  } else {
    const section = sectionRef.value
    if (!section) return
    const targetScroll = section.offsetTop + i * window.innerHeight
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }
}

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
  window.addEventListener('resize', handleResize)

  // 用 nextTick 延迟，确保 StackPreview（兄弟组件）的 GSAP pin-spacer
  // 已经插入文档流后，再计算本组件的 ScrollTrigger 触发位置
  // Vue 子组件 onMounted 顺序：StackPreview → ProjectCarousel → HomeView
  // nextTick 队列也按此顺序执行，保证 pin-spacer 先落地
  nextTick(() => {
    if (isMobile()) {
      initMobile()
      currentMode = 'mobile'
    } else {
      initDesktop()
      currentMode = 'desktop'
    }
  })
})

// 页面过渡 leave 动画开始前立即销毁 GSAP pin，
// 防止 position:fixed 的轮播层在路由切换期间残留到其他页面
onBeforeUnmount(() => {
  clearTimeout(resizeTimer)
  destroyDesktop()
  destroyMobile()
  window.removeEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 兜底：确保清理完成
  destroyDesktop()
  destroyMobile()
})
</script>

<style lang="scss" scoped>
$yellow: #FFFF0F;
$pink:   #FF1AAC;
$green:  #00FFA2;
$silver: #E5E5E5;

// ── 整体区域 ──────────────────────────────────────────────────────────────────
.carousel-section {
  position: relative;
  // 必须高于 SiteFooter（z-index:3），否则 GSAP position:fixed 的 carousel__pin
  // 会被 footer 压在后面，产生"穿模"效果
  z-index: 4;
  background: #FFFFFF;
}

// ── UI 条 ─────────────────────────────────────────────────────────────────────
.ui-bar { position: relative; z-index: 2; }
.ui-bar__yellow { height: 10px; background: $yellow; }
.ui-bar__gray   { height: 3px;  background: #BEBEBE; }

// ── 页头（深灰面板）──────────────────────────────────────────────────────────
.proj-header {
  position: relative;
  z-index: 2;
  background: #2C2C2C;
}

.proj-header__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.proj-header__map {
  position: absolute;
  inset: 0;
  background:
    url('/assets/endfield/imgs/card-tex.png') right center / 380px auto repeat-y,
    url('/assets/endfield/imgs/bg_map.jpg') right center / 55% auto no-repeat;
  opacity: 0.3;

  @media (max-width: 768px) {
    display: none;
  }
}

.proj-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2.2rem;
  padding-bottom: 2.2rem;
}

.proj-header__left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.proj-header__icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: #3C3C3C;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 15, 0.2);
  margin-top: 4px;
}

.proj-header__stripe {
  display: flex;
  flex-direction: column;
  width: 6px;
  align-self: stretch;
  flex-shrink: 0;
}

.hstripe { display: block; width: 100%; }
.hstripe--pink   { flex: 1; background: $pink; }
.hstripe--yellow { flex: 1; background: $yellow; }
.hstripe--green  { flex: 2; background: $green; }

.proj-header__text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.proj-header__sys {
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(229, 229, 229, 0.45);
  margin: 0;
}

.proj-header__title {
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  letter-spacing: -0.02em;
  color: $silver;
  margin: 0;
  line-height: 1.1;
}

.proj-header__title-en {
  font-size: 0.4em;
  letter-spacing: 0.14em;
  color: rgba(229, 229, 229, 0.35);
  vertical-align: middle;
  margin-left: 0.4em;
}

.proj-header__sub {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 0.82rem;
  color: rgba(229, 229, 229, 0.45);
  margin: 0;
}

.proj-header__deco-bar {
  margin-top: 0.5rem;
  img {
    height: 18px;
    width: auto;
    filter: brightness(0) invert(1);
    opacity: 0.2;
  }
}

.proj-header__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
  flex-shrink: 0;

  @media (max-width: 640px) { display: none; }
}

.proj-header__dots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.proj-header__dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(229, 229, 229, 0.25);
}

.proj-header__circle {
  width: 28px;
  height: 28px;
  object-fit: contain;
  animation: yellowBreath 2.4s ease-in-out infinite;
}

// ── 轮播容器 ──────────────────────────────────────────────────────────────────
.carousel {
  position: relative;
  background: #F5F5F5;
  // 桌面端：不写死高度，由 GSAP pin-spacer 动态撑开（高度 = 100vh + end scroll距离）
  // 写死 n×100vh 会导致宽屏下 vw>vh 时 pin 所需滚动量 > carousel 容器高度，
  // footer 提前进入视口产生"穿模"
  @media (max-width: 768px) {
    // 移动端 scroll-snap 模式：固定 100vh 保持单屏展示
    height: 100vh;
  }
}

.carousel__pin {
  position: relative;
  // 当 GSAP 将此元素设为 position:fixed 时，它会脱离父级 stacking context
  // 直接参与 root stacking context，此时必须有明确 z-index 才能压过
  // SiteFooter（z-index:3）。设为 10 保留充足余量
  z-index: 10;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
}

.carousel__track {
  display: flex;
  height: 100%;
  will-change: transform;

  @media (max-width: 768px) {
    width: max-content !important;
    transform: none !important;
  }
}

@media (max-width: 768px) {
  :deep(.slide) {
    width: 100vw;
    min-width: 100vw;
    flex-shrink: 0;
    scroll-snap-align: start;
  }
}

// ── 指示器 ────────────────────────────────────────────────────────────────────
.carousel__dots {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  z-index: 10;

  @media (max-width: 768px) { bottom: 1.25rem; }
}

.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(107, 107, 107, 0.3);
  border: 1px solid rgba(107, 107, 107, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;

  &.active {
    background: $yellow;
    box-shadow: 0 0 8px rgba(255, 255, 15, 0.4);
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
  color: $yellow;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(255, 255, 15, 0.3);
}

.carousel__counter-sep,
.carousel__counter-total {
  color: var(--text-dim);
}

// ── 动画 ──────────────────────────────────────────────────────────────────────
@keyframes yellowBreath {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}
</style>
