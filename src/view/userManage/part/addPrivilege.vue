<template>
	<div class="addPrivilege">
		<el-form ref="form" :model="params" label-width="150px" :rules="rules">
			<el-form-item label="账号(登录名):" prop="userName">
				<el-input v-model="params.userName" placeholder="请输入账号" :disabled="param.optType=='edit'"></el-input>
			</el-form-item>
			<el-form-item label="初始密码" prop="password" v-if="param.optType=='creat'">
				<el-input placeholder="请输入密码:" type="text" v-model="params.password" disabled></el-input>
			</el-form-item>

			<el-form-item label="账号所属角色:" prop="roleId">
				<el-select v-model="params.roleId" placeholder :disabled="params.disableflag">
					<el-option v-for="item in params.roleList" :key="item.value" :label="item.name" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="账号所属省份:">
				<el-select v-model="params.provCode" placeholder disabled >
					<el-option v-for="item in params.provoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="账号所属地市:">
				<el-select v-model="params.cityCode" placeholder :disabled="params.citydisabled" @change="handleChangeCity()">
					<el-option v-for="item in params.cityoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="账号所属区县:">
				<el-select v-model="params.areaCode" placeholder :disabled="params.areadisabled" @change="handleChangeArea()">
					<el-option v-for="item in params.areaoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="账号所属网格:">
				<el-select v-model="params.gridCode" placeholder :disabled="params.griddisabled">
					<el-option v-for="item in params.gridoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-button v-if="!params.disableflag" type="primary" @click="onSubmites('form')" style="margin-right:40px;">保存</el-button>
			<el-button @click="param.addMenu = false">取 消</el-button>
		</el-form>
	</div>
</template>

<script>
	import http from "@/utils/http.js";
	import URL from "@/utils/url.js";
	import common from "@/utils/common.js";
	import validation from "@/utils/validation.js";
	export default {
		data() {
			return {
				rules: {
					userName: [{
							required: true,
							message: "账号不能为空",
							trigger: "blur"
						},
						{
							min: 1,
							max: 20,
							message: "账号不超过20个字"
						}
					],
                   
					roleId: [{
						required: true,
						message: "请选择角色",
						trigger: "blur"
					}],

				},
				params: {
					roleList: [],
					userName:"",
					loginType: '1',
					flag: false,
					roleId:"",
					disableflag: false,
					password: 'chushi1@',
					provoptions: [{
						label: "江西省",
						value: "11360000"
					}],
					cityoptions: [],
					areaoptions: [{}],
					gridoptions: [{}],
					cityCode: "",
					areaCode: "",
					gridCode: "",
					provCode: "11360000",
					citydisabled:false,
				    areadisabled:false,
				    griddisabled:false,
				},

			};
		},
		props: {
			param: {
				default: function() {
					return {}
				}
			}
		},
		methods: {
			onSubmites(formData) {
				let _self = this;
				_self.$refs[formData].validate(valid => {
					if(valid) {
						_self.onSubmite();
					}
				});
			},
			handleChangeCity(value) {
				let _self = this;
				if(_self.params.cityCode) this.$emit('cityChange', value)				
				_self.params.gridCode = '';
				_self.params.gridoptions = [];
				_self.loadArea()
				_self.params.areaCode = '';

			},
			handleChangeArea(value) {
				let _self = this;
				if(_self.params.areaCode) this.$emit('areaChange', value)
				_self.loadGrid()
				_self.params.gridCode = '';
				_self.params.gridoptions = [];
			},
			handleChangeGrid(value) {
				let _self = this;
				if(_self.params.gridCode) this.$emit('gridChange', value)
			},
			loadCity() {
				let _self = this;
				let url = URL.ENGIN.SCORCE + URL.PORT.GET_AREA;
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					for(let i in result) {
						_self.params.cityoptions.push(result[i]);
					}
					console.log(_self.params.cityoptions)
				}, function(res) {})

			},
			loadArea() {
				let _self = this;
				let url = URL.ENGIN.SCORCE + URL.PORT.GET_AREA;

				let data = {
					code: _self.params.cityCode
				}
				url = http.filterUrl(data, url);
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					if(_self.params.cityCode == "") {
						_self.params.areaoptions = []
						_self.params.gridoptions = [];
					} else {
						_self.params.areaoptions = result;
					}

				}, function(res) {})

			},
			loadGrid() {
				let _self = this;
				let url = URL.ENGIN.SCORCE + URL.PORT.GET_AREA;
				let data = {
					code: _self.params.areaCode
				}
				url = http.filterUrl(data, url);

				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.params.gridoptions = result;
				}, function(res) {})

			},
			doLogin() {
				let _self = this;
				_self.param.addInfor.mobile = _self.param.addInfor.mobile.replace(
					/([^0-9])+/g,
					""
				);

			},
            modifyData(){
            	let _self = this;
            	console.log("111111111",_self.param.addInfor)
            	let data =_self.param.addInfor;
            
            	_self.params.userName=data.userName;
            	_self.params.roleId=data.roleId;
            	_self.params.provCode='11360000';
            	_self.params.cityCode=data.cityCode;
            	_self.params.areaCode=data.areaCode;
            	_self.params.gridCode=data.gridCode;
            	
            },
			onSubmite() {
				let _self = this;
				let url = URL.ENGIN.SCORCE
				let methodType = "POST";
				if("edit" == _self.param.optType) {
					console.log("edit")
					url += URL.PORT.EDIT_USER
					methodType = "PUT";
				} else {
					url += URL.PORT.CREAT_USER
				}

				let body = {
					id: _self.param.addInfor.id,
					userName: _self.params.userName,
					roleId: _self.params.roleId,
					provinceCode: '11360000',
					cityCode: _self.params.cityCode,
					areaCode:_self.params.areaCode,
					gridCode: _self.params.gridCode,
					password: 'cdc5bdff1f14db5f3186725fd6b877e1'
				};
				http.publicRequest(
					methodType,
					url,
					body,
					function(res) {
						_self.param.addMenu = false;
						_self.$emit("reload");
					},
					function(res) {}
				);
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
						for(let key of result) {
							if(key.isStop==false){
								
								let roles = {
								value: key.id,
								name: key.roleName
							};
							_self.params.roleList.push(roles);
							}
							
							
						}
					},
					function(res) {}
				);
			}
		},
		created() {
			let _self = this;
            if(_self.$store.state.user.userInfor.level==1){
				_self.params.citydisabled=true
			}else if (_self.$store.state.user.userInfor.level==2){
				_self.params.citydisabled=true
				_self.params.areadisabled=true
			}else if (_self.$store.state.user.userInfor.level==3){
				_self.params.citydisabled=true
				_self.params.areadisabled=true
				_self.params.griddisabled=true
			}
		   _self.params.cityCode= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode= _self.$store.state.user.userInfor.gridCode;
			if(_self.param.optType == 'creat') {
				//_self.param.addInfor = {}
			} else {
				 _self.modifyData()
				if(_self.param.addInfor.userName == 'admin') {
					_self.params.disableflag = true
				}
			}

			_self.addRoles();

			_self.loadCity();
			if(_self.params.cityCode != '') {
				_self.loadArea();
				if(_self.params.areaCode != '') {
					_self.loadGrid();
				}
			}

		}
	};
</script>

<style lang="less" scoped>
	.addPrivilege {
		.el-form-item {
			text-align: left;
			textarea {
				resize: none;
			}
			.el-input {
				width: 220px;
			}
		}
	}
</style>