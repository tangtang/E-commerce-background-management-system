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
        <template #column-goods_cover="{ scope }">
          <el-image style="width: 60px; height: 60px"
                    :src="scope.row.goods_cover"
                    :preview-src-list="[scope.row.goods_cover]"
                    class="bg-img">
          </el-image>
        </template>
        <template #column-userImg="{ scope }">
          <el-image style="width: 60px; height: 60px"
                    :src="scope.row.userImg"
                    :preview-src-list="[scope.row.userImg]"
                    class="bg-img">
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
					label: "选择商品",
					prop: "goods_id",
					component: {
						name: "goods_list",
						placeholder: "请选择商品"
					},
					rules: {
						required: true,
						message: "请选择商品"
					}
				},
				{
					label: "用户名称",
					prop: "userName",
					component: {
						name: "el-input",
						placeholder: "请输入用户名称"
					},
					rules: {
						required: true,
						message: "请输入用户名称"
					}
				},
				{
					label: "用户头像",
					prop: "userImg",
					component: {
						name: "cl-upload",
						placeholder: "请上传用户头像"
					},
					rules: {
						required: true,
						message: "请上传用户头像"
					}
				},
				{
					label: "商品分数",
					prop: "goods_score",
					component: {
						name: "el-rate",
						colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
					},
					rules: {
						required: true,
						message: "请选择商品分数"
					}
				},
				{
					label: "服务分数",
					prop: "service_score",
					component: {
						name: "el-rate",
						colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
					},
					rules: {
						required: true,
						message: "请选择服务分数"
					}
				},
				{
					label: "评价图片",
					prop: "comm_img",
					component: {
						name: "cl-upload",
						props: {
							placeholder: "请上传图片"
						}
					}
				},
				{
					label: "评价内容",
					prop: "comm_Content",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入评价内容"
						}
					},
					rules: {
						required: true,
						message: "请输入评价内容"
					}
				},
				{
					label: "评论时间",
					prop: "comm_date",
					component: {
						name: "el-date-picker",
						placeholder: "请选择评论时间"
					},
					rules: {
						required: true,
						message: "请选择评论时间"
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{
					label: "商品封面图",
					prop: "goods_cover",
					width: 100
				},
				{
					label: "商品标题",
					prop: "goods_title",
					width: 300
				},
				{
					label: "用户名称",
					prop: "userName"
				},
				{
					label: "用户头像",
					prop: "userImg",
					width: 100
				},
				{
					label: "评论内容",
					prop: "comm_Content",
					width: 200
				},
				{
					label: "回复内容",
					prop: "reply_Content",
					width: 200
				},
				{
					label: "评论时间",
					prop: "comm_date",
					width: 200
				},
				{
					label: "操作",
					type: "op",
					fixed: "right",
					width: 120
				}
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.userBase.comments).done();
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
