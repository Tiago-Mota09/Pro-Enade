import store from '@/store'

export const RequireAuthentication = async (_to, _from, next) => {
	const isAuthenticated = await store.dispatch('app/auth')

	if (isAuthenticated) {
		next()
	} else {
		next({ name: 'signin' })
	}
}
