<template>
  <div class="goodsEdit">
    <div class="bgbox">
      <div class="topHead">
        <div class="title_l" @click="toBlack">
          <i class="el-icon-arrow-left"></i>
          返回列表
        </div>
        <div class="title">添加商品</div>
      </div>
      <div class="formBox">
        <el-form ref="form" :model="form" label-width="120px" label-position="left">
          <el-form-item label="商品标题">
            <el-input v-model="form.title" :disabled="tag" style="width: 300px" placeholder="请输入商品标题"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.course_price" :disabled="tag" style="width: 300px" placeholder="请输入商品价格"></el-input>
          </el-form-item>
          <el-form-item label="商品是否上架">
            <el-switch v-model="form.shelfStatus" :disabled="tag"> </el-switch>
            <span class="shelfStatusTxt">{{ form.shelfStatus ? "上架" : "下架" }}</span>
          </el-form-item>
          <el-form-item label="商品图片">
            <div class="flex">
              <img :src="form.goodimg" alt="" v-if="form.goodimg && this.$route.params.id" style="width: 150px; height: 150px" />
              <el-upload action="http://localhost:3000/posts" list-type="picture-card" v-if="!tag" :on-success="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="商品类型">
            <el-radio-group v-model="form.goodStatus">
              <el-radio :label="'1'" :disabled="tag">普通商品</el-radio>
              <el-radio :label="'2'" :disabled="tag">预约商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="form.inventory" :disabled="tag" style="width: 300px" placeholder="请输入商品库存"></el-input>
          </el-form-item>
          <el-form-item label="商品详情">
            <quillEditor :contenInfo="form.conten" :disabled="tag" @quillBlur="quillBlur"></quillEditor>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="onSubmit">{{ this.$route.params.id ? "编辑商品" : "发布商品" }}</el-button>
    </div>
  </div>
</template>
<script>
import quillEditor from "@/components/editor/quillEditor.vue";
export default {
  data() {
    return {
      form: {
        // 商品标题
        title: "",
        // 商品价格
        course_price: "",
        // 商品详情
        conten: "",
        // 商品是否上架
        shelfStatus: false,
        // 商品图片
        goodimg: "",
        // 库存
        inventory: "",
        // 商品类型
        goodStatus: "2",
        creatUser: 1,
      },
      dialogVisible: false,
      tag: false,
    };
  },
  components: { quillEditor },
  activated() {
    if (this.$route.params.id) {
      this.getData();
    }
    if (this.$route.query) {
      this.tag = this.$route.query.tag == "look" ? true : false;
    }
    console.log(this.$route.query);
  },
  methods: {
    getData() {
      $http
        .post("courseList", { id: this.$route.params.id }, "获取中")
        .then((response) => {
          // this.visitorData = response.data;
          console.log(response.data);
          let _info = response.data.list;
          this.form.title = _info.title;
          this.form.course_price = Number(_info.course_price);
          this.form.conten = _info.conten;
          this.form.shelfStatus = _info.shelfStatus;
          this.form.goodimg = _info.goodimg;
          this.form.inventory = _info.inventory;
          this.form.goodStatus = _info.goodStatus;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    quillBlur(e) {
      console.log(e);
      this.form.conten = e;
      console.log(this.form);
    },
    handlePictureCardPreview(file) {
      this.form.goodimg = file.data;
      console.log(this.form.goodimg, "goodimg");
    },
    toBlack() {
      this.$router.go(-1);
    },
    onSubmit() {
      if (this.tag) {
        this.$message.success("查看商品不可编辑");
        return;
      }
      let json = { form: this.form };
      if (this.$route.params.id) {
        json.id = this.$route.params.id;
      }
      $http
        .post(this.$route.params.id ? "courseList_updateOne" : "courseIndex", json, "获取中")
        .then((response) => {
          this.visitorData = response.data;
          this.$message.success("成功");
          this.$router.replace({ name: "goods" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemove(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  img {
    margin-right: 15px;
    border-radius: 10px;
  }
}
#addCurose {
  background: #f7f7f7;
}
.formBox {
  margin-top: 20px;
  .shelfStatusTxt {
    color: #999;
  }
}
.bgbox {
  margin-top: 20px;
  background: #fff;
  padding: 20px 25px;
  border-radius: 10px;
  min-height: 100vh;
  .topHead {
    display: flex;
    justify-content: space-between;
    .title_l {
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      position: relative;
      padding-left: 10px;
    }
    .title::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 5px;
      height: 100%;
      background: #f1e5f1;
    }
  }
}
.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
