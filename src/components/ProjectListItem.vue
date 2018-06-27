<template>
  <router-link :to="`/project/${project.id}`" @click.native="test" id="projectItem">
    <div class="itemID img" :style="`${getBgImage(project.featured_image)}`">
      <div class="hover">
        <svg width="100%" height="100%">
          <rect x="0" y="0" width="0" height="100%" :style="`fill:${getProjectColor(project)}`"/>
        </svg>
        <div class="hover--details">
          <p v-html="project.baseline" class="baseline"></p>
          <p class="type">–</p>
          <p v-html="project.type[0]"class="type"></p>
          <p>{{project.date}}</p>
          <p>
            <ul>
              <li v-for ="t in project.technologies">{{t.name}}</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
    <h2 v-html="project.title" />
  </router-link>
</template>


<script>
import { mapGetters } from 'vuex';



export default{
  props: {
    project: Object,
  },
	methods: {
		getBgImage(img) {
			return `background-image: url(${img.url})`;
		},
    test(evt) {
      console.log(evt);
    }
	},
  computed:{
    ...mapGetters(['getProjectColor']),
  }
}

</script>

<style scoped>
  #projectItem{
    color:white;
    text-decoration: none;
  }
  .itemID{
    height:30vh;
    width:27vw;
    position:relative;
    margin-right: 0;
  }
  .hover{
    width:85%;
    height:100%;
    position:absolute;
  }
  .hover:hover .hover--details{
    opacity:1;
  }
  rect{
    transition: 0.3s ease-out;
  }
  .hover:hover rect{
    width:100%;
  }
  .hover--details{
    opacity: 0;
    padding:5%;
    box-sizing: border-box;
    position:relative;
    z-index: 1;
    transition: 0.25s 0.1s ease-out;
  }
  .baseline{
    font-family: 'Open Sans Light';
  }
  .type{
    text-transform: uppercase;
    font-weight: bold;
  }
  ul{
    list-style-type: none;
    padding:0;
  }
  svg{
    position:absolute;
  }
  h2{
    text-transform: uppercase;
    font-size:1.15rem;
  }
</style>
