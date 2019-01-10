
<template>
  <div class="order">
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >订单管理</el-breadcrumb-item>
          <el-breadcrumb-item >订单列表</el-breadcrumb-item>
          <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
      </div>


      <div class="list-header">
        <div class="title">订单详情列表({{sumData.count}})</div>
        <div class="title" style="float: right;margin-right: 30px;">订单总金额:<span style="color:#ba3636;margin-left: 10px;">{{sumData.sum_pay_base_money}}元</span></div>
        <!--<div class="title" style="float: right;margin-right: 30px;">订单总余额:<span style="color:#ba3636;margin-left: 10px;">{{orderBaseSum===undefined?0:orderBaseSum}}元</span></div>-->
      </div>
      <div class="search"><el-input v-model="search" placeholder="搜索订单号..." style="width: 250px;margin-right: 20px;"></el-input><el-button icon="el-icon-search" @click="doSearch">搜索</el-button></div>
      <div class="select">
        <div class="app-type">
          <span style="color:#555;font-weight: 600;">应用程序：</span>
          <el-select v-model="appType.value" placeholder="请选择" @change="currentAppId">
            <el-option
              v-for="item in appType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="app-type">
        <span style="color:#555;font-weight: 600;">渠道号：</span>

        <el-select v-model="channelId.value" placeholder="请选择"  collapse-tags>
          <el-option
            v-for="item in channelId.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
        <div class="app-type">
          <span style="color:#555;font-weight: 600;">产品编号：</span>
          <el-select v-model="productId.value" placeholder="请选择"  collapse-tags>
            <el-option
              v-for="item in productId.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="app-type">
          <span style="color:#555;font-weight: 600;">产品类型：</span>
          <el-select v-model="productType.value" placeholder="请选择"  collapse-tags @change="currentProductType">
            <el-option
              v-for="item in productType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="app-type">
          <span style="color:#555;font-weight: 600;" >支付状态：</span>
          <el-select v-model="payStatus.value" placeholder="请选择">
            <el-option
              v-for="item in payStatus.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="app-type">
          <span style="color:#555;font-weight: 600;">充入状态：</span>
          <el-select v-model="status.value" placeholder="请选择">
            <el-option
              v-for="item in status.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="app-type" v-if="showHc">
          <span style="color:#555;font-weight: 600;">扣量：</span>
          <el-select v-model="ih.value" placeholder="请选择">
            <el-option
              v-for="item in ih.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="app-type" style="display: block">
          <span style="color:#555;font-weight: 600;">选择日期范围：</span>
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="orderStartDate">
          </el-date-picker>
          <span style="color:#555;font-weight: 600;">--------</span>
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="orderEndDate">
          </el-date-picker>
          <div class="research-btn"><el-button plain icon="el-icon-ai-exit" @click="doResearch" style="background-color: steelblue;color:#fff;margin-left: 20px;">查询</el-button></div>
        </div>


      </div>

      <el-table
        :data="tableData"
        style="width: 100%" border max-height="800px" >
        <el-table-column
          label="序号"
          width="50">
          <template slot-scope="scope">
            <span>{{scope.$index+1+((currentPage-1)*10)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="uid"
          label="用户id"
          width="160">
        </el-table-column>
        <el-table-column
          prop="order_code"
          label="订单号"
          width="220">
        </el-table-column>
        <el-table-column
          prop="appid"
          label="所属应用程序"
          width="120">
        </el-table-column>
        <el-table-column
          prop="extra_info.chn_id"
          label="所属渠道号"
          width="120">
        </el-table-column>
        <el-table-column
          label="是否扣量"
          width="80" v-if="showHc">
          <template slot-scope="scope">
            <span>{{scope.row.extra_info.is_hidden|ih}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="订单金额"
          sortable
          width="120">
        </el-table-column>

        <el-table-column
          prop="base_money"
          label="订单余额"
          sortable
          width="120">
        </el-table-column>

        <el-table-column
          prop="pay_money"
          label="支付金额"
          sortable
          width="120">
        </el-table-column>

        <el-table-column
          prop="pay_base_money"
          label="支付余额"
          sortable
          width="120">
        </el-table-column>
        <el-table-column
          label="支付状态"
          width="80">
          <template slot-scope="scope">
            <span>{{scope.row.pay_status|payStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="充入状态"
          width="80">
          <template slot-scope="scope">
            <span>{{scope.row.status|rechargeStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="订单生成时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="pay_time"
          label="用户支付时间"
          width="160">
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sumData.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {page,superUser} from "../utils/mixins";

  export default {
    name: 'order',
    mixins:[page,superUser],
    data () {
      return {

        startDate:"",
        endDate:"",
        appName:"",
        search:"",
        result:"",

        appType:{
          options: [
          ],
          value: "grtaskwall"
        },
        channelId:{
          options: [
          ],
          value: null
        },
        productId:{
          options: [
          ],
          value: null
        },
        productType:{
          options: [
            {value:null,label:"--------"},
            {value:1,label:"充值"},
            {value:2,label:"奖励任务"},
            {value:3,label:"抽奖"},
            {value:4,label:"抽奖次数"},
            {value:10001,label:"积分购买"},
          ],
          value: null
        },
        payStatus:{
          options: [
            {value:null,label:"--------"},
            {value:0,label:"没支付"},
            {value:1,label:"支付中"},
            {value:2,label:"支付成功"},
            {value:3,label:"支付失败"},
          ],
          value: null
        },
        status:{
          options: [
            {value:null,label:"--------"},
            {value:0,label:"没支付"},
            {value:1,label:"通知中"},
            {value:2,label:"重试通知中"},
            {value:3,label:"成功"},
            {value:4,label:"失败"},
            {value:5,label:"退款成功"},
            {value:6,label:"退款失败"},
            {value:7,label:"退款中"},
            {value:8,label:"退款金额错误"},
          ],
          value: null
        },
        ih:{
          options: [
            {value:null,label:"--------"},
            {value:0,label:"否"},
            {value:1,label:"是"},

          ],
          value: null
        },

        sumData:{
          sum_pay_base_money:0
        },
      }
    },
    methods: {
      getOrder(page,appId,start,chnId,productId,productType,payStatus,status,end,ih){
        this.$post('/trade/order/get',
          {
            page:page,
            appid_list:[appId],
            chn_id_list:chnId==null?null:[chnId],
            product_sale_id_list:productId==null?null:[productId],
            product_sale_type_list:productType==null?null:[productType],
            pay_status:payStatus,
            status:status,
            create_start_time: start===""?"2018-05-05 12:00:00":start,
            create_end_time:end===""?null:end,
            ih: ih,
          }).then((res)=>{
            console.log("订单：",res)
            this.tableData = res.data_list;
            this.sumData = res.sum_data;
            if(this.tableData.length===0){
              this.sumData.count = 0;
              this.sumData.sum_pay_base_money = 0;
            }
          })
      },
      orderStartDate(value){
        this.startDate = value;
      },
      orderEndDate(value){
        this.endDate = value;
      },

      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getOrder(this.currentPage,this.appType.value,this.startDate,this.channelId.value,this.productType.value,this.productId.value,this.payStatus.value,this.status.value,this.endDate,this.ih.value);
      },
      sort(a,b){
        return a-b;
      },

      //根据当前appid，获取渠道号id列表和商品id列表
      currentAppId(value){
        this.channelId.options = this.getChannelIdList(value);
        this.productId.options = this.getProductIdList([value],this.productType.value);
      },
      //根据当前产品类型，获取对应的商品id列表
      currentProductType(value){

      },
      //搜索订单号
      doSearch(){

      },
      //根据条件查询订单号
      doResearch(){
        this.getOrder(
          1,
          this.appType.value,
          this.startDate,
          this.channelId.value,
          this.productId.value,
          this.productType.value,
          this.payStatus.value,
          this.status.value,
          this.endDate,
          this.ih.value
        );
      },
    },

    created(){
      this.appType.options = this.getAppIdList();
      this.channelId.options = this.getChannelIdList(this.appType.value);
      this.productId.options = this.getProductIdList([this.appType.value],this.productType.value);
      this.getOrder(1,this.appType.value,"2018-05-01 12:00:00");
    },

  }
</script>
<style>


</style>

<style scoped>

</style>
