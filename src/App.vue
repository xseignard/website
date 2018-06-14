<template>
	<div id="app">
		<NavStyle />
		<transition
			v-on:leave="leave"
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:after-enter="afterEnter"
		>
			<router-view/>
		</transition>
		<FooterStyle />
		<PageTransition
			:height="height"
			:y="y"
			:visible="visible"
		/>
	</div>
</template>

<script>
import anime from 'animejs';
import FooterStyle from './components/FooterStyle.vue';
import NavStyle from './components/NavStyle.vue';
import PageTransition from './components/PageTransition.vue';

export default {
	components: {
		FooterStyle,
		NavStyle,
		PageTransition,
	},
	data: () => ({
		height: 0,
		y: 0,
		visible: false,
	}),
	methods: {
		beforeEnter: function(el, done) {
			this.$data.height = 0;
			this.$data.y = 0;
			this.$data.visible = true;
			el.style.opacity = 0;
		},
		enter: function(el, done) {
			anime({
				targets: this,
				height: '100%',
				round: 1,
				easing: 'linear',
				duration: 500,
				complete: () => {
					done();
				},
			});
		},
		afterEnter: function(el, done) {
			const tl = anime.timeline();
			tl.add({
				targets: el,
				opacity: 1,
				duration: 500,
			}).add({
				targets: this,
				y: '100vh',
				round: 1,
				easing: 'linear',
				duration: 500,
				complete: () => {
					this.$data.visible = false;
				},
			});
		},
		leave: function(el, done) {
			anime({
				targets: el,
				opacity: 0,
				duration: 1000,
				complete: () => {
					done();
				},
			});
		},
	},
};
</script>
