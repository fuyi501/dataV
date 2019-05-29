<template>
  <div style="height:220px;width:100%;margin-top:5px">
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
    onlineRateData: {
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
          text: "站长在线率"
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["在线率"]
        // },
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
          data: this.axisDataList,
        },
        yAxis: [{
          type: "value",
          // max: 100,
          // name: '在线率',
          axisLabel: {
            formatter: "{value}%"
          }
        }],
        series: [
          {
            name: "在线率",
            type: "line",
            data: this.onlineRateData,
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
    onlineRateData: {
      deep: true,
      handler (value) {
        // console.log('进店人数新的值：', value)
        this.option.series[0].data = value
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

