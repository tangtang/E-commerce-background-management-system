<template>
  <el-select v-model="value"
             v-bind="props"
             @change="onChange">
    <el-option v-for="(item, index) in list"
               :key="index"
               :value="item.id"
               :label="item.title" />
  </el-select>
</template>

<script lang="ts">
import { forEach } from "lodash";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "goods_category",

	props: {
		modelValue: [Number],
		props: Object
	},

	emits: ["update:modelValue"],

	setup(props, { emit }) {
		// 请求服务
		const { service } = useCool();

		// 数据列表
		const list = ref<any[]>([]);

		// 绑定值
		const value = ref<any>();

		// 绑定值回调
		function onChange(val: any) {
			emit("update:modelValue", val);
		}
		console.log(props);

		// 解析值
		watch(
			() => props.modelValue,

			(val: any) => {
				value.value = val;
				// console.log(val);
			},
			{
				immediate: true
			}
		);

		onMounted(async () => {
			let data = await service.mall.goodsCategory.list();
			data.forEach((element: { parentId: number; title: string; id: number }) => {
				if (element.parentId === 0) {
					list.value.push({
						title: element.title,
						id: element.id
					});
				}
			});
			// console.log(list);
		});

		return {
			list,
			value,
			onChange
		};
	}
});
</script>
