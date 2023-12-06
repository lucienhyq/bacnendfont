<template>
  <div class="userSelectDialog">
    <el-dialog :title="dialogTitle" @close="closeDialog" :visible.sync="dialogTableVisible">
      <div class="dialogBox">
        <div class="top">
          <el-input v-model="inputVal" placeholder="请输入会员昵称"></el-input>
          <el-button @click="toSearch">搜索</el-button>
        </div>
        <div class="lis" v-for="(item, index) in listData" :key="index">
          <div class="lis_left">
            <img :src="item.avatar" alt="" />
            <div class="name">{{ item.user_name }}</div>
            <div>ID:{{ item.id }}</div>
          </div>
          <div class="lis_right" @click="tapSelect(item)">选择</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  model: {
    prop: "dialogTableVisible",
    event: "onEmit",
  },
  props: {
    dialogTitle: {
      type: String,
      default: "标题",
    },
    dialogTableVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputVal: "",
      listData: [],
    };
  },
  methods: {
    tapSelect(item) {
      this.$emit("childSelect", item);
      console.log(item._id);
    },
    closeDialog() {
      this.$emit("closeDialog", false);
      this.listData = [];
      this.inputVal = "";
    },
    toSearch() {
      $http
        .post("apitest/FindAdmin", { keyword: this.inputVal }, "获取中")
        .then((response) => {
          if (response.result == 1) {
            this.listData = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.dialogBox {
  .top {
    display: flex;
    .el-button {
      margin-left: 20px;
      flex: 1;
    }
  }
  .lis {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    .lis_right {
      cursor: pointer;
    }
    .lis_left {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        border-radius: 50%;
        height: 40px;
      }
      .name {
        margin: 0 10px;
      }
    }
  }
}
</style>
