// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import axios from 'axios'
import store from './store'

// css
import 'styles/reset.css'
import 'styles/border.css'

// vant
import { Calendar, Popup, Divider, Field, Cell, CellGroup, Grid, GridItem } from 'vant'
import 'vant/lib/calendar/style'
import 'vant/lib/divider/style'

Vue.config.productionTip = false

// fastClick
fastClick.attach(document.body)

// axios
Vue.prototype.$axios = axios

// vant
Vue.use(Calendar)
Vue.use(Divider)
Vue.use(Popup)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Grid)
Vue.use(GridItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
