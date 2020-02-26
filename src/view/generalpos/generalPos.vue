<template>
	<div class="generalPos">
		<div class="total">
			<div class="search">
				<citychoose :parama="params" v-on:cityChange="handleChangeCity" v-on:areaChange="handleChangeArea" v-on:gridChange="handleChangeGrid"></citychoose>
				<el-button class="firstbutton" type="success" @click.native="loadall">搜索</el-button>
				<el-button @click.native="reset">重置</el-button>
			</div>
			<div class="sumlist">
				<div>
					<p class="generalTitle">总数</p>
					<p>终端总数<span class="black">{{params.sumInfor.deviceNumbers}}</span> 台</p>
				</div>
				<div>
					<p class="generalTitle">本月新增</p>
					<p>本月新增终端数<span class="black">{{params.sumInfor.monthNewDeviceNumbers}}</span>台</p>
				</div>

				<div class="last">
					<p class="generalTitle">状态统计</p>
					<p>在线：<span class="black">{{params.sumInfor.deviceOnlineNumbers}}</span>台</p>
					<p>离线：<span class="black">{{params.sumInfor.deviceOfflineNumbers}}</span>台</p>

				</div>
			</div>
			<div class="total">
				<div style="text-align: left;">
					<p class="chartTitle">各区域终端数统计(单位：台)</p>
				</div>

				<div id="totalChart" ref="chart" class="totalChart"></div>
			</div>
			<div class="detail">
				<p>扫码质量详情</p>
			</div>
			<div class="picker">
				<span>截止至：</span>
				<el-date-picker class="datepicker" v-model="params.month" type="date" value-format="yyyy-MM-dd" @change="loadLine"></el-date-picker>
			</div>
			<div class="line">
				<div class="linedata">
					<div style="text-align: left; margin-bottom: 10px;">
						<p class="chartTitle">近30天户均扫码次数(单位：次)</p>
					</div>
					<div class="linez">

						<div id="lineChart" ref="chart" class="lineChart"></div>
					</div>
				</div>
				<div class="lineright">
					<div style="text-align: left;margin-bottom: 10px;">
						<p class="chartTitle">近30天扫码笔数概况</p>
					</div>
					<div id="pieChart" ref="chart" class="pieChart"></div>
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

					cityCode: [""],
					areaCode: [""],
					gridCode: [""],

					sumInfor: {},

					month: validation.formatDatefor(new Date(), 'yyyy-mm-dd'),
					option: {
						color: ['#3398DB'],
						title: {
							text: '',
							//subtext: '纯属虚构',
							x: 'left',
							top: '20px',
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
							data: [],
							axisLabel: {
								interval: 0,
								rotate: 40
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
							//subtext: '纯属虚构',
							x: 'left',
							left: '10px',
							top: '10px',
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
								fontSize: 8
							}
						},
						yAxis: {
							type: 'value'
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
							//subtext: '纯属虚构',
							x: 'left',
							left: '10px',
							top: '5px',
							textStyle: {
								fontStyle: 'normal',
								/*fontWeight: 'bold',*/
								fontFamily: 'sans-serif',
								fontSize: 14,
							},
						},
						tooltip: {
							//trigger: 'item',
							formatter: "{a} {b} : {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							left: '10px',
							top: '30px',
							data: ['直接访问', '搜索引擎'],

						},
						series: [{
							name: '',
							type: 'pie',
							radius: '50%',
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
						//color: [' #6bdfc5',' #f9cc7b']
					},

				}
			}
		},
		components: {
			citychoose
		},
		methods: {
			reset: function() {
				window.location.reload();
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
			loadall() {
				let _self = this;
				_self.loadGeneral()
				_self.loadMessage();
				_self.loadLine();
				_self.loadPie();
			},

			loadGeneral() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.POS_GENERAL;
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.sumInfor = result;
				}, function(res) {})
			},
			loadMessage() {
				let _self = this;
				let totalChart = echarts.init(document.getElementById('totalChart'));
				let option = JSON.parse(JSON.stringify(this.params.option));
				let url = URL.ENGIN.SCORCE+ URL.PORT.EVERYAREA_POS;
				let param = {};
				let data = {
					id: 0,
					areacode: _self.params.areacode,
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
						nameArr.push(result[key].name)
					}

					option.xAxis[0].data = nameArr;
					option.series[0].data = valueArr;
					//	option.title.text = '单位：台';
					totalChart.setOption(option);
				}, function(res) {})
			},
			loadLine() {
				let _self = this;
				let lineChart = echarts.init(document.getElementById('lineChart'));
				let option = JSON.parse(JSON.stringify(this.params.optionLine));
				let url = URL.ENGIN.SCORCE+ URL.PORT.SWEEPCODE_NUMBER;
				if(_self.params.month == null || _self.params.month == undefined || _self.params.month == "")
					_self.params.month = validation.formatDatefor(new Date(), 'yyyy-mm');
				let param = {};
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					datatime: _self.params.month,
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
					option.xAxis.data = nameArr;
					option.series[0].data = valueArr;

					//	option.title.text = '单位：次';
					lineChart.setOption(option);

				}, function(res) {})
				_self.loadPie();
			},
			loadPie() {
				let _self = this;
				let pieChart = echarts.init(document.getElementById('pieChart'), 'light');
				let option = JSON.parse(JSON.stringify(this.params.optionPie));
				let url = URL.ENGIN.SCORCE+ URL.PORT.SWEEPCODE_GENERAL;
				let data = {
					id: 0,
					areacode: _self.params.areacode,
					datatime: _self.params.month,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					console.log(result)
					let datas = [];
					let mapData = [];
					for(let key in result) {
						let map = {
							value: result[key].value,
							name: String(result[key].payType)
						};
						datas.push(String(result[key].payType));
						mapData.push(map);
					};
					option.series[0].data = mapData;
					option.legend.data = mapData;
					option.legend.formatter = function(payType) {
						var total = 0;
						for(let key of option.legend.data) {
							if(key.name == payType) {
								total = key.value
							}

						}
						return payType + '  ' + ' (' + total + ')';
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
			setTimeout(function() {
				_self.loadGeneral()
				_self.loadMessage();
				_self.loadLine();
				_self.loadPie();
			}, 0)
		}
	}
</script>

<style lang="less" scoped>
	.generalPos {
		padding: 5px 5px 5px 5px;
		.black {
			color: #333333;
			font-weight: bold;
		}
		.green {
			color: green;
		}
		.grid {
			color: #495060;
		}
		.generalTitle {
			font-weight: bold;
			color: #000000;
			font-size: 16px;
			display: flex;
			padding-top: 10px;
			padding-bottom: 10px;
			margin-top: -10px;
			border-bottom: 2px solid #f7f7f9;
		}
		.chartTitle {
			font-size: 14px;
			color: #333333;
			margin-left: 10px;
			margin-top: 7px;
			font-weight: bold;
		}
		.total {
			padding: 10px;
			.search {
				background-color: #FFFFFF;
				padding: 10px;
				display: flex;
				.citychoose {
					display: flex;
				}
				.el-button {
					margin-left: 10px;
				}
			}
			.sumlist {
				display: flex;
				&>div {
					background-color: #FFFFFF;
					flex: 1;
					padding-left: 10px;
					padding-right: 10px;
					margin-top: 15px;
					margin-bottom: 15px;
					height: 140px;
					border-radius: 3.5px;
					&>p {
						padding-left: 10px;
						padding-top: 20px;
						display: flex;
						color: #636363;
						font-size: 14px;
					}
				}
				div:not(:first-child) {
					margin-left: 10px;
				}
			}
			.total {
				background-color: #FFFFFF;
				padding-bottom: 20px;
				.totalChart {
					flex: 1;
					height: 300px;
					/*pointer-events: auto;*/
				}
			}
			.detail {
				margin-top: 20px;
				font-size: 20px;
				font-weight: bold;
				display: flex;
				border-left: 3px solid #34c388;
				padding-left: 10px;
			}
			.picker {
				padding-top: 10px;
				padding-bottom: 20px;
				padding-right: 20px;
				background-color: #FFFFFF;
				margin-top: 20px;
				text-align: right;
				span {
					color: #333333;
				}
				.datepicker {
					width: 180px;
				}
			}
			.line {
				display: flex;
				.linedata {
					background-color: #FFFFFF;
					flex: 13;
					.linez {
						.lineChart {
							height: 300px;
						}
					}
				}
				.lineright {
					background-color: #FFFFFF;
					flex: 7;
					padding-right: 20px;
					.pieChart {
						height: 340px;
					}
				}
			}
		}
	}
</style>