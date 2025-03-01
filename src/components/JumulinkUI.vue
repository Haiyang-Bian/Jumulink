<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { markRaw } from 'vue';
import { NMessageProvider, NDropdown } from 'naive-ui';
import { IDlink, ADlink, Tf, Ilink, Plink } from './basic-links';
import { Input, SumBlock, Scope, SumPoint } from './helper-components';
import { SideBar } from './ui-components';
import { ElAside, ElMain } from 'element-plus';
import { useContextMenu } from '@/utils/deal-context-menu';
import { useDragAndDrop } from '@/utils/darg-drop';


// 组件类型登记
const nodeTypes: Record<string, any> = {
	sinput: markRaw(Input),
	transferfunction: markRaw(Tf),
	sumblock: markRaw(SumBlock),
	plink: markRaw(Plink),
	integrator: markRaw(Ilink),
	idealdiff: markRaw(IDlink),
	actualdiff: markRaw(ADlink),
	soutput: markRaw(Scope),
	sum: markRaw(SumPoint),
}

const { xRef, yRef, showDropdownRef, getMXY, options, handleSelect } = useContextMenu();
const { onDrop, onDragOver } = useDragAndDrop();

</script>

<template>
	<div class="dndflow" @drop="onDrop" @click.right="getMXY" @click="showDropdownRef = false">
		<n-message-provider>
			<el-container>
				<el-main>
					<VueFlow @dragover="onDragOver" :node-types="nodeTypes" :default-edge-options="{
						type: 'smoothstep',
					}">
						<MiniMap />
						<Background pattern-color="#aaa" :gap="8" />
						<Controls />
					</VueFlow>
				</el-main>
				<el-aside width="200px">
					<side-bar />
				</el-aside>
			</el-container>
		</n-message-provider>
		<n-dropdown placement="bottom-start" trigger="manual" :x="xRef" :y="yRef" :options="options"
			:show="showDropdownRef" @select="handleSelect" />
	</div>
</template>
