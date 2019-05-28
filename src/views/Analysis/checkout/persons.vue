<template>
  <div style="height:360px;width:100%;margin-top:10px;">
    <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
  </div>
</template>
<script>
/*
收银台进店人数，服务人数对比
*/
export default {
  props: {
    servicePersonsData: {
      type: Array
    },
    enterPersonsData: {
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
          text: "收银台进店人数和服务人数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["进店人数", "服务人数"]
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
          right: '10%'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.axisDataList,
        },
        yAxis: [{
          type: "value",
          name: '人数',
          axisLabel: {
            formatter: "{value} 人"
          }
        }],
        series: [
          {
            name: "进店人数",
            type: "line",
            data: this.enterPersonsData,
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
            name: "服务人数",
            type: "line",
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
          }
        ]
      }
    }
  },
  watch: {
    enterPersonsData: {
      deep: true,
      handler (value) {
        // console.log('进店人数新的值：', value)
        this.option.series[0].data = value
      }
    },
    servicePersonsData: {
      deep: true,
      handler (value) {
        // console.log('服务人数新的值：', value)
        this.option.series[1].data = value
      }
    },
    axisDataList: {
      deep: true,
      handler (value) {
        this.option.xAxis.data = value
      }
    }
  }
};
</script>

<style lang="less">
</style>

