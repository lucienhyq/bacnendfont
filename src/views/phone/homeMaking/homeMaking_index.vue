<template>
  <div class="homeMaking_index">
    <van-nav-bar title="家政首页" left-arrow @click-left="onClickLeft" />
    <div class="">
      <div class="addMakingBox" @click="addShow = true">点击添加家政人员</div>
      <div class="list">
        <div class="lis" v-for="(item, index) in makingList" :key="index">
          <div class="img">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="right">
            <div class="name">{{ item.realname }}</div>
            <div class="mobile">{{ item.mobile }}</div>
          </div>
        </div>
      </div>
      <div class="noneTxt" v-if="makingList.length <= 0">暂无家政信息!</div>
    </div>
    <van-popup
      v-model="addShow"
      closeable
      close-icon-position="top-right"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="addHomePopupList">
        <div class="headTop">添加家政人员信息</div>
        <div class="line">
          <div class="left">姓名：</div>
          <div class="right">
            <input type="text" v-model="form.name" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="line">
          <div class="left">联系电话：</div>
          <div class="right">
            <input
              type="number"
              v-model="form.phone"
              placeholder="请输入联系电话"
            />
          </div>
        </div>
        <div class="line">
          <div class="left">工时价格：</div>
          <div class="right">
            <input
              type="number"
              v-model="form.price"
              placeholder="请输入工时价格"
            />
          </div>
        </div>
        <div class="line">
          <div class="left">工作性质：</div>
          <div class="right">
            <van-radio-group v-model="form.radio" direction="horizontal">
              <van-radio name="1">全职</van-radio>
              <van-radio name="2">兼职</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="line">
          <div class="left">上传头像：</div>
          <div class="right">
            <van-uploader :after-read="afterRead" v-if="!form.imgSrc" />
            <div class="imgBox" v-if="form.imgSrc">
              <div class="closeIcon" @click="closeDel">
                <van-icon name="cross" />
              </div>
              <img :src="form.imgSrc" alt="" />
            </div>
          </div>
        </div>
        <div class="button_confirm" @click="tapComfirm">提交申请</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      makingList: [],
      addShow: false,
      form: {
        name: "",
        phone: "",
        imgSrc: "",
        radio: "1",
        price: "",
      },
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    closeDel() {
      this.form.imgSrc = "";
    },
    tapComfirm() {
      let json = {
        realname: this.form.name,
        avatar: this.form.imgSrc,
        mobile: this.form.phone,
        takeOrder: this.form.radio == "1" ? true : false,
        price: this.form.price,
      };
      $http
        .post("apitest/homeMakingAddUser", json, "获取中")
        .then((response) => {
          console.log(response);
          if (response.result == 1) {
            this.addShow = false;
            this.$toast(response.msg);
          } else {
            this.$toast(response.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    afterRead(e) {
      let fd = new FormData();
      fd.append("file", e.file); // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      axios
        .post("api/homemaking_posts", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          this.form.imgSrc = response.data.data;
          console.log(this.form.imgSrc);
        })
        .catch((error) => {
          Toast.clear();
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getData() {
      $http
        .post("apitest/homeMaking_list", {}, "获取中")
        .then((response) => {
          this.makingList = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.noneTxt {
  color: #999;
  text-align: center;
  font-size: 1rem;
}
.addHomePopupList {
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
  .headTop {
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.3rem;
  }
  .button_confirm {
    margin: 0 2rem;
    border-radius: 0.5rem;
    background: red;
    padding: 0.65rem 0;
    text-align: center;
    color: #fff;
  }
  .line {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 0.5rem 0;
    .left {
      width: 25%;
      font-size: 1rem;
      color: #646566;
      font-weight: 500;
      flex-shrink: 0;
      position: relative;
      padding-left: 0.5rem;
    }
    .left::after {
      content: "*";
      position: absolute;
      left: 0;
      top: 35%;
      width: 0.5rem;
      height: 0.5rem;
      font-size: 1rem;
      color: red;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      input {
        width: 100%;
        border: none;
        text-align: right;
      }
      .imgBox {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: relative;
        .closeIcon {
          position: absolute;
          top: 0;
          right: 0;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }
}
.list {
  margin: 0 1rem;
  overflow: hidden;
  .lis {
    display: flex;
    padding: 0.5rem;
    margin-top: 1rem;
    background: #fff;
    border-radius: 0.5rem;
    .img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .right {
    }
  }
}
</style>
