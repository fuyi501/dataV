<template>
  <div style="height:320px;width:100%;">
    <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
  </div>
</template>
<script>
// 查询加油区实时服务车辆和服务时间
export default {
  props: {
    serviceCarsData: Array,
    serviceTimeData: Array,
    axisDataList: Array
  },
  data() {
    return {
      option: {
        title: {
          text: "加油区服务车辆及服务时间变化",
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["服务车辆", "平均服务时间"]
        },
        grid: {
          right: "6%"
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: [{
          type: "category",
          // boundaryGap: false,
          // data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
          data: this.axisDataList,
        }],
        yAxis: [{
          type: "value",
          // name: '服务车辆',
          axisLabel: {
            formatter: "{value} 辆"
          }
        },{
          type: "value",
          show: true,
          // name: '平均服务时间',
          axisLabel: {
            formatter: "{value} 分"
          },
          axisTick: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              width: 1
            }
          }
        }],
        series: [
          {
            name: "服务车辆",
            type: "bar",
            data: this.serviceCarsData,
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "平均服务时间",
            type: "line",
            yAxisIndex: 1, // 多个 y 轴时使用
            data: this.serviceTimeData,
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            markLine: {
              data: [
                { type: "average", name: "平均值" }
              ]
            }
          }
        ]
      }
    }
  },
  watch: {
    axisDataList: {
      deep: true,
      handler (value) {
        this.option.xAxis[0].data = value
      }
    },
    serviceCarsData: {
      deep: true,
      handler (value) {
        this.option.series[0].data = value
      }
    },
    serviceTimeData: {
      deep: true,
      handler (value) {
        this.option.series[1].data = value
      }
    }
  }
}
</script>

<style lang="less">
</style>

