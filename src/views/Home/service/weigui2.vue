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
import axios from 'axios'
import dayjs from 'dayjs'
import constData from '@/util/constData' // 保存的常量

var scale = 1;
var echartData = [
  {name: '西万路', en: 'xiwan', value: 0, score: 0},
  {name: '西门', en: 'ximen', value: 0, score: 0},
  {name: '明德门', en: 'mingdemen', value: 0, score: 0},
  {name: '草滩路', en: 'caotan', value: 0, score: 0},
  {name: '朱宏路', en: 'zhuhong', value: 0, score: 0},
  {name: '凤城十路', en: 'fengchengshilu', value: 0, score: 0}
]
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
          text: "现场管理评分",
          left: "center",
          top: "50%",
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
            let total = 0; // 总的评分
            let count = 0; // 有数据的有多少个
            echartData.forEach(function(value, index, array) {
              // console.log(value, typeof(value.score))
              if(typeof(value.score)==='number'){
                count++
                total += value.score
              }
            })
            // console.log('计算：', total, count)
            total = (total/count).toFixed(2)
            return "{total|" + total + "}";
          },
          data: [echartData[0].name],
          // data: ['高等教育学'],
          // itemGap: 50,
          left: "center",
          top: "40%", // 中间分数位置
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
            // color: [
            //   "#c487ee",
            //   "#deb140",
            //   "#49dff0",
            //   "#034079",
            //   "#6f81da",
            //   "#00ffb4"
            // ],
            label: {
              normal: {
                formatter: function(params) {
                  // var total = 0; //服务平均分
                  // var percent = 0; //
                  // echartData.forEach(function(value, index, array) {
                  //   total += value.value;
                  // });
                  // percent = (params.value / total * 100).toFixed(1);
                  // console.log(params)
                  // let
                  return (
                    "{white|" +
                    params.name +
                    "}\n{hr|}\n{yellow|" +
                    params.data.score +
                    "}{blue|" +
                    // percent +
                    "分}"
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
      },

    }
  },
  watch: {},
  mounted() {
    this.getCheckoutPersons()
    setInterval(()=>{
      this.getCheckoutPersons()
    }, 3000)
  },
  methods: {
    // 获取服务评分
    getCheckoutPersons(station='') {
      axios.get('http://10.202.5.9:5123/datacenter/composite_index/now', {
          params: {
            station: station
          }
        }).then((res) => {
        console.log('主页---------服务评分查询：', res)
        let resData = res.data.data
        for(let i in echartData){
          if(resData[echartData[i].en] !== undefined){
            echartData[i].score = resData[echartData[i].en].score
          }else {
            echartData[i].score = '暂无'
          }
        }
      })
    }
  }
};
</script>

<style lang="less">
</style>

