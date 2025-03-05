<script setup lang="ts">
import { computed, reactive, type ComputedRef, type CSSProperties } from 'vue'

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
	autoHeight: {
		type: Boolean,
		default: false,
	}
})

const emit = defineEmits(['setArgs', 'expand'])

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

const containerStyle: ComputedRef<CSSProperties> = computed(() => {
	let x: CSSProperties = {
		borderWidth: props.borderWidth,
		width: `${props.width}px`,
	}
	if (!props.autoHeight) {
		x['height'] = `${props.height}px`
	} else {
		x['paddingTop'] = '10px'
		x['paddingBottom'] = '10px'
	}
	return x
})

const containerBorderStyle: ComputedRef<CSSProperties> = computed(() => {
	let x: CSSProperties = {
		width: `${props.width + 6}px`,
	}
	if (!props.autoHeight) {
		x['height'] = `${props.height + 6}px`
	}
	return x
})
</script>

<template>
	<div class="container-border" :style="containerBorderStyle">
		<div @dblclick="setShow" :style="containerStyle" class="base-container">
			<slot name="component-logo"></slot>
		</div>
		<div class="container-id">{{ props.id }}</div>
	</div>
	<el-drawer v-model="show.showDrawer" title="I am the title" :with-header="false" direction="rtl"
		:append-to-body="true" @closed="() => emit('setArgs')">
		<div class="drawer-content">
			<slot name="component-set"></slot>
		</div>
	</el-drawer>
	<el-dialog v-model="show.showDialog" title="Tips" :fullscreen="true" :append-to-body="true"
		@opened="() => emit('expand')">
		<div class="dialog-content">
			<slot name="component-show"></slot>
		</div>
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
	justify-content: center;
}

.container-border {
	display: flex;
	justify-content: center;
	align-items: center;
	border-style: solid;
	border-color: #00000000;
	border-width: 2px;
	padding: 2px;
	margin-bottom: 5px;

	&:hover {
		border-color: var(--el-border-color-hover);
		border-style: dashed;
	}

	.container-id {
		position: absolute;
		font-size: 12px;
		bottom: -15px;
	}
}

.drawer-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: left;
	gap: 10px;
}

.dialog-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
}
</style>