<template>
  <!-- 顶部封边装饰（border_top.jpg 极细科技线） -->
  <div class="nav-topline" aria-hidden="true" />

  <!-- HUD 状态栏本体 -->
  <header class="navbar navbar-dark navbar-expand-md" :class="{ 'navbar--scrolled': scrolled }">
    <!-- Logo 区：SYSTEM.ROOT // -->
    <RouterLink class="navbar__logo navbar-brand" to="/" @click="close">
      <span class="navbar__logo-main">SYSTEM<span class="navbar__logo-sep">.ROOT</span></span>
      <span class="navbar__logo-slash">&nbsp;//</span>
      <span class="navbar__logo-status">
        <span class="navbar__status-dot" />
        <span class="navbar__status-text">在线</span>
      </span>
    </RouterLink>

    <!-- 桌面导航 -->
    <nav class="navbar__links" aria-label="主导航">
      <RouterLink
        v-for="item in nav"
        :key="item.path"
        :to="item.path"
        class="navbar__link nav-link"
        :class="{ 'navbar__link--active active': active === item.key }"
      >
        <small class="navbar__link-no akrobat">{{ item.no }}</small>
        <span class="navbar__link-text">{{ item.label }}</span>
        <span class="navbar__link-bar" aria-hidden="true" />
      </RouterLink>
    </nav>

    <!-- 汉堡按钮 -->
    <button
      class="navbar__burger navbar-toggler border-0"
      :class="{ 'navbar__burger--open': open }"
      @click="toggle"
      aria-label="导航菜单"
      :aria-expanded="open"
    >
      <span class="burger-bar" /><span class="burger-bar burger-bar--mid" /><span class="burger-bar" />
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
          <small class="drawer__link-no">{{ item.no }}</small>{{ item.label }}
        </RouterLink>
      </nav>
      <div class="drawer__footer">SYSTEM.ROOT // DEEP SPACE TERMINAL</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route    = useRoute()
const scrolled = ref(false)
const open     = ref(false)
const active   = ref('home')

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

watch(open, v => { document.body.style.overflow = v ? 'hidden' : '' })
watch(() => route.path, () => { close(); syncActive() })

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
/* ─── 顶部极细封边（border_top.jpg） ─────────────────────────────────────── */
.nav-topline {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 9001;
  background-image: url('/assets/endfield/imgs/border_top.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.55;
  pointer-events: none;

  @media (max-width: 768px) {
    position: relative;
    top: auto;
  }
}

/* ─── HUD 状态栏本体 ─────────────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 2px; // 让出顶部封边
  left: 0;
  right: 0;
  z-index: 9000;
  height: var(--nav-height, 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;

  &--scrolled {
    background-color: rgba(240, 237, 232, 0.82);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
  }

  @media (max-width: 640px) { padding: 0 1.25rem; }
}

/* ─── Logo 区 ──────────────────────────────────────────────────────────────── */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: opacity 0.2s;

  &:hover { opacity: 0.8; }
}

.navbar__logo-main {
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  color: var(--text-primary);
}

.navbar__logo-sep {
  color: var(--text-secondary);
  font-weight: 700;
}

.navbar__logo-slash {
  font-family: 'Gilroy', sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--accent-steel);
  letter-spacing: 0;
}

.navbar__logo-status {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: 0.6rem;
  padding-left: 0.6rem;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}

.navbar__status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-yellow);
  box-shadow: 0 0 6px var(--accent-yellow);
  animation: yellowBreath 2.4s ease-in-out infinite;
  flex-shrink: 0;
}

.navbar__status-text {
  font-family: 'HarmonyOS SC', sans-serif;
  font-weight: 400;
  font-size: 0.68rem;
  color: var(--text-secondary);
  letter-spacing: 0.08em;
}

/* ─── 桌面导航链接 ──────────────────────────────────────────────────────────── */
.navbar__links {
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) { display: none; }
}

.navbar__link {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  position: relative;
  padding-bottom: 4px;

  .navbar__link-no {
    font-size: 0.62rem;
    color: #808080;
    line-height: 1;
  }

  .navbar__link-text {
    font-family: 'Gilroy', sans-serif;
    font-weight: 700;
    font-size: 0.88rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    line-height: 1;
    transition: color 0.2s;
  }

  // 激活黄线指示器（文本宽度一半，居左）
  .navbar__link-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50%;
    height: 2px;
    background: var(--accent-yellow);
    box-shadow: 0 0 6px rgba(255, 255, 15, 0.4);
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left center;
    transition: opacity 0.25s, transform 0.25s var(--ease-out-expo);
  }

  &:hover .navbar__link-text {
    color: var(--text-primary);
  }

  &--active .navbar__link-text {
    color: var(--text-primary);
  }

  &--active .navbar__link-bar {
    opacity: 1;
    transform: scaleX(1);
  }

  &--active .navbar__link-no {
    color: rgba(255, 255, 15, 0.7);
  }
}

/* ─── 汉堡按钮 ─────────────────────────────────────────────────────────────── */
.navbar__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 44px;
  height: 38px;
  padding: 0 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1.5px solid rgba(0, 0, 0, 0.20) !important;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  @media (max-width: 768px) { display: flex; }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.38) !important;
  }

  &:active { background: rgba(0, 0, 0, 0.12); }
}

// 滚动后浅色背景 → 翻转为深色
.navbar--scrolled .navbar__burger {
  background: rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.25) !important;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    border-color: rgba(0, 0, 0, 0.45) !important;
  }

  .burger-bar { background: #1a1a1a !important; }
  .burger-bar--mid { background: var(--accent-yellow) !important; box-shadow: 0 0 4px rgba(255, 255, 15, 0.5) !important; }
}

.burger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 0;
  transition: transform 0.28s var(--ease-out-expo), opacity 0.2s, background 0.2s;
  transform-origin: center;

  // 中间线用终端黄，形成视觉层次
  &--mid {
    width: 14px;
    align-self: flex-start;
    margin-left: 0;
    background: var(--accent-yellow);
    box-shadow: 0 0 5px rgba(255, 255, 15, 0.6);
  }
}

.navbar__burger--open {
  background: rgba(0, 0, 0, 0.08);
  border-color: rgba(0, 0, 0, 0.32) !important;

  .burger-bar:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .burger-bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .burger-bar:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
}

/* ─── 移动端抽屉 ───────────────────────────────────────────────────────────── */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8999;
  background: rgba(240, 237, 232, 0.97);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
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
  font-family: 'Gilroy', sans-serif;
  font-weight: 900;
  font-size: 1.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  text-decoration: none;
  opacity: 0;
  animation: drawerItemIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i) * 55ms + 80ms) forwards;
  transition: color 0.2s;

  &:hover { color: var(--accent-yellow); }
}

.drawer__link-no {
  font-family: 'Akrobat', sans-serif;
  font-size: 0.85rem;
  color: var(--accent-steel);
  opacity: 0.5;
  font-weight: 400;
}

.drawer__footer {
  position: absolute;
  bottom: 2rem;
  font-family: 'Gilroy', sans-serif;
  font-weight: 500;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: var(--text-dim);
  text-transform: uppercase;
}

@keyframes drawerItemIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 抽屉过渡 */
.drawer-enter-active,
.drawer-leave-active { transition: opacity 0.22s ease; }
.drawer-enter-from,
.drawer-leave-to     { opacity: 0; }
</style>