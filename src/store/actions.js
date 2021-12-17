import loadFields from '@/services/loadFields'
export default {
  setLoading({ commit }, val) {
		commit('setLoading', val)
	},
	setSnackbar({ commit }, data) {
		commit('setSnackbar', data)
		commit('setSnackbarMessage', data)
	},
}