<template>
  <template-page
    :param="params"
    v-on:handleSize="handleSizeChange"
    v-on:handleCurrent="handleCurrentChange"
  >
    <div class="buttonRegion" slot="buttonRegion">
      <div class="search">
        <div class="back">
          <el-button @click.native="naviToBack">返回</el-button>
        </div>
        <div class="selectData">
          <div class="sData">
            <el-select
              placeholder="选择卷烟厂商"
              v-model="params.selectDataArray.product"
              @change="getCigaretteInfo(params.selectDataArray.product)"
            >
              <el-option
                v-for="item in params.producterList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select placeholder="选择卷烟品牌" v-model="params.selectDataArray.cigaretteName">
              <el-option
                v-for="item in params.cigaretteNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              placeholder="请输入卷烟名称"
              style="width:200px;"
              v-model="params.selectDataArray.goodsName"
            ></el-input>
            <el-button @click="loadTotalFirst">搜索</el-button>
          </div>
          <div class="sTip">
            <label>注：零售户销售价高于上限或低于下限将视为价格异常</label>
          </div>
        </div>
      </div>
    </div>
    <div class="pageRegion" slot="pageRegion">
      <el-table :data="params.goodsList">
        <el-table-column prop="brandName" label="卷烟品牌"></el-table-column>
        <el-table-column prop="goodsName" label="卷烟名称"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="price" label="零售指导价"></el-table-column>
        <el-table-column label="价格上限">
          <template slot-scope="scope">
            <el-input @change="changeAndCommit(scope.row,0)" v-model="scope.row.upPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="价格下限">
          <template slot-scope="scope">
            <el-input @change="changeAndCommit(scope.row,1)" v-model="scope.row.downPrice"></el-input>
          </template>
        </el-table-column>
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
          currentOrgCode: this.$store.state.user.userInfor.datatype,
          currentPage: 1,
          pageNum: 1,
					pageSize: 10,
          total: 1,
          hasPage: true
        },
        producterList: [],
        cigaretteNameList: [],
        selectDataArray: {
          product: "",
          cigaretteName: "",
          goodsName: ""
        },
        goodsList: [],
        commitData: {
          upData: 0,
          downData: 0
        },
        testData: ""
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
      _self.getAllInfo();
    },
    handleCurrentChange(index) {
      let _self = this;
      _self.params.pagination.currentPage = index;
      _self.getAllInfo();
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
          let result = res.body.data;
          _self.params.cigaretteNameList = result;
          _self.params.selectDataArray.cigaretteName = "";
        },
        function(res) {}
      );
    },
    loadTotalFirst() {
      let _self = this;
      _self.params.pagination.currentPage = 1;
      _self.getAllInfo();
    },
    //获取当前渠道烟品数据
    getAllInfo() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_INFO_TO_ALARM;
      let data = {
        currentOrgCode: _self.params.pagination.currentOrgCode,
        ownerName: _self.params.selectDataArray.product,
        brandName: _self.params.selectDataArray.cigaretteName,
        name: _self.params.selectDataArray.goodsName,
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
          _self.params.goodsList = result;
        },
        function(res) {}
      );
    },
    //修改后立即提交到后台
    changeAndCommit(goodsInfo, mode) {
      let _self = this;
      // if(mode == 0){
      //   let checkResult = _self.checkBeforeCommit(goodsInfo.upPrice);
      //   if(checkResult == false){
      //     return;
      //   }
      // } else if(mode == 1){
      //   let checkResult = _self.checkBeforeCommit(goodsInfo.downPrice);
      //   if(checkResult == false){
      //     return;
      //   }
      // }
      let checkResult = _self.checkBeforeCommit(goodsInfo.upPrice);
      if (checkResult == false) {
        return;
      } else {
        checkResult = _self.checkBeforeCommit(goodsInfo.downPrice);
        if (checkResult == false) {
          return;
        }
      }
      let limitResult = _self.checkLimit(
        goodsInfo.upPrice,
        goodsInfo.downPrice
      );
      if (limitResult == false) {
        // if(mode == 0){
        //   goodsInfo.upPrice = 0;
        // } else if(mode == 1){
        //   goodsInfo.downPrice = 0;
        // }
        return;
      }
      let url = URL.ENGIN.SETDATA + URL.PORT.SET_ALARM_INFO;
      let data = {
        currentOrgCode: _self.params.pagination.currentOrgCode
      };
      url = http.filterUrl(data, url);
      let sendData = {
        barCode: goodsInfo.barCode,
        upPrice: goodsInfo.upPrice,
        downPrice: goodsInfo.downPrice
      };
      // if (mode == 0) {
      //   sendData = {
      //     barCode: goodsInfo.barCode,
      //     upPrice: goodsInfo.upPrice
      //   };
      // } else {
      //   sendData = {
      //     barCode: goodsInfo.barCode,
      //     downPrice: goodsInfo.downPrice
      //   };
      // }
      http.publicRequest(
        "POST",
        url,
        sendData,
        function(res) {},
        function(res) {}
      );
    },
    //返回上一页
    naviToBack() {
      this.$router.back(-1);
    },
    //检测提交数值是否合法
    checkBeforeCommit(number) {
      var numReg = /^(([1-9]{1}[0-9]{0,3})|[0]{0,1})([.]{0}|(([.]{1})([0-9]{0,2})))$/;
      var numRe = new RegExp(numReg);
      if (!numRe.test(number) || number == "") {
        this.$message({
          type: "warning",
          message: "请输入0至9999的有效数字 ",
          duration: 5000,
          showClose: true
        });
        return false;
      }
      return true;
    },
    //上下限数值合法性检测
    checkLimit(upData, downData) {
      let result = true;
      // console.log("上限值", upData, "下限值", downData);
      if (Number(upData) <= Number(downData)) {
        this.$message({
          type: "warning",
          message: "预警上限不能小于等于下限",
          duration: 5000,
          showClose: true
        });
        result = false;
        // console.log(result);
      }
      return result;
    }
  },
  created() {
    this.getAllInfo();
    this.getProductInfo();
  }
};
</script>
<style lang="less" scoped>
.search {
  margin-top: 10px;
  margin-bottom: 20px;
  .back {
    text-align: right;
  }
  .selectData {
    text-align: left;
    background: white;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
    .sData {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>


