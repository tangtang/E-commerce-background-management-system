<template>
  <!-- <el-select v-model="value"
             v-bind="props"
             @change="onChange">
    <el-option v-for="(item, index) in list"
               :key="index"
               :value="item.id"
               :label="item.title" />
  </el-select> -->

  <el-select v-model="value"
             placeholder="Select"
             v-bind="props"
             @change="onChange">
    <el-option-group v-for="(item,index) in list"
                     :key="index"
                     :label="item.label">
      <el-option v-for="(children,kindex) in item.children"
                 :key="kindex"
                 :label="children.label"
                 :value="children.id">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script lang="ts">
import { forEach } from "lodash";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "goods_group",

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

		function filterDeptToTree(depts: any[], parentDept: { id: any } | null) {
			const res: { label: any }[] = [];
			depts.forEach((dept) => {
				let node: any;
				if (!parentDept && !dept.parentId) {
					// 根菜单
					const childNode = filterDeptToTree(depts, dept);
					node = { label: dept.title };
					node.children = childNode;
				} else if (parentDept && parentDept.id === dept.parentId) {
					const childNode = filterDeptToTree(depts, dept);
					node = { label: dept.title };
					node.children = childNode;
				}
				if (node) {
					node.id = dept.id;
					res.push(node);
				}
			});
			return res;
		}

		onMounted(async () => {
			let data = await service.mall.goodsCategory.list();
			console.log(filterDeptToTree(data, null));
			list.value = filterDeptToTree(data, null);
			console.log(list.value);

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
