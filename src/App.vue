<script setup lang="ts">
import { MarkerType, VueFlow, useVueFlow } from '@vue-flow/core'
import { markRaw, nextTick, provide, ref, watch } from 'vue'
import Sidebar from './components/SideBar.vue'
import Tf from './components/TransferFunction.vue'
import SumBlock from './components/SumBlock.vue'
import { MiniMap } from '@vue-flow/minimap'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import SimulatorBox from './components/SimulatorBox.vue'
import { NMessageProvider, NDropdown } from 'naive-ui'
import Plink from './components/ProportionalComponent.vue'
import Ilink from './components/IntegralComponent.vue'
import IDlink from './components/IdealDifferentialLink.vue'
import ADlink from './components/ActualDifferentiationProcess.vue'
import InPut from './components/SystemInput.vue'
import Scope from './components/ScopeComponent.vue'

// 组件类型登记
const nodeTypes = {
  sinput: markRaw(InPut),
  transferfunction: markRaw(Tf),
  sumblock: markRaw(SumBlock),
  plink: markRaw(Plink),
  integrator: markRaw(Ilink),
  idealdiff: markRaw(IDlink),
  actualdiff: markRaw(ADlink),
  soutput: markRaw(Scope)
}
// 仿真参数储存
const simArgs = ref({
  start: false,
  nodes: new Map(),
  adjacencyMatrix: []
})
// 主侧边栏显示
const show = ref(false)
// 组件交互依赖项
const {
  findNode,
  getEdges,
  getNodes,
  removeEdges,
  removeNodes,
  onConnect,
  addEdges,
  addNodes,
  onEdgeContextMenu,
  onNodeContextMenu,
  project,
  vueFlowRef
} = useVueFlow({
  nodes: [
  ]
})
// 右键菜单依赖项
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const options = [
  {
    label: '复制',
    key: '1'
  },
  {
    label: '粘贴',
    key: '2'
  },
  {
    label: '删除',
    key: '3'
  }
]
// 透传依赖
provide('sysEdges', getEdges)
provide('sysNodes', getNodes)
provide('show', show)
provide('simArgs', simArgs)
// 连接线设置
onConnect((params) => {
  const newpar = {
    source: params.source,
    target: params.target,
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
    style: {
      stroke: '#10b981',
    },
    markerEnd: MarkerType.Arrow,
  }
  addEdges(newpar)
})
// 设置右键菜单
const s = ref({
  name: '',
  type: ''
})
onEdgeContextMenu(({ edge }) => {
  s.value.name = edge.id
  s.value.type = 'edge'
  handleContextMenu()
})
onNodeContextMenu(({ node }) => {
  s.value.name = node.id
  s.value.type = 'node'
  handleContextMenu()
})
// 右键菜单交互
function handleSelect(key: string | number) {
  showDropdownRef.value = false
  if (key == '3') {
    if (s.value.type == 'edge') {
      removeEdges(s.value.name)
    } else if (s.value.type == 'node') {
      removeNodes(s.value.name)
      simArgs.value.nodes.delete(s.value.name)
    }
  }
}
function handleContextMenu() {
  showDropdownRef.value = false
  nextTick().then(() => {
    showDropdownRef.value = true
  })
}
function getMXY(e: MouseEvent) {
  e.preventDefault()
  xRef.value = e.clientX
  yRef.value = e.clientY
}
// 组件拖拽设置
let id = 0
function getId() {
  return `node_${id++}`
}
function onDragOver(event: any) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}
function onDrop(event: any) {
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
  
  addNodes([newNode])

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
  show.value = true
}
</script>

<template>
  <div class="dndflow" @drop="onDrop" @click.right="getMXY" @click="showDropdownRef = false">
    <n-message-provider>
      <VueFlow 
        @dragover="onDragOver" 
        :node-types="nodeTypes"
        :default-edge-options="{ type: 'smoothstep' }"
      >
        <MiniMap />
        <Background pattern-color="#aaa" :gap="8" />
        <Controls />
      </VueFlow>
      <Sidebar />
      <SimulatorBox />
    </n-message-provider>
    <n-dropdown placement="bottom-start" trigger="manual" :x="xRef" :y="yRef" :options="options" :show="showDropdownRef"
    	    @select="handleSelect" />
  </div>
</template>
