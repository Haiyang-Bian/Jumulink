<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { onMounted, ref } from 'vue';
import BaseContainer from './BaseContainer.vue'
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import type { IComponentInfo } from '@/utils/jumulink-types';

defineOptions({
	inheritAttrs: false
})

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const msg = ref<IComponentInfo<number>>({
	type: "D_A",
	args: {
		kd: 1,
		Td: 1
	}
})

onMounted(() => {
	let value = simDatas.getNode(props.id)
	if (value) {
		msg.value = value
	} else {
		simDatas.setNode(props.id, msg.value)
	}
})

</script>

<template>
	<base-container :id="id">
		<template #component-logo>
			<strong>D</strong>
			<p style="font-size: 15px; margin-top: 0">实际微分环节</p>

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
			<el-input-number v-model:value="(msg.args as Record<string, number>).kd" placeholder=1>
				<template #prefix>
					比例系数:
				</template>
			</el-input-number>
			<el-input-number v-model:value="(msg.args as Record<string, number>).Td" placeholder=1>
				<template #prefix>
					微分时间常数:
				</template>
			</el-input-number>
		</template>
	</base-container>
</template>
