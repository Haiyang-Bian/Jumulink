<script setup lang="ts">
import { useSimulationResultsStore } from '@/stores/simulation-results';
import { ElTabPane, ElMessage } from 'element-plus';
import { ref } from 'vue';

const simResults = useSimulationResultsStore();

const activeName = ref('lib')
function onDragStart(event: any, nodeType: any) {
	if (event.dataTransfer) {
		event.dataTransfer.setData('application/vueflow', nodeType)
		event.dataTransfer.effectAllowed = 'move'
	}
}

function handleSim() {
	if (simResults.done) {
		simResults.simulationStart();
	} else {
		ElMessage.warning('正在计算，请稍后尝试！')
	}
}
</script>

<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="组件库" name="lib">
			<div
				style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; max-width: 90%; margin: auto; gap: 3px">
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'sinput')">
					Input
					<p>系统输入</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'transferfunction')">
					TransferFunction
					<p>普通传函</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'sum')">
					SumPoint
					<p>和点</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'sumblock')">
					SumBlock
					<p>和块</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'plink')">
					<strong>P</strong>
					<p>比例环节</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'integrator')">
					<strong>I</strong>
					<p>积分环节</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'idealdiff')">
					D
					<p>理想微分环节</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'actualdiff')">
					D
					<p>实际微分环节</p>
				</div>
				<div class="menu" :draggable="true" @dragstart="onDragStart($event, 'soutput')">
					<p>示波器</p>
				</div>
			</div>
		</el-tab-pane>
		<el-tab-pane label="仿真设置" name="simulation">
			<el-button @click="handleSim">按下以开始仿真!</el-button>
		</el-tab-pane>
	</el-tabs>
</template>