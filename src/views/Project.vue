<template>
	<div class="page project">
		<NavStyle />
		<svg class="color" width="100%" height="55vh">
			<rect width="100%" height="100%" :style="`fill:#4FDAB1`"/>
		</svg>
		<h1 v-html="project.title" />
		<div class="project--top">
			<div class="project--presentation">
				<div class="featuredimage" :style="project0.style"></div>
				<div class="details">
					<p class="type" v-for="type in project.type"> {{type}}</p>
					<p v-html ="project.date"></p>
					<ul>
						<li v-for="t in project.technologies">
							<p>{{ t.name + ','}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="project--content">
			<div class="introduction">
				<div class="introduction--description">
					<p v-html="project.description"></p>
				</div>
				<div class="introduction--image1"></div>
				<div class="introduction--image1"></div>
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
			project0: state => ({
				style: {
					backgroundImage: `url(${state.projects[0].featured_image.url})`,
				},
			}),
		}),
		project() {
			return this.$store.getters.getProjectById(this.$route.params.id);
		},
		...mapGetters(['getProjectColor']),
	},
};
</script>

<style scoped>
	.project--top{
		height:75vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}
	.project--presentation{
		display:flex;
		box-sizing: border-box;
		padding: 0 15% 0 15%;
	}
	.color{
		position:absolute;
		z-index: -1;
	}
	.details{
		margin-left:4%;
	}
	.details ul{
		padding:0;
		list-style-type: none;
		display:flex;
		margin:0;
	}
	.details p{
		letter-spacing: 1px;
		margin-top:0;
	}
	.details .type{
		text-transform: uppercase;
	}
	.featuredimage{
		width:40vw;
		height:45vh;
		background-size: cover;
		background-position: center;
		filter: drop-shadow(5px 7px 10px rgba(0, 0, 0, 0.3));
	}
	/* NOTE: PROJECT CONTENT **********************************/
	.project--content{
		padding: 0 15% 0 15%;
		box-sizing: border-box;
		position:relative;
	}
	.introduction{
		display: inline-grid;
		grid-template-areas: 1fr 1fr 1fr;
		grid-template-rows: 'text img1 img2';
		justify-content: space-between;
	}
</style>
