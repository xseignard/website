<template>
	<div class="footer">
		<svg width="300px" height="1px">
			<line x1="0" y1="0" x2="300" y2="0"/>
		</svg>
		<div id="contacts">
			<div id="contacts--contact">
				<p><a :href="about.email.value">{{about.email.displayed}}</a></p>
				<a :href="about.phone.value">{{about.phone.displayed}}</a>
			</div>
			<div id="contacts--social">
				<a :href="about.github" target="_blank"><img src="@/assets/images/github.svg" alt=""></a>
				<a :href="about.twitter" target="_blank"><img src="@/assets/images/twitter.svg" alt=""></a>
				<a :href="about.linkedin" target="_blank"><img src="@/assets/images/linkedin.svg" alt=""></a>
			</div>
		</div>
		<div id="mentions">
			<p>2018 | <a href="#">mentions légales</a></p>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'FooterStyle',
	computed: mapState({
		about: state => state.about,
	}),
};
</script>

<style scoped>
.footer {
	position: absolute;
	bottom: 0;
	padding: 0 15% 2% 15%;
	box-sizing: border-box;
	margin-top: 20px;
	width: 100%;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
}
svg {
	stroke-linecap: round;
	stroke-width: 0.5px;
	margin-bottom: 3%;
	stroke: #8b73cf;
}
#contacts {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
}
#contacts--contact {
	text-align: right;
}
#contacts--social {
	width: 20%;
	display: flex;
	justify-content: space-between;
}
#contacts--social img {
	height: 30px;
	width: 30px;
	padding: 5px;
}
a {
	text-decoration: none;
	color: white;
	transition: 0.25s ease-out;
}
a:hover {
	color: #4fdab1;
}
#contacts--social a:hover {
	transform: scale(1.1);
	filter: invert(0.5) sepia(1) saturate(4) hue-rotate(340deg);
}
#mentions p {
	font-size: 0.55em;
}
</style>
