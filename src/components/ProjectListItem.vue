<template>
  <a @click="saveClickedProject" class="projectItem">
    <div class="itemID img" :style="`${getBgImage(project.featured_image)}`">
      <div
        class="color"
        :style="`background-color: ${getProjectColor(project)}`"
      />
      <div class="hover" v-scroll="{ class: 'visible', threshold: 1 }">
        <div
          class="layer"
          :style="`background-color:${getProjectColor(project)}`"
        />
        <div class="hover--details">
          <p v-html="project.baseline" class="baseline"></p>
          <p v-html="project.type[0]" class="type"></p>
          <p class="separator">–</p>
          <ul>
            <li v-for="t in project.technologies" :key="t.name">
              {{ t.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h2 v-html="project.title" />
  </a>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    project: Object,
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getBgImage(img) {
      return `background-image: url(${img.url})`
    },
    saveClickedProject() {
      const el = this.$el.querySelector('.hover')
      el.querySelector('.layer').style.transform = 'translateX(0)'
      el.querySelector('.hover--details').style.transform = 'translateX(0)'
      this.$store.commit('SET_CLICKED_PROJECT', el)
      this.$router.push(`/project/${this.project.id}`)
    },
    handleScroll() {
      const title = this.$el.querySelector('h2')
      const top = title.getBoundingClientRect().top
      if (top <= window.innerHeight * 0.54) title.classList.add('purple')
      else title.classList.remove('purple')
    },
  },
  computed: {
    ...mapGetters(['getProjectColor']),
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.projectItem {
  color: white;
  text-decoration: none;
  cursor: pointer;
  svg {
    position: absolute;
  }
  h2 {
    text-transform: uppercase;
    font-size: 1.15rem;
    @include short-transition;
    &.purple {
      color: $dark-purple;
    }
  }
  .itemID {
    height: 40vh;
    width: 30vw;
    position: relative;
    @media (max-width: 768px) {
      width: 70vw;
      min-height: 33vh;
    }
    &:hover .hover--details,
    &:hover .layer {
      opacity: 1;
      transform: translateX(0);
    }
    .layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      @include short-transition();
      @media (max-width: 768px) {
        @include long-transition(0.4s);
      }
    }
    .color {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      opacity: 0.4;
    }
    .hover {
      width: 85%;
      height: 100%;
      position: absolute;
      overflow: hidden;
      &.visible .hover--details,
      &.visible .layer {
        @media (max-width: 768px) {
          opacity: 1;
          transform: translateX(0);
        }
      }
      &--details {
        transform: translateX(-10%);
        opacity: 0;
        padding: 5%;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        @include short-transition(0.15s);
        @media (max-width: 768px) {
          @include long-transition(0.55s);
          font-size: 0.9rem;
        }
        .baseline {
          font-family: 'Open Sans';
          font-weight: lighter;
        }
        .type {
          text-transform: uppercase;
          font-weight: bold;
          @media (max-width: 768px) {
            margin-bottom: 0;
          }
        }
        .separator {
          @media (max-width: 768px) {
            margin: 0;
          }
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
      }
    }
  }
}
</style>
