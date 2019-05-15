<template>
  <Form :model="formItem" :label-width="80" inline >
    <FormItem label="事件编号">
      <Input v-model="formItem.input" placeholder="请输入" style="width:148px;"></Input>
    </FormItem>
    <FormItem label="事件类型">
      <Select v-model="formItem.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="事件等级">
      <Select v-model="formItem.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="事件来源">
      <Select v-model="formItem.select">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </FormItem>
    <FormItem label="选择日期">
      <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
    </FormItem>
    <FormItem>
      <Button type="primary">查询</Button>
      <Button style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
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
  font-size: 16px;
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
  color: #52c41a !important;
}
.ivu-date-picker-cells-cell-range:before {
  background-color: #52c41a !important;
}
</style>

