<template>
  <div class="music_score_create">
    <div class="title">添加自定义表单</div>
    <div class="contenBox">
      <div class="left">表单名称</div>
      <el-input
        v-model="title"
        placeholder="请输入表单名称"
        style="width: 350px"
      ></el-input>
    </div>
    <div class="contenBox">
      <div class="left">表单图片</div>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        action="http://localhost:3000/posts"
        list-type="picture-card"
        :on-success="handlePictureCardPreview"
      >
        <img v-if="formImg" :src="formImg" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="contenBox">
      <div class="left">表单介绍</div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="formDesc"
        :autosize="{ minRows: 2, maxRows: 10 }"
        style="width: 350px"
      >
      </el-input>
    </div>
    <div class="navLabel">
      <div class="type_lis" style="width: 4rem">类型</div>
      <div class="type_lis" style="width: 7rem">字段名称</div>
      <div class="type_lis" style="width: 3rem">必填</div>
      <div class="type_lis" style="flex: 1; text-align: left">设置</div>
    </div>
    <div class="navList" v-for="(item, index) in contenObj" :key="index">
      <div class="type_lis" style="width: 4rem">{{ checkTxt(item.type) }}</div>
      <div class="type_lis" style="width: 7rem">
        <el-input v-model="item.tp_name"></el-input>
      </div>
      <div class="type_lis" style="width: 3rem">
        <el-checkbox v-model="item.tp_must"></el-checkbox>
      </div>
      <!-- 各个不同选项得设置 -->
      <div class="type_lis" style="flex: 1; text-align: left">
        <template v-if="item.type == 'diyduohwb'">
          提示语<el-input
            type="text"
            placeholder="请输入提示语"
            v-model="item.placeholder"
            style="width: 150px"
          >
          </el-input>
        </template>
        <div v-if="item.type == 'diydanhwb'" class="inpBox">
          <div class="line">
            <div class="label_L">设置默认值</div>
            <el-input
              type="text"
              placeholder="请输入内容"
              v-model="item.tp_default"
              style="width: 150px"
            >
            </el-input>
          </div>
          <div class="line">
            <div class="label_L">提示语</div>
            <el-input
              type="text"
              placeholder="请输入提示语"
              v-model="item.placeholder"
              style="width: 150px"
            >
            </el-input>
          </div>
        </div>
        <template v-if="item.type == 'diyriqi'">
          <div class="line">
            设置默认
            <el-select v-model="item.default_time_type" placeholder="请选择">
              <el-option
                v-for="item in dateOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="line" v-if="item.default_time_type == 2">
            指定日期：
            <el-date-picker
              v-model="item.default_time"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </template>
        <template v-if="item.type == 'diyxlk'">
          <el-input
            type="textarea"
            placeholder="一行一个选项"
            v-model="item.tp_text"
            style="width: 350px"
          >
          </el-input>
        </template>
        <template v-if="item.type == 'diyimg'">
          <!-- tp_max -->
          最大数量
          <el-select v-model="item.tp_max" placeholder="请选择">
            <el-option
              v-for="(item, index) in 5"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </template>
        <i class="el-icon-close" @click="delMethod(item, index)"></i>
      </div>
    </div>
    <div class="contenBox">
      <el-select v-model="valueSelect" placeholder="请选择">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.title"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <el-button style="margin-left: 1rem" type="primary" @click="tapComfirm"
        >增加选项</el-button
      >
    </div>
    <div class="btn">
      <el-button type="primary" @click="confirmTap">提交</el-button>
      <el-button @click="backUrl">返回列表</el-button>
    </div>
  </div>
