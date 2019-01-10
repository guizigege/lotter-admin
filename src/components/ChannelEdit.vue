<template>
  <div class="channel-edit">
    <div class="confirm-dialog">
      <el-dialog
        :visible.sync="confirmDialogVisible"
        width="24%"
        center>
        <div slot="title" style="text-align: left;padding-left:10px;">提示</div>
        <span style="font-size: 16px;font-weight: bolder;color:#555;">确定更新该渠道吗？</span>
        <span slot="footer" class="dialog-footer">
            <button class="btn confirm-btn" @click="confirmAdd" >确 定</button>
            <button class="btn reset-btn" @click="confirmDialogVisible = false"  style="margin-left: 20px;" >取 消</button>
          </span>
      </el-dialog>
    </div>
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item :to="{ path: '/home/channel' }">渠道号列表</el-breadcrumb-item>
          <el-breadcrumb-item>更新渠道号</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="list-header" >
        <div class="title">更新渠道号</div>
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
                  {{createChannel.appId}}
                </div>
                <div v-if="(scope.$index+1)===2?true:false">
                  <span>{{createChannel.chnId}}</span>
                </div>
                <div v-if="(scope.$index+1)===3?true:false">
                  <el-select v-model="createChannel.status" placeholder="请选择">
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
                  <el-input-number v-model="createChannel.hc" :min="0" :max="100"  :controls="false"></el-input-number>
                </div>
                <div v-if="(scope.$index+1)===5?true:false">
                  <span>{{createChannel.create_time}}</span>
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
          <button class="btn confirm-btn" @click="doAdd">更新</button><button class="btn reset-btn" style="margin-left: 200px;" @click="reset">恢复</button>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'channel-edit',
    data () {
      return {
        confirmDialogVisible:false,
        baseInfoData:[
          {param:"appid",value:"",desc:"应用号"},
          {param:"渠道id",value:"",desc:"渠道号。默认为0"},
          {param:"状态",value:"",desc:"状态：删除，正常。默认为“正常”"},
          {param:"扣量比",value:"",desc:"扣量比, 0-100整数 ,数字越大代表扣量越多。默认为0"},
          {param:"创建时间",value:"",desc:"该渠道号创建的具体时间"},
        ],
        createChannel:{
          appId:"",
          chnId:0,
          hc:0,
          status:1,
          create_time:""
        },
        //下拉选择对象
        select:{
          status:[
            {value:1,label:"正常"},
            {value:0,label:"删除"},
          ]
        }

      }
    },
    methods: {
      // 更新或者创建渠道
      updateChannel(){
        this.$post('/channel/update',
          {
            appid:this.createChannel.appId,
            chn_id:this.createChannel.chnId,
            status:this.createChannel.status,
            hc:this.createChannel.hc,
          }).then((res)=>{
          this.confirmDialogVisible = false;
          this.$router.push({path:'/home/channel'});
        })
      },
      //确定更新渠道号的操作
      doAdd(){
        this.confirmDialogVisible = true;
      },
      //最终确定更新渠道号的操作
      confirmAdd(){
        this.updateChannel()
      },
      //恢复按钮恢复当前渠道号的信息
      reset(){
        this.createChannel.hc = this.$route.query.hc;
        this.createChannel.status = this.$route.query.status;
      },
      //获取当前渠道号信息
      getChannelDate(){
        this.createChannel.appId = this.$route.query.appid;
        this.createChannel.chnId = this.$route.query.chn_id;
        this.createChannel.hc = this.$route.query.hc;
        this.createChannel.status = this.$route.query.status;
        this.createChannel.create_time =this.$route.query.create_time;
      }

    },
    created(){
      this.getChannelDate();
    },

  }
</script>

<style scoped>

</style>
