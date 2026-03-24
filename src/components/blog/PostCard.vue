<template>
  <RouterLink :to="`/blog/${post.slug}`" class="post-card">

    <!-- 时间戳列 -->
    <div class="post-card__time">
      <span class="post-card__date akrobat">{{ formatDate(post.date) }}</span>
      <span class="post-card__idx akrobat">{{ idxStr }}</span>
    </div>

    <!-- 主体 -->
    <div class="post-card__body">
      <div v-if="post.tags.length" class="post-card__tags">
        <span v-for="tag in post.tags" :key="tag" class="post-card__tag">[ {{ tag.toUpperCase().replace(/-/g, '_') }}
          ]</span>
      </div>
      <h2 class="post-card__title">{{ post.title }}</h2>
      <p v-if="post.summary" class="post-card__summary">{{ post.summary }}</p>
    </div>

    <!-- 右侧箭头 -->
    <div class="post-card__arrow" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line x1="2" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" />
        <polyline points="9,4 13,8 9,12" stroke="currentColor" stroke-width="1.5" fill="none" />
      </svg>
    </div>

  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PostMeta } from '@/types'

const props = defineProps<{ post: PostMeta; index?: number }>()

const idxStr = computed(() => String((props.index ?? 0) + 1).padStart(2, '0'))

function formatDate(date: string): string {
  if (!date) return '----.--.--'
  return date.replace(/-/g, '.')
}
</script>

<style lang="scss" scoped>
$yellow : #FFFF0F;

.post-card {
  display: grid;
  // time | body | arrow
  grid-template-columns: 108px 1fr auto;
  align-items: stretch;
  text-decoration: none;
  background: #FFFFFF;
  border: 1px solid #E4E4E4;
  border-left: 5px solid $yellow;
  // 纹理直接作为卡片背景层，右侧对齐，不重复，不受 filter 干扰
  background:
    #FFFFFF
    url('/assets/endfield/imgs/card-tex.png') right center / auto 100% no-repeat;
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.22s ease,
    box-shadow 0.25s ease,
    transform 0.25s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));

  // 右→左灰色渐隐遮罩，覆盖在纹理之上
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to left, rgba(140, 140, 140, 0.18) 0%, transparent 58%);
    pointer-events: none;
    z-index: 0;
  }

  // 底部扫光线（hover 时展开）
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    background: $yellow;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    border-color: rgba(255, 255, 15, 0.8);
    box-shadow:
      -3px 0 12px rgba(255, 255, 15, 0.25),
      0 2px 20px rgba(255, 255, 15, 0.08);
    transform: translateY(-1px);

    &::after {
      transform: scaleX(1);
    }

    .post-card__title {
      color: #1A1A1A;
    }

    .post-card__arrow {
      color: $yellow;
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr auto;
  }
}

// ── 时间戳 ────────────────────────────────────────────────────────────────────
.post-card__time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2rem;
  padding: 1.3rem 1rem 1.3rem 1rem;
  border-right: 1px solid #F0F0F0;
  position: relative;
  z-index: 1;

  @media (max-width: 640px) {
    display: none;
  }
}

.post-card__date {
  font-size: 0.72rem;
  color: #888888;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.post-card__idx {
  font-size: 0.58rem;
  color: #CCCCCC;
  letter-spacing: 0.12em;
}

// ── 主体 ──────────────────────────────────────────────────────────────────────
.post-card__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  padding: 1.3rem 1.2rem;
  position: relative;
  z-index: 1;
}

// 标签
.post-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.post-card__tag {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  color: #999999;
  white-space: nowrap;
}

// 标题
.post-card__title {
  font-family: 'HarmonyOS SC', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #333333;
  line-height: 1.5;
  transition: color 0.2s ease;
  margin: 0;
}

// 摘要
.post-card__summary {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 0.8rem;
  color: #999999;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

// ── 箭头 ──────────────────────────────────────────────────────────────────────
.post-card__arrow {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 1.3rem 1.2rem;
  color: #CCCCCC;
  opacity: 0.6;
  transform: translateX(-4px);
  transition:
    color 0.2s ease,
    opacity 0.2s ease,
    transform 0.25s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1));
}
</style>
