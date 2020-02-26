<template>
	<div class="">
		<div class='buttonRegion'>
			<!--<div class="button">-->
			<!--	<el-button type="success">总量分析</el-button>-->
			<!--<router-link to="/grossProfitAnalysis" tag="el-button" class="nav-link" size="medium">毛利分析</router-link>-->
			<!--</div>-->
			<div class="search">
				<citychoose :parama="params" v-on:cityChange="handleChangeCity" v-on:areaChange="handleChangeArea" v-on:gridChange="handleChangeGrid"></citychoose>
				<div class="daterangepicker">
					<span class="demonstration">时间段：</span>
					<el-date-picker v-model="params.month" type="month" value-format="yyyy-MM" placeholder="选择时间" :picker-options="params.pickerOptions"></el-date-picker>
					<el-button class="searchbutton" type="success" @click.native="loadMessage">搜索</el-button>
					<el-button @click.native="reset">重置</el-button>
					<el-button type="success" @click.native="loadExcel">导出报表</el-button>
				</div>

			</div>
		</div>
		<div class="chartTitle">
			<p>重点监测规格市场表现</p>
			<p>单位：条</p>
		</div>
		<div class="pageRegion">
			<el-table :data="params.infor" border style="width: 100%; margin-top: 20px" :span-method="cellMerge">>
				<el-table-column prop="smokeTypeName" width="90">
				</el-table-column>
				<el-table-column prop="smokeName" width="160">
				</el-table-column>
				<el-table-column label="户均销量">
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
				<el-table-column label="户均存销比">
					<el-table-column prop="inventoryRatioAve" label="存销比">
					</el-table-column>
					<el-table-column prop="inventoryRatioCR" label="环比">
					</el-table-column>
				</el-table-column>
				<el-table-column label="户均零售额">
					<el-table-column prop="retailSalesAve" label="零售额">
					</el-table-column>
					<el-table-column prop="retailSalesCR" label="环比">
					</el-table-column>
				</el-table-column>-->
			</el-table>
		</div>
		<!--弹窗-->
		<!--<div class="pageDialog" slot="pageDialog">-->

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
					spanArr: [],
					pos: 0,
					cityCode: [""],
					areaCode: [""],
					gridCode: [""],
					areacode: this.$store.state.user.userInfor.code,
					infor: [{}],
					pickerOptions: {
						disabledDate(time) {
							let curDate = (new Date()).getTime();
							let strDate = (new Date()).getDate();
							let curMonth = strDate * 24 * 3600 * 1000;
							let month = curDate - curMonth
							return time.getTime() > month;
						}
					},
					selectedOptions: ["", "", ""],
					month: '',
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
				if(value.length == 2) {
					value.push("")
				}
				console.log(value)
			},
			handleChangeCity(value) {
				let _self = this;
				_self.params.cityCode = value
				console.log(value)
			},
			handleChangeArea(value) {
				let _self = this;
				_self.params.areaCode = value
			},
			handleChangeGrid(value) {
				let _self = this;
				_self.params.gridCode = value
			},
			cellMerge({
				row,
				column,
				rowIndex,
				columnIndex
			}) {  
				if(columnIndex === 0) {        
					const _row = this.params.spanArr[rowIndex];        
					const _col = _row > 0 ? 1 : 0;        
					return {            
						rowspan: _row,
						colspan: _col        
					}    
				}
			},

			loadMessage() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.TOTAL_ANALYSIS;
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					datatime: _self.params.month,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],

				}
				url = http.filterUrl(data, url);
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.infor = result; 
					_self.params.spanArr = [];
					for(var i = 0; i < result.length; i++) {    
						if(i === 0) {       
							_self.params.spanArr.push(1);        
							_self.params.pos = 0    
						} else {  // 判断当前元素与上一个元素是否相同
							if(result[i].smokeTypeName === result[i - 1].smokeTypeName) {        
								_self.params.spanArr[_self.params.pos] += 1;        
								_self.params.spanArr.push(0);        
							} else {        
								_self.params.spanArr.push(1);        
								_self.params.pos = i;        
							}    
						} 
						//console.log(_self.params.spanArr)
					}
				}, function(res) {})
				//				let _self = this;
				//				let result = JSON.parse(JSON.stringify(_self.params.data));;
				//				console.log(result)

			},
			loadExcel() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.TOTALANALYSIS_EXCEL;
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					datatime: _self.params.month,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				}
				url = http.filterUrl(data, url);
				url =  window.location.origin + url;
				console.log(url)
				//url =  "http://192.168.199.15:12040" + url;
				window.open(url)

			}
		},
		created() {
			let _self = this;
			 _self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;
			this.loadMessage();

		}
	}
</script>

<style lang="less" scoped>
	.button {
		margin-top: 10px;
		margin-left: 10px;
		display: flex;
	}
	
	.back {
		display: flex;
	}
	
	.search {
		background-color: #FFFFFF;
		margin-top: 15px;
		margin-left: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
		.citychoose {
			margin-left: 15px;
			display: flex;
		}
		.daterangepicker {
			display: flex;
			margin-top: 10px;
			.el-date-editor {
				width: 200px;
			}
			.searchbutton {
				margin-left: 280px;
			}
			.demonstration {
				font-size: 14px;
				margin-top: 5px;
			}
		}
		&>div {
			display: flex;
			.demonstration {
				margin-left: 20px;
			}
			.el-button {
				margin-left: 10px;
			}
			.secondbutton {
				margin-right: 20px;
			}
		}
	}
	
	.pageRegion {
		margin-left: 10px;
		margin-bottom: 20px;
	}
	
	.chartTitle {
		margin-top: 20px;
		display: flex;
		margin-left: 360px;
		font-weight: bold;
		font-size: 16px;
		&>p:nth-child(2) {
			margin-left: 380px;
		}
	}
</style>