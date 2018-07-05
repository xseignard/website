<template>
	<svg width="100%" height="100%" :style="style">
		<rect
			:x="x"
			:y="y"
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

const duration = 500;

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
			this.x = boundaries.x;
			this.y = boundaries.y;
			this.height = Math.ceil(boundaries.height);
		},
		leave(el, done) {
			this.visible = true;
			const current = this.clickedProject.querySelector('div');
			const elements = [...el.parentElement.querySelectorAll('.projectItem *:not(.rect)')];
			const filtered = elements.filter(e => e !== this.$el);
			const tl = anime.timeline();
			// sets the ribbon to a 100% width
			tl.add({
				targets: this,
				width: '100%',
				round: 1,
				easing: 'easeInOutQuart',
				duration: 500,
			})
				// fade out the unecessary elements
				.add({
					targets: filtered,
					opacity: 0,
					easing: 'easeInOutQuart',
					duration: 700,
				})
				// put the ribbon on top
				.add({
					targets: this,
					x: 0,
					y: 0,
					round: 1,
					easing: 'easeInOutQuart',
					duration: 500,
					offset: '-=500',
				})
				// grow its height up to 55% of the viewport
				.add({
					targets: this,
					height: window.innerHeight * 0.55,
					round: 1,
					easing: 'easeInOutQuart',
					duration: 500,
					complete: () => done && done(),
				});
		},
		afterLeave(el) {
			this.h = '45%';
		},
		beforeEnter(el) {
			anime({
				targets: '#app',
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

<style scoped>
svg {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	overflow: hidden;
}
</style>
