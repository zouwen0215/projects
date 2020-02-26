<template>
	<div class="dashboard">
			<div class="general" style="text-align: left;margin-top: 3px;">
					
						<p class="generaltitle">概况</p> 
						<div class="tip">
							<img  src="../../../static/icon/general.png" />
						<p  >(平台内所有销售数据为终端pos的销售数据)</p> 
						</div>
						
					
			</div>
		<div class="sumlist">
			<div class="first">
				<div class="imgone">
					<img src="../../../static/icon/one.png" />
				</div>

				<div>
					<p>终端POS (台)</p>
					<p><span>{{params.sumInfor.deviceNum}}</span></p>
				</div>

			</div>
			<div class="second">
				<div class="imgsecond">
					<img src="../../../static/icon/two.png" />
				</div>
				<div>
					<p>卷烟昨日销量 (条)</p>
					<p> <span>{{params.sumInfor.smokeNum}}</span> </p>
				</div>

			</div>
			<div class="third">
				<div class="imgthird">
					<img src="../../../static/icon/three.png" />
				</div>
				<div>
					<p>会员数量 (名)</p>
					<p><span> {{params.sumInfor.memberNum}} </span></p>
				</div>

			</div>
			<div class="last">
				<div class="imglast">
					<img src="../../../static/icon/four.png" />
				</div>
				<div>
					<p>非烟昨日销量 (件)</p>
					<p><span> {{params.sumInfor.noSmokeNum}}</span> </p>
				</div>

			</div>
		</div>

		<div class="topInfor">
			<div class="chartbar">
				<p class="title">区域排行</p>
				<div class="form">
						<el-radio-group   v-model="params.type" @change="loadMessage" text-color="#fff" fill="#5bcfa0">
							<el-radio-button style="width: 125px;" label="0">终端POS总数</el-radio-button>
							<el-radio-button label="1">卷烟销量 </el-radio-button>
							<el-radio-button label="2">会员数量</el-radio-button>
						</el-radio-group>
						<span v-if="params.type==1" class="demonstration">时间段：</span>
						<el-date-picker class="datapicker" v-if="params.type==1" v-model="params.search.data_list" type="daterange" format="yyyy-MM-dd" value-format="yyyyMMdd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  @change="loadMessage"></el-date-picker>
						</el-date-picker>
				
				</div>
                <div class="unit">
                	单位：{{params.unit}}
                </div>
				<div id="myChart" class="myChart"></div>

			</div>

			<div class="map">
				<p class="title">近30天数据地区图示</p>
				<div class="tab">
					<el-row>
						 <el-popover placement="top-start"  width="170" trigger="hover" content="户均扫码次数的占比">
						<el-button slot="reference" :type="params.search.type==0?'success':''" @click="changefButton">扫码质量</el-button>
			           </el-popover>	
			            <el-popover placement="top-start"  width="200" trigger="hover" content="户均已完成订单数的占比">
						<el-button slot="reference" :type="params.search.type==1?'success':''" @click="changesButton">消费者活跃度</el-button>
						 </el-popover>	
						<!--<el-button v-for="(item,index) in params.buttonChoice" :key="index" :type="params.search.type==item.value?'success':''" @click="loadMaps(item.value)">{{item.name}}</el-button>-->
					</el-row>
				</div>
				<div id="mapChart" class="mapChart"></div>
			</div>
		</div>
		<div class="lastpart">

			<div class="search">
				<div style="text-align: left;">
					<el-row><span class="other">其他数据</span> <span class="city">地市：</span>
						<el-select v-model="params.search.areacode" placeholder="" @change="choiceCity()">
							<el-option v-for="item in params.areacodeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-row>
				</div>
			</div>
			<div class="box">
				<div class="boxfirst">
					
					<div class="timechoose">
						<p class="soleCharttitle">
						各价位卷烟销量占比 (单位：条)
					</p>
					<span class="demonstration">时间段：</span>
						<el-date-picker class="datapickers" v-model="params.search.data_list" type="daterange" format="yyyy年MM月dd日" value-format="yyyyMMdd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  @change="loadPie"></el-date-picker>
						</el-date-picker>
				</div>
			    <div id="soleChart" class="soleChart"></div>
				</div>
				
			
			   	<div id="retailChart" class="retailChart"></div>
			
				
			</div>
			<div class="line">
				<div class="formInfor">
					<el-row>
						<el-tooltip placement="right-start" effect="light">
							<div slot="content" v-for="(item,index) in params.gridData1">{{item}}<br/></div>
							<span><i class="iconfont" style="color: red;">&#xe758;</i><el-button class="but" type="text">一类烟</el-button></span>
							<!---->
						</el-tooltip>
						<el-tooltip placement="right-start" effect="light">
							<div slot="content" v-for="(item,index) in params.gridData2">{{item}}<br/></div>
							<span><i class="iconfont" style="color: #34C388;">&#xe758;</i><el-button class="but" type="text">二类烟</el-button></span>
						</el-tooltip>
						<el-tooltip placement="right-start" effect="light">
							<div slot="content" v-for="(item,index) in params.gridData3">{{item}}<br/></div>
							<span><i class="iconfont" style="color: #61A0A8;">&#xe758;</i><el-button class="but" type="text">三类烟</el-button></span>
						</el-tooltip>
						<el-tooltip placement="right-start" effect="light">
							<div slot="content" v-for="(item,index) in params.gridData4">{{item}}<br/></div>
							<span><i class="iconfont" style="color: #6F7E88;">&#xe758;</i><el-button class="but" type="text">四类烟</el-button></span>
						</el-tooltip>
					</el-row>
					<el-row>
						<el-button v-for="(item,index) in params.buttonList" :key="index" :type="params.search.datatime==item.value?'success':''" @click="loadThree(item.value)">{{item.name}}</el-button>
					</el-row>
				</div>
				<div id="ratioChart" class="linechart"></div>
				<!--<div id="growthChart" class="linechart"></div>
				<div id="SalesChart" class="linechart"></div>-->
			</div>

		</div>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/pie')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	import http from '@/utils/http.js'
