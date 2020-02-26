<template>
	<div class="login">
		<!--<div class="contain">
			<img class="back" src="../../../static/icon/back.png"/>
			<img class="logo" src="../../../static/icon/logo.png" />
			<p>江西烟草数据统计平台</p>
		</div>
		<div class="box">
			<div class="icon">
			<img src="../../../static/icon/person.png"/>
			<p class="title">用户登录</p>
			</div>
			<div class="name">
			<p>用户名</p>
			<el-input style="height:52px ;" size="medium" class="input" v-model="params.username"   placeholder="请输入用户名"></el-input>
			</div>
           <div class="pass">
            <p>密码</p>
			<el-input style="height:52px ;" size="medium" type="password"  class="input" v-model="params.password" placeholder="请输入密码"></el-input>
			</div>
			<div>
				 <el-button  class="button" type="success"  v-on:click="login">登 录</el-button>
			</div>
		</div>-->
		<div>
			<div class="logo">
				<img src="../../../static/icon/logo.png" />
				<p>江西烟草数据统计平台</p>
			</div>
		</div>
		<div>
			<div class="contain">
				<div class="title">
					<img src="../../../static/icon/person.png" />
					<p>用户登录</p>
				</div>
				<div class="input">
					
					<span>账号</span><input class="elput" v-model="params.username"   placeholder="请输入账号"/>
				</div>
				<div class="input">
					<span>密码</span>
			         <input class="elput" type="password" v-model="params.password" placeholder="请输入密码"/>
				</div>
				<div class="btn">
				 <el-button  class="button" type="success"  v-on:click="login" @keyup.enter="login"><span>登 录</span></el-button>
			   </div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../../utils/http.js'
	import URL from '../../utils/url.js'
	import validation from '@/utils/validation.js'
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				params: {
					username: window.sessionStorage.getItem("userName"),
					password: '',
				}
			}
		},
		methods: {
		login: function() {
				let _self = this;
				let pwds = md5(_self.params.password);
				let pwd = pwds + _self.params.tokenString + _self.params.randomCode;
				let body = {
					userName: _self.params.username,
					password: pwd ? md5(pwd) : "",

				};
				_self.$store.commit('managementLogin', body)
			},
			getToken() {
				let _self = this;
				let url = URL.ENGIN.SCORCE + URL.PORT.GET_TOKENS;
				http.publicRequest('get', url, '', function(res) {
					let result = res.body.data;
					_self.params.tokenString = result.tokenString;
					_self.params.randomCode = result.randomCode;
					sessionStorage.setItem("tokenString", result.tokenString)
					console.log(result)
				}, function(res) {})
			},
		},
		created() {
		  let _self = this;
		  _self.getToken()
//		  window.sessionStorage.removeItem('vuex-along')
//		  _self.keyupEnter()
		}
	}
</script>

<style lang="less" scoped>
	.login {
		width: 100vw;
		height: 100vh;
		display: flex;
		&>div:nth-child(1) {
			/*width: 40%;*/
			flex: 1;
			background: url(../../../static/icon/back.png) no-repeat;
			background-size: 100% 100%;
			position: relative;
			.logo {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				img {
					margin-bottom: 30px;
				}
				p {
					font-size: 24px;
					color: #F0FBF7;
				}
			}
		}
		&>div:nth-child(2) {
			width: 60vw;	
			min-width: 700px;	
			position: relative;
			.contain {
				padding: 50px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				.title {
					display: flex;
					
					p {
						font-size: 30px;
						color: #333333;
						margin-left: 15px;
					}
				}
				.input{
					display: flex;
					margin-top: 50px;
					 span{
					 	width:80px ;
					 	font-size: 24px;
					 	color: #aaaaaa;
					 	text-align: left;
					 	line-height: 52px;
					 	margin-right: 10px;
					 }
					 .elput{
					 	background-color: #f6f7f9;
						border-radius: 5px;
						border: none;
						height: 52px;
						width: 552px;
						padding-left: 20px;
					 }
					 
					
				}
				.btn{
					margin-top: 70px;
					.el-button{
						width: 400px;
						height: 52px;
						
						span{
							font-size: 28px;
	   						color: #ffffff;
						}
					}
				}
				
			}
		}
		/*.contain{
			display: flex;
			.back{
				  width: 40%;
	              height: 100%;
	              position: absolute;
				} 
				.logo{
					position: relative;
					margin-left: 300px;
					margin-top:300px;
					width: 90px;
	                height: 94px;
				}
				p{
			    font-size: 24px;
			     position: relative;	
			     color: #FFFFFF;
					margin-top:430px;
					margin-left: -160px;
			}
		}
		.box {
			width: 800px;
			height: 300px;
			margin-left: 800px;
			margin-top: -280px;
			.name{
			  display: flex;
			  margin-top:50px;
			 
			  p{
			  font-size: 24px;	
			  color: #aaaaaa;
			  margin-top: 8px;
			  }	
			.input {
			   width: 522px;
	           background-color: #f6f7f9;
	           border-radius: 5px;
	           margin-left: 10px;
	         
			}
			}
			.pass{
			  display: flex;
			  margin-top:50px;
			  
			  p{
			  font-size: 24px;	
			  color: #aaaaaa;
			   margin-top: 8px;
			  }	
			.input {
			   width: 522px;
	           background-color: #f6f7f9;
	           border-radius: 5px;
	           margin-left: 35px;
	         
			}
			}
			.icon{
				display: flex;
				p{
					font-size: 30px;
					margin-left: 20px;
					color: #333333;
				}
				
			}
		
			
			.button {
			   width: 400px;
	           height: 52px;
	           background-color: #23c88e;
	           border-radius: 5px;
	           font-size: 28px;
	           color: #ffffff;
	           margin-top: 50px;
	           margin-left: -120px;
			}
			
		}
		.el-input--medium .el-input__inner{
			 height: 52px;
		}*/
	}
</style>