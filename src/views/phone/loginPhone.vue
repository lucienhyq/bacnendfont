<template>
  <div class="loginPhone">
    <div class="mobileLogin">
      <img
        src="../../assets/logo.jpeg"
        alt=""
        style="width: 100%; height: auto"
      />
      <van-cell-group>
        <van-field v-model="user" label="账号" placeholder="请输入账号" />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入用户密码"
        />
      </van-cell-group>
      <div class="btn" @click="loginMethod">去登录</div>
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
  methods: {
    loginMethod() {
      $http
        .post(
          "login",
          {
            user_name: this.user,
            password: this.password,
            login_type: "phone",
          },
          "获取中"
        )
        .then((response) => {
          if (response.result == 1) {
            window.localStorage.setItem("refereesToken", response.data.token);
            this.$router.push("indexHome");
          } else {
            this.$message.success(response.msg);
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
.btn {
  width: 9rem;
  height: 3rem;
  background: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  color: #fff;
  margin: 0 auto;
  margin-top: 2rem;
}
</style>
