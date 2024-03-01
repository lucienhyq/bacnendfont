<template>
  <div class="imageList">
    <van-nav-bar title="美图欣赏" fixed left-arrow @click-left="onClickLeft" />
    <div class="listBox">
      <div class="lis" v-for="(item, index) in list" :key="index" @click="tapImg(item)">
        <img :src="item" alt="" />
      </div>
      <div @click="getMoreData" class="txt">加载更多</div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      list: [],
      page: 1,
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    tapImg(url){
      ImagePreview({ images: url, closeable: true });
    },  
    onClickLeft() {
      this.$router.go(-1);
    },
    getMoreData() {
      this.page += 1;
      $http
        .get("rollapi/rollImgList", { page: this.page }, "获取中")
        .then((response) => {
          this.list = this.list.concat(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      $http
        .get("rollapi/rollImgList", { page: this.page }, "获取中")
        .then((response) => {
          this.list = response.data;
          console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.listBox {
  padding: 1rem 0.625rem;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  .txt {
    font-size: 0.9rem;
    text-align: center;
    color: #999;
    margin-top: 1rem 0;
  }
  .lis {
    flex: 1;
    border-radius: 0.325rem;
    margin-bottom: 0.5rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.325rem;
    }
  }
}
</style>
