<template>
	<template-page :param="params" v-on:handleSize="handleSizeChange" v-on:handleCurrent="handleCurrentChange">
		<div class='buttonRegion' slot="buttonRegion">
			<div class="search">
				<el-date-picker v-model="params.search.data_list" type="daterange" format="yyyy 年 MM 月 dd 日 HH	时  mm 分 ss 秒" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
				<el-input v-model="params.search.shopName" placeholder="请输入零售户名称"></el-input>
				<el-button type="primary" @click.native="loadMessage">搜索</el-button>
				<el-button @click.native="reset">重置</el-button>
			</div>
		</div>
		<div slot="pageRegion">
			<el-table :data="params.infor" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
				<el-table-column prop="shopName" label="零售户" width="180">
				</el-table-column>
				<el-table-column prop="checkOutTime" label="结账时间">
				</el-table-column>
				<el-table-column prop="infor.billCode" label="订单号">
				</el-table-column>
				<el-table-column prop="infor.checkOutShopUserName" label="收银员">
				</el-table-column>
				<el-table-column prop="infor.quantity" label="销售数量">
				</el-table-column>
				<el-table-column prop="infor.receivables" label="销售金额">
				</el-table-column>
				<el-table-column prop="infor.paymentModule" label="收款方式">
					<template slot-scope="scope">
						{{scope.row.paymentModule | commonRet(params.dataForm.paymentModule)}}
					</template>
				</el-table-column>
				<el-table-column prop="infor.state" label="状态">
					<template slot-scope="scope">
						{{scope.row.state | commonRet(params.dataForm.state)}}
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--弹窗-->
		<div class="pageDialog" slot="pageDialog">
			
		</div>
	</template-page>
</template>

<script>
	import templatePage from '../template/templatePage'
	import http from '@/utils/http.js'
import common from '@/utils/common.js'
import URL from '@/utils/url.js'
import validation from '@/utils/validation.js'
	export default {
		data() {
			return {

				params: {
					infor: [],
					//分页组建
					pagination: {
						currentPage: 1,
						pageNum: '1',
						pageSize: '10',
						total: 1,
						hasPage: true
					},
					dataForm: {
						state: {
							'0':'待接单',
							'1':'申请取消中',
							'2':'配送中',
							'3':'待提货',
							'4':'已取消',
							'5':'未付款'
						},
						paymentModule: {
							'1': '线 下',
							'2': '银行卡',
							'3': '微信',
							'4': '支付宝'
						}
					},
					search: {
						channelId: "",
						createTime: "",
						shopName:"",
						data_list: [],
						billCode: "",
					}

				}
			}
		},
		components: {
			templatePage,
		},
		methods: {
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex <= 1) {
					if(rowIndex % 2 === 0) {
						return {
							rowspan: 2,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			},
			handleSizeChange(index) {
				let _self = this;
				_self.params.pagination.pageSize = index;
				_self.loadMessage();

			},
			handleCurrentChange(index) {
				let _self = this;
				_self.params.pagination.pageNum = index;
				_self.loadMessage();
			},
			loadMessage() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.PAY_BILLS_DETAIL_LIST;
				let data = {
					id: 0,
					channelId: search.channelId,
					checkOutTimeStart: search.data_list[0],
					checkOutTimeEnd: search.data_list[1],
					billCode: search.billCode,
					shopName:search.shopName,
					pageNum: pagination.pageNum,
					pageSize: pagination.pageSize
				}
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					_self.params.pagination.total = validation.total(res);
					let result = JSON.parse(JSON.stringify(res.body.data));
					let datas = []
					for(let key of result) {
						for(let i = 0; i < 2; i++) {
							if(i == 0) {
								key.infor = key.nonSmokeSaleDailyGoodsStatisticeResult;
								datas.push(JSON.parse(JSON.stringify(key)));
							} else {
								key.infor = key.smokeSaleDailyGoodsStatisticeResult;
								datas.push(JSON.parse(JSON.stringify(key)));
							}
						}
					}
					_self.params.infor = datas;
				}, function(res) {})
			},
		},
		created() {
			this.loadMessage();
		}
	}
</script>

<style lang="less" scoped>
	.search {
		margin-top: 10px;
		display: flex;
		.el-date-editor {
			margin: 0 5px;
		}
		.el-input {
			margin: 0 5px;
			width: 120px;
		}
	}
</style>