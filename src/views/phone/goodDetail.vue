<template>
  <div class="goodDetail">
    <van-nav-bar
      :title="courseList.title ? courseList.title : '详情'"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
    />
    <template v-if="this.$route.params.name != 'nba'">
      <div class="imgbox">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item style="width: 375px">
            <img :src="courseList.goodimg" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="detailBox">
        <div class="title">{{ courseList.title }}</div>
        <div class="price_invertory">
          <div class="price">￥{{ courseList.course_price }}</div>
          <div class="inventory">名额：{{ courseList.inventory }}</div>
        </div>
        <div class="btn">
          <van-button
            type="primary"
            @click="signTap"
            round
            v-if="courseList.goodStatus == 2"
            >预约到店</van-button
          >
          <van-button type="primary" round v-if="courseList.goodStatus == 1"
            >联系商家</van-button
          >
        </div>
      </div>
      <div class="contenBox">
        <div class="contenBox_title">商品详情</div>
        <div v-html="courseList.conten" id="contenBox_h" style=""></div>
      </div>
    </template>
    <template v-else>
      <nbaDetail :detailInfo="detailInfo"></nbaDetail>
    </template>
    <van-popup
      v-model="showDateTime"
      :style="{ height: '45%' }"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="showDateTime = false"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>
<script>
import nbaDetail from "./components/nbaDetail.vue";
export default {
  data() {
    return {
      courseList: [],
      showDateTime: false,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      detailInfo:[]
    };
  },
  components: { nbaDetail },
  activated() {
    this.getData();
    document.title = "详情";
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    signTap() {
      this.showDateTime = true;
    },
    getData() {
      if (this.$route.params.name == "nba") {
        $http
          .get(
            "apitest/getArticle",
            { articleId: this.$route.params.id },
            "获取中"
          )
          .then((response) => {
            this.detailInfo = response.data
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        $http
          .post("courseList", { id: this.$route.params.id }, "获取中")
          .then((response) => {
            this.courseList = response.data.list;
            console.log(this.courseList);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.goodDetail{
  padding-top: 2rem;
}
.imgbox {
  width: 375px;
  // border-radius: 0.625rem;
  .my-swipe {
    // width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.contenBox {
  margin-top: 1rem;
  padding: 0.625rem 1rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .contenBox_title {
    font-size: 0.9rem;
    color: #999;
    text-align: center;
  }
}
// #contenBox_h {
//   padding: 0.6rem;
//   margin-bottom: 0.625rem;
//   background: #fff;
//   img {
//     max-width: 100% !important;
//     height: auto !important;
//     display: block;
//     border: 0 !important;
//   }
// }
#contenBox_h {
  padding: 0.6rem;
  margin-bottom: 0.625rem;
  background: #fff;

  img {
    width: 375px !important;
  }
  p {
    width: 100% !important;
  }
}
.detailBox {
  padding: 1rem 1rem;
  box-sizing: border-box;
  background: #fff;
  .btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.62rem;
  }
  .title {
    font-size: 1.2rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .price_invertory {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      font-size: 1rem;
      color: red;
      margin-top: 0.62rem;
    }
    .inventory {
      font-size: 1rem;
      color: #999;
      margin-top: 0.62rem;
    }
  }
}
</style>
