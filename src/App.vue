<template>
	<div id="app">
		<Loader v-if="loading" />
		<transition
			@leave="leave"
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter"
			v-else
		>
			<router-view ref="page"/>
		</transition>
		<PageTransition ref="transition" />
	</div>
</template>

<script>
import PageTransition from './components/PageTransition.vue';
import Loader from '@/components/Loader.vue';

export default {
	components: {
		PageTransition,
		Loader,
	},
	computed: {
		loading() {
			return this.$store.state.loading;
		},
	},
	methods: {
		beforeEnter(el) {
			if (this.$refs.page.beforeEnter) this.$refs.page.beforeEnter();
			else {
				this.$refs.transition.beforeEnter();
				el.style.opacity = 0;
			}
		},
		enter(el, done) {
			this.$refs.transition.enter(done);
		},
		afterEnter(el) {
			this.$refs.transition.afterEnter(el);
		},
		leave(el, done) {
			this.$refs.transition.leave(el, done);
		},
	},
};
</script>
