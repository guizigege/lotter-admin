import axios from 'axios'
let base = '/api';
// let base = 'http://web.gzguru.com';
// let base = (process.env.NODE_ENV === 'development' ? '/api' :'http://web.gzguru.com');
axios.defaults.withCredentials=true;
axios.defaults.timeout = 5000;
axios.interceptors.request.use((config) => {
  return config
}, (err) => {
  alert('请求超时');
  return Promise.resolve(err)
});


axios.interceptors.response.use((config) => {
  // 数据统一校验处理
  config.headers.Accept = 'application/json';
  return config
}, (err) => {
  // 数据异常统一处理
  if (err.response.status === 504 || err.response.status === 404) {
    console.log("错误404||504");
  } else if (err.response.status === 403) {
    alert('权限不足,请联系管理员')
  } else {
    alert('未知错误')
  }
  return Promise.resolve(err)
});


export function postRequest(url, params) {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
let check = true;
export function post(url,params){
  return new Promise((resolve,reject) => {
    axios({
      method: 'post',
      url: `${base}${url}`,
      data: params,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      switch(response.data.result){
        case 1:
          resolve(response.data);break;
        case 500001:
        case 500002:
          if(check){
            check = false;
            setTimeout(()=>{
              check = true;
            },500);
            alert("登入态失效，请重新登入！");
            this.$router.push({path:"/login"});
          }
          break;
        default:
          if(check){
          check = false;
          setTimeout(()=>{
            check = true;
          },500);
          alert("错误码："+response.data.result);
        }
          break;
      }
      // if(response.data.result===1){
      //   resolve(response.data);
      // }else if(response.data.result===500001){
      //   this.$router.push({path:"/login"})
      // }

    }).then(err => {
      reject(err)
    })
  })
}
export function put(url, params) {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function remove(url) {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}
export function get(url) {
  return axios({
    method: 'get',
    url: `${base}${url}`
  })
}
