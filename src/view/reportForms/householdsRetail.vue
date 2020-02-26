<template>
	<div class="householdsRetail">

		<div class="search">
			
			<citychoose :parama="params" v-on:cityChange="handleChangeCity" v-on:areaChange="handleChangeArea" v-on:gridChange="handleChangeGrid" ></citychoose>
			<div class="daterangepicker">
			<span  class="demonstration">时间段：</span>
			<el-date-picker class="datapicker"  v-model="params.search.data_list" type="daterange" format="yyyy-MM-dd" value-format="yyyyMMdd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
			</el-date-picker>
			<el-button class="searchbutton" type="primary" @click.native="loadAll">搜索</el-button>
			<el-button @click.native="reset">重置</el-button>
			
			</div>
		</div>
		<div class="sumlist">
			<div>
				<p class="generalTitle">本区域试点商户</p>
				<p>本区域共<span class="black">{{params.sumInfor.totalTestshop}}</span>家试点商户</p>
			</div>
			<div class="second">
				<p class="generalTitle">毛利统计</p>
				<p>毛利总额<span class="black">{{params.sumInfor.totalProfit}}</span>元</p>
				<p>烟毛利<span class="black">{{params.sumInfor.smokeProfit}}</span>元</p>
				<p>非烟毛利<span class="black">{{params.sumInfor.nonSmokeProfit}}</span>元</p>
			</div>

			<div class="last">
				<p class="generalTitle">户均销量</p>
				<p>卷烟户均销量<span class="black">{{params.sumInfor.smokeSale}}</span>元</p>
				<!--<p>月环比<span :class="params.sumInfor.smokeSaleRatio>=0?'red':'green'">{{Math.abs(Number(params.sumInfor.smokeSaleRatio)* 100).toFixed(2)}}%</span>
					<i v-if="Number(params.sumInfor.smokeSaleRatio)>0" class="iconfont red">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.smokeSaleRatio)<0" class="iconfont green">&#xeb0a;</i>
				</p>-->
				<p>非烟户均销量<span class="black">{{params.sumInfor.nonSmokeSale}}</span>元</p>
				<!--<p>月环比<span :class="params.sumInfor.nonSmokeSaleRatio>=0?'red':'green'">{{Math.abs(Number(params.sumInfor.nonSmokeSaleRatio)* 100).toFixed(2) }}%</span>
					<i v-if="Number(params.sumInfor.nonSmokeSaleRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.nonSmokeSaleRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
			</div>
		</div>
		<div class="monlist">
			<div>
				<p class="generalTitle">时间段内户均盘点次数</p>
				<p>时间段内户均盘点<span class="black">{{params.sumInfor.monthChecknumber}}</span>次</p>
				<!--<p>月环比<span :class="params.sumInfor.monthChecknumberRatio>=0?'color':'colorf'">{{Math.abs(Number(params.sumInfor.monthChecknumberRatio)* 100).toFixed(2) }}%</span>
					<i v-if="Number(params.sumInfor.monthChecknumberRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.monthChecknumberRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
			</div>
			<div>
				<p class="generalTitle">用户日均扫码次数</p>
				<p>用户日均扫码<span class="black">{{params.sumInfor.scanNumbers}}</span>次</p>
				<!--<p>月环比<span :class="params.sumInfor.scanNumbersRatio>=0?'color':'colorf'">{{Math.abs(Number(params.sumInfor.scanNumbersRatio)* 100).toFixed(2) }}%</span>
					<i v-if="Number(params.sumInfor.scanNumbersRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.scanNumbersRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
			</div>

			<div class="last">
				<p class="generalTitle">用户日均客单价</p>
				<p>用户日均客单价<span class="black">{{params.sumInfor.perConsume}}</span>元</p>
				<!--<p>月环比<span :class="params.sumInfor.perConsumeRatio>=0?'color':'colorf'">{{Math.abs(Number(params.sumInfor.perConsumeRatio)* 100).toFixed(2) }}%</span>
					<i v-if="Number(params.sumInfor.perConsumeRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.perConsumeRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
			</div>
		</div>

		<div class="line">
			<div class="linedata">
				<div class="linerleft">
				<div class="linetitle">
					<p class="chartTitleq">近30天营业收入趋势(单位：元)</p>
					<!--<div class="picker">
						<span >截止至</span>
						<el-date-picker class="datepicker" v-model="params.businessmonth" type="date" placeholder="Pick a month" value-format="yyyy-MM-dd" @change="loadLine"></el-date-picker>
					</div>-->
				</div>
				<div class="linez">
					<div id="lineChart" ref="chart" class="lineChart"></div>
				</div>
                </div>
               	<div class="lineright">
					<p class="chartTitle">零售户档位比例图(单位：家)</p>
				<div class="pie">
					<div id="pieChart" ref="chart" class="pieChart"></div>
				</div>
				
			</div>
				
			</div>
			<div class="linerbuttom">
			<div class="linetitle">
					<p class="chartTitleq">近30天日均客单价(单位：元)</p>
					<!--<div class="picker">
						<span>截止至</span>
						<el-date-picker class="datepicker" v-model="params.everydaymonth" type="date" value-format="yyyy-MM-dd" placeholder="Pick a month" @change="loadBar"></el-date-picker>
					</div>-->
				</div>
				<div class="linez">
					<div id="barChart" ref="chart" class="lineChart"></div>
				</div>
		</div>
		</div>
	</div>