</template>
<script>
import sideNav from "./components/sideNav.vue";
export default {
  data() {
    return {
      title: "",
      formImg: "",
      formDesc: "",
      options: [
        {
          label: "diydanhwb",
          title: "单行文本",
        },
        {
          label: "diyduohwb",
          title: "多行文本",
        },
        {
          label: "diyriqi",
          title: "日期",
        },
        {
          label: "diyxlk",
          title: "下拉框",
        },
        {
          label: "diyimg",
          title: "图片",
        },
      ],
      valueSelect: "",
      contenObj: [],
      dateOption: [
        {
          label: "",
          value: "",
        },
        {
          label: "填写当天",
          value: "1",
        },
        {
          label: "指定日期",
          value: "2",
        },
      ],
    };
  },
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.getFormData();
    }
  },
  methods: {
    delMethod(item, index) {
      console.log(this.contenObj, index);
      this.contenObj.splice(index, 1);
    },
    backUrl() {
      this.$router.go(-1);
    },
    handlePictureCardPreview(file) {
      this.formImg = file.data;
    },
    tapComfirm() {
      // 添加到数组对象中
      let obj = {
        type: "", //类型
        tp_must: 0, //必填
        tp_name: "", //字段名称
        value: "",
      };
      obj.type = this.valueSelect;
      if (this.valueSelect == "diydanhwb") {
        obj.tp_default = "";
        obj.placeholder = "";
      } else if (this.valueSelect == "diyduohwb") {
        obj.placeholder = "";
      } else if (this.valueSelect == "diyriqi") {
        // 空白 0 填写当天 1 指定日期 2
        obj.default_time_type = "";
        obj.default_time = "";
      } else if (this.valueSelect == "diyxlk") {
        obj.tp_text = "";
      } else if (this.valueSelect == "diyimg") {
        obj.tp_max = 1;
        obj.value = [];
      }
      this.contenObj.push(obj);
    },
    getFormData() {
      $http
        .get("apitest/findFormId", { id: this.$route.params.id }, "获取中")
        .then((response) => {
          console.log(response);
          this.contenObj = response.data.FormContent;
          this.title = response.data.formName;
          this.formDesc = response.data.formDesc;
          this.formImg = response.data.formImg;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async update() {
      let json = {
        title: this.title,
        formImg: this.formImg,
        formDesc: this.formDesc,
        contenObj: this.contenObj,
        id: this.$route.params.id,
      };
      let { data, result, msg } = await $http.post(
        "apitest/updateForm",
        json,
        "获取中"
      );
      console.log(data);
      if (result) {
        this.$router.push({ name: "music_score_index" });
      }
      this.$toast(msg);
    },
    confirmTap() {
      if (this.$route.params.id) {
        this.update();
        return;
      }
      let json = {
        title: this.title,
        formImg: this.formImg,
        formDesc: this.formDesc,
        contenObj: this.contenObj,
      };
      $http
        .post("apitest/createForm", json, "获取中")
        .then((response) => {
          if (response.result) {
            this.$toast(response.msg);
            this.$router.push({ name: "music_score_index" });
          } else {
            this.$toast(response.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    checkTxt(type) {
      return function (type) {
        let str = "";
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].label == type) {
            str = this.options[i].title;
          }
        }
        return str;
      };
    },
  },
  components: { sideNav },
};
</script>
<style lang="scss" scoped>
.music_score_create {
  background: #fff;
  margin: 1rem;
  flex: 1;
  border-radius: 0.625rem;
  padding: 1rem;
  .navList {
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    .type_lis {
      font-size: 1rem;
      text-align: center;
      color: #666;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      .el-icon-close {
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1.5rem;
      }
    }
    .line {
      display: flex;
      align-items: center;
      margin-right: 1rem;
    }
    .inpBox {
      display: flex;
      flex-wrap: wrap;
      .line {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        .label_L {
          flex-shrink: 0;
          margin-right: 0.5rem;
        }
      }
    }
  }
  .navLabel {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #999999;
    padding-bottom: 0.5rem;
    .type_lis {
      font-size: 1rem;
      text-align: center;
      color: #666;
      padding: 0 2rem;
    }
  }
  .contenBox {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 2rem;
    .left {
      width: 10rem;
      padding-left: 1rem;
    }
  }
  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #999999;
  }
}
.avatar {
  width: 100%;
  height: 100%;
}
</style>
