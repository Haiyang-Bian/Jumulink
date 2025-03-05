<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { nextTick, onMounted, ref, watch, markRaw } from 'vue';
import * as echarts from 'echarts';
import { BaseContainer } from '@/components/basic-links'
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import { useSimulationResultsStore } from '@/stores/simulation-results';

defineOptions({
	inheritAttrs: false
})

const props = defineProps<{ id: string }>()

const simDatas = useSimulaitionArgsStore();

const simResult = useSimulationResultsStore();

const container = ref<HTMLElement>()

const mainGraph = ref<echarts.ECharts | null>()

function updateChart() {
	if (simResult.done) {
		mainGraph.value?.hideLoading()
		let series = simResult.getResultDatas(props.id)
		mainGraph.value?.setOption({
			title: {
				text: '输出变化图'
			},
			legend: {
				data: series.map(s => s.name)
			},
			tooltip: {},
			xAxis: {
				data: simResult.getTimes
			},
			yAxis: {},
			series: series
		});
	} else {
		mainGraph.value?.showLoading()
	}
}

onMounted(() => {
	simDatas.setNode(props.id, {
		type: 'output',
		args: undefined
	})
})

watch(() => simResult.done, updateChart)
</script>

<template>
	<base-container :id="id" set-type="dialog" @set-args="simDatas.setNode(id, {
		type: 'output',
		args: undefined
	})" @expand="() => {
		nextTick(() => {
			// vue的更新与Echarts的更新冲突了，所以把它标记为原始的对象
			// 防止vue搞它，主要是用了ref
			mainGraph = markRaw(echarts.init(container))
			updateChart()
		})
	}">
		<template #component-logo>
			<p style="font-size: 20px;">示波器</p>
			<Handle id="b" type="target" :position="Position.Left" :is-valid-connection="simDatas.isValidConnection"
				:style="{
					backgroundColor: 'red'
				}" />
		</template>
		<template #component-show>
			<div class="picture" ref="container">
				什么都没有！
			</div>
		</template>
	</base-container>
</template>