<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { onMounted, ref } from 'vue';
import BaseContainer from '@/components/basic-links/BaseContainer.vue'
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import type { IComponentInfo } from '@/utils/jumulink-types';
import { ElInputNumber } from 'element-plus';

defineOptions({
	inheritAttrs: false
});

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const msg = ref<IComponentInfo<number>>({
	type: 'P',
	args: {
		Kp: 1
	}
})

onMounted(() => {
	let value = simDatas.getNode(props.id)
	if (value) {
		msg.value = value
	}
})
</script>

<template>
	<base-container :id="id" border-width="0">
		<template #component-logo>
			<svg xmlns="http://www.w3.org/2000/svg">
				<polygon points="2,25 2,125 102,75"
					style="stroke: rgb(23, 193, 105); stroke-width: 4px; fill: rgb(255, 255, 255);" />
				<text x="35" y="85">P</text>
			</svg>
			<Handle id="a" type="source" :position="Position.Right" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'blue'
				}" />
			<Handle id="b" type="target" :position="Position.Left" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'red'
				}" />
		</template>
		<template #component-set>
			<el-input-number v-model:value="msg.args.Kp" placeholder="1">
				<template #prefix>
					比例系数:
				</template>
			</el-input-number>
		</template>
	</base-container>
</template>
