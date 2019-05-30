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
加油岛服务时间
*/
export default {
  props: {
    refuelServiceName: {
      type: Array
    },
    refuelServiceTime: {
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
          data: this.refuelServiceName,
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
            // name: "在线率",
            type: "line",
            // data: this.enterPersonsData,
            data: this.refuelServiceTime,
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
  }
};
</script>

<style lang="less">
</style>

