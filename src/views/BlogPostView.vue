<template>
  <main class="post-page">

    <!-- ── 背景层（fixed，白色基底）────────────────────────────── -->
    <div class="post-bg" aria-hidden="true">
      <div class="post-bg__contour" />
      <div class="post-bg__cloud-tr" />
      <div class="post-bg__map" />
    </div>


    <!-- ── 顶部 UI 条 ──────────────────────────────────────────── -->
    <div class="ui-bar" aria-hidden="true">
      <div class="ui-bar__border" />
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
    </div>

    <div class="container post-page__inner">

      <!-- 返回按钮 -->
      <RouterLink to="/blog" class="post-back">
        <img src="/assets/endfield/imgs/icon-switch.svg" class="post-back__icon" alt="" />
        <span class="akrobat">BACK / 返回博客</span>
      </RouterLink>

      <template v-if="PostComponent">

        <!-- ── 文章头部区域 ──────────────────────────────────────── -->
        <header class="post-header">
          <!-- 左侧三色条（1:1:2） -->
          <div class="post-header__stripe" aria-hidden="true">
            <span class="s--pink" />
            <span class="s--yellow" />
            <span class="s--green" />
          </div>

          <div class="post-header__content">
            <!-- 系统标签行 -->
            <div class="post-header__top">
              <span class="post-header__sys akrobat">TECHNICAL_LOG</span>
              <span class="post-header__date akrobat">{{ meta.date }}</span>
            </div>

            <!-- 标签 -->
            <div v-if="(meta.tags ?? []).length" class="post-header__tags">
              <span
                v-for="tag in (meta.tags ?? [])"
                :key="tag"
                class="post-header__tag"
              >[ {{ tag.toUpperCase().replace(/-/g, '_') }} ]</span>
            </div>

            <!-- 标题 -->
            <h1 class="post-header__title">{{ meta.title }}</h1>

            <!-- deco 装饰条 -->
            <div class="post-header__deco" aria-hidden="true">
              <img src="/assets/endfield/imgs/icon-triangles.svg" class="post-header__deco-icon" alt="" />
              <div class="post-header__deco-line" />
            </div>
          </div>
        </header>

        <!-- 封面图 -->
        <div v-if="meta.cover" class="post-cover">
          <img :src="meta.cover" :alt="meta.title" loading="lazy" />
        </div>

        <!-- ── 正文内容 ──────────────────────────────────────────── -->
        <article class="post-content">
          <component :is="PostComponent" />
        </article>

        <!-- 底部导航 -->
        <div class="post-footer">
          <div class="post-footer__stripe" aria-hidden="true" />
          <RouterLink to="/blog" class="post-back post-back--bottom">
            <img src="/assets/endfield/imgs/icon-switch.svg" class="post-back__icon" alt="" />
            <span class="akrobat">BACK / 返回博客</span>
          </RouterLink>
        </div>

      </template>

      <!-- 404 -->
      <div v-else class="post-not-found">
        <span class="post-not-found__code akrobat">[ FILE_NOT_FOUND ]</span>
        <p class="post-not-found__sub">// 文章不存在或已移除</p>
      </div>

    </div>

    <!-- ── 底部 UI 条 ──────────────────────────────────────────── -->
    <div class="ui-bar ui-bar--bot" aria-hidden="true">
      <div class="ui-bar__yellow" />
      <div class="ui-bar__gray" />
      <div class="ui-bar__border" />
    </div>

    <footer class="post-page-footer">
      <div class="container post-page-footer__inner">
        <span class="akrobat">>> -\\ Endfield > X:\Users >></span>
        <span class="akrobat post-page-footer__brand">ARKNIGHTS: ENDFIELD</span>
      </div>
    </footer>

  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const mods = import.meta.glob('../posts/*.md') as Record<
  string,
  () => Promise<{ default: unknown; title?: string; date?: string; tags?: string[]; cover?: string }>
>

const modEntry = computed(() => {
  const key = `../posts/${slug.value}.md`
  return mods[key] ?? null
})

const PostComponent = ref<unknown>(null)
const meta = ref<{ title?: string; date?: string; tags?: string[]; cover?: string }>({})

watch(
  modEntry,
  async (entry) => {
    if (!entry) {
      PostComponent.value = null
      return
    }
    const mod = await entry()
    meta.value = {
      title: mod.title,
      date: mod.date ? String(mod.date).slice(0, 10) : undefined,
      tags: mod.tags,
      cover: mod.cover,
    }
    PostComponent.value = defineAsyncComponent(entry)
  },
  { immediate: true }
)

