<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { NInput } from 'naive-ui'
import { inject, ref, type Ref } from 'vue';
import Func from '@/utils/some-funcs'
import BaseContainer from '@/components/basic-links/BaseContainer.vue'

defineOptions({
    inheritAttrs: false
});

const props = defineProps({
	id: {
		type: String,
		required: true,
	}
})
const nodes = inject('sysNodes') as any
const simArgs = inject('simArgs') as Ref<{
	start: boolean,
	nodes: Map<string, any>,
	adjacencyMatrix: Array<any>
}>

const msg = ref({
	type: 'P',
	Kp:"1"
})
simArgs.value.nodes.set(props.id, msg.value)
</script>

<template>
    <base-container :id="id" border-width="0">
        <template #component-logo>
            <svg xmlns="http://www.w3.org/2000/svg">
                <polygon points="2,25 2,125 102,75" style="stroke: rgb(23, 193, 105); stroke-width: 4px; fill: rgb(255, 255, 255);"/>
                <text x="35" y="85">P</text>
            </svg>
            <Handle id="a"
                    type="source"
                    :position="Position.Right"
                    :is-valid-connection="(conn) => Func(conn, nodes)"
                    :style="{
				backgroundColor: 'blue'
			}"
            />
            <Handle id="b"
                    type="target"
                    :position="Position.Left"
                    :is-valid-connection="(conn) => Func(conn, nodes)"
                    :style="{
				backgroundColor: 'red'
			}"
            />
        </template>
        <template #component-set>
            <n-input v-model:value="msg.Kp" placeholder="1">
                <template #prefix>
                    比例系数:
                </template>
            </n-input>
        </template>
    </base-container>
</template>
