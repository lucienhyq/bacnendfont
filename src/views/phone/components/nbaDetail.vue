<template>
  <div class="nbaDetail">
    <div class="topPoster">
      <div class="headTitle">{{ detailInfo.title }}</div>
      <div class="detail_conten">
        <img :src="detailInfo.poster" alt="" v-if="detailInfo.conten" />
        <video
          ref="video"
          id="videoB"
          class="videoBox"
          controls
          webkit-playsinline="true"
          playsinline="true"
          x5-video-ignore-metadata="true"
          :poster="detailInfo.poster"
          autoplay
        ></video>
        <div v-if="detailInfo.conten" v-html="detailInfo.conten"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Hls from "hls.js";
export default {
  data() {
    return {};
  },
  props: {
    detailInfo: {
      type: null,
      default: [],
    },
  },
  watch: {
    detailInfo: function (res) {
      console.log(this.detailInfo.videoSrc, "wwwwwwwwwwww");
      setTimeout(() => {
        if (Hls.isSupported()) {
          let hls = new Hls();
          hls.loadSource(this.detailInfo.videoSrc);
          hls.attachMedia(this.$refs.video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            // this.$refs.video.play();
          });
        } else if (
          this.$refs.video.canPlayType("application/vnd.apple.mpegurl")
        ) {
          this.$refs.video.src = this.detailInfo.videoSrc;
          this.$refs.video.addEventListener("loadedmetadata", () => {
            // this.$refs.video.play();
          });
        }
      }, 1000);
      // },
    },
    methods: {
      getVideoSrc() {},
    },
    mounted() {},
  },
};
</script>
<style lang="scss" scoped>
.nbaDetail {
  padding-bottom: 4rem;
  .topPoster {
    .videoBox {
      width: 100%;
      height: auto;
    }
    img {
      width: 100%;
      height: auto;
    }
    .headTitle {
      font-size: 1.3rem;
      text-align: left;
      font-weight: bold;
      background: #fff;
      line-height: 3rem;
      padding: 0.5rem;
    }
    .detail_conten {
      padding: 0 0.625rem;
      box-sizing: border-box;
    }
  }
}
</style>
