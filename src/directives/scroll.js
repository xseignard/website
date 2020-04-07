import Vue from 'vue'

Vue.directive('scroll', {
  inserted: (el, binding) => {
    const selector = binding.value.selector ? binding.value.selector : '#app'
    const root = document.querySelector(selector)
    const options = {
      root,
      threshold: binding.value.threshold,
    }
    // attach the observer to the el in order to have it accessible on the unbind method
    el.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target) {
          if (entry.intersectionRatio >= binding.value.threshold) {
            entry.target.classList.add(binding.value.class)
          } else if (
            window.innerWidth < 768 &&
            entry.target.classList.contains('hover')
          ) {
            entry.target.classList.remove(binding.value.class)
          }
        }
      })
    }, options)
    el.observer.observe(el)
  },
  unbind: el => {
    el.observer.unobserve(el)
  },
})
