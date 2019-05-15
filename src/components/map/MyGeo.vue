<template>
  <div class="mygeo">
    <v-chart :options="mapData" :autoresize="true" style="margin: 0 auto;"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'

import chinaMap from 'echarts/map/json/china.json'
import ECharts from 'vue-echarts'

ECharts.registerMap('china', chinaMap)

export default {
  props: {
    mapData: Object
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.mygeo {
  height: 400px;
  width: 96%;
  /* border: 2px solid #084272; */
  margin: 0 auto;
  background-color: rgba(13, 72, 121, 0.3);

}
</style>