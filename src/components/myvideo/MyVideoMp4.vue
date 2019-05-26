<template>
  <video-player class="vjs-custom-skin"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname">
  </video-player>
</template>

<script>
import 'videojs-flash'
export default {
  name: 'myvideomp4', // 不能使用 video 命名
  props: {
    src: {
      type: String,
      default: 'http://vjs.zencdn.net/v/oceans.mp4'
    }
  },
  data () {
    return {
      playerOptions: {
        // height: '120',
        // width: '260',
        sources: [ {
          type: 'video/mp4',
          src: this.src
        } ],
        autoplay: true, // 自动播放
        // controls: true, // 控制条
        fluid: true, // 按比例缩放适应容器
        // preload: 'auto', // 预加载
        muted: true, // 消除所有音频
        // loop: false, // 循环播放
        aspectRatio: "16:9",
        // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg' //首屏图片
      }
    }
  }
}
</script>
