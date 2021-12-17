module.exports = function vuexActionDebounce(timeout = 0) {
	return store => {
		const dispatchOrigin = store.dispatch

		store.dispatch = debouncedDispatch
		store._debouncedActions = {}

		function debouncedDispatch() {
			let args = Array.prototype.slice.call(arguments)
			const actionType = Array.prototype.shift.call(args)
			let argsKey = ''

			args = args.map(item =>
				typeof item === 'object' && Object.hasOwnProperty.call(item, 'fullPath')
					? item.fullPath
					: item
			)

			try {
				argsKey = JSON.stringify(args)
			} catch (e) {
				console.warn(e)
			}

			return promiseOne(
				() => dispatchOrigin.apply(store, arguments),
				`${actionType}_${argsKey}`,
				store._debouncedActions,
				timeout
			)
		}

		function promiseOne(createPromiseFn, key, cacheObj, timeout) {
			if (!cacheObj[key]) {
				cacheObj[key] = createPromiseFn()
				cacheObj[key]
					.then(null, () => {})
					.then(() => {
						setTimeout(() => {
							delete cacheObj[key]
						}, timeout)
					})
			}

			return cacheObj[key]
		}
	}
}
