<template>
  <div class="channel">
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
          <el-breadcrumb-item>渠道列表</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="list-header" >
        <div class="title"><span style="color:#ba3636"></span>渠道详情列表({{tableData.length}})</div>
        <div style="float: right;"><span class="table-add" @click="toAdd"><i class="el-icon-plus table-add-icon"></i>添加渠道号</span></div>
        <!--<div style="float: right;"><el-button class="add-btn" plain icon="el-icon-plus" @click="toAdd" v-if="showHc">添加渠道号</el-button></div>-->
      </div>
      <div class="search" style="height:0">
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
        style="width: 100%" border max-height="800px" v-loading="loading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff">
        <el-table-column
          label="序号"
          width="80">
          <template slot-scope="scope">
            <span>{{scope.$index+1+((currentPage-1)*10)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="渠道号" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px" class="channelId" @click="toDetail(scope.row.chn_id,scope.row.appid)">{{ scope.row.chn_id}}</span>
          </template>
        </el-table-column>
        <el-table-column
        prop="appid"
        label="所属应用程序"
        width="120">
        </el-table-column>

        <el-table-column
          label="扣量百分比"
          width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.extra_info.hidden_chance}}%</span>
          </template>
        </el-table-column>

        <el-table-column
          label="渠道二维码"
          width="100">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="210"
              trigger="hover">
              <img  style="width:180px;height:180px;border:1px solid #ccc" :src="'http://172.16.0.75:14588/chn_qrcode/'+scope.row.code"/>
              <img slot="reference" style="width:50px;height:50px;border:1px solid #ccc" :src="'http://172.16.0.75:14588/chn_qrcode/'+scope.row.code"/>
              <!--<img  style="width:180px;height:180px;border:1px solid #ccc" :src="'http://web.gzguru.com/chn_qrcode/'+scope.row.code"/>-->
              <!--<img slot="reference" style="width:50px;height:50px;border:1px solid #ccc" :src="'http://web.gzguru.com/chn_qrcode/'+scope.row.code"/>-->
            </el-popover>
          </template>
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
          label="创建日期"
          width="200">
        </el-table-column>
        <el-table-column
          label="渠道链接"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              v-clipboard:copy="'http://pa.shenwang.mobi/web/lottery/index.html?chn_id='+scope.row.chn_id"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">复制渠道链接</el-button>
          </template>
        </el-table-column>
        <div v-if="showHc">
          <el-table-column label="操作"  width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="toEdit(scope.row.chn_id,scope.row.appid,scope.row.status,scope.row.extra_info.hidden_chance,scope.row.create_time)">编辑</el-button>
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
  import {page,superUser} from '../utils/mixins.js'
  export default {
    name: 'channel',
    mixins:[page,superUser],
    data () {
      return {
        loading:true,
        appName:"",
        search:"",
        appType:{
          options: [

          ],
          value: null
        },
        path:""
      }
    },
    methods: {

      //获取渠道号列表
      getChannel(page,appid){
        this.loading = true;
        this.$post('/channel/get',
          {
            page:page,
            appid:appid,
          }).then((res)=>{
            let data = res.data_list;
            let len = data.length;
            if(len===0){
              this.loading = false;
            }
            for(let i=0;i<len;i++){
              let obj = {};
              obj = data[i];
              if(obj.appid === "grtaskwall"){
                this.$post('/wechat_mp/qrcode/get',{appid:"grtaskwall",scene:obj.chn_id.toString()}).then((res)=>{
                  obj.code = res.fileName;
                });
              }
              setTimeout(()=>{
                this.tableData.push(obj);
                this.loading = false;
              },600)
            }


            // let that = this;
            // function getPicCode(chn_id){
            //   return Promise((resolve)=>{
            //
            //     that.$post('/wechat_mp/qrcode/get',{appid:"grtaskwall",scene:chn_id.toString()}).then((res)=>{
            //        resolve(res);
            //     });
            //   })
            //
            // }
            // async function getList(){
            //   for(let i=0;i<len;i++){
            //     let obj = data[i];
            //     if(obj.appid === "grtaskwall"){
            //       obj.code = await getPicCode(obj.chn_id);
            //
            //     }
            //     that.tableData.push(obj);
            //     that.loading = false;
            //   }
            // }
            // getList();
        })
      },
      // 复制成功
      onCopy(e){
        this.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: `<div style="color:#409EFF">已经成功复制渠道号链接:<div>${e.text}</div></div>`,
          duration: 1500,
          customClass: 'copyMessage'
        })
      },
      // 复制失败
      onError(e){
        alert("失败");
      },
      toEdit(chn_id,appid,status,hc,create_time) {
        this.$router.push({path:"/home/channel/edit/"+chn_id,query:{chn_id,appid,status,hc,create_time}})
      },
      toAdd(){
        this.$router.push({
          path:"/home/channel/add"
        })
      },
      toDetail(chn_id,appid){
        this.$router.push({path:"/home/channel/detail/"+chn_id,query:{appid,chn_id}})
      },
      currentAppId(){
        this.tableData = [];
        this.getChannel(1,this.appType.value);
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },

    },
    created(){
      this.appType.options = this.getAppIdList();
      this.appType.options.unshift({value:null,label:"--------"})
      this.getChannel(this.currentPage);
    },

  }
</script>


<style scoped>

  .channelId{
    cursor: pointer;
    font-weight: bold;
    color: steelblue;
  }
 .channelId:hover{
   text-decoration: underline;
 }
</style>
