<template>
  <div class="home" :style="{height: contentHeight}">
    <!-- 左侧 -->
    <Row type="flex" justify="start">
      <Col :span="6">
        <Row type="flex" justify="start" style="margin: 0 0 -10px;">
          <Form :model="selectedStation" :label-width="100" inline >
            <FormItem label="选择站点：">
              <Select v-model="selectedStation.station">
                <Option v-for="item in stationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>
          <Tabs type="card">
            <TabPane label="今日数据">今日数据</TabPane>
            <TabPane label="近七天">近七天</TabPane>
            <TabPane label="近一月">近一月</TabPane>
          </Tabs>
        </Row>
        <Row >
          <pass7-day-data-line :selectedStation="selectedStation"></pass7-day-data-line>
        </Row>
        <Row style="margin: 20px 0px;">
          <pass7-day-data-bar :selectedStation="selectedStation"></pass7-day-data-bar>
          <pass7-day-data-bar2 :selectedStation="selectedStation"></pass7-day-data-bar2>
        </Row>
        <Row style="margin: 20px 0px;">
          <refuel-overview-event-pie :selectedStation="selectedStation"></refuel-overview-event-pie>
        </Row>
      </Col>

      <!-- 中间 -->
      <Col :span="12">
        <my-info-card :selectedStation="selectedStation"></my-info-card>
        <Row style="margin: 10px 0px;">
          <today-data-line :selectedStation="selectedStation"></today-data-line>
        </Row>
        <Row style="margin: 10px 0px;" type="flex" justify="start" :gutter="20" >
          <!-- <heat-map></heat-map> -->
        </Row>
      </Col>

      <!-- 右侧 -->
      <Col :span="6">
      <div class="charts-border">
        <Row style="margin-top:10px;">
          <safe-box-event-pie :selectedStation="selectedStation"></safe-box-event-pie>
        </Row>
        <Row style="margin: 20px 0px;">
          <checkout-event-pie :selectedStation="selectedStation"></checkout-event-pie>
        </Row>
        <Row style="margin: 20px 0px;">
          <unload-event-pie :selectedStation="selectedStation"></unload-event-pie>
        </Row>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import constData from '@/util/constData' // 保存的常量

// 页面组件
import TodayDataLine from './components/todayDataLine.vue'
import Pass7DayDataLine from './components/pass7DayLine'
import Pass7DayDataBar from './components/pass7DayBar'
import Pass7DayDataBar2 from './components/pass7DayBar2'
import RefuelOverviewEventPie from './components/refuelOverviewEventPie'
import SafeBoxEventPie from './components/safeBoxEventPie'
import CheckoutEventPie from './components/checkoutEventPie'
import UnloadEventPie from './components/unloadEventPie'
import MyInfoCard from './components/myInfoCard'
import HeatMap from './components/heatMap'

export default {
  name: "analysis",
  components: {
    TodayDataLine,
    Pass7DayDataLine,
    Pass7DayDataBar,
    Pass7DayDataBar2,
    RefuelOverviewEventPie,
    SafeBoxEventPie,
    CheckoutEventPie,
    UnloadEventPie,
    MyInfoCard,
    HeatMap,

  },
  data() {
    return {
      contentHeight: "",
      selectedStation: {
        station: 'xiwan'
      },
      stationList: constData.stationList,
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    contentHeight: function() {
      return `${document.documentElement.clientHeight - 60}px`;
    }
  },
  mounted () {
    // 获取浏览器可视区域高度
    this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    console.log(this.contentHeight)
    window.onresize = function temp() {
      this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    }
  },
  methods: {

  }
};
</script>

<style>

</style>

