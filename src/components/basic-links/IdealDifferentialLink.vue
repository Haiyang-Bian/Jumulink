<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import BaseContainer from './BaseContainer.vue';
import { onMounted, ref } from 'vue';
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import type { IComponentInfo } from '@/utils/jumulink-types';

defineOptions({
	inheritAttrs: false
});

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const msg = ref<IComponentInfo<number>>({
	type: "D_I",
	args: { Td: 1 }
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
		<template #component-set>
			<el-input-number v-model="(msg.args as Record<string, number>).Td" placeholder="1">
				<template #prefix>
					微分时间常数:
				</template>
			</el-input-number>
		</template>
		<template #component-logo>
			<strong>D</strong>
			<Handle id="a" type="source" :position="Position.Right" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'blue'
				}" />
			<Handle id="b" type="target" :position="Position.Left" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'red'
				}" />
		</template>
	</base-container>
</template>