</template>

<script>
	let echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/bar')
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
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
					cityCode:[""],
				    areaCode:[""],
				    gridCode:[""],
					sumInfor: {},
					businessmonth: validation.formatDatefor(new Date(), 'yyyy-mm-dd'),
					everydaymonth: validation.formatDatefor(new Date(), 'yyyy-mm-dd'),
					search:{
						data_list:[],
					},
					option: {
						color: ['#3398DB'],
						title: {
							text: '',
							x: 'left',
							left:'10px',
							top:'10px',
							textStyle: {
								fontStyle: 'normal',
								/*fontWeight: 'bold',*/
								fontFamily: 'sans-serif',
								fontSize: 14,
							},
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							axisLabel: {
								interval: 0,
								rotate: 40,
								fontSize:10,
							},
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
							//name: '直接访问',
							type: 'bar',
							barWidth: '60%',
							data: [10, 52, 200, 334, 390, 330, 220],
							itemStyle: {
								normal: {
									color: '#2db7f5'
								}
							}
						}]
					},

					optionLine: {
						title: {
							text: '',
							x: 'left',
							left:'10px',
							top:'10px',
							textStyle: {
								fontStyle: 'normal',
								/*fontWeight: 'bold',*/
								fontFamily: 'sans-serif',
								fontSize: 14,
							},
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						xAxis: {
							type: 'category',
							data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							axisLabel: {
								interval: 0,
								rotate: 40,
								fontSize:8
							}
						},
						yAxis: {
							type: 'value'
						},
						 grid: {
        left: 85
    },
						series: [{
							data: [820, 932, 901, 934, 1290, 1330, 1320],
							type: 'line',
							lineStyle: {
								normal: {
									color: '#ff7f27'
								}
							},
						}]
					},

					optionPie: {
						
						title: {
							text: '',
							x: 'left',
//							left:'10px',
							top:'10px',
							textStyle: {
								fontStyle: 'normal',
								/*fontWeight: 'bold',*/
								fontFamily: 'sans-serif',
								fontSize: 14,
							},
						},
						tooltip: {
							trigger: 'item',
							formatter: "{a} {b} : {c} ({d}%)"
						},
						legend: {
							orient: 'horizontal',
							left: 'left',
							data: ['直接访问', '搜索引擎'],
							top: '30px',
						},
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '70%'],
							data: [{
								value: 335,
								name: '直接访问'
							}, {
								value: 1548,
								name: '搜索引擎'
							}],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}],
						color:['#fb7293','#ff9f7f','#ffdb5c','#9fe6b8','#32c5e9','#37a2da' ],
						//color: ['#c799ff','#bfc0ff',' #f9cc7b',' #f88080',' #6bdfc5',' #4da1ff' ]
					},
				}
			}
		},
		components: {
			citychoose
		},
		methods: {
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
			handleChange(value) {
				if(value.length==2){
               	value.push("")
               }
               console.log(value)
			},
			reset(){
				let _self = this;
				 window.location.reload();
//				_self.params.search.data_list=new Array();
//				_self.params.cityCode[0]="";
//				_self.params.areaCode[0]="";
//				_self.params.gridCode[0]="";
//				_self.loadAll()
			},
			getDate: function() {
				let _self = this;
				var date = new Date();
				var seperator = "";
				var year = date.getFullYear();
				var month = date.getMonth()+1 ;
				var strDate = date.getDate();
				
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				
				if(month>1&& month <= 9){
					var startDate = year + seperator +"0"+(month-1) + seperator + strDate;
					var endDate = year + seperator + "0"+month + seperator + strDate;
				}
				else if(month = 1){
					startDate = (year-1) + seperator + 12 + seperator + strDate;
					var endDate = year + seperator + "0"+month + seperator + strDate;
				}
				else{
					var startDate = year + seperator +(month-1) + seperator + strDate;
				}
				
			
				_self.params.search.data_list[0] = startDate;
				_self.params.search.data_list[1] = endDate;
				
				
			},
			loadAll(){
				this.loadGeneral();
				this.loadBar();
				this.loadLine();
				this.loadPie();
			},
			loadGeneral() {
				let _self = this;
				if(!_self.params.search.data_list)_self.params.search.data_list=new Array();
				let url = URL.ENGIN.SCORCE+ URL.PORT.RETAILS_GENERAL;
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.sumInfor = result;
					//console.log(result)
				}, function(res) {})
			},
			loadBar() {
				let _self = this;
				let barChart = echarts.init(document.getElementById('barChart'));
				let option = JSON.parse(JSON.stringify(this.params.option));
				let url = URL.ENGIN.SCORCE+ URL.PORT.PER_CONSUMES;
				if(_self.params.everydaymonth == null || _self.params.everydaymonth == undefined || _self.params.everydaymonth == "")
					_self.params.everydaymonth = validation.formatDatefor(new Date(), 'yyyy-mm');
				let param = {};
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					datatime: _self.params.everydaymonth,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					let valueArr = [];
					let nameArr = [];
					for(let key in result) {
						valueArr.push(result[key].value)
						nameArr.push(result[key].daytime)
					}
					console.log(nameArr)
					option.xAxis[0].data = nameArr;
					option.series[0].data = valueArr;
					//option.title.text = '单位：元';
					barChart.setOption(option);
				}, function(res) {})
				
				

			},
			loadLine() {
				let _self = this;
				let lineChart = echarts.init(document.getElementById('lineChart'));
				let option = JSON.parse(JSON.stringify(this.params.optionLine));
				let url = URL.ENGIN.SCORCE+ URL.PORT.RENVENUE_TREND;
				if(_self.params.businessmonth == null || _self.params.businessmonth == undefined || _self.params.businessmonth == "")
					_self.params.businessmonth = validation.formatDatefor(new Date(), 'yyyy-mm');
				let param = {};
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					datatime: _self.params.businessmonth,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					let valueArr = [];
					let nameArr = [];
					for(let key in result) {
						valueArr.push(result[key].value)
						nameArr.push(result[key].daytime)
					}
					console.log(valueArr)
					option.xAxis.data = nameArr;
					
					option.series[0].data = valueArr;
					//option.title.text = '单位：元';
					lineChart.setOption(option);
				}, function(res) {})

			},
			loadPie() {
				let _self = this;
				let pieChart = echarts.init(document.getElementById('pieChart'),'light');
				let option = JSON.parse(JSON.stringify(this.params.optionPie));
				let url = URL.ENGIN.SCORCE+ URL.PORT.RETAILS_MAP;
				let data = {
				    id: 0,
					areacode: _self.params.areacode,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					console.log(result)
					option.series[0].data = result;
					option.legend.data = result;
					option.legend.formatter = function(name) {
							var total = 0;
							for(let key of option.legend.data) {
								if(key.name == name) {
									total = key.value
								}

							}
							return name + '  ' + ' (' + total + ')';
						}

					pieChart.setOption(option);
				}, function(res) {})

				
				

			},
		},
		created() {
			let _self = this;
			 _self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;
			_self.getDate();
			setTimeout(function() {
				_self.loadGeneral();
				_self.loadBar();
				_self.loadLine();
				_self.loadPie();
			}, 0)
		}
	}
