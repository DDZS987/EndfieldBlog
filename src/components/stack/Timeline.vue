<template>
  <div class="timeline" ref="timelineRef">
    <div
      v-for="(node, i) in timeline"
      :key="i"
      class="timeline__node"
      :class="[`timeline__node--${node.type}`]"
      :ref="el => nodeRefs[i] = el as HTMLElement"
    >
      <!-- 连接线 -->
      <div class="timeline__line" v-if="i < timeline.length - 1">
        <div class="timeline__line-fill" :ref="el => lineRefs[i] = el as HTMLElement" />
      </div>

      <!-- 节点圆点 -->
      <div class="timeline__dot">
        <div class="timeline__dot-inner" />
      </div>

      <!-- 内容 -->
      <div class="timeline__content glass glow-border">
        <div class="timeline__meta">
          <span class="timeline__date mono">{{ node.date }}</span>
          <span class="timeline__type mono">{{ typeLabel[node.type] }}</span>
        </div>
        <h3 class="timeline__title">{{ node.title }}</h3>
        <p class="timeline__desc">{{ node.description }}</p>
        <div class="timeline__techs">
          <span
            v-for="tech in node.techs"
            :key="tech"
            class="timeline__tech mono"
          >{{ tech }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '@/data/timeline'

gsap.registerPlugin(ScrollTrigger)

const typeLabel = {
  learning: 'LEARNING',
  project: 'PROJECT',
  milestone: 'MILESTONE',
}

const timelineRef = ref<HTMLElement | null>(null)
const nodeRefs = ref<HTMLElement[]>([])
const lineRefs = ref<HTMLElement[]>([])

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // 节点入场动效
    nodeRefs.value.forEach((node, i) => {
      if (!node) return
      gsap.fromTo(
        node.querySelector('.timeline__content'),
        { opacity: 0, x: 32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 点亮节点圆点
      gsap.fromTo(
        node.querySelector('.timeline__dot-inner'),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 连接线逐渐延伸
      if (lineRefs.value[i]) {
        gsap.fromTo(
          lineRefs.value[i],
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 0.5,
            delay: 0.3,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })
  }, timelineRef.value ?? undefined)
})

onUnmounted(() => ctx?.revert())
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: 1rem;

  @media (min-width: 640px) { padding-left: 2rem; }
}

.timeline__node {
  position: relative;
  padding-left: 1.75rem;
  padding-bottom: 2rem;

  @media (min-width: 640px) {
    padding-left: 2rem;
    padding-bottom: 2.5rem;
  }

  &:last-child {
    padding-bottom: 0;
  }
}

// ── 连接线 ────────────────────────────────────────────────────────────────────
.timeline__line {
  position: absolute;
  left: 0.45rem;
  top: 1.2rem;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.06);
}

.timeline__line-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple));
  transform-origin: top center;
}

// ── 圆点 ──────────────────────────────────────────────────────────────────────
.timeline__dot {
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid rgba(0, 210, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline__dot-inner {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 8px var(--accent-cyan);
}

.timeline__node--milestone .timeline__dot {
  border-color: rgba(200, 169, 110, 0.5);
}
.timeline__node--milestone .timeline__dot-inner {
  background: var(--accent-gold);
  box-shadow: 0 0 8px var(--accent-gold);
}

// ── 内容卡片 ──────────────────────────────────────────────────────────────────
.timeline__content {
  padding: 1.2rem 1.4rem;
  border-radius: 6px;
}

.timeline__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.timeline__date {
  font-size: 0.75rem;
  color: var(--accent-cyan);
  letter-spacing: 0.1em;
}

.timeline__type {
  font-size: 0.65rem;
  color: var(--text-dim);
  letter-spacing: 0.15em;
}

.timeline__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.timeline__desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.timeline__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.timeline__tech {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 2px;
  background: rgba(0, 210, 255, 0.06);
  border: 1px solid rgba(0, 210, 255, 0.15);
  color: var(--text-dim);
}
</style>
