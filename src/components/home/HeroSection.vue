<template>
  <section class="hero" id="hero">

    <!-- ── 顶部 UI 条（仅保留极简封边）───────────────────────── -->
    <div class="ui-bar ui-bar--top" aria-hidden="true">
      <div class="ui-bar__border" />
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
    </div>

    <!-- ── 内容区（白底双栏，直接开屏）───────────────────────── -->
    <div class="hero-content">
      <!-- slogan 水印 -->
      <div class="hero__slogan-bg" aria-hidden="true" />

      <div class="hero__layout">
        <!-- 左栏：身份定义 -->
        <div class="hero__left" ref="leftRef">
          <div class="hero__sys-tag">
            <span class="hero__sys-dot" aria-hidden="true" />
            <span class="hero__sys-label">SYS_INIT // IDENTITY MODULE</span>
          </div>

          <h2 class="hero__title">
            <span class="hero__title-line hero__title-line--en">AI ARCHITECTURE</span>
            <span class="hero__title-line hero__title-line--en hero__title-line--secondary">SYSTEM DEV</span>
          </h2>

          <div class="hero__name-row">
            <span class="hero__name-prefix mono">// OPERATOR :</span>
            <span class="hero__name mono">{{ displayName }}<span class="hero__cursor">_</span></span>
          </div>

          <p class="hero__bio" style="margin: 0">
            专注 AI Agent 架构设计与底层系统研究，<br />
            探索 GraphRAG、向量引擎与语言模型的边界。
          </p>

          <HitokotoWidget class="hero__quote-widget" />
        </div>

        <!-- 右栏：运行状态面板 -->
        <div class="hero__right" ref="rightRef">
          <div class="hero__panel endfield-card">
            <div class="hero__panel-header">
              <span class="hero__panel-title">ACTIVE_THREADS</span>
              <span class="hero__panel-version akrobat">v2.6.1</span>
            </div>

            <ul class="hero__threads">
              <li
                v-for="(thread, i) in threads"
                :key="i"
                class="hero__thread"
                :class="{ 'hero__thread--active': thread.active }"
              >
                <span class="hero__thread-id akrobat">&gt; [{{ thread.id }}]</span>
                <span class="hero__thread-name">{{ thread.name }}</span>
                <span class="hero__thread-status">
                  <span class="hero__thread-dot" :class="`hero__thread-dot--${thread.status}`" />
                </span>
              </li>
            </ul>

            <div class="hero__panel-footer">
              <span class="hero__panel-stat">
                <span class="hero__panel-stat-val akrobat">{{ threads.filter(t => t.active).length }}</span>
                <span class="hero__panel-stat-label">RUNNING</span>
              </span>
              <span class="hero__panel-stat">
                <span class="hero__panel-stat-val akrobat">2026</span>
                <span class="hero__panel-stat-label">EPOCH</span>
              </span>
              <span class="hero__panel-stat">
                <span class="hero__panel-stat-val akrobat">∞</span>
                <span class="hero__panel-stat-label">UPTIME</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部滚动提示 -->
      <div class="hero__scroll-hint">
        <span class="hero__scroll-line-v" />
        <span class="hero__scroll-text akrobat">SCROLL</span>
        <span class="hero__scroll-line-v" />
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, watch } from 'vue'
import type { Ref } from 'vue'
import { gsap } from 'gsap'
import HitokotoWidget from '@/components/widgets/HitokotoWidget.vue'

const NAMES = ['DD斩首', '枫叶UL']
const threads = [
  { id: 'THREAD_01', name: 'Mnemosyne — GraphRAG + Vector DB 架构',   active: true,  status: 'run' },
  { id: 'THREAD_02', name: '脚本与自动化BOT研究',                  active: true,  status: 'run' },
  { id: 'THREAD_03', name: '语言模组升级序列 (IELTS Target: 6.5)',       active: true,  status: 'run' },
  { id: 'THREAD_04', name: '全栈工程技能树 (Becoming)',                  active: false, status: 'pend' },
]

const loadingDone = inject<Ref<boolean>>('loadingDone', ref(true))

const displayName = ref('')
const leftRef      = ref<HTMLElement | null>(null)
const rightRef     = ref<HTMLElement | null>(null)

let loopTimer: ReturnType<typeof setTimeout>

function cycleNames(nameIndex = 0) {
  const name = NAMES[nameIndex]
  let i = 0

  function typeChar() {
    if (i < name.length) {
      displayName.value += name[i++]
      loopTimer = setTimeout(typeChar, 110)
    } else {
      loopTimer = setTimeout(deleteChar, 1800)
    }
  }

  function deleteChar() {
    if (displayName.value.length > 0) {
      displayName.value = displayName.value.slice(0, -1)
      loopTimer = setTimeout(deleteChar, 70)
    } else {
      loopTimer = setTimeout(() => cycleNames((nameIndex + 1) % NAMES.length), 300)
    }
  }

  typeChar()
}

