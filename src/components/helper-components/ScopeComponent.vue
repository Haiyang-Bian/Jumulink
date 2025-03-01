<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { useMessage, NScrollbar } from 'naive-ui'
import { h, nextTick, onMounted, ref } from 'vue';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { BaseContainer } from '@/components/basic-links'
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import { useSimulationResultsStore } from '@/stores/simulation-results';

defineOptions({
	inheritAttrs: false
})

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LineChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer
]);

const simDatas = useSimulaitionArgsStore();

const simResult = useSimulationResultsStore();

const multiGraph = ref(false)

const msg = useMessage()

function Scope() {
	if (simResult.done) {
		let data = simResult.getResultDatas(props.id)
		if (multiGraph.value) {
			let graph = []
			for (let d of data) {
				graph.push(h(
					'div',
					{
						class: 'picture',
						ref: (el: any) => {
							nextTick(() => {
								let myChart = echarts.init(el)
								myChart.setOption({
									title: {
										text: '输出变化图(关于'.concat(d.name, ')')
									},
									tooltip: {},
									xAxis: {
										data: simResult.getTimes
									},
									yAxis: {},
									series: [d]
								});
							})
						},
					}
				), h('br'))
			}
			return h(
				NScrollbar,
				graph
			)
		} else {
			return h(
				'div',
				{
					class: 'picture',
					ref: (el: any) => {
						nextTick(() => {
							let myChart = echarts.init(el)
							myChart.setOption({
								title: {
									text: '输出变化图'
								},
								tooltip: {},
								xAxis: {
									data: simResult.getTimes
								},
								yAxis: {},
								series: data
							});
						})
					},
				}
			)
		}
	} else {
		if (multiGraph.value) {
			msg.error("没有数据,无法分图!")
		}
		return h(
			'div',
			{
				class: "picture",
				ref: (el: any) => {
					nextTick(() => {
						let myChart = echarts.init(el)
						myChart.showLoading()
					})
				},
			}
		)
	}
}

const props = defineProps<{ id: string }>()

onMounted(() => {
	simDatas.setNode(props.id, {
		type: 'output',
		args: undefined
	})
})
</script>

<template>
	<base-container :id="id" set-type="dialog">
		<template #component-logo>
			<p><strong>示波器</strong></p>
			<Handle id="b" type="target" :position="Position.Left" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'red'
				}" />
		</template>
		<template #component-show>
			<Scope />
			<el-button @click="multiGraph = false">单图显示</el-button>
			<el-button @click="multiGraph = true">分图显示</el-button>
		</template>
	</base-container>
</template>