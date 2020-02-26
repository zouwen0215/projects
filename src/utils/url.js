export default {
	ENGIN: {
		SCORCE: "/ec_data",
		LOGIN: "/api",
		SETDATA: "/api/ec_opc",
	},
	PORT: {
		//登陆接口
		LOGIN_API: "/auth/jwt/user/login",
		//获取菜单
		LOGIN_MENU: "/admin/tobacco/user/front/menus/{systemCode}?token={token}",
		//获取用户信息
		LOGIN_INFOR: "/admin/tobacco/user/front/info?token={token}",

		//销售日报表
		SELE_DETAIL_IST: "/retailers/report/saledaily/list/query_{id};channelId={channelId};createTime={createTime}?pageSize={pageSize}&pageNum={pageNum}",
		//销售日报excel
		SELE_EXCEL: "/retailers/report/saledaily/export/query_{id};channelId={channelId};createTime={createTime};",
		//零售户日报
		PAY_RETAIL: "/retailers/report/daily/list/query_{id};saleCenterName={saleCenterName};channelId={channelId};status={status};sortColumn={sortColumn};sortType={sortType};saleDeptName={saleDeptName};startTime={startTime};endTime={endTime};shopName={shopName}?pageSize={pageSize}&pageNum={pageNum}",
		//零售户excel
		PAY_EXCEL: "/retailers/report/daily/export/query_{id};saleCenterName={saleCenterName};channelId={channelId};status={status};sortColumn={sortColumn};sortType={sortType};saleDeptName={saleDeptName};startTime={startTime};endTime={endTime};shopName={shopName}",

		CHANNEL_LIST: "/channel/list/query_{id}?pageNum={pageNum}&pageSize={pageSize}",
		//零售户账单
		PAY_BILLS_DETAIL_LIST: "/retailers/report/shopbill/list/query_{id};shopName={shopName};channelId={channelId};checkOutTimeStart={checkOutTimeStart};checkOutTimeEnd={checkOutTimeEnd};billCode={billCode}?pageNum={pageNum}&pageSize={pageSize}",

		//零售户账单详情
		PAY_BILLS_DETAIL_LIST_DETAIL: '/retailers/report/shopbill/{shopId}/billInfo/{billCode}',

		//渠道列表
		CHANNEL_LIST: "/channel/list/query_{id}?pageNum={pageNum}&pageSize={pageSize}",
		//获取用户个性设置
		LOGIN_USER_STYLE: "/report/homepage/user/{userid}/config/list/data",
		//饼图接口数据
		PIECHART_LIST: "/report/homepage/other/price/{areacode}/{type}/pie/chart/query_{id};cityCode={cityCode};startTime={startTime};endTime={endTime}",
		//卷烟品牌户均存销比
		LINECHART_RATIO: "/report/homepage/smoke/category/{areacode}/line/chart?datatime={datatime}&cityCode={cityCode}",
		//品牌销量同比增长率
		LINECHART_GROWTH: "/report/homepage/smoke/category/{areacode}/rate/line/chart?datatime={datatime}&cityCode={cityCode}",
		//各价位卷烟销量同比增长率
		LINECHART_SALES: "/report/homepage/smoke/price/{areacode}/rate/line/chart?datatime={datatime}&cityCode={cityCode}",
		//品类下烟品牌详情
		SMOKE_DETAILS: "/report/homepage/tobacco/type/list",

		//首页概况接口
		GET_GENERAL: "/report/homepage/generalsituation/{areacode}/getinfo",
		//获取个性化设置
		LOGIN_USER_STYLE: "/report/homepage/user/{userid}/config/list/data",
		//获取柱状图接口
		GET_BARGRAPH: "/report/homepage/{areacode}/{type}/bar/chart?startTime={startTime}&&endTime={endTime}",
		//获取地图展示数据接口
		MAPCHART_LIST: "/report/homepage/{areacode}/{type}/map/chart/{daylengh}",
		//获取商品概况
		GET_GOODSGENERAL: "/report/goods/count/{areacode}/salecountcollect/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};startTime={startTime};endTime={endTime}",
		//获取烟和非烟销量柱状图"
		GET_SMOKENOSMOKECHART: "/report/goods/count/{areacode}/{type}/bar/chart/query_{id};cityCode={cityCode};areaCode={areaCode};startTime={startTime};endTime={endTime}",
		//获取卷烟销售排名数据
		GET_SMOKESALESRANKING: "/report/goods/count/rank/tobacco/count;areacode={areacode};isProvince={isProvince};startTime={startTime};endTime={endTime}",
		//获取各品类下的烟品牌详情
		GET_SMOKECLASS: "/report/homepage/tobacco/type/list",
		//获取重点监测品牌卷烟销量分布
		GET_IMPORTANTCLASS: "/report/goods/count/{areacode}/query_{id};cityCode={cityCode};areaCode={areaCode};tobaccoClassId={tobaccoClassId};key={key};startTime={startTime};endTime={endTime}",
		//统计数据-卷烟销售排名统计
		SMOKE_RANKINGTOTAL: "/report/goods/count/rank/tobacco/{areacode}/count/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};isProvince={isProvince};custCode={custCode};startTime={startTime};endTime={endTime}",
		//统计数据-某卷烟品牌销量统计
		SMOKE_BRAND: "/report/goods/count/rank/tobacco/brand/{areacode}/query_{id};isProvince={isProvince};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};tobaccoBrandId={tobaccoBrandId};startTime={startTime};endTime={endTime}",
		//获取卷烟品牌排名数据
		SMOKE_RANKINGBRAND: "/report/goods/count/rank/tobacco/brand/{areacode}/list/query_{id};tobaccoBrandId={tobaccobrandId};isProvince={isProvince};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};sortColumn={sortColumn};sortType={sortType};startTime={startTime};endTime={endTime}?pageSize={pageSize}&pageNum={pageNum}",
		//卷烟品牌列表
		SMOKERANKINGBRAND_EXPORT: "/report/goods/count/rank/tobacco/brand/{areacode}/export/query_{id};tobaccoBrandId={tobaccobrandId};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};isProvince={isProvince};sortColumn={sortColumn};sortType={sortType};startTime={startTime};endTime={endTime}?pageSize={pageSize}&pageNum={pageNum}",
		//获取卷烟销售排名数据
		SMOKE_RANGINGSALES: "/report/goods/count/rank/tobacco/{areacode}/list/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};sortColumn={sortColumn};sortType={sortType};isProvince={isProvince};custCode={custCode};startTime={startTime};endTime={endTime}?pageSize={pageSize}&pageNum={pageNum}",
		//卷烟销售列表导出
		SMOKERANGINGSALES_EXCEL: "/report/goods/count/rank/tobacco/{areacode}/export/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};sortColumn={sortColumn};sortType={sortType};isProvince={isProvince};custCode={custCode};startTime={startTime};endTime={endTime}?pageSize={pageSize}&pageNum={pageNum}",
		//获取区域销售排名数据
		AREA_RANGINGTOTAL: "/report/goods/count/rank/area/{areacode}/count/query_{id};cityCode={cityCode};isProvince={isProvince};startTime={startTime};endTime={endTime}",
		//获取区域排名列表
		AREA_RANGING: "/report/goods/count/rank/area/{areacode}/list/query_{id};cityCode={cityCode};isProvince={isProvince};sortColumn={sortColumn};sortType={sortType};startTime={startTime};endTime={endTime}?pageSize={pageSize}&pageNum={pageNum}",
		//POS概况
		POS_GENERAL: "/pos/report/count/{areacode}/countcollect/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//各区域终端数-柱状图
		EVERYAREA_POS: "/pos/report/count/{areacode}/devicenumbers/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//户均扫码次数——折线图
		SWEEPCODE_NUMBER: "/pos/report/count/{areacode}/scannumbers/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//扫码概况
		SWEEPCODE_GENERAL: "/pos/report/count/{areacode}/scancollect/query_{id};cityCode={cityCode};areaCode={areaCode};datatime={datatime};gridCode={gridCode}",
		//零售户概况
		RETAILS_GENERAL: "/retailers/report/count/{areacode}/countcollect/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};startTime={startTime};endTime={endTime}",
		//零售户分布地图
		RETAILS_MAP: "/retailers/report/count/{areacode}/map/query_{id};cityCode={cityCode};areaCode={areaCode}",
		//营收趋势曲线图
		RENVENUE_TREND: "/retailers/report/count/{areacode}/revenue/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//日均单客价-柱状图
		PER_CONSUMES: "/retailers/report/count/{areacode}/perconsumes/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//烟各价位户均存销比和销量环比
		PRICE_ANALYSIS: "/report/goods/count/{areacode}/{type}/tobacco/price/analysis/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//烟各价位户均存销比和销量环比图
		PRICE_ANALYSISPIC: "/report/goods/count/{areacode}/{type}/tobacco/price/analysis/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//卷烟市场情况
		SMOKE_MARKET: "/report/goods/count/tobacco/pricerange/{areacode}/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//导出市场情况表
		SMOKEMARKET_EXCEL: "/report/goods/export/tobacco/pricerange/{areacode}/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//总量分析
		TOTAL_ANALYSIS: "/report/goods/count/tobacco/monitor/{areacode}/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//导出总量分析
		TOTALANALYSIS_EXCEL: "/report/goods/export/tobacco/monitor/{areacode}/query_{id};datatime={datatime};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode}",
		//设置
		SET_KEY: "/report/set/list/query_{id};category={category};goodsName={goodsName};barcode={barcode}?pageSize={pageSize}&pageNum={pageNum}",
		//设置重点品牌监测
		SET_FOCUSBRAND: "/report/set/focusbrand",
		//三级联动
		GET_AREA: "/report/area/list?code={code}",
		//获取卷烟厂商、卷烟品牌数据
		GET_CIGARETTEINFO:"/report/manufacturer/list?code={code}",
		//售价预警设置查询商品数据
		GET_INFO_TO_ALARM:"/warn/{currentOrgCode}/list/query_0;ownerName={ownerName};brandName={brandName};name={name}?pageSize={pageSize}&pageNum={pageNum}",
		//提交售价预警设置
		SET_ALARM_INFO:"/warn/{currentOrgCode}",
		//售价预警数据查询
		GET_ALAEM_INFO:"/warn/{currentOrgCode}/warninglist/query_0;ownerName={ownerName};brandName={brandName};beginTime={beginTime};endTime={endTime};cityCode={cityCode}?pageSize={pageSize}&pageNum={pageNum}",
		//导出预警数据
		EXPORT_ALARM_INFO:"/warn/{currentOrgCode}/warningexport/query_0;ownerName={ownerName};brandName={brandName};beginTime={beginTime};endTime={endTime};cityCode={cityCode}",
		//是否设置过销售价预警
		GET_ALARM_SET:"/warn/{currentOrgCode}/getissetstatus",
		//获取二级商品分类
		GET_SECOND_CATE_INFO:"/retailers/{shopId}/{goodsFlag}/SecondCategory",
		//零售户库存详情
		GET_STOCK_DETAIL_INFO:"/retailers/{shopId}/{goodsFlag}/stockdetails/list/query_0;brandId={brandId};shopGoodsName={shopGoodsName};endTime={endTime}?pageSize={pageSize}&pageNum={pageNum}",
		//零售户库存导出
		EXPORT_STOOCK_DETAIL_INFO:"/retailers/{shopId}/{goodsFlag}/stockdetails/export/query_0;brandId={brandId};shopGoodsName={shopGoodsName};endTime={endTime}",
		//KA业务总值统计接口
		KA_TOTAL_DATA:"/report/ka/statistics/{dayNumber}/query_0;cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};retailerName={retailerName};companyId={companyId}",
		//KA业务店铺统计接口
		KA_SHOP_DATA:"/report/ka/shop/statistics/{dayNumber}/query_0;cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};retailerName={retailerName};state={state};companyId={companyId}?pageSize={pageSize}&pageNum={pageNum}",
		//KA业务商品详情接口
		KA_SHOP_GOODS_DATA:"/report/ka/{shopId}/goods/statistics/{dayNumber}/query_0?pageSize={pageSize}&pageNum={pageNum}",
		//接入厂商数据接口
		SYS_COMPANY_DATA:"/sys/company/select/list",
		//KA店铺统计数据导出接口
		KA_SHOP_EXPORT:"/report/ka/shop/statistics/export/{dayNumber}/query_0;cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};retailerName={retailerName};state={state};companyId={companyId}",
		//KA店铺烟品数据导出接口
		KA_SHOP_GOODS_EXPORT:"/report/ka/{shopId}/goods/statistics/export/{dayNumber}/query_0",
		
		//权限列表
		GET_USERLIST_PRIVILEGE:"/user/list/query_{id};cityCode={cityCode};areaCode={areaCode};gridCode={gridCode};isStop={isStop}?pageNum={pageNum}&pageSize={pageSize}",
		//新建账号
		CREAT_USER:"/user/put",
		//编辑账号
		EDIT_USER:"/user/update",
		//账号详情,
		USER_DETAIL:"/user/getinfo/{userId}",
		//重置密码
		RESET_PASSWORD:"/user/init/password/{userId}/{password}",
		//启用/停用用户
		USER_USER_NOT:"/user/isstop/{userId}/{state}",
		//下拉框
		ROLE_SELECT:"/role/select",
		
		//角色列表查询接口
		SELECT_ROLE_LIST:"/role/list/query_{id};isStop={isStop};roleId={roleId}?pageNum={pageNum}&pageSize={pageSize}",
		//启用/停用角色
		USER_ROLE_NOT:"/role/isstop/{userId}/{state}",
		//新增角色
		CREAT_ROLE:"/role/put",
		//角色修改
		EDIT_ROLE:"/role/update",
		//获取token
		GET_TOKENS:"/login/get/token",
		//登录
		LOGIN_API:"/login",
		//修改密码
		PASSWARD_EDIT:"/user/update/password",
	}
}