// 全局使用的类型定义

// 邻接矩阵的接口
export interface IAjmatrix {
	nid: string,
	nnum: number,
	nnodes: number[],
}

// 组件信息
export interface IComponentInfo<T> {
	type: string,
	args: Record<string, T> | undefined
}

// 计算信息（与Julia后端的接口）
export interface ICalcInfo {
	nodes: Record<string, IComponentInfo<any>>,
	map: IAjmatrix[]
}

// 计算结果信息（与Julia后端的接口）
export interface IResultDatas {
	ans: Record<string, Record<string, number[]>>,
	x: number[]
}