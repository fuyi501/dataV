import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts';
Vue.prototype.$echarts = echarts

// 在 webpack 环境下指向 vue-echarts/components/ECharts.vue
import ECharts from 'vue-echarts'

// 手动导入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'

// title,legend,tooltip 是 echarts 的组件，
// 在图表中使用需要按组件导入，否则图表的标题图例可能不能显示。
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'

// 导入自带主题，可以引入多个主题
import 'echarts/theme/dark'
import 'echarts/theme/macarons'
import 'echarts/theme/infographic'

// 自定义主题如果是 js 文件，可以放在 echarts/theme 目录下
// 如果是 json 文件，可以像下面一样使用
import 'echarts/theme/walden'

// 导入自定义主题
// ./views/theme/ 下保存的是自定义的主题
import roma from './views/theme/roma.json'
import wonderland from './views/theme/wonderland.json'

// registering custom theme
ECharts.registerTheme('roma', roma)
ECharts.registerTheme('wonderland', wonderland)

// 注册组件后即可使用
Vue.component('v-chart', ECharts)

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
