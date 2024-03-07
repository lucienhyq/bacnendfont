<template>
  <div class="newsBox">
    <van-nav-bar title="新闻" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active" @change="tabChange">
      <van-tab
        :name="item.typeId"
        :title="item.typeName"
        v-for="(item, ind) in newType"
        :key="ind"
      ></van-tab>
    </van-tabs>
    <div class="lisBox">
      <div
        class="lis"
        v-for="(item, index) in newslis"
        :key="index"
        @click="toNewsDateil(item)"
      >
        <div class="left">
          <img :src="item.imgList[0]" alt="" />
        </div>
        <div class="right">
          <div class="title">{{ item.title }}</div>
          <div class="desc">{{ item.digest }}</div>
          <div class="time">{{ item.postTime }}</div>
        </div>
      </div>
      <div
        class="txtMore"
        @click="loadMore"
        v-if="newslis && newslis.length > 0"
      >
        加载更多
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newType: [],
      active: 0,
      newslis: [],
      page: 1,
    };
  },
  activated() {
    this.page = 1;
    this.getData();
  },
  methods: {
    toNewsDateil(item) {
      this.$router.push({
        name: "goodDetail_news",
        params: { newsId: item.newsId },
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    tabChange() {
      this.getNewList();
    },
    getData() {
      $http
        .get("rollapi/getNewType", { page: this.page }, "获取中")
        .then((response) => {
          this.newType = response.data;
          // this.active = response.data[1].typeId;
          this.getNewList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNewList() {
      $http
        .get(
          "rollapi/getNewList",
          { typeId: this.active, page: this.page },
          "获取中"
        )
        .then((response) => {
          if (response.code == 101) {
            this.newslis = [];
          } else {
            this.newslis = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadMore() {
      this.page += 1;
      $http
        .get(
          "rollapi/getNewList",
          { typeId: this.active, page: this.page },
          "获取中"
        )
        .then((response) => {
          if (response.code == 101) {
            this.newslis = [];
          } else {
            this.newslis = this.newslis.concat(response.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.lisBox {
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;
  overflow: hidden;
  .lis {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0.5rem 0.5rem;
    box-sizing: border-box;
    margin-bottom: 0.5rem;
    border-radius: 0.3rem;
    .left {
      width: 6.5rem;
      height: 6.5rem;
      border-radius: 0.6rem;
      margin-right: 0.3rem;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.6rem;
      }
    }
    .right {
      flex: 1;
      overflow: hidden;
      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .desc {
        font-size: 13px;
        color: #999;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0.5rem;
      }
      .time {
        font-size: 14px;
        text-align: end;
        margin-top: 1rem;
        color: #666666;
      }
    }
  }
}
.txtMore {
  text-align: center;
  margin: 2rem 0;
  font-size: 0.8rem;
  color: #999;
}
</style>
