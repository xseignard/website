<template>
<div class="page test">
	<section class="red">
		<p id="one" v-scroll="'visible'">ONE</p>
	</section>
	<section class="blue">
		<p id="two" v-scroll="'visible'">TWO</p>
	</section>
	<section>
		<p id="three" v-scroll="'visible'">THREE</p>
	</section>
</div>
</template>

<style scoped>
section {
	position: relative;
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.red {
	background-color: red;
}
.blue {
	background-color: blue;
}
p {
	transform: translateY(100px);
	opacity: 0;
	transition: 1s;
}
p.visible {
	transform: translateY(0);
	opacity: 1;
}
</style>
