<template>
  <svg width="100%" height="100%" :style="style">
    <rect
      :x="`${x}px`"
      :y="`${y}px`"
      :width="width"
      :height="height"
      :fill="fill"
    />
    <rect x="0" y="55%" width="100%" :height="h" fill="#24003b" />
  </svg>
</template>

<script>
import anime from 'animejs'
import { mapGetters, mapState } from 'vuex'

const duration = 450

export default {
  props: {
    projectId: String,
  },
  data() {
    return {
      x: 0,
      y: 0,
      width: '0%',
      height: '0%',
      visible: false,
      h: 0,
    }
  },
  computed: {
    ...mapState({
      clickedProject: state => state.clickedProject,
    }),
    ...mapGetters(['getProjectById', 'getProjectColor']),
    fill() {
      return this.getProjectColor(this.getProjectById(this.projectId))
    },
    style() {
      return this.visible ? 'visibility: visible' : 'visibility: hidden'
    },
  },
  methods: {
    beforeLeave() {
      const boundaries = this.clickedProject.getBoundingClientRect()
      // assign new values
      this.x = boundaries.x || boundaries.left
      this.y = boundaries.y || boundaries.top
      this.height = Math.ceil(boundaries.height)
      // reset values
      this.width = '0%'
      this.h = 0
      this.visible = false
    },
    leave(el, done) {
      this.visible = true
      const tl = anime.timeline()
      tl
        // sets the ribbon to a 100% width
        .add({
          targets: this,
          width: '100%',
          round: 1,
          easing: 'easeInOutQuart',
          duration: duration,
        })
        // opacity to 1
        .add(
          {
            targets: this.$el,
            opacity: 1,
            easing: 'linear',
            duration: duration,
          },
          `-=${duration}`
        )
        // fade out the unecessary elements (e.g. the current page)
        .add(
          {
            targets: el,
            opacity: 0,
            easing: 'easeInOutQuart',
            duration: duration * 0.8,
          },
          `-=${duration / 2}`
        )
        // put the ribbon on top
        .add(
          {
            targets: this,
            x: 0,
            y: 0,
            round: 1,
            easing: 'easeInOutQuart',
            duration: duration,
          },
          `-=${duration / 2}`
        )
        // grow its height up to 55% of the viewport
        .add({
          targets: this,
          height: window.innerHeight * 0.55,
          round: 1,
          easing: 'easeInOutQuart',
          duration: duration,
          complete: () => done && done(),
        })
    },
    afterLeave() {
      this.h = '45%'
    },
    beforeEnter() {
      // scroll to the top of the #app (and html for ie11, body for iOS) container
      anime({
        targets: ['#app', 'html', 'body'],
        scrollTop: 0,
        easing: 'linear',
        duration: 0,
      })
      // force scrolltop iOS
      document.body.scrollTop = 0
      document.scrollTop = 0
    },
    enter(el, done) {
      const tl = anime.timeline()
      tl.add({
        targets: this.$el,
        opacity: 0,
        easing: 'linear',
        duration: duration * 0.3,
        // delay: 100,
        complete: () => {
          this.visible = false
          done()
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">
svg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  overflow: hidden;
  rect {
    will-change: x, y, width, height;
  }
}
</style>
