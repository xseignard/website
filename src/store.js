import Vue from 'vue'
import Vuex from 'vuex'
import imagesloaded from 'imagesloaded'

import { colors } from '@/utils'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    projects: [],
    loading: true,
    about: {},
    clickedProject: null,
  },
  getters: {
    getProjectById(state) {
      return id => {
        return state.projects.find(project => project.id === parseInt(id, 10))
      }
    },
    getProjectColor() {
      return project => {
        switch (project.type[0]) {
          case 'web':
            return colors[0]
          case 'installation':
            return colors[1]
          default:
            return colors[2]
        }
      }
    },
    getLayerColor() {
      return project => {
        switch (project.type[0]) {
          case 'web':
            return colors[1]
          case 'installation':
            return colors[2]
          default:
            return colors[0]
        }
      }
    },
  },
  mutations: {
    GET_PROJECTS(state, projects) {
      state.projects = projects
    },
    GET_ABOUT(state, about) {
      state.about = about
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_CLICKED_PROJECT(state, clickedProject) {
      state.clickedProject = clickedProject
    },
  },
  actions: {
    async getProjects({ commit }) {
      const projectUrl = 'https://wp.drangies.fr/wp-json/wp/v2/project'
      const res = await fetch(projectUrl + '?per_page=100')
      const projects = await res.json()
      commit(
        'GET_PROJECTS',
        projects
          .map(project => {
            return {
              id: project.id,
              title: project.title.rendered,
              ...project.acf,
            }
          })
          .sort(function(a, b) {
            const d = new Date(a.date)
            const t = new Date(b.date)
            return t - d
          })
          .map(project => {
            const date = project.date
            project.date = date
              .split('/')
              .filter((e, i) => i !== 1)
              .join('/')
            return project
          })
      )
    },
    async getAbout({ commit }) {
      const aboutUrl = 'https://wp.drangies.fr/wp-json/wp/v2/about'
      const res = await fetch(aboutUrl)
      const about = await res.json()
      commit('GET_ABOUT', {
        name: about[0].title.rendered,
        ...about[0].acf,
      })
    },
    async getData({ commit }) {
      commit('SET_LOADING', true)
      await Promise.all([
        this.dispatch('getProjects'),
        this.dispatch('getAbout'),
      ])
      const imagesToLoad = []
      this.state.projects.forEach(p => {
        const fImg = new Image()
        fImg.src = p.featured_image.url
        imagesToLoad.push(fImg)
        const mImg = new Image()
        mImg.src = p.featured_image.sizes.medium
        imagesToLoad.push(mImg)
        imagesToLoad.concat(
          p.gallery.map(g => {
            const gImg = new Image()
            gImg.url = g.url
            return gImg
          })
        )
      })
      imagesloaded(imagesToLoad, () => {
        setTimeout(() => {
          // commit('SET_LOADING', false)
        }, 2500)
      })
    },
  },
})
