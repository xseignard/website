<template>
	<div class="page project">
		<NavStyle />
		<svg class="color" width="100%" :height="height">
			<rect width="100%" height="100%" :style="`fill:${getProjectColor(project)}`"/>
		</svg>
		<div class="project--title">
			<h1 v-html="project.title" />
			<p class="baseline" v-html="'– ' + project.baseline" />
		</div>
		<div class="project--top">
			<div class="project--presentation">
				<div class="heroimage--container">
					<div class="img heroimage" :style="getBgImage(project.featured_image.sizes.large)" />
					<div class="layer" v-scroll="{class: 'reveal', threshold: 0.4}" :style="`background-color: #F88429`"/>
				</div>
				<div class="details">
					<p class="type" v-for="type in project.type"> {{type}}</p>
					<p v-html="'– ' + project.type_of_client"></p>
					<p v-html ="project.date"></p>
					<p>
						<ul>
							<li v-for="t in project.technologies">
								{{ t.name}}
							</li>
						</ul>
					</p>
				</div>
				<svg width="300px" height="1px">
					<line x1="50" y1="0" x2="250" y2="0" :style="`stroke:${getProjectColor(project)}`"/>
				</svg>
			</div>
		</div>
		<div class="project--content">
			<div class="content--description">
				<p v-html="project.description"></p>
			</div>
			<div v-scroll="{class: 'visible', threshold: 0.2}" v-for="image in project.gallery" class="content--img img">
				<img :src="image.url" :alt="image.title">
			</div>
			<div v-scroll="{class: 'visible', threshold: 0.6}" class="content--focus focus1">
				<h2 v-html="`${project.focus_1.title}`"></h2>
				<p v-html="project.focus_1.content"></p>
			</div>
			<div v-scroll="{class: 'visible', threshold: 0.6}" class="content--focus focus2">
				<h2 v-html="project.focus_2.title"></h2>
				<p v-html="project.focus_2.content"></p>
			</div>
		</div>
		<div class="content--next">
			<router-link :to="`/project/${this.nextProject.id}`" class="next--project">
				<p>– next project</p>
				<div class="project--img img">
					<img :src="this.nextProject.featured_image.url" :alt="this.nextProject.title">
					<div class="project--color" :style="`background-color: ${getProjectColor(this.nextProject)}`"></div>
				</div>
				<p class="name" v-html="this.nextProject.title"></p>
			</router-link>
		</div>
		<FooterStyle ref="footer" />
	</div>
</template>

<script>
import FooterStyle from '@/components/FooterStyle.vue';
import NavStyle from '@/components/NavStyle.vue';
import { mapGetters, mapState } from 'vuex';

export default {
	components: {
		FooterStyle,
		NavStyle,
	},
	computed: {
		...mapState({
			projects: state => state.projects,
			project() {
				return this.$store.getters.getProjectById(this.$route.params.id);
			},
			nextProject() {
				const projects = this.$store.state.projects;
				const ids = projects.map(project => project.id);
				const index = ids.indexOf(this.project.id);
				if (index + 1 <= ids.length - 1) {
					return this.$store.getters.getProjectById(ids[index + 1]);
				} else {
					return this.$store.getters.getProjectById(ids[0]);
				}
			},
		}),
		...mapGetters(['getProjectColor']),
		height() {
			return window.innerHeight * 0.55;
		},
	},
	methods: {
		getBgImage(img) {
			return `background-image: url(${img})`;
		},
	},
};
</script>

