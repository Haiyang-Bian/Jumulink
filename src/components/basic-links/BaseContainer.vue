<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  }
})

const show = ref(false)
</script>

<template>
  <div @dblclick="show = true" :style="{
    width: `${props.width}px`,
    height: `${props.height}px`,
  }" class="base-container">
    <slot name="component-logo"></slot>
  </div>
<!--  <div>{{ props.id }}</div>-->

  <el-drawer
    v-model="show"
    title="I am the title"
    :with-header="false"
    direction="rtl"
    :append-to-body="true"
  >
    <slot name="component-set"></slot>
  </el-drawer>
</template>

<style scoped>
.base-container {
  display: flex;
  flex-direction: column;
  border-width: 2px;
  border-style: solid;
  border-color: #000000;
  font-size: 40px;
  background: #fdfefe;
  justify-content: space-between;
}

.base-container:hover {
  padding: 3px;
  border-color: var(--el-border-color-hover);
  border-style: dashed;
}
</style>