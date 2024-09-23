<template>
  <div class="home">
    <c-title :text="'乐善资讯'"></c-title>
    <div class="box-wrap">最新NBA资讯</div>
    <div class="list-wrap" v-if="info.length > 0">
      <div
        class="new-warp"
        v-for="(item, index) in info"
        :key="index"
        @click="toNbaLink(item)"
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
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    async toNbaLink(item) {
      // console.log(item);
      // // https://mchina.nba.cn/article/2409231034375301?column=&exposure_page=&exposure_module=
      // window.location.href = `https://mchina.nba.cn/article/${item.news_id}?column=&exposure_page=&exposure_module=`
      let { data, result, msg } = await $http.get(
        "apitest/getNbaNews",
        {
          news_id: item.news_id,
        },
        "获取中"
      );
      if (result) {
        console.log(data);
      } else {
        this.$toast(msg);
      }
    },
    async getData() {
      let { data, result, msg } = await $http.get(
        "apitest/firstHome",
        {},
        "获取中"
      );
      if (result) {
        this.info = data;
        console.log(this.info);
      } else {
        this.$toast(msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
    aspect-ratio: 4 / 4;
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
