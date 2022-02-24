// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import axios from 'axios'
import store from './store'
import {Calendar, Popup, Divider} from 'vant'
// css
import 'styles/reset.css'
import 'styles/border.css'
import 'vant/lib/button/style'
import 'vant/lib/calendar/style'

Vue.config.productionTip = false

// fastClick
fastClick.attach(document.body)

// axios
Vue.prototype.$axios = axios

// vant
Vue.use(Calendar)
Vue.use(Popup)
Vue.use(Divider)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
