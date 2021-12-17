<template>
	<v-app>
		<v-main class="app">
			<router-view />
		</v-main>

		<v-snackbar color="#FF5A00" v-model="snackbar" @input="change">
			{{ snackbarMessage }}
		</v-snackbar>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'App',
	data: () => ({
		snackbar: false,
	}),
	computed: {
		...mapGetters({
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	watch: {
		getSnackbar() {
			this.snackbar = this.getSnackbar
		},
	},
	methods: {
		change() {
			this.$store.dispatch('setSnackbar', { status: false, message: '' })
		},
	},
}
</script>
<style lang="scss" scoped>
.app {
	background-image: url('./assets/Degradeok.jpg');
}
</style>
