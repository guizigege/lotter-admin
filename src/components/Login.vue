<template>
  <div class="login">
    <div class="bg">
      <div class="box">
        <div class="box-form">
          <div class="form-title"><span>Administrator</span></div>
          <div class="form-item" style="position:relative"><i class="iconfont icon-icon" style="color:#666;position:absolute;left:58px;top:12px"></i><input type="text" id="user" ref="user" v-model="username" placeholder="账号" style="padding-left:28px;"/></div>
          <div class="form-item" style="position:relative"><i class="iconfont icon-mima" style="color:#666;position:absolute;left:58px;top:12px"></i><input type="password" id="pwd" ref="pwd" v-model="password" placeholder="密码" style="padding-left:30px;"/></div>
          <div class="form-item"><button @click="toIndex" @keyup.enter="toIndex" class="login-btn">登 入</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    name: 'login',
    data () {
      return {
        username:"",
        password:""
      }
    },
    methods:{
      toIndex(){
        if (this.username == "") {
          alert("请输入正确的用户名");
          this.$refs.user.focus();
          return;
        } else if (this.password == "") {
          alert("请输入正确的密码");
          this.$refs.pwd.focus();
          return;
        }
        this.$post('/auth/login',{
            username: this.username,
            password: md5(this.password)
        }).then((res)=> {
        if (res.result === 1) {
          this.$router.push("/home")
        } else {
          alert("用户名或密码错误,请重新输入");
          this.$refs.user.focus();
          this.username = "";
          this.password = "";
        }
      })
      }
    }
  }
</script>
<style>
  .btn>.el-button{
    font-weight: 600;
    box-shadow:2px 2px 3px #333;
  }
  .btn>.el-button:active{
    box-shadow:1px 1px 1px #333 inset;
  }
</style>

<style scoped>

  .bg{
    width:100%;
    height:100%;
    min-width: 100vh;
    min-height: 100vh;
    background-image:url(../../static/bg1.jpg);
    background-size: cover;

  }
  .box{
    width: 100vh;
    height: 100vh;
    margin:  auto;
    position: relative;
  }
  .box-form{
    width: 500px;
    background-color: rgba(60,60,60,0.4);
    position: absolute;
    top: 20vh;
    left: -250px;
    margin-left: 50%;
    padding: 50px 70px;
    box-sizing: border-box;
    box-shadow: 2px 3px 22px #222;
    transition: all 0.5s;
  }
  .box-form:hover{

    box-shadow: 10px 10px 22px #111;
    border-radius: 30px;

  }
  .box-form .form-title{
    width:100%;
  }
  .form-title>span{
    height:50px;
    color: #fff;
    text-align: center;
    transition: font-size 0.3s ease-in,color 0.2s ease-in;
    display: block;
    font-size:40px;
    font-weight: bold;
    letter-spacing: 2px;
    text-shadow: 3px 3px 6px #111;
  }
  .form-title>span:hover{
    color:#0549ab;
    font-size: 46px;
    font-weight: bold;
    text-shadow: 3px 3px 6px #fff;
  }
  .box-form label{
    color: #fff;
    font-weight: bold;
    margin-right: 16px;
  }
  .box-form input{

    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 260px;

  }
  .box-form input:focus,.box-form input:hover{
    border-color:#409eff;
  }
  .form-item{
    margin-top: 30px;
    padding: 0 18px;
    text-align: center;
  }
  .login-btn{
    width: 80px;
    height: 36px;
    color:#eee;
    font-size: 16px;

    border-radius:4px;
    margin-top: 2px;
    margin-right: 20px;
    box-shadow:1px 1px 1px #000;
    background-color: rgba(60,60,60,0.2);
    border:none;outline:none;
    transition: all 0.3s;
  }
  .login-btn:hover{
    color:#fff;
    box-shadow:3px 3px 4px #000;
    background-color: rgba(60,60,60,0.4);
    text-shadow: 4px 4px 6px #111;
  }
  .login-btn:active{
    box-shadow:3px 3px 4px #000 inset;
    text-shadow: 4px 4px 6px #111;
  }
</style>
