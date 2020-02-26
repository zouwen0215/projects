<template>
	<div class="aaa">
		
		
       <p >当前密码为原始密码，为保障您的账户安全请进行账户验证及密码修改</p>
	

		<div class="modifyPwd">
			<div class="form" >
				<el-form ref="form" :model="params" :rules="rules" style="width: 500px;margin-left: 450px;">
					<el-form-item prop="mobile">
						<span style="margin-left: -290px;">请输入您的手机号:</span>
						<el-input  v-model="params.mobile" ></el-input>
					</el-form-item>
					<el-form-item  prop="cnName">
						<span style="margin-left: -280px;">请输入您的姓名:</span>
						<el-input type="text" v-model="params.cnName"></el-input>
					</el-form-item>
					<!--<el-form-item prop="oldPwd"><span>请输入原密码:</span>
						</span>
						<el-input type="password" v-model="params.info.oldPwd" ></el-input>
					</el-form-item>-->
					<el-form-item prop="password">
						<span style="margin-left: -250px;">请输入密码:</span>
						<el-input  type="password" v-model="params.password" placeholder="密码必须由8-12位数的英文、数字、符号组成" show-password></el-input>
					</el-form-item>
					<el-form-item prop="passwordTwo">
						<span style="margin-left: -280px;">请再次输入密码:</span>
						<el-input type="password" v-model="params.passwordTwo" show-password ></el-input>
					</el-form-item>
					<el-form-item class="button" >
					<el-button type="success" style="margin-right: 130px;" @click="onSubmite('form')">确定</el-button>
					<el-button style="margin-right: 160px;" @click="goto">取 消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import http from "@/utils/http.js";
	import URL from "@/utils/url.js";
	import common from "@/utils/common.js";
	import validation from "@/utils/validation.js";
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				rules: {
					    
						mobile:[{
							required: true,
							message: "请输入11位手机号码",
							trigger: "blur"
						}, {
							pattern: /^[1-9]{1}[0-9]{10}$/,
							message: "请输入11位手机号码"
						}],

						cnName: [{
							required: true,
							message: "姓名不能为空",
							trigger: "blur"
						},
						{
							min: 1,
							max: 30,
							message: "姓名不超过30个字"
						}
					],
					password: [{
						validator: this.validateConfig,
						trigger: 'blur'
					}],
					passwordTwo: [{
						validator: this.validateConfigs,
						trigger: 'blur'
					
					}],
				},
				params: {
					roleList: [],
					mobile:'',
					cnName:'',
					
						oldPwd: "",
						password: "",
						passwordTwo: "",
					
				}
			};
		},

		methods: {
			onSubmite(formData) {
				let _self = this;
				_self.$refs[formData].validate(valid => {
					if(valid) {
						_self.onSubmites();
					}
				});
			},
      goto(){
      	let _self = this;
      	_self.$store.commit("loggedOut");
      	
      },
      
			validateConfig(rule, value, callback) {
				let _self = this;
				//let olds = _self.$store.state.user.userInfor.password;
                let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]{8,12}$/;  
				console.log(value)
				if(reg.test(value)) {
					callback();
				} else {
					callback(new Error('密码必须由8-12位数的英文、数字、符号组成'));
				}
			},
			validateConfigs(rule, value, callback) {
				let _self = this;
				if(value == _self.params.password) {
					callback();
				} else {
					callback(new Error('两次密码输入不一致'));
				}
			},
			onSubmites() {
				let _self = this;
				let url = URL.ENGIN.SCORCE + URL.PORT.PASSWARD_EDIT;
				let body = {
					userName:_self.$store.state.user.userInfor.userName,
					cnName:_self.params.cnName,
					mobile:_self.params.mobile,
					password: md5(_self.params.password),
				};
				
				http.publicRequest('put', url, body, function(res) {
					_self.$store.commit("loggedOut");
					common.messageFunc(
								"密码修改成功，请重新登录!",
								"warning"
							);
				}, function(res) {})
			},
			concel(){
				let _self = this;
				_self.params.mobile=''
				_self.params.cnName=''
				_self.params.oldPwd=''
				_self.params.password=''
				_self.params.passwordTwo=''
			}

		},
		created() {
			let _self = this;

		}
	};
</script>

<style lang="less" scoped>
	.aaa {
		padding-top: 30px;
		padding-bottom: 30px;
		background: #FFFFFF;
		margin-top: 15px;
		margin-left: 15px;
		 .button{
		     	margin-top: 40px;
		     } 	
		.logo{
			display:flex;
			img{
				width: 22px;
	         height: 24px;
			}
			p{
				margin-left: 10px;
				margin-top: 3px;
				font-size: 21px;
				color: #475669;
			}
		}
		.modifyPwd {
			margin-top: 20px;
			
			
			
		
		.form{
			
		
			.el-input{
				width: 330px;
			
			}
		    
		}
		
		}
	}
</style>