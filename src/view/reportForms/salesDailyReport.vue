<template>
	<template-page :param="params" v-on:handleSize="handleSizeChange" v-on:handleCurrent="handleCurrentChange">
		<div class="buttonRegion" slot="buttonRegion">
			<div class="search">
				<div>
					<span>地市：</span>
					<el-select v-model="params.search.channelId" placeholder="请选择">
						<el-option v-for="item in params.dataForm.channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
					<span>时间：</span>
					<el-date-picker v-model="params.search.createTime" type="month" placeholder="选择月" format="yyyy 年 MM 月" value-format="yyyy-MM" :picker-options="params.pickerOptions"></el-date-picker>
					<el-button type="success" @click.native="loadTotalFirst">搜索</el-button>
					<el-button @click.native="reset">重置</el-button>
				</div>
				<div>
					<el-button class="download" type="success" @click.native="loadExcel">导出报表</el-button>
				</div>
			</div>
		</div>
		<div slot="pageTitle" class="pageTitle"></div>
		<div slot="pageRegion" class="pageRegion">
			<el-table :data="params.infor" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
				<el-table-column prop="dayTime" label="日期" width="160"></el-table-column>
				<el-table-column prop="shopNum" label="试点商户数"></el-table-column>
				<el-table-column prop="infor.goodsFlag" label="类型">
					<template slot-scope="scope">{{scope.row.infor.goodsFlag?"卷烟":"非卷烟 "}}</template>
				</el-table-column>
				<el-table-column prop="infor.barCodeNum" label="销售品类"></el-table-column>
				<el-table-column prop="infor.amountSum" label="销售数量"></el-table-column>
				<el-table-column prop="infor.totalGoodsPriceSum" label="销售金额"></el-table-column>
				<el-table-column prop="infor.scanTotalGoodsConsume" label="系统收款金额"></el-table-column>
				<el-table-column prop="infor.otherTotalGoodsConsume" label="其他收款金额"></el-table-column>
			</el-table>
		</div>
		<!--弹窗-->
		<div class="pageDialog" slot="pageDialog">
			<div style="text-align: left;">
				<p>温馨说明:</p>
				<p>1、试点商户:指使用我们的系统的零售户数(测试店会被排除掉)</p>
				<p>2、销售品类:指卖出的单品种类</p>
				<p>3、销售数量:指销售品类卖出的个数合计</p>
				<p>4、销售金额:指销售品类卖出的金额合计，如有打折以打折前金额计算</p>
				<p>5、系统收款金额:指支付走收银系统的微信或者支付宝的金额合计</p>
				<p>6、其他收款金额:指不走系统支付，线下收款的金额合计</p>
				<p>7、品类及数量说明:同种烟一条烟与一包属于一个品类， 以最小单位计算数量。</p>
			</div>
		</div>
	</template-page>
</template>

