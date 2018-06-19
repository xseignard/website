<template>
	<div class="page home">
		<NavStyle />
		<h1> STRIKING HEADLINES </h1>
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

<style scoped>
.home {
	height: 120vh;
}
</style>
