import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout/layout'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/404',name: '404',component: () => import('@/view/error/404'),hidden: true},
    {path: '/login',name: 'login',component: () => import('@/view/login/login'),hidden: true},
    {path: '*',hidden: true,redirect: {path: '/404'}},
    {
			path: '/',
			name: '管理',
			component: layout,
			children: [
				{path: '/dashboard',name: '首页',component: () => import('@/view/homePage/dashboard')}, 
			
		//	-----------------------------------支付相关------------------------------------------------------
				{path: '/householdsRetail',name: '零售户概况',component: () => import('@/view/reportForms/householdsRetail')}, 
				{path: '/salesDailyReport',name: '销售日报表',component: () => import('@/view/reportForms/salesDailyReport')}, 
				{path: '/retailDailyReport',name: '零售户日报',component: () => import('@/view/reportForms/retailDailyReport')},
				{path: '/stockDetail',name:'库存详情',component:() => import('@/view/reportForms/stockDetail')},
				{path: '/billsRetail',name: '零售户账单',component: () => import('@/view/reportForms/billsRetail')},
				{path: '/generalPos',name: '终端pos概况',component: () => import('@/view/generalpos/generalPos')},
				{path: '/overviewMember',name: '会员概况',component: () => import('@/view/overviewMember/overviewMember')},
				{path: '/generalShop',name: '商品概况',component: () => import('@/view/goodsCount/generalShop')},
				{path: '/priceAlarmShow',name:'卷烟价格异常查询',component:()=> import('@/view/goodsCount/priceAlarmShow')},
				{path: '/priceAlarmSet',name:'卷烟价格波动预警设置', component:()=>import('@/view/goodsCount/priceAlarmSet')},
				{path: '/rankingSales',name: '进销存统计',component: () => import('@/view/goodsCount/rankingSales')},
				{path: '/rankingAreas',name: '区域排行',component: () => import('@/view/goodsCount/rankingAreas')},
				{path: '/rankingBrand',name: '品牌排行',component: () => import('@/view/goodsCount/rankingBrand')},
				{path: '/rankingRegion',name: '市区排行',component: () => import('@/view/goodsCount/rankingRegion')},
				{path: '/grossOnBased',name: '基于毛利分析',component: () => import('@/view/goodsCount/grossOnBased')},
				{path: '/rangePrice',name: '价位区间分析',component: () => import('@/view/goodsCount/rangePrice')},
				{path: '/smokeMarket',name: '卷烟市场情况',component: () => import('@/view/goodsCount/smokeMarket')},
				{path: '/salesRatio',name: '区间户均销量环比',component: () => import('@/view/goodsCount/salesRatio')},
				{path: '/brandDetectionKey',name: '基于重点品牌总量分析',component: () => import('@/view/goodsCount/brandDetectionKey')},
				{path: '/grossProfitAnalysis',name: '基于重点品牌毛利分析',component: () => import('@/view/goodsCount/grossProfitAnalysis')},

				{path: '/userPrivilege',name: '权限',component: () => import('@/view/userManage/userPrivilege')},
				{path: '/roleList',name: '角色',component: () => import('@/view/userManage/roleList')},
        {path: '/modifyPwd',name: '修改密码',component: () => import('@/view/login/modifyPwd')},
				

				{path: '/setKey',name: '设置',component: () => import('@/view/setKeybrand/setKey')},
				{path: '/KAInterface',name:'KA对接统计',component:()=>import('@/view/reportForms/KAInterface')},
		
				
				

	
			
				
				
				
				
				
			]
		},
  ]
})
