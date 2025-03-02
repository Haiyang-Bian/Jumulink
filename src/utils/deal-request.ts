import type { GraphNode } from "@vue-flow/core"
import type { IAjmatrix } from "./jumulink-types"
import axios from "axios";

function matchIdNum(id: string, arr: IAjmatrix[]) {
	for (const a of arr) {
		if (id == a.nid) {
			return a.nnum
		}
	}
	return -1;
}

function isSum(id: string, arr: GraphNode<any, any, string>[]) {
	for (const a of arr) {
		if (id == a.id) {
			if (a.type == 'sumblock' || a.type == 'sum') {
				return true
			}
		}
	}
	return false
}

async function connectServer() {
	return await axios.get('/connect').then(() => {
		console.log('connect server')
		return true
	}).catch(() => {
		console.log('connect server fail')
		return false
	})
}

export { matchIdNum, isSum, connectServer }