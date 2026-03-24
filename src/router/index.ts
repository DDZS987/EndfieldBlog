import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/stack',
      name: 'stack',
      component: () => import('@/views/StackView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/BlogView.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: () => import('@/views/BlogPostView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // 用 instant 而非 smooth：smooth 会产生一个持续约 1 秒的平滑动画，
    // 若该动画与 GSAP 初始化的 gsap-init-lock 期重叠，解锁后滚动位置不确定。
    return { top: 0, behavior: 'instant' }
  },
})

export default router
