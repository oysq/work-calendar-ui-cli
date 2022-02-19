import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '@/components/homeComponent'
import listComponent from '@/components/listComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeRoute',
      component: homeComponent
    },
    {
      path: '/list',
      name: 'listRoute',
      component: listComponent
    }
  ]
})
