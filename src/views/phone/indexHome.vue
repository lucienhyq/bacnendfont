<template>
  <div class="indexHome">
    <van-nav-bar title="首页" />
    <div class="optionsBox">
      <div
        class="options"
        v-for="(item, index) in option"
        :key="index"
        @click="toPlug(item.id)"
      >
        <img src="../../assets/logo.jpeg" alt="" />
        <div class="txt">{{ item.name }}</div>
      </div>
    </div>
    <template v-if="courseList.length > 0">
      <div class="title_node">商品:</div>
      <div
        class="list"
        v-for="item in courseList"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <div class="list_img">
          <img :src="item.goodimg" alt="" v-if="item.goodimg" />
        </div>
        <div class="list_r">
          <div class="list_r_t">{{ item.title }}</div>
          <div class="list_price">￥{{ item.course_price }}</div>
          <div class="list_status">
            {{ item.goodStatus == 1 ? "自营" : "预约商品" }}
          </div>
        </div>
      </div>
    </template>
    <template>
      <div
        class="shnx"
        v-for="(item, index) in listJson"
        :key="index"
        @click="tapDetail(item)"
      >
        <img :src="item.poster" alt="" />
        <div class="right">
          <div class="title">{{ item.title }}</div>
          <div class="likeCount">
            <i class="iconfont icon-zan"></i>
            {{ item.likes.length > 0 ? item.likes : 0 }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseList: [],
      listJson: [],
      option: [],
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: "goodDetail", params: { id } });
    },
    onClickLeft() {
      this.$route.go(-1);
    },
    firstHome() {
      $http
        .get("apitest/firstHome", {}, "获取中")
        .then((response) => {
          this.listJson = response.data.json;
          console.log(this.listJson);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tapDetail(item) {
      this.$router.push({
        name: "goodDetail",
        params: { id: item.id, name: "nba" },
      });
    },
    getData() {
      $http
        .get("rollapi/roll_setting", {}, "获取中")
        .then((response) => {
          this.option = response.data;
          console.log(this.option);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toPlug(id) {
      console.log(id);
      if (id == 1) {
        this.$router.push({ name: "imageList" });
      } else if (id == 2) {
        this.$router.push({ name: "news" });
      } else {
        this.$router.push({ name: "goodDetail_news_today" });
      }
    },
  },
  activated() {},
  mounted() {
    this.getData();
    this.firstHome();
  },
};
</script>
<style lang="scss" scoped>
.indexHome {
  .optionsBox {
    display: flex;
    justify-content: space-around;
    .options {
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.8rem;
        margin-bottom: 0.325rem;
      }
      .txt {
        font-size: 0.9rem;
        font-weight: bold;
      }
    }
  }
  .title_node {
    font-size: 1.2rem;
    padding: 1rem 1rem;
    // margin-bottom: 1rem;
    font-weight: 400;
  }
  .shnx {
    margin: 0 1rem;
    margin-top: 1rem;
    border-radius: 0.625rem;
    background: #fff;
    padding: 0.5rem;
    display: flex;
    img {
      width: 8rem;
      height: auto;
      margin-right: 0.325rem;
      border-radius: 0.325rem;
    }
    .right {
      .title {
        font-size: 0.9rem;
      }
      .likeCount {
        margin-top: 0.325rem;
      }
    }
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
}
</style>
