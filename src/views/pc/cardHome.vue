<template>
  <div class="cardHome">
    <div class="left">
      <div class="vue-main-title">
        <div class="vue-main-title-left"></div>
        <div class="vue-main-title-content">卡片设置</div>
      </div>
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="公司名称" required>
          <el-input
            v-model="form.company_name"
            style="width: 250px"
            placeholder="输入公司名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司地址" required>
          <el-input
            v-model="form.company_address"
            style="width: 250px"
            placeholder="输入公司名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司发展历程" required>
          <div class="addOption">
            <el-button @click="add_dateHistory" type="primary">添加</el-button>
          </div>
          <div
            class="historyList"
            v-for="(item, index) in form.development_history"
            :key="index"
          >
            <el-input
              v-model="item.date"
              style="width: 100px"
              placeholder="年份"
            ></el-input>
            -
            <el-input
              v-model="item.desc"
              style="width: 250px"
              placeholder="年份简介(不超过20字)"
            ></el-input>
            <el-button
              @click="delDateOption(index)"
              type="info"
              style="margin-left: 10px"
              >删除</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="公司业务" required>
          <div class="addOption">
            <el-button @click="add_dateHistory" type="primary">添加</el-button>
          </div>
          <div
            class="historyList"
            v-for="(item, index) in form.main_business"
            :key="index"
          >
            <el-input
              v-model="item.text"
              style="width: 100px"
              placeholder="业务称谓"
            ></el-input>
            <el-button
              @click="delDateOption(index)"
              type="info"
              style="margin-left: 10px"
              >删除</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="公司简介">
          <quillEditor
            :contenInfo="form.contenRow"
            :disabled="tag"
            @quillBlur="quillBlur"
            ref="quillChild"
          ></quillEditor>
        </el-form-item>
      </el-form>
    </div>
    <div class="rigth">
      <div class="saveBtn" @click="save_Post">保存设置</div>
    </div>
  </div>
</template>
<script>
import quillEditor from "@/components/editor/quillEditor.vue";
export default {
  data() {
    return {
      form: {
        company_name: "",
        company_address: "",
        contenRow: "",
        development_history: [],
        main_business: [],
      },
      tag: false,
      info: [],
    };
  },
  components: { quillEditor },
  activated() {
    this.getData();
  },
  methods: {
    quillBlur(e) {
      this.form.contenRow = e;
    },
    async save_Post() {
      let json = {
        company_name: this.form.company_name,
        company_address: this.form.company_address,
        company_desc: this.form.contenRow,
        development_history: this.form.development_history,
        main_business: this.form.main_business,
      };
      let { data, msg, result } = await $http.post(
        "card/setting/save",
        json,
        "获取中"
      );
      if (result) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    add_dateHistory() {
      this.form.development_history.push({
        date: "",
        desc: "",
      });
    },
    add_main() {
      this.form.main_business.push({
        text: "",
        icon: "",
      });
    },
    delDateMain(index) {
      this.form.main_business.splice(index, 1);
    },
    delDateOption(index) {
      this.form.development_history.splice(index, 1);
    },
    async getData() {
      let { data, msg, result } = await $http.post(
        "card/card_Index",
        {},
        "获取中"
      );
      if (result) {
        this.form.company_name = data.company_name;
        this.form.company_address = data.company_address;
        this.form.development_history = data.development_history;
        this.form.contenRow = data.company_desc;
        this.form.main_business = data.main_business;
        this.$refs.quillChild.content = this.form.contenRow;
      } else {
        this.$message.error(msg);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.cardHome {
  padding: 30px 20px;
  display: flex;
  background: #f5f5f5;
  .left {
    flex: 1;
    background: #fff;
    padding: 15px;
    border-radius: 20px;
    .addOption {
      margin-bottom: 15px;
    }
    .historyList {
      margin-bottom: 15px;
    }
  }
  .rigth {
    flex-shrink: 0;
    width: 300px;
    min-height: 100vh;
    background: #fff;
    margin-left: 10px;
    border-radius: 20px;
    padding: 25px;
    box-sizing: border-box;
    .saveBtn {
      padding: 10px;
      box-sizing: border-box;
      background-color: #29ba9c;
      color: #fff;
      text-align: center;
      border-radius: 10px;
    }
  }
}
.cardCell {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  .title {
    width: 100px;
  }
}
.vue-main-title {
  display: flex;
  margin: 5px 0;
  line-height: 32px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  .vue-main-title-content {
    font-size: 14px;
    flex: 1;
  }
  .vue-main-title-left {
    width: 4px;
    height: 18px;
    margin-top: 6px;
    background: #29ba9c;
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
