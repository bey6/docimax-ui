import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Dui from '../packages/index';

Vue.config.productionTip = false
Vue.use(Dui)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
