<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { NButton, NInput, NPopselect } from 'naive-ui'
import { ref, onMounted, type Ref } from 'vue'
import Func from '@/utils/some-funcs'
import { BaseContainer } from '@/components/basic-links'
import { type IComponentInfo } from '@/utils/jumulink-types'
import { useSimulaitionArgsStore } from '@/stores/simulation-args'

defineOptions({
	inheritAttrs: false
});

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const msg: Ref<IComponentInfo> = ref<IComponentInfo>({
	type: '阶跃输入',
	args: {
		K: '1',
		t: '0'
	}
})

const value = ref<string>('阶跃输入')

onMounted(() => {
	let value = simDatas.getNode(props.id)
	if (value) {
		msg.value = value
	}
})

const options = [
	{
		label: '阶跃输入',
		value: '阶跃输入'
	},
	{
		label: '斜坡输入',
		value: '斜坡输入'
	},
	{
		label: '抛物线输入',
		value: '抛物线输入'
	}
]
function CallBack() {
	simDatas.setNode(props.id, msg.value)
}
</script>

<template>
	<base-container :id="id">
		<template #component-logo>
			<p><strong>系统输入</strong></p>
			<Handle id="a" type="source" :position="Position.Right"
				:is-valid-connection="(conn) => Func(conn, simDatas.nodes)" :style="{
					backgroundColor: 'blue',
				}" />
		</template>
		<template #component-set>
			<n-popselect v-model:value="value" :options="options" trigger="click" @click="CallBack">
				<n-button>{{ value || '弹出选择' }}</n-button>
			</n-popselect>
			<n-input v-model:value="msg.args.K" placeholder="1">
				<template #prefix>
					比例系数:
				</template>
			</n-input>
			<n-input v-model:value="msg.args.t" placeholder="1">
				<template #prefix>
					阶跃时间:
				</template>
			</n-input>
		</template>
	</base-container>
</template>