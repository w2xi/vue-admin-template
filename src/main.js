import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './components/globals'
import './assets/styles/global.css'
import './plugins'
import './filters'
import './permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
