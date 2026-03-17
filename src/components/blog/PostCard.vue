<template>
  <RouterLink :to="`/blog/${post.slug}`" class="post-card glass glow-border">
    <!-- 封面 -->
    <div v-if="post.cover" class="post-card__cover">
      <img :src="post.cover" :alt="post.title" loading="lazy" />
    </div>
    <div v-else class="post-card__cover-placeholder">
      <span class="post-card__cover-icon mono">&gt;_</span>
    </div>

    <div class="post-card__body">
      <!-- 标签 -->
      <div class="post-card__tags">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="post-card__tag mono"
        >{{ tag }}</span>
      </div>

      <h2 class="post-card__title">{{ post.title }}</h2>

      <p v-if="post.summary" class="post-card__summary">{{ post.summary }}</p>

      <div class="post-card__meta mono">
        <span>{{ post.date }}</span>
        <span v-if="post.readingTime">· {{ post.readingTime }} min read</span>
      </div>
    </div>

    <!-- 悬浮发光线 -->
    <div class="post-card__glow-line" />
  </RouterLink>
</template>

<script setup lang="ts">
import type { PostMeta } from '@/types'
defineProps<{ post: PostMeta }>()
</script>

<style lang="scss" scoped>
.post-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s var(--ease-out-expo),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--glow-cyan);
    border-color: rgba(0, 210, 255, 0.35);

    .post-card__glow-line {
      opacity: 1;
      transform: scaleX(1);
    }

    .post-card__title {
      color: var(--accent-cyan);
    }
  }
}

.post-card__cover {
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .post-card:hover & img {
    transform: scale(1.04);
  }
}

.post-card__cover-placeholder {
  height: 120px;
  background: linear-gradient(
    135deg,
    rgba(0, 210, 255, 0.05),
    rgba(123, 47, 247, 0.05)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-card__cover-icon {
  font-size: 2rem;
  color: var(--text-dim);
}

.post-card__body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.post-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.post-card__tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.45rem;
  border-radius: 2px;
  background: rgba(0, 210, 255, 0.08);
  border: 1px solid rgba(0, 210, 255, 0.18);
  color: var(--accent-cyan);
  letter-spacing: 0.05em;
}

.post-card__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  transition: color 0.25s;
}

.post-card__summary {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card__meta {
  font-size: 0.72rem;
  color: var(--text-dim);
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: var(--border-subtle);
  display: flex;
  gap: 0.4rem;
}

.post-card__glow-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, var(--accent-cyan), var(--accent-purple));
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.4s var(--ease-out-expo), opacity 0.3s;
  opacity: 0;
}
</style>
