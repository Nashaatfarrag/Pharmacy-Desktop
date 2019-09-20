import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AddMove',
      component: require('@/components/addMove').default
    },
    {
      path : "/mainTable",
      name : "mainTable",
      component : require('@/components/mainTable').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
