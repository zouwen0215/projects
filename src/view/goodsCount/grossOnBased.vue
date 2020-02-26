<template>
	<template-page :param="params" v-on:handleSize="handleSizeChange" v-on:handleCurrent="handleCurrentChange">
		<div class='buttonRegion' slot="buttonRegion">
			<div class="search">
				<div class="areaTime">
					<span class="demonstration">地区：</span>
					<citychoose :param="params" v-on:cityChange="handleChange"></citychoose>
					<span class="demonstration">时间段：</span>
					<el-date-picker v-model="params.month" type="month" placeholder="选择时间"></el-date-picker>
				</div>
				<div>
					<el-button type="primary" @click.native="loadMessage">搜索</el-button>
					<el-button type="primary" @click.native="loadMessage">导出EXCEL</el-button>
				</div>
			</div>
		</div>
		<div slot="pageRegion">
			<el-table :data="params.infor" border style="width: 100%; margin-top: 20px">
				<el-table-column prop="shopName" width="280">
				</el-table-column>
				<el-table-column prop="checkOutTime" label="单包毛利率">
				</el-table-column>
				<el-table-column prop="checkOutShopUserName" label="单包毛利率环比">
				</el-table-column>
				<el-table-column prop="quantity" label="整包毛利率">
				</el-table-column>
				<el-table-column prop="receivables" label="整包毛利率环比">
				</el-table-column>
				<el-table-column prop="receivables" label="综合毛利率">
				</el-table-column>
				<el-table-column prop="receivables" label="综合毛利率环比">
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
	import citychoose from "../../components/tools/citychoose"
	export default {
		data() {
			return {

				params: {
					selectedOptions: [],
					infor: [{}],
					//分页组建
					pagination: {
						currentPage: 1,
						pageNum: '1',
						pageSize: '10',
						total: 1,
						hasPage: true
					},
					dataForm: {
						channelList: [],

					},
					search: {
						channelId: "",
						createTime: "",
						shopName: "",
						data_list: [],
						billCode: "",
					},

				}
			}
		},
		components: {
			templatePage,
			citychoose

		},
		methods: {
			handleChange(value) {
				console.log(value)
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
			loadChannel: function() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.CHANNEL_LIST;
				let data = {
					id: '0',
					pageNum: 1,
					pageSize: 1000
				}
				url = http.filterUrl(data, url);
				let params = http.data;
				http.publicRequest('GET', url, "", function(res) {
					let result = res.body.data;
					_self.params.dataForm.channelList = result;
					console.log(_self.params.dataForm.channelList)
				}, function(res) {

				})
			},
			loadMessage() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.PAY_BILLS_DETAIL_LIST;
				let data = {
					id: 0,
					channelId: search.channelId,
					checkOutTimeStart: search.data_list.length ? search.data_list[0] : "",
					checkOutTimeEnd: search.data_list.length ? search.data_list[1] : "",
					billCode: search.billCode,
					shopName: search.shopName,
					pageNum: pagination.pageNum,
					pageSize: pagination.pageSize
				}
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					_self.params.pagination.total = validation.total(res);
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.infor = result;
				}, function(res) {})
			},
		},
		created() {
			this.loadMessage();
			this.loadChannel();

		}
	}
</script>

<style lang="less" scoped>
	.back {
		display: flex;
	}
	
	.search {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		.areaTime {
			display: flex;
			.demonstration {
				margin-left: 20px;
			}
		}
	}
</style>