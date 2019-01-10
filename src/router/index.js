import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Application from '@/components/Application'
import ApplicationAdd from '@/components/ApplicationAdd'
import ApplicationEdit from '@/components/ApplicationEdit'
import Channel from '@/components/Channel'
import ChannelAdd from '@/components/ChannelAdd'
import ChannelEdit from '@/components/ChannelEdit'
import ChannelDetail from '@/components/ChannelDetail'
import User from '@/components/User'
import Order from '@/components/Order'
import Product from '@/components/Product'
import ProductAdd from '@/components/ProductAdd'
import ProductEdit from '@/components/ProductEdit'
import Version from '@/components/Version'
import VersionAdd from '@/components/VersionAdd'
import VersionEdit from '@/components/VersionEdit'
import {get} from '@/utils/http'
//import {delCookie,getCookie} from '@/utils/cookie'
Vue.use(Router);
//import axios from 'axios'
const router = new Router({
  routes: [
    {path:"*",redirect:"/login"},
    {path:"/login",component:Login},
    {path:"/home",component:Home,
      meta:{
        title:'首页',
        requireAuth: true
      },
      children:[

        {path:"/home/application",component:Application,meta:{
            title:'应用列表页面',
            requireAuth: true
          }},
        {path:"/home/application/add",component:ApplicationAdd,meta:{
            title:'添加应用列表页面',
            requireAuth: true
          }},
        {path:"/home/application/edit/:appId",component:ApplicationEdit,meta:{
            title:'编辑对应应用页面',
            requireAuth: true
          }},
        {path:"/home/channel",component:Channel,meta:{
            title:'渠道号信息',
            requireAuth: true
          }},

        {path:"/home/channel/add",component:ChannelAdd,meta:{
            title:'添加渠道号',
            requireAuth: true
          }},
        {path:"/home/channel/edit/:channel_id",component:ChannelEdit,meta:{
            title:'编辑对应渠道号',
            requireAuth: true
          }},
        {path:"/home/channel/detail/:channel_id",component:ChannelDetail,meta:{
            title:'编辑对应渠道号',
            requireAuth: true
          }},
        {path:"/home/user",component:User,meta:{
            title:'普通用户',
            requireAuth: true
          }},
        {path:"/home/order",component:Order,meta:{
            title:'订单详细',
            requireAuth: true
          }},
        {path:"/home/product",component:Product,meta:{
            title:'商品详细',
            requireAuth: true
          }},
        {path:"/home/product/add",component:ProductAdd,meta:{
            title:'添加商品',
            requireAuth: true
          }},
        {path:"/home/product/edit/:app_id/:product_id",component:ProductEdit,meta:{
            title:'编辑商品',
            requireAuth: true
          }},
        {path:"/home/version",component:Version,meta:{
            title:'版本管理',
            requireAuth: true
          }},
        {path:"/home/version/add",component:VersionAdd,meta:{
            title:'版本添加页面',
            requireAuth: true
          }},
        {path:"/home/version/edit/:version_id",component:VersionEdit,meta:{
            title:'版本添加页面',
            requireAuth: true
          }},


      ]
    }
  ]
});
//这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth) {
//     get('').then(res => {
//       if(res.data.result == 1) {
//         next();
//       } else {
//         console.log("没有登入太，回到登入页面");
//         //this.$alert('这是一段内容', '标题名称', {
//         //  confirmButtonText: '确定',
//         //  callback: action => {
//         //    this.$message({
//         //      type: 'info',
//         //      message: `action: ${ action }`
//         //    });
//         //  }
//         //});
//
//
//         next({
//           path: '/login'
//         });
//       }
//     });
//     //axios({
//     //  url: '/api',
//     //  method: 'GET',
//     //}).then(res => {
//     //  if(res.data.result == 1) {
//     //    next();
//     //  } else {
//     //    console.log("没有登入太，回到登入页面")
//     //    next({
//     //      path: '/login'
//     //    });
//     //  }
//     //});
//   } else {
//     next();
//   }
// });
export default router
