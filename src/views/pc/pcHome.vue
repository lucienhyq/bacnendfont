<template>
  <div class="pcHome">
    <div class="viewBox">
      <el-col style="margin-left: 1rem">
        <div class="settingIndexPage"></div>
      </el-col>
      <!-- 访客组件 -->
      <el-col>
        <visitor :visitorData="visitorData"></visitor>
      </el-col>
    </div>
    <!-- 访问入口 -->
  </div>
</template>
<script>
import visitor from "@/components/visitor";
export default {
  data() {
    return {
      visitorData: [],
    };
  },
  components: { visitor },
  activated() {
    this.getData();
    this.getVisitor();
  },
  methods: {
    tapurl() {
      console.log("dasdasd");
      this.$router.replace("Login");
    },
    getData() {
      $http
        .post("checkLoginUser", {}, "获取中")
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVisitor() {
      $http
        .get("apitest/get_userAccess", {}, "获取中")
        .then((response) => {
          this.visitorData = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.pcHome {
  padding: 30px;
}
.settingIndexPage {
}
</style>
