<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con" :style="{background: cardColor}">
      <div class="right-area" :style="{background: cardColor, width: cardWidth}">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'InforCard2',
  components: {
  },
  props: {
    cardWidth: {
      type: Number,
      default: 44
    },
    cardColor: { // 文字背景色
      type: String,
      default: '#fff'
    },
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
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
    .right-area{
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
</style>