function startEntranceAnim() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(leftRef.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 })
    .fromTo(rightRef.value, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.5')
    .add(() => cycleNames())
    .fromTo('.hero__quote-widget', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
}

onMounted(() => {
  if (loadingDone.value) {
    startEntranceAnim()
  } else {
    const stop = watch(loadingDone, (done) => {
      if (done) {
        stop()
        startEntranceAnim()
      }
    })
  }
})

onUnmounted(() => clearTimeout(loopTimer))
</script>

<style lang="scss" scoped>
$yellow: #FFFF0F;
$pink:   #FF1AAC;
$green:  #00FFA2;
$silver: #E5E5E5;

// ── 整体区域 ──────────────────────────────────────────────────────────────────
.hero {
  position: relative;
  z-index: 2;
}

// ── 通用 UI 条（与 Blog 一致）────────────────────────────────────────────────
.ui-bar {
  position: relative;
  z-index: 2;
}

.ui-bar__border {
  height: 3px;
  background: url('/assets/endfield/imgs/border_top.jpg') repeat-x center / auto 100%;
}

.ui-bar__yellow {
  height: 10px;
  background: $yellow;
}

.ui-bar__gray {
  height: 3px;
  background: #BEBEBE;
}

// ── 内容区（白底双栏）─────────────────────────────────────────────────────────
.hero-content {
  position: relative;
  z-index: 2;
  min-height: calc(100vh - var(--nav-height) - 16px); // UI 条高度约 16px
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;

  // 移动端：NavBar 是 fixed 不占文档流，不应减去 nav-height，否则 hero 恰好矮 60px
  @media (max-width: 1024px) {
    min-height: 90vh;
  }

  @media (max-width: 640px) {
    padding: 0 1.25rem;
  }
}

.hero__slogan-bg {
  position: absolute;
  inset: 0;
  background-image: url('/assets/endfield/imgs/slogan.webp');
  background-repeat: no-repeat;
  background-position: center 55%;
  background-size: 140% auto;
  opacity: 0.038;
  pointer-events: none;
  z-index: 0;
  filter: contrast(1.2);
}

.hero__layout {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1160px;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 680px;
  }
}

// ─── 左栏 ─────────────────────────────────────────────────────────────────────
.hero__left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
}

.hero__sys-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.hero__sys-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: $yellow;
  box-shadow: 0 0 6px $yellow;
  animation: yellowBreath 2.4s ease-in-out infinite;
  flex-shrink: 0;
}

.hero__sys-label {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0.92;
}

.hero__title-line {
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5.6rem);
  letter-spacing: -0.03em;
  color: var(--text-primary);
  display: block;

  &--secondary {
    color: var(--text-secondary);
    font-size: clamp(2.4rem, 5.4vw, 4.2rem);
    letter-spacing: -0.025em;
  }
}

.hero__name-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero__name-prefix {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--accent-steel);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.hero__name {
  font-family: var(--font-code);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.04em;
  position: relative;
  min-width: 2ch;
}

.hero__cursor {
  color: $yellow;
  font-weight: 400;
  animation: cursorBlink 1s step-end infinite;
}

.hero__bio {
  font-family: 'HarmonyOS SC', sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 2;
  color: var(--text-secondary);
  max-width: 520px;
}

.hero__quote-widget {
  opacity: 0;
  max-width: 520px;
}

// ─── 右栏 ─────────────────────────────────────────────────────────────────────
.hero__right {
  opacity: 0;
}

.hero__panel {
  // 实体黄左边框 + 外侧细黑阴影增加深度
  border-left: 4px solid #FFFF0F;
  box-shadow: -1px 0 0 rgba(0, 0, 0, 0.18);
}

.hero__panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.6rem;
  background: rgba(180, 175, 168, 0.55);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.hero__panel-title {
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.hero__panel-version {
  font-size: 0.7rem;
  color: var(--accent-steel);
}

.hero__threads {
  list-style: none;
  padding: 0.8rem 1.6rem 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.hero__thread {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.7rem;
  padding: 0.75rem 1rem;
  border-left: 4px solid #BDBDBD;
  background: #F5F5F5;
  transition: all 0.18s ease;
  cursor: default;
  min-height: 48px;

  &--active {
    border-left-color: $yellow;
    background: #FAF8E8;

    .hero__thread-id {
      color: #D4C000;
    }
  }

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .hero__thread-id {
      color: #D4C000;
    }
  }
}

.hero__thread-id {
  font-size: 0.75rem;
  color: #9E9E9E;
  white-space: nowrap;
  transition: color 0.18s;
}

.hero__thread-name {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #333333;
  line-height: 1.5;
}

.hero__thread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &--run {
    background: $yellow;
    box-shadow: 0 0 6px rgba(255, 255, 15, 0.6);
    animation: yellowBreath 2s ease-in-out infinite;
  }
  &--pend {
    background: #BDBDBD;
  }
}

.hero__panel-footer {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 1.6rem 1.4rem;
  margin-top: 0.6rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.hero__panel-stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.hero__panel-stat-val {
  font-size: 1.3rem;
  color: var(--text-primary);
  line-height: 1;
}

.hero__panel-stat-label {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.15em;
  color: var(--text-dim);
  text-transform: uppercase;
}

// ─── 底部滚动提示 ─────────────────────────────────────────────────────────────
.hero__scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: calc(50% - 2rem);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  animation: float 2.4s ease-in-out infinite;

  @media (max-width: 640px) { bottom: 1.25rem; }
}

.hero__scroll-line-v {
  display: block;
  width: 1px;
  height: 28px;
  background: linear-gradient(to bottom, transparent, rgba(208, 208, 208, 0.35));
}

.hero__scroll-text {
  font-size: 0.8rem;
  letter-spacing: 0.45em;
  color: var(--text-dim);
  text-transform: uppercase;
}

// ── 动画 ──────────────────────────────────────────────────────────────────────
@keyframes yellowBreath {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}
</style>
