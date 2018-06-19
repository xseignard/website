<template>
	<div class="page home">
		<NavStyle />
		<div class="home--background"></div>
		<div class="home--top">
			<h1> STRIKING HEADLINES </h1>
			<button type="button" name="main-button">
				<p>SEE WHAT I MAKE</p>
			</button>
		</div>
		<div class="home--content">

		</div>
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
