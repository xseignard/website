<template>
	<div id="page project">
		<NavStyle />
		<h1 v-html="project.title" />
		<img :src="project.featured_image.url" />
		<ul>
			<li v-for="t in project.technologies">
				{{ t.name }}
			</li>
		</ul>
		<FooterStyle ref="footer" />
	</div>
</template>

<script>
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';

export default {
	components: {
		FooterStyle,
		NavStyle,
	},
	computed: {
		project() {
			return this.$store.getters.getProjectById(this.$route.params.id);
		},
	},
};
</script>
