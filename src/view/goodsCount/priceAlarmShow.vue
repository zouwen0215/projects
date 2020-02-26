<template>
  <template-page
    :param="params"
    v-on:handleSize="handleSizeChange"
    v-on:handleCurrent="handleCurrentChange"
    style="overflow:hidden;"
  >
    <div class="buttonRegion" slot="buttonRegion">
      <div class="search">
        <div>
          <span class="demonstration">地市：</span>
          <el-select
            class="selectTool"
            placeholder="全省"
            v-model="params.selectDataArray.areaName"
            :disabled="params.disabledSelect"
          >
            <el-option
              v-for="item in params.areaList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="demonstration">商品分类：</span>
          <el-select
            class="selectTool"
            placeholder="全选"
            v-model="params.selectDataArray.product"
            @change="getCigaretteInfo(params.selectDataArray.product)"
          >
            <el-option
              v-for="item in params.producterList"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            class="selectTool"
            placeholder="全选"
            v-model="params.selectDataArray.cigaretteName"
          >
            <el-option
              v-for="item in params.cigaretteNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="part2">
          <el-row :gutter="100" type="flex" justify="space-between">
            <el-col :span="65">
              <span class="demonstration">时间：</span>
              <el-date-picker
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                v-model="params.selectDataArray.timeValue"
                style="padding-top:0px;padding-bottom:0px;"
              ></el-date-picker>
              <el-button style="margin-left:20px;" @click="loadTotalFirst">搜索</el-button>
            </el-col>
            <el-col :span="35">
              <div class="function2" style="text-align:right;">
                <router-link
                  to="/priceAlarmSet"
                  tag="el-button"
                  class="nav-link"
                  size="medium"
                v-if="$store.state.user.userInfor.level==0||$store.state.user.userInfor.level==1">设置查询条件</router-link>
                <el-button type="primary" @click="exportData">导出报表</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="pageRegion" slot="pageRegion">
      <el-table :data="params.alarmGoodsList">
        <el-table-column prop="dayTime" label="日期" width="100px;"></el-table-column>
        <el-table-column prop="billCode" label="订单号"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="零售指导价" width="100px;"></el-table-column>
        <el-table-column prop="salePrice" label="销售价"></el-table-column>
        <el-table-column prop="amount" label="销售数量"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="shopCode" label="许可证号"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
        <el-table-column prop="shopManager" label="负责人信息" width="100px;"></el-table-column>
        <el-table-column prop="saleCenterName" label="区县"></el-table-column>
        <el-table-column prop="saleDeptName" label="网格"></el-table-column>
        <el-table-column prop="slsmanName" label="客户经理"></el-table-column>
      </el-table>
    </div>
    <div class="pageDialog" slot="pageDialog"></div>
  </template-page>
</template>

<script>
import templatePage from "../template/templatePage";
import URL from "@/utils/url.js";
import http from "@/utils/http.js";

