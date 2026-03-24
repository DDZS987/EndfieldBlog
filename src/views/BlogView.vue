<template>
  <main class="blog-page">

    <!-- ── 背景纹理层（固定，不跟随滚动）──────────────────────── -->
    <div class="blog-bg" aria-hidden="true">
      <div class="blog-bg__contour" />
      <div class="blog-bg__cloud-tr" />
      <div class="blog-bg__cloud-bl" />
    </div>

    <!-- ── 顶部 UI 条（border_top + 黄条 + 灰条）──────────────── -->
    <div class="ui-bar ui-bar--top" aria-hidden="true">
      <div class="ui-bar__border" />
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
    </div>

    <!-- ── 页头区（深灰背景，含 card-tex 纹理）────────────────── -->
    <header class="blog-header">
      <div class="blog-header__bg" aria-hidden="true">
        <div class="blog-header__map" />
      </div>
      <div class="container blog-header__inner">

        <!-- 左侧：图标 + 三色横条 + 文字 -->
        <div class="blog-header__left">
          <!-- rule_icon.svg — 文档图标（临行事项 SVG） -->
          <div class="blog-header__icon" aria-hidden="true">
            <img src="/assets/endfield/imgs/icon-rule.svg" width="22" height="26"
              style="filter: brightness(0) invert(1);" alt="" />
          </div>

          <!-- 三色横条（1:1:2，上→下：pink / yellow / green） -->
          <div class="blog-header__stripe" aria-hidden="true">
            <span class="hstripe hstripe--pink" />
            <span class="hstripe hstripe--yellow" />
            <span class="hstripe hstripe--green" />
          </div>

          <!-- 文字信息 -->
          <div class="blog-header__text">
            <p class="blog-header__sys akrobat">04 // TECHNICAL_LOGS</p>
            <h1 class="blog-header__title">
              文章
              <span class="blog-header__title-en akrobat">/ POSTS</span>
            </h1>
            <p class="blog-header__sub">记录架构思考与底层研究的终端输出</p>
            <!-- deco.9e77dd.svg — 系统标题装饰条 -->
            <div class="blog-header__deco-bar" aria-hidden="true">
              <img src="/assets/endfield/imgs/icon-deco.svg" alt="" />
            </div>
          </div>
        </div>

        <!-- 右侧：点阵 + 黄圈节点 -->
        <div class="blog-header__right" aria-hidden="true">
          <div class="blog-header__dots">
            <span v-for="i in 9" :key="i" class="blog-header__dot" />
          </div>
          <img class="blog-header__circle" src="/assets/endfield/imgs/yellowCircle.png" alt="" />
        </div>

      </div>
    </header>

    <!-- ── 分隔 UI 条（灰 + 黄）────────────────────────────────── -->
    <div class="ui-bar ui-bar--mid" aria-hidden="true">
      <div class="ui-bar__gray" />
      <div class="ui-bar__yellow" />
    </div>

    <!-- ── 内容区（白色背景）──────────────────────────────────── -->
    <div class="container blog-content">

      <!-- 列表头 -->
      <div class="blog-content__meta">
        <span class="blog-content__label akrobat">LOG_ENTRIES</span>
        <span class="blog-content__count akrobat">
          {{ posts.length.toString().padStart(3, '0') }}
        </span>
      </div>

      <!-- triangles.6ffea2.svg + 虚线复合分隔 -->
      <div class="blog-content__dash" aria-hidden="true">
        <img src="/assets/endfield/imgs/icon-triangles.svg" class="blog-content__dash-icon" alt="" />
        <div class="blog-content__dash-line" />
      </div>

      <!-- 空态 -->
      <div v-if="posts.length === 0" class="blog-empty">
        <span class="blog-empty__code akrobat">[ NULL ]</span>
        <span class="blog-empty__sub">// 暂无日志输出</span>
      </div>

      <!-- 文章列表 -->
      <ul v-else class="blog-list">
        <li v-for="(post, i) in posts" :key="post.slug">
          <PostCard :post="post" :index="i" />
        </li>
      </ul>

    </div>

    <!-- ── 底部 UI 条 ──────────────────────────────────────────── -->
    <div class="ui-bar ui-bar--bot" aria-hidden="true">
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
      <div class="ui-bar__border" />
    </div>

    <!-- ── 页脚文字 ────────────────────────────────────────────── -->
    <footer class="blog-footer">
      <div class="container blog-footer__inner">
        <span class="akrobat blog-footer__path">>> -\\ Endfield > X:\Users >></span>
        <span class="akrobat blog-footer__right">
          <span class="blog-footer__year">2077</span>
          <span>ARKNIGHTS: ENDFIELD</span>
        </span>
      </div>
    </footer>

  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PostMeta } from '@/types'
import PostCard from '@/components/blog/PostCard.vue'

const mods = import.meta.glob('../posts/*.md', { eager: true }) as Record<
  string,
  { title?: string; date?: string; tags?: string[]; cover?: string; summary?: string }
>

