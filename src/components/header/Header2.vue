<template>
  <div>
    <Menu
      class="menu"
      mode="horizontal"
      :theme="theme1"
      active-name="1">
      <Row type="flex" justify="center" align="top" :gutter="100" class="code-row-bg">
        <Col >
          <MenuItem name="1">
            事件查询
          </MenuItem>
          <MenuItem name="2" class="subtitle" to="/about">
            数据分析
          </MenuItem>
        </Col>
        <Col >
          <div name="3" class="title">
            加油站智能监控大数据可视化系统
          </div>
        </Col>
        <Col>
          <MenuItem name="4">
            用户管理
          </MenuItem>
          <MenuItem name="5">
            用户管理
          </MenuItem>
        </Col>
      </Row>
    </Menu>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        }
    }
</script>
<style lang="less" scoped>
.ivu-menu-item {
  font-size: 16px;
  color: #4bdaff !important;
}
.ivu-menu-item-active,.ivu-menu-item:hover {
  border-bottom: 0px !important;
}
.title {
  font-size: 2rem;
  margin: 0 auto;
}
.subtitle {
  // background-color: #fff;
}
.title-left {
  float: right;
}
.menu {

  background-color: #0a4271;
  color: #4bdaff !important;

}
</style>
