import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import 'intersection-observer';

import '@/directives/scroll';
import 'normalize.css';
import '@/assets/base.css';

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
		this.ps = new PerfectScrollbar('#app', {
			suppressScrollX: true,
		});
	},
	watch: {
		$route() {
			setTimeout(() => {
				console.log('[PS] Update');
				this.ps.update();
			}, 1000);
		},
	},
});
