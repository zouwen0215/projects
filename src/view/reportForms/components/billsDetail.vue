<style lang="less" scoped>
.infor {
  text-align: left;
  .billCode{
  	  font-size: 18px;
  		margin-left: 10px;
  		.number{
  			color: #3A8EE6;
  		}
  }
  .part{
  	margin-top: 20px;
  	margin-bottom: 20px;
  	display: flex;
  	&>p{
  		margin-left: 10px;
  	}
  }
}
.pageRegion{
	.firdiv{
		padding-top: 10px;
		padding-bottom: 10px;
	  flex: 1;
	  color: #A6A9AD;
	}
	.secdiv{
		  flex: 1;
		  line-height: 60px;
		  color: #A6A9AD;
	}
}
</style>
<template>
  <template-page :param="params" v-on:handleSize="handleSizeChange"  v-on:handleCurrent="handleCurrentChange">
    <div class="buttonRegion" slot="buttonRegion">
      <div class="infor">
        <p class="billCode">订单号：<span class="number">{{params.infor.billCode}}</span></p>
        <div class="part">
        <p>订单时间：{{params.infor.checkOutTime}}</p>
        <p>订单总价：{{params.infor.totalConsume}}元</p>
        <p>折扣金额：{{params.infor.totalDiscount}}元</p>
        <p>销售金额：<span style="color:#f00;font-weight:800">{{params.infor.receivables}}</span>元</p>
        </div>
        </div>
       
      </div>
    <div slot="pageRegion" class="pageRegion">
      <el-table :data="params.infor.billItemsList" :default-expand-all="false" :row-class-name="getRowClass"  border style="width: 100%; margin-top: 20px">
      	 <el-table-column type="expand" >
      	 <template slot-scope="props">
                    <div  v-for="person in props.row.children" style="display: flex;">
                        <div class="firdiv"><p>{{ person.goodsName  }}</p><p v-if="person.barCode=='1'">条形码：</p>
                        	
                        	<p v-else>条形码：{{ person.barCode  }}</p></div>
                        <div class="secdiv" >{{ person.goodsPrice  }}</div>
                        <div class="secdiv">{{ person.goodsNums }}</div>
                        <div class="secdiv">{{ person.unit }}</div>
                        <div class="secdiv" >{{ person.totalGoodsConsume }}</div>
                    </div>      
      	 </template>
      	 </el-table-column>
   
        <el-table-column prop="goodsName" label="商品名称" >
          <template slot-scope="scope">
            <p>{{scope.row.goodsName}}</p>
            <p v-if="scope.row.barCode=='1'">条形码：</p>
            <p v-else>条形码：{{scope.row.barCode}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="goodsPrice" label="商品单价"></el-table-column>
        <el-table-column prop="goodsNums" label="商品数量"></el-table-column>
        <el-table-column prop="unit" label="商品单位"></el-table-column>
        <el-table-column prop="totalGoodsConsume" label="消费金额"></el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <div class="pageDialog" slot="pageDialog"></div>
  </template-page>
</template>
<script>
import templatePage from "../../template/templatePage";
import http from '@/utils/http.js'
import common from '@/utils/common.js'
import URL from '@/utils/url.js'
import validation from '@/utils/validation.js'
export default {
  data() {
    return {
      params: {
        infor: [],
        //分页组建
        pagination: {
          currentPage: 1,
          pageNum: "1",
          pageSize: "10",
          total: 1,
          hasPage: false
        },
       
      }
    };
  },
  props: {
    param: ""
  },
  components: {
    templatePage
  },
  methods: {
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
    getRowClass(row, index) {
    	  let res = []
       if (row.row.children.length==0){
    	   return 'row-expand-cover'  
    }
  },
    loadMessage() {
      let _self = this;
      let search = _self.params.search;
      let pagination = _self.params.pagination;
      let url = URL.ENGIN.SCORCE+ URL.PORT.PAY_BILLS_DETAIL_LIST_DETAIL;
      let data = {
        shopId: _self.param.dialog.msg.shopId,
        billCode: _self.param.dialog.msg.billCode
      };
      url = http.filterUrl(data, url);
       
      http.publicRequest( "get",url, "",function(res) {
          //   _self.params.pagination.total = validation.total(res);
          let result = JSON.parse(JSON.stringify(res.body.data));
          _self.params.infor = result;
          console.log('1111',result)
        },
        function(res) {}
      );
    }
  },
  created() {
      let _self = this;
      console.log("1111111111111111111111")
    _self.loadMessage();
  }
};
</script>

