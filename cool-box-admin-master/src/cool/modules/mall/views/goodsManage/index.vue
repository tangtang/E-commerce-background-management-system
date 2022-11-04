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
                v-bind="table">
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

        <template #column-state="{ scope }">
          <el-switch v-model="scope.row.state"
                     class="ml-2"
                     active-value="0"
                     inactive-value="1"
                     @change="beforeChange(scope.row)" />
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
               v-bind="upsert">

    </cl-upsert>
  </cl-crud>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { CrudLoad, Upsert, Table } from "@cool-vue/crud/types";
import { useCool } from "/@/cool";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "/@/router";

export default defineComponent({
	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			dialog: {
				props: {
					fullscreen: true
				}
			},
			items: [
				{
					type: "tabs",
					props: {
						labels: [
							{
								label: "基础信息",
								value: "base"
							},
							{
								label: "商品信息",
								value: "detail"
							},
							{
								label: "商品详情",
								value: "desc"
							}
						]
					}
				},
				{
					label: "商品标题",
					prop: "title",
					group: "base",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入商品标题"
						}
					},
					rules: {
						required: true,
						message: "请输入商品标题"
					}
				},
				{
					label: "会场品牌",
					prop: "brandId",
					group: "base",
					component: {
						name: "brand_seletc",
						props: {
							placeholder: "请选择会场品牌"
						}
					},
					rules: {
						required: true,
						message: "请选择会场品牌"
					}
				},
				{
					label: "商品排序",
					prop: "sort",
					group: "base",
					value: 0,
					component: {
						name: "el-input-number",
						props: {
							min: 0,
							max: 10000
						}
					}
				},
				{
					label: "上传封面图",
					prop: "cover",
					group: "base",
					component: {
						name: "cl-upload",
						props: {
							placeholder: "请上传商品的封面图"
						}
					},
					rules: {
						required: true,
						message: "请输入商品的封面图"
					}
				},
				{
					label: "上传轮播图",
					prop: "imgData",
					group: "base",
					component: {
						name: "cl-upload",
						multiple: true,
						props: {
							listType: "picture-card",
							placeholder: "请上传商品的封面图",
							limit: 3,
							multiple: true
						}
					},
					rules: {
						required: true,
						message: "请输入商品的封面图"
					}
				},
				{
					label: "商品原价",
					prop: "row_price",
					group: "detail",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入商品原价"
						}
					},
					rules: {
						required: true,
						message: "请输入商品原价"
					}
				},
				{
					label: "商品价格",
					prop: "price",
					group: "detail",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入商品价格"
						}
					},
					rules: {
						required: true,
						message: "请输入商品价格"
					}
				},
				{
					label: "商品分类",
					prop: "category_id",
					group: "detail",
					component: {
						name: "goods_group",
						props: {
							placeholder: "请选择商品分类"
						}
					},
					rules: {
						required: true,
						message: "请选择商品的分类"
					}
				},
				{
					label: "商品库存",
					prop: "inventory",
					group: "detail",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入商品库存"
						}
					},
					rules: {
						required: true,
						message: "请输入商品库存"
					}
				},
				{
					label: "运费类型",
					prop: "freight_type",
					group: "detail",
					value: 0,
					component: {
						name: "el-radio-group",
						options: [
							{
								label: "包邮",
								value: 0
							},
							{
								label: "到付",
								value: 1
							}
						]
					}
				},
				{
					label: "到付价格",
					prop: "freight_price",
					group: "detail",
					hidden: ({ scope }: any) => {
						return scope.freight_type == 0;
					},
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入价格"
						}
					}
				},

				{
					label: "商品备注",
					prop: "remark",
					group: "detail",
					component: {
						name: "el-input",
						type: "textarea",
						props: {
							placeholder: "请输入商品备注"
						}
					}
				},
				{
					prop: "goods_desc",
					label: "商品详情",
					span: 24,
					group: "desc",
					component: {
						name: "cl-editor-quill",
						props: {
							height: "400"
						}
					},
					rules: {
						required: true,
						message: "详情不能为空"
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
					label: "商品ID",
					prop: "id",
					width: 100,
					sortable: "true"
				},
				{
					label: "商品标题",
					prop: "title",
					width: 300,
					sortable: "true"
				},
				{
					label: "所属会场",
					prop: "brand_Name",
					width: 150
				},
				{
					label: "商品封面图",
					prop: "cover",
					width: 150
				},
				{
					label: "商品原价(元)",
					prop: "row_price",
					width: 150,
					sortable: "true"
				},
				{
					label: "商品价格(元)",
					prop: "price",
					width: 150,
					sortable: "true"
				},
				{
					label: "商品库存",
					prop: "inventory",
					sortable: "true",
					width: 150
				},
				{
					label: "排序",
					prop: "sort",
					sortable: "true"
				},

				{
					label: "上架状态",
					prop: "state",
					sortable: "true",
					width: 150,
					dict: [
						{
							label: "上架",
							value: 1,
							type: "success"
						},
						{
							label: "下架",
							value: 0,
							type: "danger"
						}
					]
				},
				{
					label: "操作",
					type: "op",
					fixed: "right",
					width: 120
				}
			]
		});

		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.mall.goods).done();
			app.refresh();
		}
		//上架下架
		async function beforeChange(row: any) {
			let params = {
				id: row.id,
				state: row.state
			};
			await service.mall.goods.goods_state(params).then(async (res: any) => {
				if (res.code === 0) {
					ElMessage({
						showClose: true,
						message: "关闭成功",
						type: "success"
					});
				} else {
					ElMessage({
						showClose: true,
						message: "开启成功",
						type: "success"
					});
				}
			});
		}

		return {
			open,
			refs,
			setRefs,
			upsert,
			table,
			onLoad,
			beforeChange
		};
	}
});
</script>