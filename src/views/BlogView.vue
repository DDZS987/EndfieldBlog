<template>
  <main class="blog-page">
    <div class="blog-page__header container">
      <p class="blog-page__label mono">04 // blog</p>
      <h1 class="blog-page__title">文章</h1>
    </div>

    <div class="container blog-page__content">
      <div v-if="posts.length === 0" class="blog-page__empty">
        <p class="mono" style="color: var(--text-dim)">// 暂无文章</p>
      </div>
      <div v-else class="blog-page__grid row g-4">
        <div v-for="post in posts" :key="post.slug" class="col-12 col-md-6 col-xl-4">
          <PostCard :post="post" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PostMeta } from '@/types'
import PostCard from '@/components/blog/PostCard.vue'

// 通过 import.meta.glob 读取所有 md 文件的 frontmatter
// unplugin-vue-markdown 将 frontmatter 各字段作为具名导出（export const title = ...）
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
        title:   String(mod.title ?? slug),
        date:    mod.date ? String(mod.date).slice(0, 10) : '',
        tags:    Array.isArray(mod.tags) ? mod.tags.map(String) : [],
        cover:   mod.cover ? String(mod.cover) : undefined,
        summary: mod.summary ? String(mod.summary) : undefined,
      } satisfies PostMeta
    })
    .sort((a, b) => b.date.localeCompare(a.date))
)
</script>

<style lang="scss" scoped>
.blog-page {
  min-height: 100vh;
  padding-top: var(--nav-height);
  background: var(--bg-primary);
}

.blog-page__header {
  padding-top: 4rem;
  padding-bottom: 3rem;
}

.blog-page__label {
  color: var(--accent-cyan);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}

.blog-page__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
}

.blog-page__content {
  padding-bottom: 6rem;
}

.blog-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.blog-page__empty {
  padding: 4rem 0;
}
</style>
