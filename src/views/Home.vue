<template>
	<div class="page home">
		<NavStyle />
		<div :style ="{backgroundImage : activeBackground}"class="home--background"></div>
		<div class="home--top">
			<div class="home--top--content">
				<div class="home--top--content--title">
					<h1 v-html="about.home_headline" />
					<p  v-scroll="{class: 'visible-baseline', threshold: 0.2}" v-html ="'– ' + about.home_tagline"></p>
				</div>
				<router-link to="/projects">
					<button type="button" class="main-button">
						<p>SEE WHAT I MAKE</p>
					</button>
				</router-link>
			</div>
		</div>
		<div class="home--content">
			<div class="home--content--about">
				<h2> &#151; Hello, I'm Xavier</h2>
				<p class="bio"  v-scroll="{class: 'visible', threshold: 0.01}" v-html="about.home_intro" />
				<router-link to="/about">
					<button type="button" class="secondary-button">
						<p>MORE ABOUT ME</p>
					</button>
				</router-link>
			</div>
			<div class="home--content--projects">
				<h2> &#151; Newest projects</h2>
					<div class="home--content--projects--list" v-scroll="{class: 'visible', threshold: 0}">
						<router-link :to="`/project/${project1.id}`" @click.native="saveClickedProject" class="project">
							<div :style="project1.style" class="img">
								<div class="color" :style="`background-color: ${getProjectColor(project1)}`"></div>
								<div class="hover" v-scroll="{class: 'visible', threshold: 0.01}">
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
						<router-link :to="`/project/${project2.id}`" @click.native="saveClickedProject" class="project">
							<div :style="project2.style" class="img">
								<div class="color" :style="`background-color: ${getProjectColor(project2)}`"></div>
								<div class="hover" v-scroll="{class: 'visible', threshold: 0.01}">
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
	methods: {
		saveClickedProject(evt) {
			let target;
			if (evt.path) {
				// chrome compatible
				target = evt.path.filter(e => e.tagName === 'A')[0];
			} else {
				// fallback for navigator without evt.path
				target = evt.target;
				while (target.tagName !== 'A') {
					target = target.parentElement;
				}
			}
			this.$store.commit('SET_CLICKED_PROJECT', target);
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.home {
	h1 {
		margin-left: 0;
		margin-bottom: 0;
		font-size: 4rem;
		letter-spacing: 6px;
		position: static;
		@media (max-width: 768px) {
			font-size: 2.8rem;
			letter-spacing: 4px;
		}
	}
	h2 {
		font-family: 'Qontra', sans-serif;
		font-size: 2rem;
		margin-bottom: 37px;
	}
	a {
		align-self: flex-end;
		margin-top: 50px;
		@media (max-width: 768px) {
			margin-top: 7%;
		}
	}
	button {
		&:hover {
			cursor: pointer;
		}
	}

	/* NOTE: TOP LAYOUT ***********************************/
	&--background,
	&--top {
		min-height: 83vh;
		width: 100vw;
		@media (max-width: 768px) {
			min-height: 75vh;
		}
	}
	&--background {
		background-size: cover;
		background-position: center;
		z-index: -1;
	}
	&--top {
		position: absolute;
		background-color: rgba(36, 0, 59, 0.6);
		display: flex;
		align-items: flex-end;
		&--content {
			position: relative;
			width: 100vw;
			min-height: 27vh;
			box-sizing: border-box;
			padding: $padding-desktop;
			margin-bottom: 10%;
			display: flex;
			justify-content: space-between;
			@media (max-width: 768px) {
				flex-direction: column;
				padding: $padding-mobile;
			}
			&--title {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				@media (max-width: 768px) {
					align-items: flex-start;
				}
				p {
					font-family: 'Qontra';
					font-weight: lighter;
					text-transform: lowercase;
					font-size: 1.35rem;
					transform: translateX(-7vh);
					opacity: 0;
					align-self: flex-end;
					@include short-transition;
					@media (max-width: 768px) {
						transform: translateX(7vh);
					}
					&.visible-baseline {
						transform: translateX(0);
						opacity: 1;
					}
				}
			}
		}
	}
	.main-button {
		min-width: 180px;
		max-width: 40%;
		border: 2px solid $purple;
		border-radius: 3px;
		background-color: transparent;
		color: white;
		@include short-transition;
		@media (max-width: 768px) {
			width: 70%;
			padding: 0 4% 0 4%;
		}
		&:hover {
			background-color: white;
			border: 2px solid white;
			color: $dark-purple;
			transform: scale(1.05);
		}
		p {
			font-size: 0.9rem;
			letter-spacing: 2px;
			font-weight: bolder;
		}
	}
	/* NOTE: CONTENT LAYOUT  **************************/
	&--content {
		margin-top: 1vh;
		margin-bottom: $margin-bottom;
		display: inline-grid;
		grid-template-columns: 1fr 2fr;
		grid-template-areas: 'about projects';
		grid-gap: 7%;
		padding: $padding-desktop;
		box-sizing: border-box;
		@media (max-width: 768px) {
			display: block;
			margin-top: 6vh;
			margin-bottom: 0;
		}
		&--about {
			grid-area: about;
			display: flex;
			flex-direction: column;
			p.bio {
				margin-top: -1em;
				transform: translateY(4vh);
				opacity: 0;
				@include short-transition(0.25s);
				&.visible {
					opacity: 1;
					transform: translateY(0);
				}
			}
		}
		&--projects {
			grid-area: projects;
			display: flex;
			flex-direction: column;
			position: relative;
			align-self: start;
			&--list {
				display: flex;
				height: 90%;
				width: 100%;
				justify-content: space-between;
				transform: translateY(4vh);
				opacity: 0;
				@include short-transition(0.4s);
				@media (max-width: 768px) {
					flex-direction: column;
				}
				&.visible {
					transform: translateY(0);
					opacity: 1;
				}
				a {
					height: 100%;
					text-decoration: none;
					color: #fff;
					margin: 0;
				}
			}
			.project {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				position: relative;
				width: 45%;
				min-height: 30vh;

				@media (max-width: 768px) {
					width: 100%;
					margin-bottom: 4vh;
				}
				.intro {
					text-transform: uppercase;
					font-weight: bold;
				}
				.img {
					min-height: 25vh;
					width: 100%;
					position: relative;
					transition: 1s ease-out;
					@media (max-width: 768px) {
						min-height: 33vh;
					}
				}
				p {
					margin-bottom: 0;
				}
				.color {
					width: 100%;
					height: 100%;
					position: absolute;
					bottom: 0;
					opacity: 0.5;
				}
				/* NOTE: HOVER *****/
				.hover {
					width: 85%;
					height: 100%;
					position: absolute;
					overflow: hidden;
					&.visible .hover--details,
					&.visible .layer {
						@media (max-width: 768px) {
							opacity: 1;
							transform: translateX(0);
						}
					}
					&--details {
						transform: translateX(-10%);
						opacity: 0;
						padding: 5%;
						max-height: 100%;
						box-sizing: border-box;
						position: relative;
						z-index: 1;
						@include short-transition(0.15s);
						@media (max-width: 768px) {
							@include long-transition(0.55s);
							font-size: 0.9rem;
						}
					}
					&:hover .hover--details {
						opacity: 1;
						transform: translateX(0);
					}
					&:hover .layer {
						transform: translateX(0);
					}
					.layer {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						@include short-transition;
						transform: translateX(-100%);
						@media (max-width: 768px) {
							@include long-transition(0.4s);
						}
					}
					.baseline {
						margin-bottom: 5%;
						font-family: 'Open Sans Light';
					}
					.type {
						text-transform: uppercase;
						font-weight: bold;
						&:nth-child(3) {
							margin: 0;
						}
					}
					ul {
						list-style-type: none;
						padding: 0;
					}
					svg {
						position: absolute;
					}
				}
			}
		}
		.secondary-button {
			border: 2px solid white;
			background-color: white;
			border-radius: 3px;
			padding: 5px 25px 5px 25px;
			@include short-transition;
			&:hover {
				transform: scale(1.05);
				color: white;
				background-color: $dark-purple;
			}
			p {
				margin: 0;
				font-size: 0.7rem;
			}
		}
	}
}
</style>
