<template>
  <div class="goodsBox">
    <div class="btnAdd" @click="toAddGood">添加商品</div>
    <div class="searchBox">
      <div class="dline">
        <el-input v-model="goodname" placeholder="请输入商品名称/商品ID"></el-input>
      </div>
      <div class="btn">搜索</div>
    </div>
    <el-table :data="tableData" style="width: 100%" :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column prop="id" label="ID" width="60"> </el-table-column>
      <el-table-column prop="title" label="标题" width="300"> </el-table-column>
      <el-table-column prop="goodimg" label="封面" width="300">
        <template slot-scope="scope">
          <img :src="scope.row.goodimg" class="imageS" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="course_price" label="价格" width="300">
        <template slot-scope="scope">
          <span>{{scope.row.course_price}}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodStatus" label="商品类型" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.goodStatus == 1 ? "普通商品" : "预约商品" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="shelfStatus" label="是否上架" width="300">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shelfStatus" @change="updateOne(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
          </div>
          <div>
            <el-button @click="delGood(scope.row)" type="text" size="small">删除商品</el-button>
          </div>
          <div>
            <el-button @click="handleClick(scope.row, 'read')" type="text" size="small">查看商品</el-button>
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
        .get("courseDelete", { goods_id: row.id }, "获取中")
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
        this.$router.push({ path: `/goodsEdit/${e.id}`, query: { tag: "look" } });
      } else {
        this.$router.push({ path: `/goodsEdit/${e.id}` });
      }
    },
    updateOne(item) {
      console.log(item);
      let json = { id: item.id, form: { shelfStatus: item.shelfStatus ? 1 : 2 } };
      $http
        .post("courseList_updateOne", json, "获取中")
        .then((response) => {
          this.$message.success(response.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toAddGood() {
      this.$router.replace({ name: "goodsEdit" });
    },
    getData() {
      $http
        .post("courseList", {}, "获取中")
        .then((response) => {
          console.log(response.data);
          this.tableData = response.data.list;
          this.total = response.data.total;
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
    width: 6rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #999999;
    box-sizing: border-box;
    color: #ffffff;
    border-radius: 0.1563rem;
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
