import { Quill } from "vue-quill-editor";
// 源码中是import直接导入，这里要用Quill.import引入
const BlockEmbed = Quill.import("blots/block/embed");
const Link = Quill.import("formats/link");

const ATTRIBUTES = ["height", "width"];

class Video extends BlockEmbed {
    static create(value) {
        const node = super.create(value);
        // 添加video标签所需的属性
        node.setAttribute("controls", "controls");
        node.setAttribute("type", "video/mp4");
        node.setAttribute("src", this.sanitize(value));
        //为了兼容 iOS 设备上，显示海报图（视频封面）
        node.setAttribute("preload", "metadata");
        return node;
    }

    static formats(domNode) {
        return ATTRIBUTES.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
                    formats[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }

    static sanitize(url) {
        return Link.sanitize(url); // eslint-disable-line import/no-named-as-default-member
    }

    static value(domNode) {
        return domNode.getAttribute("src");
    }

    format(name, value) {
        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                    this.domNode.setAttribute(name, value);
            } else {
                    this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }

    html() {
        const { video } = this.value();
        return `<a href="${video}">${video}</a>`;
    }
}
Video.blotName = "video";
Video.className = "ql-video";
Video.tagName = "video"; // 用video标签替换iframe
export default Video;
