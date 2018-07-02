import Vue from 'vue';
import Vuex from 'vuex';

import { colors } from '@/utils';

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		projects: [],
		loading: true,
		about: {},
		clickedProject: null,
	},
	getters: {
		getProjectById: state => id => {
			return state.projects.find(project => project.id === parseInt(id, 10));
		},
		getProjectColor: state => project => {
			switch (project.type[0]) {
				case 'web':
					return colors[0];
				case 'installation':
					return colors[1];
				default:
					return colors[2];
			}
		},
	},
	mutations: {
		GET_PROJECTS(state, projects) {
			state.projects = projects;
		},
		GET_ABOUT(state, about) {
			state.about = about;
		},
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
		SET_CLICKED_PROJECT(state, clickedProject) {
			state.clickedProject = clickedProject;
		},
	},
	actions: {
		async getProjects({ commit }) {
			const projectUrl = 'https://wp.drangies.fr/wp-json/wp/v2/project';
			const res = await fetch(projectUrl + '?per_page=100');
			const projects = await res.json();
			commit(
				'GET_PROJECTS',
				projects
					.map(project => {
						return {
							id: project.id,
							title: project.title.rendered,
							...project.acf,
						};
					})
					.sort(function(a, b) {
						const d = new Date(a.date);
						const t = new Date(b.date);
						return t - d;
					})
					.map(project => {
						const date = project.date;
						project.date = date
							.split('/')
							.filter((e, i) => i !== 1)
							.join('/');
						return project;
					})
			);
		},
		async getAbout({ commit }) {
			const aboutUrl = 'https://wp.drangies.fr/wp-json/wp/v2/about';
			const res = await fetch(aboutUrl);
			const about = await res.json();
			commit('GET_ABOUT', {
				name: about[0].title.rendered,
				...about[0].acf,
			});
		},
		async getData({ commit }) {
			commit('SET_LOADING', true);
			await Promise.all([this.dispatch('getProjects'), this.dispatch('getAbout')]);
			setTimeout(() => commit('SET_LOADING', false), 1000);
		},
	},
});
