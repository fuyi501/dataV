<template>
  <div class="home1" :style="{height: contentHeight}">

    <div style="width:800px;height:400px;position:absolute;top:70%;left:30%;background-color: rgba(0, 0, 0, 0.3);z-index:999;">
      <mytable2></mytable2>
    </div>

    <div style="width:600px;height:400px;position:absolute;top:10%;left:1%;z-index:999;">
      <weigui2></weigui2>
    </div>
    <div style="width:600px;height:400px;position:absolute;top:50%;left:1%;z-index:999;">
      <river></river>
    </div>

    <div style="width:600px;height:400px;position:absolute;top:10%;left:70%;z-index:999;">
      <Cars></Cars>
    </div>
    <div style="width:600px;height:400px;position:absolute;top:50%;left:70%;background-color: rgba(0, 0, 0, 0.3);z-index:999;">
      <persons2></persons2>
    </div>

    <Row type="flex" justify="start">
      <InMap></InMap>
    </Row>
  </div>
</template>

<script>
import { BMap, MapGeo, InMap } from '@/components/charts/map'
import constData from '@/util/constData' // 保存的常量

// 页面组件
import TodayDataLine from './components/todayDataLine.vue'
import Pass7DayDataLine from './components/pass7DayLine'
import Pass7DayDataBar from './components/pass7DayBar'
import SafeBoxEventPie from './components/safeBoxEventPie'
import CheckoutEventPie from './components/checkoutEventPie'
import UnloadEventPie from './components/unloadEventPie'
import RefuelOverviewEventPie from './components/refuelOverviewEventPie'

import River from './service/river'
import Persons from './service/persons'
import Persons2 from './service/person2'
import Cars from './service/cars'
import Weigui2 from './service/weigui2'

import Mytable2 from '@/components/tables/mytable2'

export default {
  name: "home",
  components: {
    TodayDataLine,
    Pass7DayDataLine,
    Pass7DayDataBar,
    SafeBoxEventPie,
    CheckoutEventPie,
    UnloadEventPie,
    RefuelOverviewEventPie,
    InMap,

    River,
    Persons,
    Persons2,
    Cars,
    Weigui2,

    Mytable2
  },
  data() {
    return {
      contentHeight: ""
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    contentHeight: function() {
      return `${document.documentElement.clientHeight - 60}px`;
    }
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    console.log(this.contentHeight)
    window.onresize = function temp() {
      this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    }
  },
  methods: {
    handleClick() {
      console.log('我点击了')
      this.$router.push('test')
    }
  }
};
</script>

<style>
.home {
  padding: 40px 20px;
  /* margin: -20px 0px; */
  /* background-color: #0a4271; */
  /* background-color: #0b0f34 !important; */
  /* background-color: #01237C !important; */
  background: url('../../assets/bg.jpg') center;
  /* background-size: 100% 100%; */
  /* box-sizing: border-box; */
  height: 3500px;
}
.home1 {
  padding: 20px 0px 0px;
  /* margin: -20px 0px; */
  /* background-color: #0a4271; */
  /* background-color: #0b0f34 !important; */
  /* background-color: #01237C !important; */
  background: url('../../assets/bg.jpg') center;
  /* background-size: 100% 100%; */
  /* box-sizing: border-box; */
  /* height: 3500px; */
  border: 0px;
}
</style>

