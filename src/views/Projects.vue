<template>
  <div class="page projects">
    <NavStyle />
    <div id="white-layer" class="color" :style="`height: ${h}px`" />
    <h1>Projects</h1>
    <div class="projects--content">
      <ProjectListItem
        v-scroll="{ class: 'visible', threshold: 0.3 }"
        :project="project"
        :key="project.id"
        v-for="project in projects"
      />
    </div>
    <FooterStyle ref="footer" />
  </div>
</template>
<script>
import FooterStyle from '@/components/FooterStyle.vue'
import NavStyle from '@/components/NavStyle.vue'
import ProjectListItem from '@/components/ProjectListItem.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  metaInfo: {
    title: 'Projects',
  },
  components: {
    FooterStyle,
    ProjectListItem,
    NavStyle,
  },
  data() {
    return {
      h: 0,
    }
  },
  mounted() {
    this.h = window.innerHeight * 0.55
  },
  computed: {
    ...mapState({
      projects: state => state.projects,
    }),
    ...mapGetters(['getProjectColor']),
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.projects {
  transform: none !important;
  h1 {
    color: $dark-purple;
  }
  .color {
    position: fixed;
    width: 100%;
    background-color: white;
  }
  &--content {
    padding: $padding-desktop;
    margin-top: 33vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: $margin-bottom;
    @media (max-width: 768px) {
      margin-top: 42vh;
      padding: $padding-mobile;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0;
    }
    a {
      transform: translateY(4vh);
      opacity: 0;
      @include short-transition;
      @media (max-width: 768px) {
        width: 100%;
      }
      &.visible {
        transform: translateY(0);
        opacity: 1;
      }
      &:nth-child(2n) {
        margin-top: 15vh;
        transition-delay: 0.2s;
        @media (max-width: 768px) {
          margin-top: 0;
        }
      }
      &:not(:last-child) {
        @media (max-width: 768px) {
          margin-bottom: 6%;
        }
      }
    }
  }
}
</style>
