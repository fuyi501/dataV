<template>
  <div :style="{height: '320px', width: '96%'}">
    <v-chart
      :options="lineOption"
      :autoresize="true"
      theme="chartsTheme"
    />
  </div>
</template>
<script>

import { ChartLine } from "@/components/charts" // 图表组件

export default {
  components: {
    ChartLine
  },
  props: {
    violateData: Object
  },
  data () {
    return {
      lineOption: {
        title: {
          text: this.violateData.title,
          // subtext: this.subtext
        },
        // 坐标轴指示器
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴触发
            type : 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          // left: 'left',
          data: this.violateData.legendData
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.violateData.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{ name: '收银台', data: this.violateData.seriesDataCheckout, type: 'line', areaStyle: {} },
          { name: '加油区', data: this.violateData.seriesDataRefuel, type: 'line', areaStyle: {} },
          { name: '保险柜', data: this.violateData.seriesDataSafebox, type: 'line', areaStyle: {} },
          { name: '卸油口', data: this.violateData.seriesDataUnload, type: 'line', areaStyle: {} }]
      }
    }
  },
  watch: {
    violateData: {
      deep: true,
      handler (value) {
        console.log('++++++++++新的值：', value)
        this.lineOption.xAxis.data = value.xAxisData
        this.lineOption.series[0].data = value.seriesDataCheckout
        this.lineOption.series[1].data = value.seriesDataRefuel
        this.lineOption.series[2].data = value.seriesDataSafebox
        this.lineOption.series[3].data = value.seriesDataUnload
      }
    }
  }
}
</script>

<style lang="less">

</style>

