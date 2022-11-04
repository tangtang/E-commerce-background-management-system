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

        <template #column-logo="{ scope }">
          <el-image style="width: 60px; height: 60px"
                    :src="scope.row.logo"
                    :preview-src-list="[scope.row.logo]">
          </el-image>
        </template>
        <template #column-banner="{ scope }">
          <el-image style="width: 60px; height: 60px"
                    :src="scope.row.banner"
                    :preview-src-list="[scope.row.banner]">
          </el-image>
        </template>
        <template #column-state="{ scope }">
          <el-switch v-model="scope.row.state"
                     class="ml-2"
                     active-value="0"
                     inactive-value="1"
                     @change="stateChange(scope.row)" />
        </template>

        <template #slot-btn="{ scope }">
          <el-button type="text"
                     size="mini"
                     @click="sel_goods(scope.row)">关联商品</el-button>
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

    <el-dialog v-model="dialogVisible"
               title="关联商品"
               width="60%"
               :before-close="handleClose">

      <el-table :data="tableData"
                @selection-change="handleSelectionChange"
                ref="multipleTableRef"
                style="width: 100%">
        <el-table-column type="selection"
                         width="55" />

        <el-table-column prop="title"
                         label="商品标题">
        </el-table-column>
        <el-table-column prop="brand_Name"
                         label="品牌名称">
        </el-table-column>
        <el-table-column label="封面图">
          <template #default="scope">
            <el-image style="width: 60px; height: 60px"
                      :src="scope.row.cover"
                      :preview-src-list="[scope.row.cover]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="price"
                         label="价格">
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-button type="text"
                       @click="beforeChange(scope.row)"
                       v-if="scope.row.state == 0">上架</el-button>
            <el-button type="text"
                       @click="beforeChange(scope.row)"
                       v-if="scope.row.state == 1">下架
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary"
                     @click="dialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </cl-crud>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { CrudLoad, Upsert, Table } from "@cool-vue/crud/types";
import { useCool } from "/@/cool";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";

export default defineComponent({
	setup() {
		const { refs, setRefs, service } = useCool();
		let dialogVisible = ref(false);
		let loading = ref(false);

		const switchModel = ref(0);
		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "品牌方名称",
					prop: "name",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入品牌方名称"
						}
					},
					rules: {
						required: true,
						message: "请输入品牌方名称"
					}
				},
				{
					label: "logo",
					prop: "logo",
					component: {
						name: "cl-upload",
						props: {
							placeholder: "请上传品牌方logo"
						}
					},
					rules: {
						required: true,
						message: "请上传logo"
					}
				},
				{
					label: "横向logo",
					prop: "banner",
					component: {
						name: "cl-upload",
						props: {
							placeholder: "请上传logo"
						}
					},
					rules: {
						required: true,
						message: "请上传logo"
					}
				},
				{
					label: "品牌方简介",
					prop: "desc",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入品牌方简介"
						},
						type: "textarea"
					},
					rules: {
						required: true,
						message: "请输入品牌方简介"
					}
				},
				{
					label: "发货备注",
					prop: "note",
					component: {
						name: "el-input",
						props: {
							placeholder:
								"示例：预计2月22号在广州发货，如遇政策和交通问题，部分订单可能会有延迟，敬请谅解"
						},
						type: "textarea"
					},
					rules: {
						required: true,
						message: "请输入发货备注"
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
					label: "品牌方名称",
					prop: "name"
				},
				{
					label: "logo",
					prop: "logo"
				},
				{
					label: "横向logo",
					prop: "banner"
				},

				{
					label: "商品数量",
					prop: "goodsCount"
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
					label: "状态",
					prop: "state",
					minWidth: 120,
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
					buttons: ["slot-btn", "edit", "delete"]
				}
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.brandManage.brand).done();

			app.refresh();
		}
		interface goods {
			id: number;
		}
		const tableData = ref<goods[]>([]);
		const multipleSelection = ref<goods[]>([]);
		const multipleTableRef = ref<InstanceType<typeof ElTable>>();

		let handleSelectionChange = (val: []) => {
			multipleSelection.value = val;
			console.log(val);
		};
		async function getGoods() {
			let params = {
				page: 1,
				size: 10
			};
			await service.mall.goodManage.page(params).then((res: any) => {
				tableData.value = res.list;
			});
		}
		async function sel_goods(row: { id: number }) {
			getGoods();
			dialogVisible.value = true;

			let params = {
				brandId: row.id
			};
			await service.mall.goods.goods_sel(params).then((res: []) => {
				// multipleSelection.value = res;
				console.log(res);

				multipleTableRef.value!.toggleRowSelection(res, true);
				console.log(multipleTableRef.value);
			});
		}

		//上架下架
		async function stateChange(row: any) {
			let params = {
				id: row.id,
				state: row.state
			};
			await service.brand.brandManage.b_state(params).then((res: any) => {
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

		async function beforeChange(row: any) {
			let state: number;
			if (row.state == 0) {
				state = 1;
			} else if (row.state == 1) {
				state = 0;
			}

			loading.value = true;
			ElMessageBox.confirm("是否对商品进行上架下架操作?", "温馨提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(async () => {
					loading.value = false;
					let params = {
						id: row.id,
						state: state
					};
					await service.mall.goods.goods_state(params).then((res: any) => {
						getGoods();
					});
				})
				.catch(() => {
					loading.value = false;
				});
		}
		const handleClose = (done: () => void) => {
			ElMessageBox.confirm("Are you sure to close this dialog?")
				.then(() => {
					done();
				})
				.catch(() => {
					// catch error
				});
		};

		return {
			refs,
			switchModel,
			dialogVisible,
			loading,
			setRefs,
			upsert,
			table,
			onLoad,
			sel_goods,
			getGoods,
			tableData,
			beforeChange,
			handleClose,
			handleSelectionChange,
			multipleTableRef,
			stateChange
		};
	}
});
</script>
