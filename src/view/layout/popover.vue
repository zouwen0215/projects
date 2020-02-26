<template>
	<div class="popover">
		<!--<el-popover placement="right" width="120" trigger="hover">
			<div>
				<p v-for="(item,index) in params.gridData">{{item}}</p>
			</div>
			<el-button slot="reference">click 激活</el-button>
		</el-popover>-->
		<el-tooltip placement="right-start">
			<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
			<el-button class="but" type="text">一类烟</el-button>
		</el-tooltip>
		<el-tooltip placement="right-start">
			<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
			<el-button class="but" type="text">二类烟</el-button>
		</el-tooltip>
		<el-tooltip placement="right-start">
			<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
			<el-button class="but" type="text">三类烟</el-button>
		</el-tooltip>
		<el-tooltip placement="right-start">
			<div slot="content" v-for="(item,index) in params.gridData">{{item}}<br/></div>
			<el-button class="but" type="text">四类烟</el-button>
		</el-tooltip>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				visible: false,
				params: {
					gridData: ['黄鹤楼黄鹤楼', 'Runoob', 'Runoob']
				}

			};
		},
		/*props: {
			param: {
				default: function() {
					return {
						gridData:[],
					}
				}
			},
		}*/
	}
</script>

<style lang="less" scoped>
	.but{
		background-color: #cd6889;
		color: #fff;
		/*width: 60px;*/
		font-size: 10px;
		/*text-align: center;*/
		line-height: 5px;
	}
</style>