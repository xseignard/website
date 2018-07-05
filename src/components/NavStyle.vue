<template>
	<div class="nav">
		<div class="menu-icon" @click="showMenu">
      <svg class ="bar1" width="30" height="4">
        <rect width="30" height="4" rx="1" ry="1"/>
      </svg>
      <svg class="bar2" width="25" height="4">
        <rect width="25" height="4" rx="1" ry="1"/>
      </svg>
      <svg class="bar3" width="30" height="4">
        <rect width="30" height="4" rx="1" ry="1"/>
      </svg>
    </div>
		<div class="nav--list">
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
					<line x1="10%" y1="50%" x2="90%" y2="50%"/>
				</svg>
			</router-link>
		</div>
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
			return `color: ${this.color}; stroke: ${this.color}; fill: ${this.color};`;
		},
	},
	// mounted: {
	// 	if (window.innerWidth < 768) {
	//
	// 	}
	// },
	methods: {
		showMenu: event => {
			const icon = document.querySelector('.menu-icon');
			const menu = document.querySelector('.nav--list');
			const bar1 = document.querySelector('.bar1');
			const bar2 = document.querySelector('.bar2');
			const bar3 = document.querySelector('.bar3');
			const navBar = document.querySelector('.nav');
			navBar.classList.toggle('white');
			menu.classList.toggle('showing');
			bar1.classList.toggle('animate1');
			bar2.classList.toggle('disappear');
			bar3.classList.toggle('animate2');
			icon.classList.toggle('fixed');
		},
	},
};
</script>

<style scoped lang="scss">
@import '../assets/_variables';

.nav {
	z-index: 1;
	position: absolute;
	top: 0;
	padding: 50px;
	display: flex;
	justify-content: flex-end;
	width: 100%;
	box-sizing: border-box;
	height: auto;
	@media (max-width: 768px) {
		padding: 0;
	}
	&.white {
		@media (max-width: 768px) {
			background-color: white;
		}
	}
	a {
		padding: 0 15px 0 15px;
		font-family: 'Qontra';
		letter-spacing: 2px;
		font-weight: bold;
		text-decoration: none;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		@include short-transition;
		@media (max-width: 768px) {
			color: $dark-purple;
			text-align: center;
			opacity: 0;
		}
		&.router-link-exact-active svg,
		&:hover svg {
			stroke-dashoffset: 0;
		}
	}
	.menu-icon {
		height: 27px;
		z-index: 2;
		display: none;
		position: relative;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		cursor: pointer;
		@media (max-width: 768px) {
			display: flex;
			position: absolute;
			padding: 30px 30px 0 30px;
		}
		&.fixed {
			position: fixed;
		}
		&.fill {
			@media (max-width: 768px) {
				fill: $dark-purple;
			}
		}
		svg {
			@include short-transition;
		}
	}
	.nav--list {
		display: flex;
		overflow: hidden;
		@include long-transition;
		@media (max-width: 768px) {
			height: 0;
			width: 100%;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			overflow: hidden;
			position: fixed;
		}
		&.showing {
			@media (max-width: 768px) {
				height: 40vh;
				padding: 5% 0 5% 0;
				background-color: white;
			}
			a {
				@media (max-width: 768px) {
					opacity: 1;
				}
			}
		}
		svg {
			position: absolute;
			stroke-width: 1.5px;
			stroke-dasharray: 100 100;
			stroke-dashoffset: 100;
			@include short-transition;
			stroke-linecap: round;
			top: 0;
			left: 0;
		}
	}
}
// NOTE: ANIMATION ////////////////////////////
.animate1 {
	transform: translateY(280%) rotate(-45deg);
}
.disappear {
	opacity: 0;
}
.animate2 {
	transform: translateY(-280%) rotate(45deg);
}
</style>