import validation from "@/utils/validation.js";
export default {
  data() {
    return {
      params: {
        pagination: {
          currentOrgCode: this.$store.state.user.userInfor.code,
          currentPage: 1,
          pageNum: 1,
					pageSize: 10,
          total: 0,
          hasPage: true
        },
        selectDataArray: {
          areaName:'',
          product: "",
          cigaretteName: "",
          timeValue: []
        },
        alarmGoodsList: [],
        areaList: [{label: "全省", value: "11360000"}],
        producterList: [],
        cigaretteNameList: [],
        disabledSelect: false
      }
    };
  },
  components: {
    templatePage
  },
  methods: {
    handleSizeChange(index) {
      let _self = this;
      _self.params.pagination.pageSize = index;
      _self.getInfo();
    },
    handleCurrentChange(index) {
      let _self = this;
      _self.params.pagination.currentPage = index;
      _self.getInfo();
    },
    //设置默认查询日期
    setDefaultTime() {
      let _self = this;
      let currentDate = new Date();
      let startdDate = new Date(currentDate - 6 * 24 * 3600 * 1000);
      _self.params.selectDataArray.timeValue[0] = _self.getDateStr(startdDate);
      _self.params.selectDataArray.timeValue[1] = _self.getDateStr(currentDate);
    },
    //日期格式调整
    getDateStr(dateTime) {
      let yearStr = dateTime.getFullYear();
      let monthStr = dateTime.getMonth() + 1;
      monthStr = monthStr < 10 ? "0" + monthStr : monthStr;
      let dayStr = dateTime.getDate();
      dayStr = dayStr < 10 ? "0" + dayStr : dayStr;
      return yearStr + "-" + monthStr + "-" + dayStr;
    },
    //获取预警数据
    getInfo() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_ALAEM_INFO;
      let data = {
        currentOrgCode: _self.params.pagination.currentOrgCode,
        ownerName: _self.params.selectDataArray.product,
        brandName: _self.params.selectDataArray.cigaretteName,
        beginTime: _self.params.selectDataArray.timeValue[0],
        endTime: _self.params.selectDataArray.timeValue[1],
        cityCode: _self.params.selectDataArray.areaName,
        pageSize: _self.params.pagination.pageSize,
        pageNum: _self.params.pagination.currentPage
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          _self.params.pagination.total = validation.total(res);
          let result = res.body.data;
          _self.params.alarmGoodsList = result;
        },
        function(res) {}
      );
    },
    //获取地市数据
    getAreaINfo() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_AREA;
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          let result = res.body.data;
          for(let key of result){
          	_self.params.areaList.push(key);
          }
          
        },
        function(res) {}
      );
    },
    //获取卷烟厂商信息
    getProductInfo() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_CIGARETTEINFO;
      let data = {
        code: "manufacturer"
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          let result = res.body.data;
          _self.params.producterList = result;
        },
        function(res) {}
      );
    },
    //获取卷烟分类信息
    getCigaretteInfo(productInfo) {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_CIGARETTEINFO;
      let data = {
        code: productInfo
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          _self.params.selectDataArray.cigaretteName = "";
          let result = res.body.data;
          _self.params.cigaretteNameList = result;
        },
        function(res) {}
      );
    },
    //设置区域选择是否可用
    setSelectEnable() {
      let _self = this;
      if (this.$store.state.user.userInfor.datatype != "11360000") {
        _self.params.disabledSelect = true;
        _self.params.selectDataArray.areaName = this.$store.state.user.userInfor.datatype;
      }
    },
    //数据导出
    exportData() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.EXPORT_ALARM_INFO;
      let data = {
        currentOrgCode: _self.params.pagination.currentOrgCode,
        ownerName: _self.params.selectDataArray.product,
        brandName: _self.params.selectDataArray.cigaretteName,
        beginTime: _self.params.selectDataArray.timeValue[0],
        endTime: _self.params.selectDataArray.timeValue[1],
        cityCode: _self.params.selectDataArray.areaName
      };
      url = http.filterUrl(data, url);
      url = window.location.origin + url;
      window.location.href = url;
    },
    loadTotalFirst() {
      let _self = this;
      _self.params.pagination.currentPage = 1;
      _self.getSetResult();
    },
    //获取用户是否未进行预计条件设置
    getSetResult() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_ALARM_SET;
      let data = {
        currentOrgCode: _self.params.pagination.currentOrgCode
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          let result = res.body.data;
          if (result == 1) {
            _self.getInfo();
          } else {
            _self.$message({ message: "请设置查询条件", type: "warning" });
          }
        },
        function(res) {}
      );
    }
  },
  created() {
  	  let _self = this;
  	
    this.setDefaultTime();
    this.getAreaINfo();
    this.getProductInfo();
    if(this.$store.state.user.userInfor.level==0||this.$store.state.user.userInfor.level==1){
    	  this.getSetResult();
    }
    
    this.setSelectEnable();
    _self.params.selectDataArray.areaName=this.$store.state.user.userInfor.code,
  	console.log(_self.params.selectDataArray.areaName)
  }
};
</script>
<style lang="less" scoped>
.search {
  background: white;
  text-align: left;
  padding: 10px;
  .selectTool {
    width: 145px;
    margin-right: 20px;
    padding: 1px;
  }
  .demonstration {
    font-size: 14px;
  }
  .part2 {
    margin-top: 10px;
    padding-bottom: 10px;
    .function2 {
      text-align: right;
    }
    .demonstration {
      font-size: 14px;
    }
  }
}
</style>
>
</style>


