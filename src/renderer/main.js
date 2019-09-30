import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSelect from 'vue-cool-select'
require('vue2-animate/dist/vue2-animate.min.css')
const infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

 
 
Vue.use(VueSelect, {
  theme: 'bootstrap' // or 'material-design'
})

Vue.use(BootstrapVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
