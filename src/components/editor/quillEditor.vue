<template>
  <div class="quillEditor">
    <el-upload action="http://localhost:3000/posts" list-type="picture-card" :on-success="handlePictureCardPreview" :on-remove="handleRemove" style="display: none">
      <i class="el-icon-plus quilleditor_img"></i>
    </el-upload>
    <quill-editor ref="myTextEditor" v-bind:options="editorOption" v-model="content" @change="onEditorChange"> </quill-editor>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { Quill } from "vue-quill-editor";
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
          },
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped></style>
