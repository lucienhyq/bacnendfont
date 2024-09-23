<template>
  <div class="Ctitle">
    <van-nav-bar :title="text" :class="[isPc() ? 'pcStyle' : '']">
      <van-button icon="arrow-left" @click="goto" slot="left"></van-button>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  props: ["text"],
  data() {
    return {};
  },
  methods: {
    goto() {
      this.$router.go(-1);
    },
    isPc() {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.pcStyle {
  width: 375px;
  margin: 0 auto;
  left: 50%;
  margin-left: -187.5px;
}
.van-nav-bar,
::v-deep .van-nav-bar__content {
  height: 40px;
}
::v-deep .van-nav-bar__title {
  color: #666;
  font-weight: 700;
  font-size: 14px;
}
.van-button {
  display: inline-block;
  border: none;
  padding: 0;
  font-size: 16px;
  height: 38px;
}

::v-deep .van-button::before {
  background-color: #fff !important;
}
.van-nav-bar .van-icon {
  color: #656b79;
  font-size: 16px;
}
::v-deep .van-nav-bar__left,
::v-deep .van-nav-bar__right {
  padding: 0;
  height: 40px;
  color: #666;
  font-size: 14px;
}
::v-deep .van-nav-bar__left {
  padding-left: 10px;
}
</style>
