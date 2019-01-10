<template>
  <div class="product-edit">
    <div style="width: 90%">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item :to="{ path: '/home/product' }">商品列表</el-breadcrumb-item>
          <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
          <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
      </div>


      <div class="list-header" >
        <div class="title">编辑商品</div>
      </div>
      <div style="padding:20px;border:1px solid #eee;box-sizing: border-box;min-width:1200px">
        <div class="infoTable">
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
              width="200">
              <template slot-scope="scope" >
                <div v-if="(scope.$index+1)===1?true:false">
                  <span>{{createProduct.product_sale_id}}</span>
                </div>
                <div v-if="(scope.$index+1)===2?true:false" >
                  <span>{{createProduct.appid}}</span>
                </div>
                <div v-if="(scope.$index+1)===3?true:false">
                  <el-select v-model="createProduct.type" placeholder="请选择">
                    <el-option
                      v-for="item in select.type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div v-if="(scope.$index+1)===4?true:false">
                  <el-input-number v-model="createProduct.money" :precision="2" :max="10000" :min="0" :controls="false"></el-input-number>
                </div>
                <div v-if="(scope.$index+1)===5?true:false">
                  <el-select v-model="createProduct.status" placeholder="请选择">
                    <el-option
                      v-for="item in select.status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div v-if="(scope.$index+1)===6?true:false">
                  <el-date-picker
                    v-model="createProduct.sale_start_time"
                    type="datetime"
                    placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="formatStartTime" style="width:180px;">
                  </el-date-picker>
                </div>
                <div v-if="(scope.$index+1)===7?true:false">
                  <el-date-picker
                    v-model="createProduct.sale_end_time"
                    type="datetime"
                    placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="formatEndTime" style="width:180px;">
                  </el-date-picker>
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
        <div class="infoTable">
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
              width="200">
              <template slot-scope="scope" >
                <div v-if="(scope.$index+1)===1?true:false">
                  <el-input-number v-model="createProduct.extra_info.reward_amount" :precision="2" :max="10000" :min="0" :controls="false"></el-input-number>
                </div>
                <div v-if="(scope.$index+1)===2?true:false">
                  <el-input v-model="createProduct.extra_info.name"></el-input>
                </div>
                <div v-if="(scope.$index+1)===3?true:false">
                  <el-input v-model="createProduct.extra_info.desc"></el-input>
                </div>
                <div v-if="(scope.$index+1)===4?true:false">
                  <el-input v-model="createProduct.extra_info.logo_url"></el-input>
                </div>
                <div v-if="(scope.$index+1)===5?true:false">
                  <el-input v-model="createProduct.extra_info.qrcode_url"></el-input>
                </div>
                <div v-if="(scope.$index+1)===6?true:false">
                  <el-input v-model="createProduct.extra_info.wx_mp_appid"></el-input>
                </div>
                <div v-if="(scope.$index+1)===7?true:false">
                  <el-input v-model="createProduct.extra_info.wx_mp_path"></el-input>
                </div>
                <div v-if="(scope.$index+1)===8?true:false">
                  <el-checkbox-group v-model="createProduct.extra_info.chain_reward">
                    <el-checkbox name="type" :true-label=1 :false-label=0 @change="chain">选中</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div v-if="(scope.$index+1)===9?true:false">
                  <el-input-number v-model="createProduct.extra_info.chain_reward_height" :max="10" :min="0" :controls="false" :disabled="!createProduct.extra_info.chain_reward" ></el-input-number>
                </div>
                <div v-if="(scope.$index+1)===10?true:false">
                  <el-input-number v-for="(index,item) in createProduct.extra_info.chain_reward_height" :key="index"  v-model="createProduct.extra_info.chain_reward_amount[index-1]" :precision="2" :max="10000" :min="0" :controls="false" :disabled="!createProduct.extra_info.chain_reward"></el-input-number>
                </div>
                <div v-if="(scope.$index+1)===11?true:false">
                  <el-checkbox-group v-model="createProduct.extra_info.chain_reward_inv_index">
                    <el-checkbox name="type" class="email-task" :true-label=1 :false-label=0>选中</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div v-if="(scope.$index+1)===12?true:false">
                  <el-input-number v-model="createProduct.extra_info.chain_reward_inv_pr" :precision="0" :max="10000" :min="0" :controls="false"></el-input-number>
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
          <button class="btn confirm-btn" @click="doEdit">修改</button><button class="btn reset-btn" style="margin-left: 200px;" @click="reset">重置</button>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    name: 'product-edit',
    data () {
      return {
        extraInfoDialogVisible:true,
        extraInfoData:[
          {param:"额外金额",value:"",desc:"商品购买时额外获得的basemoney金额"},
          {param:"商品名字",value:"",desc:"商品名称"},
          {param:"描述",value:"",desc:"商品信息的详细描述"},
          {param:"LOGO",value:"",desc:"商品logo地址"},
          {param:"二维码",value:"",desc:"商品二维码地址"},
          {param:"小程序id",value:"",desc:"商品关联的小程序appid"},
          {param:"小程序路径",value:"",desc:"商品关联的小程序路径"},//7
          {param:"链式奖励",value:"",desc:"商品是否有链式奖励，默认不选中"},
          {param:"奖励层数",value:"",desc:"商品链式奖励层数，“链式奖励”选中后生效"},
          {param:"奖励金额",value:"",desc:"商品链式奖励各层的奖励金额，“链式奖励”选中后生效"},
          {param:"隐藏起始索引",value:"",desc:"商品链式奖励是否隐藏起始索引"},
          {param:"奖励隐藏几率",value:"",desc:"商品链式奖励隐藏几率 1000代表100.0%"},
        ],
        baseInfoData:[
          {param:"id",value:"",desc:"商品id，禁用：处于编辑状态中"},
          {param:"appid",value:"",desc:"应用号appid，禁用：处于编辑状态中"},
          {param:"类型",value:"",desc:"商品类型：充值商品，奖励任务商品，抽奖商品，抽奖次数商品，积分购买商品"},
          {param:"价格",value:"",desc:"商品价格"},
          {param:"状态",value:"",desc:"状态：正常，删除"},
          {param:"起始时间",value:"",desc:"商品销售起始时间"},
          {param:"结束时间",value:"",desc:"商品销售结束时间"},
        ],
        select:{
          appid:[],
          type:[
            {value:1,label:"充值"},
            {value:2,label:"奖励任务"},
            {value:3,label:"抽奖"},
            {value:4,label:"抽奖次数"},
            {value:10001,label:"积分购买"},
          ],
          status:[
            {value:1,label:"正常"},
            {value:0,label:"删除"},
          ]
        },
        createProduct:{
          appid:"",
          product_sale_id:0,
          type:"",
          money:0.00,
          status:1,
          sale_start_time:"",
          sale_end_time:"",
          extra_info:{
            reward_amount:0,
            name:"",
            desc:"",
            logo_url:"",
            qrcode_url:"",
            wx_mp_appid:"",
            wx_mp_path:"",
            chain_reward:0,
            chain_reward_height:0,
            chain_reward_amount:[],
            chain_reward_inv_index:0,
            chain_reward_inv_pr:"",
          }
        },
      }
    },
    methods: {
      //根据id获取指定商品
      getProduct(){
        this.$post('/trade/product_sale/get',{page:1,product_sale_id:parseInt(this.$route.params.product_id),appid_list:[this.$route.params.app_id]}).then((res)=>{
          let product = res.data_list[0];
          this.createProduct.appid = product.appid;
          this.createProduct.product_sale_id = product.product_sale_id;
          this.createProduct.type = product.type;
          this.createProduct.money = product.money;
          this.createProduct.status= product.status;
          this.createProduct.sale_start_time = product.sale_start_time;
          this.createProduct.sale_end_time = product.sale_end_time;
          this.createProduct.extra_info = product.extra_info;
        })
      },
      chain(value){

      },
      //更新商品或者创建商品
      updateProduct(){
        this.$post('/trade/product_sale/update',
          {
            appid:this.createProduct.appid,
            product_sale_id:this.createProduct.product_sale_id,
            type:this.createProduct.type,
            money:this.createProduct.money,
            status:this.createProduct.status,
            sale_start_time:this.createProduct.sale_start_time,
            sale_end_time:this.createProduct.sale_end_time,
            extra_info:this.createProduct.extra_info
          }).then((res)=>{
          this.$router.push({path:"/home/product"})
        })
      },
      //确定创建商品的操作
      doEdit(){
        this.updateProduct();
      },
      reset(){
        this.getProduct();
      },
      formatStartTime(value){
        this.createProduct.sale_start_time = value;
      },
      formatEndTime(value){
        this.createProduct.sale_end_time = value;
      }
    },
    created(){
      this.getProduct();
    }
  }
</script>


<style scoped>


</style>
