<template>
  <main class="post-page">
    <div class="container">
      <RouterLink to="/blog" class="post-page__back mono">← 返回博客</RouterLink>

      <template v-if="PostComponent">
        <div v-if="meta.cover" class="post-page__cover">
          <img :src="meta.cover" :alt="meta.title" />
        </div>

        <header class="post-page__header">
          <div class="post-page__tags">
            <span
              v-for="tag in (meta.tags ?? [])"
              :key="tag"
              class="post-page__tag mono"
            >{{ tag }}</span>
          </div>
          <h1 class="post-page__title">{{ meta.title }}</h1>
          <p class="post-page__date mono">{{ meta.date }}</p>
        </header>

        <div class="post-page__divider" />

        <article class="post-content">
          <component :is="PostComponent" />
        </article>
      </template>

      <div v-else class="post-page__not-found">
        <p class="mono" style="color: var(--text-dim)">// 文章不存在</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const mods = import.meta.glob('../posts/*.md') as Record<
  string,
  () => Promise<{ default: unknown; title?: string; date?: string; tags?: string[]; cover?: string }>
>

// 懒加载对应 md 文件
const modEntry = computed(() => {
  const key = `../posts/${slug.value}.md`
  return mods[key] ?? null
})

// 动态组件
import { defineAsyncComponent, ref, watch } from 'vue'

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
.post-page {
  min-height: 100vh;
  padding-top: calc(var(--nav-height) + 3rem);
  padding-bottom: 6rem;
  background: var(--bg-primary);

  @media (max-width: 640px) {
    padding-top: calc(var(--nav-height) + 1.5rem);
    padding-bottom: 4rem;
  }
}

.post-page__cover {
  max-width: 720px;
  margin-bottom: 2.5rem;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
}

.post-page__back {
  font-size: 0.82rem;
  color: var(--text-dim);
  transition: color 0.2s;
  display: inline-block;
  margin-bottom: 3rem;

  &:hover { color: var(--accent-cyan); }

  @media (max-width: 640px) {
    margin-bottom: 1.5rem;
  }
}

.post-page__header {
  max-width: 720px;
  margin-bottom: 2rem;
}

.post-page__tags {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.post-page__tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
  background: rgba(0, 210, 255, 0.08);
  border: 1px solid rgba(0, 210, 255, 0.2);
  color: var(--accent-cyan);
}

.post-page__title {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 0.8rem;
}

.post-page__date {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.post-page__divider {
  height: 1px;
  background: linear-gradient(to right, var(--accent-cyan), transparent);
  opacity: 0.2;
  margin-bottom: 2.5rem;
  max-width: 720px;
}

.post-page__not-found {
  padding: 4rem 0;
}
</style>

<!-- 全局：Markdown 内容样式（非 scoped） -->
<style lang="scss">
.post-content {
  max-width: 720px;
  color: var(--text-secondary);
  line-height: 1.85;
  font-size: 1rem;

  h1, h2, h3, h4 {
    color: var(--text-primary);
    font-weight: 600;
    margin: 2rem 0 1rem;
    line-height: 1.3;
  }

  h2 {
    font-size: 1.5rem;
    padding-bottom: 0.4rem;
    border-bottom: var(--border-subtle);
  }

  h3 { font-size: 1.2rem; }

  p { margin-bottom: 1.2rem; }

  a {
    color: var(--accent-cyan);
    text-decoration: underline;
    text-decoration-color: rgba(0, 210, 255, 0.3);
    transition: text-decoration-color 0.2s;

    &:hover { text-decoration-color: var(--accent-cyan); }
  }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875em;
    background: rgba(0, 210, 255, 0.06);
    border: 1px solid rgba(0, 210, 255, 0.12);
    padding: 0.1em 0.4em;
    border-radius: 3px;
    color: var(--accent-cyan);
  }

  pre {
    background: var(--bg-secondary);
    border: var(--border-subtle);
    border-radius: 6px;
    padding: 1.2rem 1.4rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;

    code {
      background: none;
      border: none;
      padding: 0;
      color: var(--text-primary);
      font-size: 0.875rem;
    }
  }

  blockquote {
    border-left: 3px solid rgba(0, 210, 255, 0.4);
    padding: 0.5rem 1.2rem;
    margin: 1.5rem 0;
    color: var(--text-dim);
    font-style: italic;
  }

  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1.2rem;
    list-style: disc;

    li {
      margin-bottom: 0.4rem;
    }
  }

  ol { list-style: decimal; }

  hr {
    border: none;
    height: 1px;
    background: var(--border-subtle);
    margin: 2rem 0;
  }

  img {
    border-radius: 6px;
    margin: 1.5rem auto;
    max-width: 100%;
    height: auto;
    display: block;
  }
}
</style>
