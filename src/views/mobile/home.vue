<template>
  <div class="home">
    <div class="list">
      <div class="lis" v-for="(item, index) in goodsinfo" :key="index">
        <img :src="item.goodimg" alt="" />
        <div class="title">{{ item.title }}</div>
        <div class="price">￥{{ item.course_price }}</div>
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
  // margin: 0.63rem 0.625rem;
  // background: #f5f5f5;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  margin: 0.63rem 0.625rem;
  background: #f5f5f5;
  column-count: 2;
  column-gap: 15px;
  .lis {
    // padding: 0 0 0.75rem 0;
    // box-sizing: border-box;
    // background: #fff;
    // flex: 0 0 48%;
    // margin-bottom: 10px;
    // border-radius: 8px;
    // overflow: hidden;
    break-inside: avoid;
    margin-bottom: 15px;
    padding: 0;
    padding-bottom: 10px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
    width: 100%;
    .title {
      font-size: 1.13rem;
      font-weight: 500;
      color: #00001c;
      margin: 0 5px;
      text-align: left;
    }
    .price {
      margin: 0 5px;
      text-align: left;
      color: #f15353;
      font-weight: bold;
      font-size: 1rem;
    }
    img {
      width: 100%;
      height: 0 auto;
      border-radius: 8px;
    }
  }
  .lis:nth-child(2n) {
    margin-right: 0;
  }
}
</style>
