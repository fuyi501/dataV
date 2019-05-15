import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";
import Monitor from "./views/Monitor/Monitor.vue";
import Events from "./views/Events/Events.vue";

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
    }
  ]
});
