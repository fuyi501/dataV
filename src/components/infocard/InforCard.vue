<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con" :style="{background: rightColor}">
      <div class="left-area" :style="{background: leftColor, width: leftWidth}">
        <common-icon class="icon" :type="icon" :size="iconSize" color="#fff"/>
      </div>
      <div class="right-area" :style="{background: rightColor, width: rightWidth}">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import CommonIcon from '../commonicon/CommonIcon.vue'
export default {
  name: 'InforCard',
  components: {
    CommonIcon
  },
  props: {
    left: {
      type: Number,
      default: 44
    },
    leftColor: { // 左侧图标背景色
      type: String,
      default: '#2d8cf0'
    },
    rightColor: { // 右侧文字背景色
      type: String,
      default: '#fff'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    leftWidth () {
      return `${this.left}%`
    },
    rightWidth () {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less">
.common{
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size{
  width: 100%;
  height: 100%;
}
.middle-center{
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper{
  .size;
  overflow: hidden;
  .ivu-card-body{
    .size;
  }
  .content-con{
    .size;
    position: relative;
    .left-area{
      .common;
      & > .icon{
        .middle-center;
      }
    }
    .right-area{
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
</style>
