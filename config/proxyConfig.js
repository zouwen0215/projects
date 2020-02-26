module.exports = {
	proxyList: {
		'/ec_data': {
			// 测试环境
			// target: 'http://test.junfengtech.com.cn',
			target: 'http://wx.junfengtech.com.cn',
//			target: 'http://192.168.199.201:8026',
			changeOrigin: true,
		},
		'/api': {
			// 测试环境
			// target: 'http://test.junfengtech.com.cn',
			target: 'http://wx.junfengtech.com.cn',
//			target: 'http://192.168.199.201:8026',
			changeOrigin: true,
		},
	}
}