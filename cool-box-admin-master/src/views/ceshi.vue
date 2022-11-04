<template>
	<el-table
		:data="tableData"
		border
		ref="table"
		stripe
		@select="select"
		@selection-change="selectionChange"
	>
		<el-table-column type="selection" width="55" />
		<el-table-column prop="name" key="name" label="姓名" />
	</el-table>
	<el-pagination
		layout="prev, pager, next"
		:total="6"
		:page-size="3"
		@current-change="currentChange"
	/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
	name: "home",
	setup() {
		interface PageData {
			id: number;
			name: string;
		}
		const tableData = ref<Array<PageData>>([
			{
				id: 1,
				name: "张三"
			},
			{
				id: 2,
				name: "张三2"
			}
		]);

		const page: Array<Array<PageData>> = [
			[
				{
					id: 1,
					name: "张三1"
				},
				{
					id: 2,
					name: "张三2"
				},
				{
					id: 3,
					name: "张三3"
				}
			],
			[
				{
					id: 4,
					name: "李四1"
				},
				{
					id: 5,
					name: "李四2"
				},
				{
					id: 6,
					name: "李四3"
				}
			]
		];
		const multipleSelection = new Set();
		const table = ref();
		function setData(index: number) {
			setTimeout(() => {
				tableData.value = page[index];
				const selectId = Array.from(multipleSelection);
				page[index].forEach((v) => {
					selectId.forEach((val) => {
						if (v.id === val) {
							table.value.toggleRowSelection(v, true);
						}
					});
				});
			}, 10);
		}

		onMounted(() => {
			setData(0);
		});

		function currentChange(row: number) {
			setData(row - 1);
		}

		function select(rows: Array<PageData>, row: PageData) {
			const arr = rows.filter((v) => v.id === row.id);
			if (arr.length === 0) {
				multipleSelection.delete(row.id);
			}
		}

		function selectionChange(val: Array<PageData>) {
			val.forEach((v: PageData) => {
				multipleSelection.add(v.id);
			});
		}

		return {
			tableData,
			currentChange,
			select,
			selectionChange,
			table
		};
	}
});
</script>
