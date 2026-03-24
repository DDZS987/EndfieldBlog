<template>
  <main class="stack-page">

    <!-- ── 背景纹理层（固定）──────────────────────────────────── -->
    <div class="stack-bg" aria-hidden="true">
      <div class="stack-bg__contour" />
      <div class="stack-bg__cloud-tr" />
      <div class="stack-bg__cloud-bl" />
    </div>

    <!-- ── 顶部 UI 条 ──────────────────────────────────────────── -->
    <div class="ui-bar ui-bar--top" aria-hidden="true">
      <div class="ui-bar__border" />
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
    </div>

    <!-- ── 页头区（深灰面板）───────────────────────────────────── -->
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
            <p class="stack-header__sys akrobat">03 // TECH_STACK</p>
            <h1 class="stack-header__title">
              技术栈
              <span class="stack-header__title-en akrobat">/ STACK</span>
            </h1>
            <p class="stack-header__sub">技术栈 & 学习历程 — 从零到现在，记录每一个技术节点。</p>
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

    <!-- ── 分隔 UI 条 ──────────────────────────────────────────── -->
    <div class="ui-bar ui-bar--mid" aria-hidden="true">
      <div class="ui-bar__gray" />
      <div class="ui-bar__yellow" />
    </div>

    <!-- ── 内容区（白底）─────────────────────────────────────────── -->
    <div class="container stack-content">





      <div class="stack-content__dash" aria-hidden="true">
        <img src="/assets/endfield/imgs/icon-triangles.svg" class="stack-content__dash-icon" alt="" />
        <div class="stack-content__dash-line" />
      </div>

      <!-- 移除 Bootstrap row/col，使用纯 CSS Grid 布局 -->
      <div class="stack-page__body">
        <aside class="stack-page__badges">
          <div
            v-for="group in techGroups"
            :key="group.label"
            class="stack-page__group"
          >
            <p class="stack-page__group-label mono">{{ group.label }}</p>
            <div class="stack-page__badge-list">
              <TechBadge
                v-for="tech in group.items"
                :key="tech"
                :name="tech"
                :category="group.category"
              />
            </div>
          </div>
        </aside>

        <section class="stack-page__timeline">
          <Timeline />
        </section>
      </div>

    </div>

    <!-- ── 底部 UI 条 ───────────────────────────────────────────── -->
    <div class="ui-bar ui-bar--bot" aria-hidden="true">
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
      <div class="ui-bar__border" />
    </div>

    <!-- ── 底部大字水印 ─────────────────────────────────────────── -->
    <div class="stack-endfield-watermark" aria-hidden="true" />

    <!-- ── 页脚文字 ─────────────────────────────────────────────── -->
    <footer class="stack-footer">
      <div class="container stack-footer__inner">
        <span class="akrobat stack-footer__path">>> -\\ Endfield > X:\Users >></span>
        <span class="akrobat stack-footer__right">
          <span class="stack-footer__year">2077</span>
          <span>ARKNIGHTS: ENDFIELD</span>
        </span>
      </div>
    </footer>

  </main>
</template>

<script setup lang="ts">
import TechBadge from '@/components/stack/TechBadge.vue'
import Timeline from '@/components/stack/Timeline.vue'

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
    items: ['GraphRAG', '知识图谱', 'Milvus', 'Qdrant', 'SQLite', 'MongoDB', 'MySQL'],
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
</script>

<style lang="scss" scoped>
$yellow: #FFFF0F;
$pink:   #FF1AAC;
$green:  #00FFA2;
$silver: #E5E5E5;

// ── 页面基础 ──────────────────────────────────────────────────────────────────
.stack-page {
  min-height: 100vh;
  padding-top: var(--nav-height);
  background: #FFFFFF;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) { padding-top: 0; }
}

// ── 背景 ──────────────────────────────────────────────────────────────────────
.stack-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 768px) { display: none; }
}

.stack-bg__contour {
  position: absolute;
  inset: 0;
  background: url('/assets/endfield/imgs/contourline.png') repeat;
  background-size: 480px;
  opacity: 0.035;
}

.stack-bg__cloud-tr {
  position: absolute;
  top: 0;
  right: 0;
  width: 520px;
  height: 340px;
  background: url('/assets/endfield/imgs/bg-cloud.png') right top / contain no-repeat;
  opacity: 0.5;

  @media (max-width: 768px) { display: none; }
}

.stack-bg__cloud-bl {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 400px;
  height: 260px;
  background: url('/assets/endfield/imgs/bg-cloud.png') left bottom / contain no-repeat;
  opacity: 0.3;
  transform: scaleX(-1) scaleY(-1);

  @media (max-width: 768px) { display: none; }
}


// ── UI 条 ─────────────────────────────────────────────────────────────────────
.ui-bar { position: relative; z-index: 2; }
.ui-bar__border { height: 3px; background: url('/assets/endfield/imgs/border_top.jpg') repeat-x center / auto 100%; }
.ui-bar__yellow { height: 10px; background: $yellow; }
.ui-bar__gray   { height: 3px;  background: #BEBEBE; }

// ── 页头（深灰面板）──────────────────────────────────────────────────────────
.stack-header {
  position: relative;
  z-index: 10;
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

// ── 内容区 ────────────────────────────────────────────────────────────────────
.stack-content {
  position: relative;
  z-index: 2;
  // 覆盖全局 .container 的 padding，让内容区更宽
  max-width: 100%;
  width: 100%;
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

// ── 主体布局 ──────────────────────────────────────────────────────────────────
.stack-page__body {
  display: grid;
  // PC端：badges 列自适应内容宽度（最大 400px 容纳双列），Timeline 占剩余
  grid-template-columns: fit-content(400px) 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.stack-page__badges {
  position: sticky;
  top: calc(var(--nav-height) + 2rem);
  // PC端：技术组双列堆叠，形成紧凑的纵向矩形
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  gap: 1.5rem;
  width: 100% !important;

  @media (max-width: 1024px) {
    position: static;
    // 移动端：保持双列
    gap: 1.2rem;
  }
}

.stack-page__group-label {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6B6B6B;
  margin-bottom: 0.6rem;
}

.stack-page__badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.stack-page__timeline {
  // 覆盖 Bootstrap col-lg-8 在 CSS Grid 上下文中的 width: 66.67%
  width: 100% !important;
}

// ── 底部大字水印 ──────────────────────────────────────────────────────────────
.stack-endfield-watermark {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 140px;
  background: url('/终末地素材/集结出发10.31/skland-fe-static/skland-activity/images/header.6edd04.png') left center / auto 100% no-repeat;
  opacity: 0.06;
  mask-image: linear-gradient(to right, black 20%, transparent 75%);
  -webkit-mask-image: linear-gradient(to right, black 20%, transparent 75%);
}

// ── 页脚 ──────────────────────────────────────────────────────────────────────
.stack-footer {
  position: relative;
  z-index: 2;
  background: #FFFFFF;
}

.stack-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: #AAAAAA;
}

.stack-footer__right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.stack-footer__year {
  font-weight: 900;
  color: #333333;
}

// ── 动画 ──────────────────────────────────────────────────────────────────────
@keyframes yellowBreath {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.15); }
}
</style>