<style scoped>
/* NOTE: PROJECT TOP *********************/
	@media (max-width:768px) {
		.project .project--title{
			margin:0;
			width:100%;
			top:13vh;
			padding: 0 7% 0 7%;
			box-sizing: border-box;
		}
		.project .project--top{
			height:90vh;
		}
		.project .project--top svg{
			display:block;
		}
		.project h1{
			font-size: 2.3rem;
			letter-spacing: 2px;
			align-self:start;
		}
		.baseline{
			margin-top:2%;
			font-size:0.85rem;
		}
		.project .project--presentation{
			flex-direction:column;
			padding:0 10% 0 10%;
		}
		.project .heroimage{
			width:100%;
			height:33vh;
			margin-bottom: 3vh;
		}
		.project .details{
			margin-left:0;
			margin-bottom: 3vh;
		}
		.details p{
			margin-bottom:3.5%;
			font-size: 0.9rem;
		}
		.details p:last-of-type{
			margin-bottom: 4%;
		}
		.project .details ul{
			display:flex;
			flex-wrap: wrap;
		}
		.project h1 {
			font-size: 2.3rem;
			letter-spacing: 2px;
			align-self: start;
		}
	}
	h2{
		text-transform: uppercase;
		font-family: 'Qontra';
	}
	h2::before{
		content:'– ';
	}
	h1{
		position:static;
		margin:0;
	}
	.project > svg {
		height: 55vh;
	}
	.project--title{
		margin-left: 15%;
		position: absolute;
		top: 15vh;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.project--top{
		height:80vh;
	}
	.details .type{
		text-transform: uppercase;
		font-weight: bold;
	}
	.project--top svg{
		display:none;
		stroke-linecap: round;
		stroke-width: 0.5px;
		margin-top:5%;
	}
	.heroimage{
		width:40vw;
		height:45vh;
	}
	/* NOTE: PROJECT CONTENT **********************************/
	@media (max-width:768px) {
		.project .project--content{
			grid-template-areas: "description";
			grid-template-columns: 1fr;
			grid-gap:10vh 2vh;
			margin-top: 4.5vh;
			padding: 0 10% 0 10%;
		}
		.project .content--description{
			max-width:100%;
		}
		.project .content--img{
			justify-self:start;
		}
		.project img{
			max-width:100%;
		}
		.project .content--focus{
			max-width: 100%;
		}
		.project .focus1{
			grid-area: 3 / 1 / 4 / 2;
		}
		.project .focus2{
			grid-area: 5 / 1 / 6 /2;
		}
		.project .content--img:nth-of-type(5){
			grid-column:1 / 2;
		}
	}
	.project--content{
		max-width:100%;
		margin-top: 17vh;
		padding: 0 15% 0 15%;
		box-sizing: border-box;
		position:relative;
		display: grid;
		justify-content: space-between;
		justify-items:start;
		grid-gap : 17vh 2vh;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		grid-template-areas:
		"description description image_1";
	}

	h2 {
		text-transform: uppercase;
		font-family: 'Qontra';
	}
	h2::before {
		content: '– ';
	}
	h1 {
		position: static;
		margin: 0;
	}
	.project--title {
		margin-left: 15%;
		position: absolute;
		top: 15vh;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.project--top {
		height: 80vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.project--presentation {
		display: flex;
		box-sizing: border-box;
		padding: 0 15% 2% 27%;
	}
	.color {
		position: absolute;
		z-index: -1;
	}
	.details {
		margin-left: 4%;
		min-width: 300px;
	}
	.details ul {
		padding: 0;
		list-style-type: none;
		margin: 0;
	}
	li:not(:last-of-type)::after {
		content: ', ';
	}
	.details p {
		letter-spacing: 1px;
		margin-top: 0;
	}
	.details .type {
		text-transform: uppercase;
		font-weight: bold;
	}
	.heroimage--container {
		position: relative;
		overflow: hidden;
	}
	.heroimage {
		width: 40vw;
		height: 45vh;
	}
	.layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 101%;
		transition: 0.35s 0.6s ease-out;
	}
	.layer.reveal {
		transform: translateY(101%);
	}
/* NOTE: PROJECT CONTENT **********************************/
@media (max-width: 768px) {
	.project .project--content {
		grid-template-areas: 'description';
		grid-template-columns: 1fr;
		grid-gap: 10vh 2vh;
		margin-top: 8vh;
		padding: 0 10% 0 10%;
	}
	.project .content--description {
		max-width: 100%;
	}
	.project .content--img {
		justify-self: start;
	}
	.project img {
		max-width: 100%;
	}
	.project .content--focus {
		max-width: 100%;
	}
	.project .focus1 {
		grid-area: 3 / 1 / 4 / 2;
	}
	.project .focus2 {
		grid-area: 5 / 1 / 6 /2;
	}
	.project .content--img:nth-of-type(5) {
		grid-column: 1 / 2;
	}
}
.project--content {
	max-width: 100%;
	margin-top: 17vh;
	padding: 0 15% 0 15%;
	box-sizing: border-box;
	position: relative;
	display: grid;
	justify-content: space-between;
	justify-items: start;
	grid-gap: 17vh 2vh;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: auto;
	grid-template-areas: 'description description image_1';
}
.project--content div:not(.content--description) {
	transform: translateY(4vh);
	opacity: 0;
	transition: 0.5s ease-out;
}
.project--content div.visible {
	transform: translateY(0);
	opacity: 1;
}
.content--description {
	grid-area: description;
	margin-top: -4%;
	max-width: 40vw;
}
.content--focus {
	max-width: 37vw;
	align-self: center;
}
.focus1 {
	grid-area: 2 / 1 / 3 / 3;
	justify-self: start;
}
.focus2 {
	grid-area: 3 / 2 / 4 / 4;
	text-align: right;
}
.content--img:nth-child(2) {
	justify-self: end;
}
.content--img:nth-of-type(3) {
	margin-right: 4vw;
}
.content--img:nth-of-type(4) {
	margin-left: 4vw;
}
.content--img:nth-of-type(5) {
	grid-area: 4 / 3 / 5 / 4;
}
img {
	max-width: 450px;
	max-height: 400px;
	object-fit: cover;
}
/* NOTE: NEXT PROJECT **********************************/
@media (max-width: 768px) {
	.project .next--project {
		min-width: 50%;
	}
	.project .content--next {
		margin-top: 20vh;
		margin-bottom: 40vh;
	}
	.project .project--img {
		max-width: 50vw;
	}
}

.content--next {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 25vh;
	margin-top: 25vh;
}
.content--next p {
	font-family: 'Qontra';
}
.content--next p:nth-of-type(2) {
	font-size: 1.3rem;
	font-weight: bold;
	text-transform: uppercase;
}
.next--project {
	min-width: 20%;
	color: white;
	text-decoration: none;
}
.project--img {
	max-width: 17vw;
	width: 95%;
	height: 20vh;
	position: relative;
	overflow: hidden;
	display: flex;
	justify-content: center;
}
.next--project:hover img {
	transform: scale(1.1);
}
.project--img img {
	max-height: 100%;
	object-fit: cover;
	transition: 0.25s ease-out;
}
.project--color {
	width: 100%;
	height: 100%;
	position: absolute;
	bottom: 0;
	opacity: 0.6;
}
</style>
