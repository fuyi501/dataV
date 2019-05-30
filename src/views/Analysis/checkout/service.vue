<template>
  <div style="height:300px;width:100%;margin-top:5px;">
    <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
  </div>
</template>
<script>
/*
收银台服务人数，服务时间，平均服务时间
*/
export default {
  components: {},
  props: {
    servicePersonsData: {
      type: Array
    },
    avgServiceTimeData: {
      type: Array
    },
    axisDataList: {
      type: Array
    }
  },
  data() {
    return {
      option: {
        title: {
          text: "收银台服务人数及时间变化",
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["服务人数", "平均服务时间"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: '4%',
          right: '6%'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
          data: this.axisDataList,
        },
        yAxis: [{
          type: "value",
          name: '服务人数',
          axisLabel: {
            formatter: "{value} 人"
          }
        },{
          type: "value",
          show: true,
          name: '平均服务时间',
          axisLabel: {
            formatter: "{value} 秒"
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
            name: "服务人数",
            type: "bar",
            data: this.servicePersonsData,
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
            data: this.avgServiceTimeData,
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
    };
  },
  watch: {
    servicePersonsData: {
      deep: true,
      handler (value) {
        // console.log('服务人数新的值：', value)
        this.option.series[0].data = value
      }
    },
    avgServiceTimeData: {
      deep: true,
      handler (value) {
        // console.log('平均服务时间新的值：', value)
        this.option.series[1].data = value
      }
    },
    axisDataList: {
      deep: true,
      handler (value) {
        // console.log('x轴新的值：', value)
        this.option.xAxis.data = value
      }
    }
  }
}
</script>

<style lang="less">
</style>

