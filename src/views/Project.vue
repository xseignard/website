<template>
  <div class="page project">
    <NavStyle />
    <div
      class="color"
      :style="`background-color:${getProjectColor(project)}; height: ${h}px`"
    />
    <div class="project--title" v-scroll="{ class: 'visible', threshold: 0.2 }">
      <h1 v-html="project.title" />
      <p class="baseline" v-html="'– ' + project.baseline" />
    </div>
    <div class="project--top">
      <div class="project--presentation">
        <div
          class="heroimage--container"
          v-scroll="{ class: 'visible', threshold: 0.2 }"
        >
          <div
            class="img heroimage"
            :style="getBgImage(project.featured_image.url)"
          />
          <div
            class="layer"
            v-scroll="{ class: 'reveal', threshold: 0.4 }"
            :style="`background-color: ${getLayerColor(project)}`"
          />
        </div>
        <div class="details">
          <p
            v-scroll="{ class: 'visible', threshold: 0.2 }"
            class="type"
            v-for="(type, i) in project.type"
            :key="i"
          >
            {{ type }}
          </p>
          <p
            v-scroll="{ class: 'visible', threshold: 0.2 }"
            v-html="`– ${project.type_of_client}`"
          />
          <p
            v-scroll="{ class: 'visible', threshold: 0.2 }"
            v-html="project.date"
          />
          <ul class="technologies">
            <li
              v-scroll="{ class: 'visible', threshold: 0.2 }"
              v-for="(t, i) in project.technologies"
              :key="i"
            >
              {{ t.name }}
            </li>
          </ul>
        </div>
        <svg width="300px" height="1px">
          <line
            x1="50"
            y1="0"
            x2="250"
            y2="0"
            :style="`stroke:${getProjectColor(project)}`"
          />
        </svg>
      </div>
    </div>
    <div class="project--content">
      <div class="project--content--portion description">
        <div class="content--description">
          <p v-html="project.description"></p>
        </div>
      </div>
      <div class="project--content--portion focus1">
        <div
          v-scroll="{ class: 'visible', threshold: 0.6 }"
          class="content--focus focus1"
        >
          <h2 v-html="project.focus_1.title"></h2>
          <p v-html="project.focus_1.content"></p>
        </div>
        <div
          v-scroll="{ class: 'visible', threshold: 0.2 }"
          class="content--img img"
        >
          <img :src="getImage(0).url" :alt="getImage(0).title" />
        </div>
      </div>
      <div class="project--content--portion focus2">
        <div
          v-scroll="{ class: 'visible', threshold: 0.6 }"
          class="content--focus focus2"
        >
          <h2 v-html="project.focus_2.title"></h2>
          <p v-html="project.focus_2.content"></p>
        </div>
        <div
          v-scroll="{ class: 'visible', threshold: 0.2 }"
          class="content--img img"
        >
          <img :src="getImage(1).url" :alt="getImage(1).title" />
        </div>
      </div>
      <div v-if="project.video.id" class="project--content--portion video">
        <Player :project="project" />
      </div>
      <div v-else class="project--content--portion images">
        <div
          v-scroll="{ class: 'visible', threshold: 0.2 }"
          v-for="(image, i) in getOtherImages()"
          class="content--img img"
          :key="i"
        >
          <img :src="image.url" :alt="image.title" />
        </div>
      </div>
    </div>
    <div class="content--next">
      <a @click="saveClickedProject" class="next--project">
        <p>– next project</p>
        <div class="next--project--container" ref="next">
          <div
            class="project--img img"
            :style="getBgImage(nextProject.featured_image.sizes.medium)"
          >
            <div
              class="project--color"
              :style="`background-color: ${getProjectColor(nextProject)}`"
            ></div>
          </div>
        </div>
        <p class="name" v-html="nextProject.title"></p>
      </a>
    </div>
    <FooterStyle ref="footer" />
  </div>
</template>

