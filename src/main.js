// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import vImg from "./components/vImg";

Vue.component("vImg", vImg)

Vue.use(ElementUi);
import router from './router'

import "./assets/css/reset.css"

import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  store
})
