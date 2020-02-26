<template>
	<div class="overviewMember">

		<div class="search">
			<citychoose :param="params" v-on:cityChange="handleChange"></citychoose>
			<el-button type="primary" @click.native="loadMessage">搜索</el-button>
		</div>
		<div class="sumlist">
			<div>
				<p>共3425位会员</p>
				<p>日活会员57位</p>
				<p>月活会员349位</p>
				<p>消费会员2342位</p>
				<p>近7天复购有57位</p>
				<p>近30天复购有349位</p>
			</div>
			<div class="second">
				<p>近30天新增725位会员</p>
				<p>首单消费有567位</p>
				<p>再次复购有65位</p>
			</div>

		</div>
		<div class="choice">
			<el-row>
					<el-button v-for="(item,index) in params.buttonChoice" :key="index" :type="params.search.type==item.value?'danger':'primary'" @click="load(item.value)">{{item.name}}</el-button>
			</el-row>
		</div>
		<div class="bar">
				<div id="memberChart" ref="chart" class="lineChart"></div>
				<!--<div id="newChart" ref="chart" class="lineChart"></div>-->
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
				params:{
					
					selectedOptions: [],
					month: '',
					buttonChoice: [{
						type: "primary",
						value: "0",
						name: "店铺累积会员排名"
					}, {
						type: "primary",
						value: "1",
						name: "本月店铺新增会员排名"
					}],
					search:{
						type:0	
					},
					option: {
						color: ['#3398DB'],
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
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
							name: '直接访问',
							type: 'bar',
							barWidth: '60%',
							data: [10, 52, 200, 334, 390, 330, 220],
							 itemStyle:{
                                    normal:{
                                        color:'#ff7f27'
                                    }
                                },

						}]
					},
					
				}
			}
		},
		components:{
			citychoose
		},
		methods: {
			handleChange(value) {
				console.log(value)
			},
			loadBar() {

				let memberChart = echarts.init(document.getElementById('memberChart'));

				let option = JSON.parse(JSON.stringify(this.params.option));
				memberChart.setOption(option);

			},
			load(value) {
				let _self = this;
				if(value) _self.params.search.type = value;
				_self.loadBar(value);
				
			},
			
			
		},
		created() {
			let _self = this;
			setTimeout(function() {
				_self.loadBar(0);
				
			}, 0)
		}
	}
</script>

<style lang="less" scoped>
	.overviewMember {
		.search {
			margin-top: 10px;
			margin-left: 20px;
			display: flex;
			margin-bottom: 10px;
			/*justify-content: space-between;*/
			.el-button {
				margin-left: 20px;
			}
		}
		.sumlist {
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			padding: 10px 0;
			width:800px;
			&>div {
				flex: 1;				
				margin-left: 20px;
				margin-right: 30px;
				border: 1px dotted #333;
				line-height: 40px;
				&>p {
					font-size: 14px;
				}
				
			}
		}
		.lineChart{
			width: 100vm;
			height: 500px;
		}
		.choice{
			text-align: left;
			margin-top: 30px;
			margin-left: 20px;
			.el-button{
				display: inline-flex;
			}
		}
		
	}
</style>