<template>
	<div id="nav">
		<router-link to="/" :style="style">HOME
			<svg width="100%" height="100%" :style="style">
				<line x1="15%" y1="50%" x2="85%" y2="50%"/>
			</svg>
		</router-link>
		<router-link to="/about" :style="style">ABOUT
			<svg width="100%" height="100%" :style="style">
				<line x1="15%" y1="50%" x2="85%" y2="50%"/>
			</svg>
		</router-link>
		<router-link to="/projects" :style="style">PROJECTS
			<svg width="100%" height="100%" :style="style">
				<line x1="15%" y1="50%" x2="85%" y2="50%"/>
			</svg>
		</router-link>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: 'white',
		},
	},
	computed: {
		style() {
			return `color: ${this.color}; stroke: ${this.color}`;
		},
	},
};
</script>

<style scoped>
#nav {
	z-index: 1;
	position: absolute;
	top: 0;
	padding: 50px;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	box-sizing: border-box;
}

#nav a {
	padding: 0 15px 0 15px;
	font-family: 'Qontra';
	letter-spacing: 2px;
	font-weight: bold;
	text-decoration: none;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
svg {
	position: absolute;
	stroke-width: 1.5px;
	stroke-dasharray: 100 100;
	stroke-dashoffset: 100;
	transition: 0.25s ease-out;
	stroke-linecap: round;
}
#nav a.router-link-exact-active svg,
#nav a:hover svg {
	stroke-dashoffset: 0;
}
</style>
