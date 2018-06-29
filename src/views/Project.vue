<template>
	<div class="page project">
		<NavStyle />
		<svg class="color" width="100%" height="55vh">
			<rect width="100%" height="100%" :style="`fill:${getProjectColor(project)}`"/>
		</svg>
		<div class="project--title">
			<h1 v-html="project.title" />
			<p class="baseline" v-html="'– ' + project.baseline" />
		</div>
		<div class="project--top">
			<div class="project--presentation">
				<div class="img heroimage" :style="`${getBgImage(project.featured_image)}`"></div>
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
				<div class="project--img img" :style="`${getBgImage(this.nextProject.featured_image)}`">
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
				} else {
					return this.$store.getters.getProjectById(ids[0]);
				}
			}
		}),
		...mapGetters(['getProjectColor']),
	},
	methods: {
		getBgImage(img) {
			return `background-image: url(${img.url})`;
		},
	},
};
</script>

<style scoped>

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
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.project--presentation{
		display:flex;
		box-sizing: border-box;
		padding: 0 15% 2% 27%;
	}
	.color{
		position:absolute;
		z-index: -1;
	}
	.details{
		margin-left:4%;
		min-width : 300px;
	}
	.details ul{
		padding:0;
		list-style-type: none;
		margin:0;
	}
	li:not(:last-of-type)::after{
		content:',';
	}
	.details p{
		letter-spacing: 1px;
		margin-top:0;
	}
	.details .type{
		text-transform: uppercase;
		font-weight: bold;
	}
	.heroimage{
		width:40vw;
		height:45vh;
	}
	/* NOTE: PROJECT CONTENT **********************************/
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
	.project--content div:not(.content--description){
		transform:translateY(4vh);
		opacity:0;
		transition:.5s ease-out;
	}
	.project--content div.visible{
		transform:translateY(0);
		opacity:1;
	}
	.content--description{
		grid-area: description;
		margin-top: -4%;
		max-width: 40vw;
	}
	.content--focus{
		max-width:37vw;
		align-self: center;
	}
	.focus1{
		grid-area: 2 / 1 / 3 / 3;
		justify-self:start;
	}
	.focus2{
		grid-area: 3 / 2 / 4 / 4;
		text-align: right;
	}
	.content--img:nth-child(2){
		justify-self:end;
	}
	.content--img:nth-of-type(3){
		margin-right: 4vw;
	}
	.content--img:nth-of-type(4){
		margin-left:4vw;
	}
	.content--img:nth-of-type(5){
		grid-area: 4 / 3 / 5 / 4 ;
	}
	img{
		max-width: 450px;
		max-height: 400px;
		object-fit: cover;
	}
	/* NOTE: NEXT PROJECT **********************************/
	.content--next{
		width:100%;
		display:flex;
		justify-content:center;
		align-items:center;
		margin-bottom: 25vh;
		margin-top:25vh;
	}
	.content--next p{
		font-family: 'Qontra';
	}
	.content--next p:nth-of-type(2){
		font-size:1.3rem;
		font-weight:bold;
		text-transform:uppercase;
	}
	.next--project{
		color:white;
		text-decoration:none;
	}
	.project--img{
		width:15vw;;
		height:14vh;
		position:relative;
	}
	.project--color {
		width: 100%;
		height: 100%;
		position: absolute;
		bottom: 0;
		opacity: 0.6;
	}
</style>
