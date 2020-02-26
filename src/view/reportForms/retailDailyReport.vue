<template>
  <template-page
    :param="params"
    v-on:handleSize="handleSizeChange"
    v-on:handleCurrent="handleCurrentChange"
  >
    <div class="buttonRegion" slot="buttonRegion">
      <div class="search">
        <div>
          <span>地市：</span>
          <el-select v-model="params.search.channelId" placeholder="请选择渠道">
            <el-option
              v-for="item in params.dataForm.channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span>区县或网格：</span>
          <el-input
            class="firstinput"
            v-model="params.search.saleDeptName"
            placeholder="请输入区县、网格名称"
          ></el-input>
        </div>
        <div>
          <span>状态：</span>
          <el-select class="firstselect" v-model="params.search.status" placeholder="请选择状态">
            <el-option
              v-for="item in params.statusList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span>零售户名称：</span>
          <el-input v-model="params.search.shopName" placeholder="请输入零售户名称"></el-input>
        </div>
        <div class="button">
          <span>时间段：</span>
          <el-date-picker
            v-model="params.search.data_list"
            type="daterange"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button type="success" @click.native="loadTotalFirst">搜索</el-button>
          <el-button @click.native="reset">重置</el-button>
          <el-button type="success" @click.native="loadExcel">导出报表</el-button>
        </div>
      </div>
    </div>
    <div slot="pageTitle" class="pageTitle"></div>
    <div slot="pageRegion" class="pageRegion">
      <el-table
        :data="params.infor"
        :span-method="objectSpanMethod"
        border
        @sort-change="sortChange"
      >
        <el-table-column prop="shopId" label="店铺ID" sortable="custom" width="100"></el-table-column>
        <el-table-column prop="shopCode" label="许可证号" width="130"></el-table-column>
        <el-table-column prop="shopName" label="零售户"></el-table-column>
        <el-table-column prop="shopManager" label="负责人"></el-table-column>
        <el-table-column prop="managerPhone" label="店铺电话"></el-table-column>
        <el-table-column prop="address" label="店铺地址"></el-table-column>
        <el-table-column prop="saleCenterName" label="区县"></el-table-column>
        <el-table-column prop="saleDeptName" label="网格"></el-table-column>
        <el-table-column prop="isPayMch" label="开通扫码支付"></el-table-column>
        <el-table-column prop="shopStatus" label="状态"></el-table-column>
        <el-table-column prop="activateTime" label="激活时间" sortable="custom" width="130"></el-table-column>
        <el-table-column prop="slsmanName" label="客户经理"></el-table-column>
        <el-table-column prop="billCodeNum" label="扫码订单量" sortable="custom" width="130"></el-table-column>
        <el-table-column prop="totalConsume" label="客单价" sortable="custom" width="110"></el-table-column>
        <el-table-column prop="sysPayCount" label="系统收款次数" sortable="custom" width="130"></el-table-column>
        <el-table-column prop="sysPay" label="系统收款金额" width="110"></el-table-column>
        <el-table-column prop="infor.goodsFlag" label="类型">
        	<template slot-scope="scope">{{scope.row.infor.goodsFlag?"卷烟":"非卷烟 "}}</template>
        </el-table-column>
        <el-table-column label="进货入库">
          <el-table-column prop="infor.tobaccoStockInNum" label="数量"></el-table-column>
          <el-table-column prop="infor.tobaccoStockInPrice" label="金额"></el-table-column>
        </el-table-column>
        <el-table-column label="销售出库">
          <el-table-column prop="infor.tobaccoStockOutNum" label="数量"></el-table-column>
          <el-table-column prop="infor.tobaccoStockOutPrice" label="金额"></el-table-column>
        </el-table-column>
        <el-table-column label="剩余库存">
          <el-table-column label="数量">
            <template slot-scope="scope">
              <router-link class="linkTool" :to="{path:'/stockDetail', query:{shopName:scope.row.shopName,shopNumber:scope.row.shopCode,shopId:scope.row.shopId,goodsType:scope.row.infor.goodsFlag,endTime:params.search.data_list[1]}}">{{scope.row.infor.tobaccoStocktakeNum}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="infor.tobaccoStocktakePrice" label="金额"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageDialog" slot="pageDialog">
      <div style="text-align: left;">
        <p>温馨提示:</p>
        <p>1、客单价:指账单金额（实收金额）除以账单数而得到的每单的平均交易金额</p>
        <p>2、系统收款次数:指支付走收银系统的微信或者支付宝的次数</p>
        <p>3、系统收款金额:指支付走收银系统的微信或者支付宝的金额合计</p>
        <p>4、品类及数量说明:同种烟一条烟与一包属于一一个品类，以最小单位计算数量。</p>
        <p>5、进货入库金额、剩余库存金额按商品成本价计算；销售出库金额按销售价计算；此处由于组合商品折扣时无法计算子商品价格，导致销售金额与实收金额会存在偏差。</p>
      </div>
    </div>
  </template-page>
</template>

<script>
import templatePage from "../template/templatePage";
import http from "@/utils/http.js";
import common from "@/utils/common.js";
import URL from "@/utils/url.js";
import validation from "@/utils/validation.js";
import citychoose from "../../components/tools/citychoose";
import filters from "@/filters/filters.js";

export default {
  data() {
    return {
      params: {
        infor: [],
        selectedOptions: ["", "", ""],
        //分页组建
        dataForm: {
          channelList: []
        },
        pagination: {
          currentPage: 1,
          pageNum: 1,
						pageSize: 10,
          total: 0,
          hasPage: true
        },
        search: {
          data_list: [],
          channelId: 1,
          saleDeptName: "",
          shopName: "",
          status: "",
          sortType: "",
          sortColumn: ""
        },
        statusList: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "停用"
          },
          {
            value: "0",
            label: "启用"
          }
        ]
      }
    };
  },
  components: {
    templatePage,
    citychoose
  },
  methods: {
    getDate() {
      let _self = this;
      var seperator = "-";
      let curDate = new Date();
      let preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000); //前一天
      let year = preDate.getFullYear();
      let month = preDate.getMonth() + 1;
      let strDate = preDate.getDate();
      let predateChange = year + seperator + month + seperator + strDate;
      _self.params.search.data_list[0] = predateChange;
      _self.params.search.data_list[1] = predateChange;
    },
    sortChange: function(column, prop, order) {
      let _self = this;
      if (column.order == "descending") {
        column.order = "desc";
        _self.params.search.sortType = "desc";
      } else {
        column.order = "asc";
        _self.params.search.sortType = column.order;
      }
      console.log(
        column + "-" + column.prop + "-" + _self.params.search.sortType
      );
      if (column.prop == null) {
      } else {
        _self.params.search.sortColumn = column.prop;
        _self.loadMessage();
      }
    },

    loadExcel: function() {
      let _self = this;
      let search = _self.params.search;
      let url = URL.ENGIN.SCORCE + URL.PORT.PAY_EXCEL;
      let data = {
        id: 0,
        saleCenterName: search.saleDeptName,
        saleDeptName: search.saleDeptName,
        status: search.status,
        shopName: search.shopName,
        channelId: search.channelId,
        startTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[0]
          : "",
        endTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[1]
          : "",
        sortColumn: _self.params.search.sortColumn,
        sortType: _self.params.search.sortType
      };
      url = http.filterUrl(data, url);
      url = window.location.origin + url;
      window.open(url);
    },
    reset: function() {
      let _self = this;
      _self.params.search = validation.reset(_self.params.search);
      _self.loadMessage();
    },
    handleChange(value) {
      if (value.length == 2) {
        value.push("");
      }
      console.log(value);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 15) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    handleSizeChange(index) {
      let _self = this;
      _self.params.pagination.pageSize = index;
      _self.loadMessage();
    },
    loadChannel: function() {
      let _self = this;
      let search = _self.params.search;
      let pagination = _self.params.pagination;
      let url = URL.ENGIN.SCORCE + URL.PORT.CHANNEL_LIST;
      console.log(url);
      let data = {
        id: "0",
        pageNum: 1,
        pageSize: 1000
      };
      url = http.filterUrl(data, url);
      let params = http.data;
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          let result = res.body.data;
          _self.params.dataForm.channelList = result;
          console.log(_self.params.dataForm.channelList);
          _self.loadMessage();
        },
        function(res) {}
      );
    },
    handleCurrentChange(index) {
      let _self = this;
      _self.params.pagination.pageNum = index;
      _self.loadMessage();
    },
      loadTotalFirst() {
      let _self = this;
      _self.params.pagination.pageNum = 1;
      _self.loadMessage();
    },
    loadMessage() {
      let _self = this;
      let search = _self.params.search;
      let pagination = _self.params.pagination;
      let url = URL.ENGIN.SCORCE + URL.PORT.PAY_RETAIL;
      let data = {
        id: 0,
        saleCenterName: search.saleDeptName,
        saleDeptName: search.saleDeptName,
        status: search.status,
        shopName: search.shopName,
        channelId: search.channelId,
        startTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[0]
          : "",
        endTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[1]
          : "",
        sortColumn: _self.params.search.sortColumn,
        sortType: _self.params.search.sortType,
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize
      };
      url = http.filterUrl(data, url);

      http.publicRequest(
        "get",
        url,
        "",
        function(res) {
          if (res.body.data) {
            _self.params.pagination.total = validation.total(res);
            let result = JSON.parse(JSON.stringify(res.body.data));
            let datas = [];
//          for (let key of result) {
//            for (let i = 0; i < 2; i++) {
//              if (i == 0) {
//                key.infor = key.nonSmokeStockRecord;
//                datas.push(JSON.parse(JSON.stringify(key)));
//              } else {
//                key.infor = key.smokeStockRecord;
//                datas.push(JSON.parse(JSON.stringify(key)));
//              }
//            }
//          }
            	for(let key of result) {
							let item = [{
								infor: {}
							}, {
								infor: {}
							}];
							console.log("000", item);
							item[0].shopId = key.shopId,
							item[0].shopCode = key.shopCode,
							
							item[0].shopName = key.shopName;
							item[0].shopManager = key.shopManager;
							item[0].managerPhone = key.managerPhone;
							item[0].address = key.address;
							item[0].saleCenterName = key.saleCenterName;
							item[0].saleDeptName = key.saleDeptName;
							item[0].address = key.address;
							//开题扫码支付
								item[0].isPayMch = key.isPayMch;
							item[0].shopStatus = key.shopStatus;
							//激活时间
								item[0].activateTime = key.activateTime;
							item[0].slsmanName = key.slsmanName;
							//扫码订单量
							item[0].billCodeNum = key.billCodeNum;
							item[0].totalConsume = key.totalConsume;
							item[0].sysPayCount = key.sysPayCount;
							item[0].sysPay = key.sysPay;
							item[0].infor.goodsFlag = 0;
							item[0].infor.tobaccoStockInNum = key.nonTobaccoStockInNum;
							item[0].infor.tobaccoStockInPrice = key.nonTobaccoStockInPrice;
							item[0].infor.tobaccoStockOutNum = key.nonTobaccoStockOutNum;
							item[0].infor.tobaccoStockOutPrice = key.nonTobaccoStockOutPrice;
							item[0].infor.tobaccoStocktakeNum = key.nonTobaccoStocktakeNum;
							item[0].infor.tobaccoStocktakePrice = key.nonTobaccoStocktakePrice;
				   
					
							item[1].shopId = key.shopId,
							item[1].shopCode = key.shopCode,
							
							item[1].shopName = key.shopName;
							item[1].shopManager = key.shopManager;
							item[1].managerPhone = key.managerPhone;
							item[1].address = key.address;
							item[1].saleCenterName = key.saleCenterName;
							item[1].saleDeptName = key.saleDeptName;
							item[1].address = key.address;
							//开题扫码支付
							item[0].isPayMch = key.isPayMch;
							item[1].shopStatus = key.shopStatus;
							//激活时间
								item[1].activateTime = key.activateTime;
							item[1].slsmanName = key.slsmanName;
							//扫码订单量
							item[1].billCodeNum = key.billCodeNum;
							item[1].totalConsume = key.totalConsume;
							item[1].sysPayCount = key.sysPayCount;
							item[1].sysPay = key.sysPay;
							item[1].infor.goodsFlag = 1;
							item[1].infor.tobaccoStockInNum = key.tobaccoStockInNum;
							item[1].infor.tobaccoStockInPrice = key.tobaccoStockInPrice;
							item[1].infor.tobaccoStockOutNum = key.tobaccoStockOutNum;
							item[1].infor.tobaccoStockOutPrice = key.tobaccoStockOutPrice;
							item[1].infor.tobaccoStocktakeNum = key.tobaccoStocktakeNum;
							item[1].infor.tobaccoStocktakePrice = key.tobaccoStocktakePrice;
							datas.push(JSON.parse(JSON.stringify(item[0])));
							datas.push(JSON.parse(JSON.stringify(item[1])));
						}
						console.log("aaaaaaaaaaaaaaaaaaaa",datas)
						_self.params.infor = datas;
				
            
          } else {
            _self.params.pagination.total = 0;
            _self.params.infor = [];
          }
        },
        function(res) {}
      );
    }
  },
  created() {
    this.getDate();
    this.loadChannel();
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #ffffff;
  padding: 10px;
  & > div {
    display: flex;
    & > span {
      margin-left: 20px;
      margin-right: 10px;
      margin-top: 5px;
      font-size: 14px;
    }
  }
  & > div:nth-child(1) {
    margin-left: 5px;
  }
  & > div:nth-child(2) {
    margin-top: 10px;
    margin-left: 5px;
    .button {
      margin-left: 20px;
    }
  }
  & > div:nth-child(3) {
    margin-top: 10px;
    margin-left: 5px;
  }
  .el-select {
    width: 200px;
  }
  .el-date-editor {
    margin: 0 5px;
  }
  .el-input {
    margin: 0 5px;
    width: 200px;
  }
  .el-button {
    margin-left: 10px;
  }
  .firstinput {
    width: 200px;
  }
  .firstselect {
    width: 200px;
  }
}
.pageRegion {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffff;
  .linkTool{
    text-decoration-color: royalblue;
    color:royalblue;
  }
}
.pageDialog {
  padding-left: 10px;
  padding-top: 20px;
  background-color: #ffffff;
}
.pageTitle {
  height: 20px;
}
</style>