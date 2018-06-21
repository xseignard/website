import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import 'normalize.css';
import '@/assets/base.css';

new Vue({
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
			wheelSpeed: 2,
			wheelPropagation: true,
			minScrollbarLength: 20,
		});
	},
	watch: {
		$route() {
			setTimeout(() => {
				this.ps.update();
			}, 1000);
		},
	},
}).$mount('#app');
