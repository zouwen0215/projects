import router from '../../router'
import path from '../../assets/json/path.json'
import http from '@/utils/http.js'
import common from '@/utils/common.js'
import URL from '@/utils/url.js'
import validation from '@/utils/validation.js'

const state = {
    userStyle: {},
    status: false, //登陆
    tokenString: '', // tokenString
    menu: [],
    level: [],
    userInfor: {},
    history: [],
    choose: {
        first: '0',
        second: '0'
    },
    LoginedUser: {
        history: [],
        nav: {
            choose: {
                first: '0',
                second: '0',
                total: {},
            },
            path: [],
        },

    }
};
const getters = {
    not_show(state) { //这里的state对应着上面这个state
        return !state.status;
    }
};
//const mutations = {
//	managementLogin(state, body) { //这里的state对应着上面这个state
//		let _self = this;
//		state.userInfor = {};
//		let url =URL.ENGIN.SCORCE+ URL.PORT.LOGIN_API;
//		http.publicRequest('post', url, body, function(res) {
//			state.userInfor = res.body.data;
//			console.log(state.userInfor )
//			let roleId = state.userInfor.roleId;
//			menuGet(roleId, function(val) {
//				console.log(val)
//				let limits = JSON.parse(val);
//				let menu = JSON.parse(JSON.stringify(path.menu));
//				set(menu, limits);
//				del(menu);
//				state.menu = JSON.parse(JSON.stringify(menu[0].children).replace(/label/g, 'title'));
//				state.status = true;
// 				console.log(state.menu)
           
// 				router.push(firstPage(state.menu));
//			});
//		}, function(res) {
//
//		})
//    
//		//你还可以在这里执行其他的操作改变state
//	},
const mutations = {
    managementLogin(state, body) { //这里的state对应着上面这个state
        let _self = this;
        state.userInfor = {};
        
        let url = URL.ENGIN.SCORCE+ URL.PORT.LOGIN_API;
     
        http.publicRequest("POST", url, body, function(res) {
            state.userInfor = res.body.data;
            console.log(state.userInfor)
             window.sessionStorage.setItem("userName", state.userInfor.userName)
             console.log('qqqqqqqqqqqqqqqqqqqq',window.sessionStorage.getItem("userName"))
             let menu = JSON.parse(JSON.stringify(path));
            console.log("caidan",path)
            if(state.userInfor.password=="cdc5bdff1f14db5f3186725fd6b877e1"){
             let limit = [72];
			 set(menu, limit);
			 del(menu);
			 menu[0].href='/modifyPwd'
		  	 state.status = true;
		  	 console.log('1111111',menu)
		  	 state.menu=menu
             router.push('/modifyPwd');		
            }else{
            let limits = JSON.parse(state.userInfor.config);
			set(menu, limits);
			del(menu);
			
            console.log( "aaaaaaaaaaaaaa",menu)
            state.status = true;
            state.menu=menu
            
            router.push(firstMenunu(state.menu[0]));	
            }  	      
        }, function(res) {

        })

        //你还可以在这里执行其他的操作改变state
    },
    saveLevel(state, param) {
        state.level = param;
        console.log(param)
    },
   loggedOut(state) {
        state.status = false;
        state.choose.first = "0";
        state.choose.second = "0";
        state.userInfor = {};
        state.history = [];
        router.push('/login');
        
    },
    chooseType(state, param) {
        let menu = state.menu;
        if(menu[param].children.length) {
            if(menu[param].children[0].children.length == 0) {
                state.choose.second = '0';
                router.push('.' + menu[param].children[Number(state.choose.second)].href);
            } else {
                state.choose.second = '0-0';
                router.push('.' + menu[param].children[Number(state.choose.second.split('-')[0])].children[Number(state.choose.second.split('-')[1])].href);

            }

        } else {
            console.log(menu[param].href)
            router.push('.' + menu[param].href);
        }
        state.choose.first = param;

    },
    handleList(state, param) {
        state.choose.second = param[0];
        router.push('.' + param[1].href)

    },
    routerCheck(state, param) {
        state.choose.first = param.first;
        state.choose.second = param.second;
        router.push('.' + param.href)
    },
    goto(state, param) {
        if(param.first) {
            state.choose.first = param.first;
            state.choose.second = param.second;
        }

    },
    history(state, params) {
        let pageInfor = {
            title: params.name,
            path: params.path
        }
        state.history.unshift(pageInfor)
    }

};
const actions = {
    login(context) { //这里的context和我们使用的$store拥有相同的对象和方法
        console.log(context)
        //      context.commit('switch_dialog');

        //你还可以在这里触发其他的mutations方法
    },
};

function firstMenunu(menu){
    let href = "";
    if(menu.children.length){
        href = firstMenunu(menu.children[0])
    }else{
        href = menu.href
    }
    return href;
}
function menuGet(tokenString, getMenu) {
    let url = URL.ENGIN.LOGIN+ URL.PORT.LOGIN_MENU;
    let data = {
        systemCode: "dataCenter",
        token: tokenString,
    };
    url = http.filterUrl(data, url);
    let params = {
        auth: true,
        tips: false,
        loading: true,
    }
    http.publicRequest("get", url, '', function(res) {
        getMenu(res.body.data)
    }, function(res) {

    })
}
function set(TreeViewNodeTmp, ids) {
	var isChildCheck = false;
	console.log('111',TreeViewNodeTmp)
	for(var i in TreeViewNodeTmp) {
		if(TreeViewNodeTmp[i].children.length) {
			if(set(TreeViewNodeTmp[i].children, ids)) {
				TreeViewNodeTmp[i].check = true;
				isChildCheck = true;
			} else {
				TreeViewNodeTmp[i].check = false;
			}
		} else {
			let has = false;
			ids.forEach(function(obj,index){
				if(obj == TreeViewNodeTmp[i].id){
					has = true;
				}
			})
			if(has) {
				TreeViewNodeTmp[i].check = true;
				isChildCheck = true;
			} else {
				TreeViewNodeTmp[i].check = false;
			}
		}
	}
	if(isChildCheck) {
		return true;
	} else {
		return false;
	}

}

function del(TreeViewNodeTmp) {
	for(var i = 0; i < TreeViewNodeTmp.length; i++) {
		if(TreeViewNodeTmp[i].check) {
			del(TreeViewNodeTmp[i].children);
		} else {
			TreeViewNodeTmp.splice(i, 1)
			i--;
		}

	}
}
function userStyle(userid, getUserStyle) {
    let url = URL.ENGIN.LOGIN+ URL.PORT.LOGIN_USER_STYLE;
    let data = {
        userid: userid
    };
    url = http.filterUrl(data, url);
    let params = {
        auth: true,
        tips: false,
        loading: true,
    }
    http.publicRequest("get", url, '', function(res) {
        getUserStyle(res.body.data)
    }, function(res) {

    })
}

function userInforGet(tokenString, getUserInfor) {
    let url = URL.ENGIN.LOGIN+ URL.PORT.LOGIN_INFOR;
    let data = {
        token: tokenString,
    };
    url = http.filterUrl(data, url);
    let params = {
        auth: true,
        tips: false,
        loading: true,
    }
    http.publicRequest("get", url, '', function(res) {
        let result = res.body.data;
        console.log(JSON.parse(result.description))
        result.channelId = JSON.parse(result.description).channelId;
        result.datatype = JSON.parse(result.description).datatype;
        getUserInfor(result)
        //      state.userInfor = result;
        //      router.push('/dashboard');
    }, function(res) {

    })
}

export default {
    state,
    getters,
    actions,
    mutations,
}