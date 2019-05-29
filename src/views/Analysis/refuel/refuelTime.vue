<template>
  <div style="height:300px;width:100%;margin-top:5px">
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
          text: "加油岛服务时间"
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
          // data: this.axisDataList,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: [{
          type: "value",
          // max: 100,
          // name: '在线率',
          axisLabel: {
            formatter: "{value}"
          }
        }],
        series: [
          {
            name: "在线率",
            type: "line",
            // data: this.enterPersonsData,
            data: [82, 92, 91, 34, 90, 30, 20],
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

