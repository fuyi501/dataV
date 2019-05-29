<template>
  <div class="home" :style="{height: contentHeight}">
    <!-- 左侧 -->
    <Row type="flex" justify="center" :gutter="20">
      <Col :span="16">
        <Tabs type="card" :value="tabName" @on-click="handleTabClick">
          <TabPane label="卸油现场智能管控">
            <Row style="margin: 10px 0px;">
              <MyForm
                :stationList="stationList"
                :actionList="unloadActionList"
                :levelList="levelList"
                @handleSearchEvent="handleSearchEvent"
                style="text-align:left;color:#fff"
                >
              </MyForm>
            </Row>
            <Row style="margin: 10px 0px;">
              <MyTable
                :tableData="unloadTableData"
                @handleTableClickEvent="handleTableClickEvent"
              ></MyTable>
              <Page
                :total="unloadTotal"
                :current="unloadCurrent"
                :page-size="unloadPageSize"
                @on-change="handlePageChange"
                show-total
                style="text-align:left;margin:10px 0px;;"/>
            </Row>
          </TabPane>
          <TabPane label="加油现场智能管控">
            <Row style="margin: 10px 0px;">
              <MyForm
                :stationList="stationList"
                :actionList="oilActionList"
                :levelList="levelList"
                @handleSearchEvent="handleSearchEvent"
                style="text-align:left;color:#fff"
                >
              </MyForm>
            </Row>
            <Row style="margin: 10px 0px;">
              <MyTable
                :tableData="refuelTableData"
                @handleTableClickEvent="handleTableClickEvent"
              ></MyTable>
              <Page
                :total="refuelTotal"
                :current="refuelCurrent"
                :page-size="refuelPageSize"
                @on-change="handlePageChange"
                show-total
                style="text-align:left;margin:10px 0px;;"/>
            </Row>
          </TabPane>
          <TabPane label="便利店智能管控">
            <Row style="margin: 10px 0px;">
              <MyForm
                :stationList="stationList"
                :actionList="checkoutActionList"
                :levelList="levelList"
                @handleSearchEvent="handleSearchEvent"
                style="text-align:left;color:#fff"
                >
              </MyForm>
            </Row>
            <Row style="margin: 10px 0px;">
              <MyTable
                :tableData="checkoutTableData"
                @handleTableClickEvent="handleTableClickEvent"
              ></MyTable>
              <Page
                :total="checkoutTotal"
                :current="checkoutCurrent"
                :page-size="checkoutPageSize"
                @on-change="handlePageChange"
                show-total
                style="text-align:left;margin:10px 0px;;"/>
            </Row>
          </TabPane>
          <TabPane label="营业资金智能管控">
            <Row style="margin: 10px 0px;">
              <MyForm
                :stationList="stationList"
                :actionList="safeBoxActionList"
                :levelList="levelList"
                @handleSearchEvent="handleSearchEvent"
                style="text-align:left;color:#fff"
                >
              </MyForm>
            </Row>
            <Row style="margin: 10px 0px;">
              <MyTable
                :tableData="safeboxTableData"
                @handleTableClickEvent="handleTableClickEvent"
              ></MyTable>
              <Page
                :total="safeboxTotal"
                :current="safeboxCurrent"
                :page-size="safeboxPageSize"
                @on-change="handlePageChange"
                show-total
                style="text-align:left;margin:10px 0px;;"/>
            </Row>
          </TabPane>


        </Tabs>
      </Col>

      <!-- 右侧 -->
      <Col :span="8">
        <Row >
          <Card style="width:100%; min-height:300px;margin-top:30px;background: #01237C;">
            <p slot="title" style="padding-left:30px;">
              <!-- <Icon type="ios-film-outline"></Icon> -->
              事件详情
            </p>
            <ul style="text-align:left; padding:10px 0px; list-style:none;">
              <li v-for="item in eventDetailList">
                <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">
                  事件站点：{{ item.station }}
                </p>
                <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">
                  事件区域：{{ item.category }}
                </p>
                <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">
                  事件名称：{{ item.action }}
                </p>
                <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">
                  事件原因：{{ item.cause }}
                </p>
                <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">
                  事件等级：{{ item.level.label }}
                </p>
                <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">
                  发生时间：{{ item.datetime }}
                </p>
                <p style="line-height:16px;font-size:16px;color:#fff;padding:0px 10px;">
                  <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">事件照片：</p>
                  <img :src="item.http_url_image" style="width:660px;padding:10px 10px;">
                </p>
                <p style="line-height:16px;font-size:16px;color:#fff;padding:0px 10px;">
                  <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">事件视频：</p>
                  <div style="width:660px;padding:10px 10px;">
                    <my-video-mp4 :src="item.http_url_video"></my-video-mp4>
                  </div>

                </p>
              </li>
            </ul>
          </Card>
        </Row>
        <Row style="margin: 10px 0px;">

        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>

import MyTable from './table.vue'
import MyForm from './myform.vue'
import constData from '@/util/constData' // 保存的常量

// 工具
import axios from 'axios'
import dayjs from 'dayjs'

import MyVideoMp4 from '@/components/myvideo/MyVideoMp4'


