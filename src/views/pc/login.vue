<template>
  <div class="loginPage">
    <div class="login-container">
      <div class="login-container-con">
        <div class="login-container-con_left">
          <img src="" alt="" />
          <div class="span">乐善里后台</div>
        </div>
      </div>
      <div class="contenbox">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content">
              <img src="" alt="" />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bg-purple">
              <div class="txt">登录后台</div>
              <el-input placeholder="账号" v-model="user" style="margin-bottom: 15px">
                <i slot="prefix" class="el-input__icon el-icon-user"></i>
              </el-input>
              <el-input placeholder="密码" v-model="password" type="password">
                <i slot="prefix" class="el-input__icon el-icon-more"></i>
              </el-input>
              <div class="btn" @click="loginMethod">登录</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: "",
      password: "",
    };
  },
  activated() {},
  methods: {
    loginMethod() {
      $http
        .post("login", { user_name: this.user, password: this.password }, "获取中")
        .then((response) => {
          if(response.result == 1){
            window.localStorage.setItem('refereesToken',response.data.token);
            this.$router.push("pcHome")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.loginPage {
  width: 1200px;
  margin: 0 auto;
}
.login-container {
  .login-container-con {
    padding-top: 60px;
    padding-bottom: 15.0016px;
    display: flex;
    border-bottom: 1px solid #ebebeb;
  }
  .login-container-con_left {
    display: flex;
    color: rgb(102, 102, 102);
    font-size: 24px;
    font-weight: 900;
    line-height: 36px;
    img {
      width: 36px;
      height: 36px;
      margin-right: 15px;
    }
  }
}
.contenbox {
  padding-top: 60px;
  .grid-content {
    height: 500px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .bg-purple {
    box-sizing: border-box;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 30px 35px 30px 35px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
    background: #fff;
    .btn {
      margin: 0 30px;
      padding: 10px 0;
      border-radius: 10px;
      background: #409eff;
      text-align: center;
      color: #fff;
      margin-top: 25px;
    }
    .txt {
      display: flex;
      justify-content: center;
      font-size: 26px;
      color: #333;
      margin: 0 auto 40px;
      text-align: center;
      font-weight: 700;
    }
  }
}
</style>
