<template>
  <div class="quillEditor">
    <el-upload
      action="http://localhost:3000/posts"
      list-type="picture-card"
      :on-success="handlePictureCardPreview"
      :on-remove="handleRemove"
      style="display: none"
    >
      <i class="el-icon-plus quilleditor_img"></i>
    </el-upload>
    <div>
      <el-dialog
        :close-on-click-modal="false"
        width="50%"
        style="margin-top: 1px"
        title="视频上传"
        :visible.sync="videoDialog.show"
        append-to-body
      >
        <el-tabs v-model="videoDialog.activeName">
          <el-tab-pane label="添加视频链接" name="first">
            <el-input
              v-model="videoDialog.videoLink"
              placeholder="请输入视频链接"
              clearable
            ></el-input>
            <el-button
              type="primary"
              size="small"
              style="margin: 20px 0px 0px 0px"
              @click="addVideoLink(videoDialog.videoLink)"
              >添加
            </el-button>
          </el-tab-pane>
          <el-tab-pane label="本地视频上传" name="second">
            <el-upload
              v-loading="uploading"
              style="text-align: center"
              drag
              :action="uploadUrl"
              accept="video/*"
              :data="videoFileData"
              :before-upload="onBeforeUploadVideo"
              :on-success="onSuccessVideo"
              :on-error="onErrorVideo"
              :multiple="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
    <quill-editor
      ref="myTextEditor"
      v-bind:options="editorOption"
      v-model="content"
      @change="onEditorChange"
    >
    </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Quill } from "vue-quill-editor";
import Video from "./video";
Quill.register(Video, true);
// 设置调整图片大小
// import ImageResize from "quill-image-resize-module";
// Quill.register("modules/imageResize", ImageResize);
// 设置拖拽
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: "",
      editorOption: null,
      videoDialog: {
        show: false,
        activeName: "",
        videoLink: "",
      },
      uploading: "",
      uploadUrl: "",
      videoFileData: {},
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.$emit("quillBlur", html);
    },
    handlePictureCardPreview(e) {
      let quill = this.$refs.myTextEditor.quill;
      let length = quill.getSelection().index;
      console.log(e);
      quill.insertEmbed(length, "image", e.data);
      quill.setSelection(length + 1);
    },
    handleRemove() {},
    onBeforeUploadVideo() {},
    onSuccessVideo() {},
    onErrorVideo() {},
    addVideoLink(videoLink) {
      console.log(videoLink);
      if (!videoLink) return this.$message.error("请输入视频地址");
      this.videoDialog.show = false;
      let range = this.$refs.myTextEditor.quill.savedRange;
      let index = 0;
      if (range != null) {
        index = range.index;
      }
      // 插入
      this.$refs.myTextEditor.quill.insertEmbed(index, "video", videoLink);
      // 调整光标到最后
      this.$refs.myTextEditor.quill.setSelection(index + 1);
    },
  },
  created() {
    // 工具栏配置
    const toolbarOption = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["image", "video"],
    ];
    this.editorOption = {
      theme: "snow",
      placeholder: "请输入正文",
      modules: {
        // 设置拖拽
        imageDrop: true,
        //设置图片大小, 也可以使用"imageResize:true"，官网上采用的是下面的配置方式
        // imageResize: {
        //   displayStyles: {
        //     backgroundColor: 'black',
        //     border: 'none',
        //     color: 'white'
        //   },
        //   modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        // },
        toolbar: {
          container: toolbarOption,
          handlers: {
            image: function (value) {
              if (value) {
                // 调用iview图片上传
                document.querySelector(".quilleditor_img").click();
              } else {
                this.quill.format("image", false);
              }
            },
            video: (value) => {
              this.videoDialog.show = true;
            },
          },
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped></style>
