<template>
  <div id="app">
    <Loader v-if="loading" />
    <transition
      v-else
      mode="out-in"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <router-view :key="$route.params.id || $route.path" ref="page" />
    </transition>
    <ProjectTransition
      v-if="toProjectTransition"
      ref="transition"
      :project-id="$route.params.id"
    />
    <PageTransition v-else ref="transition" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PageTransition from './components/PageTransition.vue'
import ProjectTransition from './components/ProjectTransition.vue'
import Loader from '@/components/Loader.vue'

export default {
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | drangies.fr',
  },
  components: {
    PageTransition,
    ProjectTransition,
    Loader,
  },
  data() {
    return {
      toProjectTransition: false,
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      clickedProject: state => state.clickedProject,
    }),
  },
  watch: {
    $route(to) {
      this.toProjectTransition = to.name === 'project' && this.clickedProject
    },
  },
  methods: {
    beforeLeave(el) {
      this.$refs.transition.beforeLeave && this.$refs.transition.beforeLeave(el)
    },
    leave(el, done) {
      this.$refs.transition.leave && this.$refs.transition.leave(el, done)
    },
    afterLeave(el) {
      this.$refs.transition.afterLeave && this.$refs.transition.afterLeave(el)
    },
    beforeEnter(el) {
      this.$refs.transition.beforeEnter && this.$refs.transition.beforeEnter(el)
    },
    enter(el, done) {
      this.$refs.transition.enter && this.$refs.transition.enter(el, done)
    },
    afterEnter(el) {
      this.$refs.transition.afterEnter && this.$refs.transition.afterEnter(el)
    },
  },
}
</script>
