import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSimulaitionArgsStore = defineStore('simulationArgs', () => {
  const start = ref(false);
  const nodes = ref<Map<any, any>>();
  const adjacencyMatrix =  ref([]);

  return { start, nodes, adjacencyMatrix }
})
