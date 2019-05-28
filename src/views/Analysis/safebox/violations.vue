<template>
  <chart-line
    :text="title"
    :xAxisData="xAxisData"
    :legendData="legendData"
    :seriesData="[...seriesData]"
    style="margin:0 auto;" lineWidth="100%" lineHeight="460px"
    :boundaryGap="false"
  />
</template>
<script>
/*
保险柜违规次数
总的违规次数，各事件违规次数，事件包括：['开启保险柜', '关闭保险柜', '保险柜打开', '开启钱箱']
*/
import { ChartLine } from "@/components/charts" // 图表组件

export default {
  components: {
    ChartLine
  },
  props: {
    title: String,
    xAxisData: Array,
    legendData: Array,
    seriesData: Array
  }
}
</script>

<style lang="less">

</style>

