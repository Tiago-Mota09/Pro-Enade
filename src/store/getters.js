import { get } from '@/utils/vuex'
export default {
  loading: get('loading'),
	snackbar: get('snackbar'),
	snackbarMessage: get('snackbarMessage'),
}
