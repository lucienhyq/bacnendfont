<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {},
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
