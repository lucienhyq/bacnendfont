<template>
  <div class="indexHome">
    <!-- <van-nav-bar title="首页" left-arrow @click-left="onClickLeft" /> -->
    <div class="title_node">商品:</div>
    <div class="list" v-for="item in courseList" :key="item.id" @click="toDetail(item.id)">
      <div class="list_img">
        <img :src="item.goodimg" alt="" v-if="item.goodimg" />
      </div>
      <div class="list_r">
        <div class="list_r_t">{{ item.title }}</div>
        <div class="list_price">￥{{ item.course_price }}</div>
        <div class="list_status">{{ item.goodStatus == 1 ? "自营" : "预约商品" }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseList: [],
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: 'goodDetail', params: { id } });
    },
    onClickLeft() {
      this.$route.go(-1);
    },
    getData() {
      $http
        .post("courseList", {}, "获取中")
        .then((response) => {
          this.courseList = response.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  activated() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.indexHome {
  background: #fff;
  padding-bottom: 1rem;
}
.title_node {
  font-size: 1.2rem;
  padding: 1rem 1rem;
  // margin-bottom: 1rem;
  font-weight: 400;
}
.list {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 1rem;
  .list_img {
    flex-shrink: 0;
    width: 8rem;
    height: 6rem;
    border-radius: 0.625rem;
    margin-right: 0.5rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.625rem;
    }
  }
  .list_r {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .list_r_t {
      font-size: 1.2rem;
      font-weight: 500;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .list_price {
      font-size: 1rem;
      color: red;
    }
    .list_status {
      font-size: 0.85rem;
      color: #999;
    }
  }
}
</style>
