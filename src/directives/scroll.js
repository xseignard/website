import Vue from 'vue';

Vue.directive('scroll', (el, binding) => {
	const root = document.querySelector('#app');
	const options = {
		root,
		threshold: 1,
	};
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.intersectionRatio === 1) entry.target.classList.add(binding.value);
		});
	}, options);
	observer.observe(el);
});
