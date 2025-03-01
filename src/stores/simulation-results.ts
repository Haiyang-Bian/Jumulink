import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSimulationResultsStore = defineStore('simulationResults', () => {
	const done = ref(false);
	const resultDatas = ref([]);

	function getResultDatas(id: string) {
		const newans = []
		for (const key of Object.keys(resultDatas.value)) {
			if (String(key) == id) {
				for (const son of Object.keys(resultDatas.value[key])) {
					newans.push({
						name: String(son),
						type: 'line',
						data: resultDatas.value[key][son]
					})
				}
			}
		}
		return newans
	}

	return {
		done,
		resultDatas,
		getResultDatas,
	}
})