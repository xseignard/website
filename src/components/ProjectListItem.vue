<template>
	<router-link :to="`/project/${project.id}`" @click.native="saveClickedProject" class="projectItem">
		<div class="itemID img" :style="`${getBgImage(project.featured_image)}`">
			<div class="color" :style="`background-color: ${getProjectColor(project)}`"></div>
			<div class="hover" v-scroll="{class: 'visible', threshold: 1}">
				<div class="layer" :style="`background-color:${getProjectColor(project)}`"/>
				<div class="hover--details">
					<p v-html="project.baseline" class="baseline"></p>
					<p v-html="project.type[0]"class="type"></p>
					<p class="type">–</p>
					<p>
						<ul>
							<li v-for ="t in project.technologies">{{t.name}}</li>
						</ul>
					</p>
				</div>
			</div>
		</div>
		<h2 v-html="project.title"/>
	</router-link>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		project: Object,
	},
	methods: {
		getBgImage(img) {
			return `background-image: url(${img.url})`;
		},
		saveClickedProject(evt) {
			this.$store.commit('SET_CLICKED_PROJECT', this.$el);
		},
		reverseTitleColor() {
			console.log('test');
			const title = this.$el.querySelector('h2');
			const top = title.getBoundingClientRect().top;
			if (top <= window.innerHeight * 0.54) title.classList.add('purple');
			else title.classList.remove('purple');
		},
	},
	computed: {
		...mapGetters(['getProjectColor']),
	},
	mounted() {
		document
			.querySelector('#app')
			.addEventListener('scroll', this.reverseTitleColor);
	},
	destroyed() {
		document
			.querySelector('#app')
			.removeEventListener('scroll', this.reverseTitleColor);
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.projectItem {
	color: white;
	text-decoration: none;
	svg {
		position: absolute;
	}
	h2 {
		text-transform: uppercase;
		font-size: 1.15rem;
		@include short-transition;
		&.purple {
			color: $dark-purple;
		}
	}
	.itemID {
		height: 30vh;
		width: 27vw;
		position: relative;
		margin-right: 0;
		@media (max-width: 768px) {
			width: 70vw;
			min-height: 33vh;
		}
		&:hover .hover--details,
		&:hover .layer {
			opacity: 1;
			transform: translateX(0);
		}
		.layer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			transform: translateX(-100%);
			@include short-transition();
			@media (max-width: 768px) {
				@include long-transition(0.4s);
			}
		}
		.color {
			width: 100%;
			height: 100%;
			position: absolute;
			bottom: 0;
			opacity: 0.4;
		}
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
				box-sizing: border-box;
				position: relative;
				z-index: 1;
				@include short-transition(0.15s);
				@media (max-width: 768px) {
					@include long-transition(0.55s);
					font-size: 0.9rem;
				}
				.baseline {
					font-family: 'Open Sans Light';
				}
				.type {
					text-transform: uppercase;
					font-weight: bold;
					&:nth-of-type(3) {
						margin: 0;
					}
				}
				ul {
					list-style-type: none;
					padding: 0;
				}
			}
		}
	}
}
</style>
