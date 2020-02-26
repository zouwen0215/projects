import Map from "./Map"

var errorCodeMap = new Map();
errorCodeMap.put("0","成功","success");
errorCodeMap.put("1","错误", "error");
errorCodeMap.put("2","comet_timeout","error");
errorCodeMap.put("3","网络超时,请稍候再试","error");
errorCodeMap.put("4","网络异常,请稍候再试","error");
errorCodeMap.put("5", "服务异常,请联系客服!","error");
errorCodeMap.put("6", "单笔支付金额超过限制!","error");
errorCodeMap.put("7", "上传文件读取失败","error");
errorCodeMap.put("8", "上传文件格式错误","error");
errorCodeMap.put("9","没有找到数据","error");

errorCodeMap.put("100","调用外卖平台接口返回错误" ,"error");

errorCodeMap.put("401","登陆超时，请重新登陆","error");

errorCodeMap.put("550","未定义异常","error");
errorCodeMap.put("551","数组越界异常","error");
errorCodeMap.put("552","SQL执行异常","error");
errorCodeMap.put("553","IO异常","error");
errorCodeMap.put("554","空指针异常","error");
errorCodeMap.put("555","客户端写入异常","error");


errorCodeMap.put("10001","参数异常","error");
errorCodeMap.put("10002","删除记录不存在","error");
errorCodeMap.put("10003","查询记录不存在","error");
errorCodeMap.put("10004","非法操作","error");
errorCodeMap.put("10005","名称已存在","error");
errorCodeMap.put("10006","code已存在","error");
errorCodeMap.put("10007","ID为空","error");
errorCodeMap.put("10008","同步失败，请检查网络是否连接 ","error");
errorCodeMap.put("10009","收银台未登录，请先登录","error");
errorCodeMap.put("10010","该记录已被删除","error");
errorCodeMap.put("10011","结束时间必须大于开时时间","error");
errorCodeMap.put("10012","系统繁忙,请稍后再试!","error");
errorCodeMap.put("10013","扫码只支持微信和支付宝支付","error");
errorCodeMap.put("10014","该店铺未开启扫码支付","error");
errorCodeMap.put("10015","店铺没有绑定扫码支付","error");
errorCodeMap.put("10016","没有用户指定的订单","error");
errorCodeMap.put("10017","请使用微信扫描二维码","error");
errorCodeMap.put("10018","扫码支付出现异常","error");
errorCodeMap.put("10019","不支持店铺指定金额支付","error");
errorCodeMap.put("10020","不支持用户自输入金额支付","error");
errorCodeMap.put("10021","店铺已经绑定收银台卡,不需要重复绑定","error");
errorCodeMap.put("10022","此二维码已经绑定了店铺","error");
errorCodeMap.put("10023","订单已经支付,请勿重复支付","error");
errorCodeMap.put("10024","该二维码已失效","error");
errorCodeMap.put("10025","数量必须大于零","error");
errorCodeMap.put("10026","创建二维码数量一次最多1000","error");
errorCodeMap.put("10027","收银台未连接网络","error");
errorCodeMap.put("10028","收银台未登录，请联系收银员","error");
errorCodeMap.put("10029","发送短信失败，请联系客服","error");
errorCodeMap.put("10030","请输入正确的手机号码","error");
errorCodeMap.put("10032","店铺未开启扫码点餐","error");
errorCodeMap.put("10033","1.请升级微信版本,体验全新美食会员卡!<br>2.小程序不支持识别相册中的二维码,只能扫码进入!","error");
errorCodeMap.put("10034","会员余额支付必须要选择订单","error");
errorCodeMap.put("10036","您不是管理员,请扫描支付二维码","error");


errorCodeMap.put("11001","该手机号未注册账号","error");
errorCodeMap.put("11002","密码错误","error");
errorCodeMap.put("11003","短信校验码错误","error");
errorCodeMap.put("11004","验证码输入错误","error");
errorCodeMap.put("11005","页面过期,请刷新页面","error");
errorCodeMap.put("11006","token不存在","error");
errorCodeMap.put("11007","页面过期,请刷新页面","error");
errorCodeMap.put("11008","请求模块未设置权限","error");
errorCodeMap.put("11009","请求方法未设置权限","error");
errorCodeMap.put("11010","获取token持有者身份失败","error");
errorCodeMap.put("11011","token持有者shopId与操作shopId不一致","error");
errorCodeMap.put("11012","无权限","error");
errorCodeMap.put("11013","该方法访问限制禁止设置为NONE","error");
errorCodeMap.put("11014","短信校验码错误","error");
errorCodeMap.put("11015","短信校验码超时,请重新获取","error");
errorCodeMap.put("11016","短信校验码发送次数超过当天限制","error");
errorCodeMap.put("11017","短信校验码发送过于频繁,请稍候再试","error");
errorCodeMap.put("11018","新密码不能为空","error");
errorCodeMap.put("11021","系统繁忙,请稍候再试","error");
errorCodeMap.put("11022","手机验证码超时,请重新获取验证码","error");
errorCodeMap.put("11023","短信验证码发送次数超过当天限制","error");
errorCodeMap.put("11024","收钱服务类型不能登录WEB后台","error");

