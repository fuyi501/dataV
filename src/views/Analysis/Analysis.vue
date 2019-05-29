<template>
  <div class="home" :style="{height: contentHeight}">
    <!-- 选择站点和时间 -->
    <Row type="flex" justify="start" align="middle" style="margin: -20px 0px 0px;height:55px;">
      <Col>
        <Form :model="selectedData" :label-width="100" inline style="padding-top:15px;">
          <FormItem label="选择站点：">
            <Select v-model="selectedData.station">
              <Option v-for="item in stationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Col>
      <Col class="mytabs">
        <Tabs v-model="selectedData.dateTime">
          <TabPane label="实时数据" name="today"></TabPane>
          <TabPane label="近一周" name="week"></TabPane>
          <TabPane label="近一月" name="month"></TabPane>
        </Tabs>
      </Col>
    </Row>

    <!-- 左侧 显示收银台信息 -->
    <Row type="flex" justify="start" :gutter="15">
      <Col :span="7">
        <checkout :selectedData="selectedData"></checkout>
      </Col>
      <!-- 中间 显示总信息，保险柜，卸油口数据-->
      <Col :span="10" style="">
        <center :selectedData="selectedData"></center>
      </Col>
      <!-- 右侧 显示加油区和卸油口数据-->
      <Col :span="7">
        <div class="charts-border">
          <refuel :selectedData="selectedData"></refuel>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import constData from '@/util/constData' // 保存的常量

import Checkout from './checkout/checkout'
import Center from './center/center'
import Refuel from './refuel/refuel'

export default {
  name: "analysis",
  components: {
    Checkout,
    Center,
    Refuel
  },
  data() {
    return {
      contentHeight: "",
      selectedData: {
        station: 'xiwan',
        dateTime: 'today'
      },
      stationList: constData.stationList,
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    contentHeight: function() {
      return `${document.documentElement.clientHeight - 60}px`;
    },
  },
  mounted () {
    // 获取浏览器可视区域高度
    this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    // console.log(this.contentHeight)
    window.onresize = function temp() {
      this.contentHeight = `${document.documentElement.clientHeight - 60}px`;
    }
  },
  methods: {

  }
};
</script>

<style lang="less">
.mytabs {
  height: 70px;
}
.mytabs .ivu-tabs .ivu-tabs-nav .ivu-tabs-tab-active {
  color: #fff !important;
}
.mytabs .ivu-tabs .ivu-tabs-tab {
  font-size: 2rem !important;
}

</style>

