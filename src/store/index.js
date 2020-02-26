import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import member from './modules/member'//dataCenter.js
Vue.use(Vuex)

import vuexAlong from 'vuex-along'
vuexAlong.watchSession([], false);
vuexAlong.onlySession (true);

export default new Vuex.Store({
	modules: {
		user: user,
		member: member,//其他组件
	},
	plugins :[vuexAlong]
})