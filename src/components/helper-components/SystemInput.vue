<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { ref, onMounted } from 'vue'
import { BaseContainer } from '@/components/basic-links'
import { type IComponentInfo } from '@/utils/jumulink-types'
import { useSimulaitionArgsStore } from '@/stores/simulation-args'
import { ElText, ElSelect, ElOption } from 'element-plus'

defineOptions({
	inheritAttrs: false
});

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const msg = ref<IComponentInfo<number>>({
	type: '阶跃输入',
	args: {
		K: 1,
		t: 0
	}
})

const value = ref<string>('阶跃输入')

onMounted(() => {
	let value = simDatas.getNode(props.id)
	if (value) {
		msg.value = value
	} else {
		simDatas.setNode(props.id, msg.value)
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
</script>

<template>
	<base-container :id="id" @set-args="simDatas.setNode(id, msg)">
		<template #component-logo>
			<p style="font-size: 20px;">系统输入</p>
			<Handle id="a" type="source" :position="Position.Right" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'blue',
				}" />
		</template>
		<template #component-set>
			<el-select v-model="value" placeholder="Select" size="large" style="width: 240px">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			<span>
				<el-text>比例系数:</el-text>
				<el-input-number v-model="(msg.args as Record<string, number>).K" placeholder="1" />
			</span>
			<span>
				<el-text>阶跃时间:</el-text>
				<el-input-number v-model="(msg.args as Record<string, number>).t" placeholder="1" />
			</span>
		</template>
	</base-container>
</template>