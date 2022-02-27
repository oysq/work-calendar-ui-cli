import Vue from 'vue'
import Router from 'vue-router'
import report from '@/components/report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeRoute',
      // 当组件较大时，可以通过此方法异步加载，如果组件很小，则不建议这么做，因为为此产生的 http 耗时还不如直接加载
      component: () => import('@/components/home')
    },
    {
      path: '/report/:id',
      name: 'reportRoute',
      component: report
    }
  ]
})
