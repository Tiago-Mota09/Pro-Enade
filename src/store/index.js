import Vue from 'vue'
import Vuex from 'vuex'
import actionDebounce from '@/store/action-debounce'

import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

const timeout = 200
const actionDebouncePlugin = actionDebounce(timeout)

Vue.use(Vuex)

const Store = new Vuex.Store({
	plugins: [actionDebouncePlugin],
	actions,
	getters,
	modules,
	mutations,
	state,
})

const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

for (const namespace in modules) {
	const module = modules[namespace]
	try {
		hasKey(module, 'actions') &&
			hasKey(module.actions, 'INIT') &&
			Store.dispatch(`${namespace}/INIT`)
	} catch (e) {
		console.error(namespace, e)
	}
}

export default Store
