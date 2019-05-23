<template>
<div class="charts-border" style="height:500px;width:96%;margin-top:10px;">
  <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
</div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      option: {
        backgroundColor: "rgb(20, 58, 110)",
        color: ["#3cefff"],
        tooltip: {},
        grid: {
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "01月",
              "02月",
              "03月",
              "04月",
              "05月",
              "06月",
              "07月",
              "08月",
              "09月",
              "10月",
              "11月",
              "12月"
            ],
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              color: "#82b0ec"
            },
            axisLine: {
              lineStyle: {
                color: "#82b0ec"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#82b0ec"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#82b0ec"
              },
              formatter: "{value}%"
            },
            splitLine: {
              lineStyle: {
                color: "#0c2c5a"
              }
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 12,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}%"
              }
            },
            data: [60, 70, 80, 90, 60, 70, 80, 90]
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, 5],
            z: 12,
            data: [60, 70, 80, 90, 60, 70, 80, 90]
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            },
            barWidth: "20",
            data: [60, 70, 80, 90, 60, 70, 80, 90],
            markLine: {
              silent: true,
              symbol: "none",
              label: {
                position: "middle",
                formatter: "{b}"
              },
              data: [
                {
                  name: "目标值",
                  yAxis: 80,
                  lineStyle: {
                    color: "#ffc832"
                  },
                  label: {
                    position: "end",
                    formatter: "{b}\n {c}%"
                  }
                }
              ]
            }
          }
        ]
      }
    };
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
</style>

