<template>
  <div class="myline1">
    <v-chart
      :options="option"
      :autoresize="true"
      :theme="lineTheme"
      style="height:300px;width:100%;"
    />
  </div>
</template>

<script>
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

import 'echarts/theme/walden'

// import theme from '@/views/theme/theme.json'
// registering custom theme
// ECharts.registerTheme('walden', theme)

export default {
  data () {
    return {
      lineTheme: 'walden',
      option : {
        title: {
          text: '条形图',
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
        grid: {
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  mounted () {
    setInterval( () => {
      this.option.series[0].data.shift();
      this.option.series[0].data.push(this.random(100, 1000));
    }, 3000)
  },
  methods: {
    random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower)) + lower;
    }
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
  background-color: #0d4879;
}
</style>