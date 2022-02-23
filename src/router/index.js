import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import report from '@/components/report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeRoute',
      component: home
    },
    {
      path: '/report/:id',
      name: 'reportRoute',
      component: report
    }
  ]
})
