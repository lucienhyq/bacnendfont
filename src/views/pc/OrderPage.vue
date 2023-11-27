<template>
  <div class="OrderPage">
    <div class="searchBox">
      <el-button type="primary">搜索</el-button>
    </div>
    <el-table :data="list" style="width: 100%" cell-style="text-align: center;" header-cell-style="text-align: center;">
      <el-table-column prop="orderId" label="订单id" width="200"> </el-table-column>
      <el-table-column prop="avatar" label="订单详情" width="350">
        <template slot-scope="scope">
          <div class="goodBox">
            <img :src="scope.row.goodImg" class="imageS" alt="" />
            <div class="goodBox_detail">
              <span>{{ scope.row.goodTitle }}</span>
              <span>ID：{{ scope.row.goodsId }}</span>
              <span>{{ scope.row.orderType == 'course'?'预约商品':'家政服务' }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderSn" label="订单流水号" width="200"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="300"> </el-table-column>
      <el-table-column prop="course_price" label="订单金额" width="200"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      $http
        .post("orderCountList", {}, "获取中")
        .then((response) => {
          console.log(response);
          this.list = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.OrderPage {
  .searchBox{
    padding: 2rem 1rem;
    background: #fff;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .goodBox {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 0.625rem;
      margin-right: 10px;
    }
    .goodBox_detail {
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
