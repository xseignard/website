<template>
	<svg width="100vw" height="100vh" :style="style">
		<rect
			x="0"
			:y="y"
			width="100vw"
			:height="height"
			:fill="fill"
		/>
	</svg>
</template>

<script>
import anime from 'animejs';

const duration = 500;

const getRandomColor = () => {
	const colors = ['#F88429', '#4FDAB1', '#8B73CF'];
	let c = Math.floor(Math.random() * colors.length);
	return colors[c];
};

export default {
	name: 'transition',
	data: () => ({
		height: 0,
		y: 0,
		visible: false,
		fill: '#F88429',
	}),
	computed: {
		style: function() {
			return this.visible ? 'visibility: visible' : 'visibility: hidden';
		},
	},
	methods: {
		beforeEnter: function(cb) {
			// reset values before enter animation
			this.height = 0;
			this.y = 0;
			this.visible = true;
			this.fill = getRandomColor();
		},
		enter: function(cb) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				height: '100vh',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
				complete: () => {
					cb();
				},
			}).add({
				targets: '#app',
				scrollTop: 0,
				easing: 'linear',
				duration: duration / 5,
				offset: `-=${duration}`,
			});
		},
		afterEnter: function(el) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				y: '100vh',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
				complete: () => {
					this.$data.visible = false;
				},
			}).add({
				targets: el,
				opacity: 1,
				easing: 'linear',
				duration: duration * 1.7,
				offset: `-=${duration * 1.2}`,
			});
		},
		leave: function(el, done) {
			anime({
				targets: el,
				opacity: 0,
				duration: duration * 1.7,
				complete: () => {
					done();
				},
			});
		},
	},
};
</script>

<style scoped>
svg {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	overflow: hidden;
}
</style>
