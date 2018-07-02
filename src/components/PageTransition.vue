<template>
	<svg width="100%" height="100%" :style="style">
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

const duration = 500;

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
		beforeEnter(el) {
			el.style.opacity = 0;
			// reset values before enter animation
			this.height = 0;
			this.y = 0;
			this.visible = true;
			this.fill = getRandomColor();
		},
		enter(el, done) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				height: '100%',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
				complete: () => done && done(),
			}).add({
				targets: '#app',
				scrollTop: 0,
				easing: 'linear',
				duration: duration / 5,
				offset: 400,
			});
		},
		afterEnter(el) {
			const tl = anime.timeline();
			tl.add({
				targets: this,
				y: '100%',
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
		leave(el, done) {
			anime({
				targets: el,
				opacity: 0,
				duration: duration * 1.7,
				complete: () => done && done(),
			});
		},
	},
};
</script>

<style scoped>
svg {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	overflow: hidden;
}
</style>
