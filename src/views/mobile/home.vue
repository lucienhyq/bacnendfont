<template>
  <div class="home">
    <c-title :text="'乐善资讯'"></c-title>
    <div class="box-wrap">最新NBA资讯</div>
    <div class="bannerBox">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in navList"
          :key="index"
          @click="toDetail(item)"
        >
          <div class="swipeItemBox">
            <img :src="item.thumb" alt="" />
            <div class="banner-text">
              <div class="title">{{ item.title }}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="list-wrap" v-if="info.length > 0">
      <div
        class="new-warp"
        v-for="(item, index) in info"
        :key="index"
        @click="toDetail(item)"
      >
        <!-- <a href=""></a> -->
        <div class="img-box">
          <img :src="item.poster" alt="" />
        </div>
        <div class="title-box">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      navList: [],
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    toDetail(item) {
      console.log(item);
      this.$router.push({ path: `/newDetail/${item.news_id}` });
    },
    async getData() {
      let { data, result, msg } = await $http.get(
        "apitest/firstHome",
        {},
        "获取中"
      );
      if (result) {
        this.info = data.list;
        this.navList = data.navList;
      } else {
        this.$toast(msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bannerBox {
  height: 12rem;
  .my-swipe {
    width: 100%;
    height: 100%;
    .swipeItemBox {
      height: 100%;
      position: relative;
      .banner-text {
        position: absolute;
        bottom: 0;
        left: 10px;
        color: #f6f6f6;
        font-size: 14px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.box-wrap {
  margin: 0.7rem;
  color: #999999;
}
.list-wrap {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
  background: #fff;
}
.new-warp {
  display: flex;
  flex-direction: column;
  .title-box {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-top: 0.3rem;
  }
  .img-box {
    width: 100%;
    border-radius: 10px;
    background-color: #f6f6f6;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
}
</style>
