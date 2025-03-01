import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type IComponentInfo } from '@/utils/jumulink-types'
import { useVueFlow, type Connection, type HandleElement } from '@vue-flow/core';

export const useSimulaitionArgsStore = defineStore('simulationArgs', () => {
	const start = ref(false);
	const nodes = ref<Record<string, IComponentInfo<any>>>({});
	const adjacencyMatrix = ref([]);

	// 连接图数据
	const { getNodes } = useVueFlow();


	function setNode(id: string, node: IComponentInfo<any>) {
		nodes.value[id] = node;
	}
	function getNode(id: string): IComponentInfo<any> | undefined {
		return nodes.value[id];
	}

	// 判定是否无效连接
	function isValidConnection(conn: Connection) {
		// 先判断终点
		let id = conn.target
		let id_h = conn.targetHandle
		let ids: HandleElement[] = []
		let flag = false
		for (const i of getNodes.value) {
			if (id === i.id) {
				ids = i.handleBounds.target as HandleElement[]
				break
			}
		}
		for (const j of ids) {
			if (id_h === j.id) {
				flag = true
				break
			}
		}
		// 再判断起点
		id = conn.source
		id_h = conn.sourceHandle
		for (const i of getNodes.value) {
			if (id === i.id) {
				ids = i.handleBounds.source as HandleElement[]
				break
			}
		}
		for (const j of ids) {
			if (id_h === j.id) {
				return flag
			}
		}
		return false
	}

	return { start, nodes, adjacencyMatrix, setNode, getNode, isValidConnection }
})
