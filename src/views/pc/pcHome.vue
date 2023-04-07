<template>
  <div class="pcHome">
    
    <span @click="tapurl">PC首页</span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  activated() {
    this.getData();
  },
  methods: {
    tapurl(){
      console.log('dasdasd')
      this.$router.replace('Login');
    },  
    getData() {
      $http
        .post("api/apitest/firstHome", {}, "获取中")
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
