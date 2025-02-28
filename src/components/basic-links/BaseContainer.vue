<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
    borderWidth: {
      type: Number,
      default: 2,
    },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
    setType: {
      type: String,
      default: 'drawer',
    },
})

const show = reactive({
    showDialog: false,
    showDrawer: false
})

const setShow = () => {
  switch (props.setType) {
      case 'dialog':
          show.showDialog = true
          break
      case 'drawer':
          show.showDrawer = true
          break
  }
}

</script>

<template>
  <div @dblclick="setShow" :style="{
    width: `${props.width}px`,
    height: `${props.height}px`,
    'border-width': `${props.borderWidth}px`,
  }" class="base-container">
    <slot name="component-logo"></slot>
  </div>
<!--  <div>{{ props.id }}</div>-->
  <el-drawer
    v-model="show.showDrawer"
    title="I am the title"
    :with-header="false"
    direction="rtl"
    :append-to-body="true"
  >
    <slot name="component-set"></slot>
  </el-drawer>
    <el-dialog
        v-model="show.showDialog"
        title="Tips"
        width="500"
        :append-to-body="true"
    >
        <slot name="component-show"></slot>
    </el-dialog>

</template>

<style scoped lang="scss">
.base-container {
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: #000000;
  font-size: 40px;
  background: #fdfefe;
  justify-content: space-between;

    &:hover {
      padding: 3px;
      border-color: var(--el-border-color-hover);
      border-style: dashed;
    }
}
</style>