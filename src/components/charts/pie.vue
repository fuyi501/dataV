<template>
  <div class="" :style="{height: pieHeight, width: pieWidth}">
    <v-chart
      :options="pieOption"
      theme="chartsTheme"
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
    },
    legendOrient: {
      type: String,
      default: 'vertical'
    },
    legendLeft: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      pieOption : {
        title: {
          text: this.text,
          subtext: this.subtext
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: this.legendOrient,
          left: this.legendLeft,
          data: this.legendData
        },
        series: [
          {
            name: '事件分布',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '60%'],
            data: this.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                formatter: "{b}\n{c}次 ({d}%)"
                // offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],

              }
            },
          },
          {
            name: '事件分布',
            type: 'pie',
            radius: ['0%', '30%'],
            center: ['50%', '60%'],
            data: [
              {value: 200, name: '合规', selected: true},
              {value: 600, name: '违规'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: true,
                position: "inner"

              }
            },
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

</style>