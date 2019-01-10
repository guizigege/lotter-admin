<template>
  <div class="sub-menu">
    <div style="min-width: 200px;height: 1100px;float: left;">

      <el-menu
        default-active="/home/application"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
      >

        <el-submenu index="1">
          <template slot="title">
            <i class="myset iconfont icon-plus-set"></i>
            <span style="font-size:16px;margin-left: 16px;font-weight: bolder;">管理中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/application" @click.native="toApp">
              <i class="iconfont icon-yingyong- iconM"></i>
              <span slot="title">应用管理</span>
            </el-menu-item>
            <el-menu-item index="/home/channel">
              <i class="iconfont icon-wodeyuyue iconM"></i>
              <span slot="title">渠道管理</span>
            </el-menu-item>
            <el-menu-item index="/home/user">
              <i class="iconfont icon-yonghu1 iconM"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/home/product">
              <i class="iconfont icon-shangping iconM"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/home/order">
              <i class="iconfont icon-dingdan iconM"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <div v-if="showHc">
              <el-menu-item index="/home/version">
                <i class="iconfont icon-xinjianbanbenku iconM"></i>
                <span slot="title">版本管理</span>
              </el-menu-item>
            </div>

          </el-menu-item-group>
        </el-submenu>

      </el-menu>


    </div>


  </div>
</template>

<script>
  import bus from '../utils/eventBus.js'
  import {superUser} from "../utils/mixins.js";
  export default {
    name: 'sub-menu',
    mixins:[superUser],
    data () {
      return {

        showMe:false,

      }
    },

    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getApplication(){
        this.$post('/application/get',{page:1}).then((res)=>{
          console.log("应用列表：",res);
        })
      },
      toApp(){
        bus.$emit("app");
      }

    },

  }
</script>

<style>
  .el-menu-item{
    padding-left: 0px!important;
  }
  .sub-menu .el-submenu__icon-arrow{
    margin-top: -4px;
  }
  .el-menu-item{
    color:#fff;
  }
  .el-menu-item:hover{
    color:wheat;
    background-color: #111;
  }
  .el-menu-item.is-active{
    color:wheat;
    background-color: #111;
  }
  .el-menu-item-group__title{
    padding:0;
  }
  .el-submenu__title:hover{
    color:#fff;
    background-color: #111;
  }
  .el-submenu__title{
    color:#fff;
    background-color: #333;
  }
  .el-submenu.is-active.is-opened .el-submenu__title{
    color:wheat;
    background-color: #111;
  }


</style>
<style scoped>
  .el-menu-vertical-demo{
    background: linear-gradient(to top, #111, #444);
  }
  .el-menu-item-group{
    background-color:#333
   }
  .iconM{
    margin-right: 14px;
    margin-left: 20px;
  }
</style>
