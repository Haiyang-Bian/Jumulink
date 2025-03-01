import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type IComponentInfo } from '@/utils/jumulink-types'
import { useVueFlow, type Connection, type HandleElement } from '@vue-flow/core';
import { isSum, matchIdNum, type IAjmatrix } from '@/utils/deal-request';

export const useSimulaitionArgsStore = defineStore('simulationArgs', () => {
	const start = ref(false);
	const nodes = ref<Record<string, IComponentInfo<any>>>({});
	const adjacencyMatrix = ref<IAjmatrix[]>([]);

	// 连接图数据
	const { getNodes, getEdges } = useVueFlow();


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

	// 获得邻接矩阵？很难想象写出来这种东西的是个人
	function getAdjacencyMatrix() {
		const ids = getNodes.value.map((x: any) => {
			let s = undefined
			let t = undefined
			if (x.handleBounds.source != undefined) {
				s = x.handleBounds.source.map((x: any) => {
					x.id
				})
			}
			if (x.handleBounds.target != undefined) {
				t = x.handleBounds.target.map((x: any) => {
					x.id
				})
			}
			return {
				id: x.id,
				type: x.type,
				source: s,
				target: t
			}
		})
		const lines = getEdges.value.map((x: any) => {
			return {
				source: x.source,
				target: x.target,
				targetHandle: x.targetHandle
			}
		})
		const ajmatrix = []
		let num = 1
		const lens = ids.length
		for (const id of ids) {
			ajmatrix.push({
				nid: id.id,
				nnum: num,
				nnodes: Array.from({ length: lens }).map(() => 0)
			})
			num++
		}
		for (const line of lines) {
			const sid = matchIdNum(line.source, ajmatrix)
			const tid = matchIdNum(line.target, ajmatrix)
			if (isSum(line.target, getNodes.value)) {
				const syms = (nodes.value[line.target].args as Record<string, string>)['symbol']
				switch (line.targetHandle) {
					case 'b':
						if (syms[1] == '+') {
							ajmatrix[sid - 1].nnodes[tid - 1] = 1
						} else {
							ajmatrix[sid - 1].nnodes[tid - 1] = -1
						}
						break;
					case 'c':
						if (syms[2] == '+') {
							ajmatrix[sid - 1].nnodes[tid - 1] = 1
						} else {
							ajmatrix[sid - 1].nnodes[tid - 1] = -1
						}
						break;
					case 'd':
						if (syms[3] == '+') {
							ajmatrix[sid - 1].nnodes[tid - 1] = 1
						} else {
							ajmatrix[sid - 1].nnodes[tid - 1] = -1
						}
						break;
					case 'e':
						if (syms[4] == '+') {
							ajmatrix[sid - 1].nnodes[tid - 1] = 1
						} else {
							ajmatrix[sid - 1].nnodes[tid - 1] = -1
						}
						break;
					case 'f':
						if (syms[5] == '+') {
							ajmatrix[sid - 1].nnodes[tid - 1] = 1
						} else {
							ajmatrix[sid - 1].nnodes[tid - 1] = -1
						}
						break;
				}
			} else {
				ajmatrix[sid - 1].nnodes[tid - 1] = 1
			}
		}
		adjacencyMatrix.value = ajmatrix
	}

	return {
		start, nodes, adjacencyMatrix,
		setNode,
		getNode,
		isValidConnection,
		getAdjacencyMatrix
	}
})
