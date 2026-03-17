<template>
  <section class="hero" id="hero">
    <div class="hero__content">
      <!-- 顶部装饰标签 -->
      <div class="hero__tag mono" ref="tagRef">
        <span class="hero__tag-dot" /> ONLINE
      </div>

      <!-- 主标题：打字机效果 -->
      <h1 class="hero__title" ref="titleRef">
        <span class="hero__name">{{ displayName }}<span class="hero__cursor"
            :class="{ blink: isTypingDone }">_</span></span>
      </h1>

      <!-- 职业标签 -->
      <div class="hero__roles" ref="rolesRef">
        <span v-for="(role, i) in roles" :key="role" class="hero__role"
          :style="{ animationDelay: `${i * 0.15 + 1.2}s` }">{{ role }}</span>
      </div>

      <!-- 一言格言 -->
      <HitokotoWidget class="hero__quote-widget" />


    </div>

    <!-- 底部滚动提示 -->
    <div class="hero__scroll-hint">
      <div class="hero__scroll-row">
        <span class="hero__scroll-arrow">↓</span>
        <span class="mono">向下滚动</span>
        <span class="hero__scroll-arrow">↓</span>
      </div>
      <div class="hero__scroll-line" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import HitokotoWidget from '@/components/widgets/HitokotoWidget.vue'

const NAMES = ['苑宇廷', 'DD斩首', '枫叶UL']
const roles = ['Python 开发者', 'AI Agent 构建者', '开源贡献者', '全栈工程师 (Becoming)']

const displayName = ref('')
const isTypingDone = ref(false)

const tagRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const rolesRef = ref<HTMLElement | null>(null)

let loopTimer: ReturnType<typeof setTimeout>

// 循环打字机：逐字打出 → 停顿 → 逐字删除 → 下一个
function cycleNames(nameIndex = 0) {
  const name = NAMES[nameIndex]
  let i = 0
  isTypingDone.value = false

  // 打字阶段
  function typeChar() {
    if (i < name.length) {
      displayName.value += name[i++]
      loopTimer = setTimeout(typeChar, 110)
    } else {
      // 打完后停顿 1.8s 再开始删除
      isTypingDone.value = true
      loopTimer = setTimeout(deleteChar, 1800)
    }
  }

  // 删除阶段
  function deleteChar() {
    if (displayName.value.length > 0) {
      displayName.value = displayName.value.slice(0, -1)
      loopTimer = setTimeout(deleteChar, 70)
    } else {
      // 删完后短暂停顿，切换到下一个名字
      loopTimer = setTimeout(() => cycleNames((nameIndex + 1) % NAMES.length), 300)
    }
  }

  typeChar()
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(tagRef.value, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 })
    .fromTo(titleRef.value, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.2')
    .add(() => cycleNames())
    .fromTo(rolesRef.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '+=0.8')
    .fromTo('.hero__quote-widget', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
})

onUnmounted(() => clearTimeout(loopTimer))
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  text-align: center;
  z-index: 1;

  @media (max-width: 640px) {
    padding: 0 1.25rem;
    min-height: 100svh;
  }
}

.hero__content {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 640px) {
    gap: 1.1rem;
  }
}

.hero__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--accent-cyan);
  border: var(--border-glow);
  padding: 0.3rem 0.8rem;
  border-radius: 2px;
  opacity: 0;
}

.hero__tag-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 8px var(--accent-cyan);
  animation: glowPulse 2s ease-in-out infinite;
}

.hero__title {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  opacity: 0;
  display: block;
  text-align: center;
}

// 名字本身是居中基准，光标绝对挂在它右侧
// 名字为空时宽度=0，居中后光标自然落在页面正中
.hero__name {
  display: inline-block;
  position: relative;
  color: var(--accent-cyan);
  text-shadow: var(--glow-cyan);
  // 防止内容为空时高度塌缩，保持光标可见
  min-height: 1.2em;
  vertical-align: top;
}

.hero__cursor {
  position: absolute;
  left: 100%;
  top: 0;
  color: var(--accent-cyan);

  &.blink {
    animation: cursorBlink 1s step-end infinite;
  }
}

.hero__roles {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
}

.hero__role {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: var(--text-secondary);
  border: var(--border-subtle);
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
  background: var(--bg-card);
  animation: fadeInUp 0.5s var(--ease-out-expo) both;
}

.hero__quote-widget {
  width: 100%;
  max-width: 560px;
  text-align: left;
}

.hero__scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent-cyan);
  text-shadow: var(--glow-cyan);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  animation: float 2s ease-in-out infinite;

  @media (max-width: 640px) {
    bottom: 1.25rem;
  }
}

.hero__scroll-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hero__scroll-arrow {
  font-size: 0.85rem;
}

.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--accent-cyan), transparent);
}
</style>