import common from '@/utils/common.js'
import URL from '@/utils/url.js'
import validation from '@/utils/validation.js'
	export default {
		name: 'hello',
		data() {
			return {
				visible: false,
				params: {
					areaCode: this.$store.state.user.userInfor.code,
					sumInfor: "",
					unit:"",
					gridData1: ['一类烟品类'],
					gridData2: ['二类烟品类'],
					gridData3: ['三类烟品类'],
					gridData4: ['四类烟品类'],
					buttonList: [{
						type: "primary",
						value: "3",
						name: "近三个月"
					}, {
						type: "primary",
						value: "6",
						name: "近六个月"
					}, {
						type: "primary",
						value: "12",
						name: "近一年"
					}],
					buttonChoice: [{
						type: "primary",
						value: "0",
						name: "扫码质量",
						content:"户均扫码次数的占比"
					}, {
						type: "primary",
						value: "1",
						name: "消费者活跃度",
						content:"户均已完成订单数的占比"
					}],
					search: {
						areacode: "",
						datatime: "3",
						type: 0,
						daylengh: 30,
						data_list: [],
					},
					areacodeList: [{
						value: '',
						label: '全省'
					}],
					datatime: validation.formatDatefor(new Date(), 'yyyy-mm-dd'),
					type: 0,
					options: {
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						xAxis: {
							type: 'category',
							data: [],
							axisLabel: {
                                           interval:0,
                                           rotate:40
                                        }
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							data: [],
							type: 'bar',
							itemStyle: {
								normal: {
									color: '#2db7f5'
								}
							}
						}]

					},

					option: {
						title: {
							x: 'left',
							textStyle: {
								fontStyle: 'normal',
								/*fontWeight: 'bold',*/
								fontFamily: 'sans-serif',
								fontSize: 14,
							},
							top: '10px',
							left: '5px'

						},

						tooltip: {
							trigger: 'item',
							formatter: "{a} {b} : {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							left: '10px',
							data: [],
							top: '35px',
							formatter: function(name) {
								
							}

						},
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [{
									value: 335,
									name: '直接访问'
								},
								{
									value: 310,
									name: '邮件营销'
								},
								{
									value: 234,
									name: '联盟广告'
								},
								{
									value: 135,
									name: '视频广告'
								},
								{
									value: 1548,
									name: '搜索引擎'
								}
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}],
						color: ['#fb7293','#ff9f7f',' #ffdb5c',' #e062ae','#e690d1', '#e7bcf3',' #9d96f5','#9fe6b8','#67e0e3','#32c5e9','#37a2da' ]
					},
					//折线图
					optionLine: {
						title: {
							text: '堆叠区域图',
							textStyle: {
								fontStyle: 'normal',
								/*fontWeight: 'bold',*/
								fontFamily: 'sans-serif',
								fontSize: 14
							},
							top: '5px',
							left: '5px'
						},
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								label: {
									backgroundColor: '#6a7985'
								}
							},
							textStyle: {
								align: 'left'
							}
						},
						legend: {
							data: [],
							top: '30px',
							show: true,
							tooltip: {
								show: true,
								formatter: function(params) {
									return "$"
								},
							},
							formatter: function(params) {
								return "$"
							},
						},
//						toolbox: {
//							feature: {
//								saveAsImage: {}
//							}
//						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
						}],
						yAxis: [{
							type: 'value'
						}],
						series: []
					}
				}
			}
		},
		props: {

		},

		methods: {
            changefButton(){
            	let _self = this;
            	_self.params.search.type=0;
            	_self.loadMap();
            },
            changesButton(){
            	let _self = this;
            	_self.params.search.type=1;
            	_self.loadMap();
            },
			//获取当前日期
			
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
			loadCity() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_AREA;
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
				    for(let i in result){
				    	_self.params.areacodeList.push(result[i]);
				    }
				}, function(res) {})
			
			},
			loadMessage() {
				let _self = this;
				if(_self.params.type==0){
					_self.params.unit="台"
				}else if(_self.params.type==1){
					_self.params.unit="条"
				}else{
					_self.params.unit="名"
				}
				
				
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_BARGRAPH;
				if(_self.params.datatime == null || _self.params.datatime == undefined || _self.params.datatime == "")
					_self.params.datatime = 0;
				let data = {
					areacode: _self.params.areaCode,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
					type: _self.params.type,

				};
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let myChart = echarts.init(document.getElementById('myChart'));
					let options = JSON.parse(JSON.stringify(_self.params.options));
					let result = JSON.parse(JSON.stringify(res.body.data));
					let valueArr = [];
					let nameArr = [];
					for(let key in result) {
						valueArr.push(result[key].value)
						nameArr.push(result[key].name)
					}
					options.xAxis.data = nameArr;
					options.series[0].data = valueArr;
					myChart.setOption(options);
				}, function(res) {})
			},
			loadGeneral() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_GENERAL;
				let msg = {
					areacode: _self.params.areaCode,
				};
				url = http.filterUrl(msg, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = res.body.data;
					_self.params.sumInfor = result;
				}, function(res) {})
			},
			//地图换饼图
			loadMap() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.MAPCHART_LIST;
				let msg = {
					type: search.type,
					areacode: _self.$store.state.user.userInfor.datatype,
					daylengh: search.daylengh,
					
				};
				url = http.filterUrl(msg, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					let mapChart = echarts.init(document.getElementById('mapChart'), 'light');
					let option = JSON.parse(JSON.stringify(_self.params.option));
					option.title.text = '';
					let datas = [];
					let mapData = [];
					for(let key in result) {
						let map = {
							value: result[key].value,
							name: String(result[key].name)
						};
						datas.push(String(result[key].name));
						mapData.push(map);
					};
					option.series[0].data = mapData;
					option.series[0].center=['35%','60%'];
					option.legend.data = datas;
					option.legend.left = '350px';
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

					mapChart.setOption(option);

				}, function(res) {})
			},

			loadPie() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.PIECHART_LIST;
				let msg = {
					id:0,
					areacode: _self.params.areaCode,
					type:1,
					cityCode: search.areacode,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
				};
				url = http.filterUrl(msg, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
						let soleChart = echarts.init(document.getElementById('soleChart'), 'light');
						let option = JSON.parse(JSON.stringify(_self.params.option));
//						option.title.text = '各价位卷烟销量占比 (单位：条)';
						option.series[0].data = result;
						// 绘制图表
						option.series[0].center=['60%','50%'];
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

						soleChart.setOption(option);
//					} else {
//						// 基于准备好的dom，初始化echarts实例
//						let retailChart = echarts.init(document.getElementById('retailChart'), 'light');
//						// 绘制图表
//						let option = JSON.parse(JSON.stringify(_self.params.option));
//						option.title.text = '各档位零售户占比 (单位：家)',
//						
//						option.series[0].data = result;
//						option.series[0].center=['60%','55%'];
//						option.legend.top = '80px';
//						option.series[0].radius = '50%',
//						option.color= ['#fb7293','#ff9f7f','#ffdb5c','#9fe6b8','#32c5e9','#37a2da' ];
//						option.legend.data = result;
//						option.legend.formatter = function(name) {
//							var total = 0;
//							for(let key of option.legend.data) {
//								if(key.name == name) {
//									total = key.value
//								}
//
//							}
//							return name + '  ' + ' (' + total + ')';
//						}
//						
//						retailChart.setOption(option);
					
				}, function(res) {})
			},
            loadPietwo() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.PIECHART_LIST;
				let msg = {
					id:0,
					areacode: _self.params.areaCode,
					type:2,
					cityCode: search.areacode,
					
				};
				url = http.filterUrl(msg, url);
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
						
						let retailChart = echarts.init(document.getElementById('retailChart'), 'light');
						// 绘制图表
						let option = JSON.parse(JSON.stringify(_self.params.option));
						option.title.text = '各档位零售户占比 (单位：家)',
						
						option.series[0].data = result;
						option.series[0].center=['60%','55%'];
						option.legend.top = '80px';
						option.series[0].radius = '50%',
						option.color= ['#fb7293','#ff9f7f','#ffdb5c','#9fe6b8','#32c5e9','#37a2da' ];
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
						
						retailChart.setOption(option);
					
				}, function(res) {})
			},
			loadRatioChart() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.LINECHART_RATIO;
				let msg = {
					datatime: search.datatime,
					areacode: _self.params.areaCode,
					cityCode: search.areacode,
				};
				url = http.filterUrl(msg, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					let series = []
					let monthNumber = [];
					/*let stocks = [];*/
					let cateCode = [];
					for(let key of result) {
						let datas = {
							
							name: key.categroryCode,
							type: 'line',
							stack: key.categroryCode,
							areaStyle: {},
							data: []
						};
						/*let category = [];*/
						let month = [];
						for(let index of key.monthResults) {
							let ratioInventory = !(index.stocks == 0 || index.amount == 0) ? Number((index.stocks / index.amount).toFixed(2)) : 0;
							datas.data.push(ratioInventory);
							month.push(index.monthNumber);
						}

						/*stocks.push(category);*/
						monthNumber.push(month);
						series.push(datas);
						cateCode.push(String(key.categroryCode))
					}

					let ratioChart = echarts.init(document.getElementById('ratioChart'),'light');
					let optionLine = JSON.parse(JSON.stringify(_self.params.optionLine));
					optionLine.title.text = '卷烟重点关注品牌户均存销比';
					optionLine.legend.data = cateCode;
					optionLine.xAxis[0].data = monthNumber[0];
					optionLine.series = series;
					
					ratioChart.setOption(optionLine);
				}, function(res) {})
			},

			loadGrowthChart() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.LINECHART_GROWTH;
				let msg = {
					datatime: search.datatime,
					areacode: _self.params.areaCode,
					cityCode: search.areacode,
				};
				url = http.filterUrl(msg, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					console.log("22222222",result)
					let monthNumber = [];
					let stocks = [];
					let series = [];
					let cateCode = [];
					for(let key of result) {

						let datas = {
							name: key.categroryCode,
							type: 'line',
							stack: key.categroryCode,
							areaStyle: {},
							data: []
						};
						let month = [];
						for(let index of key.monthResults) {
							
							let ratioInventory = !(index.presaleNum == 0) ? Number((index.saleNum - index.presaleNum) * 100 / index.presaleNum).toFixed(0) : 0;
							console.log("123",index.preSaleNum)
							datas.data.push(ratioInventory);
							month.push(index.monthNumber);
							
						}
                        
						monthNumber.push(month);
						//console.log("22222222",monthNumber)
						series.push(datas);
						cateCode.push(String(key.categroryCode))
					}
					let growthChart = echarts.init(document.getElementById('growthChart'),'light');
					let optionLine = JSON.parse(JSON.stringify(_self.params.optionLine));
					optionLine.title.text = '卷烟重点关注品牌销量同比增长率  (%)';
					optionLine.legend.data = cateCode;
					optionLine.xAxis[0].data = monthNumber[0];
					optionLine.series = series;
					growthChart.setOption(optionLine);
				}, function(res) {})
			},
			loadSalesChart() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.LINECHART_SALES;
				let msg = {
					datatime: search.datatime,
					areacode: _self.params.areaCode,
					cityCode: search.areacode,
				};
				url = http.filterUrl(msg, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					let monthNumber = [];
					/*let stocks = [];*/
					let priceCode = [];
					let series = [];
					for(let key of result) {
						let datas = {
							name: key.priceCode,
							type: 'line',
							stack: key.categroryCode,
							areaStyle: {},
							data: []
						};
						let month = [];
						for(let index of key.monthResults) {
							let ratioInventory = !index.presaleNum == 0 ? Number((index.saleNum - index.presaleNum) * 100 / index.presaleNum).toFixed(0) : 0;
							datas.data.push(ratioInventory);
							month.push(index.monthNumber);
						}
						monthNumber.push(month);
						series.push(datas);
						priceCode.push(String(key.priceCode))
					}

					let SalesChart = echarts.init(document.getElementById('SalesChart'),'light')
					let optionLine = JSON.parse(JSON.stringify(_self.params.optionLine));
					optionLine.title.text = '各价位卷烟销量同比增长率  (%)';
					optionLine.title.subtext = '价格单位：元';
					let price = [];
					optionLine.legend.data = priceCode;
					optionLine.legend.tooltip.show = false;

					/*optionLine.legend.data[priceCode.length-1]=optionLine.legend.data[priceCode.length-1]+'  单位：元';*/

					optionLine.xAxis[0].data = monthNumber[0];
					optionLine.series = series;
					SalesChart.setOption(optionLine);
				}, function(res) {})
			},

			loadThree(value) {
				let _self = this;
				_self.params.search.datatime = value;
				_self.loadRatioChart(value);
//				_self.loadGrowthChart(value);
//				_self.loadSalesChart(value);
			},
			loadMaps(value) {
				let _self = this;
				if(value) _self.params.search.type = value;
				_self.loadMap(value);
			},
			choiceCity() {
				let _self = this;
				_self.loadPie();
				_self.loadPietwo();
				_self.loadThree(3);
			},

			loadSmoke() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE+ URL.PORT.SMOKE_DETAILS;
				 
				http.publicRequest('get', url, '', function(res) {
					let result = res.body.data;
					console.log("1111111111",result)
					let grid1 = [];
					let grid2 = [];
					let grid3 = [];
					let grid4 = [];
					for(let key of result) {
						if(key.name == "一类烟") {
							for(let index of key.tobaccoDetailResults) {
								grid1.push(index.tobaccoName);
							}
						} else if(key.name == "二类烟") {

							for(let index of key.tobaccoDetailResults) {
								grid2.push(index.tobaccoName);

							}
						} else if(key.name == "三类烟") {

							for(let index of key.tobaccoDetailResults) {
								grid3.push(index.tobaccoName);

							}
						} else if(key.name == "四类烟") {

							for(let index of key.tobaccoDetailResults) {
								grid4.push(index.tobaccoName);

							}
						}
					};
					_self.params.gridData1 = grid1;
					_self.params.gridData2 = grid2;
					_self.params.gridData3 = grid3;
					_self.params.gridData4 = grid4;

					
				}, function(res) {})
			},
		},
		//折线图

		created() {
			let _self = this;
			_self.getDate();
			_self.loadCity();
			setTimeout(function() {
				
				_self.loadGeneral();
				_self.loadPietwo();
				_self.loadMessage();
				_self.choiceCity();
				_self.loadThree(3);
				_self.loadMaps(0);
				_self.loadSmoke();
			}, 0)

		}
	}