</script>

<style lang="scss" scoped>
$yellow : #FFFF0F;
$pink   : #FF1AAC;
$green  : #00FFA2;
$silver : #E5E5E5;

// ── 页面基础 ──────────────────────────────────────────────────────────────────
.post-page {
  min-height: 100vh;
  padding-top: var(--nav-height);
  background: #FFFFFF;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) { padding-top: 0; }
}

// ── 背景层 ────────────────────────────────────────────────────────────────────
.post-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 768px) { display: none; }
}

.post-bg__contour {
  position: absolute;
  inset: 0;
  background: url('/assets/endfield/imgs/contourline.png') repeat;
  background-size: 480px;
  opacity: 0.035;
}

.post-bg__cloud-tr {
  position: absolute;
  top: 0;
  right: 0;
  width: 480px;
  height: 300px;
  background: url('/assets/endfield/imgs/bg-cloud.png') right top / contain no-repeat;
  opacity: 0.45;
}

.post-bg__map {
  position: absolute;
  top: var(--nav-height);
  right: 0;
  width: 55%;
  height: 100%;
  background: url('/assets/endfield/imgs/bg_map.jpg') right top / cover no-repeat;
  opacity: 0.8;
}



// ── UI 条 ─────────────────────────────────────────────────────────────────────
.ui-bar { position: relative; z-index: 2; }

.ui-bar__border {
  height: 3px;
  background: url('/assets/endfield/imgs/border_top.jpg') repeat-x center / auto 100%;
}
.ui-bar__yellow { height: 10px; background: $yellow; }
.ui-bar__gray   { height: 3px;  background: #BEBEBE; }
.ui-bar--bot .ui-bar__yellow { height: 10px; }

// ── 内容容器 ──────────────────────────────────────────────────────────────────
.post-page__inner {
  position: relative;
  z-index: 2;
  padding-top: 2.4rem;
  padding-bottom: 4rem;
  // 覆盖 Bootstrap .container 的 max-width，改为左右各 20% 留白
  max-width: 100% !important;
  padding-left: 20% !important;
  padding-right: 20% !important;

  @media (max-width: 1024px) {
    padding-left: 6% !important;
    padding-right: 6% !important;
  }

  @media (max-width: 640px) {
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
    padding-top: 1.6rem;
  }
}

// ── 返回按钮 ──────────────────────────────────────────────────────────────────
.post-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: #888888;
  text-decoration: none;
  margin-bottom: 2.4rem;
  transition: color 0.2s ease;

  &:hover {
    color: #1A1A1A;

    .post-back__icon { filter: brightness(0); }
  }
}

.post-back__icon {
  width: 14px;
  height: 14px;
  filter: brightness(0) invert(0.5);
  transform: scaleX(-1);
  transition: filter 0.2s ease;
}

// ── 文章头部 ──────────────────────────────────────────────────────────────────
.post-header {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin-bottom: 0;
}

// 三色条
.post-header__stripe {
  display: flex;
  flex-direction: column;
  width: 10px;
  flex-shrink: 0;
  align-self: stretch;

  span { display: block; width: 100%; }
}

.s--pink   { flex: 1; background: $pink; }
.s--yellow { flex: 1; background: $yellow; }
.s--green  { flex: 2; background: $green; }

.post-header__content {
  flex: 1;
  background: #F8F8F8;
  padding: 1.6rem 1.8rem;
  border: 1px solid #E8E8E8;
  border-left: none;
}

.post-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.post-header__sys {
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: #AAAAAA;
  text-transform: uppercase;
}

.post-header__date {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: #888888;
}

.post-header__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

.post-header__tag {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  color: #999999;
  white-space: nowrap;
}

.post-header__title {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.25;
  margin: 0 0 1rem;
}

// triangles 装饰行
.post-header__deco {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.2rem;
}

.post-header__deco-icon {
  flex-shrink: 0;
  height: 9px;
  width: auto;
  opacity: 0.4;
}

.post-header__deco-line {
  flex: 1;
  height: 1px;
  background: #E0E0E0;
}

