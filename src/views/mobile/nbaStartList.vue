<template>
  <div class="startList">
    <c-title :text="'球星列表'"></c-title>
    <van-sticky>
      <van-search
        v-model="keyWord"
        show-action
        placeholder="查找球星"
        @search="onSearch"
        shape="round"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <div class="listBox">
      <div class="listItem" v-for="item in info" :key="item.playerId">
        <div class="itemImg">
          <img :src="item.avatar" alt="" />
        </div>
        <div class="itemInfo">
          <div class="itemTitle">{{ item.firstName }}{{ item.lastName }}</div>
        </div>
        <div class="itemInfo">
          <div class="itemTitle_en">
            {{ item.firstNameEn }}{{ item.lastNameEn }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      keyWord: "",
    };
  },
  activated() {
    if (this.$route.params?.name) {
      this.keyWord = this.$route.params?.name;
    }
    this.getData();
  },
  methods: {
    async onSearch() {
      this.getData();
    },
    async getData() {
      let { data, result, msg } = await $http.get(
        "apitest/getStartDetail",
        {
          fullName: this.keyWord,
        },
        "获取中"
      );
      if (result) {
        console.log(data);
        this.info = data.data;
      } else {
        this.$toast(msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.listItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  .itemInfo {
    flex: 1;
    text-align: center;
    font-size: 0.9rem;
    overflow: hidden;
    .itemTitle {
      color: #333;
    }
    .itemTitle_en {
      color: #666;
    }
  }
  .itemImg {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    width: 5rem;
    height: 3.5rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
