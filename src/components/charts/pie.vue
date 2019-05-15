<template>
  <div class="mypie1" :style="{height: pieHeight, width: pieWidth}">
    <v-chart
      :options="pie"
      :theme="pieTheme"
      :autoresize="true"
    />
  </div>
</template>

<script>

export default {
  name: 'ChartPie',
  props: {
    text: {
      type: String,
      default: '饼图组件'
    },
    subtext: {
      type: String,
      default: ''
    },
    legendData: Array,
    seriesData: Array,
    pieHeight: {
      type: String,
      default: '300px'
    },
    pieWidth: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      pieTheme: 'walden',
      pie : {
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
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          top: '40',
          textStyle: {
            color: '#fff'
          },
          data: this.legendData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.mypie1 {
  padding:0 20px;
  height:300px;
  width: 90%;
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