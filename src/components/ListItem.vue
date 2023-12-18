<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

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
  <div class="item">
    <span ref="status" :style="fontsize" class="status">WAITING</span>
    <span ref="id" :style="fontsize" class="id">27381</span>
    <span ref="numberplate" :style="fontsize" class="numberplate">1AB 3456</span>
    <span ref="location" :style="fontsize" class="location">Gate 3</span>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'ArchivoBlack-Regular';
  src: url(../assets/ArchivoBlack-Regular.ttf);
}
 .item {
    background-color: red;
    width: 100%;
    height: 10rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .item > span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-family: 'ArchivoBlack-Regular';
  }

  .id {
    background-color: yellow;
  }

  .numberplate {
    background-color: green;
  }

  .location {
    background-color: purple;
  }

  .status {
    background-color: orange;
  }
</style>
