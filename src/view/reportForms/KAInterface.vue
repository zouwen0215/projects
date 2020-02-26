<template>
  <template-page
    :param="params"
    v-on:handleSize="handleSizeChange"
    v-on:handleCurrent="handleCurrentChange"
  >
    <div class="buttonRegion" slot="buttonRegion">
      <div class="search">
        <citychoose :parama="params"></citychoose>
        <span class="selectText">状态：</span>
        <el-select class="selectTool" v-model="params.selectData.shopType">
          <el-option
            v-for="item in params.typeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span class="selectText">时间：</span>
        <el-date-picker
          class="selectTool"
          v-model="params.selectData.time"
          value-format="yyyy-MM-dd"
          type="date"
        ></el-date-picker>
        <span class="selectText">展示近4周的数据</span>
        <div>
          <span class="selectText">零售户名称：</span>
          <el-input class="selectTool" v-model="params.selectData.shopName" placeholder="请输入零售户名称"></el-input>
          <span class="selectText">显示：</span>
          <el-select class="selectTool" v-model="params.selectData.interfaceType" placeholder="全部">
            <el-option
              v-for="item in params.interfaceData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button @click="selectedData">搜索</el-button>
          <el-button @click="resetData">重置</el-button>
          <el-button @click="shopDataExport">导出报表</el-button>
        </div>
      </div>
    </div>
    <div class="pageTitle" slot="pageTitle">
      <div class="titlePart">
        <el-row type="flex" justify="center" :gutter="10">
          <el-col :span="4" class="titleCol" style="border-right:1px dashed #000;">
            <div>
              <span>所有订单数</span>
            </div>
            <div class="titleData">
              <span>{{params.totalInfoData.billCount?params.totalInfoData.billCount:0}}单</span>
            </div>
          </el-col>
          <el-col :span="4" class="titleCol" style="border-right:1px dashed #000;">
            <div>
              <span>所有商品总销售额</span>
            </div>
            <div class="titleData">
              <span>{{params.totalInfoData.totalConsume?params.totalInfoData.totalConsume:0}}元</span>
            </div>
          </el-col>
          <el-col :span="4" class="titleCol" style="border-right:1px dashed #000;">
            <div>
              <span>卷烟总订单数</span>
            </div>
            <div class="titleData">
              <span>{{params.totalInfoData.tobaccoBillCount?params.totalInfoData.tobaccoBillCount:0}}单</span>
            </div>
          </el-col>
          <el-col :span="4" class="titleCol" style="border-right:1px dashed #000;">
            <div>
              <span>卷烟总销售数</span>
            </div>
            <div class="titleData">
              <span>{{params.totalInfoData.tobaccoTotalAmount?params.totalInfoData.tobaccoTotalAmount:0}}包</span>
            </div>
          </el-col>
          <el-col :span="4" class="titleCol">
            <div>
              <span>卷烟总销售额</span>
            </div>
            <div class="titleData">
              <span>{{params.totalInfoData.tobaccoTotalConsume?params.totalInfoData.tobaccoTotalConsume:0}}元</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="pageRegion" slot="pageRegion" style="overflow:hidden;padding: 10px;background-color: #FFFFFF;">
      <el-table :data="params.mainDataList.data">
        <el-table-column prop="shopName" label="零售户名" fixed="left" width="150px"></el-table-column>
        <el-table-column prop="licenseCode" label="许可证号" width="100px"></el-table-column>
        <el-table-column prop="saleCenterName" label="区县"></el-table-column>
        <el-table-column prop="saleDeptName" label="网格"></el-table-column>
        <el-table-column prop="shopStatus" label="状态"></el-table-column>
        <el-table-column
          prop="list"
          :label="item"
          v-for="(item,index) in params.mainDataList.title"
          :key="index"
        >
          <el-table-column label="所有订单数（单）">
            <template slot-scope="scope">{{scope.row.list[index].billCount}}</template>
          </el-table-column>
          <el-table-column label="所有商品销售总额（元）">
            <template slot-scope="scope">{{scope.row.list[index].totalConsume}}</template>
          </el-table-column>
          <el-table-column label="卷烟总订单数（单）">
            <template slot-scope="scope">{{scope.row.list[index].tobaccoBillCount}}</template>
          </el-table-column>
          <el-table-column label="卷烟总销售数（包）">
            <template slot-scope="scope">{{scope.row.list[index].tobaccoTotalAmount}}</template>
          </el-table-column>
          <el-table-column label="卷烟总销售额（元）">
            <template slot-scope="scope">{{scope.row.list[index].tobaccoTotalConsume}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <p @click="getDetail(scope.row)">
              <span style="color:#34C388FF;cursor: pointer;">详细</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageDialog" slot="pageDialog">
      <el-dialog
        v-if="params.showDetail"
        :title="params.dialogData.title"
        :visible.sync="params.showDetail"
        width="1100px"
        :center="false"
        v-on:close="dialogReset"
      >
        <template-page
          :param="params.dialogData"
          v-on:handleSize="detailHandleSizeChange"
          v-on:handleCurrent="detailHandleCurrentChange"
        >
          <div class="buttonRegion" slot="buttonRegion" style="padding-bottom:50px;">
            <el-row type="flex" justify="space-between">
              <el-col :span="20" style="text-align:left;">
                <span class="selectText">时间：</span>
                <el-date-picker
                  class="selectTool"
                  :readonly="true"
                  v-model="params.selectData.time"
                  value-format="yyyy-MM-dd"
                  type="date"
                ></el-date-picker>
                <span class="selectText">展示近4周的数据</span>
              </el-col>
              <el-col :span="4">
                <el-button @click="shopGoodsExport">导出报表</el-button>
              </el-col>
            </el-row>
          </div>
          <div class="pageRegion" slot="pageRegion">
            <el-table :data="params.dialogData.detailData.data">
              <el-table-column prop="name" label="卷烟品牌规格（包）"></el-table-column>
              <el-table-column
                prop="list"
                :label="item"
                v-for="(item,index) in params.dialogData.detailData.title"
                :key="index"
              >
                <el-table-column label="销量（包）">
                  <template slot-scope="scope">{{scope.row.list[index].amount}}</template>
                </el-table-column>
                <el-table-column label="销售额（元）">
                  <template slot-scope="scope">{{scope.row.list[index].totalGoodsConsume}}</template>
                </el-table-column>
                <el-table-column label="库存（包）">
                  <template slot-scope="scope">{{scope.row.list[index].remainStock}}</template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </template-page>
      </el-dialog>
    </div>
  </template-page>
</template>
<script>
import templatePage from "../template/templatePage";
import http from "@/utils/http.js";
import URL from "@/utils/url.js";
import citychoose from "@/components/tools/citychoose";
import validation from "@/utils/validation.js";

export default {
  data() {
    return {
      params: {
        cityCode: ["11360101"],
        areaCode: [""],
        gridCode: [""],
        pagination: {
          currentPage: 1,
          pageNum: 1,
						pageSize: 10,
          total: 0,
          hasPage: true
        },
        selectData: {
          areaCode: "",
          time: "",
          shopType: "",
          shopName: "",
          interfaceType: ""
        },
        typeData: [
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
        ],
        interfaceData: [],
        totalInfoData: [],
        mainDataList: [],
        showDetail: false,
        dialogData: {
          title: "",
          shopID: "",
          pagination: {
            currentPage: 1,
            pageNum: "1",
            pageSize: "10",
            total: 0,
            hasPage: true
          },
          detailData: []
        }
      }
    };
  },
  components: {
    templatePage,
    citychoose
  },
  methods: {
    handleSizeChange(index) {
      let _self = this;
      _self.params.pagination.pageSize = index;
      _self.getShopData();
    },
    handleCurrentChange(index) {
      let _self = this;
      _self.params.pagination.pageNum = index;
      _self.getShopData();
    },
    detailHandleSizeChange(index) {
      let _self = this;
      _self.params.dialogData.pagination.pageSize = index;
      _self.getShopGoodsData(_self.params.dialogData.shopID);
    },
    detailHandleCurrentChange(index) {
      let _self = this;
      _self.params.dialogData.pagination.pageNum = index;
      _self.getShopGoodsData(_self.params.dialogData.shopID);
    },
    //初始化日期
    initDate() {
      let _self = this;
      let dt = new Date();
      _self.params.selectData.time = validation.formatDatefor(dt, "yyyy-mm-dd");
    },
    //重置数据
    resetData() {
      let _self = this;
      window.location.reload();
//    _self.params.cityCode = ["11360101"];
//    _self.params.areaCode = [""];
//    _self.params.gridCode = [""];
//    _self.params.selectData.interfaceType = "";
//    _self.params.selectData.shopName = "";
//    _self.params.selectData.shopType = "";
//    _self.initDate();
//    _self.getTotalInfo();
//    _self.getShopData();
    },
    //弹出层关闭回调事件
    dialogReset() {
      let _self = this;
      _self.params.dialogData.pagination.pageSize = 10;
      _self.params.dialogData.pagination.pageNum = 1;
    },
    //获取详细信息
    getDetail(currentRow) {
      let _self = this;
      _self.params.showDetail = !_self.params.showDetail;
      _self.params.dialogData.title =
        currentRow.shopName +
        " [" +
        currentRow.shopStatus +
        "]" +
        "[" +
        currentRow.saleCenterName +
        "-" +
        currentRow.saleDeptName +
        "]";
      _self.params.dialogData.shopID = currentRow.shopId;
      _self.getShopGoodsData(currentRow.shopId);
      
    },
    //获取接入厂商信息
    getCompanyInfo() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.SYS_COMPANY_DATA;
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          let result = res.body.data;
          result.unshift({ id: "", name: "全部" });
          _self.params.interfaceData = result;
        },
        function(res) {}
      );
    },
    //获取汇总数据
    getTotalInfo() {
      let _self = this;
      let dateT = _self.params.selectData.time;
      dateT = dateT.replace(/-/g, "");
      let url = URL.ENGIN.SCORCE + URL.PORT.KA_TOTAL_DATA;
      let data = {
        dayNumber: dateT,
        cityCode: _self.params.cityCode,
        areaCode: _self.params.areaCode,
        gridCode: _self.params.gridCode,
        companyId: _self.params.selectData.interfaceType,
        retailerName: _self.params.selectData.shopName,
        state: _self.params.selectData.shopType
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          let result = res.body.data;
          _self.params.totalInfoData = result;
        },
        function(res) {}
      );
    },
    //获取店铺相关数据
    getShopData() {
      let _self = this;
      let dateT = _self.params.selectData.time;
      console.log(dateT);
      dateT = dateT.replace(/-/g, "");
      let url = URL.ENGIN.SCORCE + URL.PORT.KA_SHOP_DATA;
      let data = {
        dayNumber: dateT,
        cityCode: _self.params.cityCode,
        areaCode: _self.params.areaCode,
        gridCode: _self.params.gridCode,
        companyId: _self.params.selectData.interfaceType,
        retailerName: _self.params.selectData.shopName,
        state: _self.params.selectData.shopType,
        pageSize: _self.params.pagination.pageSize,
        pageNum: _self.params.pagination.pageNum
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          _self.params.pagination.total = validation.total(res);
          let result = res.body.data;
          _self.params.mainDataList = result;
        },
        function(res) {}
      );
    },
    //获取店铺商品信息
    getShopGoodsData(shopid) {
      let _self = this;
      let dateT = _self.params.selectData.time;
      dateT = dateT.replace(/-/g, "");
      let url = URL.ENGIN.SCORCE + URL.PORT.KA_SHOP_GOODS_DATA;
      let data = {
        dayNumber: dateT,
        pageSize: _self.params.dialogData.pagination.pageSize,
        pageNum: _self.params.dialogData.pagination.pageNum,
        shopId: shopid
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          _self.params.dialogData.pagination.total = validation.total(res);
          let result = res.body.data;
          _self.params.dialogData.detailData = result;
        },
        function(res) {}
      );
    },
    //查询功能
    	loadTotalFirst() {
				let _self = this;
				_self.params.pagination.pageNum = 1;
				_self.selectedData();
			},
    selectedData() {
      let _self = this;
      _self.getTotalInfo();
      _self.getShopData();
    },
    //导出店铺数据
    shopDataExport() {
      let _self = this;
      let dateT = _self.params.selectData.time;
      dateT = dateT.replace(/-/g, "");
      let url = URL.ENGIN.SCORCE + URL.PORT.KA_SHOP_EXPORT;
      let data = {
        dayNumber: dateT,
        cityCode: _self.params.cityCode,
        areaCode: _self.params.areaCode,
        gridCode: _self.params.gridCode,
        companyId: _self.params.selectData.interfaceType,
        retailerName: _self.params.selectData.shopName,
        state: _self.params.selectData.shopType
      };
      url = http.filterUrl(data, url);
      url = window.location.origin + url;
      window.location.href = url;
    },
    //店铺商品数导出
    shopGoodsExport() {
      let _self = this;
      let dateT = _self.params.selectData.time;
      dateT = dateT.replace(/-/g, "");
      let url = URL.ENGIN.SCORCE + URL.PORT.KA_SHOP_GOODS_EXPORT;
      let data = {
        dayNumber: dateT,
        shopId: _self.params.dialogData.shopID
      };
      url = http.filterUrl(data, url);
      url = window.location.origin + url;
      window.location.href = url;
    }
  },
  created() {
  	 let _self = this;
  	 _self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;
    this.initDate();
    this.getCompanyInfo();
    this.getTotalInfo();
    this.getShopData();
  }
};
</script>
<style lang="less">
.search {
  text-align: left;
  padding: 10px;
  background: white;
  .selectTool {
    width: 210px;
    margin-top: 10px;
    padding: 1px;    
  }
  .selectText {
    font-size: 14px;
    margin-left: 5px;
  }
}
.titlePart {
  background: white;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  .titleCol {
    .titleData {
      margin-top: 10px;
    }
  }
}
.pageDialog{
  .el-dialog__wrapper {
  .el-dialog__header {
    text-align: left;
  }
} 
}
.el-dialog{
  z-index: 10000;
}    
</style>


