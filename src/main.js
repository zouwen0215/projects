import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import routerBefore from '@/utils/beforeEach.js'
import * as filters from './filters/filters'
import 'babel-polyfill'
import 'es6-promise/auto'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueResource from 'vue-resource'
import store from './store';
import '@/assets/style/public.css';
import '@/assets/style/replenishCss.css';
import '@/assets/font/iconfont.css';
import echarts from 'echarts';


import md5 from 'js-md5';

import imgBox from './components/imgBox/index';
Vue.use(imgBox);

let Base64 = require('js-base64').Base64;

Vue.use(ElementUI);
Vue.use(VueResource);
//Vue.use(iView);
Vue.prototype.$echarts = echarts ;
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {  
    Vue.filter(key, filters[key])  
})  

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>'
})