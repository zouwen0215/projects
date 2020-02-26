<template>
	<!--<Content :style="{ minHeight: '280px', background: '#fff'}">
		<Layout>
			<Sider hide-trigger :style="{background: '#fff'}" v-show="$store.state.user.LoginedUser.nav.path[$store.state.user.LoginedUser.nav.choose.first].path.length">
				<Menu active-name="0-0" theme="light" width="auto" :open-names="['1']">
					<div v-for="(item,i) in $store.state.user.LoginedUser.nav.path[$store.state.user.LoginedUser.nav.choose.first].path" :key='i'>
						<MenuItem :name="i" v-if="!$store.state.user.LoginedUser.nav.path[$store.state.user.LoginedUser.nav.choose.first].path[i].path.length">
						<Icon type="ios-people"></Icon>
						{{item.name}}{{$store.state.user.LoginedUser.nav.choose.second}}
						</MenuItem>
						<Submenu :name="i" v-if="$store.state.user.LoginedUser.nav.path[$store.state.user.LoginedUser.nav.choose.first].path[i].path.length">
							<template slot="title">
								<Icon type="ios-keypad"></Icon>
								{{item.name}}
							</template>
							
							<MenuItem :name="i +'-'+key" v-for="(items ,key) in $store.state.user.LoginedUser.nav.path[$store.state.user.LoginedUser.nav.choose.first].path[i].path" :key='key'>{{items.name}}{{i +'-'+key}}</MenuItem>
						</Submenu>
					</div>
				</Menu>
			</Sider>
			<Content :style="{padding: '0 24px', minHeight: '280px', background: '#fff'}">
				<Breadcrumb :style="{margin: '16px 0'}">
					<BreadcrumbItem>Home</BreadcrumbItem>
					<BreadcrumbItem>Components</BreadcrumbItem>
					<BreadcrumbItem>Layout</BreadcrumbItem>
				</Breadcrumb>
				<div class="layoutContain">
					<router-view></router-view>
				</div>
			</Content>
		</Layout>
	</Content>-->
</template>

<script>
	export default {
		props: {
			param: {}
		},
		methods: {
			//			loggedOut: function() {
			//				let _self = this;
			//				_self.$store.commit('loggedOut')
			//			}
		}
	}
</script>

<style>

</style>