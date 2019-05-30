<template>
<div class="charts-border" style="height:400px;width:100%;">
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
        title: {
          text: "各站点服务人数",
          // left: "left",
          y: "10",
          // textStyle: {
          //   color: "#fff"
          // }
        },
        // backgroundColor: "#101a3c",
        grid: {
          left: "4%",
          top: "10%",
          bottom: 10
        },
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 12
          },
          formatter: "{b0}:{c0}"
        },
        xAxis: {
          max: 300,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis:
        {
          type: "category",
          inverse: false,
          data: [
            "西门",
            "西万路",
            "明德门",
            "草滩路",
            "凤城十路",
            "朱宏路"
          ],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: -4,
            textStyle: {
              color: "#fff",
              fontSize: 16.25
            }
          }
        },
        series: [
          {
            type: "pictorialBar",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbolClip: true,
            symbolSize: 22.5,
            symbolPosition: "start",
            symbolOffset: [20, 0],
            // symbolBoundingData: 300,
            data: [113, 42, 67, 81, 86, 94],
            z: 10
          },
          {
            type: "pictorialBar",
            itemStyle: {
              normal: {
                opacity: 0.3
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
                  color: "green",
                  fontSize: 18
                }
              }
            },
            animationDuration: 0,
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbol:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
            symbolSize: 22.5,
            // symbolBoundingData: 300,
            symbolPosition: "start",
            symbolOffset: [20, 0],
            data: [113, 42, 67, 81, 86, 94],
            z: 5
          }
        ],
        servicePersonsList: [
          {name: '西万路', value: 100},
          {name: '西门', value: 100},
          {name: '明德门', value: 100},
          {name: '草滩路', value: 100},
          {name: '朱宏路', value: 100},
          {name: '凤城十路', value: 100},
        ]
      }
    };
  },
  mounted() {
    this.servicePersonsList = this.servicePersonsList.sort((a, b) => b.value-a.value)
    // console.log(this.servicePersonsList)
    this.servicePersonsList.map((element, index) => {
      // console.log(element, index)
      this.option.yAxis.data.splice(index, 1, element.name)
      this.option.series[0].data.splice(index, 1, element.value)
      this.option.series[1].data.splice(index, 1, element.value)
    })
    setInterval(()=>{
      this.servicePersonsList[Math.round(Math.random()*5)].value += Math.round(Math.random()*100)
      this.servicePersonsList = this.servicePersonsList.sort((a, b) => b.value-a.value)
      // console.log(this.servicePersonsList)
      this.servicePersonsList.map((element, index) => {
        // console.log(element, index)
        this.option.yAxis.data.splice(index, 1, element.name)
        this.option.series[0].data.splice(index, 1, element.value)
        this.option.series[1].data.splice(index, 1, element.value)
      })
    }, 3000)
  },
  methods: {

  }
};
</script>

<style lang="less">
</style>

