<template>
  <main class="home-page">

    <!-- ── 固定背景纹理层 ──────────────────────────────────────── -->
    <div class="home-bg" aria-hidden="true">
      <div class="home-bg__contour" />
      <div class="home-bg__cloud-tr" />
      <div class="home-bg__cloud-bl" />
    </div>

    <!-- ── Hero 区 ──────────────────────────────────────────────── -->
    <HeroSection />

    <!-- ── UI 条分隔（Hero → Stack）─────────────────────────────── -->
    <div class="ui-bar" aria-hidden="true">
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
      <div class="ui-bar__border" />
    </div>

    <!-- ── 技术栈预览区 ─────────────────────────────────────────── -->
    <StackPreview />

    <!-- ── UI 条分隔（Stack → Projects）─────────────────────────── -->
    <div class="ui-bar" aria-hidden="true">
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
      <div class="ui-bar__border" />
    </div>

    <!-- ── 项目轮播区 ───────────────────────────────────────────── -->
    <ProjectCarousel />

    <!-- ── 底部 UI 条 ───────────────────────────────────────────── -->
    <div class="ui-bar" aria-hidden="true">
      <div class="ui-bar__border" />
      <div class="ui-bar__gray" />
      <div class="ui-bar__yellow" />
    </div>

    <!-- ── 底部大字水印（header.6edd04.png 从左到右渐隐）──────── -->
    <div class="home-endfield-watermark" aria-hidden="true" />

    <!-- ── 页脚文字 ─────────────────────────────────────────────── -->
    <footer class="home-footer">
      <div class="container home-footer__inner">
        <span class="akrobat home-footer__path">>> -\\ Endfield > X:\Users >></span>
        <span class="akrobat home-footer__right">
          <span class="home-footer__year">2077</span>
          <span>ARKNIGHTS: ENDFIELD</span>
        </span>
      </div>
    </footer>

  </main>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/home/HeroSection.vue'
import StackPreview from '@/components/home/StackPreview.vue'
import ProjectCarousel from '@/components/home/ProjectCarousel.vue'

// 统一的初始化解锁函数：
// refresh() 期间 html.gsap-init-lock 保持 overflow:hidden，
// GSAP 内部的测量 scrollTo 全部是空操作，浏览器不会绘制中间帧。
// 双重 rAF 等 GSAP 内部的 rAF 回调完成后，再解锁并确认归顶。
function unlockAfterInit() {
  ScrollTrigger.refresh()
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.documentElement.classList.remove('gsap-init-lock')
    })
  })
}

onMounted(() => {
  // HomeView.onMounted 在所有子组件 onMounted（及其 nextTick 回调）之后触发。
  // 等待字体加载完毕再 refresh，消除字体导致的布局高度偏差。
  // 3 秒兜底：防止字体加载失败时锁永远不解除。
  nextTick(() => {
    const fallback = setTimeout(unlockAfterInit, 3000)
    document.fonts.ready.then(() => {
      clearTimeout(fallback)
      unlockAfterInit()
    })
  })
})
</script>

<style lang="scss" scoped>
$yellow: #FFFF0F;

.home-page {
  min-height: 100vh;
  background: #FFFFFF;
  position: relative;
  // 不设置任何 overflow：
  // - overflow:hidden 会截断 GSAP pin-spacer，导致后续触发点全部错位
  // - overflow-x:clip 在新版 Chromium 中会将 .carousel__pin(position:fixed)
  //   的 containing block 从 viewport 改为 .home-page，使其退出 root stacking
  //   context，最终被 SiteFooter(z-index:3) 压盖，产生"穿模"效果
  // 水平溢出由 html{overflow-x:clip}（_reset.scss）统一兜底
}

// ── 固定背景层 ────────────────────────────────────────────────────────────────
.home-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.home-bg__contour {
  position: absolute;
  inset: 0;
  background: url('/assets/endfield/imgs/contourline.png') repeat;
  background-size: 480px;
  opacity: 0.035;
}

.home-bg__cloud-tr {
  position: absolute;
  top: 0;
  right: 0;
  width: 520px;
  height: 340px;
  background: url('/assets/endfield/imgs/bg-cloud.png') right top / contain no-repeat;
  opacity: 0.5;

  @media (max-width: 768px) { display: none; }
}

.home-bg__cloud-bl {
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


// ── 通用 UI 条 ────────────────────────────────────────────────────────────────
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

// ── 底部大字水印（ENDFIELD 带条纹，从左到右渐隐）──────────────────────────
.home-endfield-watermark {
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
.home-footer {
  position: relative;
  z-index: 2;
  background: #FFFFFF;
}

.home-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: #AAAAAA;
}

.home-footer__right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.home-footer__year {
  font-weight: 900;
  color: #333333;
}
</style>
