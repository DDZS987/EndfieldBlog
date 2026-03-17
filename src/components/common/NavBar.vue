<template>
  <!-- 顶栏本体 -->
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <RouterLink class="navbar__logo" to="/" @click="close">
      <span class="navbar__bracket">[</span>Portfolio<span class="navbar__bracket">]</span>
    </RouterLink>

    <nav class="navbar__links" aria-label="主导航">
      <RouterLink
        v-for="item in nav"
        :key="item.path"
        :to="item.path"
        class="navbar__link"
        :class="{ 'navbar__link--active': active === item.key }"
      >
        <small>{{ item.no }}</small>{{ item.label }}
      </RouterLink>
    </nav>

    <button
      class="navbar__burger"
      :class="{ 'navbar__burger--open': open }"
      @click="toggle"
      aria-label="导航菜单"
      :aria-expanded="open"
    >
      <span /><span /><span />
    </button>
  </header>

  <!-- 移动端抽屉 -->
  <Transition name="drawer">
    <div v-if="open" class="drawer" @click.self="close">
      <nav class="drawer__nav">
        <RouterLink
          v-for="(item, idx) in nav"
          :key="item.path"
          :to="item.path"
          class="drawer__link"
          :style="{ '--i': idx }"
          @click="close"
        >
          <small>{{ item.no }}</small>{{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route   = useRoute()
const scrolled = ref(false)
const open    = ref(false)
const active  = ref('home')

const nav = [
  { path: '/',          no: '01', label: 'Home',     key: 'home'     },
  { path: '/#stack',    no: '02', label: 'Stack',    key: 'stack'    },
  { path: '/#projects', no: '03', label: 'Projects', key: 'projects' },
  { path: '/blog',      no: '04', label: 'Blog',     key: 'blog'     },
]

function toggle() { open.value = !open.value }
function close()  { open.value = false }

function syncActive() {
  if (route.path !== '/') {
    active.value = route.path.replace('/', '') || 'home'
    return
  }
  const sections = [
    { id: 'projects', key: 'projects' },
    { id: 'stack',    key: 'stack'    },
    { id: 'hero',     key: 'home'     },
  ]
  for (const { id, key } of sections) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top <= 80) {
      active.value = key
      return
    }
  }
  active.value = 'home'
}

function onScroll() {
  scrolled.value = window.scrollY > 40
  syncActive()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(open, v => {
  document.body.style.overflow = v ? 'hidden' : ''
})

watch(() => route.path, () => {
  close()
  syncActive()
})

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style lang="scss">
/* ─── 顶栏 ─────────────────────────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9000;
  height: var(--nav-height, 64px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &--scrolled {
    background-color: rgba(2, 5, 8, 0.6);
    border-bottom-color: rgba(255, 255, 255, 0.07);
  }

  @media (max-width: 640px) {
    padding: 0 1.25rem;
  }
}

/* Logo */
.navbar__logo {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: var(--accent-cyan); }
}

.navbar__bracket {
  color: var(--accent-cyan);
}

/* 桌面导航链接 */
.navbar__links {
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) { display: none; }
}

.navbar__link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s;

  small {
    font-size: 0.7rem;
    color: var(--accent-cyan);
    opacity: 0.55;
  }

  &:hover,
  &--active { color: var(--accent-cyan); }
}

/* 汉堡按钮 */
.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) { display: flex; }

  span {
    display: block;
    height: 1.5px;
    background: var(--text-primary);
    border-radius: 1px;
    transition: transform 0.28s ease, opacity 0.2s, width 0.28s ease;
    transform-origin: center;

    &:nth-child(1) { width: 100%; }
    &:nth-child(2) { width: 68%; }
    &:nth-child(3) { width: 100%; }
  }

  &--open span {
    &:nth-child(1) { transform: translateY(6.5px) rotate(45deg); width: 100%; }
    &:nth-child(2) { opacity: 0; }
    &:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
  }
}

/* ─── 移动端抽屉 ────────────────────────────────────────────────────────────── */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8999;
  background: rgba(2, 5, 8, 0.97);
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.drawer__link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 2.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  text-decoration: none;
  opacity: 0;
  animation: drawerItemIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i) * 55ms + 80ms) forwards;
  transition: color 0.2s;

  small {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: var(--accent-cyan);
    opacity: 0.45;
    font-weight: 400;
  }

  &:hover { color: var(--accent-cyan); }
}

@keyframes drawerItemIn {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 抽屉过渡 */
.drawer-enter-active,
.drawer-leave-active { transition: opacity 0.25s ease; }
.drawer-enter-from,
.drawer-leave-to     { opacity: 0; }
</style>
