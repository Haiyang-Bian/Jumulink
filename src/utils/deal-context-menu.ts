import { useSimulaitionArgsStore } from "@/stores/simulation-args";
import { nextTick, ref } from "vue"
export function useContextMenu() {
	const simDatas = useSimulaitionArgsStore();
	const { onEdgeContextMenu, onNodeContextMenu, removeEdges, removeNodes } = simDatas.systemGraph;

	// 右键菜单依赖项
	const showDropdownRef = ref(false)
	const xRef = ref(0)
	const yRef = ref(0)
	const s = ref({
		name: '',
		type: ''
	})

	// 右键菜单选项
	const options = [
		{
			label: '删除',
			key: '3'
		}
	]

	function getMXY(e: MouseEvent) {
		e.preventDefault()
		xRef.value = e.clientX
		yRef.value = e.clientY
	}

	// 右键菜单交互
	function handleSelect(key: string | number) {
		showDropdownRef.value = false
		if (key == '3') {
			if (s.value.type == 'edge') {
				removeEdges(s.value.name)
			} else if (s.value.type == 'node') {
				removeNodes(s.value.name)
				delete simDatas.nodes[s.value.name]
			}
		}
	}

	onEdgeContextMenu(({ edge }) => {
		s.value.name = edge.id
		s.value.type = 'edge'
		showDropdownRef.value = false
		nextTick().then(() => {
			showDropdownRef.value = true
		})
	})
	onNodeContextMenu(({ node }) => {
		s.value.name = node.id
		s.value.type = 'node'
		showDropdownRef.value = false
		nextTick().then(() => {
			showDropdownRef.value = true
		})
	})

	return {
		xRef,
		yRef,
		showDropdownRef,
		options,
		getMXY,
		handleSelect
	}
}
