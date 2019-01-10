<template>
  <div class="application-add">
    <div class="confirm-dialog">
      <el-dialog
        :visible.sync="confirmDialogVisible"
        width="24%"
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
        <span style="font-size: 16px;font-weight: bolder;color:#555;">确定添加该应用吗？</span>
        <span slot="footer" class="dialog-footer">
            <button class="btn confirm-btn" @click="confirmAdd" >确 定</button>
            <button class="btn reset-btn" @click="confirmDialogVisible = false"  style="margin-left: 20px;" >取 消</button>
          </span>
      </el-dialog>
    </div>
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item :to="{ path: '/home/application' }">应用列表</el-breadcrumb-item>
          <el-breadcrumb-item>添加新的应用</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>


      <div class="list-header" >
        <div class="title">添加新的应用</div>
      </div>
      <div style="padding:20px;border:1px solid #eee;box-sizing: border-box;min-width:1200px">
        <div class="infoTable2">
          <div class="infoTable-title">基本信息</div>
          <el-table
            :data="baseInfoData"
            border
            style="min-width: 1158px">
            <el-table-column
              prop="param"
              label="参数"
              width="200">
            </el-table-column>
            <el-table-column
              label="设置"
              width="400">
              <template slot-scope="scope" >
                <div v-if="(scope.$index+1)===1?true:false">
                  <el-input v-model="createApp.appId"></el-input>
                </div>
                <div v-if="(scope.$index+1)===2?true:false">
                  <el-input v-model="createApp.appKey"></el-input>
                </div>
                <div v-if="(scope.$index+1)===3?true:false">
                  <el-select v-model="createApp.status" placeholder="请选择">
                    <el-option
                      v-for="item in select.status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc"
              label="说明"
              width="600">
            </el-table-column>
          </el-table>
        </div>
        <div style="padding:10px 100px 0 200px">
          <button class="btn confirm-btn" @click="doAdd">添加</button><button class="btn reset-btn" style="margin-left: 200px;" @click="reset">重置</button>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'product-add',
    data () {
      return {
        confirmDialogVisible:false,
        baseInfoData:[
          {param:"appid",value:"",desc:"应用号"},
          {param:"appkey",value:"",desc:"密钥"},
          {param:"状态",value:"",desc:"状态：删除，正常。默认：正常"},
        ],
        createApp:{
          appId:"",
          appKey:"",
          status:1,
        },
        //下拉选择
        select:{
          status:[
            {value:1,label:"正常"},
            {value:0,label:"删除"},
          ]
        }

      }
    },
    methods: {
      //更新或者创建应用
     updateApplication(){
      this.$post('/application/update',
        {
          appid:this.createApp.appId,
          appkey:this.createApp.appKey,
          status:this.createApp.status,
        }).then((res)=>{
        this.confirmDialogVisible = false;
        this.$router.push({path:'/home/application'})
      })
    },
      //确定创建商品的操作
      doAdd(){
        this.confirmDialogVisible = true;
      },
      confirmAdd(){
        this.updateApplication();
      },
      reset(){
        this.createApp.appId = "";
        this.createApp.appKey = "";
        this.createApp.status =1;
      },

    },
    created(){

    },

  }
</script>

<style scoped>

</style>
