<script setup lang="ts">
import { useSimulaitionArgsStore } from '@/stores/simulation-args';
import { Handle, Position } from '@vue-flow/core'

const l = 46 / Math.sqrt(2)
</script>

<template>
	<Handle id="a" type="source" :position="Position.Right"
		:is-valid-connection="useSimulaitionArgsStore().isValidConnection" :style="{
			backgroundColor: 'blue',
		}" />
	<slot name="handle"></slot>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
		<circle cx="50" cy="50" r="46" stroke="black" stroke-width="4" fill="rgb(255, 255, 255)" />
		<line :x1="50 - l" :y1="50 - l" :x2="50 + l" :y2="50 + l" style="stroke:rgb(9, 9, 9);stroke-width:4" />
		<line :x1="50 - l" :y1="50 + l" :x2="50 + l" :y2="50 - l" style="stroke:rgb(5, 5, 5);stroke-width:4" />
		<slot name="text"></slot>
	</svg>
</template>