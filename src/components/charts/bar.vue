<template>
  <div class="mybar1" :style="{height: barHeight, width: barWidth}">
    <v-chart
      :options="barOption"
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
      // 这里可以定制化一些配置
      barOption: {
        title: { // 标题
          text: this.text,  // 主标题
          subtext: this.subtext,  // 副标题
        },
        // 图例组件
        legend: {
          data: this.legendData
        },
        // 坐标轴指示器
        tooltip : {
          trigger: 'axis',
          axisPointer : { // 坐标轴触发
            type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        "grid": {
          "left": "4%",
          "right": "4%",
          "bottom": "3%",
          "containLabel": true
        },
        xAxis : [{
          type : 'category',
          data : this.xAxisData,
        }],
        yAxis : [{
          type : 'value', // 坐标轴类型
        }],
        series : this.seriesData
        // series : [{
        //   name:'最高气温', // 系列名称
        //   type:'bar', // 类型
        //   data:[11, 11, 15, 13, 12, 13, 10],
        //   label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
        //     show: true,
        //     color: 'red',
        //     fontSize: 16
        //   },
        //   markPoint: { // 图表标注点。
        //     data: [
        //       {type: 'max', name: '最大值'},
        //       {type: 'min', name: '最小值'},
        //       {type: 'average', name: '平均值'}
        //     ]
        //   },
        //   markLine: { // 图表标线。
        //     data: [
        //       {type: 'max', name: '最大值'},
        //       {type: 'min', name: '最小值'},
        //       {type: 'average', name: '平均值'}
        //     ]
        //   }
        // }],
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
