import type { GraphNode } from "@vue-flow/core"

interface IAjmatrix {
	nid: string,
	nnum: number,
	nnodes: number[],
}

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

export { type IAjmatrix, matchIdNum, isSum }