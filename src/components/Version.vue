
<template>
  <div class="version">
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item >版本管理</el-breadcrumb-item>
          <el-breadcrumb-item >版本列表</el-breadcrumb-item>
          <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="list-header" >
        <div class="title">版本详情列表({{sumData.count}})</div>
        <div style="float: right;"><span class="table-add" @click="toAdd"><i class="el-icon-plus table-add-icon"></i>添加新的版本</span></div>
        <!--<div style="float: right;" v-if="showHc"><el-button class="add-btn" plain icon="el-icon-plus" @click="toAdd">添加新的版本</el-button></div>-->
      </div>
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
          prop="version_id"
          label="版本id"
          width="200">
        </el-table-column>
        <el-table-column
          label="状态"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.status|status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="extra_info.danger"
          label="危险"
          width="200">
        </el-table-column>
        <el-table-column
          prop="extra_info.desc"
          label="备注"
          width="200">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="200">
        </el-table-column>

        <el-table-column label="操作"  width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="toEdit(scope.row.appid,scope.row.version_id,scope.row.status,scope.row.extra_info,scope.row.create_time)">编辑</el-button>
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
          :total="tableData.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'version',
    data () {
      return {
        showHc:false,
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        tableData: [

        ],
        sumData:{},
        appType:{
          options: [
          ],
          value: null
        },
      }
    },
    methods: {
      // 获取版本控制列表
      getVersion(){
        this.$post('/version/get',
          {
            page:this.currentPage,
            appid_list:this.appType.options.value==null?null:[this.appType.options.value]
          }).then((res)=>{
            console.log("版本列表：",res);
            this.tableData = res.data_list;
            this.sumData = res.sum_data;
            if(this.tableData.length===0){
              this.sumData.count = 0;
          }
        })
      },
      //前往添加版本页面
      toAdd(){
        this.$router.push({path:"/home/version/add"})
      },
      //前往编辑应用页面
      toEdit(appid,version_id,status,extra_info,create_time){
        this.$router.push({path:"/home/version/edit/"+version_id,query:{appId:appid,versionId:version_id,status:status,danger:extra_info.danger,desc:extra_info.desc,createTime:create_time}})
      },

      currentAppId(value){
        this.appType.options.value = value;
        this.getVersion();
      },
      //页组件设置页码大小
      handleSizeChange(size) {
        this.pagesize = size;
      },
      //页组件当前页操作
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },

    },
    mounted(){
      if(sessionStorage.getItem("isSuperuser")){
        this.showHc = true;
      }
    },
    created(){
      this.appType.options = this.getAppIdList();
      this.appType.options.unshift({value:null,label:"--------"})
      this.getVersion();
    },
  }
</script>


<style scoped>

</style>
