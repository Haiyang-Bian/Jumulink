<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { h, reactive } from 'vue';
import { useMessage } from 'naive-ui'
import Logo from './SumPointLogo.vue'
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import BaseContainer from '@/components/basic-links/BaseContainer.vue';
import { ElInput } from 'element-plus';

defineOptions({
	inheritAttrs: false
})

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const opts = reactive({
	label: 'SumPoint',
	symbol: '[+++]'
})

const ids = [
	{
		id: "b",
	},
	{
		id: "c",
	},
	{
		id: "d",
	},
]

const msg = useMessage()

function SumHandle() {

	simDatas.setNode(props.id, {
		type: 'Sum',
		args: {
			symbol: opts.symbol
		}
	})
	let num = opts.symbol.slice(1, -1).length
	if (num > 3) {
		msg.error("和点最多三个入口")
	} else if (num < 1) {
		msg.error("和点至少有一个入口")
	}
	return ids.slice(0, num).map((x: any) => {
		switch (x.id) {
			case 'b':
				return h(
					Handle,
					{
						id: 'b',
						type: 'target',
						position: Position.Left,
						isValidConnection: simDatas.isValidConnection,
						style: {
							backgroundColor: 'red',
						}
					}
				)
			case 'c':
				return h(
					Handle,
					{
						id: 'c',
						type: 'target',
						position: Position.Bottom,
						isValidConnection: simDatas.isValidConnection,
						style: {
							backgroundColor: 'red',
						}
					}
				)
			case 'd':
				return h(
					Handle,
					{
						id: 'd',
						type: 'target',
						position: Position.Top,
						isValidConnection: simDatas.isValidConnection,
						style: {
							backgroundColor: 'red',
						}
					}
				)
		}
	})
}

function SumSymbol() {

	simDatas.setNode(props.id, {
		type: 'Sum',
		args: {
			symbol: opts.symbol
		}
	})
	let num = opts.symbol.slice(1, -1).length
	return ids.slice(0, num).map((x: any) => {
		switch (x.id) {
			case 'b':
				return h(
					'text',
					{
						x: "10",
						y: "60",
						class: 'sum-point-symbol'
					},
					opts.symbol[1]
				)
			case 'c':
				return h(
					'text',
					{
						x: "40",
						y: "92",
						class: 'sum-point-symbol'
					},
					opts.symbol[2]
				)
			case 'd':
				return h(
					'text',
					{
						x: "40",
						y: "28",
						class: 'sum-point-symbol'
					},
					opts.symbol[3]
				)
		}
	})
}
</script>

<template>
	<base-container :id="props.id" border-width="0">
		<template #component-logo>
			<Logo>
				<template #handle>
					<SumHandle />
				</template>
				<template #text>
					<SumSymbol />
				</template>
			</Logo>
		</template>
		<template #component-set>
			<el-input v-model="opts.symbol" placeholder="[+]">
				<template #prefix>
					和块节点符号:
				</template>
			</el-input>
		</template>
	</base-container>
</template>