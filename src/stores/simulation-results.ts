import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IResultDatas } from '@/utils/jumulink-types';
import { useSimulaitionArgsStore } from './simulation-args';
import { BACKEND_URL } from '@/utils/config';
import { ElMessage } from 'element-plus';

export const useSimulationResultsStore = defineStore('simulationResults', () => {

	const simDatas = useSimulaitionArgsStore();

	const calculationServer = ref<WebSocket | null>(null)

	const done = ref(true);

	const resultDatas = ref<IResultDatas>({
		x: [],
		ans: {}
	});

	const getTimes = computed(() => {
		return resultDatas.value.x
	})

	function getResultDatas(id: string) {
		const newans = []
		const datas = resultDatas.value.ans
		for (const key of Object.keys(datas)) {
			if (String(key) == id) {
				for (const son of Object.keys(datas[key])) {
					newans.push({
						name: String(son),
						type: 'line',
						data: datas[key][son]
					})
				}
			}
		}
		return newans
	}

	function connectServer(isServerExists: boolean) {
		if (isServerExists) {
			calculationServer.value = new WebSocket(`ws://${BACKEND_URL}/calculation`)
			calculationServer.value.onopen = () => {

			};
			calculationServer.value.onmessage = (event: MessageEvent) => {
				const data: IResultDatas = JSON.parse(event.data.toString());
				done.value = true;
				resultDatas.value = data
				ElMessage.success('计算完成!')
			};
			calculationServer.value.onclose = () => {

			};
			calculationServer.value.onerror = () => {
				ElMessage.error('服务器连接失败，请检查服务器是否开启')
			};
		}
		return
	}

	function simulationStart() {
		done.value = false;
		simDatas.getAdjacencyMatrix()
		if (calculationServer.value != null) {
			calculationServer.value.send(JSON.stringify(simDatas.calculation))
		}
	}

	return {
		done,
		getTimes,
		getResultDatas,
		connectServer,
		simulationStart,
		resultDatas
	}
})