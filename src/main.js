import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import 'intersection-observer';
import 'whatwg-fetch';

import '@/directives/scroll';
import 'normalize.css';
import '@/assets/base.scss';

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
	data: {
		ps: null,
	},
	async created() {
		await this.$store.dispatch('getData');
	},
	mounted() {
		if (window.innerWidth > 768) {
			this.ps = new PerfectScrollbar('#app', {
				suppressScrollX: true,
			});
		}
	},
	watch: {
		$route() {
			setTimeout(() => {
				this.ps && this.ps.update();
			}, 1000);
		},
	},
});
