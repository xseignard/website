import Vue from 'vue';
import App from './App.vue';
import router from './router';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

import 'normalize.css';
import '@/assets/base.css';

Vue.config.productionTip = false;
new Vue({
	router,
	render: h => h(App),
	data: {
		ps: null,
	},
	mounted: function() {
		this.ps = new PerfectScrollbar('#app', {
			wheelSpeed: 2,
			wheelPropagation: true,
			minScrollbarLength: 20,
		});
	},
	watch: {
		$route: function() {
			setTimeout(() => {
				this.ps.update();
			}, 1000);
		},
	},
}).$mount('#app');
