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
      <el-select v-model="select_value" placeholder="会员类型">
        <el-option
          v-for="item in options_arr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button style="margin-left: 20px" type="info" @click="searchM"
        >搜索</el-button
      >
      <el-button
        style="margin-left: 20px"
        type="primary"
        @click="dialogVisibleShow"
        >添加会员</el-button
      >
    </div>
    <div class="list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"> </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话"> </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
          <template slot-scope="scope">
            <span>{{ convertTimestamp(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClickMember(scope.row.id)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleClick_edit(scope.row.id)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="addShow ? '添加会员' : '查看信息'"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="会员名称">
          <el-input v-model="form.user_name" :readonly="!addShow"></el-input>
        </el-form-item>
        <el-form-item label="会员手机号">
          <el-input v-model="form.mobile" :readonly="!addShow"></el-input>
        </el-form-item>
        <template v-if="addShow">
          <el-form-item label="会员密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <div style="display: flex; justify-content: flex-end">
            <el-button type="info" @click="saveAddMember">添加会员</el-button>
          </div>
        </template>
        <template v-if="!addShow">
          <el-form-item label="创建时间">
            <el-input :value="convertTimestamp(form.createdAt)"></el-input>
          </el-form-item>
        </template>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      memebrId: "",
      keyword: "",
      tableData: [],
      select_value: "",
      dialogVisible: false,
      form: {
        name: "",
        mobile: "",
        password: "",
      },
      isEdit: false,
      addShow: false,
      options_arr: [
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
  computed: {
    convertTimestamp(timestampStr) {
      return function (timestampStr) {
        // 创建一个Date对象，注意Z表示的是零时区，需要处理
        var date = new Date(timestampStr);
        // 使用toDateString获取日期部分，toTimeString获取时间部分，然后用空格连接
        // 但是toTimeString包含时区信息，因此直接格式化更准确
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // getMonth返回的月份是从0开始的
        var day = ("0" + date.getDate()).slice(-2);
        var hours =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
    },
  },
  activated() {
    console.log("wwwwwwwwwww");
    this.getData();
  },
  methods: {
    dialogVisibleShow() {
      this.dialogVisible = true;
      this.form.user_name = "";
      this.form.mobile = "";
      this.form.password = "";
      this.addShow = true;
    },
    handleClick_edit(id) {
      $http
        .get("memberList", { member_id: id }, "获取中")
        .then((response) => {
          if (response.result) {
            let info = response.data[0];
            this.dialogVisible = true;
            this.form = info;
            this.isEdit = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClickMember(id) {
      $http
        .get("memberList", { member_id: id }, "获取中")
        .then((response) => {
          if (response.result) {
            let info = response.data[0];
            this.dialogVisible = true;
            this.form = info;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.addShow = false;
      this.isEdit = false;
    },
    goBack() {
      this.$router.go(-1);
      console.log();
    },
    searchM() {},
    saveAddMember() {
      let params = {
        name: this.form.user_name,
        phone: this.form.mobile,
        password: this.form.password,
      };
      console.log(params);
    },
    getData() {
      $http
        .get("memberList", {}, "获取中")
        .then((response) => {
          if (response.result) {
            this.tableData = response.data;
            console.log(response.data);
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
