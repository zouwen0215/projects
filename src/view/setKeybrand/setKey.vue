<template>
	<template-page :param="params" v-on:handleSize="handleSizeChange" v-on:handleCurrent="handleCurrentChange">
		<div class='buttonRegion' slot="buttonRegion">
			<!--<div class="button">
				<el-button type="success">卷烟排名</el-button>
				<el-button @click="roadTo">区域排名</el-button>
			</div>-->
			<div class="search">
					<span class="demonstration">品类：</span>
					<el-select v-model="params.search.kind" placeholder="请选择">
						<el-option v-for="item in params.kindList" :key="item.id" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<span class="demonstration">商品名称、条码：</span>
					<el-input type="text" v-model="params.search.goodsName" placeholder="请输入商品名称、条码"></el-input>
					<el-button class="firstbutton" type="success" @click.native="loadTotalFirst">搜索</el-button>
					<el-button @click.native="reset">重置</el-button>
			</div>
		</div>
		
		<div slot="pageRegion" class="pageRegion">
			<el-table :data="params.infor" border style="width: 100%; margin-top: 20px" >
				<el-table-column prop="category" label="品类" width="130">
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称">
				
				</el-table-column>
				<el-table-column prop="barcode" label="商品条码（包）">
					
				</el-table-column>
				<el-table-column prop="status" label="状态">
				 <template slot-scope="scope">
					<p  v-if="scope.row.status==0" @click="operate(scope.row)">非重点</p>
					<p  v-else="scope.row.status==1" @click="operate(scope.row)">重点</p>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="价格（包）">
					
				</el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
					<p class="operate" v-if="scope.row.status==0" @click="operate(scope.row)"><span style="color:#34C388FF ;">设为重点</span></p>
					<p class="operate" v-else="scope.row.status==1" @click="operate(scope.row)"><span style="color:#FF576BFF ;">取消重点</span></p>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--弹窗-->
		<div class="pageDialog" slot="pageDialog" ></div>
	</template-page>


</template>

<script>
	
	import templatePage from '../template/templatePage'
	import http from '@/utils/http.js'
import common from '@/utils/common.js'
import URL from '@/utils/url.js'
import validation from '@/utils/validation.js'
	import citychoose from "../../components/tools/citychoose"
	export default {
		data() {
			return {
				params: {
					areaCode: this.$store.state.user.userInfor.datatype,
					infor: [{}],
					selectedOptions: ["", "", ""],
					search:{
						kind:"",
						goodsName:"",
						status:""
					},
			        pagination: {
						currentPage: 1,
						pageNum: 1,
						pageSize: 10,
						total: 1,
						hasPage: true
					},
			kindList:[
			          {label:"全部",
			           value:"",
			        },{label:"一类烟",
			           value:"2001",
			        },{label:"二类烟",
			           value:"2002",
			        },{label:"三类烟",
			           value:"2003",
			        },{label:"四类烟",
			           value:"2004",
			       },],
				}
				
			}
		},
		components: {
			templatePage,
			citychoose
		},
		methods: {
			
			operate(row){
				let _self = this;
				if(row.status==0){
					_self.params.search.status=1
				}else{
					_self.params.search.status=0
				};
				let url = URL.ENGIN.SCORCE+ URL.PORT.SET_FOCUSBRAND;
				let body = {
					status:_self.params.search.status,
					barcode:row.barcode,
				}
				url = http.filterUrl(body, url);
				 
				http.publicRequest('put', url, body, function(res) {

				}, function(res) {})
				
				setTimeout(function() {
				_self.loadMessage();
			}, 0)

			},
			reset: function() {
			    let _self = this;
			    _self.params.search.kind="";
			     _self.params.search.goodsName="";
			      _self.loadMessage()
			},
            handleChange(value) {
			if(value.length==2){
               	value.push("")
               }
               console.log(value)

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
			loadTotalFirst() {
				let _self = this;
				_self.params.pagination.pageNum = 1;
				_self.loadMessage();
			},
			loadMessage() {
				 let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE+ URL.PORT.SET_KEY;
				let data = {
					id: 0,
					category:_self.params.search.kind,
					goodsName:_self.params.search.goodsName,
					barcode:_self.params.search.goodsName,
					pageNum: pagination.pageNum,
					pageSize: pagination.pageSize
				}
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					_self.params.pagination.total = validation.total(res);
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.infor = result;
					
				}, function(res) {}) 
				  
			
			
		}	
	
		},
		created() {
			let _self = this;
			
			_self.loadMessage();
			
		}
	}
</script>

<style lang="less" scoped>

	.button {
		margin-top: 15px;
		display: flex;
		margin-left: 15px;
		
	}
	
	.back {
		display: flex;
	}
	.buttonRegion{
		display: flex;
		background-color: #FFFFFF;
		
		.search {
		margin:0px 15px 0px ;
		margin-top: 15px;
		
		padding: 10px;
		
		.demonstration{
			
			margin-top: 4px;
		}
	   .el-input{
	   	width: 300px;
	   }
	  .el-button{
	  	margin-left: 15px;
	  }
	
	}
	}

	
	.pageRegion{
		padding: 10px;
		background-color: #FFFFFF;
		margin-top: -20px;
		.operate{
			color: blue;
			cursor: pointer;
		}
	}
	
</style>