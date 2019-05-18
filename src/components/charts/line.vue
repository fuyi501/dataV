<template>
  <div class="myline1" :style="{height: lineHeight, width: lineWidth}">
    <v-chart
      :options="option"
      :autoresize="true"
      :theme="lineTheme"
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
      lineTheme: 'walden',
      option : {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'left',
          y: '5',
          textStyle: {
            color: '#50dde6'
          }
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: 'horizontal',
          top: '40',
          textStyle: {
            color: '#fff'
          },
          data: this.legendData
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: this.boundaryGap,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'white',
              fontSize: '10'
            }
          },
          data: this.xAxisData
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'white',
              width: '1'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'white',
              fontSize: '10'
            }
          },
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
.echarts {
  width: 100%;
  height: 100%;
}
.myline1 {
  padding:0px 20px;
  background: linear-gradient(to left, #50dde6, #50dde6) left top no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) left top no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right top no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) right top no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) left bottom no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) left bottom no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right bottom no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right bottom no-repeat;
  background-size: 3px 20px, 30px 3px, 3px 20px, 30px 3px;
  /* box-shadow:0 0 10px #fff inset; */
  /* border: 1px solid #50dde6; */
  /* background-color: #0d4879; */
  background-color: rgba(13, 72, 121, 0.3);
}
</style>