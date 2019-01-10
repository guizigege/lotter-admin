<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  created(){
    // window.addEventListener("beforeunload",()=>{
    //   sessionStorage.setItem("router",this.$route.path);
    // });
    // window.addEventListener("unload",()=>{
    //   this.$router.push({path:sessionStorage.getItem("router")});
    // });
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
    padding:0;
    margin: 0;
  }
  html,body{
    margin: 0;
    padding: 0;
  }
  ul li{
    list-style: none;
  }
  ul.el-menu-vertical-demo.el-menu{
    height:114%;
  }
  .el-menu{
    border-right: 2px solid steelblue;
  }
  .el-menu-item .is-active{
    border-right: 2px solid #0a5784;
  }

  .el-button{
    padding: 10px 16px;
  }
  .el-button.is-plain:active{
    box-shadow: 1px 2px 3px #333 inset;
  }
  .el-button+.el-button{
    margin-left:0;
  }
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .el-pagination{
    height:30px;
  }


  .el-table{
    width: 100%;
    min-width: 1200px;
  }
  .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #ccc;
  }
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #ccc;
  }
  .el-table--border, .el-table--group {
    border: 1px solid #ccc;
  }
  .el-button+.el-button {
    margin-left: 0px;
  }

  /*数据表*/
  .edit-table table { width: 240px; min-height: 25px; line-height: 25px; text-align: center; border-color:#ccc; border-collapse: collapse; }
  .edit-table th{
    width: 120px;
    font: bold 14px  sans-serif;
    color: #444;
    border: 1px solid #ddd;
    letter-spacing: 2px;
    text-align: right;
    padding: 10px 6px;
    background: #f5f5f5  no-repeat;
  }
  .edit-table td {
    border: 1px solid #ddd;
    background: #fff;
    font-size:12px;
    padding: 10px 6px;
    color: #666;
  }
  .edit-table td:hover{
    background-color: #f2f6f9;
    color: #333;
  }
  .edit-table {
    margin-top: 14px;
    margin-left: 20px;
  }

  /*数据表头部*/
  .list-header{
    min-width:1200px;
    height:40px;
    border-bottom: none;
    /*background:linear-gradient(#fff,#e9eaec);*/
    background-color: steelblue;
  }
  .title{
    font-size: 14px;
    /*color: #888;*/
    color:#fff;
    font-weight: bolder;
    line-height: 40px;
    margin-left: 20px;
    float: left;
  }
  .table-add{
    display: inline-block;line-height: 40px;color:#fff;font-size: 14px;padding-right:30px;cursor:pointer;
    font-weight: bolder;
  }
  .table-add:hover{
    text-decoration: underline;
  }
  .table-add:hover .table-add-icon{
    transform: rotateZ(90deg);
  }
  .table-add-icon{
    font-size: 14px;
    transition:all 0.3s;
    margin-right: 4px;
  }
  /*.add-btn{*/
    /*width: 130px;*/
    /*height: 36px;*/
    /*border: none;*/
    /*background:steelblue;*/
    /*color: #fff;*/
    /*outline: none;*/
    /*margin-top:2px;*/
    /*margin-right: 20px;*/
    /*padding:0;*/
  /*}*/
  /*.add-btn:hover,.add-btn:focus{*/
    /*background: #0a6a97;*/
    /*filter:alpha(opacity:90);*/
    /*opacity:0.9;*/
    /*color: #fff;*/
  /*}*/
  .page{
    width: 100%;
    height: 30px;
    padding-left: 30%;
    margin-top: 30px;
  }
  .el-form-item__content::after, .el-form-item__content::before{
    display: inline-block;
  }


  /*面包屑高度*/
  .breadcrumb{
    min-width: 1200px;
    height: 50px;
    line-height: 50px;
    padding: 10px 0;

  }
  .el-breadcrumb{
    min-width: 1200px;
    height:30px;
    line-height: 30px;
    padding-left: 10px;
    background-color: slategray;
    font-weight: bold;
    border-radius: 3px;
    border:1px solid #666;
    box-sizing: border-box;
  }
  .el-breadcrumb__inner{
    color:whitesmoke;
  }
  .el-breadcrumb__separator{
    color:whitesmoke;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    color:whitesmoke;
    text-shadow: 2px 2px 2px #000;
  }
  .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
    color: steelblue;
  }
  /*数字输入框内容左对齐*/
  /*.el-input-number .el-input__inner{*/
    /*text-align: left;*/
  /*}*/

  /*表数据条件选项*/
  .select{
    min-width:1200px;
    border: 1px solid #ddd;
    border-top:1px solid #ebeef5;
    border-bottom: none;
  }
  .app-type{
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    display: inline-block;
  }
  .search{
    min-width:1200px;
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    border: 1px solid #ddd;
    border-bottom: none;
  }
  .research-btn{
    display: inline-block;
    height: 80px;
    line-height: 80px;
    min-width: 100px;
  }

  /*弹出框头部样式*/
  .confirm-dialog .el-dialog.el-dialog--center{
    margin-top: 30vh!important;
  }
  .confirm-dialog .el-dialog__header{
    padding:12px 10px;
    background-color: steelblue;
    color:#fff;
  }
  .confirm-dialog .el-dialog--center .el-dialog__body{
    border-bottom:1px solid #eee;
    text-align: center;
  }
  .confirm-dialog .el-dialog__close{
    display: inline-block;
    padding-top:-10px;
    vertical-align: top;
    color:#fff;
    font-weight: bolder;
  }





  .infoTable>.el-table td, .el-table th{
    padding:6px 0;
  }
  .infoTable .el-input__inner{
    height:30px;
    line-height: 30px;
    text-align: center;
  }
  .infoTable .el-input__icon{
    line-height: 0;
  }
  .infoTable .infoTable-title{
    width:100%;height:40px;line-height:40px;background-color: steelblue;color:#fff;padding-left:20px;box-sizing:border-box;
  }
  .infoTable .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: steelblue;
    border-color: steelblue;
  }
  .infoTable .el-checkbox__inner:hover{
    border-color: steelblue;
  }
  .infoTable .el-checkbox__input.is-checked+.el-checkbox__label{
    color: steelblue;
  }


  .infoTable2>.el-table td, .el-table th{
    padding:12px 0;
  }
  .infoTable2 .el-input__inner{
    height:40px;
    line-height: 40px;
    text-align: center;
  }
  .infoTable2 .el-input__icon{
    line-height: 0;
  }
  .infoTable2 .infoTable-title{
    width:100%;height:40px;line-height:40px;background-color: steelblue;color:#fff;padding-left:20px;box-sizing:border-box;
  }
  .infoTable2 .el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: steelblue;
    border-color: steelblue;
  }
  .infoTable2 .el-checkbox__inner:hover{
    border-color: steelblue;
  }
  .infoTable2 .el-checkbox__input.is-checked+.el-checkbox__label{
    color: steelblue;
  }
  /*按钮基础样式*/
  .btn{
    width: 80px;
    height: 36px;
    border-radius:4px;
    margin-top: 2px;
    margin-right: 20px;
    outline: none;
    box-shadow: 1px 1px 1px #333;
  }

  .el-button--default:focus,.el-button--default:hover{
    color: steelblue;
    border-color: steelblue;
    background-color: #ecf5ff;
  }
  .el-button--default:active{
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0
  }
  .btn:active{
    box-shadow: 1px 2px 3px #333 inset;
  }
  /*添加按钮*/
  .normal-btn {
    border: 1px solid #0549ab;
    background-color: #fff;
    color: #0549ab;
  }
  .normal-btn:hover {
    border: 1px solid #dcdfe6;
    background: #0549ab;
    color: #fff;
  }

  .confirm-btn {
    border: 1px solid #0a6a97;
    background-color: #fff;
    color: #0a6a97;
  }
  .confirm-btn:hover {
    border: 1px solid #dcdfe6;
    background: #0a6a97;
    color: #fff;
  }

  /*重置按钮*/
  .reset-btn{
    border: 1px solid #333;
    background-color: #fff;
    color: #333;
  }
  .reset-btn:hover {
    border: 1px solid #dcdfe6;
    background: #555;
    color: #fff;
  }


  .el-pager li.active{
    color:steelblue;
  }
  .el-pager li:hover{
    color:steelblue;
  }


  .el-input.is-active .el-input__inner, .el-input__inner:focus{
    border-color: steelblue;
  }
  .el-select .el-input__inner:focus{
    border-color: steelblue;
  }
  .el-select .el-input.is-focus .el-input__inner{
    border-color: steelblue;
  }
  .el-select-dropdown__item.selected{
    color:steelblue;
  }
  .el-date-table td.today span{
    color:steelblue;
  }
  .el-date-table td span:hover{
    color:steelblue;
  }
  .el-date-table td.current:not(.disabled) span{
    background-color: steelblue;
  }
  .el-button--text{
    color:steelblue;
  }
  .el-loading-spinner i{
    color:steelblue;
  }
  .el-loading-spinner .el-loading-text{
    color:steelblue;
  }
  #app {

}
</style>
