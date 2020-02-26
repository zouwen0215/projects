import Vue from 'vue'
import router from '../router'
import store from '../store';
import errorCodeMap from './errorCode';
import common from './common';

let httpService = new Vue({
	data: {
		imgUrl:"http://img.junfengtech.com.cn/img/",
		
	},
	methods: {
		filterUrl(data, url) {
			for(let key in data) {
				let keys = "{" + key + "}";
				url = url.replace(keys, data[key])
			}
			return url;
		},
		//通用请求方法
		//参数 “请求方式/地址/其他参数/请求参数/正确返回/错误返回”
		//其他参数包括“鉴权/loading/提示(auth/loading/tips)”
		publicRequest(method, url, body, suc, err) {
			let _self = this;
			let loading = _self.$loading({
				lock: true,
				text: '数据加载中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			_self.$http({
					method: method,
					url: url,
					body: body,
					headers: {
						Authorization:  'Bearer ' + window.sessionStorage.getItem('tokenString'),
					}
				})
				.then((res) => {
					loading.close();
//					suc(res);
					if(res.data.errorCode == 0) {
//						if(params.tips) common.messageFunc(res.data.errorMessage, errorCodeMap.get(res.data.errorCode).funcName)
						suc(res);
					} else if(res.data.errorCode == 401) {
						common.messageFunc(res.data.errorMessage, errorCodeMap.get(res.data.errorCode).funcName);
						store.commit('loggedOut')
					}else if(res.data.errorMessage && res.data.errorMessage.indexOf('token')>=0){
						
						 common.messageFunc('授权失败', errorCodeMap.get(res.data.errorCode).funcName);
							store.commit('loggedOut')
					}
					else {
						common.messageFunc(res.data.errorMessage, errorCodeMap.get(res.data.errorCode).funcName)
					}
				}, (res) => {
					loading.close();
					if(res.status == 0 || res.status == 404) {
						_self.$message("服务器正在升级中，请稍候！");
					}
					err(res);
				});
		}
	},
})

export default httpService;

/** 
 *             ,%%%%%%%%, 
 *           ,%%/\%%%%/\%% 
 *          ,%%%\c "" J/%%% 
 * %.       %%%%/ o  o \%%% 
 * `%%.     %%%%    _  |%%% 
 *  `%%     `%%%%(__Y__)%%' 
 *  //       ;%%%%`\-/%%%'
 * ((       /  `%%%%%%%' 
 *  \\    .'          | 
 *   \\  /       \  | | 
 *    \\/         ) | | 
 *     \         /_ | |__ 
 *     (___________))))))) 攻城湿 
 * 
 */