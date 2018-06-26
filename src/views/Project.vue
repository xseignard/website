<template>
	<div class="page project">
		<NavStyle />
		<svg class="color" width="100%" height="55vh">
			<rect width="100%" height="100%" :style="`fill:${getProjectColor(project)}`"/>
		</svg>
		<h1 v-html="project.title" />
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
			<div v-for="image in project.gallery" class="content--img img">
				<img :src="image.url" :alt="image.title">
			</div>
			<div class="content--focus focus1">
				<h2 v-html="project.focus_1.title"></h2>
				<p v-html="project.focus_1.content"></p>
			</div>
			<div class="content--focus focus2">
				<h2 v-html="project.focus_2.title"></h2>
				<p v-html="project.focus_2.content"></p>
			</div>
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
			project() {
				return this.$store.getters.getProjectById(this.$route.params.id);
			},
		}),
		...mapGetters(['getProjectColor']),
	},
	methods:{
		getBgImage(img) {
			return `background-image: url(${img.url})`;
		}
	}
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
		padding: 0 15% 0 27%;
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
	.img{
		background-size: cover;
		background-position: center;
		filter: drop-shadow(5px 7px 10px rgba(0, 0, 0, 0.3));
	}
	.project--content{
		max-width:100%;
		margin-top: 17vh;
		margin-bottom: 25vh;
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
		max-height: 500px;
		object-fit: cover;
	}
</style>
