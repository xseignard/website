<template>
	<div class="page about">
		<NavStyle />
		<h1>{{about.name}}</h1>
		<div class="about--content">
			<div class="about--content--left">
				<div v-scroll="{class: 'visible', threshold: 0.4}" v-html="about.home_intro" />
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
				<div class="about--content--right--img">
					<svg width="100%" height="100%">
						<polygon id="polymorph" points="0 0, 0 0, 0 15, 0 15" fill="#F88429" />
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
import { getDelay } from '@/utils';

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

<style scoped>
.about {
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-grow: 1;
}
.about h1 {
	text-transform: uppercase;
}
.about--content {
	width: 100%;
	display: flex;
	justify-content: space-around;
	padding: 0 15% 0 15%;
	box-sizing: border-box;
}
.about--content--left {
	max-width: 40%;
	flex-grow: 1;
}
.about--content--left div{
	transform: translateY(4vh);
	opacity:0;
	transition:.5s ease-out;
}
.about--content--left div:nth-child(2){
	transition-delay:.1s;
}
.about--content--right--domains *{
	transition: .5s ease-out;
	transform:translateY(-4vh);
	opacity:0;
}
svg.visible,
svg.visible line,
p.visible,
div.visible{
	opacity:1;
	transform:translateY(0);
}
.about--content--right {
	display: flex;
	justify-content: flex-end;
	flex-grow: 2;
	align-items: center;
}
.about--content--right--domains {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: space-between;
	text-align: right;
	font-family: 'Qontra';
	font-size: 1.25rem;
	padding-right: 5%;
}
.about--content--right--domains p:first-of-type {
	margin-top: 0;
}
.about--content--right--domains svg {
	fill: none;
	stroke-linecap: round;
	stroke-width: 2px;
}
.about--content--right--img {
	background-image: url(../assets/images/ImgTemplate.jpg);
	background-size: cover;
	background-position: center;
	min-width: 250px;
	width: 22vw;
	height: 25vh;
}
</style>
