<template>
	<div>
		<div class="logo">
			签到中心
		</div>
		<el-menu :default-active="String($store.state.user.LoginedUser.nav.choose.first)" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item :index="String(index)" v-for="(item,index) in $store.state.user.LoginedUser.nav.path" :key="index">{{item.name}}{{index}}</el-menu-item>
		</el-menu>
		<div class="userinfo">
			<el-dropdown trigger="hover">
				<span class="el-dropdown-link userinfo-inner">
						<img src="static/icon/icon.jpg" /> 
					</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>我的消息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item divided @click.native="loggedOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},

		props: {
			param: ''
		},
		methods: {
			loggedOut: function() {
				let _self = this;
				_self.$store.commit('loggedOut')
			},
			chooseType(val) {
				let _self = this;
				_self.$store.commit('chooseType', val)
			}
		},
		created() {
			let _self = this;
			let nav = _self.$store.state.user.LoginedUser.nav;
		}
	}
</script>

<style>

</style>