<template>
	<div class="generalShop">
		<div class="search">
				<citychoose :parama="params" v-on:cityChange="handleChangeCity" v-on:areaChange="handleChangeArea" v-on:gridChange="handleChangeGrid" ></citychoose>
			
			<div class="daterangepicker">
			<span  class="demonstration">时间段：</span>
			<el-date-picker class="datapicker"  v-model="params.search.data_list" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
			</el-date-picker>
			<el-button class="searchbutton" type="primary" @click.native="loadall">搜索</el-button>
			<el-button @click="reset">重置</el-button>
			</div>
			
			
			
		</div>
		<div class="box">
			<div>
				<p class="generalTitle">销售统计</p>
				<p>销售总额<span class="black"> {{params.sumInfor.totalSale}}</span>元</p>
				<!--<p> 月环比<span :class="params.sumInfor.smokeSaleRatio>=0?'color':'colorf'">{{Math.abs(Number(params.sumInfor.totalSaleRatio) * 100 ).toFixed(2)}}%</span> 
					<i v-if="Number(params.sumInfor.smokeSaleRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.smokeSaleRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
			
				<p>卷烟销售 <span class="black">{{params.sumInfor.smokeSale}}</span>元 </p>
				<!--<p>月环比<span :class="params.sumInfor.smokeSaleRatio>=0?'color':'colorf'">{{Math.abs(Number(params.sumInfor.smokeSaleRatio)* 100).toFixed(2) }}%</span> 
					<i v-if="Number(params.sumInfor.smokeSaleRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.smokeSaleRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
				<p>非烟总额<span class="black">{{params.sumInfor.nonSmokeSale}}</span>元</p>
				<!--<p> 
					月环比<span :class="params.sumInfor.nonSmokeSaleRatio>=0?'color':'colorf'">{{Math.abs(Number(params.sumInfor.nonSmokeSaleRatio)* 100).toFixed(2) }}%</span> 
					<i v-if="Number(params.sumInfor.nonSmokeSaleRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.nonSmokeSaleRatio)<0" class="iconfont colorf"> &#xeb0a;</i>
				</p>-->
			</div>
			<div>
				<p class="generalTitle">品种统计</p>
				
				<p>商品品种<span class="black">  {{params.sumInfor.totalType}}</span> 种</p>
				<p>卷烟品种 <span class="black"> {{params.sumInfor.smokeType}}</span> 种</p>
				<p>非烟品种 <span class="black"> {{params.sumInfor.nonSmokeType}}</span> 种</p>
			</div>
			<div>
				<p class="generalTitle">卷烟销量统计</p>
				
				<p>本省烟<span class="black"> {{params.sumInfor.inProvinceValue}}</span>条</p>
				<!--<p>月环比<span :class="params.sumInfor.inProvinceValueRatio>=0?'color':'colorf'"> {{Math.abs(Number(params.sumInfor.inProvinceValueRatio)* 100).toFixed(2) }}%</span>
					<i v-if="Number(params.sumInfor.inProvinceValueRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.inProvinceValueRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
				<p>外省烟<span class="black"> {{params.sumInfor.outProvinceValue}}</span>条</p>
				<!--<p>月环比<span :class="params.sumInfor.outProvinceValueRatio>=0?'color':'colorf'"> {{Math.abs(Number(params.sumInfor.outProvinceValueRatio)* 100).toFixed(2) }}%</span>
					<i v-if="Number(params.sumInfor.outProvinceValueRatio)>0" class="iconfont color">&#xeb0b;</i>
					<i v-else-if="Number(params.sumInfor.outProvinceValueRatio)<0" class="iconfont colorf">&#xeb0a;</i>
				</p>-->
			</div>
		</div>

		<div class="Graph">
			<div class="bar">
				<div class="smoke">
					<p class="chartTitle" >各区域卷烟销售排行(单位：元)</p>
					<div id="smokeRanking" class="linechart"></div>
				</div>
				
				<div class="nosmoke">
					<p class="chartTitle" >各区域非烟销量排行(单位：元)</p>
					<div id="nosmokeRanking" class="linechart"></div>
				</div>
			</div>
			<div class="block">
				<div class="chart">
					<p class="chartTitle">重点监测品牌卷烟销量分布图(单位：条)</p>
					<div class="classChoose">
						<span class="demonstration">品牌类别: </span>
						<!--<el-cascader placeholder="请选择" :options="params.selects" @change="onchange" v-model="params.choice" ></el-cascader>-->
						 <el-select class="classsmoke" v-model="params.value" placeholder="请选择" @change="onchange">
                          <el-option v-for="item in params.options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                        <span class="demonstration">规格搜索: </span>
						 <el-select class="classbrand" v-model="params.valuesecond" placeholder="请选择" @change="loadpie">
                          <el-option v-for="item in params.optionsecond" :key="item.code" :label="item.tobaccoName" :value="item.code">
                          </el-option>
                        </el-select>
					</div>
					<div id="piechart" class="piecharts"></div>

				</div>
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
	import citychoose from "../../components/tools/citychoose"
	export default {
		data() {
			return {
				params: {
					areacode: this.$store.state.user.userInfor.datatype,
					cityCode:[""],
				    areaCode:[""],
				    gridCode:[""],
					choice: ["",""],
					value:'0',
					valuesecond:'',
					search:{
						data_list:["",""],
					},
					sumInfor: {},
					selectedOptions: ["", "", ""],
					datesmoke: validation.formatDatefor(new Date(), 'yyyy-mm-dd'),
					datenosmoke: validation.formatDatefor(new Date(), 'yyyy-mm-dd'),
					optionbar: {
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
						grid: {
							bottom:'25%'
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
                                           interval:0,
                                           rotate:40
                                        }
						},
						yAxis: {
							type: 'value',
		

						},
						 grid: {
        left: 75
    },
						series: [{
							data: [120, 200, 150, 80, 70, 110, 130],
							type: 'bar',
							itemStyle: {
								normal: {
									color: '#2db7f5'
								}
							}
						}]
					},

					options: [{
						value: '0',
						label: '全部',
//						children: [{
//								value: '1',
//								label: '全部',
//							},
//							{
//								value: 'shejiyuanze',
//								label: '金圣',
//							}
//						]
					}],
					optionbrand: [],
					optionsecond: [],
					optionpie: {
						title: {
							text: '',
							x: 'left',
							left:'10px',
							top:'10px',
							textStyle: {
								fontStyle: 'normal',
								fontFamily: 'sans-serif',
								fontSize: 14,
							},
						},
						tooltip: {
							trigger: 'item',
							formatter: "{a} {b} : {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							right: '10px',
							//top: '10px',
						},
						series: [{
							name: '',
							type: 'pie',
							radius: '45%',
							center: ['40%', '60%'],
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
						//color: ['#fb7293','#ff9f7f',' #ffdb5c',' #e062ae','#e690d1', '#e7bcf3',' #9d96f5','#9fe6b8','#67e0e3','#32c5e9','#37a2da' ]
						//color: ['#edc024', '#eda524', '#67dc93', '#01ba83','#057fd1','#d96706','#d14305','#1941bf','#c4ed24','#94e08a','#0686d9','#2461ed','#2444ed','#248bed',]
					}

				}
			}
		},
		components: {
			citychoose
		},
		methods: {
			loadall(){
			let _self = this;
			_self.loadgeneral();
			_self.loadsmoke();
			_self.loadnosmoke();
			_self.loadpie()	;
			
			},
			reset(){
				//let _self = this;
				 window.location.reload();
//				_self.params.search.data_list=new Array();
//				_self.params.cityCode[0]="";
//				_self.params.areaCode[0]="";
//				_self.params.gridCode[0]="";
//				_self.loadall()
			},
			
				getDate(){
				let _self = this;
				var date = new Date();
				var seperator = "-";
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
			onchange(value) {
				let _self = this;
//				for(let i = 0; i < value.length; i++) {
//					if(value[i] == '') {
//						this.params.choice = value[i - 1]
//					} else if(value.length - 1 == i) {
//						this.params.choice = value[i]
//					}
//				}
//              if(value.length==1){
//              	this.params.choice = ["0",""]
//              }
				
                if(this.params.value==0){
                	_self.params.optionsecond=[{code: '',tobaccoName: '全部',}]
                	_self.params.valuesecond="",
                	_self.loadpie()
                }
                 if(this.params.value==2001){
                	_self.params.optionsecond=_self.params.optionbrand[0],
                	_self.params.valuesecond="请选择"
                }
				 else if(this.params.value==2002){
				 	
                	_self.params.optionsecond=_self.params.optionbrand[1]
                	_self.params.valuesecond="请选择"
              }
                 else if(this.params.value==2003){
                 	
                	_self.params.optionsecond=_self.params.optionbrand[2]
                	_self.params.valuesecond="请选择"
                }
                 else if(this.params.value==2004){
                	_self.params.optionsecond=_self.params.optionbrand[3]
                	_self.params.valuesecond="请选择"
                }
                 console.log(this.params.value)
                  console.log(this.params.valuesecond)
			},
			handleChange(value) {
            if(value.length==2){
               	value.push("")
               }
               console.log(value)

			},
			loadSmokeclass() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_SMOKECLASS;
				http.publicRequest('get', url, '', function(res) {
					let result = res.body.data;
					console.log("qqqqqqqqqqqqqq",result)
					for(let key of result) {
						let first = {
							value: '',
							label: '',
						};
					    first.value = key.tobaccoClassId;
						first.label = key.name;
						console.log(first)
						_self.params.options.push(first)
					}
					for(let index in result){
						_self.params.optionbrand.push(result[index].tobaccoDetailResults)
					}
					var obj= {code:"",tobaccoName:"全部"}
					for(let i=0;i<4;i++){
						_self.params.optionbrand[i].unshift(obj)
						console.log(_self.params.optionbrand)
					}
					
					//console.log(_self.params.optionbrand)
//					_self.params.selects = [{
//								value: '0',
//								label: '全部'
//							}];
//					for(let key of result) {
//						let first = {
//							value: '',
//							label: '',
//							children: [{
//								value: '',
//								label: '全部'
//							}]
//						};
//						first.value = key.tobaccoClassId;
//						first.label = key.name;
//						for(let index of key.tobaccoDetailResults) {
//							let second = {
//								value: '',
//								label: ''
//							};
//							second.value = index.key;
//							second.label = index.value;
//							first.children.push(second)
//						}
//						_self.params.selects.push(first)
//						console.log(_self.params.selects)
//					}
					
				}, function(res) {})
			},
			loadgeneral() {
				let _self = this;
				if(!_self.params.search.data_list)_self.params.search.data_list=new Array();
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_GOODSGENERAL;
				let data = {
					id:0,
					areacode: _self.params.areacode,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					gridCode: _self.params.gridCode[0],
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
				};
				url = http.filterUrl(data, url);
				let params = http.params;
				http.publicRequest('get', url,'', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.sumInfor = result;
				}, function(res) {})
			},
			loadsmoke() {
				let _self = this;
				let smokeRanking = echarts.init(document.getElementById('smokeRanking'));
				let options = JSON.parse(JSON.stringify(this.params.optionbar));
				let url =URL.ENGIN.SCORCE+ URL.PORT.GET_SMOKENOSMOKECHART;
				let param = {};
				let data = {
					id:0,
					areacode: _self.params.areacode,
					type: 0,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],	
				};
				url = http.filterUrl(data, url);
				let params = http.params;
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					let valueArr = [];
					let nameArr = [];
					for(let key in result) {
						valueArr.push(result[key].value)
						nameArr.push(result[key].name)
					}
					options.xAxis.data = nameArr;
					options.series[0].data = valueArr;
					//options.title.text = '单位：元';
					smokeRanking.setOption(options);
				}, function(res) {})

			},
			loadnosmoke() {
				let _self = this;
				if(!_self.params.search.data_list)_self.params.search.data_list=new Array();
				let nosmokeRanking = echarts.init(document.getElementById('nosmokeRanking'));
				let options = JSON.parse(JSON.stringify(this.params.optionbar));
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_SMOKENOSMOKECHART;
				let data = {
					id:0,
					areacode: _self.params.areacode,
					type: 1,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					
				};
				url = http.filterUrl(data, url);
				let params = http.params;
				http.publicRequest('get', url,  '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					//console.log(result)
					let valueArr = [];
					let nameArr = [];
					for(let key in result) {
						valueArr.push(result[key].value)
						nameArr.push(result[key].name)
					}
					options.xAxis.data = nameArr;
					options.series[0].data = valueArr;
					//options.title.text = '单位：元';
					nosmokeRanking.setOption(options);
				}, function(res) {})

			},
			loadpie() {
				let _self = this;
				if(!_self.params.search.data_list)_self.params.search.data_list=new Array();
				let piechart = echarts.init(document.getElementById('piechart'),'light');
				let options = JSON.parse(JSON.stringify(this.params.optionpie));
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_IMPORTANTCLASS;
				let data = {
					id:0,
					areacode: _self.params.areacode,
					cityCode: _self.params.cityCode[0],
					areaCode: _self.params.areaCode[0],
					tobaccoClassId:_self.params.value,
					key: _self.params.valuesecond,
					startTime: _self.params.search.data_list.length ? _self.params.search.data_list[0] : "",
					endTime: _self.params.search.data_list.length ? _self.params.search.data_list[1] : "",
				};
				url = http.filterUrl(data, url);
				let params = http.params;
				http.publicRequest('get', url,  '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					//console.log(result)
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
					options.series[0].data = mapData;
					options.legend.data = mapData;
					options.legend.formatter = function(name) {
							var total = 0;
							for(let key of options.legend.data) {
								if(key.name == name) {
									total = key.value
								}

							}
							return name + '  ' + ' (' + total + ')';
						}
					//options.title.text = '单位：条';
					piechart.setOption(options);
				}, function(res) {})

			}
	
		},

		created() {
			
			let _self = this;
			_self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;
			_self.getDate();
			console.log()
			setTimeout(function() {
				_self.loadSmokeclass();
			    _self.params.optionsecond=[{code: '',tobaccoName: '全部',}]
				_self.loadgeneral()
				_self.loadsmoke()
				_self.loadnosmoke()
				_self.loadpie()

			}, 0)
		}
	}
