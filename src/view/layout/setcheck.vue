<template>
	<div>
		<el-popover placement="bottom" width="200" trigger="click">
			<div>
				<el-checkbox v-model="params.checked1" class="check">
					<el-tooltip placement="right-start">
						<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
						<el-button class="but" type="text">一类烟</el-button>
					</el-tooltip>
				</el-checkbox>
				<el-checkbox v-model="params.checked2" >
					<el-tooltip placement="right-start">
						<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
						<el-button class="but2" type="text">二类烟</el-button>
					</el-tooltip>
				</el-checkbox>
				<el-checkbox v-model="params.checked3">
					<el-tooltip placement="right-start">
						<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
						<el-button class="but3" type="text">三类烟</el-button>
					</el-tooltip>
				</el-checkbox>
				<el-checkbox v-model="params.checked4">
					<el-tooltip placement="right-start">
						<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
						<el-button class="but4" type="text">四类烟</el-button>
					</el-tooltip>
				</el-checkbox>
			</div>
			<el-button slot="reference" class="btns">关注设置</el-button>
		</el-popover>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
				params: {
					checked1: true,
					gridData: ['黄鹤楼', 'Runoob', 'Runoob']
				}
			};
		},
		props:{
			
		},
	};
</script>

<style lang="less" scoped>
	.check{
		margin-left: 30px;
	}
	.btns{
		height: 25px;
		background-color: #8CC5FF;
		font-size: 10px;
		color: #fff;
	}
</style>