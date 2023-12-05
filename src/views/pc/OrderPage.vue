<template>
  <div class="OrderPage">
    <div class="searchBox">
      <div class="searchInp">
        <div class="txt">搜索关联商品</div>
        <el-input v-model="goodsId" placeholder="输入商品id"></el-input>
      </div>
      <div class="searchInp">
        <div class="txt">搜索订单</div>
        <el-input v-model="orderId" placeholder="输入商品id"></el-input>
      </div>
      <div class="searchInp">
        <div class="txt">会员</div>
        <el-input v-model="userId" placeholder="输入会员id"></el-input>
      </div>
      <div class="searchInp" style="max-width: 400px">
        <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
      </div>
      <el-button type="primary" @click="searchTap">搜索</el-button>
    </div>
    <el-table :data="list" style="width: 100%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="orderId" label="订单id" width="200"> </el-table-column>
      <el-table-column prop="avatar" label="订单详情" width="350">
        <template slot-scope="scope">
          <div class="goodBox">
            <img :src="scope.row.goodImg" class="imageS" alt="" />
            <div class="goodBox_detail">
              <span>{{ scope.row.goodTitle }}</span>
              <span>ID:{{ scope.row.goodsId }}</span>
              <span>{{ scope.row.orderType == "course" ? "预约商品" : "家政服务" }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderSn" label="订单流水号" width="200"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="300"> </el-table-column>
      <el-table-column prop="course_price" label="订单金额" width="200"> </el-table-column>
      <el-table-column prop="status" label="订单状态" width="200">
        <template slot-scope="scope">
          <div class="statusBox">
            {{ scope.row.status == 0 ? "下单成功" : "已完成" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="numberId" label="下单会员" width="200">
        <template slot-scope="scope">
          <div class="userBox">
            <span>昵称：{{ scope.row.numberId.user_name }}</span>
            <span>ID: {{ scope.row.numberId.id }}</span>
            <span>手机: {{ scope.row.numberId.mobile }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      goodsId: "",
      value1: [new Date(2000, 10, 10, 10, 10), new Date()],
      userId: "",
      orderId: "",
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    searchTap() {
      let json = {
        goodsId: this.goodsId,
        userId: this.userId,
        orderId: this.orderId,
        create_time: this.value1,
      };
      console.log(json);
    },
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
  .searchBox {
    padding: 2rem 1rem;
    background: #fff;
    margin-bottom: 1rem;
    margin-top: 1rem;
    display: flex;
    .searchInp {
      max-width: 250px;
      display: flex;
      align-items: center;
      margin-right: 30px;
      .txt {
        flex-shrink: 0;
        max-width: 150px;
        font-size: 14px;
        color: #666;
        text-align: center;
        margin-right: 15px;
      }
    }
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
      justify-content: space-around;
    }
  }
}
.userBox {
  display: flex;
  flex-direction: column;
}
</style>