<script>
import FooterStyle from '@/components/FooterStyle.vue'
import NavStyle from '@/components/NavStyle.vue'
import Player from '@/components/Player.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.project.title,
    }
  },
  components: {
    FooterStyle,
    NavStyle,
    Player,
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
      project() {
        return this.$store.getters.getProjectById(this.$route.params.id)
      },
      nextProject() {
        const projects = this.$store.state.projects
        const ids = projects.map(project => project.id)
        const index = ids.indexOf(this.project.id)
        if (index + 1 <= ids.length - 1) {
          return this.$store.getters.getProjectById(ids[index + 1])
        } else {
          return this.$store.getters.getProjectById(ids[0])
        }
      },
    }),
    ...mapGetters(['getProjectColor', 'getLayerColor']),
  },
  methods: {
    getBgImage(img) {
      return `background-image: url(${img})`
    },
    getImage(index) {
      return this.project.gallery[index]
    },
    getOtherImages() {
      return this.project.gallery.slice(2)
    },
    saveClickedProject() {
      this.$store.commit('SET_CLICKED_PROJECT', this.$refs.next)
      this.$router.push(`/project/${this.nextProject.id}`)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.project {
  h1 {
    position: static;
    margin: 0;
    @media (max-width: 768px) {
      font-size: 2.3rem;
      letter-spacing: 2px;
      align-self: start;
    }
  }
  h2 {
    text-transform: uppercase;
    font-family: 'Qontra';
    &::before {
      content: '– ';
    }
  }
  /* NOTE: PROJECT TOP *******************************************/
  .color {
    position: absolute;
    z-index: -1;
    width: 100%;
  }
  &--title {
    margin-left: 15%;
    position: absolute;
    top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    opacity: 0;
    @include long-transition(0.3s);
    &.visible {
      opacity: 1;
    }
    @media (max-width: 768px) {
      margin: 0;
      width: 100%;
      top: 13vh;
      padding: 0 7% 0 7%;
      box-sizing: border-box;
    }
    .baseline {
      @media (max-width: 768px) {
        margin-top: 2%;
        font-size: 0.85rem;
      }
    }
  }
  &--top {
    height: 80vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    @media (max-width: 768px) {
      height: 93vh;
    }
    svg {
      display: none;
      stroke-linecap: round;
      stroke-width: 0.5px;
      @media (max-width: 768px) {
        display: block;
      }
    }
  }
  &--presentation {
    display: flex;
    box-sizing: border-box;
    padding: 0 15% 2% 33%;
    @media (max-width: 768px) {
      flex-direction: column;
      padding: $padding-mobile;
    }
    .details {
      margin-left: 4%;
      min-width: 300px;
      @media (max-width: 768px) {
        margin-left: 0;
        margin-bottom: 3vh;
      }
      *:not(.technologies) {
        transform: translateX(4vh);
        opacity: 0;
        @include long-transition(0.3s);
      }
      *.visible {
        transform: translateX(0);
        opacity: 1;
      }
      ul {
        padding: 0;
        list-style-type: none;
        margin: 0;
        @media (max-width: 768px) {
          display: flex;
          flex-wrap: wrap;
        }
        li:first-of-type {
          transition-delay: 0.5s;
        }
        li:nth-of-type(2) {
          transition-delay: 0.6s;
        }
        li:nth-of-type(3) {
          transition-delay: 0.7s;
        }
        li:not(:last-of-type)::after {
          content: ',';
          padding-right: 6px;
          margin-left: -4px;
        }
      }
      .type {
        text-transform: uppercase;
        font-weight: bold;
      }
      p {
        letter-spacing: 1px;
        margin-top: 0;
        @media (max-width: 768px) {
          margin-bottom: 3.5%;
          font-size: 0.9rem;
        }
        &:nth-child(2) {
          transition-delay: 0.3s;
        }
        &:nth-child(3) {
          transition-delay: 0.4s;
        }
        &:last-of-type {
          @media (max-width: 768px) {
            margin-bottom: 4%;
          }
        }
      }
    }
    .heroimage--container {
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateX(-4vh);
      @include long-transition(0.3s);
      &.visible {
        opacity: 1;
        transform: translateX(0);
      }
      @media (max-width: 768px) {
        margin-bottom: 3vh;
      }
      .heroimage {
        width: 40vw;
        height: 45vh;
        @media (max-width: 768px) {
          width: 100%;
          height: 33vh;
        }
      }
      .layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 101%;
        @include short-transition(0.6s);
        &.reveal {
          transform: translateY(101%);
        }
      }
    }
  }
  /* NOTE: PROJECT CONTENT ************************************************/
  .project--content {
    width: 100%;
    display: flex;
    margin-top: 1vh;
    flex-direction: column;
    padding: $padding-desktop;
    box-sizing: border-box;
    position: relative;
    @media (max-width: 768px) {
      margin-top: 2vh;
      padding: $padding-mobile;
    }
    &--portion {
      display: flex;
      width: 100%;
      justify-content: space-between;
      @media (max-width: 768px) {
        flex-direction: column-reverse;
        margin-left: 0;
        margin-right: 0;
      }
      & > * {
        margin: 0 15px;
        @media (max-width: 768px) {
          margin: 0 0 6vh 0;
        }
      }
      &:nth-child(2n) {
        margin-left: 3vw;
        @media (max-width: 768px) {
          margin-left: 0;
        }
      }
      &:nth-child(2n + 1):not(.description) {
        margin-right: 3vw;
        @media (max-width: 768px) {
          margin-right: 0;
        }
      }
      &:first-of-type.description {
        justify-content: center;
        margin-bottom: 100px;
        @media (max-width: 768px) {
          margin: 0;
        }
      }
      &:not(:last-of-type) {
        margin-bottom: 110px;
        @media (max-width: 768px) {
          margin: 0;
        }
      }
      &.focus2,
      &.images {
        text-align: right;
        flex-direction: row-reverse;
      }
      &.focus2 {
        @media (max-width: 768px) {
          flex-direction: column-reverse;
        }
      }
      &.images {
        margin: 0;
        @media (max-width: 768px) {
          flex-direction: column;
        }
      }
      &.video {
        justify-content: center;
        margin-left: 0;
      }

      div:not(.content--description) {
        transform: translateY(4vh);
        opacity: 0;
        @include long-transition;
      }
      div.visible {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .content--description {
      max-width: 65%;
      @media (max-width: 768px) {
        max-width: 100%;
      }
    }
    .content--focus {
      max-width: 37vw;
      align-self: center;
      @media (max-width: 768px) {
        max-width: 100%;
      }
    }
    .content--img {
      img {
        width: 35vw;
        height: 40vh;
        object-fit: cover;
        @media (max-width: 768px) {
          width: 100%;
          height: 33vh;
        }
      }
    }
  }
  /* NOTE: NEXT PROJECT **********************************/
  .content--next {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: $margin-bottom;
    margin-top: 90px;
    @media (max-width: 768px) {
      margin-top: 23%;
      margin-bottom: 0;
    }
    p {
      font-family: 'Qontra';
      &:nth-of-type(2) {
        font-size: 1.3rem;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
    .next--project {
      min-width: 20%;
      color: white;
      text-decoration: none;
      @media (max-width: 768px) {
        min-width: 50%;
      }
      &--container {
        overflow: hidden;
        max-width: 17vw;
        width: 95%;
        @media (max-width: 768px) {
          max-width: 50vw;
        }
        .project--img {
          width: 100%;
          height: 20vh;
          position: relative;
          overflow: hidden;
          @include short-transition;
          &:hover {
            transform: scale(1.05);
          }
          .project--color {
            width: 100%;
            height: 100%;
            opacity: 0.6;
          }
        }
      }
    }
  }
}
</style>
