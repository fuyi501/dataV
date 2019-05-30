<template>
  <v-chart
    :options="option"
    :autoresize="true"
    theme="chartsTheme"
  />
</template>
<script>
var personSymbol = "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC"
import axios from 'axios'
import dayjs from 'dayjs'
import constData from '@/util/constData' // 保存的常量

export default {
  components: {},
  data() {
    return {
      option: {
        color: ['#16DDFD', '#16DDFD'],
        title: {
          text: '各站点服务人数 (Top6)'
        },
        tooltip: {},
        xAxis: {
          show: false,
          // max: maxData,
          splitLine: { show: false },
          offset: 10,
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          axisLabel: {
            margin: 10
          }
        },
        yAxis: {
          data: ["西万路", "西门", "明德门", "朱宏路", "草滩路", "凤城十路"],
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            // textStyle: {
            //   color: "#999",
            //   fontSize: 16
            // }
          }
        },
        grid: {
          top: "50",
          // height: 320,
          left: '1%',
          right: '10%'
        },
        series: [
          {
            // current data
            type: "pictorialBar",
            symbol: personSymbol,
            symbolRepeat: "fixed",
            symbolMargin: "-3",
            symbolClip: true,
            symbolSize: 30,
            // symbolBoundingData: maxData,
            data: [100, 100, 100, 100, 100, 100],
            z: 10
          },
          {
            // full data
            type: "pictorialBar",
            itemStyle: {
              normal: {
                opacity: 0.2
              }
            },
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  return params.value
                },
                position: "right",
                offset: [10, 0],
                textStyle: {
                  color: "white",
                  fontSize: 18
                }
              }
            },
            animationDuration: function (idx) {
              // 越往后的数据延迟越大
              return idx * 100;
            },
            symbolRepeat: "fixed",
            symbolMargin: "-3",
            symbol: personSymbol,
            symbolSize: 30,
            // symbolBoundingData: maxData,
            data: [100, 100, 100, 100, 100, 100],
            z: 5
          }
        ]
      },
      servicePersonsList: [
        {name: '西万路', value: 0},
        {name: '西门', value: 0},
        {name: '明德门', value: 0},
        {name: '草滩路', value: 0},
        {name: '朱宏路', value: 0},
        {name: '凤城十路', value: 0},
      ],
      stations: ['xiwan','ximen','mingdemen','caotan','fengchengshilu','zhuhong']
    }
  },
  watch: {},
  mounted() {

    this.startTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.endTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getCheckoutPersons('hour', '1', this.startTime, this.endTime, this.stations, 'checkout')

    // setInterval(()=>{
    //   this.servicePersonsList[Math.round(Math.random()*5)].value += Math.round(Math.random()*100)
    //   this.servicePersonsList = this.servicePersonsList.sort((a, b) => b.value-a.value)
    //   // console.log(this.servicePersonsList)
    //   this.servicePersonsList.map((element, index) => {
    //     // console.log(element, index)
    //     this.option.yAxis.data.splice(index, 1, element.name)
    //     this.option.series[0].data.splice(index, 1, element.value)
    //     this.option.series[1].data.splice(index, 1, element.value)
    //   })
    // }, 3000)

  },
  methods: {
    // 获取收银台服务人数
    getCheckoutPersons(groupType, interval, start_time, end_time, stations, category) {

      let apiList = stations.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/service/statistic', {
                  params: {
                    group: groupType,
                    start_time: start_time,
                    end_time: end_time,
                    station: ele,
                    category: category
                  }
                })
      })

      axios.all(apiList).then(axios.spread((...res) => {
        console.log('主页---------服务人数查询：', ...res)
        let resData = [...res]
        for(let i in resData) {
          this.servicePersonsList[i].name = constData.stationList2[stations[i]]
          this.servicePersonsList[i].value = resData[i].data.data.count_all
        }
        // console.log(this.servicePersonsList)

        // 排序动态刷新
        this.servicePersonsList = this.servicePersonsList.sort((a, b) => b.value-a.value)
        // console.log(this.servicePersonsList)
        this.servicePersonsList.map((element, index) => {
          // console.log(element, index)
          this.option.yAxis.data.splice(index, 1, element.name)
          this.option.series[0].data.splice(index, 1, element.value)
          this.option.series[1].data.splice(index, 1, element.value === 0 ? 1:element.value)
        })
      }))
    }
  }
};
</script>

<style lang="less">
</style>

