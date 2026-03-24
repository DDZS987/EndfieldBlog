import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.scss'

// 必须在 app.mount() 之前、尽可能早地禁用浏览器滚动恢复。
// 若写在组件 onMounted 里，浏览器的滚动恢复早已完成调度，设置无效。
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

// 加滚动锁：在字体加载 + GSAP refresh 完成之前，html 保持 overflow:hidden。
// 这样 GSAP 内部的测量 scrollTo（GSAP 会临时滚到 pin 起点再恢复）
// 全部变成空操作，浏览器不会绘制任何中间帧，从根本上消除 1 秒闪现。
// 锁由 HomeView.onMounted 在 fonts.ready + refresh 完成后解除。
document.documentElement.classList.add('gsap-init-lock')

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
