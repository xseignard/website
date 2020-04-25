<template>
  <div class="page home">
    <NavStyle />
    <Canvas />
    <div class="home--top">
      <div class="home--top--content">
        <div class="home--top--content--title">
          <h1 v-html="about.home_headline" />
          <p
            v-scroll="{ class: 'visible-baseline', threshold: 0.2 }"
            v-html="'– ' + about.home_tagline"
          />
        </div>
        <router-link to="/projects">
          <button type="button" class="main-button">
            <p>SEE WHAT I MAKE</p>
          </button>
        </router-link>
      </div>
    </div>
    <div class="home--content">
      <div class="home--content--about">
        <h2>— Hello, I'm Xavier</h2>
        <p
          v-scroll="{ class: 'visible', threshold: 0.01 }"
          class="bio"
          v-html="about.home_intro"
        />
        <router-link to="/about">
          <button type="button" class="secondary-button">
            <p>MORE ABOUT ME</p>
          </button>
        </router-link>
      </div>
      <div class="home--content--projects">
        <h2>— Newest projects</h2>
        <div
          v-scroll="{ class: 'visible', threshold: 0 }"
          class="home--content--projects--list"
        >
          <a class="project" @click="() => saveClickedProject(1)">
            <div :style="project1.style" class="img">
              <div
                class="color"
                :style="`background-color: ${getProjectColor(project1)}`"
              />
              <div
                ref="first"
                v-scroll="{ class: 'visible', threshold: 0.01 }"
                class="hover"
              >
                <div
                  class="layer"
                  :style="`background-color:${getProjectColor(project1)}`"
                />
                <div class="hover--details">
                  <p class="baseline" v-html="project1.baseline"></p>
                  <p class="type" v-html="project1.type[0]"></p>
                  <p class="type">–</p>
                  <ul>
                    <li v-for="t in project1.technologies" :key="t.name">
                      {{ t.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p class="intro" v-html="project1.title" />
          </a>
          <a class="project" @click="() => saveClickedProject(2)">
            <div :style="project2.style" class="img">
              <div
                class="color"
                :style="`background-color: ${getProjectColor(project2)}`"
              />
              <div
                ref="second"
                v-scroll="{ class: 'visible', threshold: 0.01 }"
                class="hover"
              >
                <div
                  class="layer"
                  :style="`background-color:${getProjectColor(project2)}`"
                />
                <div class="hover--details">
                  <p class="baseline" v-html="project2.baseline"></p>
                  <p class="type" v-html="project2.type[0]"></p>
                  <p class="type">–</p>
                  <ul>
                    <li v-for="t in project2.technologies" :key="t.name">
                      {{ t.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p class="intro" v-html="project2.title" />
          </a>
        </div>
        <router-link to="/projects">
          <button type="button" class="secondary-button">
            <p>SEE ALL MY WORKS</p>
          </button>
        </router-link>
      </div>
    </div>
    <FooterStyle ref="footer" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FooterStyle from '@/components/FooterStyle.vue'
import NavStyle from '@/components/NavStyle.vue'
import Canvas from '@/components/Canvas.vue'

export default {
  metaInfo: {
    title: 'Home',
  },
  components: {
    FooterStyle,
    NavStyle,
    Canvas,
  },
  computed: {
    ...mapState({
      project1: state => ({
        title: state.projects[0].title,
        id: state.projects[0].id,
        style: {
          backgroundImage: `url(${state.projects[0].featured_image.url})`,
        },
        baseline: state.projects[0].baseline,
        type: state.projects[0].type,
        technologies: state.projects[0].technologies,
      }),
      project2: state => ({
        title: state.projects[1].title,
        id: state.projects[1].id,
        style: {
          backgroundImage: `url(${state.projects[1].featured_image.url})`,
        },
        baseline: state.projects[1].baseline,
        type: state.projects[1].type,
        technologies: state.projects[1].technologies,
      }),
      about: state => state.about,
    }),
    ...mapGetters(['getProjectColor']),
  },
  methods: {
    saveClickedProject(id) {
      let el
      let route
      if (id === 1) {
        el = this.$refs.first
        route = `/project/${this.project1.id}`
      } else {
        el = this.$refs.second
        route = `/project/${this.project2.id}`
      }
      el.querySelector('.layer').style.transform = 'translateX(0)'
      el.querySelector('.hover--details').style.transform = 'translateX(0)'
      this.$store.commit('SET_CLICKED_PROJECT', el)
      this.$router.push(route)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.home {
  h1 {
    margin-left: 0;
    margin-bottom: 0;
    font-size: 4rem;
    letter-spacing: 6px;
    position: static;
    @media (max-width: 768px) {
      font-size: 2.4rem;
      letter-spacing: 3px;
    }
  }
  h2 {
    font-family: 'Oswald', sans-serif;
    font-size: 2rem;
    margin-bottom: 37px;
  }
  a {
    align-self: flex-end;
    margin-top: 50px;
    z-index: 2;
    @media (max-width: 768px) {
      margin-top: 7%;
    }
  }
  button {
    &:hover {
      cursor: pointer;
    }
  }

  /* NOTE: TOP LAYOUT ***********************************/
  &--top {
    min-height: 83vh;
    width: 100vw;
    @media (max-width: 768px) {
      min-height: 75vh;
    }
  }
  &--top {
    // background-color: rgba(36, 0, 59, 0.7);
    display: flex;
    align-items: flex-end;
    &--content {
      position: relative;
      width: 100vw;
      min-height: 27vh;
      box-sizing: border-box;
      padding: $padding-desktop;
      margin-bottom: 10%;
      display: flex;
      justify-content: space-between;
      @media (max-width: 768px) {
        flex-direction: column;
        padding: $padding-mobile;
      }
      &--title {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        z-index: 2;
        @media (max-width: 768px) {
          align-items: flex-start;
        }
        p {
          font-family: 'Oswald';
          font-weight: lighter;
          text-transform: lowercase;
          font-size: 1.35rem;
          transform: translateX(-7vh);
          opacity: 0;
          align-self: flex-end;
          @include short-transition;
          @media (max-width: 768px) {
            transform: translateX(7vh);
          }
          &.visible-baseline {
            transform: translateX(0);
            opacity: 1;
          }
        }
      }
    }
  }
  .main-button {
    min-width: 180px;
    max-width: 40%;
    border: 2px solid $purple;
    border-radius: 3px;
    background-color: transparent;
    color: white;
    @include short-transition;
    @media (max-width: 768px) {
      width: 70%;
      padding: 0 4% 0 4%;
    }
    &:hover {
      background-color: white;
      border: 2px solid white;
      color: $dark-purple;
      transform: scale(1.05);
    }
    p {
      font-size: 0.9rem;
      letter-spacing: 2px;
      font-weight: bolder;
    }
  }
  /* NOTE: CONTENT LAYOUT  **************************/
  &--content {
    margin-top: 1vh;
    margin-bottom: $margin-bottom;
    display: flex;
    padding: $padding-desktop;
    box-sizing: border-box;
    @media (max-width: 768px) {
      display: block;
      margin-top: 6vh;
      margin-bottom: 0;
    }
    &--about {
      width: 33%;
      padding-right: 7%;
      display: flex;
      flex-direction: column;
      @media (max-width: 768px) {
        width: 100%;
      }
      p.bio {
        margin-top: -1em;
        transform: translateY(4vh);
        opacity: 0;
        @include short-transition(0.25s);
        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
    &--projects {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      align-self: start;
      &--list {
        display: flex;
        height: 90%;
        width: 100%;
        justify-content: space-between;
        transform: translateY(4vh);
        opacity: 0;
        @include short-transition(0.4s);
        @media (max-width: 768px) {
          flex-direction: column;
        }
        &.visible {
          transform: translateY(0);
          opacity: 1;
        }
        a {
          height: 100%;
          text-decoration: none;
          color: #fff;
          margin: 0;
        }
      }
      .project {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        width: 45%;
        min-height: 30vh;

        @media (max-width: 768px) {
          width: 100%;
          margin-bottom: 4vh;
        }
        .intro {
          text-transform: uppercase;
          font-weight: bold;
        }
        .img {
          min-height: 25vh;
          width: 100%;
          position: relative;
          transition: 1s ease-out;
          @media (max-width: 768px) {
            min-height: 33vh;
          }
        }
        p {
          margin-bottom: 0;
        }
        .color {
          width: 100%;
          height: 100%;
          position: absolute;
          bottom: 0;
          opacity: 0.5;
        }
        /* NOTE: HOVER *****/
        .hover {
          width: 85%;
          height: 100%;
          position: absolute;
          overflow: hidden;
          &.visible .hover--details {
            @media (max-width: 768px) {
              opacity: 1;
              transform: translateX(0);
            }
          }
          &.visible .layer {
            @media (max-width: 768px) {
              opacity: 0.6;
              transform: translateX(0);
            }
          }
          &--details {
            transform: translateX(-10%);
            opacity: 0;
            padding: 5%;
            max-height: 100%;
            box-sizing: border-box;
            position: relative;
            z-index: 1;
            @include short-transition(0.15s);
            @media (max-width: 768px) {
              @include long-transition(0.55s);
              font-size: 0.9rem;
            }
          }
          &:hover .hover--details,
          &:hover .layer {
            opacity: 1;
            transform: translateX(0);
          }
          &:hover .layer {
            @media (max-width: 768px) {
              opacity: 0.6;
            }
          }
          .layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            @include short-transition;
            transform: translateX(-100%);
            @media (max-width: 768px) {
              @include long-transition(0.4s);
            }
          }
          .baseline {
            margin-bottom: 5%;
            font-family: 'Open Sans';
            font-weight: lighter;
          }
          .type {
            text-transform: uppercase;
            font-weight: bold;
            &:nth-child(3) {
              margin: 0;
            }
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          svg {
            position: absolute;
          }
        }
      }
    }
    .secondary-button {
      border: 2px solid white;
      background-color: white;
      border-radius: 3px;
      padding: 5px 25px 5px 25px;
      @include short-transition;
      &:hover {
        transform: scale(1.05);
        color: white;
        background-color: $dark-purple;
      }
      p {
        margin: 0;
        font-size: 0.7rem;
      }
    }
  }
}
</style>
