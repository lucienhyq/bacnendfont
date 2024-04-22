<template>
  <div class="music_score_index">
    <div class="topSearch">
      <div class="line">
        <div class="label">昵称：</div>
        <el-input
          v-model="nickname"
          placeholder="请输入学生昵称"
          style="width: 300px"
        ></el-input>
      </div>
      <div class="line">
        <div class="label">学生ID：</div>
        <el-input
          v-model="userId"
          placeholder="请输入学生ID"
          style="width: 300px"
        ></el-input>
      </div>
      <div class="line">
        <div class="label">开始时间-结束时间：</div>
      </div>
      <el-time-picker
        is-range
        v-model="value1"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      >
      </el-time-picker>
    </div>
    <div class="btn">搜索</div>
    <div class="listBox">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="表单ID" />
        <el-table-column prop="creatUid.user_name" label="会员昵称" />
        <el-table-column prop="formName" label="表单名称" />
        <el-table-column prop="updated" label="提交时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                size="small"
                @click="handleClick(scope.row)"
                >编辑</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nickname: "",
      userId: "",
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2030, 9, 10, 9, 40)],
      tableData: [],
    };
  },
  activated() {
    this.getData();
    console.log(Date.parse('2024-04-22T05:37:29.680Z'))
  },
  methods: {
    handleClick(item) {
      console.log(item);
    },
    getData() {
      $http
        .post("apitest/getGradeFormList", { page: 1 }, "获取中")
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.music_score_index {
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  .topSearch {
    display: flex;
    flex-wrap: wrap;
    .line {
      display: flex;
      align-items: center;
      margin-right: 10px;
      .label {
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
  .btn {
    padding: 0.5rem 1rem;
    background: #ffb83d;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 0.3rem;
    margin-top: 1rem;
    width: 4rem;
    box-sizing: border-box;
  }
}
</style>
