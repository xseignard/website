import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		projects: [],
		loading: true,
		about: {},
	},
	getters: {
		getProjectById: state => id => {
			return state.projects.find(project => project.id === parseInt(id, 10));
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
	},
	actions: {
		async getProjects({ commit }) {
			const projectUrl = 'https://wp.drangies.fr/wp-json/wp/v2/project';
			const res = await fetch(projectUrl + '?per_page=100');
			const projects = await res.json();
			commit(
				'GET_PROJECTS',
				projects.map(project => {
					// TODO: sort by date
					return {
						id: project.id,
						title: project.title.rendered,
						...project.acf,
					};
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
