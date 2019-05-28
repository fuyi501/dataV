<template>
<div class="charts-border" style="height:400px;width:100%;margin-top:10px;">
  <v-chart
      :options="option"
      :autoresize="true"
      theme="chartsTheme"
    />
</div>
</template>
<script>
var scale = 1;
var echartData = [
  {
    value: 2154,
    name: "西万路"
  },
  {
    value: 3854,
    name: "西门"
  },
  {
    value: 3515,
    name: "明德门"
  },
  {
    value: 3515,
    name: "草滩路"
  },
  {
    value: 3854,
    name: "朱宏路"
  },
  {
    value: 2154,
    name: "凤城十路"
  }
];
var rich = {
  yellow: {
    color: "#ffc72b",
    fontSize: 30 * scale,
    padding: [5, 4],
    align: "center"
  },
  total: {
    color: "#ffc72b",
    fontSize: 40 * scale,
    align: "center"
  },
  white: {
    color: "#fff",
    align: "center",
    fontSize: 24 * scale,
    padding: [11, 30]
  },
  blue: {
    color: "#49dff0",
    fontSize: 16 * scale,
    align: "center"
  },
  hr: {
    borderColor: "#0b5263",
    width: "100%",
    borderWidth: 1,
    height: 0
  }
};
export default {
  components: {},
  data() {
    return {
      option: {
        // backgroundColor: "#031f2d",
        title: {
          text: "违规总数",
          left: "center",
          top: "53%",
          padding: [24, 0],
          textStyle: {
            color: "#fff",
            fontSize: 18 * scale,
            align: "center"
          }
        },
        legend: {
          selectedMode: false,
          formatter: function(name) {
            var total = 0; //各科正确率总和
            var averagePercent; //综合正确率
            echartData.forEach(function(value, index, array) {
              total += value.value;
            });
            return "{total|" + total + "}";
          },
          data: [echartData[0].name],
          // data: ['高等教育学'],
          // itemGap: 50,
          left: "center",
          top: "center",
          icon: "none",
          align: "center",
          textStyle: {
            color: "#fff",
            fontSize: 16 * scale,
            rich: rich
          }
        },
        series: [
          {
            name: "违规总数",
            type: "pie",
            radius: ["42%", "50%"],
            hoverAnimation: false,
            color: [
              "#c487ee",
              "#deb140",
              "#49dff0",
              "#034079",
              "#6f81da",
              "#00ffb4"
            ],
            label: {
              normal: {
                formatter: function(params, ticket, callback) {
                  var total = 0; //考生总数量
                  var percent = 0; //考生占比
                  echartData.forEach(function(value, index, array) {
                    total += value.value;
                  });
                  percent = (params.value / total * 100).toFixed(1);
                  return (
                    "{white|" +
                    params.name +
                    "}\n{hr|}\n{yellow|" +
                    params.value +
                    "}\n{blue|" +
                    percent +
                    "%}"
                  );
                },
                rich: rich
              }
            },
            labelLine: {
              normal: {
                length: 55 * scale,
                length2: 0,
                lineStyle: {
                  color: "#0b5263"
                }
              }
            },
            data: echartData
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

