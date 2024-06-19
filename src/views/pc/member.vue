<template>
  <div class="memberList">
    <div class="headT">
      <el-page-header @back="goBack" content="会员列表"> </el-page-header>
    </div>
    <div class="searchOption">
      <el-input
        v-model="memebrId"
        placeholder="会员ID"
        style="width: 200px; margin-right: 20px"
      ></el-input>
      <el-input
        v-model="keyword"
        placeholder="请输入会员姓名"
        style="width: 400px; margin-right: 20px"
      ></el-input>
      <el-select v-model="value" placeholder="会员类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button style="margin-left: 20px" type="info">搜索</el-button>
      <el-button style="margin-left: 20px" type="primary">添加会员</el-button>
    </div>
    <div class="list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话"> </el-table-column>
        <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memebrId: "",
      keyword: "",
      options: [
        {
          value: "1",
          label: "管理员",
        },
        {
          value: "2",
          label: "H5",
        },
        {
          value: "3",
          label: "小程序",
        },
      ],
    };
  },
  activated() {
    console.log("wwwwwwwwwww");
    this.getData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      console.log();
    },
  },
};
</script>
<style lang="scss" scoped>
.memberList {
  padding: 30px;
  .headT {
    padding: 20px 0;
  }
  .searchOption {
    display: flex;
  }
  .list {
    margin-top: 50px;
  }
}
</style>
