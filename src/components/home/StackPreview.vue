<template>
  <section class="stack-section" id="stack">

    <!-- ── 页头区（深灰面板，正常滚走）──────────────────────────── -->
    <header class="stack-header">
      <div class="stack-header__bg" aria-hidden="true">
        <div class="stack-header__map" />
      </div>
      <div class="container stack-header__inner">
        <div class="stack-header__left">
          <div class="stack-header__icon" aria-hidden="true">
            <img src="/assets/endfield/imgs/icon-rule.svg" width="22" height="26"
              style="filter: brightness(0) invert(1);" alt="" />
          </div>
          <div class="stack-header__stripe" aria-hidden="true">
            <span class="hstripe hstripe--pink" />
            <span class="hstripe hstripe--yellow" />
            <span class="hstripe hstripe--green" />
          </div>
          <div class="stack-header__text">
            <p class="stack-header__sys akrobat">02 // TECH_STACK</p>
            <h2 class="stack-header__title">
              技术栈
              <span class="stack-header__title-en akrobat">/ STACK</span>
            </h2>
            <p class="stack-header__sub">从零到现在，记录每一个技术节点。</p>
            <div class="stack-header__deco-bar" aria-hidden="true">
              <img src="/assets/endfield/imgs/icon-deco.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="stack-header__right" aria-hidden="true">
          <div class="stack-header__dots">
            <span v-for="i in 9" :key="i" class="stack-header__dot" />
          </div>
          <img class="stack-header__circle" src="/assets/endfield/imgs/yellowCircle.png" alt="" />
        </div>
      </div>
    </header>

    <!-- ── 分隔 UI 条（正常滚走）─────────────────────────────────── -->
    <div class="ui-bar" aria-hidden="true">
      <div class="ui-bar__gray" />
      <div class="ui-bar__yellow" />
    </div>

    <!-- ── 内容区（pin 住这个容器，overflow:hidden）─────────────── -->
    <div class="stack-pin" ref="pinRef">
      <div class="container stack-content">






        <!-- 双栏：左 badge（不动）+ 右 timeline（scrub 驱动 y） -->
        <div class="stack-section__body">
          <aside class="stack-section__aside">
            <div v-for="group in techGroups" :key="group.label" class="stack-section__group">
              <p class="stack-section__group-label mono">{{ group.label }}</p>
              <div class="stack-section__badge-list">
                <TechBadge v-for="tech in group.items" :key="tech" :name="tech" :category="group.category" />
              </div>
            </div>
          </aside>

          <!-- 右侧时间轴：外层 clip 容器 + 内层被 scrub 驱动 -->
          <div class="stack-section__timeline-wrap" ref="timelineWrapRef">
            <div class="stack-section__timeline-inner" ref="timelineInnerRef">
              <Timeline />
            </div>
          </div>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TechBadge from '@/components/stack/TechBadge.vue'
import Timeline from '@/components/stack/Timeline.vue'

gsap.registerPlugin(ScrollTrigger)

