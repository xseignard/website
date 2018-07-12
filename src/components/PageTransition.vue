<template>
	<svg width="100%" height="120%" :style="style">
		<rect
			x="0"
			:y="y"
			width="100%"
			:height="height"
			:fill="fill"
		/>
	</svg>
</template>

<script>
import anime from 'animejs';
import { getRandomColor } from '@/utils';

const duration = 450;

export default {
	data() {
		return {
			height: 0,
			y: 0,
			visible: false,
			fill: '#F88429',
		};
	},
	computed: {
		style() {
			return this.visible ? 'visibility: visible' : 'visibility: hidden';
		},
	},
	methods: {
		beforeLeave(el) {
			el.style.opacity = 0;
			// reset values before enter animation
			this.height = 0;
			this.y = 0;
			this.visible = true;
			this.fill = getRandomColor();
		},
		leave(el, done) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				height: '100%',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
				complete: () => done && done(),
			});
		},
		beforeEnter(el) {
			// sets the opacity to 0 of the entering element
			el.style.opacity = 0;
			// scroll to the top of the #app (and html for ie11) container
			anime({
				targets: ['#app', 'html'],
				scrollTop: 0,
				easing: 'linear',
				duration: 0,
			});
		},
		enter(el, done) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				y: '100%',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
				complete: () => {
					this.visible = false;
					done();
				},
			}).add({
				targets: el,
				opacity: 1,
				easing: 'linear',
				duration: duration * 1.7,
				offset: `-=${duration * 1.2}`,
			});
		},
	},
};
</script>

<style scoped lang="scss">
svg {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	overflow: hidden;
	rect {
		will-change: y, height;
	}
}
</style>
