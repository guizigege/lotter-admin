exports.install = function (Vue, options) {
  //获取应用id列表
  Vue.prototype.getAppIdList = function (){
    let appidList = [];
    this.$post('/application/get',{page:1}).then((res)=>{
      let list = res.data_list;
      let len = list.length;
      for(let i=0;i<len;i++){
        let option = {};
        option.value = list[i].appid;
        appidList.push(option);
      }
    });
    console.log("appid_list:",appidList);
    return appidList;
  };
  //获取渠道id列表
  Vue.prototype.getChannelIdList = function (appid){
    let chn_idList = [];
    this.$post('/channel/get',{page:1,appid:appid}).then((res)=>{
      let list = res.data_list;
      let len = list.length;
      for(let i=0;i<len;i++){
        let option = {};
        option.value = list[i].chn_id;
        chn_idList.push(option);
      }
    });
    chn_idList.unshift({value:null,label:"--------"});
    return chn_idList;
  };
  //获取产品id列表
  Vue.prototype.getProductIdList = function(appid_list){
    let product_idList = [];
    this.$post('/trade/product_sale/get',{page:1,appid_list:appid_list}).then((res)=>{
      let list = res.data_list;
      let len = list.length;
      for(let i=0;i<len;i++){
        let option = {};
        option.value = list[i].product_sale_id;
        product_idList.push(option);
      }
    });
    product_idList.unshift({value:null,label:"--------"});
    console.log("product_idList:",product_idList);
    return product_idList;
  };






};