const techGroups = [
  {
    label: '// frontend',
    category: 'frontend' as const,
    items: ['Vue3', 'React', 'TypeScript', 'Vite', 'GSAP', 'Three.js'],
  },
  {
    label: '// language',
    category: 'language' as const,
    items: ['JavaScript', 'Python', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    label: '// backend',
    category: 'backend' as const,
    items: ['Node.js', 'Express', 'Django', 'FastAPI'],
  },
  {
    label: '// ai & db',
    category: 'ai' as const,
    items: ['GraphRAG', 'Milvus', 'Qdrant', 'SQLite', 'MongoDB', 'MySQL'],
  },
  {
    label: '// tools',
    category: 'tool' as const,
    items: ['Git', 'pnpm', 'Webpack', 'ESLint', 'Prettier'],
  },
]

// const totalTechCount = computed(() =>
//   techGroups.reduce((sum, g) => sum + g.items.length, 0)
// )

const pinRef           = ref<HTMLElement | null>(null)
const timelineWrapRef  = ref<HTMLElement | null>(null)
const timelineInnerRef = ref<HTMLElement | null>(null)
let mm: gsap.MatchMedia | undefined

onMounted(() => {
  nextTick(() => {
    const pin   = pinRef.value
    const wrap  = timelineWrapRef.value
    const inner = timelineInnerRef.value
    if (!pin || !wrap || !inner) return

    mm = gsap.matchMedia()

    // ── 桌面端 ≥768px：整个 pin 容器吸顶，时间轴 scrub ──────────────
    mm.add('(min-width: 768px)', () => {
      // 函数式计算：每次 ScrollTrigger.refresh() 时重新测量，
      // 消除字体加载/内容变化导致的高度偏差
      const getOverflow = () => Math.max(0, inner.scrollHeight - wrap.clientHeight)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          pin: true,
          start: 'top top',
          end: () => `+=${getOverflow() + 100}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(inner, {
        y: () => -getOverflow(),
        ease: 'none',
      })

      // refresh 由 HomeView.onMounted 在 fonts.ready 后统一调用，此处不重复
    })

    // ── 移动端 <768px：只 pin 时间轴容器，左侧技术栈正常滚走 ────────
    // 阶段1：正常滑动浏览技术栈 badges（不触发任何 pin）
    // 阶段2：时间轴容器到达视口顶时 pin 住
    // 阶段3：继续滑动触发内部 scrub，揭示剩余时间轴卡片
    // 阶段4：内容拉完后解除 pin，继续进入 ProjectCarousel
    //
    // Bug 1 Fix：高度完全由 CSS 的 height: 100svh 控制（见下方样式），
    // 绝不在 JS 里写死内联 height，防止在卡片背景中间截断 UI
    mm.add('(max-width: 767px)', () => {
      const getOverflow = () => Math.max(0, inner.scrollHeight - wrap.clientHeight)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,          // 精确到时间轴容器，而非整个 section
          pin: true,
          start: 'top top',       // wrap 顶部到达视口顶时开始 pin
          end: () => `+=${getOverflow()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(inner, {
        y: () => -getOverflow(),
        ease: 'none',
      })

      // matchMedia revert 时只清理 GSAP 驱动的 y 位移
      return () => {
        gsap.set(inner, { clearProps: 'y' })
      }
    })
  })
})

onBeforeUnmount(() => mm?.revert())
</script>

<style lang="scss" scoped>
$yellow: #FFFF0F;
$pink:   #FF1AAC;
$green:  #00FFA2;
$silver: #E5E5E5;

.stack-section {
  position: relative;
  z-index: 2;
  background: #FFFFFF;
}

// ── UI 条 ─────────────────────────────────────────────────────────────────────
.ui-bar { position: relative; z-index: 2; }
.ui-bar__yellow { height: 10px; background: $yellow; }
.ui-bar__gray   { height: 3px;  background: #BEBEBE; }

// ── 页头（深灰面板，正常滚走）────────────────────────────────────────────────
.stack-header {
  position: relative;
  z-index: 2;
  background: #2C2C2C;
}

.stack-header__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.stack-header__map {
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

.stack-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2.2rem;
  padding-bottom: 2.2rem;
}

.stack-header__left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.stack-header__icon {
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

.stack-header__stripe {
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

.stack-header__text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.stack-header__sys {
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(229, 229, 229, 0.45);
  margin: 0;
}

.stack-header__title {
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  letter-spacing: -0.02em;
  color: $silver;
  margin: 0;
  line-height: 1.1;
}

.stack-header__title-en {
  font-size: 0.4em;
  letter-spacing: 0.14em;
  color: rgba(229, 229, 229, 0.35);
  vertical-align: middle;
  margin-left: 0.4em;
}

.stack-header__sub {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 0.82rem;
  color: rgba(229, 229, 229, 0.45);
  margin: 0;
}

.stack-header__deco-bar {
  margin-top: 0.5rem;
  img {
    height: 18px;
    width: auto;
    filter: brightness(0) invert(1);
    opacity: 0.2;
  }
}

.stack-header__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
  flex-shrink: 0;
  @media (max-width: 640px) { display: none; }
}

.stack-header__dots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stack-header__dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(229, 229, 229, 0.25);
}

.stack-header__circle {
  width: 28px;
  height: 28px;
  object-fit: contain;
  animation: yellowBreath 2.4s ease-in-out infinite;
}

// ── Pin 容器 ──────────────────────────────────────────────────────────────────
// 固定为视窗高度，GSAP pin 住后作为可视窗口
.stack-pin {
  background: #FFFFFF;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 767px) {
    height: auto;
    overflow: visible;
  }
}

// ── 内容区 ────────────────────────────────────────────────────────────────────
.stack-content {
  position: relative;
  z-index: 2;
}

.stack-content__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stack-content__label {
  font-size: 0.64rem;
  letter-spacing: 0.22em;
  color: #AAAAAA;
  text-transform: uppercase;
}

.stack-content__count {
  font-size: 1.6rem;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px #D0D0D0;
  line-height: 1;
}

.stack-content__dash {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.stack-content__dash-icon {
  flex-shrink: 0;
  height: 10px;
  width: auto;
  opacity: 0.5;
}

.stack-content__dash-line {
  flex: 1;
  height: 8px;
  background: url('/assets/endfield/imgs/dash_line.png') left center / auto 100% repeat-x;
  opacity: 0.45;
}

// ── 双栏布局 ──────────────────────────────────────────────────────────────────
.stack-section__body {
  display: grid;
  grid-template-columns: 340px 2fr;
  gap: 4rem;
  align-items: start;


  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

// 左侧 badge：不动，自然堆叠
.stack-section__aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width:13rem;
  @media (max-width: 767px) {
  width:auto;
  }
}

.stack-section__group-label {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6B6B6B;
  margin-bottom: 0.6rem;
}

.stack-section__badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

// 右侧时间轴：外层 clip 可视区，内层被 scrub 驱动 y
.stack-section__timeline-wrap {
  overflow: hidden;
  // 桌面：可视高度 = 视窗高度 - 顶部元素（meta + dash + padding 大约 140px）
  max-height: calc(100vh);

  // 移动端：全视口高度作为裁剪窗口，底边与屏幕底对齐，不会在卡片中间截断
  // JS 中不写任何 height 内联样式，完全由此 CSS 控制
  @media (max-width: 767px) {
    height: 100svh;
    max-height: 100svh;
  }
}

// ── 动画 ──────────────────────────────────────────────────────────────────────
@keyframes yellowBreath {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}
</style>
