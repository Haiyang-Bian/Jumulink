<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { h, reactive, ref } from 'vue';
import { NInput, useMessage } from 'naive-ui'
import { BaseContainer } from '../basic-links';
import { useSimulaitionArgsStore } from '@/stores/simulation-args';

defineOptions({
	inheritAttrs: false
})

const show = ref(false)

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const opts = reactive({
	label: 'SumBlock',
	symbol: '[+++]'
})

const c = h(Handle, {
	id: "a",
	type: 'source',
	position: Position.Right,
	isValidConnection: simDatas.isValidConnection,
	style: {
		top: "100px",
		backgroundColor: 'blue',
	}
})

const ids = [
	{
		id: "b",
		num: 1,
	},
	{
		id: "c",
		num: 2,
	},
	{
		id: "d",
		num: 3,
	},
	{
		id: "e",
		num: 4,
	},
	{
		id: "f",
		num: 5,
	}
]

const msg = useMessage()

function SumNode() {
	if (show.value) {
		return h(
			'div',
			c
		)
	}
	else {
		simDatas.setNode(props.id, {
			type: 'Sum',
			args: {
				symbol: opts.symbol
			}
		})
		let num = opts.symbol.slice(1, -1).length
		if (num > 5) {
			msg.error("和块最多五个输入!")
		} else if (num < 1) {
			msg.error("和块至少一个输入!")
		}
		let comps = [c]
		let handles = ids.slice(0, num).map((x: any) => {
			let p = Math.floor(180 / (num + 1)) * x.num
			const sourceHandleStyle = {
				top: String(p).concat('px'),
				backgroundColor: 'red',
			}
			return h(Handle, {
				id: x.id,
				type: "target",
				position: Position.Left,
				isValidConnection: simDatas.isValidConnection,
				style: sourceHandleStyle
			})
		})
		let spans = []
		for (let id of ids.slice(0, num)) {
			spans.push(h('span', {
				class: "sum-block-span"
			},
				opts.symbol[id.num]
			))
			spans.push(h('br'))
		}
		let mydiv = h('div', spans)
		for (let handle of handles) {
			comps.push(handle)
		}
		comps.push(mydiv)
		return h('div', comps)
	}
}
</script>

<template>
	<base-container :id="id">
		<template #component-logo>
			<SumNode />
		</template>
		<template #component-set>
			<n-input v-model:value="opts.symbol" placeholder="[+]">
				<template #prefix>
					和块节点符号:
				</template>
			</n-input>
		</template>
	</base-container>
</template>