<template>
  <template-page
    :param="params"
    v-on:handleSize="handleSizeChange"
    v-on:handleCurrent="handleCurrentChange"
    class="billsRetail"
  >
    <div class="buttonRegion" slot="buttonRegion">
      <div class="search">
        <div>
          <span class="demonstration">地市：</span>
          <el-select v-model="params.search.channelId" placeholder="请选择渠道">
            <el-option
              v-for="item in params.dataForm.channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span class="demonstration">关键字：</span>
          <el-input v-model="params.search.shopName" placeholder="请输入零售户名称/订单号"></el-input>
          <br>
          <span class="demonstration">结账时间：</span>
          <el-date-picker
            class="datepicker"
            v-model="params.search.data_list"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>

          <el-button class="searchbutton" type="success" @click.native="loadTotalFirst">搜索</el-button>
          <el-button @click.native="reset">重置</el-button>
        </div>
        <div>
          <!--<el-button type="success" @click.native="loadMessage">导出EXCEL</el-button>-->
        </div>
      </div>
    </div>
    <div slot="pageTitle" class="pageTitle"></div>
    <div slot="pageRegion" class="pageRegion">
      <el-table :data="params.infor" border style="width: 100%; margin-top: 20px">
        <el-table-column prop="shopName" label="零售户" width="180"></el-table-column>

        <el-table-column prop="billCode" label="订单号"></el-table-column>
        <el-table-column prop="checkOutTime" label="结账时间"></el-table-column>
        <el-table-column prop="checkOutShopUserName" label="收银员"></el-table-column>
        <!-- <el-table-column prop="quantity" label="销售数量（包）">
        </el-table-column>-->
        <el-table-column prop="receivables" label="销售金额"></el-table-column>
        <el-table-column prop="paymentModule" label="收款方式">
          <template
            slot-scope="scope"
          >{{scope.row.paymentModule | commonRet(params.dataForm.paymentModule)}}</template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">{{scope.row.state | commonRet(params.dataForm.state)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <p class="operate" @click="routerDialog(scope.row)">
              <span style="color:#34C388FF;">查看详情</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <div class="pageDialog" slot="pageDialog">
      <el-dialog :visible.sync="params.dialog.status == 1" width="80%" :before-close="deleDialog">
        <billsDetail ref="billsDetail" :param="params"></billsDetail>
      </el-dialog>
    </div>
  </template-page>
</template>

<script>
import templatePage from "../template/templatePage";
import http from "@/utils/http.js";
import common from "@/utils/common.js";
import URL from "@/utils/url.js";
import validation from "@/utils/validation.js";
import billsDetail from "./components/billsDetail";

export default {
  data() {
    return {
      params: {
        dialog: {
          status: 0,
          msg: {}
        },
        infor: [],
        //分页组建
        pagination: {
          currentPage: 1,
         pageNum: 1,
						pageSize: 10,
          total: 1,
          hasPage: true
        },
        dataForm: {
          channelList: [],
          state: {
            "0": "待接单",
            "1": "申请取消中",
            "2": "已完成",
            "3": "待提货",
            "4": "已取消",
            "5": "未付款"
          },
          paymentModule: {
            "0": "现金支付",
            "1": "现金支付",
            "2": "银行卡支付",
            "3": "支付宝支付",
            "4": "微信支付"
          }
        },
        search: {
          channelId:1,
          createTime: "",
          shopName: "",
          data_list: [],
          billCode: ""
        }
      }
    };
  },
  components: {
    templatePage,
    billsDetail
  },
  methods: {
    //设置默认查询日期
    setDefaultTime() {
      let _self = this;
      let currentDate = new Date();
      let startdDate = new Date(currentDate - 6 * 24 * 3600 * 1000);
      _self.params.search.data_list[0] = _self.getDateStr(startdDate,0);
      _self.params.search.data_list[1] = _self.getDateStr(currentDate,1);
    },
    //日期格式调整
    getDateStr(dateTime,model) {
      let yearStr = dateTime.getFullYear();
      let monthStr = dateTime.getMonth() + 1;
      monthStr = monthStr < 10 ? "0" + monthStr : monthStr;
      let dayStr = dateTime.getDate();
	  dayStr = dayStr < 10 ? "0" + dayStr : dayStr;
	  if(model == 0){
		  return yearStr + "-" + monthStr + "-" + dayStr + " " + "00:00:00";
	  }
	  else{
		  return yearStr + "-" + monthStr + "-" + dayStr + " " + "23:59:59";
	  }
      
    },
    routerDialog(msg) {
      let _self = this;
      _self.params.dialog.msg = msg;
      _self.params.dialog.status = 1;
      if (_self.$refs.billsDetail) _self.$refs.billsDetail.loadMessage();
    },
    deleDialog: function() {
      let _self = this;
      _self.params.dialog.msg = {};
      _self.params.dialog.status = 0;
    },
    handleSizeChange(index) {
      let _self = this;
      _self.params.pagination.pageSize = index;
      _self.loadMessage();
    },
    handleCurrentChange(index) {
      let _self = this;
      _self.params.pagination.pageNum = index;
      _self.loadMessage();
    },
    reset: function() {
      let _self = this;
      _self.params.search = validation.reset(_self.params.search);
      _self.loadMessage();
    },
    loadChannel: function() {
      let _self = this;
      let search = _self.params.search;
      let pagination = _self.params.pagination;
      let url = URL.ENGIN.SCORCE + URL.PORT.CHANNEL_LIST;
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
        },
        function(res) {}
      );
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
      let url = URL.ENGIN.SCORCE + URL.PORT.PAY_BILLS_DETAIL_LIST;
      let data = {
        id: 0,
        channelId: search.channelId,
        checkOutTimeStart: search.data_list.length ? search.data_list[0] : "",
        checkOutTimeEnd: search.data_list.length ? search.data_list[1] : "",
        billCode: search.billCode,
        shopName: search.shopName,
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
            _self.params.infor = result;
          } else {
            _self.params.infor = [];
          }
          // _self.loadChannel();
        },
        function(res) {}
      );
    }
  },
  created() {
    this.setDefaultTime();
    this.loadChannel();
    this.loadMessage();
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #ffffff;
  padding: 10px;
  display: flex;
  text-align: left;
  justify-content: space-between;
  .demonstration {
    font-size: 14px;
    margin-left: 5px;
  }
  .el-select {
    width: 200px;
  }
  .datepicker {
    width: 450px;
    margin: 0 5px 10px 0;
  }
  .el-input {
    margin: 0 5px 10px 0;
    width: 200px;
  }
  .searchbutton {
    margin-left: 20px;
  }
}

.pageRegion {
  margin-top: -15px;
   padding: 10px;
  background-color: #ffffff;
  .operate {
    cursor: pointer;
  }
}
</style>