const posts = computed<PostMeta[]>(() =>
  Object.entries(mods)
    .map(([path, mod]) => {
      const slug = path.replace('../posts/', '').replace('.md', '')
      return {
        slug,
        title: String(mod.title ?? slug),
        date: mod.date ? String(mod.date).slice(0, 10) : '',
        tags: Array.isArray(mod.tags) ? mod.tags.map(String) : [],
        cover: mod.cover ? String(mod.cover) : undefined,
        summary: mod.summary ? String(mod.summary) : undefined,
      } satisfies PostMeta
    })
    .sort((a, b) => b.date.localeCompare(a.date))
)
</script>

<style lang="scss" scoped>
$yellow : #FFFF0F;
$pink : #FF1AAC;
$green : #00FFA2;
$silver : #E5E5E5;

// ── 页面基础 ──────────────────────────────────────────────────────────────────
.blog-page {
  min-height: 100vh;
  padding-top: var(--nav-height);
  background: #FFFFFF;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) { padding-top: 0; }
}

// ── 背景（fixed，始终在底层） ─────────────────────────────────────────────────
.blog-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 768px) { display: none; }
}

.blog-bg__contour {
  position: absolute;
  inset: 0;
  background: url('/assets/endfield/imgs/contourline.png') repeat;
  background-size: 480px;
  opacity: 0.035;
}

.blog-bg__cloud-tr {
  position: absolute;
  top: 0;
  right: 0;
  width: 520px;
  height: 340px;
  background: url('/assets/endfield/imgs/bg-cloud.png') right top / contain no-repeat;
  opacity: 0.5;

  @media (max-width: 768px) { display: none; }
}

.blog-bg__cloud-bl {
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

// ── 页头（深灰区域，参考 Image#5 header） ─────────────────────────────────────
.blog-header {
  position: relative;
  z-index: 10;
  background: #2C2C2C;
}

.blog-header__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.blog-header__map {
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

.blog-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2.2rem;
  padding-bottom: 2.2rem;
}

.blog-header__left {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

// 图标盒
.blog-header__icon {
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

// 三色横条（竖向堆叠，pink/yellow/green = 1:1:2）
.blog-header__stripe {
  display: flex;
  flex-direction: column;
  width: 6px;
  align-self: stretch;
  flex-shrink: 0;
  gap: 0;
}

.hstripe {
  display: block;
  width: 100%;
}

.hstripe--pink {
  flex: 1;
  background: $pink;
}

.hstripe--yellow {
  flex: 1;
  background: $yellow;
}

.hstripe--green {
  flex: 2;
  background: $green;
}

// 文字
.blog-header__text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.blog-header__sys {
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(229, 229, 229, 0.45);
  margin: 0;
}

.blog-header__title {
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  letter-spacing: -0.02em;
  color: $silver;
  margin: 0;
  line-height: 1.1;
}

.blog-header__title-en {
  font-size: 0.4em;
  letter-spacing: 0.14em;
  color: rgba(229, 229, 229, 0.35);
  vertical-align: middle;
  margin-left: 0.4em;
}

.blog-header__sub {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 0.82rem;
  color: rgba(229, 229, 229, 0.45);
  margin: 0;
}

// deco.9e77dd.svg — 系统标题装饰条（白色化，暗背景上显示）
.blog-header__deco-bar {
  margin-top: 0.5rem;

  img {
    height: 18px;
    width: auto;
    // 将 #363535 颜色翻转为白色（深色背景下可见）
    filter: brightness(0) invert(1);
    opacity: 0.2;
  }
}

// 右侧装饰
.blog-header__right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.8rem;
  flex-shrink: 0;

  @media (max-width: 640px) {
    display: none;
  }
}

.blog-header__dots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.blog-header__dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(229, 229, 229, 0.25);
}

.blog-header__circle {
  width: 28px;
  height: 28px;
  object-fit: contain;
  animation: yellowBreath 2.4s ease-in-out infinite;
}

// ── 内容区 ────────────────────────────────────────────────────────────────────
.blog-content {
  position: relative;
  z-index: 2;
  padding-top: 2.4rem;
  padding-bottom: 4rem;
}

.blog-content__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.blog-content__label {
  font-size: 0.64rem;
  letter-spacing: 0.22em;
  color: #AAAAAA;
  text-transform: uppercase;
}

.blog-content__count {
  font-size: 1.6rem;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px #D0D0D0;
  line-height: 1;
}

// triangles + 虚线复合分隔行
.blog-content__dash {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
}

.blog-content__dash-icon {
  flex-shrink: 0;
  height: 10px;
  width: auto;
  opacity: 0.5;
}

.blog-content__dash-line {
  flex: 1;
  height: 8px;
  background: url('/assets/endfield/imgs/dash_line.png') left center / auto 100% repeat-x;
  opacity: 0.45;
}

// ── 空态 ──────────────────────────────────────────────────────────────────────
.blog-empty {
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.blog-empty__code {
  font-size: 1.2rem;
  color: $yellow;
}

.blog-empty__sub {
  font-size: 0.8rem;
  color: #AAAAAA;
}

// ── 文章列表 ──────────────────────────────────────────────────────────────────
.blog-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

// ── 页脚 ──────────────────────────────────────────────────────────────────────
.blog-footer {
  position: relative;
  z-index: 2;
  background: #FFFFFF;
}

.blog-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: #AAAAAA;
}

.blog-footer__right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.blog-footer__year {
  font-weight: 900;
  color: #333333;
}

// ── 动画 ──────────────────────────────────────────────────────────────────────
@keyframes yellowBreath {

  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}
</style>
