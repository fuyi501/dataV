<template>
  <div class="mybar1" :style="{height: barHeight, width: barWidth}">
    <v-chart
      :options="option1"
      :autoresize="true"
      style="height:100%;width:100%;"/>
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
      option1: {
        barTheme: 'walden',
        color: ['#3398DB'],
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
          axisPointer : {  // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'  // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [{
          type : 'category',
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
          data : this.xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis : [{
          type : 'value',
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
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
.mybar1 {
  margin: 0 auto;
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