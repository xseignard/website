<template>
	<div class="page about">
		<NavStyle />
		<h1>{{about.name}}</h1>
		<div class="about--content">
			<div class="about--content--left">
				<div v-scroll="{class: 'visible', threshold: 0.2}" v-html="about.home_intro" />
				<div v-scroll="{class: 'visible', threshold: 0.4}" v-html="about.about_intro" />
			</div>
			<div class="about--content--right">
				<div class="about--content--right--domains">
					<p v-scroll="{class: 'visible', threshold: 0.4}">Web<br>development</p>
					<svg v-scroll="{class: 'visible', threshold: 0.4}" width="14px" height="2px">
						<line x1="1" y1="1" x2="13" y2="1" :stroke="`${colors[0]}`"/>
					</svg>
					<p v-scroll="{class: 'visible', threshold: 0.4}">Interactive<br>installations</p>
					<svg v-scroll="{class: 'visible', threshold: 0.4}" width="14px" height="2px">
						<line x1="1" y1="1" x2="13" y2="1" :stroke="`${colors[1]}`"/>
					</svg>
					<p v-scroll="{class: 'visible', threshold: 0.4}" >Other</p>
					<svg v-scroll="{class: 'visible', threshold: 0.4}" width="14px" height="2px">
						<line x1="1" y1="1" x2="13" y2="1" :stroke="`${colors[2]}`"/>
					</svg>
				</div>
				<div class="about--content--right--img" :style="`background-image: url(${about.picture.url})`">
					<svg v-scroll="{class: 'reveal', threshold: 0.4}" width="100%" height="100%">
						<rect x="0" y="0" width="100%" height="100%" fill="#F88429" />
					</svg>
				</div>
			</div>
		</div>
		<FooterStyle ref="footer" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';
import { colors } from '@/utils';

export default {
	components: {
		FooterStyle,
		NavStyle,
	},
	data() {
		return { colors };
	},
	computed: mapState({
		about: state => state.about,
	}),
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';

.about {
	display: flex;
	flex-direction: column;
	justify-content: center;
	h1 {
		text-transform: uppercase;
		@media (max-width: 768px) {
			margin-top: 0;
		}
	}
	&--content {
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding: $padding-desktop;
		box-sizing: border-box;
		@media (max-width: 768px) {
			flex-direction: column-reverse;
			margin-top: 35vh;
			padding: $padding-mobile;
		}
	}
	&--content--left {
		max-height: 50vh;
		margin-right: 130px;
		@media (max-width: 768px) {
			max-height: 100%;
			margin-right: 0px;
		}
		div {
			transform: translateY(4vh);
			opacity: 0;
			@include long-transition;
			&:nth-child(2) {
				transition-delay: 0.2s;
			}
		}
	}
	&--content--right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		@media (max-width: 768px) {
			flex-direction: column-reverse;
		}
	}
	&--content--right--domains {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		text-align: right;
		font-family: 'Qontra';
		font-size: 1.25rem;
		padding-right: 5%;
		@media (max-width: 768px) {
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			width: 90vw;
			padding-right: 0;
		}
		*:not(svg) {
			@include long-transition;
			transform: translateY(-4vh);
			opacity: 0;
		}
		p {
			&:first-of-type {
				margin-top: 0;
				@media (max-width: 768px) {
					margin-top: auto;
				}
			}
			&:nth-of-type(2) {
				transition-delay: 0.2s;
			}
			&:nth-of-type(3) {
				transition-delay: 0.4s;
			}
		}
		svg {
			fill: none;
			stroke-linecap: round;
			stroke-width: 2px;
			@media (max-width: 768px) {
				transform: rotate(90deg);
			}
		}
	}
	&--content--right--img {
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		min-width: 250px;
		// width: 22vw;
		height: 25vh;
		overflow: hidden;
		@media (max-width: 768px) {
			margin-top: 7%;
			width: 100%;
			min-height: 31vh;
		}
		svg.reveal {
			rect {
				@include short-transition(0.6s);
				transform: translateY(100%);
			}
		}
	}
	.visible:not(svg),
	svg.visible line {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