export default {
  name: "event",
  components: {
    MyTable,
    MyForm,
    MyVideoMp4
  },
  data() {
    return {
      tabName: 0,
      category: 'unload',

      contentHeight: "",
      stationList: constData.stationEventList,
      unloadActionList: constData.unloadActionList,
      safeBoxActionList: constData.safeBoxActionList,
      oilActionList: constData.oilActionList,
      checkoutActionList: constData.checkoutActionList,
      levelList: constData.levelList2,

      unloadTableData: [], // 卸油区
      safeboxTableData: [], // 保险柜
      checkoutTableData: [], // 收银台
      refuelTableData: [], // 加油区

      eventDetailList: [],

      unloadTotal: 0,
      unloadCurrent: 1,
      unloadPageSize: 20,

      safeboxTotal: 0,
      safeboxCurrent: 1,
      safeboxPageSize: 10,

      checkoutTotal: 0,
      checkoutCurrent: 1,
      checkoutPageSize: 10,

      refuelTotal: 0,
      refuelCurrent: 1,
      refuelPageSize: 10,

      unloadFormData: '',
      safeboxFormData: '',
      checkoutFormData: '',
      refuelFormData: ''
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
    handleTabClick (name) {
      console.log('标签点击：', name)
      if (name===0) this.category = 'unload'
      if (name===1) this.category = 'safebox'
      if (name===2) this.category = 'checkout'
      if (name===3) this.category = 'refuel_overview'
    },
    handleSearchEvent (value) {
      console.log('处理站点事件', value)


      let page_index = this.unloadCurrent
      let page_size = this.unloadPageSize

      if(this.category === 'unload') {
        this.unloadFormData = value
        page_index = this.unloadCurrent
        page_size = this.unloadPageSize
      }
      if(this.category === 'safebox') {
        this.safeboxFormData = value
        page_index = this.safeboxCurrent
        page_size = this.safeboxPageSize
      }
      if(this.category === 'checkout') {
        this.checkoutFormData = value
        page_index = this.checkoutCurrent
        page_size = this.checkoutPageSize
      }
      if(this.category === 'refuel_overview') {
        this.refuelFormData = value
        page_index = this.refuelCurrent
        page_size = this.refuelPageSize
      }

      // 请求数据
      let start_time = dayjs(value.time[0]).format('YYYY-MM-DD HH:mm:ss')
      let end_time = dayjs(value.time[1]).format('YYYY-MM-DD HH:mm:ss')
      let station = value.station === 'all' ? '' : value.station
      let action = value.action === '全部' ? '' : value.action
      let level = value.level === '4' ? '' : value.level

      console.log(start_time, end_time, station, action, level, this.category)
      this.getTableData(start_time, end_time, station, action, level, this.category, page_index, page_size)
    },
    getTableData(start_time, end_time, station, action, level, category, page_index, page_size) {
      console.log('数据：', start_time, end_time, station)

      axios.get('http://10.202.5.9:5123/datacenter/event', {
        params: {
          start_time: start_time,
          end_time: end_time,
          station: station,
          action: action,
          level: level,
          category: category,
          page_index: page_index,
          page_size: page_size
        }
      }).then((res) => {
          console.log('输出：', res)
          let resData = res.data.data.events
          let tableData = resData.map((ele, index) => {
            console.log(ele,index)
            return {
              index: index+1,
              station: constData.stationList2[ele.station],
              category: constData.categoryData2[ele.category],
              action: ele.action,
              cause: ele.cause,
              level: constData.levelList2[ele.level],
              status: ele.status,
              datetime: ele.datetime,
              http_url_image: ele.http_url_image,
              http_url_video: ele.http_url_video
            }
          })

          if(category === 'unload') {
            this.unloadTotal = res.data.data.total_pages * res.data.data.page_size
            this.unloadTableData = tableData
          }
          if(category === 'safebox') {
            this.safeboxTotal = res.data.data.total_pages * res.data.data.page_size
            this.safeboxTableData = tableData
          }
          if(category === 'checkout') {
            this.checkoutTotal = res.data.data.total_pages * res.data.data.page_size
            this.checkoutTableData = tableData
          }
          if(category === 'refuel_overview') {
            this.refuelTotal = res.data.data.total_pages * res.data.data.page_size
            this.refuelTableData = tableData
          }
        });
    },
    handleTableClickEvent (value) {
      console.log('处理表格单击事件', value)
      this.eventDetailList.splice(0, 1, value)
      for(let item in this.eventDetailList){
        console.log('item:', item)
      }
    },
    handlePageChange (page) {
      console.log('页码改变：', page, this.category)
      if(this.category === 'unload') {
        this.unloadCurrent = page
        this.handleSearchEvent(this.unloadFormData)
      }
      if(this.category === 'safebox') {
        this.safeboxCurrent = page
        this.handleSearchEvent(this.safeboxFormData)
      }
      if(this.category === 'checkout') {
        this.checkoutCurrent = page
        this.handleSearchEvent(this.checkoutFormData)
      }
      if(this.category === 'refuel_overview') {
        this.refuelCurrent = page
        this.handleSearchEvent(this.refuelFormData)
      }
    }
  }
};
</script>

<style lang="less">
@background-color: #0a4271 !important;
@tab-active-color: #1181B3 !important;
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
  color: #fff !important;
  background: @background-color;
  border: 1px solid @background-color;
}
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
  color: #fff !important;
  background-color: @tab-active-color;
  border: 1px solid aqua !important;
}
</style>

