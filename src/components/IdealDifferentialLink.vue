<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { NButton, NDrawer, NDrawerContent, NInput } from 'naive-ui'
import { inject, ref, type Ref } from 'vue';

const props = defineProps({
	id: {
		type: String,
		required: true,
	}
})
const simArgs = inject('simArgs') as Ref<{
	start: boolean,
	nodes: Map<string, any>,
	adjacencyMatrix: Array<any>
}>
const show = ref(false)
const msg = ref({
	type: "D_I",
	Td: "1"
})
simArgs.value.nodes.set(props.id, msg.value)
</script>

<template>
	<NButton @dblclick="show = true" class="vue-flow__node-default">
		<div class="vue-flow__node-default">D</div>
		<Handle id="a" type="source" :position="Position.Right" />
		<Handle id="b" type="target" :position="Position.Left" />
	</NButton>
	<n-drawer v-model:show="show" :width="502">
		<n-drawer-content title="基本传函参数设置" closable>
			<n-input v-model:value="msg.Td" placeholder="1">
				<template #prefix>
					微分时间常数:
				</template>
			</n-input>
		</n-drawer-content>
	</n-drawer>
	<div>{{ props.id }}</div>
</template>