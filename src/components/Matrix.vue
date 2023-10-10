<script setup lang="ts">
import { computed, defineProps, onMounted, type ComputedRef, type PropType, ref, type Ref } from 'vue'
import type { MatrixPosition, MatrixOptions, MatrixLabelPropType } from '@/types/Matrix'
import { omit } from 'lodash'

const props = defineProps({
  activePosition: {
    type: String as PropType<MatrixPosition>,
    required: true
  },
  options: {
    type: Object as PropType<MatrixOptions>,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  labels: {
    type: Object as PropType<MatrixLabelPropType>,
    required: true
  },
  size: {
    type: Number,
    default: 20
  },
})

const emit = defineEmits(['update:activePosition'])

const showIndividualLabels = computed(() => !!props.labels.individual)
const showAxisLabels = computed(() => !!props.labels.axis)
const correctedIndividualLabels: ComputedRef<string[]> = computed(() => {
  if (!props.labels.individual) return []
  return props.labels.individual.length % 2 === 0 ? props.labels.individual : props.labels.individual.slice(0, -1)
})
const numFields = computed(() => (correctedIndividualLabels.value.length / 2) ** 2)
const dims = computed(() => Math.sqrt(numFields.value))
const cellSize = computed(() => `${props.size/dims.value}rem`)

onMounted(() => {
  generateFields()
})

const fields: Ref<any[]> = ref([])

const generateFields = () => {
  for (let i = 0; i < dims.value; i++) {
    for (let j = 0; j < dims.value; j++) {
      fields.value.push({
        uid: getUID(),
        x: i,
        y: j,
        position: `${i}${j}`
      })
    }
  }
}
const getUID: () => string = () => {
  do {
    const uid = generateUID()
    if (!fields.value.find(field => field.uid === uid)) return uid
  } while (true)
}
const generateUID: () => string = () => {
  let firstPart: number | string = (Math.random() * 46656) | 0;
  let secondPart: number | string = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}
const printFields = () => {
  console.log(fields.value)
}
</script>

<template>
<div class="matrix-container">
  <div class="matrix">
    <div class="upper-matrix">
      <div class="label-wrap-axis-y axis-label"></div>
      <div class="label-wrap-axis-y"></div>
      <div class="matrix-content">
        <div v-for="(field, index) in fields" :key="index" class="field">
        </div>
      </div>
    </div>
    <div :class="{'lower-matrix': true, 'lower-matrix-axis-label-offset': showAxisLabels}">
      <div class="label-wrap-axis-x"></div>
      <div class="label-wrap-axis-x axis-label"></div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .matrix {
    position: relative;
  }

  .upper-matrix {
    display: flex;
  }

  .lower-matrix {
    width: v-bind(size + "rem");
    display: flex;
    flex-direction: column;
    margin-left: 1.5rem;
  }

  .lower-matrix-axis-label-offset {
    margin-left: 3rem;
  }

  .label-wrap-axis-y, .label-wrap-axis-x {
    background-color: skyblue;
  }

  .label-wrap-axis-y {
    height: v-bind(size + "rem");
    width: 1.5rem;
  }

  .label-wrap-axis-x {
    height: 1.5rem;
    width: 100%;
  }

  .axis-label {
    background-color: lavender;
  }

  .matrix-content {
    height: v-bind(size + "rem");
    width: v-bind(size + "rem");
    display: flex;
    flex-wrap: wrap;
  }

  .field {
    height: v-bind(cellSize);
    width: v-bind(cellSize);
    outline: 1px solid lightgreen;
    outline-offset: -1px;
    background-color: transparent;
    transition: all 250ms ease;
  }

  .field:hover {
    cursor: pointer;
    box-shadow: inset 0px 0px v-bind(size / (dims * 5) + "rem") 5px lightgreen;
  }
</style>

<!-- <style scoped>
.matrix-container {
  display: flex;
  flex-direction: row;
  height: v-bind(size);
  width: v-bind(size);
  }

.matrix-row {
  display: flex;
  flex-direction: row;
  height: v-bind(cellHeight);
  width: v-bind(size);
}
.matrix-cell, .matrix-cell-right, .matrix-cell-bottom, .matrix-cell-last {
  height: v-bind(cellHeight);
  width: v-bind(cellHeight);
  border-top: 1px solid v-bind(color);
  border-left: 1px solid v-bind(color);
  background-color: transparent;
  transition: all 250ms ease;
}
.matrix-cell-right, .matrix-cell-last {
  border-right: 1px solid v-bind(color);
}

.matrix-cell-bottom, .matrix-cell-last {
  border-bottom: 1px solid v-bind(color);
}

.cell:hover {
  box-shadow: inset 0px 0px v-bind(hoverShadow) 5px v-bind(color);
}

.active-cell {
  --c1: color-mix(in srgb, #ffffff 0%, v-bind(color) 100%);
  --c2: color-mix(in srgb, #ffffff 25%, v-bind(color) 75%);
  --c3: color-mix(in srgb, #ffffff 50%, v-bind(color) 50%);
  --c4: color-mix(in srgb, #ffffff 75%, v-bind(color) 25%);
  --c5: color-mix(in srgb, #ffffff 25%, v-bind(color) 75%);
  --c6: color-mix(in srgb, #ffffff 0%, v-bind(color) 100%);
  --c7: color-mix(in srgb, #000000 50%, v-bind(color) 50%);

  background: linear-gradient(-45deg, var(--c1), var(--c2), var(--c3), var(--c4), var(--c5), var(--c6), var(--c7));
  background-size: 300% 300%;
  animation: gradient 10s ease infinite;
}

.left-label, .simple-label-left {
  font-size: v-bind(labelSize);
  display: flex;
  height: v-bind(cellHeight);
  width: 1.5rem;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  justify-content: center;
}

.bottom-labels-container {
  display: flex;
  margin-left: v-bind(labelMarginLeft);
  width: v-bind(size);
}

.bottom-label {
  display: flex;
  justify-content: center;
  height: 1.5rem;
  width: v-bind(cellHeight);
  font-size: v-bind(labelSize);
}

.simple-label-bottom {
  display: flex;
  justify-content: center;
  height: 1.5rem;
  width: v-bind(size);
  font-size: v-bind(labelSize);
  margin-left: v-bind(labelMarginLeft);
}

.simple-label-left {
  height: v-bind(size);
  margin-bottom: 1.5rem;
}

.matrix {
  display: flex;
}

.pointer {
  cursor: pointer;
}

.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}

.ripple:active:after {
  transform: scale(0, 0);
  opacity: .3;
  transition: 0s;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style> -->
