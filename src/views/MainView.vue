<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { ElMessage, ElNotification } from 'element-plus'
import { random as _random } from 'lodash'
import Matrix3 from '@/components/Matrix3.vue'
import Matrix from '@/components/Matrix.vue'
import TheHeader from '@/components/TheHeader.vue'
import type { MatrixOptions, MatrixPosition } from '@/types/Matrix'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const time = ref(new Date())

const testMessage = () => {
  ElMessage.success('This is a test message')
}
const testNotification = () => {
  ElNotification({
    title: 'This is a test notification',
    message: 'This is a test notification',
    type: 'success'
  })
}

const matrixOptions: MatrixOptions = {
  size: '25 rem',
  color: '#F1E5AC',
  labelSize: '0.8rem',
}

const matrixPosition = ref<MatrixPosition>('11')

const handleMatrixEvent = (position: MatrixPosition) => {
  console.log(position)
  matrixPosition.value = position
}
</script>

<template>
  <main>
    <the-header />
    <el-button @click="testMessage" type="danger">Test</el-button>
    <el-button @click="testNotification" type="success">Test 2</el-button>
    <el-button type="primary">Test 2</el-button>
    <el-time-picker v-model="time"></el-time-picker>
    <span class="text-2xl text-red-600">{{ time }}</span>
    <el-link class="dark-toggle" size="large" :underline="false" @click="toggleDark()">
      <el-icon><sunny v-if="isDark" /><moon-night v-else /></el-icon>
    </el-link>
    random number from lodash: {{ _random(0, 5) }}
    <Matrix3 class="mt-5" :active-matrix-position="matrixPosition" :options="matrixOptions" use-all-labels @update:activeMatrixPosition="handleMatrixEvent" />
    <Matrix :labels="{
      individual: ['left label 1', 'left label 2', 'left label 9', 'bottom label 1', 'bottom label 2', 'bottom label 3'],
      axis: ['left axis label', 'bottom axis label']
    }" :active-position="matrixPosition" :options="matrixOptions" />
  </main>
</template>

<style scoped>
.dark-toggle {
  font-size: 1.2rem;
}
</style>
