<template>
  <!-- <Row :gutter="20" style="margin: 10px 10px;">
    <i-col :span="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
      <div style="left:50%;position: relative;">
        <infor-card2 shadow :cardColor="infor.rightColor">
          <count-to :end="infor.count" count-class="count-style"></count-to>
          <p style="color:#fff;font-size:18px;">{{ infor.title }}</p>
        </infor-card2>
      </div>
    </i-col>
  </Row> -->
  <div style="text-align:center;">
    <div class="countSum">
      <p style="font-size:14px;height:24px;line-height:24px;color:#fff;">卸油口开启</p>
      <p style="height:50px;line-height:50px;">1 次</p>
    </div>
    <div class="countSum">
      <p style="font-size:14px;height:24px;line-height:24px;color:#fff;">卸油口开启</p>
      <p style="height:50px;line-height:50px;">1 次</p>
    </div>
    <div class="countSum">
      <p style="font-size:14px;height:24px;line-height:24px;color:#fff;">卸油口开启</p>
      <p style="height:50px;line-height:50px;">1 次</p>
    </div>
  </div>
</template>

<script>
// 信息卡片组件
import CountTo from '@/components/count-to'
import InforCard2 from '@/components/infocard/InforCard2.vue'

import constData from '@/util/constData' // 保存的常量
// 工具
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  components: {
    CountTo,
    InforCard2,
  },
  props: {
    selectedStation: {
      type: Object
    }
  },
  data () {
    return {
      today_start: '',
      today_end: '',
      inforCardData: [
        { title: '加油区1违规次数', count: 657, rightColor: '#ed3f14' },
        { title: '加油区2违规次数', count: 12, rightColor: '#E46CBB' },
        { title: '收银台违规次数', count: 803, rightColor: '#2d8cf0' }
      ],
    }
  },
  watch: {
    selectedStation: {
      deep: true,
      handler (value) {
        console.log('新的值：', value)
        // this.getPass7DayData(this.pass7day, this.pass1day, this.selectedStation.station, constData.categoryData)
      }
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getInforCardData(this.today_start, this.today_end, this.selectedStation.station, constData.categoryData)
  },
  mounted () {

  },
  methods: {
    getInforCardData(start_time, end_time, station, category=[]) {
      console.log('getInforCardData', start_time, end_time, station, category)
      let nowHour = Number(end_time.slice(11, 13))
      let apiList = category.map((ele) => {
        return  axios.get('http://10.202.5.9:5123/datacenter/statistic', {
                  params: {
                    group: 'hour',
                    start_time: start_time,
                    end_time: end_time,
                    station: station,
                    // status: '违规',
                    category: ele
                  }
                })
      })
      // console.log('apiList: ', apiList)
      axios.all(apiList)
        .then(axios.spread((...res) => {
          console.log('能输出吗：', [...res])
          let resData = [...res]
          for(let i=0; i<category.length; i++){
            this.inforCardData[i].count = resData[i].data.data.total
          }
          console.log('最后的数据：', this.inforCardData)
        }));
    }
  }
}
</script>

<style lang="less">
.countSum {
  display: inline-block;
  padding: 10px;
  margin: 10px 10px;
  font-size: 30px;
  color: #20D1D2;
  height: 80px;
  width: 140px;
  vertical-align: middle;
  border: 1px solid #1081B2;
  border-radius: 4px;
}
</style>

