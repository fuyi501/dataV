<template>
  <div style="text-align:center;">
    <div class="countSum" :style="{width: countWidth}">
      <p style="font-size:14px;height:24px;line-height:24px;color:#fff;">服务总人数</p>
      <p style="height:50px;line-height:50px;">{{totalNum}} 人</p>
    </div>
    <div class="countSum" :style="{width: countWidth}">
      <p style="font-size:14px;height:24px;line-height:24px;color:#fff;">服务总时间</p>
      <p style="height:50px;line-height:50px;">{{totalTime}} 分钟</p>
    </div>
    <div class="countSum" :style="{width: countWidth}">
      <p style="font-size:14px;height:24px;line-height:24px;color:#fff;">平均服务时间</p>
      <p style="height:50px;line-height:50px;">{{avgTime}} 秒</p>
    </div>
  </div>
</template>

<script>
import constData from '@/util/constData' // 保存的常量
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  props: {
    totalNum: {
      type: Number
    },
    totalTime: {
      type: Number
    },
    avgTime: {
      type: Number
    },
    countWidth: {
      type: String,
      default: '160px'
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    console.log('这个冻死')
  },
  methods: {
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
  vertical-align: middle;
  border: 1px solid #1081B2;
  border-radius: 4px;
}
</style>