// ── 封面图 ────────────────────────────────────────────────────────────────────
.post-cover {
  margin: 1.6rem 0 2rem;
  overflow: hidden;
  border: 1px solid #E8E8E8;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

// ── 底部 ──────────────────────────────────────────────────────────────────────
.post-footer {
  margin-top: 3rem;
  padding-top: 1.6rem;
  border-top: 1px solid #E8E8E8;
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.post-footer__stripe {
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, $pink 0 25%, $yellow 25% 50%, $green 50% 100%);
  flex-shrink: 0;
}

.post-back--bottom {
  margin-bottom: 0;
}

// ── 404 ───────────────────────────────────────────────────────────────────────
.post-not-found {
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.post-not-found__code {
  font-size: 1.2rem;
  color: $yellow;
}

.post-not-found__sub {
  font-size: 0.82rem;
  color: #AAAAAA;
}

// ── 页脚 ──────────────────────────────────────────────────────────────────────
.post-page-footer {
  position: relative;
  z-index: 2;
  background: #FFFFFF;
}

.post-page-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 0;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: #AAAAAA;
}

.post-page-footer__brand {
  font-weight: 900;
  color: #1A1A1A;
}
</style>

<!-- ── Markdown 内容全局样式（白底适配，非 scoped）────────────────────────── -->
<style lang="scss">
$yellow : #FFFF0F;
$pink   : #FF1AAC;
$green  : #00FFA2;

.post-content {
  margin-top: 2rem;
  color: #444444;
  line-height: 1.9;
  font-size: 1rem;
  font-family: 'HarmonyOS SC', sans-serif;

  h1, h2, h3, h4 {
    font-family: 'HarmonyOS SC', sans-serif;
    color: #1A1A1A;
    font-weight: 700;
    margin: 2.2rem 0 0.9rem;
    line-height: 1.3;
  }

  h2 {
    font-size: 1.4rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #E8E8E8;
    // 左侧黄色 accent bar
    padding-left: 0.8rem;
    border-left: 3px solid $yellow;
  }

  h3 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #1A1A1A;
    padding: 0.4rem 0.8rem !important;
    border-left: 2px solid rgba(255, 255, 15, 0.55) !important;
    border-bottom: none !important;
    background: #FAFAFA;
  }

  p { margin-bottom: 1.25rem; }

  a {
    color: #9A7800 !important;
    text-decoration: underline;
    text-decoration-color: rgba(154, 120, 0, 0.3);
    transition: text-decoration-color 0.2s;

    &:hover { text-decoration-color: rgba(154, 120, 0, 0.8) !important; }
  }

  // 行内代码：浅灰背景，深色文字
  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875em;
    background: #F2F2F2;
    color: #CC5500;
    padding: 0.1em 0.45em;
    border-radius: 2px;
    border: 1px solid #E8E8E8;
  }

  // 代码块：浅灰底，左侧三色条（与其他矩形盒子保持一致）
  pre {
    position: relative;
    background: #F7F7F7;
    border: 1px solid #E0E0E0;
    border-left: none; // 由 ::before 三色条取代
    padding: 1.2rem 1.4rem 1.2rem 1.8rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;

    // 左侧三色条（pink:yellow:green = 1:1:2）
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 6px;
      background: linear-gradient(
        to bottom,
        $pink   0%   25%,
        $yellow 25%  50%,
        $green  50% 100%
      );
    }

    code {
      background: none;
      color: #333333;
      font-size: 0.875rem;
      padding: 0;
      border: none;
    }
  }

  // 引用块
  blockquote {
    border-left: 3px solid $yellow;
    background: #FAFAFA;
    padding: 0.8rem 1.2rem;
    margin: 1.5rem 0;
    color: #666666;
    font-style: italic;
    border-right: 1px solid #F0F0F0;

    p { margin-bottom: 0; }
  }

  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1.2rem;

    li {
      margin-bottom: 0.4rem;

      &::marker { color: $yellow; }
    }
  }

  ul { list-style: disc; }
  ol { list-style: decimal; }

  hr {
    border: none;
    height: 2px;
    background: linear-gradient(
      to right,
      $pink 0 25%,
      $yellow 25% 50%,
      $green 50% 100%
    );
    margin: 2.5rem 0;
    width: 60px;
  }

  img {
    margin: 1.5rem auto;
    max-width: 100%;
    height: auto;
    display: block;
    border: 1px solid #E8E8E8;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;

    th {
      background: #F0F0F0;
      color: #333333;
      padding: 0.6rem 1rem;
      text-align: left;
      font-weight: 700;
      font-family: 'Gilroy', sans-serif;
      border-bottom: 2px solid #D8D8D8;
    }

    td {
      padding: 0.6rem 1rem;
      border-bottom: 1px solid #F0F0F0;
      color: #444444;
    }

    tr:last-child td { border-bottom: none; }
    tr:nth-child(even) td { background: #FAFAFA; }
  }
}

</style>
