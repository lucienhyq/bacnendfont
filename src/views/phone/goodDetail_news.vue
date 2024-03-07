<template>
  <div class="goodDetail_news">
    <van-nav-bar
      :title="this.$route.query.newsId ? '新闻详情' : '历史上的今天'"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
    />
    <div class="list" v-if="info && info.length > 0">
      <div class="lis" v-for="(item, index) in info" :key="index">
        <div class="text" v-if="item.type == 'text'">{{ item.content }}</div>
        <div class="imgC" v-if="item.type == 'img'">
          <img :src="item.imageUrl" alt="" />
        </div>
      </div>
    </div>
    <div class="list">
      <van-swipe class="my-swipe" indicator-color="white" height="600">
        <van-swipe-item v-for="(item, index) in info" :key="index">
          <div class="lis allMore">
            <div class="date">
              {{ item.year }}年{{ item.month }}月{{ item.day }}日
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="contenBox">{{ item.details }}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
    };
  },
  activated() {
    this.info = [];
    if (this.$route.query.newsId) {
      this.getData();
    } else {
      this.getToday();
    }
  },
  methods: {
    getToday() {
      $http
        .get("rollapi/getToday", {}, "获取中")
        .then((response) => {
          console.log(response.data.data);
          this.info = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      $http
        .get(
          "rollapi/getNewDetails",
          { newsId: this.$route.params.newsId },
          "获取中"
        )
        .then((response) => {
          console.log(response.data.data);
          if (response.data?.data) {
            this.info = response.data.data.items;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.goodDetail_news {
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  padding-top: 3rem;
  background: #fff;
  box-sizing: border-box;
}
.text {
  text-align: left;
  margin: 0.5rem 0;
}
.imgC {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.date {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0;
}
.title {
  text-align: left;
  font-weight: 500;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}
.contenBox {
  font-size: 1rem;
  color: #999;
}
.allMore{
  overflow-y: scroll;
  height: 100%;
}
</style>