<script>
	import templatePage from "../template/templatePage";
	import http from "@/utils/http.js";
	import common from "@/utils/common.js";
	import URL from "@/utils/url.js";
	import validation from "@/utils/validation.js";
	export default {
		data() {
			return {
				params: {
					infor: [],
					//分页组建
					pagination: {
						currentPage: 1,
						pageNum: 1,
						pageSize: 10,
						total: 1,
						hasPage: true
					},
					dataForm: {
						channelList: [],
						goodsFlag: {
							"0": "非卷烟",
							"1": "卷烟"
						}
					},
					search: {
						channelId: 1,
						createTime: "",
						pageNum: "",
						pageSize: ""
					},
					pickerOptions: {
						disabledDate(time) {
							let curDate = new Date().getTime();
							return time.getTime() > curDate;
						}
					}
				}
			};
		},
		components: {
			templatePage
		},
		methods: {
			getDate() {
				let _self = this;
				let curDate = new Date();
				var seperator = "-";
				let year = curDate.getFullYear();
				let month = curDate.getMonth() + 1;
				if(month > 0 && month <= 9) {
					let curMonth = year + seperator + 0 + month;
					_self.params.search.createTime = curMonth;
				} else {
					let curMonth = year + seperator + month;
					_self.params.search.createTime = curMonth;
				}
			},
			loadExcel: function() {
				let _self = this;
				let search = _self.params.search;
				let url = URL.ENGIN.SCORCE + URL.PORT.SELE_EXCEL;
				let data = {
					id: 0,
					channelId: search.channelId,
					createTime: search.createTime
				};
				url = http.filterUrl(data, url);
				url = window.location.origin + url;
				window.open(url);
				console.log(url);
			},
			reset: function() {
				let _self = this;
				_self.params.search = validation.reset(_self.params.search);
				_self.loadMessage();
			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex <= 1) {
					if(rowIndex % 2 === 0) {
						return {
							rowspan: 2,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			},
			handleSizeChange(index) {
				let _self = this;
				_self.params.pagination.pageSize = index;
				_self.loadMessage();
			},
			handleCurrentChange(index) {
				let _self = this;
				_self.params.pagination.pageNum = index;
				_self.loadMessage();
			},
			loadChannel: function() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE + URL.PORT.CHANNEL_LIST;
				console.log(url);
				let data = {
					id: "0",
					pageNum: 1,
					pageSize: 1000
				};
				url = http.filterUrl(data, url);
				let params = http.data;
				http.publicRequest(
					"GET",
					url,
					"",
					function(res) {
						let result = res.body.data;
						_self.params.dataForm.channelList = result;
						_self.loadMessage();
					},
					function(res) {}
				);
			},
			loadTotalFirst() {
				let _self = this;
				_self.params.pagination.pageNum = 1;
				_self.loadMessage();
			},
			loadMessage() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE + URL.PORT.SELE_DETAIL_IST;
				let data = {
					id: 0,
					channelId: search.channelId,
					createTime: search.createTime,
					pageNum: pagination.pageNum,
					pageSize: pagination.pageSize
				};
				url = http.filterUrl(data, url);

				http.publicRequest(
					"get",
					url,
					"",
					function(res) {
						_self.params.pagination.total = validation.total(res);
						let result = JSON.parse(JSON.stringify(res.body.data));
						let datas = [];
						//						for(let key of result) {
						//							for(let i = 0; i < 2; i++) {
						//								if(i == 0) {
						//									key.infor = key.nonSmokeSaleDailyGoodsStatisticeResult;
						//									datas.push(JSON.parse(JSON.stringify(key)));
						//								} else {
						//									key.infor = key.smokeSaleDailyGoodsStatisticeResult;
						//									datas.push(JSON.parse(JSON.stringify(key)));
						//								}
						//							}
						//						}
						//						_self.params.infor = datas;
						for(let key of result) {
							let item = [{
								infor: {}
							}, {
								infor: {}
							}];
							console.log("000", item);
							item[0].dayTime = key.dayTime,
								item[0].shopNum = key.shopNum,
								item[0].infor.goodsFlag = 0;
							item[0].infor.barCodeNum = key.noTobaccoBarCodeNum;
							item[0].infor.amountSum = key.noTobaccoAmountTotal;
							item[0].infor.totalGoodsPriceSum = key.noTobaccoGoodsConsume;
							item[0].infor.scanTotalGoodsConsume = key.noTobaccoSystemPay;
							item[0].infor.otherTotalGoodsConsume = key.noTobaccoCashPay;

							item[1].dayTime = key.dayTime,
								item[1].shopNum = key.shopNum,
								item[1].infor.goodsFlag = 1;
							item[1].infor.barCodeNum = key.tobaccoBarCodeNum;
							item[1].infor.amountSum = key.tobaccoAmountTotal;
							item[1].infor.totalGoodsPriceSum = key.tobaccoGoodsConsume;
							item[1].infor.scanTotalGoodsConsume = key.tobaccoSystemPay;
							item[1].infor.otherTotalGoodsConsume = key.tobaccoCashPay;
							datas.push(JSON.parse(JSON.stringify(item[0])));
							datas.push(JSON.parse(JSON.stringify(item[1])));
						}
						console.log("aaaaaaaaaaaaaaaaaaaa", datas)
						_self.params.infor = datas;
					},
					function(res) {}
				);
			}
		},
		created() {
			this.getDate();
			this.loadChannel();
		}
	};
</script>

<style lang="less" scoped>
	.search {
		background-color: #ffffff;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		&>span {
			font-size: 14px;
		}
		.el-date-picker {
			width: 200px;
		}
		.el-date-editor {
			margin: 0 5px;
		}
		.el-input {
			margin: 0 5px;
			width: 200px;
		}
		.download {
			margin-left: 150px;
		}
	}
	
	.pageRegion {
		margin-top: -15px;
		padding: 10px;
		background-color: #ffffff;
	}
	
	.pageDialog {
		padding-left: 10px;
		padding-top: 20px;
		background-color: #ffffff;
	}
</style>