errorCodeMap.put("12001","该手机号已被注册","error");
errorCodeMap.put("12002","该用户已是您店铺员工","error");
errorCodeMap.put("12003","该手机号已被注册","error");
errorCodeMap.put("12004","手机号码为空","error");
errorCodeMap.put("12005","登录失败","error");
errorCodeMap.put("12006","用户不存在","error");
errorCodeMap.put("12007","用户未加入店铺","error");
errorCodeMap.put("12008","登录失败，您不是本店铺员工","error");
errorCodeMap.put("12009","角色无权限管理后台","error");
errorCodeMap.put("12010","店铺名已存在","error");
errorCodeMap.put("12011","该微信账号已注册","error");

errorCodeMap.put("13001","用户未授权","error");
errorCodeMap.put("13002","初始化参数state错误","error");
errorCodeMap.put("13003","绑定初始化参数shopUserId错误","error");
errorCodeMap.put("13004","您的微信账号未绑定账号","error");
errorCodeMap.put("13005","您的微信账号已绑定账号","error");
errorCodeMap.put("13006","token不存在","error");
errorCodeMap.put("13007","token与参数shopUserId不一致","error");
errorCodeMap.put("13008","服务器异常","error");
errorCodeMap.put("13009","您的微信账号未绑定账号","error");
errorCodeMap.put("13010","用户已停用","error");
errorCodeMap.put("13011","非员工登录","error");
errorCodeMap.put("13012","微信号已经绑定其他用户","error");
errorCodeMap.put("13013","生成绑定二维码失败","error");
errorCodeMap.put("13014","获取用户信息失败","error");
errorCodeMap.put("13015","未成功关注公众号","error");
errorCodeMap.put("13016","该用户同时登录超过限制","error");
errorCodeMap.put("13017","您的店铺使用的是仅扫码收款，不需要使用收银系统","error");
errorCodeMap.put("13018","您不是系统管理员,禁止登录","error");
errorCodeMap.put("13019","账号未注册，请点击上方“注册”按钮前往注册","error");
errorCodeMap.put("13020","您的微信账号未解绑,不能再次绑定","error");

errorCodeMap.put("14001","总店不存在","error");
errorCodeMap.put("14002","非创建者禁止删除店铺","error");
errorCodeMap.put("14003","店铺创建者禁止删除","error");
errorCodeMap.put("14004","店铺创建者禁止变更角色","error");
errorCodeMap.put("14005","店铺不存在","error");
errorCodeMap.put("14006","非创建者禁止修改店铺","error");
errorCodeMap.put("14007","该店铺还有待提现金额，无法删除","error");
errorCodeMap.put("14008","修改店铺名称失败,请联系管理员!","error");
errorCodeMap.put("14009","店铺已初始化收银台,不能修改店铺服务类型","error");
errorCodeMap.put("14010","您已经创建了收银台单机版店铺,不需要再创建","error");
errorCodeMap.put("14011","您可创建的店铺数最多为20个","error");
errorCodeMap.put("14012","您还没有创建店铺,请去收银台创建","error");
errorCodeMap.put("14013","总店禁止删除","error");
errorCodeMap.put("14014","店铺已经初始化,禁止删除","error");

errorCodeMap.put("15001","一级菜单不存在","error");
errorCodeMap.put("15002","总店才能维护菜单","error");
errorCodeMap.put("15003","该菜单包含子菜单,禁止删除","error");
errorCodeMap.put("15004","该菜单包含菜品,禁止删除","error");
errorCodeMap.put("15005","分店禁止删除商品","error");
errorCodeMap.put("15006","获取打印机失败","error");
errorCodeMap.put("15007","提交了相同的规格值ID","error");

