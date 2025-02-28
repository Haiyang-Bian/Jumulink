import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type IComponentInfo } from '@/utils/jumulink-types'

export const useSimulaitionArgsStore = defineStore('simulationArgs', () => {
  const start = ref(false);
  const nodes = ref<Record<string, IComponentInfo>>({});
  const adjacencyMatrix =  ref([]);

  function setNode(id: string, node: IComponentInfo)
  {
    nodes.value[id] = node;
  }
  function getNode(id: string):IComponentInfo | undefined
  {
    return nodes.value[id];
  }
  return { start, nodes, adjacencyMatrix, setNode, getNode }
})
