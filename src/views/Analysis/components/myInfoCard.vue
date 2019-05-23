<template>
  <Row :gutter="20" style="margin: 10px 10px;">
    <i-col :span="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
      <infor-card shadow :leftColor="infor.leftColor" :rightColor="infor.rightColor" :icon="infor.icon" :icon-size="56">
        <count-to :end="infor.count" count-class="count-style">
          <span slot="right" style="margin-left:5px;color:#fff;">较昨日下降3次</span>
        </count-to>
        <p style="color:#fff;font-size:18px;">{{ infor.title }}</p>
      </infor-card>
    </i-col>
  </Row>
</template>

<script>
// 信息卡片组件
import CountTo from '@/components/count-to'
import InforCard from '@/components/infocard/InforCard.vue'

import constData from '@/util/constData' // 保存的常量
// 工具
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  components: {
    CountTo,
    InforCard,
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
        { title: '加油区1违规次数', icon: 'md-bug', count: 657, leftColor: '#ed3f14', rightColor: '#ed3f14' },
        { title: '加油区2违规次数', icon: 'md-information-circle', count: 12, leftColor: '#E46CBB', rightColor: '#E46CBB' },
        { title: '收银台违规次数', icon: 'md-chatbubbles', count: 803, leftColor: '#2d8cf0', rightColor: '#2d8cf0' },
        { title: '保险柜违规次数', icon: 'md-locate', count: 232, leftColor: '#19be6b', rightColor: '#19be6b' },
        { title: '卸油口违规次数', icon: 'md-help-circle', count: 142, leftColor: '#ff9900', rightColor: '#ff9900' },
        { title: '服务总人数', icon: 'ios-browsers', count: 14, leftColor: '#9A66E4', rightColor: '#9A66E4' }
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

</style>

