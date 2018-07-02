<template>
	<div class="page home">
		<NavStyle />
		<div :style ="{backgroundImage : activeBackground}"class="home--background"></div>
		<div class="home--top">
			<div class="home--top--content">
				<div class="top--content--title">
					<h1 v-html="about.home_headline" />
					<p v-html ="'– ' + about.home_tagline"></p>
				</div>
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
				<p v-html="about.home_intro" />
				<router-link to="/about">
					<button type="button" class="secondary-button">
						<p>MORE ABOUT ME</p>
					</button>
				</router-link>
			</div>
			<div class="home--content--projects">
				<h2> &#151; Newest projects</h2>
					<div class="home--content--projects--list">
						<router-link :to="`/project/${project1.id}`" class="project">
							<div :style="project1.style" class="img">
								<div class="color" :style="`background-color: ${getProjectColor(project1)}`"></div>
								<div class="hover">
									<div class="layer" :style="`background-color:${getProjectColor(project1)}`"/>
									<div class="hover--details">
										<p v-html="project1.baseline" class="baseline"></p>
										<p v-html="project1.type[0]"class="type"></p>
										<p class="type">–</p>
										<p>
											<ul>
												<li v-for ="t in project1.technologies">{{t.name}}</li>
											</ul>
										</p>
									</div>
								</div>
							</div>
							<p class="intro" v-html="project1.title" />
						</router-link>
						<router-link :to="`/project/${project2.id}`" class="project">
							<div :style="project2.style" class="img">
								<div class="color" :style="`background-color: ${getProjectColor(project2)}`"></div>
								<div class="hover">
									<div class="layer" :style="`background-color:${getProjectColor(project2)}`"/>
									<div class="hover--details">
										<p v-html="project2.baseline" class="baseline"></p>
										<p v-html="project2.type[0]"class="type"></p>
										<p class="type">–</p>
										<p>
											<ul>
												<li v-for ="t in project2.technologies">{{t.name}}</li>
											</ul>
										</p>
									</div>
								</div>
							</div>
							<p class="intro" v-html="project2.title" />
						</router-link>
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
import { mapGetters, mapState } from 'vuex';
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';
import activeBackground from '@/assets/images/BackgroundTemplate.jpg';

export default {
	components: {
		FooterStyle,
		NavStyle,
	},
	data() {
		return {
			activeBackground: `url(${activeBackground})`,
		};
	},
	computed: {
		...mapState({
			project1: state => ({
				title: state.projects[0].title,
				id: state.projects[0].id,
				style: {
					backgroundImage: `url(${state.projects[0].featured_image.url})`,
				},
				baseline: state.projects[0].baseline,
				type: state.projects[0].type,
				technologies: state.projects[0].technologies,
			}),
			project2: state => ({
				title: state.projects[1].title,
				id: state.projects[1].id,
				style: {
					backgroundImage: `url(${state.projects[1].featured_image.url})`,
				},
				baseline: state.projects[1].baseline,
				type: state.projects[1].type,
				technologies: state.projects[1].technologies,
			}),
			about: state => state.about,
		}),
		...mapGetters(['getProjectColor']),
	},
};
</script>

<style scoped>
/* NOTE: TOP LAYOUT **************************/
.home--background,
.home--top {
	min-height: 83vh;
	width: 100vw;
}
.home--background {
	background-size: cover;
	background-position: center;
	z-index: -1;
}
@media (max-width: 768px) {
	.home .home--background,
	.home .home--top {
		min-height: 75vh;
	}
	.home .home--top--content {
		flex-direction: column;
	}
	.home h1 {
		font-size: 2.5rem;
		letter-spacing: 4px;
	}
	.home .home--content {
		display: block;
		margin-top: 6vh;
	}
	.home--content > div {
		margin-top: 2vh;
	}
	.home .home--content--projects--list {
		flex-direction: column;
	}
	.home .project {
		width: 100%;
		margin-bottom: 4vh;
	}
}
.home--top {
	position: absolute;
	background-color: rgba(36, 0, 59, 0.6);
	display: flex;
	align-items: flex-end;
}
.home--top--content {
	position: relative;
	width: 100vw;
	min-height: 27vh;
	box-sizing: border-box;
	padding: 0 20% 0 20%;
	margin-bottom: 10%;
	display: flex;
	justify-content: space-between;
}
.top--content--title {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}
.top--content--title p {
	font-family: 'Qontra';
	font-weight: lighter;
	text-transform: lowercase;
	font-size: 1.35rem;
}
h1 {
	margin-left: 0;
	margin-bottom: 0;
	font-size: 4rem;
	letter-spacing: 6px;
	position: static;
}
a {
	align-self: flex-end;
	margin-top: 50px;
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
	margin-top: 1vh;
	margin-bottom: 30vh;
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
	margin-top: -1em;
}
.home--content--projects {
	grid-area: projects;
	display: flex;
	flex-direction: column;
	position: relative;
	align-self: start;
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
	margin: 0;
}
.project .baseline {
	margin-bottom: 5%;
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
}
.intro {
	text-transform: uppercase;
	font-weight: bold;
}
.img {
	height: 25vh;
	width: 100%;
	position: relative;
	transition: 1s ease-out;
}
.color {
	width: 100%;
	height: 100%;
	position: absolute;
	bottom: 0;
	opacity: 0.5;
}
.secondary-button {
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
/* NOTE: HOVER *****/
.hover {
	width: 85%;
	height: 100%;
	position: absolute;
	overflow: hidden;
}
.project:hover .hover--details {
	opacity: 1;
	transform: translateX(0);
}
.layer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: 0.3s ease-out;
	transform: translateX(-100%);
}
.project:hover .layer {
	transform: translateX(0);
}
.hover--details {
	transform: translateX(-10%);
	opacity: 0;
	padding: 5%;
	box-sizing: border-box;
	position: relative;
	z-index: 1;
	transition: 0.25s 0.1s ease-out;
}
.baseline {
	font-family: 'Open Sans Light';
}
.type {
	text-transform: uppercase;
	font-weight: bold;
}
.type:nth-child(2) {
	margin: 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
svg {
	position: absolute;
}
</style>
