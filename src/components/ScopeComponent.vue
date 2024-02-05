<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { NButton, NModal } from 'naive-ui'
import { inject, nextTick, ref, type Ref } from 'vue';
import * as echarts from 'echarts/core';
import {
	LineChart
} from 'echarts/charts';
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	// 数据集组件
	DatasetComponent,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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

const show = ref(false)

const simResult = inject('simResult') as Ref<{
	done: Boolean,
	data: any
}>

const picture = ref<any>(null)

function postProcessing(ans:any) {
	let newans = []
	for (let key of Object.keys(ans)) {
		if (String(key) == props.id) {
			for (let son of Object.keys(ans[key])) {
				newans.push({
					name: String(son),
					type: 'line',
					data: ans[key][son]
				})
			}
		}
	} 
	return newans
}

function Paint() {
	show.value = true
	nextTick(() => {
		let myChart = echarts.init(picture.value)
		myChart.showLoading()
		nextTick(() => {
			if (simResult.value.done) {
				let datas = postProcessing(simResult.value.data.ans)
				myChart.hideLoading()
				myChart.setOption({
					title: {
						text: '输出变化图'
					},
					tooltip: {},
					xAxis: {
						data: simResult.value.data.x
					},
					yAxis: {},
					series: datas
				});
			}
		})
	})
}


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
simArgs.value.nodes.set(props.id, {
	type:  'output'
})
</script>

<template>
	<NButton @dblclick="Paint" class="vue-flow__node-default">
		<div class="vue-flow__node-default">Scope</div>
		<Handle id="b" type="target" :position="Position.Left" />
	</NButton>
	<n-modal
	    v-model:show="show"
	    :mask-closable="false"
	    preset="dialog"
	    title="示波器"
	    content="你确认"
	    positive-text="确认"
	    negative-text="算了"
		style="width: 1000px; height: 700px;"
	>
		<div ref="picture" style="width: 1000px; height: 500px;"></div>
	</n-modal>
	<div>{{ props.id }}</div>
</template>