</script>

<style lang="less" scoped>
	.dashboard {
		padding: 10px 0 10px;
		.general{
			display: flex;
			.tip{
				display: flex;
				img{
					width: 25px;
					height: 24px;
					margin-left: 10px;
					margin-top: 3px;
				}
				p{
					display: none;
				}
				}
				.tip:hover{
				 p{
				 	display: block;
				 	margin-left: 10px;
				 	margin-top: 3px;
				 	font-size:16px;
				 	color:rgba(108,108,109,1);
				 }
				}
			}
			
			.generaltitle{
			
			font-size: 22px;
			color: #333333;
			border-left: 3px solid #34c388;
			padding-left: 10px;
			font-weight:bold;
			}
		
		
		.demonstration {
			margin-left: 30px;
			color: #333333;
		}
		.sumlist {
			/*background-color: white;*/
			margin-top: 5px;
			margin-bottom: 10px;
			display: flex;
			padding: 5px 0;
			color: #FFF;
			&>div {
				border-radius: 5px;
				width: 290px;
				height: 100px;
				margin-left: 10px;
				border: 1px solid #e6e6e6;
				flex: 1;
				line-height: 25px;
				&>p:nth-child(1) {
					margin-top: 20px;
					font-size: 16px;
				}
				&>p:nth-child(2) {
					margin-top: 7px;
					color: #666;
				}
			}
			&>div:nth-child(1) {
				margin-left: 0px;
			}
			.first {
				display: flex;
				padding: 20px;
				background-color: #28b3f1;
				.imgone {
					width: 50px;
					height: 50px;
					background-color: #21a2db;
					border-radius: 50%;
				}
				img {
					margin-left: 1.2px;
					margin-top: 14px;
					width: 28px;
					height: 26px;
				}
				div {
					margin-left: 20px;
					span {
						font-size: 24px;
						color: #f6f7f8;
					}
				}
			}
			.second {
				display: flex;
				padding: 20px;
				background-color: #efb167;
				.imgsecond {
					width: 50px;
					height: 50px;
					background-color: #dea058;
					border-radius: 50%;
				}
				img {
					margin-left: 1px;
					margin-top: 10px;
					width: 22px;
					height: 28px;
				}
				div {
					margin-left: 20px;
					span {
						font-size: 24px;
						color: #f6f7f8;
					}
				}
			}
			.third {
				display: flex;
				padding: 20px;
				background-color: #48d4a3;
				.imgthird {
					width: 50px;
					height: 50px;
					background-color: #57bb97;
					border-radius: 50%;
				}
				img {
					margin-left: 1px;
					margin-top: 12px;
					width: 31px;
					height: 26px;
				}
				div {
					margin-left: 20px;
					span {
						font-size: 24px;
						color: #f6f7f8;
					}
				}
			}
			.last {
				display: flex;
				padding: 20px;
				background-color: #f48182;
				.imglast {
					width: 50px;
					height: 50px;
					background-color: #db7172;
					border-radius: 50%;
				}
				img {
					margin-left: 1px;
					margin-top: 12px;
					width: 31px;
					height: 26px;
				}
				div {
					margin-left: 20px;
					span {
						font-size: 24px;
						color: #f6f7f8;
					}
				}
			}
		}
		.topInfor {
			display: flex;
			margin-bottom: 10PX;
			.chartbar {
				padding: 15px;
				background-color: white;
				flex: 2.5;
				.title {
					text-align: left;
					font-size: 14px;
					font-weight: bold;
					margin-bottom: 15px;
				}
				.form {
					display: flex;
					.el-radio-button{
						width: 95px;
					}
					.demonstration{
							font-size: 14px;
							margin-top: 3px;
						}
					.datapicker{
						
					width: 250px;
				}
				}
				.unit{
					display: flex;
					margin-left: 560px;
					font-size: 14px;
					padding-top: 20px;
				}
				.myChart {
					margin-top: -30px;
					margin-left: -25px;
					height: 400px;
					width: 600px;
				}
			}
			.map {
				background-color: white;
				margin-left: 10px;
				flex: 1;
				padding-top: 15px;
				width: 30%;
				min-width: 500px;
				&>p {
					padding-left: 20px;
					/*font-weight: 600;*/
					font-size: 14px;
				    font-weight: bold;
					text-align: left;
				}
				.tab {
					text-align: left;
					padding: 10px 0 0 40px;
					.el-row {
						display: inline-block;
					}
				}
				.mapChart {
					height: 350px;
				}
			}
		}
		.lastpart {
			.search {
				margin-top: 15px;
				margin-bottom: 15px;
				.other {
					/*font-weight: bold;*/
					font-size: 22px;
					color: #333333;
					border-left: 3px solid #34c388;
					padding-left: 10px;
					font-weight: bold;
				}
				.el-select{
					width: 130px;
				}
				.city {
					font-size: 14px;
					color: #777777;
					margin-left: 10px;
				}
			}
			.box {
				display: flex;
				width: 100%;
				.boxfirst{
					border-right:1px solid #e6e6e6; 
				 background-color: white;
				 flex: 1;
				.timechoose{
					display: flex;
					margin-top: 10px;
					
					.soleCharttitle{
						font-size: 13.5px;
						font-weight: 700;
					}
					.demonstration{
						font-size: 14px;
						margin-top: 10px;
					}
					.datapickers{
						margin-top: 7px;
						width:310px
					}
					
					
				}
				.soleChart{
				   border-bottom:1px solid #e6e6e6; 
					height: 403px;
				}
				}
				
				.retailChart {
					border-bottom:1px solid #e6e6e6; 
					background-color: white;
					flex: 1;
					
					height:450px;
				}
				
				&>div:nth-child(1) {
					margin-left: 0px;
					
				}
			}
			.linechart {
				
				background-color: white;
				
				/*margin-left: 100px;*/
				padding-bottom:15px ;
				width: 100%;
				height: 300px;
				pointer-events: auto;
			}
			.line {
				
				.formInfor {
					background-color:white ;
					display: flex;
					justify-content: space-between;
					.el-row {
						display: flex;
						margin-top: 15px;
						/*margin-bottom: 10px;*/
						.but {
							color: #333;
						}
					}
				}
			}
		}
	}
</style>