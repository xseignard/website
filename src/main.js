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
  render: h => h(App),
  async created() {
    await this.$store.dispatch('getData')
  },
}).$mount('#app')
