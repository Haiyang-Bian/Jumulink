<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { NButton } from 'naive-ui'
import { ref } from 'vue';

const props = defineProps({
	id: {
		type: String,
		required: true,
	}
})
const show = ref(false)
</script>

<template>
	<NButton @dblclick="show = true" class="vue-flow__node-default">
		<div class="vue-flow__node-default">Scope</div>
		<Handle id="b" type="target" :position="Position.Left" />
	</NButton>
	<div>{{ props.id }}</div>
</template>