<template>
  <div class="pcHome">
    PC首页
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
