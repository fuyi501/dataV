<template>
  <div style="width:100%;height:470px;">
    <!-- <p>卸油口</p> -->
    <unload-count
      :xieyoukouOpen="xieyoukouOpen"
      :youguancheDao="youguancheDao"
      :xiaofang="xiaofang"
      >
    </unload-count>
    <violations style="width:100%;height:360px;"
      :heguiData="heguiData"
      :weiguiData="weiguiData"
      :heguilvData="heguilvData">
    </violations>
  </div>
</template>

<script>
/*
保险柜图表统计总设计页面
1.  违规次数 violations.vue
    总的违规次数，各事件违规次数，事件包括：['开启保险柜', '关闭保险柜', '保险柜打开', '开启钱箱']

*/
import axios from 'axios'
import dayjs from 'dayjs'
import constData from '@/util/constData' // 保存的常量

import Violations from './violations'
import UnloadCount from './unloadCount'

export default {
  components: {
    Violations,
    UnloadCount
  },
  props: {
    // 选择的站点名称
    selectedData: {
      type: Object,
      default: () => new Object({station: 'xiwan', dateTime: 'today'})
    }
  },
  data () {
    return {
      groupType: "hour", // 查询类型
      today_start: "", // 今天的开始时间
      today_end: "", // 截止到现在的时间点
      heguiData: [],
      weiguiData: [],
      heguilvData: [],

      xieyoukouOpen: 0,
      youguancheDao: 0,
      xiaofang: ''
    }
  },
  watch: {
    selectedData: {
      deep: true,
      handler (value) {
        console.log('卸油口深度检测……%%%%%%%%%%%%…新的值：', value)

        this.heguiData = []
        this.weiguiData = []
        this.heguilvData = []
        this.today_start = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
        this.today_end = dayjs().format("YYYY-MM-DD HH:mm:ss");
        this.getViolationsData(this.groupType,this.today_start,this.today_end,this.selectedData.station,"unload");
        this.getInforCardData(this.groupType,this.today_start,this.today_end,this.selectedData.station,"unload");
      }
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
    this.today_end = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.getViolationsData(this.groupType,this.today_start,this.today_end,this.selectedData.station,"unload");
    this.getInforCardData(this.groupType,this.today_start,this.today_end,this.selectedData.station,"unload");
  },
  methods: {
    // 获取当天保险柜违规数据
    getViolationsData(
      groupType,
      start_time,
      end_time,
      station,
      category,
      action = ["接油管操作", "员工离开", "非法入侵", "水溶法检测操作", "卸油口巡检"],
      status = ['合规', '违规']
    ) {
      // 1. 初始化坐标轴数据为空
      // for (let i = 0; i < status.length; i++) {
      //   // 1. 需要修改添加的数据
      //   this.option.series[i].data = [];
      // }
      console.log("getViolationsData", start_time, end_time, station, action, status);
      // 当前小时时间点
      // let nowHour = Number(end_time.slice(11, 13))

      let apiList = status.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    strict: 1, // 严格模式
                    group: groupType,
                    start_time: start_time,
                    end_time: end_time,
                    station: station,
                    category: category,
                    actions: action.join(","),
                    status: ele,
                  }
                })
      })
      // 计算违规和合规数据
      axios.all(apiList)
        .then(axios.spread((heguiResData, weiguiResData) => {

          console.log("卸油口违规事件查询：", heguiResData, weiguiResData);
          // 计算违规率
          for(let i in action) {
            this.weiguiData.push(weiguiResData.data.data.actions[action[i]].total)
            this.heguiData.push(heguiResData.data.data.actions[action[i]].total)
            if (!this.weiguiData[i] && !this.heguiData[i]){
              this.heguilvData.push(0)
            }else {
              this.heguilvData.push((this.weiguiData[i] / (this.heguiData[i] + this.weiguiData[i]))*100)
            }
          }
          console.log('卸油口查到的数据：', this.weiguiData, this.heguiData, this.heguilvData)
        }));
    },
    // 查询卸油口开启，油罐车到达，消防器材
    getInforCardData(groupType, start_time, end_time, station, category, actions=['卸油口开启', '油罐车到达', '已放置消防器材']) {
      console.log('getInforCardData', start_time, end_time, station, category)

      axios.get('http://10.202.5.9:5123/datacenter/statistic', {
        params: {
          strict: 1, // 严格模式
          group: groupType,
          start_time: start_time,
          end_time: end_time,
          station: station,
          category: category,
          actions: actions.join(",")
        }
      }).then((res) => {
          console.log('卸油口开启：', res)

          this.xieyoukouOpen = res.data.data.actions[actions[0]].total
          this.youguancheDao = res.data.data.actions[actions[2]].total
          this.xiaofang = res.data.data.actions[actions[1]].total > 0 ? '已放置': '未监测到'


      });
    }
  }
}
</script>

<style lang="less">

</style>

