<template>
	<div class="page projects">
		<NavStyle color="#24003b"/>
		<svg class="color" width="100%" height="55vh">
			<rect width="100%" height="100%" fill="white"/>
		</svg>
		<h1>Projects</h1>
		<div class="projects--content">
			<ProjectListItem v-scroll="{class: 'visible', threshold: 0.4}" :project="project"  v-for="project in projects"/>
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

<style scoped>
	h1{
		color:#24003b;
	}
	.color{
		position:fixed;
		z-index: -1;
	}
	.projects--content{
		padding: 0 15% 0 15%;
		margin-top:42vh;
		display:grid;
		grid-column-gap:5vh;
		justify-content: center;
		justify-items:center;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		margin-bottom:25vh;
	}
	.projects--content a{
		transform:translateY(4vh);
		opacity:0;
		transition:0.3s ease-out;
	}
	.projects--content a.visible {
		transform: translateY(0);
		opacity: 1;
	}
	.projects--content a:nth-child(2n){
		margin-top:10vh;
		transition-delay:.2s;
	}
</style>
