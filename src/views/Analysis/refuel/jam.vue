<template>
  <div style="height:300px;width:100%;">
    <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
  </div>
</template>
<script>
export default {
  props: {
    jamIndex: {
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
          text: "加油区拥堵指数",
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["拥堵指数"]
        // },
        visualMap: {
          top: 10,
          right: 10,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          pieces: [{
            gt: 0,
            lte: 1,
            color: '#096',
            label: '畅通'
          }, {
            gt: 1,
            lte: 2,
            color: '#ffde33',
            label: '轻度拥堵'
          }, {
            gt: 2,
            lte: 3,
            color: '#ff9933',
            label: '中度拥堵'
          }, {
            gt: 3,
            lte: 4,
            color: '#cc0033',
            label: '严重拥堵'
          }],
          outOfRange: {
            color: '#cc0033'
          }
        },
        grid: {
          right: "8%"
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: this.axisDataList
        },
        yAxis: [{
          type: "value",
          name: '拥堵指数',
          axisLabel: {
            formatter: "{value}"
          }
        }],
        series: [
          {
            name: "拥堵指数",
            type: "line",
            data: this.jamIndex,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      }
    }
  },
  watch: {
    jamIndex: {
      deep: true,
      handler (value) {
        console.log('加油区拥堵指数新的值：', value)
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
}
</script>

<style lang="less">
</style>

