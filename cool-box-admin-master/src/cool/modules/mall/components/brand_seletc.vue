<template>
  <el-select v-model="value"
             v-bind="props"
             @change="onChange">
    <el-option v-for="(item, index) in list"
               :key="index"
               :value="item.id"
               :label="item.name" />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "brand_seletc",

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
		//	console.log(props);

		// 解析值
		watch(
			() => props.modelValue,

			(val: any) => {
				value.value = val;
			},
			{
				immediate: true
			}
		);

		onMounted(async () => {
			list.value = await service.brand.brandManage.list();
		});

		return {
			list,
			value,
			onChange
		};
	}
});
</script>
