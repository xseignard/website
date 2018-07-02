<template>
	<div id="app">
		<Loader v-if="loading" />
		<transition
			@before-leave="beforeLeave"
			@leave="leave"
			@after-leave="afterLeave"
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter"
			:mode="toProjectTransition ? 'out-in' : undefined"
			v-else
		>
			<router-view :key="$route.path" ref="page"/>
		</transition>
		<ProjectTransition ref="transition" :projectId="$route.params.id" v-if="toProjectTransition"/>
		<PageTransition ref="transition" v-else/>
	</div>
</template>

<script>
import PageTransition from './components/PageTransition.vue';
import ProjectTransition from './components/ProjectTransition.vue';
import Loader from '@/components/Loader.vue';

export default {
	components: {
		PageTransition,
		ProjectTransition,
		Loader,
	},
	data() {
		return {
			toProjectTransition: false,
		};
	},
	computed: {
		loading() {
			return this.$store.state.loading;
		},
	},
	watch: {
		$route(to, from) {
			this.toProjectTransition = to.name === 'project' && from.name === 'projects';
		},
	},
	methods: {
		beforeLeave(el) {
			this.$refs.transition.beforeLeave && this.$refs.transition.beforeLeave(el);
		},
		leave(el, done) {
			this.$refs.transition.leave && this.$refs.transition.leave(el, done);
		},
		afterLeave(el) {
			this.$refs.transition.afterLeave && this.$refs.transition.afterLeave(el);
		},
		beforeEnter(el) {
			this.$refs.transition.beforeEnter && this.$refs.transition.beforeEnter(el);
		},
		enter(el, done) {
			this.$refs.transition.enter && this.$refs.transition.enter(el, done);
		},
		afterEnter(el) {
			this.$refs.transition.afterEnter && this.$refs.transition.afterEnter(el);
		},
	},
};
</script>
