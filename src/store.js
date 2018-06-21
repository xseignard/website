import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		projects: [],
		loading: true,
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
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
	},
	actions: {
		async getProjects({ commit }) {
			commit('SET_LOADING', true);
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
			setTimeout(() => commit('SET_LOADING', false), 1000);
		},
	},
});
