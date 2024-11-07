<template>
  <div id="app">
    <template v-if="isPc() && !$route.meta.is_mobile">
      <router-view />
    </template>
    <div class="appMain" v-if="$route.meta.is_mobile" :class="[isPc() ? 'pcStyle' : '']">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    console.log(this.isPc(),this.$route);
  },
  methods: {
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
<style lang="scss">
#app {
  background: #f5f5f5;
  min-height: 100vh;
  .appMain {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
  }
  .pcStyle {
    width: 375px;
  }
}
body {
  padding: 0;
  margin: 0;
}
.flex {
  display: flex;
}
.flex-a-c {
  align-items: center;
}
.flex-j-s {
  justify-content: space-between;
}
.flex-j-c {
  justify-content: center;
}
.flex-j-e {
  justify-content: flex-end;
}
</style>
