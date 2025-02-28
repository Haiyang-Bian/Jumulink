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
	type: 'I',
	Ti: "1"
})
simArgs.value.nodes.set(props.id, msg.value)
</script>

<template>
    <base-container :id="id">
        <template #component-logo>
            <p><strong>I</strong></p>
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
            <n-input v-model:value="msg.Ti" placeholder="1">
                <template #prefix>
                    积分时间常数:
                </template>
            </n-input>
        </template>
    </base-container>
</template>