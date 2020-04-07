<template>
  <iframe
    v-if="project.video.type === 'vimeo'"
    :src="
      'https://player.vimeo.com/video/' +
        project.video.id +
        '?color=' +
        getProjectColor(project).replace('#', '') +
        '&title=0&byline=0&portrait=0'
    "
    frameborder="0"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
  ></iframe>
  <iframe
    v-else
    :src="
      'https://www.youtube-nocookie.com/embed/' +
        project.video.id +
        '?rel=0&amp;showinfo=0'
    "
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    project: Object,
  },
  computed: {
    ...mapGetters(['getProjectColor']),
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';
iframe {
  width: 40vw;
  height: 45vh;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 100%;
    height: 35vh;
  }
}
</style>
