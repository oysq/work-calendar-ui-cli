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
import { Calendar, Popup, Divider, Field, Cell, CellGroup, Grid, GridItem, Overlay,
  Loading, Col, Row, Button, Notify, Image as VanImage, Dialog, ActionSheet, DatetimePicker, Picker, Step, Steps } from 'vant'
import 'vant/lib/calendar/style'
import 'vant/lib/popup/style'
import 'vant/lib/divider/style'
import 'vant/lib/field/style'
import 'vant/lib/cell/style'
import 'vant/lib/cell-group/style'
import 'vant/lib/grid/style'
import 'vant/lib/grid-item/style'
import 'vant/lib/overlay/style'
import 'vant/lib/loading/style'
import 'vant/lib/col/style'
import 'vant/lib/row/style'
import 'vant/lib/button/style'
import 'vant/lib/notify/style'
import 'vant/lib/image/style'
import 'vant/lib/dialog/style'
import 'vant/lib/action-sheet/style'
import 'vant/lib/datetime-picker/style'
import 'vant/lib/picker/style'
import 'vant/lib/step/style'
import 'vant/lib/steps/style'

Vue.config.productionTip = false

// fastClick
fastClick.attach(document.body)

// axios
Vue.prototype.$axios = axios

// vant
Vue.use(Calendar)
Vue.use(Divider)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Field)
Vue.use(Notify)
Vue.use(VanImage)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(DatetimePicker)
Vue.use(Picker)
Vue.use(Step)
Vue.use(Steps)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
