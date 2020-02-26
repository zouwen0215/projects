<template>
	<div class="contain">
		<div class='buttonRegion' >
			<div class="button">
				<router-link to="/rangePrice" tag="el-button" class="nav-link" size="medium">区间户均存销比</router-link>
				<router-link to="/salesRatio" tag="el-button" class="nav-link" size="medium">区间户均销量环比</router-link>
				<el-button type="success">卷烟市场情况</el-button>
			</div>
			<div class="search">
				
					
				<citychoose :parama="params" v-on:cityChange="handleChangeCity" v-on:areaChange="handleChangeArea" v-on:gridChange="handleChangeGrid" ></citychoose>
						<div class="daterangepicker">
					<span class="demonstration">时间段：</span>
					<el-date-picker v-model="params.month" type="month" value-format="yyyy-MM" placeholder="选择时间" :picker-options="params.pickerOptions"></el-date-picker>
					<el-button class="searchbutton" type="success" @click.native="loadMessage">搜索</el-button>
					<el-button @click.native="reset">重置</el-button>
				
							<el-button type="success" @click.native="loadExcel">导出报表</el-button>
					</div>
			
			
					
				
				
			</div>
		</div>
		
		<div class="pageRegion">
			<el-table :data="params.infor" border style="width: 100%; margin-top: 20px" >
				<el-table-column prop="priceRangeName"  label="价位区间" width="130">
				</el-table-column>
				<el-table-column label="户月均销量">
					<el-table-column prop="salesVolumeAve" label="销量">
					</el-table-column>
					<el-table-column prop="salesVolumeCR" label="环比">
					</el-table-column>
				</el-table-column>
				<el-table-column label="户均库存量">
					<el-table-column prop="inventoryAve" label="库存量">
					</el-table-column>
					<el-table-column prop="inventoryCR" label="环比">
					</el-table-column>
				</el-table-column>
				<el-table-column label="月均存销比">
					<el-table-column prop="inventoryRatioAve" label="存销比">
					</el-table-column>
					<el-table-column prop="inventoryRatioCR" label="环比">
					</el-table-column>
				</el-table-column>
				<el-table-column label="户月均零售额">
					<el-table-column prop="retailSalesAve" label="零售额">
					</el-table-column>
					<el-table-column prop="retailSalesCR" label="环比">
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>
		</div>
	</div>
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
					areacode: this.$store.state.user.userInfor.code,
					infor: [{}],
					cityCode:[""],
				    areaCode:[""],
				    gridCode:[""],
					month:'',
					pickerOptions:{
		           	  disabledDate(time) {
			          let curDate = (new Date()).getTime();
			          let strDate =(new Date()).getDate();
			          let curMonth=strDate*24*3600*1000;
			          let month=curDate-curMonth
                      return time.getTime() > month;
                 }
			},
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
//				_self.params.month=""
//				_self.params.cityCode[0]="";
//				_self.params.areaCode[0]="";
//				_self.params.gridCode[0]="";
//				_self.loadAll();
			},
            handleChange(value) {
			if(value.length==2){
               	value.push("")
               }
               console.log(value)

			},
			handleChangeCity(value) {
				let _self = this;
				_self.params.cityCode=value
				console.log(value)
			},
			handleChangeArea(value) {
				let _self = this;
				_self.params.areaCode=value
			},
			handleChangeGrid(value) {
				let _self = this;
				_self.params.gridCode=value
			},
			loadMessage() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.SMOKE_MARKET;
				let data = {
					id:0,
					areacode:_self.params.areacode,
					datatime:_self.params.month,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				}
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					//console.log(result)
					_self.params.infor = result;
				}, function(res) {})
			},
			loadExcel(){
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.SMOKEMARKET_EXCEL;
				let data = {
					id:0,
					areacode:_self.params.areacode,
					datatime:_self.params.month,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				}
				url = http.filterUrl(data, url);
				url =  window.location.origin + url;
			   //url =  "http://192.168.199.15:12040" + url;
				
				window.open(url)
			   console.log(url)
			}
			
	
		},
		created() {
			let _self = this;
			 _self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;
			for(let key in _self.params.infor){
				console.log(_self.params.infor[key].PriceRangeName)
			}
			_self.loadMessage();
			
		}
	}
</script>

<style lang="less" scoped>
.contain{
	.button {
		margin-top: 15px;
		display: flex;
		margin-left: 15px;
		
	}
	
	.back {
		display: flex;
	}
	
	.search {
		margin:0px 15px 0px 15px ;
		margin-top: 15px;
		background-color: #FFFFFF;
		padding: 10px;
	
		
		.citychoose{
			display: flex;
		}
		.daterangepicker{
			display: flex;
			margin-top: 10px;
			.el-date-editor {
			width: 200px;
		}
		.searchbutton{
			margin-left: 300px;
		}
		.demonstration {
			font-size: 14px;
			margin-top: 5px;
			}
			
		}
	}
	.pageTitle{
	margin:15px 15px 0px 15px ;
	   
	   background-color: #FFFFFF;
		width: 97%;
		height: 350px;
		padding-bottom: 20px;
	.pie{
		
		width: 100%;
		height: 300px;
		
	}
	.title{
			margin-bottom: 15px;
			font-size: 18px;
			font-weight: bold;
		
	}
	}
	.pageRegion{
		margin:0px 15px 0px 15px ;
		margin-top: -20px;
	}
	}
</style>