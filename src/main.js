import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'intersection-observer'
import 'whatwg-fetch'

import '@/directives/scroll'
import 'normalize.css'
import '@/assets/base.scss'

new Vue({
  router,
  store,
  async created() {
    await this.$store.dispatch('getData')
  },
  render: h => h(App),
}).$mount('#app')
