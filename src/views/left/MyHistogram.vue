<template>
  <div class="mybar1">
    <v-chart :options="option1" :autoresize="true" style="height:300px;width:100%;"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

export default {
  data () {
    return {
      option1: {
        color: ['#3398DB'],
        title: {
          text: '柱状图',
          x: 'left',
          y: '5',
          textStyle: {
            color: '#50dde6'
          }
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
          data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        series : [{
          name:'直接访问',
          type:'bar',
          barWidth: '60%',
          data:[10, 52, 200, 334, 390, 330, 220]
        }]
      }
    }
  },
  mounted () {
    setInterval( () => {
      this.option1.series[0].data.shift();
      this.option1.series[0].data.push(this.random(100, 1000));
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
  border: 1px solid #50dde6;
  background: linear-gradient(to left, #50dde6, #50dde6) left top no-repeat, 
              linear-gradient(to bottom, #50dde6, #50dde6) left top no-repeat, 
              linear-gradient(to left, #50dde6, #50dde6) right top no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) right top no-repeat, 
              linear-gradient(to left, #50dde6, #50dde6) left bottom no-repeat,
              linear-gradient(to bottom, #50dde6, #50dde6) left bottom no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right bottom no-repeat,
              linear-gradient(to left, #50dde6, #50dde6) right bottom no-repeat;
  background-size: 3px 20px, 30px 3px, 3px 20px, 30px 3px;
  box-shadow:0 0 10px #fff inset;
}
</style>