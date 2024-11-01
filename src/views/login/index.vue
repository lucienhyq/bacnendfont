<template>
  <div class="login">
    <header>
      <div class="logo">
        <img src="../../assets/logo.jpeg" alt="" />
        <div class="title">看了想哭管理后台</div>
      </div>
    </header>
    <section>
      <div class="login-container">
        <div class="login-box">
          <div class="cell">
            <div class="cell-item">
              <div class="cell-title">账号:</div>
              <div class="cell-input">
                <el-input
                  v-model="phone"
                  clearable
                  placeholder="请输入账号"
                ></el-input>
              </div>
            </div>
            <div class="cell-item">
              <div class="cell-title">密码:</div>
              <div class="cell-input">
                <el-input
                  v-model="password"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </div>
            </div>
          </div>
          <div class="login-btn">
            <el-button type="primary" round size="medium" @click="loginBtn"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async loginBtn() {
      let { data, result, msg } = await $http.get(
        "login",
        {
          phone: this.phone,
          password: this.password,
        },
        "获取中"
      );
      if (result) {
        localStorage.setItem("refereesToken", data);
      } else {
        this.$toast(msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin: 0 auto;
  margin-top: 10%;
  width: 50%;
  background: #d3dce6;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  section {
    display: flex;
    align-items: center;
    width: 100%;
    .login-container {
      margin: 0 auto;
      margin-top: 1rem;
      .login-btn {
        margin-top: 1rem;
      }
      .login-box {
        display: flex;
        align-items: center;
        flex-direction: column;
        .cell {
          .cell-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            .cell-title {
              margin-right: 0.5rem;
              font-size: 1.5rem;
            }
          }
          .cell-item:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .logo {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  }
}
</style>
