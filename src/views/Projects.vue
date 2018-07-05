<template>
	<div class="page projects">
		<NavStyle color="#24003b"/>
		<svg class="color" width="100%" height="55%">
			<rect width="100%" height="100%" fill="white"/>
		</svg>
		<h1>Projects</h1>
		<div class="projects--content">
			<ProjectListItem v-scroll="{class: 'visible', threshold: 0.3}" :project="project"  v-for="project in projects"/>
		</div>
		<FooterStyle ref="footer" />
	</div>
</template>
<script>
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';
import ProjectListItem from '@/components/ProjectListItem.vue';
import { mapGetters, mapState } from 'vuex';

export default {
	components: {
		FooterStyle,
		ProjectListItem,
		NavStyle,
	},
	computed: {
		...mapState({
			projects: state => state.projects,
		}),
		...mapGetters(['getProjectColor']),
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.projects {
	h1 {
		color: #24003b;
	}
	.color {
		position: fixed;
		z-index: -1;
	}
	&--content {
		padding: $padding-desktop;
		margin-top: 42vh;
		display: grid;
		grid-column-gap: 5vh;
		justify-content: center;
		justify-items: center;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		margin-bottom: $margin-bottom;
		@media (max-width: 768px) {
			padding: 0;
			grid-template-columns: 1fr;
			margin-bottom: 0;
		}
		a {
			transform: translateY(4vh);
			opacity: 0;
			@include short-transition;
			&.visible {
				transform: translateY(0);
				opacity: 1;
			}
			&:nth-child(2n) {
				margin-top: 10vh;
				transition-delay: 0.2s;
				@media (max-width: 768px) {
					margin-top: 0;
				}
			}
			&:not(:last-child) {
				@media (max-width: 768px) {
					margin-bottom: 6%;
				}
			}
		}
	}
}
</style>
