<template>
  <div class="goodsBox">
    <div class="btnAdd">添加商品</div>
    <div class="searchBox">
      <div class="dline">
        <el-input v-model="goodname" placeholder="请输入商品名称/商品ID"></el-input>
      </div>

      <div class="btn">搜索</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodname: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.goodsBox {
  padding: 30px;
  box-sizing: border-box;
  .btnAdd {
    width: 6rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #999999;
    box-sizing: border-box;
    color: #ffffff;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
  .searchBox {
    background: #ffffff;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .btn {
      background: #999999;
      padding: 5px 25px;
      border-radius: 5px;
      color: #ffffff;
      margin-left: 30px;
    }
    .dline {
      min-width: 15rem;
      display: flex;
      align-items: center;
      span {
        flex-shrink: 0;
        color: #999;
      }
    }
  }
}
</style>
