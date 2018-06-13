<template>
	<div id="app">
		<NavStyle />
		<router-view/>
		<FooterStyle />
	</div>
</template>

<script>
// @ is an alias to /src
import FooterStyle from './components/FooterStyle.vue';
import NavStyle from './components/NavStyle.vue';

export default {
	name: 'app',
	components: {
		FooterStyle,
		NavStyle,
	},
};
</script>

<style>

@font-face{
	font-family:'Qontra';
	src:url(./assets/Qontra.otf);
}
@font-face {
	font-family: 'Open Sans Light';
	src: url(./assets/OpenSans-Light.ttf);
}
@font-face {
	font-family: 'Open Sans';
	src: url(./assets/OpenSans-Regular.ttf);
}

body{
	margin:0;
	background-color :#24003B;
}

h1{
	font-family: 'Qontra', sans-serif;
	letter-spacing: 4px;
	font-size:2.5rem;
	margin-left: 15%;
	position: absolute;
	top:15%;
}
#app {
	font-family: 'Open Sans', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	display: flex;
	flex-direction: column;
	color: white;
	min-height: 100vh;
}

</style>
