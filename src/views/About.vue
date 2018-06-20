<template>
	<div class="page about">
		<NavStyle />
		<h1>XAVIER SEIGNARD</h1>
		<div class="about--content">
			<div class="about--content--left">
				<p>{{aboutMeFirst}}</p>
				<p>{{aboutMeSecond}}</p>
			</div>
			<div class="about--content--right">
				<div class="about--content--right--domains">
					<p>Web<br>development</p>
					<svg width="14px" height="2px">
						<line x1="1" y1="1" x2="13" y2="1" stroke="#4FDAB1"/>
					</svg>
					<p>Interactive<br>installations</p>
					<svg width="14px" height="2px">
						<line x1="1" y1="1" x2="13" y2="1" stroke="#8B73CF"/>
					</svg>
					<p>Live<br>performances</p>
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
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';
import VueScrollReveal from 'vue-scroll-reveal';

export default {
	components: {
		FooterStyle,
		NavStyle,
	},
	data(){
		return{
			aboutMeFirst :'Utque aegrum corpus quassari etiam levibus solet offensis, ita animus eius angustus et tener, quicquid increpuisset, adsalutis suae dispendium existimans factum aut cogitatum, insontiumcaedibus fecit victoriam luctuosam.',
			aboutMeSecond :'Has autem provincias, quas Orontes ambiens amnis imosque pedes Cassii montis illius celsi praetermeans funditur in Parthenium mare, Gnaeus Pompeius superato Tigrane regnis Armeniorum abstractas dicioni Romanae coniunxit.'
		}
	},
};
</script>

<style scoped>
.about {
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-grow: 1;
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
