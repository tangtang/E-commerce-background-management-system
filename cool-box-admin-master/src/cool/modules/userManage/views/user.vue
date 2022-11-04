<template>
  <cl-crud :ref="setRefs('crud')"
           @load="onLoad">
    <el-row type="flex"
            align="middle">
      <!-- 刷新按钮 -->
      <cl-refresh-btn />
      <!-- 新增按钮 -->
      <cl-add-btn />
      <!-- 删除按钮 -->
      <cl-multi-delete-btn />
      <cl-flex1 />
      <!-- 关键字搜索 -->
      <cl-search-key />
    </el-row>

    <el-row>
      <!-- 数据表格 -->
      <cl-table :ref="setRefs('table')"
                v-bind="table">
        <template #column-headImg="{ scope }">
          <cl-avatar shape="square"
                     size="medium"
                     :src="scope.row.headImg"
                     :style="{ margin: 'auto' }" />
        </template>
      </cl-table>
    </el-row>

    <el-row type="flex">
      <cl-flex1 />
      <!-- 分页控件 -->
      <cl-pagination />
    </el-row>

    <!-- 新增、编辑 -->
    <cl-upsert :ref="setRefs('upsert')"
               v-bind="upsert" />
  </cl-crud>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { CrudLoad, Upsert, Table } from "@cool-vue/crud/types";
import { useCool } from "/@/cool";

export default defineComponent({
	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "手机号",
					prop: "phone",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入手机号"
						}
					},
					rules: {
						required: true,
						message: "请输入手机号"
					}
				},
				{
					label: "密码",
					prop: "password",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入密码",
							type: "password"
						}
					},
					rules: [
						{
							min: 6,
							max: 16,
							message: "密码长度在 6 到 16 个字符"
						}
					]
				},
				{
					label: "昵称",
					prop: "nickName",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入昵称"
						}
					},
					rules: {
						required: true,
						message: "请输入昵称"
					}
				},
				{
					label: "头像",
					prop: "headImg",
					component: {
						name: "cl-upload",
						props: {
							placeholder: "请上传头像"
						}
					}
				},
				{
					label: "邮箱",
					prop: "email",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入邮箱"
						}
					}
				},
				{
					label: "备注",
					prop: "remark",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入备注"
						}
					}
				},
				{
					prop: "status",
					label: "状态",
					value: 1,
					component: {
						name: "el-radio-group",
						options: [
							{
								label: "开启",
								value: 1
							},
							{
								label: "关闭",
								value: 0
							}
						]
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{
					label: "ID",
					prop: "id",
					sortable: "true"
				},
				{
					label: "用户昵称",
					prop: "nickName"
				},
				{
					label: "手机号",
					prop: "phone"
				},
				{
					label: "用户头像",
					prop: "headImg"
				},
				{
					label: "用户邮箱",
					prop: "email"
				},
				{
					prop: "status",
					label: "状态",
					minWidth: 120,
					dict: [
						{
							label: "启用",
							value: 1,
							type: "success"
						},
						{
							label: "禁用",
							value: 0,
							type: "danger"
						}
					]
				},
				{
					label: "操作",
					type: "op"
				}
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.userBase.user).done();
			app.refresh();
		}

		return {
			refs,
			setRefs,
			upsert,
			table,
			onLoad
		};
	}
});
</script>
