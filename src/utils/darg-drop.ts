import { useSimulaitionArgsStore } from "@/stores/simulation-args"
import { nextTick, watch } from "vue"


// 处理拖拽和连接
export function useDragAndDrop() {

	let id = 0

	const simDatas = useSimulaitionArgsStore();
	const { addNodes, findNode, project } = simDatas.systemGraph;

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
		const { left, top } = (simDatas.IVueFlowRef().value as HTMLDivElement).getBoundingClientRect()
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
		onDrop,
	}
}






