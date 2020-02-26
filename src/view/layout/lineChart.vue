<template>
	<div>
	<div id="myChart" class="linechart"></div>
	<div id="myChart2" class="linechart"></div>
	<div id="myChart3" class="linechart"></div>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/line')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	export default {
		name: 'hello',
		data() {
			return {
				/*msg: 'Welcome to Your Vue.js App',*/
				params:{
					option:{
						title: {
						text: '堆叠区域图',
						/*color:'#fff'*/
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '10%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
						/*data:function(){
							var list=[];
							for(var i=1;i<=12;i++){
								list.push(i+'月');
							}
							return list;
						}*/
						
					}],
					yAxis: [{
						type: 'value'
					}],

					series: [{
							name: '一类烟',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
						},
						{
							name: '二类烟',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [220, 182, 191, 234, 290, 330, 310,220, 182, 191, 234, 290]
						},
						{
							name: '三类烟',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [150, 232, 201, 154, 190, 330, 410,150, 232, 201, 154, 190]
						},
						{
							name: '四类烟',
							type: 'line',
							stack: '总量',
							areaStyle: {
								normal: {}
							},
							data: [320, 332, 301, 334, 390, 330, 320,320, 332, 301, 334, 390]
						},
						{
							name: '五类烟',
							type: 'line',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {
								normal: {}
							},
							data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290]
						}
					]
					}
				}
			}
		},
		mounted() {
			this.drawLine();
			this.drawLine2();
			this.drawLine3();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById('myChart'))
				// 绘制图表

				myChart.setOption(this.params.option);
			},
			drawLine2() {
				// 基于准备好的dom，初始化echarts实例
				let myChart2 = echarts.init(document.getElementById('myChart2'))
				// 绘制图表

				myChart2.setOption(this.params.option);
			},
			drawLine3() {
				// 基于准备好的dom，初始化echarts实例
				let myChart3 = echarts.init(document.getElementById('myChart3'))
				// 绘制图表

				myChart3.setOption(this.params.option);
			}
		}
	}
</script>

<style lang="less" scoped>
	.linechart {
		width: 1200px;
		height: 500px;
		margin-top: 100px;
		/*background: #000000;*/
	}
</style>