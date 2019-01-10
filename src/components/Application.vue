
<template>
  <div class="appliction">
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >
            <span @click="test">应用管理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item >应用列表</el-breadcrumb-item>
          <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="list-header" >
        <div class="title">应用详情列表({{sumData.count}})</div>
        <div style="float: right;" v-if="showHc"><span class="table-add" @click="toAdd"><i class="el-icon-plus table-add-icon"></i>添加新的应用</span></div>
        <!--<div style="float: right;" v-if="showHc"><el-button class="add-btn" plain icon="el-icon-plus" @click="toAdd">添加新的应用</el-button></div>-->
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
          prop="appid"
          label="应用id"
          width="200">
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.status|status}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="create_time"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="extra_info===undefined?'':extra_info"
          label="额外信息"
          width="200">
        </el-table-column>
        <div v-if="showHc">
          <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="toEdit(scope.row.appid,scope.row.appkey,scope.row.status,scope.row.create_time)">编辑</el-button>
            </template>
          </el-table-column>
        </div>

      </el-table>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../utils/eventBus.js'
  import {page,superUser} from '../utils/mixins.js'
  export default {
    name: 'application',
    mixins:[page,superUser],
    data () {
      return {

      }
    },
    methods: {
      test(){
        this.getApplication();
      },
      // 获取应用列表
      getApplication(){
        this.$post('/application/get',{page:1}).then((res)=>{
          this.tableData = res.data_list;
          this.sumData = res.sum_data;
          if(this.tableData.length===0){
            this.sumData.count = 0;
          }
        })
      },
      //前往添加应用页面
      toAdd(){
        this.$router.push({path:"/home/application/add"})
      },
      //前往编辑应用页面
      toEdit(appId,appKey,status,createDate){
        this.$router.push({path:"/home/application/edit/"+appId,query:{appId:appId,appKey:appKey,status:status,createDate:createDate}})
      },
      //页组件当前页操作
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },
    },

    created(){
      //获取应用列表列表
      this.getApplication();
      console.log(process.env.NODE_ENV);
      bus.$on("app",(res)=>{

        this.getApplication();
      })
    },
    beforeDestroy(){
      bus.$off("app")
    },

  }
</script>


<style scoped>

</style>
