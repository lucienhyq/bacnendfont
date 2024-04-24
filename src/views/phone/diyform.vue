<template>
  <div class="diyformPage">
    <van-nav-bar :title="title" fixed left-arrow @click-left="onClickLeft" />
    <div class="imgae" v-if="formImg">
      <img :src="formImg" alt="" />
    </div>
    <div class="dec" v-if="formDesc">表单介绍：{{ formDesc }}</div>
    <div class="form" v-for="(item, index) in FormContent" :key="index">
      <template v-if="item.type == 'diydanhwb'">
        <van-field
          v-model="item.tp_default"
          :label="item.tp_name"
          :required="item.tp_must ? true : false"
          :placeholder="item.placeholder ? item.placeholder : '请输入'"
        />
      </template>
      <template v-if="item.type == 'diyduohwb'">
        <van-field
          rows="3"
          :label="item.tp_name"
          :required="item.tp_must ? true : false"
          autosize
          type="textarea"
          :placeholder="item.placeholder ? item.placeholder : '请输入'"
          maxlength="1000"
          show-word-limit
        ></van-field>
      </template>
      <template v-if="item.type == 'diyriqi'">
        <van-field
          :required="item.tp_must ? true : false"
          :label="item.tp_name"
          :value="getDay_c(item)"
        ></van-field>
      </template>
      <template v-if="item.type == 'diyxlk'">
        <van-cell
          :required="item.tp_must ? true : false"
          is-link
          @click="showActionOpen(item)"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span>{{ item.tp_name }}</span>
          </template>
          <template #default>
            <span>{{ item.value }}</span>
          </template>
        </van-cell>
      </template>
      <template v-if="item.type == 'diyimg'">
        <van-cell :required="item.tp_must ? true : false">
          <template #title>
            <span>{{ item.tp_name }}</span>
          </template>
          <template #default>
            <div class="uploadImg">
              <van-uploader
                v-model="item.value"
                :after-read="(e) => afterRead(e, index)"
                :preview-image="false"
              />
            </div>
            <!-- <van-uploader :after-read="afterRead" v-if="!form.imgSrc" />
            <div class="imgBox" v-if="form.imgSrc">
              <div class="closeIcon" @click="closeDel">
                <van-icon name="cross" />
              </div>
              <img :src="form.imgSrc" alt="" />
            </div> -->
          </template>
        </van-cell>
      </template>
    </div>
    <van-action-sheet
      title="请选择"
      v-model="showAction"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "表单",
      formImg: "",
      formDesc: "",
      FormContent: [],
      showAction: false,
      actions: [],
    };
  },
  activated() {
    this.getData();
  },
  computed: {
    getDay_c(item) {
      return function (item) {
        let str = "";
        if (item.default_time_type == 2) {
          str = this.getTimeStr(item.default_time);
        } else if (item.default_time_type) {
          str = this.getTimeStr(new Date());
        }
        return str;
      };
    },
    // actions_c(item) {
    //   return function (item) {
    //     let content = item.tp_text;
    //     let linesArray = content.split(/\r?\n/);
    //     return linesArray;
    //   };
    // },
  },
  methods: {
    afterRead(e, index) {
      console.log(e, index);
      let fd = new FormData();
      fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      axios
        .post("api/posts", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          // this.form.imgSrc = response.data.data;
          // console.log(this.form.imgSrc);
        })
        .catch((error) => {
          Toast.clear();
        });
    },
    onSelect() {},
    showActionOpen(item) {
      let content = item.tp_text;
      let linesArray = content.split(/\r?\n/);
      let arr = [];
      for (let i = 0; i < linesArray.length; i++) {
        let obj = { name: linesArray[i] };
        arr.push(obj);
      }
      this.actions = arr;
      console.log(this.actions);
      this.showAction = true;
    },
    getTimeStr(default_time) {
      let time = new Date(default_time);
      let Year = time.getFullYear();
      let month =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      let day =
        time.getDay() + 1 < 10 ? "0" + (time.getDay() + 1) : time.getDay() + 1;
      let hours =
        time.getHours() + 1 < 10
          ? "0" + (time.getHours() + 1)
          : time.getHours() + 1;
      let min =
        time.getMinutes() + 1 < 10
          ? "0" + (time.getMinutes() + 1)
          : time.getMinutes() + 1;
      let sec =
        time.getSeconds() + 1 < 10
          ? "0" + (time.getSeconds() + 1)
          : time.getSeconds() + 1;
      return `${Year}-${month}-${day}`;
    },
    async getData() {
      let { data, result, msg } = await $http.get(
        "apitest/findFormId",
        { id: this.$route.params.id },
        "."
      );
      console.log(data);
      if (result) {
        this.title = data.formName;
        this.formImg = data.formImg;
        this.formDesc = data.formDesc;
        this.FormContent = data.FormContent;
        console.log(this.title);
      } else {
        this.$toast(msg);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.diyformPage {
  background: #fff;
  padding-top: 46px;
  .imgae {
    width: 100%;
    height: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .dec {
    padding: 1rem 0.625rem;
    text-align: left;
    font-size: 14px;
    color: #999;
  }
  .form {
  }
}
</style>