</script>

<style lang="less" scoped>
	.householdsRetail {
		padding: 15px 15px 15px ;
		.black {
			color:  #333333;
			font-weight: bold;
		}
		.red{
			color: red;
			font-weight: bold;
		}
		.green{
			color: green;
			font-weight: bold;
		}
		.generalTitle{
			font-weight: bold;
			color: #000000;
			font-size: 16px;
			display: flex;
			padding-left: 20px;
			padding-top: 20px;
			padding-bottom: 10px;
			border-bottom: 2px solid #f7f7f9;
		}
		.chartTitleq{
			font-size: 14px;
			color: #333333;
			font-weight: bold;
			margin-left: 10px;
			margin-top: 10px;
		}
		.chartTitle{
			font-size: 14px;
			color: #333333;
			font-weight: bold;
			margin-left: 10px;
			
		}
		
		.search {
			border-radius: 5px;
			background-color: #FFFFFF;
			padding:10px 10px 10px 0px;
			.citychoose{
			display: flex;
		}
		.daterangepicker{
			display: flex;
			margin-top: 10px;
			.el-date-editor {
			width: 400px;
		}
		.searchbutton{
			margin-left: 165px;
			color: #fff;
			background-color: #5bcfa0;
			border-color: #5bcfa0;
		}
		.demonstration {
			font-size: 14px;
			margin-top: 5px;
			}
			
		}
		}
		.sumlist {
			
			display: flex;
			align-items: center;
			&>div {
				background-color: #FFFFFF;
				flex: 1;
				height: 140px;
				padding-left: 10px;
				padding-right: 10px;
				border-radius: 3.5px;
				margin-top: 15px;
				&>p {
					display: flex;
					padding-left: 10px;
			        padding-top: 10px;
					font-size: 14px;
					color: #636363;
				}
				&.second {
				
				}
				&.last {
					
					/*border-right: none;*/
					.color {
						color: red;
					}
				}
			}
			div:not(:first-child){
					margin-left: 10px;
				}
		}
		.monlist {
			margin-bottom: 15px;
			display: flex;
			align-items: center;
			/*padding: 10px 0;*/
			&>div {
			    background-color: #FFFFFF;
				flex: 1;
				height: 100px;
				padding-left: 10px;
				padding-right: 10px;
				border-radius: 3.5px;
				margin-top: 15px;
				line-height: 20px;
				&>p {
					display: flex;
					padding-left: 10px;
			        padding-top: 10px;
					font-size: 14px;
					color: #636363;
					.color {
						color: red;
						font-weight: bold;
					}
					.colorf {
						color: green;
						font-weight: bold;
					}
				}
				&.last {
					
					.color {
						color: red;
					}
				}
			}
			div:not(:first-child){
					margin-left: 10px;
				}
		}
		.line {
			.linedata {
				background-color: #FFFFFF;
				display: flex;
				.lineright {
				flex: 7;
				margin-left: 10px;
				background-color: #FFFFFF;
				p{
					display: flex;
					margin-top: 10px;
				}
				.pie{
					padding-left: 20px;
				.level{
					font-size: 20px;
					margin: 10px 10px 10px 10px;
					
				}
				.pieChart {
					height: 300px;
					
				}	
				}
				
				
			}
			.linerleft{
				flex: 13;
				border-right: 10px solid #f6f7f8;
				.linetitle {
					display: flex;
					justify-content: space-between;
					.picker {
						margin-right: 30px;
						text-align: right;
						span{
							font-size: 12px;
							margin-right: 5px;
						}
						.datepicker {
							margin-top: 20px;
							display: inline-block;
							width: 160px;
						}
					}
				}
				.linez {
					margin-top: -10px;
					.lineChart {
						height: 300px;
					}
				}
			}
				
			}
			.liner {
					display: flex;
					text-align: left;
					margin-bottom: 20px;
					margin-top: 10px;
				}
			.linerbuttom{
			background-color: #FFFFFF;
			margin-top: -5px;
				.linetitle {
					margin-top:20px;
					display: flex;
					justify-content: space-between;
					.picker {
						margin-top: 20px;
						margin-right: 30px;
						text-align: right;
						span{
							font-size: 12px;
							margin-right: 5px;
						}
						.datepicker {
							display: inline-block;
							width: 160px;
						}
					}
				}
				.linez {
					padding-bottom: 20px;
					.lineChart {
						height: 300px;
					}
				}
			}
		}
	}
</style>