errorCodeMap.put("16001","该桌台区域包含桌台,禁止删除","error");
errorCodeMap.put("17001","库存不足","error");
errorCodeMap.put("17002","补货原材料单位不匹配","error");
errorCodeMap.put("17003","原材料分组包含明细,禁止删除","error");
errorCodeMap.put("17004","未查询到补货记录","error");
errorCodeMap.put("17005","操作失败，退货数量应小于补货数量","error");
errorCodeMap.put("17006","单位计算失败","error");
errorCodeMap.put("18001","支付方式不存在","error");
errorCodeMap.put("18002","支付方式已存在","error");
errorCodeMap.put("19001","打印机与菜品已关联,禁止删除","error");
errorCodeMap.put("20000","版本已发布，禁止修改","error");
errorCodeMap.put("20001","版本已发布，禁止删除","error");
errorCodeMap.put("20002","发布版本号小于当前版本号","error");
errorCodeMap.put("20003","发布版本与平台的系统不匹配","error");
errorCodeMap.put("20004","版本名已存在","error");
errorCodeMap.put("20005","版本编号已存在","error");
errorCodeMap.put("20006","APP文件名已存在","error");
errorCodeMap.put("20007","版本下载的URL已存在","error");
errorCodeMap.put("20008","最后一个强制更新的版本号不存在","error");

errorCodeMap.put("21001","请先选择结账的开始时间与结束时间","error");
errorCodeMap.put("21002","结账的开始时间与结束时间间隔必须小于3个月","error");
errorCodeMap.put("22001","签名验证错误","error");
errorCodeMap.put("22002","xml解析失败","error");
errorCodeMap.put("22003","sha加密生成签名失败","error");
errorCodeMap.put("22004","SymmetricKey非法","error");
errorCodeMap.put("22005","appid校验失败","error");
errorCodeMap.put("22006","aes加密失败","error");
errorCodeMap.put("22007","aes解密失败","error");
errorCodeMap.put("22008","解密后得到的buffer非法","error");
errorCodeMap.put("22009","verifyTicket为空","error");
errorCodeMap.put("22010","verifyTicket超时","error");
errorCodeMap.put("22011","平台accessToken为空","error");
errorCodeMap.put("22012","平台accessToken超时","error");
errorCodeMap.put("22013","未获取公众号授权信息","error");
errorCodeMap.put("22014","公众号授权accessToken超时","error");
errorCodeMap.put("22015","根据mediaId下载图片失败","error");

errorCodeMap.put("23001","提现金额必须大于0","error");
errorCodeMap.put("23002","提现金额不能大于待提现金额","error");
errorCodeMap.put("23003","提现账号不存在","error");
errorCodeMap.put("23004","手机号码为空","error");
errorCodeMap.put("23005","提现操作失败，请联系客服人员!","error");
errorCodeMap.put("23006","提现金额必须大于最小限制","error");
errorCodeMap.put("23007","提现账号修改失败,请联系客服人员!","error");
errorCodeMap.put("23009","提现账号添加失败,请联系客服人员!","error");
errorCodeMap.put("23011","30秒内请勿重复进行提现操作","error");
errorCodeMap.put("23013","提现账户验证记录不存在","error");


errorCodeMap.put("24001","该手机号已是会员","error");
errorCodeMap.put("24002","该手机号不是会员","error");
errorCodeMap.put("24003","收钱服务类型店铺不支持会员功能","error");
errorCodeMap.put("24004","会员手机号码重复","error");

errorCodeMap.put("24005","未开启会员功能","error");
errorCodeMap.put("24006","会员余额不足","error");
errorCodeMap.put("24007","赊账额度必须大于已透支金额","error");
errorCodeMap.put("24008","企业会员不支持在线充值","error");
errorCodeMap.put("24009","您的会员账号已停用","error");
errorCodeMap.put("24010","微信绑定的会员手机号与充值号码不一致","error");
errorCodeMap.put("24011","收银机断网无法激活，请联系收银员联网","error");
errorCodeMap.put("24012","微信菜单code不存在","error");


errorCodeMap.put("31001","外卖业务未开通","error");
errorCodeMap.put("31003","未绑定饿了么","error");
errorCodeMap.put("31005","百度外卖用户授权失败","error");
errorCodeMap.put("333333","您不是管理员，支付请扫描支付二维码！","error");

errorCodeMap.put("90001","支付失败，请重新扫码支付！","error");




export default errorCodeMap