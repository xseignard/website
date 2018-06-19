<template>
	<div class="page projects">
		<NavStyle />
		<h1>Projects</h1>
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
};
</script>
