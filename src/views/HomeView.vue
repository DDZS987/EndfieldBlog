<template>
  <main class="home">
    <SceneBackground />
    <HeroSection />
    <StackPreview />
    <ProjectCarousel />
  </main>
</template>

<script setup lang="ts">
import SceneBackground from '@/components/common/SceneBackground.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import StackPreview from '@/components/home/StackPreview.vue'
import ProjectCarousel from '@/components/home/ProjectCarousel.vue'
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  background: var(--bg-void);
}
</style>
