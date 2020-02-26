<template>
	<div class="templatePage">
		<div class="buttonRegion">
			<slot name="buttonRegion"></slot>
		</div>
		<div class="pageTitle">
			<slot name="pageTitle"></slot>
		</div>
		<div class="pageRegion">
			<slot name="pageRegion"></slot>
		</div>

		<div class="pageination" v-if="param.pagination.total && param.pagination.hasPage">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="param.pagination.currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="param.pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="param.pagination.total"></el-pagination>
		</div>
		<div class="pageDialog">
			<el-dialog title="功能列表" :visible.sync="param.pagination.hasMenu" width="300px">
				<function-list :funcMenus="funcMenu"></function-list>	
			</el-dialog>
			
			<slot name="pageDialog"></slot>
		</div>
		
	</div>
</template>

<script>
	import functionList from './functionList'
	export default {
		data() {
			return {

			}
		},
		components:{
			functionList
		},
		props: {
			param: {
				default: function() {
					return {
						pagination: {
							currentPage: 1,
							pageNum: 10,
							pageSize: 10,
							total: 100,
							hasPage: false,
							hasMenu:false,
						}
					}
				}
			},
			funcMenu:{
				type: Array,
				default: function() {
					return [{
						label: "常用功能1",
						limit: true,
						callback: () => {
							 this.$message('这是一条消息提示');
						},
						icon: ""
					}, {
						label: "常用功能2",
						limit: true,
						callback: () => {
							 this.$message('这是一条消息提示2');
						},
						icon: ""
					}]
				}
				
			}
		},
		methods: {
			//修改页面的显示个数pageSize
			handleSizeChange(val) {
				let _self = this;
				if(_self.param.pagination.hasPage) this.$emit('handleSize', val)

			},
			//修改显示页面pageNum
			handleCurrentChange(val) {
				let _self = this;
				if(_self.param.pagination.hasPage) this.$emit('handleCurrent', val)
			}
		},
		created() {}
	}
</script>

<style lang="less" scoped>
	.templatePage {
		padding: 10px 10px 10px 10px;
		.buttonRegion {
		}
		.pageRegion {
			margin-top: -20px;
			
		}
		.pageTitle{
			padding-bottom: 10px;
			background-color: #FFFFFF;
		}
		.pageination {
			background-color: #FFFFFF;
			
		}
	}
	
</style>