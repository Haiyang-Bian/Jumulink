<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { onMounted, ref } from 'vue';
import BaseContainer from '@/components/basic-links/BaseContainer.vue'
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import type { IComponentInfo } from '@/utils/jumulink-types';

defineOptions({
	inheritAttrs: false
});

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const msg = ref<IComponentInfo<number>>({
	type: 'I',
	args: { Ti: 1 },
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
			<strong>I</strong>
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
			<el-input-number v-model="(msg.args as Record<string, number>).Ti" placeholder="1">
				<template #prefix>
					积分时间常数:
				</template>
			</el-input-number>
		</template>
	</base-container>
</template>