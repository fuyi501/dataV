import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";
import Monitor from "./views/Monitor/Monitor.vue";
import Events from "./views/Events/Events.vue";
import Analysis from "./views/Analysis/Analysis.vue";
import Test from "./views/test/test.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/monitor",
      name: "monitor",
      component: Monitor
    },
    {
      path: "/events",
      name: "events",
      component: Events
    },
    {
      path: "/analysis",
      name: "analysis",
      component: Analysis
    },
    {
      path: "/test",
      name: "test",
      component: Test
    }
  ]
});
