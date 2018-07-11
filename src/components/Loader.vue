<template>
	<div id="loader">
		<svg width="20%" viewBox="0 0 283.59 241.98">
			<defs>
			<linearGradient id="Dégradé_sans_nom_61" x1="212.62" y1="121.59" x2="70.97" y2="121.59" gradientUnits="userSpaceOnUse">
				<stop offset="0" stop-color="#f88429"/>
				<stop offset="0.26" stop-color="#f88429"/>
				<stop offset="0.5" stop-color="#f88429"/>
				<stop offset="0.68" stop-color="#f88429"/>
				<stop offset="0.93" stop-color="#30073a"/>
				<stop offset="1" stop-color="#24003b"/>
			</linearGradient>
			<linearGradient id="Dégradé_sans_nom_88" x1="160.11" y1="125.09" x2="71.97" y2="125.09" gradientUnits="userSpaceOnUse">
				<stop offset="0" stop-color="#f88429"/>
				<stop offset="0.26" stop-color="#f88429"/>
				<stop offset="0.58" stop-color="#f88429"/>
				<stop offset="0.78" stop-color="#30073a"/>
				<stop offset="1" stop-color="#24003b"/>
			</linearGradient>
			<linearGradient id="Dégradé_sans_nom_12" x1="-0.63" y1="129.94" x2="58.65" y2="129.94" gradientUnits="userSpaceOnUse">
				<stop offset="0" stop-color="#49d6a7"/>
				<stop offset="0.49" stop-color="#49d6a7"/>
				<stop offset="1" stop-color="#24003b"/>
			</linearGradient>
			<linearGradient id="Dégradé_sans_nom_12-2" x1="284.22" y1="129.94" x2="224.94" y2="129.94" xlink:href="#Dégradé_sans_nom_12"/>
			<linearGradient id="Dégradé_sans_nom_37" x1="177.7" y1="101.14" x2="210.95" y2="158.73" gradientUnits="userSpaceOnUse">
				<stop offset="0" stop-color="#74649a"/>
				<stop offset="0.58" stop-color="#24003b"/>
				<stop offset="1" stop-color="#75649b"/>
			</linearGradient>
			</defs>
			<path class="cls-1" d="M140.57,1.21H78.26A6.27,6.27,0,0,0,72,7.46v70.3c0,3.45.13,14.59,3.6,14.59l18.5-2.79c3.47,0,1.33-8.35,1.33-11.81l.52-44.18a6.27,6.27,0,0,1,6.29-6.25h38.36c39.9,0,44.8,23.06,44.8,89.87V126c0,66.81-4.9,89.87-44.8,89.87H105.21a6.27,6.27,0,0,1-6.29-6.25l-.11-44.71c0-3.45,6-13.47,2.57-13.47l-23.93,5.35c-3.47,0-5.48,11-5.48,14.41v64.55A6.27,6.27,0,0,0,78.26,242h62.31c62.65,0,71-36.29,71-113.95V115.15C211.62,37.49,203.22,1.21,140.57,1.21Z"/>
			<path id="balise-left" class="cls-3 cls-4" d="M44.52,178.93a11,11,0,0,1-8.54-4L2.44,133.83a4.75,4.75,0,0,1,0-6L37.2,85a11,11,0,0,1,15.61-1.52,11.17,11.17,0,0,1,1.25,15.59l-25.74,31.7a0,0,0,0,0,0,0l24.5,30a11.14,11.14,0,0,1-.92,15.29A11,11,0,0,1,44.52,178.93Z"/>
			<path id="balise-right" class="cls-3 cls-5" d="M239.07,80.94a11,11,0,0,1,8.54,4L281.15,126a4.75,4.75,0,0,1,0,6l-34.78,42.82a11,11,0,0,1-15.61,1.52,11.17,11.17,0,0,1-1.25-15.59l25.74-31.7a0,0,0,0,0,0,0l-24.5-30a11.14,11.14,0,0,1,.92-15.29A11,11,0,0,1,239.07,80.94Z"/>
			<path id="x" class="cls-2" d="M130.78,126a0,0,0,0,1,0,0l25.74-31.7a11.17,11.17,0,0,0-1.25-15.59,11,11,0,0,0-15.61,1.52L116,109.25,92.42,80.16a11,11,0,0,0-15.61-1.52,11.17,11.17,0,0,0-1.25,15.59l25.74,31.7a0,0,0,0,1,0,0L76.8,156a11.14,11.14,0,0,0,.92,15.29A11,11,0,0,0,93.64,170L116,142.63,138.44,170a11,11,0,0,0,15.92,1.2,11.14,11.14,0,0,0,.92-15.29Z"/>
			<path id="slash" class="cls-6" d="M169.51,174.63,210.6,82.87a2.66,2.66,0,0,1,2.59-1.56l3.68.22a2.64,2.64,0,0,1,2.27,3.71L178,177a2.66,2.66,0,0,1-2.59,1.56l-3.68-.22A2.64,2.64,0,0,1,169.51,174.63Z"/>
		</svg>
	</div>
</template>

<script>
import anime from 'animejs';

export default {
	mounted() {
		const loading = anime.timeline({ loop: true });

		loading
			.add({
				targets: '#x',
				rotateZ: 360,
				easing: 'easeOutQuad',
				duration: 500,
			})
			.add({
				targets: ['#balise-left', '#balise-right'],
				opacity: 1,
				easing: 'easeOutQuad',
				duration: 300,
			})
			.add({
				targets: ['#balise-left', '#balise-right'],
				translateX: 0,
				easing: 'easeOutQuad',
				duration: 500,
			})
			.add({
				targets: '#x',
				rotateZ: 720,
				easing: 'easeOutQuad',
				duration: 500,
			});
	},
};
</script>

<style scoped>
.cls-1,
.cls-2,
.cls-3 {
	fill: #24003b;
}
.cls-1,
.cls-2,
.cls-6 {
	stroke-miterlimit: 10;
}
.cls-1,
.cls-2,
.cls-4,
.cls-5 {
	stroke-width: 2px;
}
.cls-1 {
	stroke: url(#Dégradé_sans_nom_61);
}
.cls-2 {
	stroke: url(#Dégradé_sans_nom_88);
}
.cls-4 {
	stroke: url(#Dégradé_sans_nom_12);
}
.cls-5 {
	stroke: url(#Dégradé_sans_nom_12-2);
}
.cls-6 {
	fill: #8b73cf;
	stroke-width: 0.5px;
	stroke: url(#Dégradé_sans_nom_37);
}
#x {
	transform-origin: 120px 120px;
}
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
}
</style>
