<template>
  <div class="home">
    <!-- 左侧 -->
    <Row type="flex" justify="start" :gutter="20">
      <Col :span="16">
        <Tabs type="card">
          <TabPane label="标签一">
            <Row style="margin: 10px 0px;">
              <MyForm style="text-align: left;color:#fff"></MyForm>
            </Row>
            <Row style="margin: 10px 0px;">
              <MyTable></MyTable>
            </Row>
          </TabPane>
          <TabPane label="标签二">
            <Row style="margin: 10px 0px;">
              <MyForm style="text-align: left;color:#fff"></MyForm>
            </Row>
            <Row style="margin: 10px 0px;">
              <MyTable></MyTable>
            </Row>
          </TabPane>
          <TabPane label="标签三">
            <Row style="margin: 10px 0px;">
              <MyForm style="text-align: left;color:#fff"></MyForm>
            </Row>
            <Row style="margin: 10px 0px;">
              <MyTable></MyTable>
            </Row>
          </TabPane>
        </Tabs>
      </Col>

      <!-- 右侧 -->
      <Col :span="8">
        <Row >
          <Card style="width:100%; height:300px;margin-top:30px;background: #01237C;">
            <p slot="title" style="padding-left:10px;">
              <!-- <Icon type="ios-film-outline"></Icon> -->
              事件详情
            </p>
            <ul style="text-align:left; padding:10px 0px; list-style:none;">
              <li v-for="item in movieList">
                <p style="line-height:16px;font-size:16px;color:#fff;padding:10px 10px;">
                  {{ item.name }} {{ item.rate }}
                </p>
              </li>
            </ul>
          </Card>
        </Row>
        <Row style="margin: 10px 0px;">
          ddds
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>

import { ChartLine, ChartBar, ChartPie } from "@/components/charts";
import MyTable from './table.vue'
import MyForm from './myform.vue'

export default {
  name: "home",
  components: {
    MyTable,
    MyForm
  },
  data() {
    return {
      movieList: [
        {
          name: 'The Shawshank Redemption',
          url: 'https://movie.douban.com/subject/1292052/',
          rate: 9.6
        },
        {
          name: 'Leon:The Professional',
          url: 'https://movie.douban.com/subject/1295644/',
          rate: 9.4
        },
        {
          name: 'Leon:The Professional',
          url: 'https://movie.douban.com/subject/1295644/',
          rate: 9.4
        }
      ]
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

