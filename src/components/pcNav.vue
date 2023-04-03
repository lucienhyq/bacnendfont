<template>
  <div class="pcNav">
    <div class="pcNavTab">
      <div class="homePage">
        <img src="" alt="获取图片失败" />
      </div>
      <div class="right">
        <div class="right_box">
          <i class="iconfont icon-denglu"></i>
          退出登录
        </div>
        <!-- <div class="right_box">
          <i class="iconfont icon-tuichu-"></i>
          前往前端
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">
.pcNav {
  .pcNavTab {
    width: 100%;
    // height: 5rem;
    padding: 0.625rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .homePage {
      width: 10rem;
      height: 5rem;
      background: red;
      border-radius: 0.725rem;
      img {
        border-radius: 0.725rem;
        width: 100%;
        height: 100%;
      }
    }
    .right {
      display: flex;
      color: #000;
      font-size: 16px;
      .right_box {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        color: #666;
      }
      .iconfont {
        font-size: 20px;
        color: #999;
        margin-right: 0.625rem;
      }
    }
  }
}
</style>
