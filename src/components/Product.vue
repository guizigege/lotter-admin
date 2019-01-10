
<template>
  <div class="product">
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item >商品管理</el-breadcrumb-item>
          <el-breadcrumb-item >商品列表</el-breadcrumb-item>
          <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
      </div>


      <div class="list-header" >
        <div class="title">商品详情列表({{sumData.count}})</div>
        <div style="float: right;" v-if="showHc"><span class="table-add" @click="toAdd"><i class="el-icon-plus table-add-icon"></i>添加新的商品</span></div>
        <!--<div style="float: right;" v-if="showHc"><el-button class="add-btn" plain icon="el-icon-plus" @click="toAdd">添加新的商品</el-button></div>-->
      </div>
      <div class="search"><el-input v-model="search" placeholder="搜索商品id..." style="width: 250px;margin-right: 20px;"></el-input><el-button icon="el-icon-search" @click="doSearch">搜索</el-button></div>
      <div class="select">
        <div class="app-type">
          <span style="color:#555;font-weight: 600;">应用程序：</span>
          <el-select v-model="appType.value" placeholder="请选择" @change="getOtherSelectData">
            <el-option
              v-for="item in appType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="app-type">
          <span style="color:#555;font-weight: 600;">商品类型：</span>
          <el-select v-model="productType.value" placeholder="请选择"  collapse-tags>
            <el-option
              v-for="item in productType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="app-type">
          <span style="color:#555;font-weight: 600;">商品状态：</span>
          <el-select v-model="productStatus.value" placeholder="请选择">
            <el-option
              v-for="item in productStatus.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="research-btn"><el-button plain icon="el-icon-ai-exit" @click="doResearch" style="background-color: steelblue;color:#fff;margin-left: 20px;">查询</el-button></div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%" border max-height="800px">
        <el-table-column
          label="序号"
          width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1+((currentPage-1)*10)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品id"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.product_sale_id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.extra_info.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品价格(元)"
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="appid"
          label="所属应用id"
          width="120">
        </el-table-column>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.status|status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.type|productType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否链式"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.extra_info.chain_reward|ih}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="链式层数"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.extra_info.chain_reward_height}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="200" v-if="showHc">
          <template slot-scope="scope">

            <el-button
              size="mini"
              @click="toEdit(scope.row.appid,scope.row.product_sale_id)">编辑</el-button>
          </template>
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
  export default {
    name: 'product',
    data () {
      return {
        showHc:false,
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        tableData: [

        ],
        sumData:{
          count:0,
          page_count:1,
        },
        appName:"",
        search:"",
        result:"",
        appType:{
          options: [
          ],
          value: null
        },
        channelType:{
          options: [
          ],
          value: []
        },
        productStatus:{
          options: [
            {value:null,label:"--------"},
            {value:1,label:"正常"},
            {value:0,label:"删除"},
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
        productId:{
          options: [
          ],
          value: []
        },

      }
    },
    methods: {
      // 获取应用列表
      getApplication(){
        this.$post('/application/get',{page:1}).then((res)=>{
          this.tableData = res.data_list;
          console.log(this.tableData);
        })
      },
      //获取商品列表
      getProductList(page,id,type,list){
        this.$post('/trade/product_sale/get',{page:page,product_sale_id:id,type:type,appid_list:list==null?null:[list],}).then((res)=>{
          this.tableData = res.data_list;
          this.sumData = res.sum_data;
          if(this.tableData.length===0){
            this.sumData.count = 0;
          }
        })
      },

      //前往添加商品页面
      toAdd(){
        this.$router.push({path:"/home/product/add"})
      },
      //前往编辑商品页面
      toEdit(appId,productId){
        this.$router.push({path:`/home/product/edit/${appId}/${productId}`})
      },
      //页组件设置页码大小
      handleSizeChange(size) {
        this.pagesize = size;
      },
      //页组件当前页操作
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getProductList(this.currentPage,null,this.productType.value,this.appType.value);
      },
      //搜索指定id的商品
      doSearch(){
        this.getProductList(1,parseInt(this.search));
      },
      getOtherSelectData(){

      },
      rechargeStatus(){

      },
      //按条件查询指定商品
      doResearch(){
        this.getProductList(1,null,this.productType.value,this.appType.value);
        console.log("productType:",this.productType.value);
        console.log("productStatus:",this.productStatus.value);
        console.log("appType:",this.appType.value);
      }
    },
    mounted(){
      if(sessionStorage.getItem("isSuperuser")){
        this.showHc = true;
      }
    },
    created(){
      this.appType.options = this.getAppIdList();
      this.appType.options.unshift({value:null,label:"--------"})
      this.channelType.options = this.getChannelIdList();
      this.getProductList(this.currentPage);
    },

  }
</script>


<style scoped>




</style>
