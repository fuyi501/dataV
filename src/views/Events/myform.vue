<template>
  <Form :model="formItem" :label-width="80" inline >
    <!-- <FormItem label="事件编号">
      <Input v-model="formItem.input" placeholder="请输入" style="width:148px;"></Input>
    </FormItem> -->
    <FormItem label="站点选择">
      <Select v-model="formItem.station">
        <Option v-for="item in stationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="事件选择">
      <Select v-model="formItem.action">
        <Option v-for="item in actionList" :value="item.label" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="报警等级">
      <Select v-model="formItem.level">
        <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="选择日期">
      <DatePicker v-model="formItem.time" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
    </FormItem>
    <FormItem :label-width="20">
      <Button type="primary" @click="searchData">查询</Button>
      <!-- <Button style="margin-left: 8px">重置</Button> -->
    </FormItem>
  </Form>
</template>
<script>
import constData from '@/util/constData' // 保存的常量
import dayjs from 'dayjs'
export default {
  props: {
    stationList: {
      type: Array
    },
    actionList: {
      type: Array
    },
    levelList: {
      type: Array
    }
  },
  data () {
    return {
      formItem: {
        station: '',
        action: '',
        level: '',
        time: ''
      },

    }
  },
  mounted () {
  },
  methods: {
    searchData () {
      console.log('点击事件')
      console.log(this.formItem)
      if(this.formItem.station === '') {
        this.$Modal.warning({
          title: '提示',
          content: '请输入站点名称'
        });
      } else if(this.formItem.time[0] === ''){
        // 今日实时数据
        this.formItem.time[0] = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
        this.formItem.time[1] = dayjs().format('YYYY-MM-DD HH:mm:ss')
        this.$emit("handleSearchEvent", this.formItem)
      } else {
        this.$emit("handleSearchEvent", this.formItem)
      }
    }
  }
}
</script>
<style lang="less">
@background-color: #0a4271 !important;
@font-color: #fff !important;

.ivu-form-item-label {
  font-size: 1.6rem !important;
  color: @font-color;
}
.ivu-input {
  border: 1px solid @background-color;
  background-color: @background-color;
  font-size: 14px;
  font-weight: bold;
  color: #fff !important;
}
.ivu-select-selection {
  width: 150px;
  background-color: @background-color;
  border: 1px solid @background-color;
}
.ivu-select-placeholder {
  // color: #fff !important;
  font-size: 14px !important;
  font-weight: bold;
}
.ivu-select-dropdown {
  background-color: @background-color;
  margin: 0px 0px;
}
.ivu-select-item {
  color: #fff !important;
  font-size: 14px !important;
  font-weight: bold;
}
input::-webkit-input-placeholder {
  // color: #fff !important;
  font-size: 14px;
}
.ivu-tabs-bar {
  border-bottom: 2px solid @background-color;
}
.ivu-select-selected-value {
  color: #fff;
  font-size: 16px !important;
}
.ivu-select-item-focus {
  background-color: @background-color;
}
.ivu-select-item-selected, .ivu-select-item-selected:hover {
  color: #52c41a !important;
}
.ivu-select-item:hover {
  background-color: #1081b3 !important;
}

.ivu-date-picker-cells-cell-selected em, .ivu-date-picker-cells-cell-selected:hover em {
  // color: #52c41a !important;
  color: #1081B2 !important;
}
.ivu-date-picker-cells-cell-range:before {
  background-color: #1081B2 !important;
  // background-color: #52c41a !important;
}
</style>

