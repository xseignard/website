<template>
	<div id="nav">
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
	methods: {
		showMenu: function(event){
			var menu = document.querySelector('.nav--list');
			var bar1 = document.querySelector('.bar1');
			var bar2 = document.querySelector('.bar2');
			var bar3 = document.querySelector('.bar3');
			var navBar = document.querySelector('#nav');
			navBar.classList.toggle('white');
			menu.classList.toggle('showing');
			bar1.classList.toggle('animate1');
			bar2.classList.toggle('disappear');
			bar3.classList.toggle('animate2');
		}
	},
};
</script>

<style scoped>
@media (max-width:768px) {
	div#nav{
		padding:0;
	}
	#nav .menu-icon{
		display:flex;
		position: absolute;
		padding:30px;
	}
	.nav--list{
		height:0;
		width:100%;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		overflow:hidden;
	}
	.white{
		background-color:white;
	}
	.fill{
		fill:#24003B;
	}
	#nav a{
		color:#24003B;
		text-align: center;
	}
	.showing{
		height:40vh;
		padding-bottom:10%;
		background-color: white;
	}

}
#nav {
	z-index: 1;
	position: absolute;
	top: 0;
	padding: 50px;
	display:flex;
	justify-content: flex-end;
	width: 100%;
	box-sizing: border-box;
	height:auto;
}
.nav--list{
	display:flex;
	overflow:hidden;
	transition: .4s ease-out;
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
.nav--list svg {
	position: absolute;
	stroke-width: 1.5px;
	stroke-dasharray: 100 100;
	stroke-dashoffset: 100;
	transition: 0.25s ease-out;
	stroke-linecap: round;
	top: 0;
	left: 0;
}
#nav a.router-link-exact-active svg,
#nav a:hover svg {
	stroke-dashoffset: 0;
}
.menu-icon{
  height:27px;
	display: none;
	position: relative;
  flex-direction:column;
  justify-content : space-between;
  align-items:flex-end;
	cursor:pointer;
}
rect{
	transition: .25s ease-out;
}
.animate1{
  animation : spin1 .35s ease forwards;
}
.disappear{
  opacity:0;
}
.animate2{
  animation: spin2 .35s ease forwards;
}
@keyframes spin1{
  0%{transform:translateY(0) rotate(0deg)}
  25%{transform:rotate(0deg)}
  60%{transform:translateY(130%)}
  100%{transform:translateY(250%) rotate(-45deg)}
}
@keyframes spin2{
  0%{ transform:translateY(0) rotate(0deg)}
  25%{transform:rotate(0deg)}
  60%{transform:translateY(-130%)}
  100%{transform:translateY(-250%) rotate(45deg)}
}
</style>
