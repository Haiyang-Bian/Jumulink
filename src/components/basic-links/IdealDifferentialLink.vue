<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { NInput } from 'naive-ui';
import BaseContainer from './BaseContainer.vue';
import { inject, ref, type Ref } from 'vue';
import Func from '@/utils/some-funcs';

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
	type: "D_I",
	Td: "1"
})
simArgs.value.nodes.set(props.id, msg.value)
</script>

<template>
    <base-container :id="id">
        <template #component-set>
            <n-input v-model:value="msg.Td" placeholder="1">
                <template #prefix>
                    微分时间常数:
                </template>
            </n-input>
        </template>
        <template #component-logo>
            <strong>D</strong>
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
    </base-container>
</template>