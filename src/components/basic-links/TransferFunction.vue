<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { onMounted, ref } from 'vue';
import BaseContainer from '@/components/basic-links/BaseContainer.vue'
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import type { IComponentInfo } from '@/utils/jumulink-types';

defineOptions({
	inheritAttrs: false
});

const props = defineProps<{ id: string }>();

const simDatas = useSimulaitionArgsStore();

const msg = ref<IComponentInfo<string>>({
	type: 'TransFunction',
	args: {
		num: '[0]',
		den: '[1]'
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
	<base-container :id="id" @set-args="simDatas.setNode(id, msg)">
		<template #component-logo>
			<p><strong>G</strong></p>
			<Handle id="a" type="source" :position="Position.Right" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'blue',
				}" />
			<Handle id="b" type="target" :position="Position.Left" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'red',
				}" />
		</template>
		<template #component-set>
			<el-input v-model="(msg.args as Record<string, string>).num" placeholder="[0]">
				<template #prefix>
					分子多项式系数:
				</template>
			</el-input>
			<el-input v-model="(msg.args as Record<string, string>).den" placeholder="[1]">
				<template #prefix>
					分母多项式系数:
				</template>
			</el-input>
		</template>
	</base-container>
</template>
