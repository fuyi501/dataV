import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts 

import ECharts from 'vue-echarts'

// 注册组件后即可使用
Vue.component('v-chart', ECharts)

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
