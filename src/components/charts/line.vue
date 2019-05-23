<template>
  <div class="charts-border" :style="{height: lineHeight, width: lineWidth}">
    <v-chart
      :options="lineOption"
      :autoresize="true"
      theme="chartsTheme"
    />
  </div>
</template>

<script>
export default {
  name: 'ChartLine',
  props: {
    xAxisData: Array,
    seriesData: {
      type: Array,
      default: [] // 如果报错，则写成： () => []
    },
    text: {
      type: String,
      default: '条形图组件'
    },
    subtext: {
      type: String,
      default: ''
    },
    legendData: Array,
    boundaryGap: { // 数据从坐标轴起始
      type: Boolean,
      default: true
    },
    lineHeight: {
      type: String,
      default: '300px'
    },
    lineWidth: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      lineOption: {
        title: {
          text: this.text,
          subtext: this.subtext
        },
        // 坐标轴指示器
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴触发
            type : 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.legendData
        },
        xAxis: {
          type: 'category',
          boundaryGap: this.boundaryGap,
          data: this.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: this.seriesData
      }
    }
  },
  mounted () {
    //
  },
  methods: {
    //
  }
}
</script>

<style scoped>

</style>