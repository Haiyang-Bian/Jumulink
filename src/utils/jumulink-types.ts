// 全局使用的类型定义

// 组件信息
export interface IComponentInfo<T> {
	type: string,
	args: Record<string, T> | undefined
}

// 计算结果信息（与Julia后端的接口）
export interface IResultDatas {
	ans: Record<string, Record<string, number[]>>,
	x: number[]
}