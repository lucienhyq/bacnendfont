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
          <el-form-item label="家政人员名称">
            <el-input v-model="form.realname" :disabled="tag" style="width: 300px" placeholder="请输入家政人员名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商品价格">
            <el-input v-model="form.course_price" :disabled="tag" style="width: 300px" placeholder="请输入商品价格"></el-input>
          </el-form-item> -->
          <el-form-item label="平台是否显示">
            <el-switch v-model="form.clientShow" :disabled="tag"> </el-switch>
            <span class="shelfStatusTxt">{{ form.clientShow ? "上架" : "下架" }}</span>
          </el-form-item>
          <el-form-item label="家政人员照片">
            <div class="flex">
              <img :src="form.avatar" alt="" v-if="form.avatar" style="width: 150px; height: 150px" />
              <el-upload :show-file-list="false" action="http://localhost:3000/posts" list-type="picture-card" v-if="!tag" :on-success="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.mobile" :disabled="tag" style="width: 300px" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item label="工作时间">
            <div>
              <div class="addBtn">
                可预约工作时间段
                <!-- <i class="el-icon-circle-plus-outline"></i> -->
              </div>
              <div class="instreBox">
                <div class="title">价格：</div>
                <el-input v-model="workTimeList.price"></el-input>
                /小时
              </div>
              <div class="instreBox">
                <span>选择时间：</span>
                <el-time-select
                  placeholder="开始时间"
                  v-model="workTimeList.workeStartTime"
                  :picker-options="{
                    start: '06:00',
                    step: '00:15',
                    end: '23:00',
                  }"
                >
                </el-time-select>
                --
                <el-time-select
                  placeholder="结束时间"
                  v-model="workTimeList.workeEndTime"
                  :picker-options="{
                    start: '06:00',
                    step: '00:15',
                    end: '21:00',
                    minTime: workTimeList.workeStartTime,
                  }"
                >
                </el-time-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="绑定会员">
            <div class="addBox" @click="dialogTableVisible = true">
              <i class="el-icon-plus" v-if="!form.bindUid"></i>
              <img :src="binduser.avatar" alt="" v-else />
            </div>
            <div class="mmda" v-if="form.bindUid">{{ binduser.user_name }}</div>
            <div @click="cleanSelect" class="mmda rd" v-if="form.bindUid && this.$route.query.tag != 'look'">清除选择</div>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="onSubmit" v-if="this.$route.query.tag != 'look'">{{ this.$route.params.id ? "编辑商品" : "发布商品" }}</el-button>
    </div>
    <userSelectDialog :dialogTitle="'选择家政绑定会员'" v-model="dialogTableVisible" @closeDialog="closeUserDialog" @childSelect="childSelect"></userSelectDialog>
  </div>
</template>
<script>
import userSelectDialog from "../../components/userSelectDialog.vue";
export default {
  data() {
    return {
      form: {},
      dialogVisible: false,
      tag: false,
      workTimeList: { workeStartTime: "", workeEndTime: "", price: "" },
      pickerOptions: {
        format: "HH:mm",
        start: "00:00",
        step: "00:15",
        end: "23:30",
      },
      dialogTableVisible: false,
      binduser: [],
    };
  },
  activated() {
    if (this.$route.params.id) {
      this.getData();
    }
    if (this.$route.query) {
      this.tag = this.$route.query.tag == "look" ? true : false;
    }
  },
  methods: {
    cleanSelect() {
      this.binduser = "";
      this.form.bindUid = "";
    },
    childSelect(e) {
      this.binduser = e;
      this.form.bindUid = e._id;
      this.dialogTableVisible = false;
    },
    closeUserDialog() {
      this.dialogTableVisible = false;
    },
    getData() {
      $http
        .post("apitest/homeMaking_list", { hmuid: this.$route.params.id }, "获取中")
        .then((response) => {
          let _info = response.data;
          this.form = _info;
          this.workTimeList = _info.workTime;
          if (response.data.bindUid) {
            console.log(response.data.bindUid);
            this.binduser = response.data.bindUid;
            this.form.bindUid = response.data.bindUid.id;
            console.log(this.binduser, this.form);
          }
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
      this.$set(this.form, "avatar", file.data);
      this.form.avatar = file.data;
    },
    toBlack() {
      this.$router.push({ name: "homework" });
    },
    async onSubmit() {
      if (this.tag) {
        this.$message.error("查看商品不可编辑");
        return;
      }
      if (!this.workTimeList.workeStartTime) {
        this.$message.error("请选择开始时间");
        return;
      }
      if (!this.workTimeList.workeEndTime) {
        this.$message.error("请选择结束时间");
        return;
      }
      if (!this.workTimeList.price) {
        this.$message.error("请填写每小时价格");
        return;
      }
      let checkStatus = await this.checkTime(this.workTimeList);
      if (!checkStatus) return;
      let json = {};
      json = this.form;
      if (this.$route.params.id) {
        json.hmuid = this.$route.params.id;
      }
      json.workTime = this.workTimeList;
      console.log(json, this.form, checkStatus);
      $http
        .post(this.$route.params.id ? "apitest/updateWorkStatus" : "apitest/homeMakingAddUser", json, "获取中")
        .then((response) => {
          this.visitorData = response.data;
          this.$message.success("成功");
          this.$router.replace({ name: "homework" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleRemove(e) {
      console.log(e);
    },
    checkTime(obj) {
      return new Promise((resolve, reject) => {
        const startTime = new Date(`1970-01-01T${obj.workeStartTime}`);
        const endTime = new Date(`1970-01-01T${obj.workeEndTime}`);

        const timeDiff = endTime.getTime() - startTime.getTime();
        const hourDiff = timeDiff / (1000 * 60 * 60);

        if (hourDiff >= 4) {
          resolve(true);
        } else {
          this.$message.error("设置每天工作时间不能小于4小时");
          resolve(false);
        }
      });
    },
  },
  components: { userSelectDialog },
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
  .addBtn {
    font-size: 1.1rem;
    .el-icon-circle-plus-outline {
      color: #000;
      cursor: pointer;
    }
  }
  .instreBox {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    .title {
      flex-shrink: 0;
    }
    .el-input {
      width: 15%;
    }
  }
}
.bgbox {
  margin: 30px;
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
.mmda {
  width: 100px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rd {
  color: #999;
  cursor: pointer;
}
.addBox {
  width: 100px;
  height: 100px;
  border: 1px solid #f1e5f1;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6666;
  cursor: pointer;
  .el-icon-plus {
    font-size: 30px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
</style>
