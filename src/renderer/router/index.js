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
      path : "/addClient",
      name : "Client",
      component : require('@/components/Client').default
    },
    {
      path : "/addDrug",
      name : "Drug",
      component : require('@/components/Drug').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
