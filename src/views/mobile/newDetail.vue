<template>
  <div class="newDetail">
    <c-title :text="'详情'"></c-title>
    <h4>{{ dataInfo.title }}</h4>
    <div class="time">
      <span class="author" v-if="dataInfo.source">{{ dataInfo.source }}</span>
      <span class="time-created-at">{{
        dataInfo.updated_time ? dataInfo.updated_time : dataInfo.publish_time
      }}</span>
    </div>
    <div class="content" v-for="(item, index) in cnt_attr" :key="index">
      <img
        class="thumb_img"
        :src="item.object.url0"
        alt=""
        v-if="item.itype == 2"
      />
      <div
        v-else
        v-html="item.object.content"
        id="con"
        @click="handleHtml($event)"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataInfo: [],
      cnt_attr: [],
    };
  },
  activated() {
    this.init();
    this.getData();
  },
  methods: {
    init() {
      this.dataInfo = [];
      this.cnt_attr = [];
    },
    async getData() {
      let { data, result, msg } = await $http.get(
        "apitest/getNbaNews",
        { news_id: this.$route.params.id },
        "获取中"
      );
      if (result) {
        this.dataInfo = data;
        let arr = [];
        for (let i = 0; i < this.dataInfo.cnt_attr.length; i++) {
          this.dataInfo.cnt_attr[i].object = JSON.parse(
            this.dataInfo.cnt_attr[i].object
          );
          arr.push(this.dataInfo.cnt_attr[i]);
        }
        this.cnt_attr = arr;
        console.log(this.cnt_attr);
        window.scrollTo(0,0)
      } else {
        this.$toast(msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.newDetail {
  padding: 0 0.625rem;
  background: #fff;
  min-height: 100vh;
  .thumb_img {
    border-radius: 8px;
  }
  .time {
    display: flex;
    align-items: center;
    text-align: left;
    line-height: 1.5625rem;
    height: 1.5625rem;
    margin-bottom: 1.25rem;
    margin-top: 0.8438rem;
  }
  .author {
    color: #3b3b4a;
    font-size: 0.875rem;
    margin-right: 0.625rem;
  }
  .time-created-at {
    color: #aaaab3;
    font-size: 0.8125rem;
  }
  .content {
    width: 100%;
    font-size: 16px;
    text-align: left;
    word-break: break-all;
    line-height: 2.8rem;
    img {
      width: 100%;
    }

    li {
      list-style: inherit;
    }
  }
}
</style>
