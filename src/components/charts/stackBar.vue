<template>
  <div :style="{height: barHeight, width: barWidth}">
    <v-chart
      :options="stackBarOption"
      :autoresize="true"
      theme="chartsTheme"/>
  </div>
</template>

<script>

export default {
  name: 'ChartBar',
  props: {
    xAxisData: Array,
    seriesData: {
      type: Array,
      default: []
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
    barHeight: {
      type: String,
      default: '300px'
    },
    barWidth: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      stackBarOption: {
        title: { // 标题
          text: this.text,  // 主标题
          subtext: this.subtext,  // 副标题
        },
        // 坐标轴指示器
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴触发
            type : 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 图例组件
        legend: {
          orient: 'horizontal',  // 图例列表的布局朝向。vertical 垂直
          top: '40',  // 图例组件离容器上侧的距离。
          itemGap: 20,
          data: this.legendData
        },
        xAxis : [{
          type : 'category',
          data : this.xAxisData,
        }],
        yAxis : [{
          type : 'value', // 坐标轴类型
        }],
        series : this.seriesData
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
