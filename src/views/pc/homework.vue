<template>
  <div class="goodsBox">
    <div class="btnAdd" @click="toAddGood">添加家政人员</div>
    <div class="searchBox">
      <div class="dline">
        <el-input
          v-model="goodname"
          placeholder="搜索家政人员昵称/员工ID"
        ></el-input>
      </div>
      <div class="btn">搜索</div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="hmuid" label="员工ID" width="80">
      </el-table-column>
      <el-table-column prop="makingName" label="昵称" width="100">
      </el-table-column>
      <el-table-column prop="work" label="价格/小时">
        <template slot-scope="scope">
          <div class="price">{{ scope.row.work.price }}/元</div>
          <!-- <div class="price">上班时间 {{ scope.row.workTime.workeStartTime }}-{{ scope.row.workTime.workeEndTime }}</div> -->
        </template>
      </el-table-column>
      <el-table-column prop="img" label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="imageS" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="150">
      </el-table-column>
      <el-table-column prop="creatUid.user_name" label="创建人" width="150">
      </el-table-column>
      <el-table-column prop="clientShow" label="平台是否显示" width="200">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.clientShow"
            @change="updateOne(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="handleClick(scope.row)"
              >编辑资料</el-button
            >
          </div>
          <div>
            <el-button @click="delGood(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </div>
          <div>
            <el-button
              @click="handleClick(scope.row, 'read')"
              type="text"
              size="small"
              >查看资料</el-button
            >
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
      goodname: "",
      tableData: [],
      total: 0,
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    delGood(row) {
      $http
        .post("apitest/homeMakingDeleteUser", { hmuid: row.hmuid }, "获取中")
        .then((response) => {
          this.$message.success(response.msg);
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick(e, key = "") {
      console.log(e, key);
      if (key) {
        this.$router.push({
          path: `/homeworkEdit/${e.hmuid}`,
          query: { tag: "look" },
        });
      } else {
        this.$router.push({ path: `/homeworkEdit/${e.hmuid}` });
      }
    },
    updateOne(item) {
      let json = { hmuid: item.hmuid, clientShow: item.clientShow };
      $http
        .post("/apitest/updateWorkStatus", json, "获取中")
        .then((response) => {
          this.$message.success(response.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAddGood() {
      this.$router.replace({ name: "homeworkEdit" });
    },
    getData() {
      $http
        .post("apitest/homeMaking_list", {}, "获取中")
        .then((response) => {
          console.log(response.data.data);
          this.tableData = response.data.data;
          this.total = response.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.goodsBox {
  padding: 0.9375rem;
  box-sizing: border-box;
  .imageS {
    width: 5rem;
    height: 5rem;
    border-radius: 0.25rem;
  }
  .btnAdd {
    width: 8rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #999999;
    box-sizing: border-box;
    color: #ffffff;
    border-radius: 0.35rem;
    margin-bottom: 1rem;
  }
  .searchBox {
    background: #ffffff;
    padding: 0.4688rem;
    border-radius: 0.3125rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .btn {
      background: #999999;
      padding: 0.1563rem 0.7813rem;
      border-radius: 0.1563rem;
      color: #ffffff;
      margin-left: 0.9375rem;
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
