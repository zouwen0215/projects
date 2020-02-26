<template>
  <template-page
    :param="params"
    v-on:handleSize="handleSizeChange"
    v-on:handleCurrent="handleCurrentChange"
  >
    <div class="buttonRegion" slot="buttonRegion">
      <div class="search">
        <div class="naviTool">
          <el-button @click="navBack">返回</el-button>
        </div>
        <div class="selectTool" style="width:100%;">
          <span>商户名称:</span>
          <label class="contextLabel" v-text="params.shopName"></label>
          <span>许可证编号:</span>
          <label class="contextLabel" v-text="params.shopNumber"></label>
          <el-select class="nameInfo" v-model="params.selectDataArray.cateType" placeholder="选择分类">
            <el-option
              v-for="item in params.cataList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input class="nameInfo" v-model="params.selectDataArray.shopGoodsName" placeholder="请输入商品名"></el-input>
          <el-button type="success" @click="getStockDetail">搜索</el-button>
          <el-button type="success" @click="exportInfo">导出报表</el-button>
        </div>
      </div>
    </div>
    <div class="pageRegion" slot="pageRegion">
      <el-table :data="params.goodsInfoList">
        <el-table-column prop="shopGoodsName" label="商品名称"></el-table-column>
        <el-table-column prop="remainStock" label="库存数量"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="costPrice" label="成本价"></el-table-column>
        <el-table-column prop="price" label="售价"></el-table-column>
        <el-table-column prop="stockCostPrice" label="库存总成本"></el-table-column>
      </el-table>
    </div>
  </template-page>
</template>
<script>
import templatePage from "../template/templatePage";
import http from "@/utils/http.js";
import URL from "@/utils/url.js";
import validation from "@/utils/validation.js";

export default {
  data() {
    return {
      params: {
        pagination: {
          currentPage: 1,
          pageNum: "1",
          pageSize: "10",
          total: 0,
          hasPage: true
        },
        shopID: "",
        shopName: "",
        shopNumber: "",
        goodsType: "",
        endTime: "",
        cataList: [],
        selectDataArray: {
          cateType: "",
          shopGoodsName: ""
        },
        goodsInfoList: []
      }
    };
  },
  components: {
    templatePage
  },
  methods: {
    //数据翻页
    handleCurrentChange(index) {
      let _self = this;
      _self.params.pagination.pageNum = index;
      _self.getStockDetail();
    },
    //修改每页数据量
    handleSizeChange(index) {
      let _self = this;
      _self.params.pagination.pageSize = index;
      _self.getStockDetail();
    },
    //返回上一页
    navBack() {
      this.$router.go(-1);
    },
    //通过请求url获取店铺数据
    getShopInfo(name, code, id, type, endTime) {
      let _self = this;
      _self.params.shopName = name;
      _self.params.shopNumber = code;
      _self.params.shopID = id;
      _self.params.goodsType = type;
      console.log(type);
      _self.params.endTime = endTime;
    },
    //获取商品二级分类
    getSecondCate() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_SECOND_CATE_INFO;
      let data = {
        shopId: _self.params.shopID,
        goodsFlag: _self.params.goodsType
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "GET",
        url,
        "",
        function(res) {
          let result = res.body.data;
          _self.params.cataList = result;
        },
        function(res) {}
      );
    },
    //获取零售户库存详情
    getStockDetail() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.GET_STOCK_DETAIL_INFO;
      let data = {
        shopId: _self.params.shopID,
        goodsFlag: _self.params.goodsType,
        brandId: _self.params.selectDataArray.cateType,
        shopGoodsName: _self.params.selectDataArray.shopGoodsName,
        endTime: _self.params.endTime,
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
          _self.params.goodsInfoList = result;
        },
        function(res) {}
      );
    },
    //导出数据
    exportInfo() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.EXPORT_STOOCK_DETAIL_INFO;
      let data = {
        shopId: _self.params.shopID,
        goodsFlag: _self.params.goodsType,
        brandId: _self.params.selectDataArray.cateType,
        shopGoodsName: _self.params.selectDataArray.shopGoodsName,
        endTime: _self.params.endTime,
      };
      url = http.filterUrl(data, url);
      url =  window.location.origin + url;
      window.location.href = url;
    }
  },
  created() {
    this.getShopInfo(
      this.$route.query.shopName,
      this.$route.query.shopNumber,
      this.$route.query.shopId,
      this.$route.query.goodsType,
      this.$route.query.endTime
    );
    this.getSecondCate();
    this.getStockDetail();
  }
};
</script>
<style lang="less">
.search {
  .naviTool {
    text-align: right;
  }
  .selectTool {
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
    background: white;
    .contextLabel {
      margin-right: 10px;
    }
    .nameInfo {
      width: 120px;
    }
  }
}
</style>


