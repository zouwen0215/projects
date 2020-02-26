<template>
	<div>
		<div>
			<p>其他数据   
				地市：<el-select v-model="params.areacode" placeholder="">
						<el-option v-for="item in params.areacodeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select></p>
		</div>
		<div id="myChart" class="linechart"></div>
		<div id="myChart2" class="linechart"></div>

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
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				params: {
					/*areacode:'',*/
					areacodeList: [{
							value: '0',
							label: '全省'
						}, {
							value: '1',
							label: '南昌'
						}, {
							value: '2',
							label: '九江'
						}, {
							value: '3',
							label: '宜春'
						}, {
							value: '8',
							label: '新余'
						}, {
							value: '9',
							label: '上饶'
						}],
					option: {

						title: {
							text: '某站点用户访问来源',
							subtext: '纯属虚构',
							x: 'center'
						},
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						/*legend: {
							orient: 'vertical',
							left: 'left',
							data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
						},*/
						series: [{
							name: '访问来源',
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
						}]
					}
				}
			}
		},
		props: {

		},
		mounted() {
			this.drawLine();
			this.drawLine2();

		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById('myChart'))
				let option = JSON.parse(JSON.stringify(this.params.option))
				//....
				/*console.log(option)
				option.legend.data = ['11', '22', '33', '222', '44']*/
				// 绘制图表
				myChart.setOption(option);
			},
			drawLine2() {
				// 基于准备好的dom，初始化echarts实例
				let myChart2 = echarts.init(document.getElementById('myChart2'))
				// 绘制图表
				myChart2.setOption(this.params.option);
			},

		},
		created(){
//			console.log(this.$store.state.user.userStyle.)
		}
	}
</script>

<style lang="less" scoped>
	.linechart {
		width: 500px;
		height: 500px;
		/*background: #000000;*/
	}
</style>