<template>
	<template-page :param="params" v-on:handleSize="handleSizeChange" v-on:handleCurrent="handleCurrentChange">
		<div class='buttonRegion' slot="buttonRegion">
			<div class="back">
				<el-button  @click="prev">返回</el-button>
			</div>
			<div class="search">
				
				<citychoose :parama="params" v-on:cityChange="handleChangeCity" v-on:areaChange="handleChangeArea" v-on:gridChange="handleChangeGrid" ></citychoose>
				<div class="secondline">
				<span class="demonstration">类型：</span>
					<el-select v-model="params.province" placeholder="请选择">
						<el-option v-for="item in params.isProvincelist" :key="item.id" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<span class="demonstration">时间段：</span>
					<el-date-picker v-model="params.search.data_list" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					<el-button type="success" @click.native="loadTotalFirst">搜索</el-button>
					<el-button plain @click.native="reset">重置</el-button>
					<el-button type="success" @click.native="loadExcel">导出报表</el-button>
				</div>
			</div>
		</div>
		<div slot="pageTitle" class='pageTitle'>
			<p><span>{{this.$route.query.tobaccoBrand}}</span> 销售总计<span>{{params.sumInfor.tobaccoSaleTotal}}</span>元 &nbsp;&nbsp;&nbsp; 销量总计<span>{{params.sumInfor.amountTotal}}</span>条 &nbsp;&nbsp;&nbsp; 毛利总计<span>{{params.sumInfor.profitTotal}}</span>元</p>
		</div>
		<div slot="pageRegion">
			<el-table :data="params.infor" border style="width: 100%; margin-top: 20px" @sort-change='sortChange'>
				<el-table-column prop="number" label="序号" width="180">
					<template slot-scope="scope">
						<span>{{(params.pagination.currentPage - 1)*Number(params.pagination.pageSize) + scope.$index+1}} </span>
					</template>
				</el-table-column>
				<el-table-column prop="tobaccoName" label="商品名称">
				</el-table-column>
				<el-table-column prop="amountTotal" label="销量(条)" sortable='custom'>
				</el-table-column>
				<el-table-column prop="priceTotal" label="销售总计（元）" sortable='custom'>
				</el-table-column>
				<el-table-column prop="profitTotal" label="毛利总计（元）" sortable='custom'>
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
					cityCode: [this.$route.query.cityCode],
				    areaCode: [this.$route.query.areaCode],
					gridCode:[this.$route.query.gridCode],
					infor: [{}],
					sumInfor: {},
					areacode: this.$store.state.user.userInfor.code,
					tobaccoBrandId: this.$route.query.tobaccoBrandId,
					province: this.$route.query.province,
					//分页组建
                      sortType: "DESC",
						sortColumn: "amountTotal",
					pagination: {
						currentPage: 1,
						pageNum: 1,
						pageSize: 10,
						total: 1,
						hasPage: true
					},
					dataForm: {
						channelList: [],

					},
					search: {
						data_list: [this.$route.query.startTime,this.$route.query.endTime],
					    sortType: "DESC",
						sortColumn: "amountTotal",
					},
					isProvincelist: [{
						value: '',
						label: '全部'
					}, {
						value: '0',
						label: '本省烟'
					}, {
						value: '1',
						label: '外省烟'
					}, ]
				}
			}
		},
		components: {
			templatePage,
			citychoose
		},
		methods: {

		reset: function() {
				let _self = this;
				 window.location.reload();
				
			},
			prev() {
				this.$router.push(
					 '/rankingSales',
					
				)
			},
             handleChangeCity(value) {
				let _self = this;
				_self.params.cityCode=value
			},
			handleChangeArea(value) {
				let _self = this;
				_self.params.areaCode=value
			},
			handleChangeGrid(value) {
				let _self = this;
				_self.params.gridCode=value
			},
			sortChange: function(column, prop, order) {
				let _self = this;
				if(column.order == "descending") {
					column.order = "DESC"
					_self.params.search.sortType = column.order

				} else {
					column.order = "ASC"
					_self.params.search.sortType = column.order
				}
				console.log(column + '-' + column.prop + '-' + column.order)
				if(column.prop == null) {} else {
					_self.params.search.sortColumn = column.prop
					_self.loadMessage()
				}
			},

			handleSizeChange(index) {
				let _self = this;
				_self.params.pagination.pageSize = index;
				_self.loadMessage();

			},
			handleCurrentChange(index) {
				let _self = this;
				_self.params.pagination.currentPage = index;
				_self.loadMessage();
			},
			loadTotalFirst(){
				let _self = this;
				_self.params.pagination.currentPage = 1;
				_self.loadTotal()
			},
			loadExcel(){
				let _self = this;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.SMOKERANKINGBRAND_EXPORT;
				let data = {
					id: 0,
					tobaccobrandId: _self.params.tobaccoBrandId,
					areacode: _self.params.areacode,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					isProvince: _self.params.province,
					gridCode: _self.params.gridCode[0],
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
					sortColumn: _self.params.search.sortColumn,
					sortType: _self.params.search.sortType,
					pageNum: pagination.currentPage,
					pageSize: pagination.pageSize
				}
				url = http.filterUrl(data, url);
				url =  window.location.origin + url;
				window.open(url)
				console.log(url)
			},
			loadTotal: function() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.SMOKE_BRAND;
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					isProvince: _self.params.province,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
					tobaccoBrandId: _self.params.tobaccoBrandId,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : ""
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.sumInfor = result
				}, function(res) {})
				_self.loadMessage()
			},
			loadMessage() {
				let _self = this;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.SMOKE_RANKINGBRAND;
				let data = {
					id: 0,
					tobaccobrandId: _self.params.tobaccoBrandId,
					isProvince: _self.params.province,
					areacode: _self.params.areacode,
					isProvince: _self.params.province,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
					sortColumn: _self.params.search.sortColumn,
					sortType: _self.params.search.sortType,
					pageNum: pagination.currentPage,
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
			let _self = this;
			
			// if(_self.$store.state.user.userInfor.datatype != '360000') {
			// 	for(let key of _self.params.areacodeList) {
			// 		if(key.value != _self.$store.state.user.userInfor.datatype) {
			// 			key.disabled = true;
			// 		}
			// 	}
			// }
			_self.loadTotal()
			_self.loadMessage();

		}
	}
</script>

<style lang="less" scoped>
	.back {
		margin-bottom: 15px;
		text-align: right;
	}
	
	.pageTitle {
		padding: 10px;
		display: flex;
		p>span:first-child {
			color: blue;
		}
		P>span:not(:first-child) {
			color: red;
		}
	}
	
	.search {
		background-color: #FFFFFF;
		margin-bottom: 15px;
		padding: 10px;
		
		.citychoose{
			display: flex;
		}
		.secondline{
			display: flex;
			margin-top: 10px;
		.demonstration{
			font-size: 14px;
			margin-left: 5px;
			margin-top: 5px;
		}
		
		.el-input {
			margin: 0 5px;
			width: 150px;
		}
		.el-select {
			width: 150px;
		}
		.el-button{
			margin-left: 30px;
		}
		}
	}
</style>