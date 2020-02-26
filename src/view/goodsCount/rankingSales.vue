<template>
  <template-page
    :param="params"
    v-on:handleSize="handleSizeChange"
    v-on:handleCurrent="handleCurrentChange"
  >
    <div class="buttonRegion" slot="buttonRegion">
      <!--<div class="button">
				<el-button type="success">卷烟排名</el-button>
				<el-button @click="roadTo">区域排名</el-button>
      </div>-->
      <div class="search">
        <div>
          <citychoose
            :parama="params"
            v-on:cityChange="handleChangeCity"
            v-on:areaChange="handleChangeArea"
            v-on:gridChange="handleChangeGrid"
          ></citychoose>

          <!--<span class="demonstration">地市：</span>
					<el-select v-model="params.search.choosecity" placeholder="请选择">
						<el-option v-for="item in params.areacode" :key="item.id" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>-->
          <span class="demonstration">许可证号:</span>
          <el-input v-model="params.search.custCode" placeholder="请输入许可证号"></el-input>
          <span class="demonstration">类型：</span>
          <el-select v-model="params.search.province" placeholder="请选择" style="margin-top:10px;">
            <el-option
              v-for="item in params.isProvince"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="demons">
            <span class="demonstration">时间段：</span>
            <el-date-picker
              v-model="params.search.data_list"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>

            <el-button class="firstbutton" type="success" @click.native="loadTotalFirst">搜索</el-button>
            <el-button @click.native="reset">重置</el-button>
            <el-button type="success" @click.native="loadExcel">导出报表</el-button>
          </div>
          <!--<el-input v-model="params.search.smokename" placeholder="请输入卷烟名称"></el-input>-->
        </div>
      </div>
    </div>
    <div slot="pageTitle" class="pageTitle">
      <p>
        卷烟销售总计
        <span>{{params.sumInfor.tobaccoSaleTotal}}</span> 元&nbsp;&nbsp;&nbsp; 品牌总计
        <span>{{params.sumInfor.brandTotal}}</span>种 &nbsp;&nbsp;&nbsp;销量总计
        <span>{{params.sumInfor.amountTotal}}</span>条 &nbsp;&nbsp;&nbsp;毛利总计
        <span>{{params.sumInfor.profitTotal}}</span>元
      </p>
    </div>
    <div slot="pageRegion" class="pageRegion">
      <el-table
        :data="params.infor"
        border
        style="width: 100%; margin-top: 20px"
        @sort-change="sortChange"
      >
        <el-table-column prop="number" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{(params.pagination.currentPage - 1)*Number(params.pagination.pageSize) + scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tobaccoName" label="商品名称"></el-table-column>

        <el-table-column prop="tobaccoBrand" label="商品品牌">
          <template slot-scope="scope">
            <p :class="{'nopinter':params.showMark}">
              <span @click="menuList(scope.row)" class="area">{{scope.row.tobaccoBrand}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="beginStock" label="初始库存（条）"></el-table-column>
        <el-table-column prop="stockIn" label="入库（条）"></el-table-column>
        <el-table-column prop="stockOut" label="出库（条）"></el-table-column>
        <el-table-column prop="amountTotal" label="销量（条）" sortable="custom" width="100px;"></el-table-column>
        <el-table-column prop="endStock" label="最终库存（条）"></el-table-column>
        <el-table-column prop="priceTotal" label="销售总计（元）" sortable="custom"></el-table-column>
        <el-table-column prop="profitTotal" label="毛利总计（元）" sortable="custom"></el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <div class="pageDialog" slot="pageDialog"></div>
  </template-page>
</template>

<script>
import templatePage from "../template/templatePage";
import http from "@/utils/http.js";
import common from "@/utils/common.js";
import URL from "@/utils/url.js";
import validation from "@/utils/validation.js";
import citychoose from "../../components/tools/citychoose";
export default {
  data() {
    return {
      params: {
        selectedOptions: [],
        cityCode: [""],
        areaCode: [""],
        gridCode: [""],
        brandMap: {},
        row: "",
        infor: [{}],
        sumInfor: {},
        areacode: this.$store.state.user.userInfor.code,
        //分页组建
        sortType: "DESC",
        sortColumn: "amountTotal",
        pagination: {
          currentPage: 1,
          pageNum: 1,
					pageSize: 10,
          total: 1,
          hasPage: true
        },
        dataForm: {
          channelList: []
        },
        search: {
          area: "",
          smokename: "",
          choosecity: "",
          province: "",
          data_list: [],
          sortType: "DESC",
          sortColumn: "amountTotal",
          custCode: ""
        },

        isProvince: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "0",
            label: "本省烟"
          },
          {
            value: "1",
            label: "外省烟"
          }
        ],
        showMark: false,
        tempSearch: {
          cityCode: [""],
          areaCode: [""],
          gridCode: [""]
        }
      }
    };
  },
  components: {
    templatePage,
    citychoose
  },
  methods: {
    //获取初始日期
    getDate: function() {
      let _self = this;
      var date = new Date();
      var seperator = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      if (month > 1 && month <= 9) {
        var startDate =
          year + seperator + "0" + (month - 1) + seperator + strDate;
        var endDate = year + seperator + "0" + month + seperator + strDate;
      } else if ((month = 1)) {
        startDate = year - 1 + seperator + 12 + seperator + strDate;
        var endDate = year + seperator + "0" + month + seperator + strDate;
      } else {
        var startDate = year + seperator + (month - 1) + seperator + strDate;
      }

      _self.params.search.data_list[0] = startDate;
      _self.params.search.data_list[1] = endDate;
    },
    reset: function() {
      let _self = this;
      window.location.reload();
      //				_self.params.search.data_list=new Array();
      //				_self.params.cityCode[0]="";
      //				_self.params.areaCode[0]="";
      //				_self.params.gridCode[0]="";
      //				_self.loadTotal();
    },
    roadTo() {
      let _self = this;
      let url = "/rankingAreas";
      _self.$router.push(url);
    },
    handleChange(value) {},
    menuList(item, row) {
      let _self = this;
      let url =
        "/rankingBrand?tobaccoBrandId=" +
        item.tobaccoBrandId +
        "&tobaccoBrand=" +
        item.tobaccoBrand +
        "&startTime=" +
        _self.params.search.data_list[0] +
        "&endTime=" +
        _self.params.search.data_list[1] +
        "&cityCode=" +
        _self.params.cityCode +
        "&areaCode=" +
        _self.params.areaCode +
        "&gridCode=" +
        _self.params.gridCode +
        "&province=" +
        _self.params.search.province;
      _self.$router.push(url);
    },
    sortChange: function(column, prop, order) {
      let _self = this;
      if (column.order == "descending") {
        column.order = "DESC";
        _self.params.search.sortType = "DESC";
      } else {
        column.order = "ASC";
        _self.params.search.sortType = column.order;
      }
      if (column.prop == null) {
      } else {
        _self.params.search.sortColumn = column.prop;
        _self.loadMessage();
      }
    },
    handleChangeCity(value) {
      let _self = this;
      _self.params.cityCode = value;
    },
    handleChangeArea(value) {
      let _self = this;
      _self.params.areaCode = value;
    },
    handleChangeGrid(value) {
      let _self = this;
      _self.params.gridCode = value;
    },
    handleSizeChange(index) {
      let _self = this;
      _self.params.pagination.pageSize = index;
      _self.loadMessage();
    },
    handleCurrentChange(index) {
      let _self = this;
      _self.params.pagination.currentPage = index;
      _self.loadMessage();
    },
    loadTotalFirst() {
      let _self = this;
      _self.params.pagination.currentPage = 1;
      _self.loadTotal();
    },
    loadTotal() {
      let _self = this;
      let url = URL.ENGIN.SCORCE + URL.PORT.SMOKE_RANKINGTOTAL;
      let data = {
        id: 0,
        areacode: _self.params.areacode,
        cityCode: _self.params.cityCode[0],
        areaCode: _self.params.areaCode[0],
        gridCode: _self.params.gridCode[0],
        isProvince: _self.params.search.province,
        custCode: _self.params.search.custCode,
        startTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[0]
          : "",
        endTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[1]
          : ""
      };
      url = http.filterUrl(data, url);

      http.publicRequest(
        "get",
        url,
        "",
        function(res) {
          let result = res.body.data; //JSON.parse(JSON.stringify(res.body.data));
          _self.params.sumInfor = result;
        },
        function(res) {}
      );
      _self.loadMessage();
    },
    loadExcel() {
      let _self = this;
      let pagination = _self.params.pagination;
      let url = URL.ENGIN.SCORCE + URL.PORT.SMOKERANGINGSALES_EXCEL;
      let data = {
        id: 0,
        areacode: _self.params.areacode,
        cityCode: _self.params.cityCode[0],
        areaCode: _self.params.areaCode[0],
        gridCode: _self.params.gridCode[0],
        startTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[0]
          : "",
        endTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[1]
          : "",
        sortColumn: _self.params.search.sortColumn,
        sortType: _self.params.search.sortType,
        isProvince: _self.params.search.province,
        custCode: _self.params.search.custCode,
        pageNum: pagination.currentPage,
        pageSize: pagination.pageSize
      };
      url = http.filterUrl(data, url);
      url = window.location.origin + url;
      window.open(url);
    },
    loadMessage() {
      let _self = this;
      let search = _self.params.search;
      let pagination = _self.params.pagination;
      let url = URL.ENGIN.SCORCE + URL.PORT.SMOKE_RANGINGSALES;
      let data = {
        id: 0,
        areacode: _self.params.areacode,
        cityCode: _self.params.cityCode[0],
        areaCode: _self.params.areaCode[0],
        gridCode: _self.params.gridCode[0],
        startTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[0]
          : "",
        endTime: _self.params.search.data_list.length
          ? _self.params.search.data_list[1]
          : "",
        sortColumn: _self.params.search.sortColumn,
        sortType: _self.params.search.sortType,
        isProvince: _self.params.search.province,
        pageNum: pagination.currentPage,
        pageSize: pagination.pageSize,
        custCode: _self.params.search.custCode
      };
      url = http.filterUrl(data, url);
      http.publicRequest(
        "get",
        url,
        "",
        function(res) {
          _self.params.pagination.total = validation.total(res);
          let result = JSON.parse(JSON.stringify(res.body.data));
          _self.params.infor = result;
          if (_self.params.search.custCode == "") {
            _self.params.showMark = false;
          } else {
            _self.params.showMark = true;
          }
        },
        function(res) {}
      );
    }
  },
  created() {
    let _self = this;
      _self.params.cityCode[0]= _self.$store.state.user.userInfor.cityCode;
			_self.params.areaCode[0]= _self.$store.state.user.userInfor.areaCode;
			_self.params.gridCode[0]= _self.$store.state.user.userInfor.gridCode;
    _self.getDate();
    _self.loadTotal();
    _self.loadMessage();
  }
};
</script>

<style lang="less" scoped>
.pageTitle {
  padding: 15px;
  display: flex;
  background: #fff;
  p > span {
    color: red;
  }
}
.pageRegion {
  background: #fff;
  padding: 10px 10px 10px 10px;
}

.nopinter {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}

.area {
  color: cornflowerblue;
  cursor: pointer;
}

.search {
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 15px;
  div {
    text-align: left;
  }
  .demon {
    .demonstration {
      font-size: 14px;
      gin: 0 5px;
      margin-left: 15px;
    }
  }
  .demonstration {
    font-size: 14px;
    gin: 0 5px;
    margin-left: 15px;
  }
  .citychoose {
    display: flex;
    margin-left: 10px;
  }
  .el-date-editor {
    margin: 10px 10px;
    width: 355px;
  }
  .el-input {
    margin: 10px 10px;
    width: 150px;
  }
  .el-select {
    width: 150px;
  }
}
.testStyle {
  color: red;
}
</style>