</script>

<style lang="less" scoped>
	.generalShop {
		padding: 15px 15px 15px 15px;
		.demonstration{
			font-size: 14px;
			line-height: 30px;
			margin-right: 5px;
		}
		.black {
			color: #333333;
			font-weight: bold;
		}
		.generalTitle{
			font-weight: bold;
			color: #000000;
			font-size: 14px;
			display: flex;
			
			padding-top: 20px;
			padding-bottom: 10px;
			border-bottom: 2px solid #f7f7f9;
		}
		.chartTitle{
			display: flex;
			font-size: 14px;
			color: #333333;
			font-weight: bold;
			margin-left: 10px;
			padding-top: 10px;
		}
	
		.search {
	        height: 98px;
			background: #FFFFFF;
			padding: 10px;
			border-radius: 5px;
			.citychoose{
				display: flex;
			}
			.daterangepicker{
				display: flex;
				margin-top: 10px;
				.demonstration{
				margin-left: 5px;
		    	font-size: 14px;
				
		    }
			
			}
		   
			.searchbutton {
				margin-left: 200px;
				color: #fff;
			background-color: #5bcfa0;
			border-color: #5bcfa0;
			}
		
		}
		.box {
			margin-top: 5px;
			display: flex;
			font-size: 14px;
			padding: 10px 0;
			&>div {
				background: #FFFFFF;
				height: 150px;
				flex: 1;
				padding-left: 10px;
				padding-right: 10px;
				border-radius: 3.5px;
				&>p {
					padding-left: 10px;
			        padding-top: 10px;
					display: flex;
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
			}
				div:not(:first-child){
					margin-left: 10px;
				}
		}
		.Graph {
			display: flex;
			.bar {
				margin-top: 5px;
				flex: 1;
				.smoke {
					background: #FFFFFF;
					.linechart {	
						width: 110%;
						height: 350px;
						margin-left: 20px;
					}
				}
				.nosmoke {
					margin-top: 15px;
					background: #FFFFFF;
					.linechart {
						width:100%;
						height: 350px;
					    margin-left: 20px;
					}
				}
			}
			.block {
				flex: 1.2;
				margin-left: 10px;
				margin-top: 5px;
				.chart {
					height: 758px;
					background: #FFFFFF;
					.classChoose {
						display: flex;
						margin-top: 20px;
						
						span{
							margin-left:10px;
						}
						.classsmoke {
							width: 100px;
						}
						.classbrand{
							width: 180px;
						}
						.demonstration{
							font-size:13px;
						}
					}
					.piecharts {
						margin-top: 20px;
						width: 100%;
						height: 531px;
					}
				}
			}
		}
	}
</style>