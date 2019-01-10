//用于注册全局过滤对象
const filters = {
  //状态
  status(value){
    switch(value){
      case 0:return "删除";break;
      case 1:return "正常";break;
      default:return "未知";break;
    }
  },
  // 支付状态
  payStatus(value){
    switch(value){
      case 0: return '没支付';break;
      case 1: return '支付中';break;
      case 2: return '支付成功';break;
      case 3: return '支付失败';break;
      default: return "未知";break;
    }
  },
  // 充入状态
  rechargeStatus(value){
    switch(value){
      case 0: return '没支付';break;
      case 1: return '通知中';break;
      case 2: return '重试通知中';break;
      case 3: return '成功';break;
      case 4: return '失败';break;
      case 5: return '退款成功';break;
      case 6: return '退款失败';break;
      case 7: return '退款中';break;
      case 8: return '退款金额错误';break;
      default: return "未知";break;
    }
  },
  // 扣量
  ih(value){
    switch(value){
      case 0: return '否';break;
      case 1: return '是';break;
      default: return "未知";break;
    }
  },
  //商品类型
  productType(value){
    switch(value){
      case 1:return "充值";break;
      case 2:return "奖励任务";break;
      case 3:return "抽奖";break;
      case 4:return "抽奖次数";break;
      case 10001:return "积分购买";break;
      default:return "未知";break;
    }
  }

};

export default filters;
