<template>
  <div style="min-height:120px;">
    <Table
      :row-class-name="rowClassName"
      :columns="colData"
      :data="tableData"
      @on-row-click="handleTableClick"
    ></Table>
  </div>
</template>
<script>
import dayjs from 'dayjs'

export default {
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      colData:
      [
        { title: '事件序号', key: 'index', width: '120' },
        { title: '站点名称', key: 'station', width: '180' },
        { title: '事件名称', key: 'action', width: '180' },
        { title: '事件原因', key: 'cause' },
        // { title: '事件等级', key: 'level' },
        { title: '事件状态', key: 'status', width: '120' },
        { title: '发生时间', key: 'datetime', width: '200' }
      ]
    }
  },
  methods: {
    rowClassName (row, index) {
      return 'demo-table-info-row';
    },
    handleTableClick (rowData, index) {
      console.log('表格单击事件', rowData, index)
      this.$emit("handleTableClickEvent", rowData)
    }
  }
}
</script>

<style lang="less">
@table-background-color: #0a4271 !important;

.ivu-table {
  color: #fff !important;
}
.ivu-table .demo-table-info-row td{
  background-color: #01237C;
  color: greenyellow;
  font-size: 16px;
}
.ivu-table th {
  background-color: @table-background-color;
  font-size: 16px;
}
.ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
}
.ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
}
.ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
}
.ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
}
.ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
}

.ivu-table-wrapper {
  border: 1px solid @table-background-color;
}
.ivu-table:after {
  background-color: @table-background-color;
}
.ivu-table td, .ivu-table th {
  border-bottom: 1px solid @table-background-color;
}
.ivu-page-next, .ivu-page-prev {
  background-color: #01237C !important;
}
.ivu-page-item {
  background-color: #1081B2 !important;
  color: red !important;
}
.ivu-page-item a {
  color: white !important;
}
.ivu-page-item-active a {
  color: blue !important;
}
.ivu-page-options-elevator input {
  background-color: #1081B2 !important;
  color: #fff !important;
}
.ivu-table td {
  background-color: #01237C !important;
}
.ivu-table-overflowX {
  overflow-x: hidden !important;
}
.ivu-table-tip table td {
  font-size: 16px;
}
.ivu-table-tip {
  overflow: hidden !important;
}
</style>

