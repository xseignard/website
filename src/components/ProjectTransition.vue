<template>
	<svg width="100%" height="100%" :style="style">
		<rect
			:x="`${x}px`"
			:y="`${y}px`"
			:width="width"
			:height="height"
			:fill="fill"
		/>
		<rect x="0" y="55%" width="100%" :height="h" fill="#24003b" />
	</svg>
</template>

<script>
import anime from 'animejs';
import { mapGetters, mapState } from 'vuex';
import { getRandomColor } from '@/utils';

const duration = 450;

export default {
	props: {
		projectId: String,
	},
	data() {
		return {
			x: 0,
			y: 0,
			width: '0%',
			height: '0%',
			visible: false,
			h: 0,
		};
	},
	computed: {
		...mapState({
			clickedProject: state => state.clickedProject,
		}),
		...mapGetters(['getProjectById', 'getProjectColor']),
		fill() {
			return this.getProjectColor(this.getProjectById(this.projectId));
		},
		style() {
			return this.visible ? 'visibility: visible' : 'visibility: hidden';
		},
	},
	methods: {
		beforeLeave(el) {
			const boundaries = this.clickedProject.querySelector('.hover').getBoundingClientRect();
			this.x = boundaries.x || boundaries.left;
			this.y = boundaries.y || boundaries.top;
			this.height = Math.ceil(boundaries.height);
		},
		leave(el, done) {
			this.visible = true;
			const tl = anime.timeline();
			// sets the ribbon to a 100% width
			tl.add({
				targets: this,
				width: '100%',
				round: 1,
				easing: 'easeInOutQuart',
				duration: duration,
			})
				// fade out the unecessary elements (e.g. the current page)
				.add({
					targets: el,
					opacity: 0,
					easing: 'easeInOutQuart',
					duration: duration * 0.8,
				})
				// put the ribbon on top
				.add({
					targets: this,
					x: 0,
					y: 0,
					round: 1,
					easing: 'easeInOutQuart',
					duration: duration,
					offset: `-=${duration}`,
				})
				// grow its height up to 55% of the viewport
				.add({
					targets: this,
					height: window.innerHeight * 0.55,
					round: 1,
					easing: 'easeInOutQuart',
					duration: duration,
					complete: () => done && done(),
				});
		},
		afterLeave(el) {
			this.h = '45%';
		},
		beforeEnter(el) {
			anime({
				targets: ['#app', 'html'],
				scrollTop: 0,
				easing: 'linear',
				duration: duration / 5,
			});
		},
		enter(el, done) {
			const tl = anime.timeline();
			tl.add({
				targets: this.$el,
				opacity: 0,
				easing: 'linear',
				duration: duration * 0.3,
				delay: 100,
				complete: () => {
					this.visible = false;
					done();
				},
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
		will-change: x, y, width, height;
	}
}
</style>
