<template>
  <div class="mygeo">
    <v-chart :options="map2" :autoresize="true" style="margin: 0 auto;"/>
  </div>
</template>

<script>
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'

import map from './data/map'
import map2 from './data/map2'
import chinaMap from 'echarts/map/json/china.json'
import ECharts from 'vue-echarts'

ECharts.registerMap('china', chinaMap)

export default {
  data () {
    return {
      map,
      map2
    }
  },
  mounted () {
  
  },
  methods: {
    
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
}
</style>