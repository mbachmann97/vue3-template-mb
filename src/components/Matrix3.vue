<script setup lang="ts">
import { computed, defineProps, toRefs, type PropType } from 'vue'
import type { MatrixPosition, MatrixOptions } from '@/types/Matrix'

const props = defineProps({
  activeMatrixPosition: {
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
    type: Array as PropType<string[]>,
    default: () => ['left label 1', 'left label 2', 'left label 9', 'bottom label 1', 'bottom label 2', 'bottom label 3']
  },
  simpleLabels: {
    type: Array as PropType<string[]>,
    default: () => ['Category 1', 'Category 2']
  },
  useSimpleLabels: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:activeMatrixPosition'])

const { size, color, labelSize } = props.options

const cellHeight = computed(() => {
  return Number(size.split(' ')[0]) / 3 + size.split(' ')[1]
})

const labelMarginLeft = computed(() => {
  return props.useSimpleLabels ? 0 : 1.5 + 'rem'
})

const cellClicked = (position: MatrixPosition) => {
  if (props.readonly) return
  emit('update:activeMatrixPosition', position)
}

const hoverShadow = computed(() => {
  return Number(size.split(' ')[0]) / 12 + size.split(' ')[1]
})
</script>

<template>
<div class="matrix-container">
  <div class="matrix">
    <span v-if="useSimpleLabels" class="simple-label-left">
      {{ simpleLabels[1] }}
    </span>
    <div>
      <div class="matrix-row">
        <span v-if="!useSimpleLabels" class="left-label">{{ labels[0] }}</span>
        <div :class="{'matrix-cell': true, cell: true, 'active-cell': activeMatrixPosition === '20', pointer: !readonly}" @click="cellClicked('20')">
        </div>
        <div :class="{'matrix-cell': true, cell: true, 'active-cell': activeMatrixPosition === '21', pointer: !readonly}" @click="cellClicked('21')">
        </div>
        <div :class="{'matrix-cell-right': true, cell: true, 'active-cell': activeMatrixPosition === '22', pointer: !readonly}" @click="cellClicked('22')">
        </div>
      </div>
      <div class="matrix-row">
        <span v-if="!useSimpleLabels" class="left-label">{{ labels[1] }}</span>
        <div :class="{'matrix-cell': true, cell: true, 'active-cell': activeMatrixPosition === '10', pointer: !readonly}" @click="cellClicked('10')">
        </div>
        <div :class="{'matrix-cell': true, cell: true, 'active-cell': activeMatrixPosition === '11', pointer: !readonly}" @click="cellClicked('11')">
        </div>
        <div :class="{'matrix-cell-right': true, cell: true, 'active-cell': activeMatrixPosition === '12', pointer: !readonly}" @click="cellClicked('12')">
        </div>
      </div>
      <div class="matrix-row">
        <span v-if="!useSimpleLabels" class="left-label">{{ labels[2] }}</span>
        <div :class="{'matrix-cell-bottom': true, cell: true, 'active-cell': activeMatrixPosition === '00', pointer: !readonly}" @click="cellClicked('00')">
        </div>
        <div :class="{'matrix-cell-bottom': true, cell: true, 'active-cell': activeMatrixPosition === '01', pointer: !readonly}" @click="cellClicked('01')">
        </div>
        <div :class="{'matrix-cell-last': true, cell: true, 'active-cell': activeMatrixPosition === '02', pointer: !readonly}" @click="cellClicked('02')">
        </div>
      </div>
      <div v-if="!useSimpleLabels" class="bottom-labels-container">
        <span class="bottom-label">{{ labels[3] }}</span>
        <span class="bottom-label">{{ labels[4] }}</span>
        <span class="bottom-label">{{ labels[5] }}</span>
      </div>
      <span v-else class="simple-label-bottom">
        {{ simpleLabels[0] }}
      </span>
    </div>
  </div>
</div>
</template>

<style scoped>
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
</style>
