<template>
	<div id="loader">
		<svg viewBox="0 0 283.59 241.98">
			<defs>
				<filter id="blur">
						<feGaussianBlur in="SourceGraphic" stdDeviation="0" />
				</filter>
			</defs>
			<path id="d" d="M140.57,1.21H78.26A6.27,6.27,0,0,0,72,7.46v70.3c0,2.62.07,9.64,1.62,12.89A10.92,10.92,0,0,1,92.42,80.16L96,84.59c-.13-2.44-.61-5.19-.61-6.84l.52-44.18a6.27,6.27,0,0,1,6.29-6.25h38.36c39.9,0,44.8,23.06,44.8,89.87V126c0,66.81-4.9,89.87-44.8,89.87H105.21a6.27,6.27,0,0,1-6.29-6.25l-.11-44.71c0-.4,0-.8,0-1.2L93.64,170a10.94,10.94,0,0,1-18.22-11.93c-2.21,3-3.44,10.35-3.44,13.06v64.55A6.27,6.27,0,0,0,78.26,242h62.31c62.65,0,71-36.29,71-113.95V115.15C211.62,37.49,203.22,1.21,140.57,1.21Z"/>
			<path id="balise-left" d="M44.52,178.93a11,11,0,0,1-8.54-4L2.44,133.83a4.75,4.75,0,0,1,0-6L37.2,85a11,11,0,0,1,15.61-1.52,11.17,11.17,0,0,1,1.25,15.59l-25.74,31.7a0,0,0,0,0,0,0l24.5,30a11.14,11.14,0,0,1-.92,15.29A11,11,0,0,1,44.52,178.93Z"/>
			<path id="balise-right" d="M239.07,80.94a11,11,0,0,1,8.54,4L281.15,126a4.75,4.75,0,0,1,0,6l-34.78,42.82a11,11,0,0,1-15.61,1.52,11.17,11.17,0,0,1-1.25-15.59l25.74-31.7a0,0,0,0,0,0,0l-24.5-30a11.14,11.14,0,0,1,.92-15.29A11,11,0,0,1,239.07,80.94Z"/>
			<path id="slash" d="M169.51,174.63,210.6,82.87a2.66,2.66,0,0,1,2.59-1.56l3.68.22a2.64,2.64,0,0,1,2.27,3.71L178,177a2.66,2.66,0,0,1-2.59,1.56l-3.68-.22A2.64,2.64,0,0,1,169.51,174.63Z"/>
			<path id="x" d="M130.78,126a0,0,0,0,1,0,0l25.74-31.7a11.17,11.17,0,0,0-1.25-15.59,11,11,0,0,0-15.61,1.52L116,109.25,92.42,80.16a11,11,0,0,0-15.61-1.52,11.17,11.17,0,0,0-1.25,15.59l25.74,31.7a0,0,0,0,1,0,0L76.8,156a11.14,11.14,0,0,0,.92,15.29A11,11,0,0,0,93.64,170L116,142.63,138.44,170a11,11,0,0,0,15.92,1.2,11.14,11.14,0,0,0,.92-15.29Z"/>
		</svg>
	</div>
</template>

<script>
import anime from 'animejs';

export default {
	mounted() {
		const loading = anime.timeline({
			loop: true,
		});

		loading
			.add({
				targets: '#slash',
				opacity: 0,
				translateX: -70,
				rotateZ: -20,
				offset: '-=400',
			})
			.add({
				targets: '#balise-left',
				translateX: 100,
				duration: 400,
				offset: '-=400',
			})
			.add({
				targets: '#balise-right',
				translateX: -150,
				duration: 400,
				offset: '-=400',
			})
			.add({
				targets: 'feGaussianBlur',
				stdDeviation: 0.3,
				duration: 700,
			})
			.add({
				targets: '#x',
				rotateZ: 360,
				easing: 'easeOutSine',
				duration: 700,
				offset: '-=700',
			})
			.add({
				targets: ['#balise-left', '#balise-right'],
				opacity: 1,
				easing: 'easeOutSine',
				offset: '-=600',
			})
			.add({
				targets: ['#balise-left', '#balise-right'],
				translateX: 0,
				easing: 'easeOutSine',
				offset: '-=1000',
			})
			.add({
				targets: '#x',
				rotateZ: 720,
				easing: 'easeOutSine',
				duration: 700,
			})
			.add({
				targets: '#slash',
				opacity: 1,
				translateX: 0,
				rotateZ: 0,
				easing: 'easeOutSine',
				duration: 500,
				offset: '-=600',
				elasticity: 100,
			})
			.add({
				targets: ['#slash', '#balise-left', '#balise-right'],
				opacity: 0,
				duration: 500,
				easing: 'easeOutSine',
			});
	},
};
</script>

<style scoped lang="scss">
#loader {
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		width: 17%;
		@media (max-width: 768px) {
			width: 45%;
		}
		#d,
		#x {
			fill: #f88429;
			stroke: #f88429;
			stroke-width: 1.5px;
		}
		#x {
			transform-origin: 120px 120px;
			filter: url(#blur);
		}
		#balise-left,
		#balise-right {
			opacity: 0;
			fill: #49d6a7;
			transform: translateY(-5px);
		}
		#slash {
			fill: #8b73cf;
			transform-origin: 170px 120px;
			opacity: 0;
			transform: translateX(-70px) rotateZ(-20deg);
		}
	}
}
</style>
