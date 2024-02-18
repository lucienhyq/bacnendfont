<template>
  <div class="visitor">
    <div class="title">最近访客</div>
    <div class="list">
      <el-table :data="visitorData" style="width: 100%">
        <el-table-column prop="userId" label="会员id" width="120"></el-table-column>
        <el-table-column label="姓名" width="140">
          <div slot-scope="scope" class="userBox">
            <img :src="scope.row.memberUser.avatar" alt="" />
            <span>{{ scope.row.memberUser.user_name }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="timestamp" label="访问时间"></el-table-column>
        <el-table-column prop="userAgent" label="访问客户端"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visitorData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.userBox {
  display: flex;
  flex-direction: column;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    margin: 0;
  }
}
.visitor {
  width: 100%;
  background: #ffffff;
  border-radius: 1rem;
  padding: 0.725rem;
  box-sizing: border-box;
  .title {
    position: relative;
    margin-left: 0.625rem;
    font-weight: bold;
    font-size: 1rem;
  }
  .title::after {
    content: "";
    position: absolute;
    left: -0.625rem;
    top: 0;
    width: 0.325rem;
    height: 100%;
    background: red;
    border-radius: 0.3rem;
  }
  .list {
    width: 100%;
    max-height: 50vh;

    overflow-y: scroll;
  }
  .list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
