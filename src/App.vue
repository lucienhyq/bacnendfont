<template>
  <div :class="[!$route.meta.isPC ? 'pcStyle' : '']" id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // this.getData();
  },
  methods: {
    // getData() {
    //   $http
    //     .get("apitest/getArticle", {}, "获取中")
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  padding: 0;
  margin: 0;
}
</style>
