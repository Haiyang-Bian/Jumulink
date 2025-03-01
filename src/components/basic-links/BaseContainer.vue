<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	borderWidth: {
		type: String,
		default: '2px',
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
	<div class="container-border" :style="{
		width: `${props.width + 6}px`,
		height: `${props.height + 6}px`,
	}">
		<div @dblclick="setShow" :style="{
			width: `${props.width}px`,
			height: `${props.height}px`,
			'border-width': borderWidth,
		}" class="base-container">
			<slot name="component-logo"></slot>
		</div>
	</div>
	<!--  <div>{{ props.id }}</div>-->
	<el-drawer v-model="show.showDrawer" title="I am the title" :with-header="false" direction="rtl"
		:append-to-body="true">
		<slot name="component-set"></slot>
	</el-drawer>
	<el-dialog v-model="show.showDialog" title="Tips" width="500" :append-to-body="true">
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
}

.container-border {
	display: flex;
	/* 使用 Flexbox 布局 */
	justify-content: center;
	/* 水平居中 */
	align-items: center;
	/* 垂直居中 */
	border-style: solid;
	border-color: #00000000;
	border-width: 2px;
	padding: 2px;

	&:hover {
		border-color: var(--el-border-color-hover);
		border-style: dashed;
	}
}
</style>