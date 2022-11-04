<template>
  <cl-crud :ref="setRefs('crud')"
           :on-refresh="onRefresh"
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
                v-bind="table"
                @row-click="onRowClick">

        <template #column-cover="{ scope }">
          <el-image style="width: 60px; height: 60px"
                    :src="scope.row.cover"
                    :preview-src-list="[scope.row.cover]"
                    class="bg-img">
            <template #placeholder
                      v-if="scope.row.cover === null"
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
        <template #column-status="{ scope }">
          <el-switch v-model="scope.row.status"
                     inline-prompt
                     disabled
                     :active-value="1"
                     :inactive-value="0">
          </el-switch>
        </template>
      </cl-table>
    </el-row>

    <el-row type="
                    flex">
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
import { CrudLoad, Upsert, Table, RefreshOp } from "@cool-vue/crud/types";
import { useCool } from "/@/cool";
import { deepTree } from "/@/cool/utils";

export default defineComponent({
	setup() {
		const { refs, setRefs, service } = useCool();

		const data = reactive({
			aa: 1
		});

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "分类标题",
					prop: "title",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入分类标题"
						}
					},
					rules: {
						required: true,
						message: "请输入分类标题"
					}
				},
				{
					label: "选择分类",
					prop: "parentId",
					component: {
						name: "goods_category",
						props: {
							placeholder: "请选择父级分类"
						}
					}
				},
				{
					label: "上传图标",
					prop: "cover",
					component: {
						name: "cl-upload",
						props: {
							placeholder: "请上传图标"
						}
					}
				},
				{
					label: "是否开启",
					prop: "status",
					component: {
						name: "el-switch"
					},
					value: true
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
				"row-key": "id",
				"default-sort": {
					prop: "sort",
					order: "sort"
				}
			},
			columns: [
				{
					label: "分类标题",
					prop: "title"
				},
				{
					label: "分类图标",
					prop: "cover"
				},
				{
					label: "是否启用",
					prop: "status"
				},
				{
					label: "排序",
					prop: "sort"
				},
				{
					prop: "updateTime",
					label: "更新时间",
					sortable: "custom",
					width: 150
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
			ctx.service(service.mall.category).done();
			app.refresh();
		}

		// 刷新监听
		function onRefresh(_: any, { render }: RefreshOp) {
			service.mall.goodsCategory.list().then((list: any[]) => {
				list.map((e) => {
					e.permList = e.perms ? e.perms.split(",") : [];
				});

				render(deepTree(list), {
					total: list.length
				});
			});
		}

		function onRowClick(row: any, column: any) {
			if (column.property && row.children) {
				refs.value.table.toggleRowExpansion(row);
			}
		}

		return {
			refs,
			setRefs,
			upsert,
			table,
			onLoad,
			onRefresh,
			onRowClick
		};
	}
});
</script>

<style scoped>
.bg-img {
	border: 1px solid #e4e7ed;
	color: #909399;
	line-height: 60px;
}
</style>