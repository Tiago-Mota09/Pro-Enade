import { set } from '@/utils/vuex'
export default {
  setLoading: (state, val) => set((state['loading'] = val)),
	setSnackbar: (state, { status }) => set((state['snackbar'] = status)),
	setSnackbarMessage: (state, { message }) =>
		set((state['snackbarMessage'] = message)),
}