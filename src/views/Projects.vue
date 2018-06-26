<template>
	<div class="page projects">
		<NavStyle />
		<h1>Projects</h1>
		<div class="projects--content">
			<ProjectListItem/>
			<ProjectListItem/>
		</div>
		<FooterStyle ref="footer" />
	</div>
</template>
<script>
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';
import ProjectListItem from '@/components/ProjectListItem.vue';

export default {
	components: {
		FooterStyle,
		ProjectListItem,
		NavStyle,

	},
};
</script>

<style scoped>
	.projects--content{
		padding: 0 15% 0 15%;
		display: flex;
		margin-top:30vh;
	}
</style>
