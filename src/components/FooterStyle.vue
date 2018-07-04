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
			<p>{{new Date().getFullYear()}}| <a href="#">mentions légales</a></p>
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

<style scoped lang="scss">
@import '../assets/_variables';

.footer {
	position: absolute;
	bottom: 0;
	padding: $padding-desktop;
	box-sizing: border-box;
	margin-top: 20px;
	width: 100%;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (max-width: 768px) {
		position: static;
		margin-top: 10%;
	}
}
svg {
	stroke-linecap: round;
	stroke-width: 0.5px;
	margin-bottom: 3%;
	stroke: $purple;
}
#contacts {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	@media (max-width: 768px) {
		justify-content: center;
		flex-direction: column;
	}
}
#contacts--contact {
	text-align: right;
	@media (max-width: 768px) {
		text-align: center;
	}
}
#contacts--social {
	width: 20%;
	display: flex;
	justify-content: space-between;
	img {
		height: 30px;
		width: 30px;
		padding: 5px;
	}
	a {
		&:hover {
			transform: scale(1.1);
			filter: invert(0.5) sepia(1) saturate(4) hue-rotate(340deg);
		}
	}
	@media (max-width: 768px) {
		width: 90%;
		margin-top: 3vh;
	}
}

a {
	text-decoration: none;
	color: white;
	transition: 0.25s ease-out;
	&:hover {
		color: $green;
	}
}

#mentions p {
	font-size: 0.55em;
}
</style>
