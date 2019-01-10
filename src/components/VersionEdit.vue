<template>
  <div class="version-edit">
    <div class="confirm-dialog">
      <el-dialog
        :visible.sync="confirmDialogVisible"
        width="24%"
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
        <span style="font-size: 16px;font-weight: bolder;color:#555;">确定更新该版本号吗？</span>
        <span slot="footer" class="dialog-footer">
            <button class="btn confirm-btn" @click="confirmAdd" >确 定</button>
            <button class="btn reset-btn" @click="confirmDialogVisible = false"  style="margin-left: 20px;" >取 消</button>
          </span>
      </el-dialog>
    </div>
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item :to="{ path: '/home/version' }">版本列表</el-breadcrumb-item>
          <el-breadcrumb-item>更新版本号</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>


      <div class="list-header" >
        <div class="title">更新版本</div>
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
                  {{createVersion.appId}}
                </div>
                <div v-if="(scope.$index+1)===2?true:false">
                  {{createVersion.versionId}}
                </div>
                <div v-if="(scope.$index+1)===3?true:false">
                  <el-select v-model="createVersion.status" placeholder="请选择">
                    <el-option
                      v-for="item in select.status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div v-if="(scope.$index+1)===4?true:false">
                  {{createVersion.createTime}}
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
        <div class="infoTable2">
          <div class="infoTable-title">额外信息</div>
          <el-table
            :data="extraInfoData"
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
                  <el-select v-model="createVersion.extra_info.danger" placeholder="请选择">
                    <el-option
                      v-for="item in select.danger"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div v-if="(scope.$index+1)===2?true:false">
                  <el-input v-model="createVersion.extra_info.desc"></el-input>
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
          <button class="btn confirm-btn" @click="doAdd">更新</button><button class="btn reset-btn" style="margin-left: 200px;" @click="reset">重置</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'version-edit',
    data () {
      return {
        confirmDialogVisible:false,
        baseInfoData:[
          {param:"appid",value:"",desc:"应用号"},
          {param:"version_id",value:"",desc:"版本ID"},
          {param:"状态",value:"",desc:"状态：删除，正常。默认选择“正常”"},
          {param:"创建时间",value:"",desc:"该版本创建的具体时间"},
        ],
        extraInfoData:[
          {param:"危险",value:"",desc:"是否危险，对于小程序:1代表正在提审。默认选择“安全”"},
          {param:"备注",value:"",desc:"该版本相关信息的描述"},
        ],
        createVersion:{
          appId:"",
          versionId:0,
          status:1,
          createTime:"",
          extra_info:{
            danger:0,
            desc:""
          }
        },
        select:{
          danger:[
            {value:1,label:"危险"},
            {value:0,label:"安全"},
          ],
          status:[
            {value:1,label:"正常"},
            {value:0,label:"删除"},
          ]

        }
      }
    },
    methods: {
      // 更新或者创建版本控制
      updateVersion(){
        this.$post('/version/update',
          {
            appid:this.createVersion.appId,
            version_id:this.createVersion.versionId,
            status:this.createVersion.status,
            extra_info:this.createVersion.extra_info
          }).then((res)=>{
          this.confirmDialogVisible = false;
          this.$router.push({path:'/home/version'})
        })
      },
      //确定更新版本的操作
      doAdd(){
        this.confirmDialogVisible = true;
      },
      //最终确定更新版本的操作
      confirmAdd(){
       this.updateVersion();
      },
      //重置数据
      reset(){
        this.createVersion.status = this.$route.query.status;
        this.createVersion.extra_info.danger = this.$route.query.danger;
        this.createVersion.extra_info.desc = this.$route.query.desc;
      },
      //通过路由query获取当前版本的数据
      getVersionData(){
        this.createVersion.appId = this.$route.query.appId;
        this.createVersion.versionId = this.$route.query.versionId;
        this.createVersion.status = this.$route.query.status;
        this.createVersion.extra_info.danger = this.$route.query.danger;
        this.createVersion.extra_info.desc = this.$route.query.desc;
        this.createVersion.createTime = this.$route.query.createTime;
      }
    },
    created(){
      this.getVersionData();
    },

  }
</script>

<style scoped>

</style>
