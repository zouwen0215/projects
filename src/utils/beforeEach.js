import router from '../router'
import store from '../store'
import Vue from 'vue'

//鉴权路由拦截TokenKey(导航守卫)
const whiteList = ['/login', '/404', '/test'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	store.commit('goto', getMessage(to)); //自动匹配菜单
	let status = store.state.user.status;
	console.log(to)
	if(status) {
		if(to.path == '/login' || to.path == '/') {
			next({
				path: '/dashboard'
			})
		} else {
			if(whiteList.indexOf(to.path) == -1){
				store.commit('history',to)
			}
			
			next();
		}
	} else {
		if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入)
			next()
		} else {
			next({
				path: '/login'
			})
		}
	}
});

function getMessage(to) {
	let goto = {}
	let arr = store.state.user.menu;
	if(arr.length) {
		for(let i = 0; i < arr.length; i++) {
			if(JSON.stringify(arr[i]).indexOf(to.path) >= 0) {
				goto.first = i
				if(arr[i].children.length <= 0) {
				} else {
					for(let j = 0; j < arr[i].children.length; j++) {
						if(JSON.stringify(arr[i].children[j]).indexOf(to.path) >= 0) {
							if(arr[i].children[j].children.length <= 0) {
								goto.second = j;
							} else {
								for(let k = 0; k < arr[i].children[j].children.length; k++) {
									if(JSON.stringify(arr[i].children[j].children[k]).indexOf(to.path) >= 0) {
										goto.second = j + '-' + k;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return goto;
}