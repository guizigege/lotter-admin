
<template>
  <div class="product">
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item >用户管理</el-breadcrumb-item>
          <el-breadcrumb-item >用户列表</el-breadcrumb-item>
          <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
      </div>


      <div class="list-header" >
        <div class="title">用户详情列表({{sumData.count}})</div>
      </div>
      <div class="search"><el-input v-model="search" placeholder="搜索用户id..." style="width: 250px;margin-right: 20px;"></el-input><el-button icon="el-icon-search" @click="doSearch">搜索</el-button></div>
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
          <el-select v-model="channelId.value" placeholder="请选择">
            <el-option
              v-for="item in channelId.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="app-type">
          <span style="color:#555;font-weight: 600;">状态：</span>
          <el-select v-model="status.value" placeholder="请选择">
            <el-option
              v-for="item in status.options"
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
            placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="userStartDate">
          </el-date-picker>
          <span style="color:#555;font-weight: 600;">--------</span>
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="userEndDate">
          </el-date-picker>
          <div class="research-btn"><el-button plain icon="el-icon-ai-exit" @click="doResearch" style="background-color: steelblue;color:#fff;margin-left: 20px;">查询</el-button></div>
        </div>
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
          label="用户id"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.uid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上级用户id"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.front_uid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属应用id"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.appid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属渠道id"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.chn_id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户余额"
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.base_money}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.status|status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.create_time}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.update_time}}</span>
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

        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        tableData: [

        ],
        sumData:{
          count:1,
          page_count:1,
        },
        startDate:null, //创建时间
        endDate:null, //更新时间
        search:"",//搜索
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
        status:{
          options: [
            {value:null,label:"--------"},
            {value:1,label:"正常"},
            {value:0,label:"删除"},
          ],
          value: null
        },
      }
    },
    methods: {
      // 获取用户列表
      getUser(){
        this.$post('/user/get',
          {
            page:this.currentPage,
            appid_list:this.appType.value==null?null:[this.appType.value,],
            chn_id_list:this.channelId.value==null?null:[this.channelId.value],
            status:this.status.value,
            create_start_time:this.startDate,
            create_end_time:this.endDate
          }).then((res)=>{
          this.tableData = res.data_list;
          console.log("用户列表：",res);
          this.sumData =res.sum_data;
          if(this.tableData.length===0){
            this.sumData.count = 0;
          }
        })
      },
      userStartDate(value){
        this.startDate = value;
      },
      userEndDate(value){
        this.endDate = value;
      },
      //页组件设置页码大小
      handleSizeChange(size) {
        this.pagesize = size;
      },
      //页组件当前页操作
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getUser();
      },
      //搜索指定id的用户
      doSearch(){

      },
      currentAppId(value){
        this.channelId.options = this.getChannelIdList(value);
      },
      rechargeStatus(){

      },
      //按条件查询指定用户
      doResearch(){
        this.getUser();
      }
    },
    created(){
      this.appType.options = this.getAppIdList();
      this.channelId.options = this.getChannelIdList("grtaskwall");
      this.getUser();

    },

  }
</script>


<style scoped>




</style>
