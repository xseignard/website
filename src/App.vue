<template>
	<div id="app">
		<transition
			v-on:leave="leave"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:after-enter="afterEnter"
		>
			<router-view/>
		</transition>
		<PageTransition ref="transition" />
	</div>
</template>

<script>
import PageTransition from './components/PageTransition.vue';

export default {
	components: {
		PageTransition,
	},
	methods: {
		beforeEnter: function(el) {
			this.$refs.transition.beforeEnter();
			el.style.opacity = 0;
		},
		enter: function(el, done) {
			this.$refs.transition.enter(done);
		},
		afterEnter: function(el) {
			this.$refs.transition.afterEnter(el);
		},
		leave: function(el, done) {
			this.$refs.transition.leave(el, done);
		},
	},
};
</script>
