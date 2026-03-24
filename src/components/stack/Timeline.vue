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

      <!-- 节点：yellowCircle 风格 -->
      <div class="timeline__dot" :class="{ 'timeline__dot--active': node.type === 'milestone' }">
        <div class="timeline__dot-inner" />
      </div>

      <!-- 内容卡片：endfield-card 全局类注入等高线纹理 -->
      <div class="timeline__content endfield-card">
        <div class="timeline__meta">
          <span class="timeline__date akrobat">[ {{ node.date }} ]</span>
          <span class="timeline__type">{{ typeLabel[node.type] }}</span>
        </div>
        <h3 class="timeline__title">{{ node.title }}</h3>
        <p class="timeline__desc">{{ node.description }}</p>
        <div class="timeline__techs">
          <span
            v-for="tech in node.techs"
            :key="tech"
            class="timeline__tech"
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
  learning:  'LEARNING',
  project:   'PROJECT',
  milestone: 'MILESTONE',
}

const timelineRef = ref<HTMLElement | null>(null)
const nodeRefs    = ref<HTMLElement[]>([])
const lineRefs    = ref<HTMLElement[]>([])

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    nodeRefs.value.forEach((node, i) => {
      if (!node) return

      gsap.fromTo(
        node.querySelector('.timeline__content'),
        { opacity: 0, x: 28 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )

      gsap.fromTo(
        node.querySelector('.timeline__dot-inner'),
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: node, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )

      if (lineRefs.value[i]) {
        gsap.fromTo(
          lineRefs.value[i],
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1, duration: 0.5, delay: 0.3, ease: 'power2.inOut',
            scrollTrigger: { trigger: node, start: 'top 75%', toggleActions: 'play none none reverse' },
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
  padding-left: 1rem;

  @media (min-width: 640px) { padding-left: 2rem; }
}

.timeline__node {
  position: relative;
  padding-left: 1.75rem;
  padding-bottom: 2.2rem;

  @media (min-width: 640px) {
    padding-left: 2rem;
    padding-bottom: 2.6rem;
  }

  &:last-child { padding-bottom: 0; }
}

// ── 连接线（冷白 1px 细线）─────────────────────────────────────────────────────
.timeline__line {
  position: absolute;
  left: 0.42rem;
  top: 1rem;
  bottom: 0;
  width: 1px;
  background: rgba(0, 0, 0, 0.08);
}

.timeline__line-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.06));
  transform-origin: top center;
}

// ── 节点（全统一终末黄） ────────────────────────────────────────────────────────
.timeline__dot {
  position: absolute;
  left: -0.01rem;
  top: 0.55rem;
  width: 0.88rem;
  height: 0.88rem;
  border-radius: 50%;
  background: var(--bg-panel);
  border: 1px solid rgba(255, 255, 15, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

// learning / project 节点：暗黄小圆点
.timeline__dot-inner {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 15, 0.45);
  box-shadow: 0 0 4px rgba(255, 255, 15, 0.3);
}

// milestone 节点：全亮黄 + 呼吸动画
.timeline__node--milestone .timeline__dot {
  border-color: rgba(255, 255, 15, 0.55);
}
.timeline__node--milestone .timeline__dot-inner {
  background: var(--accent-yellow);
  box-shadow: 0 0 8px rgba(255, 255, 15, 0.8), 0 0 16px rgba(255, 255, 15, 0.3);
  animation: yellowBreath 2.2s ease-in-out infinite;
}

// ── 内容卡片（背景/切角/纹理由全局 .endfield-card 处理）──────────────────────
.timeline__content {
  // 只保留内边距和左侧引导线（不重复设置背景和切角）
  padding: 1.5rem 1.8rem;
  border-left: 3px solid rgba(0, 0, 0, 0.10);

  @media (max-width: 768px) {
    padding: 1rem 1.2rem;
    // 负向边距抵消容器 padding，使卡片宽度贴近视窗宽度
    width: calc(100vw - 3.5rem);
    // 高度不超过宽度，保持横向长方形
    max-height: calc(100vw - 3.5rem);
    overflow-y: auto;
  }
}

.timeline__node--milestone .timeline__content {
  border-left-color: rgba(255, 255, 15, 0.45);
}

// milestone 卡片底部黄色压线（z-index:1 保证在纹理层之上）
.timeline__node--milestone .timeline__content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, var(--accent-yellow), transparent 70%);
  opacity: 0.55;
  z-index: 2;
  pointer-events: none;
}

.timeline__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.timeline__date {
  font-size: 1.1rem;
  color: var(--text-dim);
  letter-spacing: 0.06em;
}

.timeline__type {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.87rem;
  letter-spacing: 0.18em;
  color: var(--accent-steel);
  text-transform: uppercase;
}

.timeline__title {
  font-family: 'HarmonyOS SC', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #0E0E0E;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) { font-size: 1.1rem; }
}

.timeline__desc {
  font-family: 'HarmonyOS SC', sans-serif;
  font-size: 1.25rem;
  // 提升正文对比度
  color: #505060;
  line-height: 1.65;
  margin-bottom: 1.2rem;
  // 左侧 3px 终末黄引导线
  padding-left: 1.1rem;
  border-left: 3px solid rgba(255, 255, 15, 0.45);

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
}

.timeline__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.timeline__tech {
  font-family: 'Gilroy', sans-serif;
  font-weight: 700;
  font-size: 0.93rem;
  letter-spacing: 0.1em;
  padding: 0.18rem 0.75rem;
  border-radius: 1px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: var(--text-dim);
  text-transform: uppercase;
}
</style>
