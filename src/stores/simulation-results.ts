import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import type { IResultDatas } from '@/utils/jumulink-types';
import { useSimulaitionArgsStore } from './simulation-args';

export const useSimulationResultsStore = defineStore('simulationResults', () => {

	const simDatas = useSimulaitionArgsStore();

	const done = ref(false);
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

	function sendMsg() {
		const request = axios.create({
			timeout: 5000
		})
		const config = {
			headers: { 'Content-Type': "multipart/json, charset=UTF-8" }
		}
		const jsonobj: Record<string, any> = {}
		Object.entries(simDatas.nodes).forEach((v) => {
			jsonobj[v[0]] = v[1]
		})
		request.post('/jumulink', {
			nodes: jsonobj,
			map: simDatas.adjacencyMatrix
		}, config)
			.then((response: { data: IResultDatas; }) => {
				done.value = true
				resultDatas.value = response.data
				console.log(response.data);
			})
			.catch((error: any) => {
				console.log(error);
			});
	}

	function simulationStart() {
		done.value = false;
		simDatas.getAdjacencyMatrix()
		sendMsg()
	}

	return {
		done,
		resultDatas,
		getTimes,
		getResultDatas,
		simulationStart
	}
})