<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ListItem from '@/components/ListItem.vue';

onMounted(() => {
  window.addEventListener('resize', updateFontsize);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateFontsize);
})

const id = ref()
const numberplate = ref()
const location = ref()
const status = ref()

const updateFontsize = () => {
  if (numberplate.value) {
    const fontSize = numberplate.value.offsetWidth * 0.1;
    id.value.style.fontSize = `${fontSize}px`;
    numberplate.value.style.fontSize = `${fontSize}px`;
    location.value.style.fontSize = `${fontSize}px`;
    status.value.style.fontSize = `${fontSize}px`;
  }
  return {};
}
const fontsize = computed(() => {
  return updateFontsize()
});
</script>

<template>
  <main class="item-container">
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
    <list-item />
  </main>
</template>

<style scoped>
  .item-container {
    width: 100vw;
    height: 100vh;
    background-color: blue;
    overflow: hidden;
  }
</style>
