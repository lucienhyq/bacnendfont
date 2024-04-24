<template>
  <div class="box">
    <sideNav></sideNav>
    <div class="music_score_index" v-if="$route.name == 'music_score_index'">
      <div class="topSearch">
        <div class="line">
          <div class="label">输入表单昵称：</div>
          <el-input
            v-model="formName"
            placeholder="请输入表单昵称："
            style="width: 300px"
          ></el-input>
        </div>
        <div class="line">
          <div class="label">表单ID：</div>
          <el-input
            v-model="id"
            placeholder="请输入表单ID"
            style="width: 300px"
          ></el-input>
        </div>
        <div class="line">
          <div class="label">开始时间-结束时间：</div>
        </div>
        <!-- <el-time-picker
          is-range
          v-model="value1"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker> -->
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <div class="btn" @click="toSearch">搜索</div>
      <div class="listBox">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="表单ID" />
          <el-table-column label="创建者">
            <template slot-scope="scope">
              {{
                scope.row.creatUid.admin == 1
                  ? "平台创建"
                  : scope.row.creatUid.user_name
              }}
            </template>
          </el-table-column>
          <el-table-column prop="formName" label="表单名称" />
          <el-table-column label="提交时间">
            <template slot-scope="scope">
              {{ timeSet(scope.row.updated) }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="delMethod(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="loadBox">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
        >
        </el-pagination>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import sideNav from "./components/sideNav.vue";
export default {
  data() {
    return {
      formName: "",
      id: "",
      value1: [],
      tableData: [],
      total: 0,
      page: 1,
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    toSearch() {
      this.page = 1;
      console.log(this.value1, this.formName, this.id);
      let start = Date.parse(this.value1[0]);
      console.log(start);
      // let json = {
      //   start_time: this.value1,
      //   end_time :
      // };
    },
    handleClick(item) {
      this.$router.push({ path: `/music_score_create/${item.id}` });
    },
    delMethod() {
      
    },
    getData() {
      $http
        .post("apitest/getGradeFormList", { page: 1 }, "获取中")
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
          this.total = response.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    timeSet(time) {
      return function (time) {
        let date = new Date(time);
        console.log();
        let month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
        let hours = date.getHours();
        let min =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let sec =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return `${date.getFullYear()}-${month}-${day} ${hours}:${min}:${sec}`;
      };
    },
  },
  components: { sideNav },
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
}
.music_score_index {
  flex: 1;
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
  .loadBox {
    text-align: center;
    margin-top: 2rem;
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
    cursor: pointer;
  }
}
</style>
