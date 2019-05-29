<template>
  <Row :gutter="20">
    <i-col :span="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height:100px;padding-bottom:8px;">
      <infor-card shadow :leftColor="infor.leftColor" :rightColor="infor.rightColor" :icon="infor.icon" :icon-size="56">
        <count-to :end="infor.count" count-class="count-style">
          <!-- <span slot="right" style="margin-left:5px;color:#fff;">较昨日下降3次</span> -->
        </count-to>
        <div style="color:#fff;font-size:1.8rem;margin-top:-10px;">{{ infor.title }}</div>
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
    selectedData: {
      type: Object
    }
  },
  data () {
    return {
      today_start: '',
      today_end: '',
      inforCardData: [
        { title: '本站总服务评分', icon: 'ios-browsers', count: 14, leftColor: '#9A66E4', rightColor: '#9A66E4' },
        { title: '加油区服务评分', icon: 'md-information-circle', count: 12, leftColor: '#E46CBB', rightColor: '#E46CBB' },
        { title: '收银台服务评分', icon: 'md-bug', count: 57, leftColor: '#ed3f14', rightColor: '#ed3f14' },
        { title: '加油区服务车辆总数', icon: 'md-locate', count: 32, leftColor: '#19be6b', rightColor: '#19be6b' },
        { title: '收银台服务总人数', icon: 'md-chatbubbles', count: 83, leftColor: '#2d8cf0', rightColor: '#2d8cf0' },
        { title: '加油区平均服务时间', icon: 'md-help-circle', count: 42, leftColor: '#ff9900', rightColor: '#ff9900' }
      ],
    }
  },
  watch: {
    selectedData: {
      deep: true,
      handler (value) {
        // console.log('新的值：', value)
        // this.getPass7DayData(this.pass7day, this.pass1day, this.selectedData.station, constData.categoryData)
      }
    }
  },
  created () {
    // 今日实时数据
    this.today_start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.today_end = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.getInforCardData(this.today_start, this.today_end, this.selectedData.station, constData.categoryData)
  },
  mounted () {

  },
  methods: {
    getInforCardData(start_time, end_time, station, category=[]) {
      // console.log('getInforCardData', start_time, end_time, station, category)
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
      // // console.log('apiList: ', apiList)
      axios.all(apiList)
        .then(axios.spread((...res) => {
          // console.log('能输出吗：', [...res])
          let resData = [...res]
          for(let i=0; i<category.length; i++){
            this.inforCardData[i].count = resData[i].data.data.total
          }
          // console.log('最后的数据：', this.inforCardData)
        }));
    }
  }
}
</script>

<style lang="less">

</style>

