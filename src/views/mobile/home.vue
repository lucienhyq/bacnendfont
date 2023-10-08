<template>
  <div class="home">
    <!-- <van-nav-bar title="标题" :left-arrow="checkRouter()" @click-left="onClickLeft" /> -->
    <div class="list">
      <div class="lis" v-for="(item, index) in goodsinfo" :key="index">
        <img :src="item.goodimg" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsinfo: [],
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    checkRouter() {
      console.log(this.$route);
      if (this.$route.name != "homeM") {
        return true;
      }
      return false;
    },
    onClickLeft() {},
    getData() {
      $http
        .post("courseList", {}, "获取中")
        .then((response) => {
          console.log(response.data);
          this.goodsinfo = response.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  margin: 0.63rem 0.625rem;
  background: #f5f5f5;
  .lis {
    padding: 0.75rem;
    background: #fff;
    img {
      width: 5.63rem;
      height: 5.63rem;
    }
  }
}
</style>
