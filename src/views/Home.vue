<template>
	<div class="page home">
		<NavStyle />
		<div :style ="{backgroundImage : activeBackground}"class="home--background"></div>
		<div class="home--top">
			<div class="home--top--content">
				<h1> STRIKING <br>HEADLINES </h1>
				<router-link to="/projects">
					<button type="button" class="main-button" >
						<p>SEE WHAT I MAKE</p>
					</button>
				</router-link>
			</div>
		</div>
		<div class="home--content">
			<div class="home--content--about">
				<h2> &#151; Hello, I'm Xavier</h2>
				<p>{{aboutText}}</p>
				<router-link to="/about">
					<button type="button" class="secondary-button">
						<p>MORE ABOUT ME</p>
					</button>
				</router-link>
			</div>
			<div class="home--content--projects">
				<h2> &#151; Newest projects</h2>
					<div class="home--content--projects--list">
						<router-link to="/project/11" class="project home--content--projects--first">
							<div :style="project1.style" class="img">
								<div class="color"></div>
							</div>
							<p v-html="project1.title" />
						</router-link>
						<div class="project home--content--projects--second">
							<div :style="backgroundStyleTwo" class="img">
								<div class="color"></div>
							</div>
							<p>{{project2}}</p>
						</div>
					</div>
				<router-link to="/projects">
					<button type="button" class="secondary-button">
						<p>SEE ALL MY WORKS</p>
					</button>
				</router-link>
			</div>
		</div>
		<FooterStyle ref="footer" />
	</div>
</template>

<script>
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';
import activeBackground from '@/assets/images/BackgroundTemplate.jpg';
import imageTemplate from '@/assets/images/ImgTemplate.jpg';

export default {
	components: {
		FooterStyle,
		NavStyle,
	},
	data() {
		return {
			activeBackground: `url(${activeBackground})`,
			aboutText:
				'Martinus agens illas provincias pro praefectis aerumnas tium graviter gemens saepeque obsecrans, ut ab omni culpa inmunibus parceretur, cum non inpetraret, minabatur se discessurum: ut saltem id metuens perquisitor malivolus tandem desineret quieti coalitos.',
			project2: 'THE SECOND TO LAST PROJECT',
			backgroundStyleTwo: {
				backgroundImage: `url(${activeBackground})`,
			},
		};
	},
	computed: {
		project1() {
			return {
				title: this.$store.state.projects[0].title,
				id: this.$store.state.projects[0].id,
				style: {
					backgroundImage: `url(${this.$store.state.projects[0].featured_image.url})`,
				},
			};
		},
	},
};
</script>

<style scoped>
/* NOTE: TOP LAYOUT **************************/
.home {
	height: 160vh;
}
.home--background,
.home--top {
	height: 83vh;
	width: 100vw;
}
.home--background {
	background-size: cover;
	background-position: center;
	z-index: -1;
}
.home--top {
	position: absolute;
	background-color: rgba(36, 0, 59, 0.6);
	display: flex;
	align-items: flex-end;
}
.home--top--content {
	width: 100vw;
	height: 30vh;
	box-sizing: border-box;
	padding: 0 20% 0 20%;
	margin-bottom: 10%;
	display: flex;
	justify-content: space-between;
}
h1 {
	margin-left: 0;
	font-size: 4rem;
	letter-spacing: 6px;
	position: relative;
}
a {
	align-self: flex-end;
	height: 50px;
}
.main-button {
	padding: 0 40px 0 40px;
	border: 2px solid #8b73cf;
	border-radius: 3px;
	background-color: transparent;
	color: white;
	transition: 0.2s ease-out;
}
.main-button:hover {
	background-color: white;
	border: 2px solid white;
	color: #24003b;
	transform: scale(1.05);
}
.main-button p {
	font-size: 0.9rem;
	letter-spacing: 2px;
	font-weight: bolder;
}
button:hover {
	cursor: pointer;
}
/* NOTE: CONTENT LAYOUT  ********************/
h2 {
	font-family: 'Qontra', sans-serif;
	font-size: 2rem;
	margin-bottom: 37px;
}
.home--content {
	margin-top: 2%;
	display: inline-grid;
	grid-template-columns: 1fr 2fr;
	grid-template-areas: 'about projects';
	grid-gap: 7%;
	padding: 0 15% 0 15%;
	box-sizing: border-box;
}
.home--content--about {
	grid-area: about;
	display: flex;
	flex-direction: column;
}
.home--content--about p {
	margin-top: 0;
}
.home--content--projects {
	grid-area: projects;
	display: flex;
	flex-direction: column;
	position: relative;
}
.home--content--projects--list {
	display: flex;
	height: 90%;
	width: 100%;
	justify-content: space-between;
}
.home--content--projects--list a {
	height: 100%;
	text-decoration: none;
	color: #fff;
}
.project {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	width: 45%;
}
.project p {
	margin-bottom: 0;
	text-transform: uppercase;
}
.img {
	height: 25vh;
	width: 100%;
	position: relative;
	background-size: cover;
}
.color {
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: #4fdab1;
	bottom: 0;
	opacity: 0.4;
}
.home--content--projects--second .color {
	background-color: #f88429;
}
.secondary-button {
	margin-top: 50px;
	border: 2px solid white;
	border-radius: 3px;
	padding: 5px 25px 5px 25px;
	transition: 0.2s ease-out;
}
.secondary-button:hover {
	transform: scale(1.05);
	color: white;
	background-color: #24003b;
}
.secondary-button p {
	margin: 0;
	font-size: 0.6rem;
}
</style>
