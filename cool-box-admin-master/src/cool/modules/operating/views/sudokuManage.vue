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
      <!-- <cl-search-key /> -->
    </el-row>

    <el-row>
      <!-- 数据表格 -->
      <cl-table :ref="setRefs('table')"
                v-bind="table">
        <template #column-icon="{ scope }">
          <el-image style="width: 60px; height: 60px"
                    :src="scope.row.icon"
                    :preview-src-list="[scope.row.icon]"
                    class="bg-img">
            <template #placeholder
                      v-if="scope.row.icon === null"
                      class="">
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
            <template #error>
              <div class="image-slot">
                暂无图标
              </div>
            </template>
          </el-image>
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
					label: "标题",
					prop: "title",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入标题"
						}
					},
					rules: {
						required: true,
						message: "请输入标题"
					}
				},
				{
					label: "上传图片",
					prop: "icon",
					component: {
						name: "cl-upload",
						props: {
							placeholder: "请上传图标"
						}
					},
					rules: {
						required: true,
						message: "请上传图标"
					}
				},
				{
					label: "链接地址",
					prop: "url",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入链接地址"
						}
					}
				},
				{
					label: "排序",
					prop: "sort",
					value: 0,
					component: {
						name: "el-input-number",
						props: {
							min: 0,
							max: 10000
						}
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			props: {
				"default-sort": {
					prop: "sort",
					order: "sort"
				}
			},
			columns: [
				{
					type: "selection",
					width: 60
				},
				{
					label: "标题",
					prop: "title"
				},
				{
					label: "图标",
					prop: "icon"
				},

				{
					label: "链接地址",
					prop: "url"
				},
				{
					label: "排序",
					prop: "sort"
				},
				{
					label: "创建时间",
					prop: "createTime",
					sortable: "true"
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
			ctx.service(service.operating.sudokuManage).done();
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
