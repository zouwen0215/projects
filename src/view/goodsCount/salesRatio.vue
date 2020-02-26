<template>
	<div class="contain">
		<div class='buttonRegion' >
			<div class="button">
				<router-link to="/rangePrice" tag="el-button" class="nav-link" size="medium">区间户均存销比</router-link>
				<el-button type="success">区间户均销量环比</el-button>
				<router-link to="/smokeMarket" tag="el-button" class="nav-link" size="medium">卷烟市场情况</router-link>
			</div>
			<div class="search">
				<citychoose :parama="params" v-on:cityChange="handleChangeCity" v-on:areaChange="handleChangeArea" v-on:gridChange="handleChangeGrid" ></citychoose>
					
					<div class="daterangepicker">
					<span class="demonstration">时间段：</span>
					<el-date-picker v-model="params.month" type="month" value-format="yyyy-MM" placeholder="选择时间" :picker-options="params.pickerOptions"></el-date-picker>
					<el-button class="searchbutton" type="success" @click.native="loadAll">搜索</el-button>
					<el-button @click.native="reset">重置</el-button>
				</div>
			
		</div>
		<div class="pageTitle">
				<p class="title">按价位区间户均销量环比情况</p>
				<div id="piechart" class="pie"></div>
		</div>
		<div class="pageRegion">
			<el-table :data="params.infor" border style="width: 100%; margin-top: 20px" >
				<el-table-column prop="类别" width="80">
				</el-table-column>
				<el-table-column prop="23以下" label="[0,23元)">
				</el-table-column>
				<el-table-column prop="23-50" label="[23,50元)">
				</el-table-column>
               <el-table-column prop="50-70" label="[50,70元)">
               	
				</el-table-column>
				<el-table-column prop="70-90" label="[70,90元)">
				</el-table-column>
				<el-table-column prop="90-120" label="[90,120元)">
				</el-table-column>
				<el-table-column prop="120-160" label="[120,160元)">
				</el-table-column>
				<el-table-column prop="160-200" label="[160,200元)">
				</el-table-column>
				<el-table-column prop="200-250" label="[200,250元)">
				</el-table-column>
				<el-table-column prop="250-300" label="[250,300元)">
					
				</el-table-column>
				<el-table-column prop="300-400" label="[300,400元)">
				</el-table-column>
				<el-table-column prop="400-600" label="[400,600元)">

				</el-table-column>
				<el-table-column prop="600以上" label="600元以上">
				</el-table-column>

			</el-table>
		</div>
		</div>
</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
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
					month:'',
					row: '',
					infor: [{}],
					cityCode:[""],
				    areaCode:[""],
				    gridCode:[""],
					//分页组建
					pickerOptions:{
		           	  disabledDate(time) {
			          let curDate = (new Date()).getTime();
			          let strDate =(new Date()).getDate();
			          let curMonth=strDate*24*3600*1000;
			          let month=curDate-curMonth
                      return time.getTime() > month;
                 }
			},
					selectedOptions: ["", "", ""],
					search: {
						channelId: "",
						createTime: "",
						shopName: "",
						data_list: [],
						billCode: "",
					},
					optionpie: {
						title: {
							text: '',
							x: 'center',
							textStyle: {
								fontStyle: 'italic',
								fontWeight: 'bolder',
								fontFamily: 'sans-serif',
								fontSize: '40px'
							}
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								crossStyle: {
									color: '#999'
								}
							}
						},
						
						legend: {
							x: 'left',
							data: ['当月销量', '上月销量', '销量环比']
						},
						xAxis: [{
							type: 'category',
							data: ['[0,23元)','[23,50元)', '[50,70元)', '[70,90元)', '[90,120元)', '[120,160元)', '[160,200元)', '[200,250元)', '[250,300元)', '[300,400元)', '[400,600元)', '600元以上'],
							axisPointer: {
								type: 'shadow'
							}
						}],
							yAxis: [{
								type: 'value',
								name: '量（条）',
//								min: 0,
//								max: 100,
//								interval: 20,
								
							},
							{
								type: 'value',
								name: '存销环比',
//								min: 0,
//								max: 3.0,
//								interval: 0.5,
							
							}
						],
						series: [{
								name: '当月销量',
								type: 'bar',
								data: [1.0,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4],
								itemStyle: {
								normal: {
								color: '#9d96f5'
								}
							}
							},
							{
								name: '上月销量',
								type: 'bar',
								data: [1.0,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0],
								itemStyle: {
								normal: {
									color: '#2db7f5'
								}
							}
							},
							{
								name: '销量环比',
								type: 'line',
								yAxisIndex: 1,
								data: [1.0,2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0],
								itemStyle: {
								normal: {
									color: '#9fe6b8'
								}
							}
							}
						]
					}

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
			loadAll(){
				this.loadMessage();
				this.loadPie();
			},
			
			loadMessage() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.PRICE_ANALYSIS;
				let data = {
					id:0,
					areacode:_self.params.areacode,
					type:1,
					datatime:_self.params.month,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				}
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					console.log("11111",result)
					_self.params.infor = result;
				}, function(res) {})
			},
			loadPie(){
				let _self = this;
				let piechart = echarts.init(document.getElementById('piechart'));
				let option = JSON.parse(JSON.stringify(_self.params.optionpie));
				let url = URL.ENGIN.SCORCE+ URL.PORT.PRICE_ANALYSISPIC;
				if(_self.params.datatime == null || _self.params.datatime == undefined || _self.params.datatime == "")
					_self.params.datatime = validation.formatDatefor(new Date(), 'yyyy-mm');
				let param = {};
				let data = {
					id: 0,
					type:3,
					areacode: _self.params.areacode,
					datatime:_self.params.month,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					let value1Arr = [];
					let value2Arr = [];
					let value3Arr = [];
					for(let key in result) {
						value1Arr.push(result[key].value1)
						value2Arr.push(result[key].value2)
						value3Arr.push(result[key].value3)
					}
					console.log(value1Arr)
					option.series[0].data = value1Arr;
					option.series[1].data = value2Arr;
					option.series[2].data = value3Arr;
					piechart.setOption(option);
				}, function(res) {})
			},
		},
		created() {
			let _self = this;
			 _self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;
			_self.loadMessage();
			setTimeout(function() {
				_self.loadPie()
			}, 0)
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
			margin-left: 400px;
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