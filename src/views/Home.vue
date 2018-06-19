<template>
	<div class="page home">
		<NavStyle />
		<div class="home--background"></div>
		<div class="home--top">
			<div class="home--top--content">
				<h1> STRIKING <br>HEADLINES </h1>
					<button type="button" class="main-button" >
						<p>SEE WHAT I MAKE</p>
					</button>
			</div>
		</div>
		<div class="home--content">
			<div class="home--content--about">
				<h2> &#151; Hello, I'm Xavier</h2>
				<p>Martinus agens illas provincias pro praefectis aerumnas tium graviter gemens saepeque obsecrans, ut ab omni culpa inmunibus parceretur, cum non inpetraret, minabatur se discessurum: ut saltem id metuens perquisitor malivolus tandem desineret quieti coalitos.</p>
				<button type="button" class="secondary-button">
					<p>MORE ABOUT ME</p>
				</button>
			</div>
			<div class="home--content--projects">
				<h2> &#151; Newest projects</h2>
					<div class="home--content--projects--list">
						<div class="project home--content--projects--first">
							<div class="img"></div>
							<div class="color"></div>
							<p>NAME OF THE PROJECT</p>
						</div>
						<div class="project home--content--projects--second">
							<div class="img"></div>
							<div class="color"></div>
							<p>NAME OF THE PROJECT</p>
						</div>
					</div>
				<button type="button" class="secondary-button">
					<p>SEE ALL MY WORKS</p>
				</button>
			</div>
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
/* NOTE: TOP LAYOUT **************************/
.home{
	height:160vh;
}
.home--background, .home--top{
	height:83vh;
	width:100vw;
}
.home--background{
	background-image: url(../assets/images/BackgroundTemplate.jpg);
	background-size: cover;
	background-position: center;
	z-index:-1;
}
.home--top{
	position:absolute;
	background-color: rgba(36, 0, 59, 0.6);
	display:flex;
	align-items: flex-end;
}
.home--top--content{
	width:100vw;
	height:35vh;
	box-sizing: border-box;
	padding: 0 15% 0 15%;
	margin-bottom: 10%;
	display: flex;
	justify-content: space-between;
}
h1{
	margin-left:0;
	font-size:3.5rem;
	letter-spacing: 6px;
	position: relative;
}
.main-button{
	align-self: flex-end;
	padding:0 40px 0 40px;
	border: 2px solid #8B73CF;
	border-radius: 3px;
	background-color: transparent;
	color:white;
	transition:0.2s ease-out;
}
.main-button:hover{
	background-color: white;
	border:2px solid white;
	color:#24003B;
	transform:scale(1.05);
}
.main-button p {
	font-size:0.90rem;
	letter-spacing: 2px;
	font-weight: bolder;
}

/* NOTE: CONTENT LAYOUT  ********************/
H2{
	font-family: 'Qontra', sans-serif;
	font-size: 1.75rem;
}
.home--content{
	margin-top: 3%;
	display: inline-grid;
	grid-template-columns:1fr 2fr;
	grid-template-areas: "about projects";
	grid-gap:7%;
	padding:0 15% 0 15%;
	box-sizing: border-box;
}
.home--content--about{
	grid-area: about;
}
.home--content--projects{
	grid-area: projects;
	position:relative;
}
.home--content--projects--list{
	display: flex;
	height:90%;
	width:100%;
	justify-content: space-between;
}
.project{
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position:relative;
	width:45%;
}
.project div {
	height:80%;
	width:100%;
	top:0;
	background-color: #4FDAB1;
	position:absolute;
}
.secondary-button{
	margin-top:30px;
	border:2px solid white;
	border-radius: 3px;
	padding: 5px 25px 5px 25px;
	transition:0.2s ease-out;
}
.secondary-button:hover{
	transform:scale(1.05);
	color:white;
	background-color: #24003B;
}
.secondary-button p{
	margin:0;
	font-size: 0.60rem;
}
</style>
