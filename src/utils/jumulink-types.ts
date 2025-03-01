// 全局使用的类型定义

export interface IBaseInfo {
	name: string,
}

export interface IComponentInfo<T> {
	type: string,
	args: Record<string, T> | undefined
}
