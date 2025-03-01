import { MarkerType, useVueFlow } from "@vue-flow/core"
import { nextTick, watch } from "vue"


// 处理拖拽和连接
export function useDragAndDrop() {

	let id = 0

	// 组件交互依赖项
	const {
		findNode,
		onConnect,
		addEdges,
		addNodes,
		project,
		vueFlowRef
	} = useVueFlow()

	// 连接线设置
	onConnect((params) => {
		const newpar = {
			source: params.source,
			target: params.target,
			sourceHandle: params.sourceHandle,
			targetHandle: params.targetHandle,
			style: {
				stroke: 'rgb(0,0,0)',
				strokeWidth: '4px'
			},
			markerEnd: MarkerType.Arrow,
		}
		addEdges(newpar)
	})

	function getId() {
		return `node_${id++}`
	}

	function onDragOver(event: any) {
		event.preventDefault()
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move'
		}
	}
	function onDrop(event: DragEvent) {
		const type = event.dataTransfer?.getData('application/vueflow')
		const { left, top } = (vueFlowRef.value as any).getBoundingClientRect()
		const position = project({
			x: event.clientX - left,
			y: event.clientY - top,
		})

		const newNode = {
			id: getId(),
			type,
			position,
			label: `${type} node`,
		}

		addNodes(newNode)

		// align node position after drop, so it's centered to the mouse
		nextTick(() => {
			const node = findNode(newNode.id)
			if (node != undefined) {
				const stop = watch(
					() => node.dimensions,
					(dimensions) => {
						if (dimensions.width > 0 && dimensions.height > 0) {
							node.position = { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 }
							stop()
						}
					},
					{ deep: true, flush: 'post' },
				)
			}
		})
	}

	return {
		onDragOver,
		onDrop
	}
}






