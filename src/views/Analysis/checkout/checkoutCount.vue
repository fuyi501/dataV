<template>
  <div style="text-align:center;">
    <div v-for="(item, index) in countData" :key="index" class="countSum" :style="{width: countWidth}">
      <div class="countTitle">{{item.title}}</div>
      <div class="countContent">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countWidth: {
      type: String,
      default: '160px'
    },
    countData: {
      type: Array
    }
  }
}
</script>

<style lang="less">
.countSum {
  display: inline-block;
  padding: 0px;
  margin: 0px;
  color: #20D1D2;
  height: 60px;
  vertical-align: middle;
  border: 1px solid #1081B2;
  border-radius: 4px;
}
.countTitle {
  font-size: 1.0rem;
  height: 18px;
  line-height: 18px;
  color: #fff;
}
.countContent {
  font-size: 1.2rem;
  height: 3rem;
  line-height: 3rem;
}
</style>

