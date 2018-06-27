import Vue from 'vue';

Vue.directive('scroll', (el, binding) => {
	const root = document.querySelector('#app');
	const options = {
		root,
		threshold: binding.value.threshold,
	};
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.intersectionRatio >= binding.value.threshold) entry.target.classList.add(binding.value.class);
		});
	}, options);
	observer.observe(el);
});
