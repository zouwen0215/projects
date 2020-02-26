<template>
	<template-page :param="params" v-on:handleSize="handleSizeChange" v-on:handleCurrent="handleCurrentChange">
		<div class='buttonRegion' slot="buttonRegion">
			<div   class="button">
				<el-button  type="success" @click="prev">返回</el-button>
			</div>
			
			<div class="search">
				<div>
					<span class="demonstration">类型：</span>
					<el-select v-model="params.search.province" placeholder="请选择">
						<el-option v-for="item in params.isProvince" :key="item.id" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-date-picker v-model="params.search.data_list" type="daterange" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>

					<el-button type="success" @click.native="loadTotal">搜索</el-button>
					<el-button  @click.native="reset">重置</el-button>
				</div>
				<div>
					<!--<el-button type="success" @click.native="loadMessage">导出EXCEL</el-button>-->
				</div>
			</div>
		</div>
		<div slot="pageTitle" class='pageTitle'>
			<p>卷烟销售总计<span>{{params.sumInfor.tobaccoSaleTotal}}</span>元 销量总计<span>{{params.sumInfor.amountTotal}}</span>条 毛利总计<span>{{params.sumInfor.profitTotal}}</span>元</p>
		</div>
		<div slot="pageRegion">
			<el-table :data="params.infor" border style="width: 100%; margin-top: 20px" @sort-change='sortChange'>
				<el-table-column prop="number" label="排名" width="180">
				</el-table-column>
				<el-table-column prop="name" label="区域">
					
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
	export default {
		data() {
			return {

				params: {
					areaCode:this.$store.state.user.userInfor.datatype,
					sumInfor:{},
					row: '',
					infor: [{}],
					choosecity:this.$route.query.code,
					
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
						province:this.$route.query.isProvince,
						data_list: [this.$route.query.startTime,this.$route.query.endTime],
						sortType: "DESC",
					sortColumn: "amountTotal",
					},
					isProvince: [{
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
		},
		methods: {
			reset: function() {
				let _self = this;
				_self.params.search = validation.reset(_self.params.search);
				_self.loadTotal();
			},
			prev() {
				let _self = this;
				let url = '/rankingAreas'
			    _self.$router.push(url)
			},
		
			sortChange: function(column, prop, order) {
				let _self = this;
				if(column.order=="descending")
				{
					column.order="DESC"
					_self.params.search.sortType = column.order
				}
				else{
					column.order="ASC"
					_self.params.search.sortType = column.order
				}
				console.log(column + '-' + column.prop + '-' + column.order)
				if( column.prop==null){	
				}else{
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
				_self.params.pagination.pageNum = index;
				_self.loadMessage();
			},
			loadTotal: function() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.AREA_RANGINGTOTAL;
				let data = {
					id: 0,
					areacode: _self.params.areaCode,
					cityCode:_self.params.choosecity,
					isProvince: _self.params.search.province,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
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
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.AREA_RANGING;
				let data = {
					id:0,
					areacode: _self.params.areaCode,
					cityCode:_self.params.choosecity,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
					sortColumn: _self.params.search.sortColumn,
					sortType: _self.params.search.sortType,
					isProvince: _self.params.search.province,
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
			console.log(this.$route.query.name)
			this.loadMessage();
			this.loadTotal();
		}
	}
</script>

<style lang="less" scoped>

     .button {
		display: flex;
	
	}
	.back {
		display: flex;
		margin-bottom: 15px;
	}
	.pageTitle {
		padding: 10px;
		display: flex;
		p>span {
			color: red;
		}
	}
	
	.search {
		background-color: #FFFFFF;
		padding: 10px;
		display: flex;
		margin-bottom: 15px;
		justify-content: space-between;
		.el-date-editor {
			margin: 0 5px;
			width: 400px;
		}
		.el-input {
			margin: 0 5px;
			width: 180px;
		}
	}
</style>