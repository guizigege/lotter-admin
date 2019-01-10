<template>
  <div class="nav-header">
    <div class="nav">
      <!--<div class="title"><span v-if="showHc">超级管理员</span><span v-if="!showHc">后台管理员</span></div>-->
      <div class="title" v-if="!showHc"><img src="../../static/admin.png" alt="" style="width:360px;height:56px;vertical-align: middle"></div>
      <div class="title" v-if="showHc"><img src="../../static/super.png" alt="" style="width:440px;height:65px;vertical-align: middle"></div>
      <div class="esc"><el-button plain @click="esc"><i class="iconfont icon-dianyuan" style="margin-right: 4px;"></i>退出</el-button></div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: 'nav-header',
    data () {
      return {
        showHc:false
      }
    },
    methods:{
      esc(){
        this.$router.push({path:"/login"})
      }
    },
    mounted(){
      if(sessionStorage.getItem("isSuperuser")){
        this.showHc = true;
      }
    },
  }
</script>

<style scoped>
  .nav{
    height:80px;
    width:100%;
    min-width: 1180px;
    background: linear-gradient(to bottom, #102954, #0a6a97);
    position:relative;
  }
  .title{
    width:200px;
    height: 80px;
    display: inline-block;
    line-height: 80px;
    color: #f1f1f1;
    font-size: 32px;
    font-weight: bolder;
    text-shadow: 3px 5px 6px #333;
    letter-spacing: 3px;
    margin-left: 220px;
  }
  .esc{
    display: inline-block;
    height: 80px;
    line-height: 80px;
    min-width: 100px;
    position:absolute;
    right: 170px;
    top: 0px;
  }
  .line{
    width: 100%;
    min-width: 1180px;
    height: 5px;
    background-color: #0a5784;
  }
</style>
