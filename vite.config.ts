import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import { fileURLToPath, URL } from 'node:url'
import purgecss from '@fullhuman/postcss-purgecss'

export default defineConfig({
  base: '/',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: ['./index.html', './src/**/*.{vue,ts,js,md}'],
          safelist: {
            // 保留 Bootstrap 功能性类名（见 CLAUDE.md）
            standard: [
              'navbar-dark', 'navbar-expand-md', 'navbar-brand', 'nav-link', 'navbar-toggler',
              'btn',
              /^row/, /^col-/, /^g-/, /^gx-/,
              'collapse', 'navbar-collapse',
            ],
          },
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'gsap': ['gsap'],
          'vue-core': ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
})
