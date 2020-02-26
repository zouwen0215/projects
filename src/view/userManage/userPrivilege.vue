<template>
	<template-page class="userPrivilege" :param="params" v-on:handleSize="handleSizeChange" v-on:handleCurrent="handleCurrentChange">

		<div slot="buttonRegion" class="buttonRegion">
			<div style="float: left;">
				
			<citychoose :parama="params" style="margin-bottom:10px ;"></citychoose>
			<span style="margin-left: -135px;font-size: 14px;">状态：</span>
			<el-select v-model="params.search.isStop" placeholder="账号状态">
				<el-option label="全部" value=""></el-option>
				<el-option label="停用" value="1"></el-option>
				<el-option label="启用" value="0"></el-option>
			</el-select>
		
			<el-button style="margin-left: 10px;" type="success" @click="loadTotalFirst">搜索</el-button>
			<el-button @click="reset">重置</el-button>
			<el-button class="ml10" type="primary" v-if="params.rolelength==0" @click="params.opendialog=true" style="float: right;">创建账号</el-button>
			<el-button class="ml10" type="primary" v-else @click="dialog(0,0)" style="float: right;">创建账号</el-button>
			<el-button type="primary" style="float: right;" @click="goto">角色管理</el-button>
         </div>
		</div>

		<div slot="pageRegion">
			<template>
				<el-table ref="multipleTable" :data="params.infor" border style="width: 100%">
					<el-table-column  label="账号所属区域" >
					<el-table-column  label="省份">
							<template slot-scope="scope">
							<p>江西省</p>
						</template>
					</el-table-column>
					<el-table-column prop="cityName" label="地市"></el-table-column>
					<el-table-column prop="areaName" label="区县"></el-table-column>
					<el-table-column prop="gridName" label="网格"></el-table-column>	
						
					</el-table-column>
					
					<el-table-column prop="userName" label="账号"></el-table-column>
					<el-table-column prop="cnName" label="使用人信息">
						<template slot-scope="scope">
							<p>{{scope.row.cnName}}</p>
							<p>{{scope.row.mobile}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间"></el-table-column>
					<el-table-column prop="roleName" label="角色"></el-table-column>
					<el-table-column prop="isStop" label="状态">
						<template slot-scope="scope">
							{{scope.row.isStop ? "停用" : "启用"}}
						</template>
					</el-table-column>
				
					

					<el-table-column label="操作" width="200" fixed="right">
						<template slot-scope="scope">
							<div class="operate">
								<p class="editText" plain @click="dialog(scope.row,1)">编辑</p>
								<p class="editText" plain v-if="scope.row.isStop" @click="useLink(scope.row)">启用</p>
								<p class="deleteText" plain v-if="!scope.row.isStop&&scope.row.userName!='admin'"  @click="stopLink(scope.row)">停用</p>
								<p class="editText" @click="resetPwd(scope.row)">重置密码</p>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</div>
		<!--弹窗-->
		<div class="pageDialog" slot="pageDialog">
			<el-dialog v-if="params.addMenu" :title="params.title" :visible.sync="params.addMenu" width="500px" center>
				<addPrivilege :param="params" v-on:reload="loadMessage"></addPrivilege>
			</el-dialog>
           	<el-dialog :visible.sync="params.opendialog" width="300px" center>
				<p>请先创建角色再进行账号创建</p>
				
				<span slot="footer" class="dialog-footer">
        	  <!--<el-button type="primary" @click="resetPassword" style="margin-right:40px;">确 定</el-button>-->
          <el-button type="success" @click="goto">去创建</el-button>
           <el-button  @click="params.opendialog=false">取消</el-button>
        
        </span>
			</el-dialog>
			<el-dialog title="重置密码" :visible.sync="params.DialogVisible" width="300px" center>
				<p>已重置密码为初始密码chushi1@</p>
				
				<span slot="footer" class="dialog-footer">
        	  <!--<el-button type="primary" @click="resetPassword" style="margin-right:40px;">确 定</el-button>-->
          <el-button type="success" @click="resetPassword">确定</el-button>
        
        </span>
			</el-dialog>
		</div>
	</template-page>
</template>

<script>
	import templatePage from "../template/templatePage";
	import http from "../../utils/http.js";
	import URL from "../../utils/url.js";
	import citychoose from "@/components/tools/citychoose";
	import validation from "@/utils/validation.js";
	import addPrivilege from "./part/addPrivilege";
	import common from "@/utils/common.js";
	import md5 from "js-md5";
	export default {
		data() {
			return {
				params: {
					cityCode:[""],
				    areaCode:[""],
				    gridCode:[""],
				    roleList:[],
					mapList: [], //网格列表
					addMenu: false,
					DialogVisible: false,
					opendialog:false,
					userId: "",
					userinfo:{},
					search: {
						cnName: "",
						isStop: "",
						userName: ""
					},
					optType:"",
					addInfor: {
					
					},
					dataForm: {
						goodsList: []
					},
					rolelength:0,
					infor: [{}],
					info: {},
					//分页组建
					pagination: {
						currentPage: 1,
						pageNum: 1,
						pageSize: 10,
						total: 1,
						hasPage: true,
						hasMenu: false
					}
				}
			};
		},
		components: {
			templatePage,
			addPrivilege,
			citychoose
		},
		methods: {
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
			reset() {
				let _self = this;
				window.location.reload();
				
			},
			goto(){
				let _self = this;
				_self._self.$router.push('/roleList')
			},
			dialog(val, type) {
				let _self = this;
				console.log()
				if(type==1) {
				 let url = URL.ENGIN.SCORCE + URL.PORT.USER_DETAIL;
				 let msg = {
					userId: val.id,
				};
				url = http.filterUrl(msg, url);
				http.publicRequest(
					"GET",
					url,
					"",
					function(res) {
						let result = res.body.data;
						 _self.params.addMenu = true;
						console.log(result)
						_self.params.addInfor = result;
					},
					function(res) {}
				);
				 _self.params.title="编辑账号"
				  _self.params.optType="edit"
				
				} else {
					_self.params.title="创建账号"
					_self.params.optType="creat"
					   _self.params.addMenu = true;
					
			
				}
              
			
			},
			resetPwd(item) {
				let _self = this;
				_self.params.userId = item.id;
				_self.params.DialogVisible = true;
			},
			resetPassword() {
				let _self = this;
				let url = URL.ENGIN.SCORCE + URL.PORT.RESET_PASSWORD;
				
					let data = {
						userId: _self.params.userId,
						password:'cdc5bdff1f14db5f3186725fd6b877e1'
					}
				
					url = http.filterUrl(data, url);
					http.publicRequest(
						"put",
						url,
						"",
						function(res) {
							_self.params.DialogVisible = false;
							common.messageFunc(
								"密码重置成功!",
								"success"
							);
						},
						function(res) {}
					);
				
				_self.params.DialogVisible=false;
			},
			useLink(item) {
				let _self = this;
				_self.$confirm("是否启用此账号？启用后该账户可继续登录使用", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
						center: true
					})
					.then(() => {
							let url = URL.ENGIN.SCORCE + URL.PORT.USER_USER_NOT;
						let data = {
							userId: item.id,
							state: false
						};
						url = http.filterUrl(data, url);
						let params = http.params;
						http.publicRequest(
							"put",
							url,
							"",
							function(res) {
								_self.$message({
									type: "success",
									message: "启用成功!"
								});
								_self.loadMessage();
							},
							function(res) {}
						);
					})
					.catch(() => {});
			},
		
			stopLink(item) {
				let _self = this;
				this.$confirm("是否停用此账号？停用后该账户无法进行登录使用", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
						center: true
					})
					.then(() => {
						let url = URL.ENGIN.SCORCE + URL.PORT.USER_USER_NOT;
						let data = {
							userId: item.id,
							state:true
						};
						url = http.filterUrl(data, url);
						let params = http.params;
						http.publicRequest(
							"put",
							url,
							"",
							function(res) {
								_self.$message({
									type: "success",
									message: "停用成功!"
								});
								_self.loadMessage();
							},
							function(res) {}
						);
					})
					.catch(() => {});
			},
			loadTotalFirst() {
				let _self = this;
				_self.params.pagination.pageNum = 1;
				_self.loadMessage();
			},
			addRoles() {
				let _self = this;
				let url =URL.ENGIN.SCORCE + URL.PORT.ROLE_SELECT;
				http.publicRequest(
					"get",
					url,
					"",
					function(res) {
						let result = res.body.data;
						let infor=[];
						infor=result;
						_self.params.rolelength=infor.length
						console.log(_self.params.rolelength)
					},
					function(res) {}
				);
			},
			loadMessage() {
				let _self = this;
				let search = _self.params.search;
				let pagination = _self.params.pagination;
				let url = URL.ENGIN.SCORCE + URL.PORT.GET_USERLIST_PRIVILEGE;
				let data = {
					id: 0,
					cityCode:_self.params.cityCode[0],
					areaCode:_self.params.areaCode[0],
					gridCode:_self.params.gridCode[0],
					isStop: search.isStop,
					pageNum: pagination.pageNum,
					pageSize: pagination.pageSize
				};
				url = http.filterUrl(data, url);
				let params = http.params;
				http.publicRequest(
					"get",
					url,
					"",
					function(res) {
						_self.params.pagination.total = validation.total(res);
						let result = res.body.data;
						console.log(result)
						_self.params.infor = result;
					},
					function(res) {}
				);
			}
		},
		created() {
			let _self = this;
			 _self.addRoles()
			  
			 _self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;

			_self.loadMessage();
			//	this.loadMap();
			//createUserName:_self.$store.state.user.userInfor.username
		}
	};
</script>

<style lang="less" scoped>
	.userPrivilege {
		// padding:15px;
		// background-color: #fff;
		.el-input{
		width:300px	
		}
		   .buttonRegion{
		   	height: 100px;
	  padding-left: 20px;
	   	padding-top: 10px;
	   	padding-bottom: 10px;
	   	margin-bottom: 20px;
	   	 background-color: #fff;
	   	 &>span{
	   	 
	   	 	margin-left: 30px;
	   	 	margin-top: 3px;
	   	 }
	   	 
	   	 
	   }
		.operate {
			&>p {
				display: inline;
				text-align: center;
				margin-left: 10px;
				
		    cursor: pointer;
			}
		}
		.add {
			text-align: left;
			margin-bottom: 10px;
		}
		.search {
			text-align: left;
		}
	}
	
	.img {
		width: auto;
		height: 60px;
	}
	
	.activitys {
		display: flex;
	}
	
	.btn {
		margin-bottom: 20px;
		.el-button {
			width: 200px;
		}
	}
</style>