<template>
  <NavBar />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import NavBar from '@/components/common/NavBar.vue'
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s var(--ease-out-expo),
              transform 0.35s var(--ease-out-expo);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
