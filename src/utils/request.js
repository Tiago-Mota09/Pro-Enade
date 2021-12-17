import axios from 'axios'
import { DEFAULT_API_URLS } from './enum'
import { getStorage } from './storage'

const { stringify, parse } = JSON
export const parseNetworkError = error => parse(stringify(error))

const withBaseURLContext = () =>
	process.env.NODE_ENV
		? DEFAULT_API_URLS[process.env.NODE_ENV.toUpperCase()]
		: DEFAULT_API_URLS.development

const HTTPClient = axios.create({
	baseURL: withBaseURLContext(),
	headers: {
		// UsuarioId: getStorage('usuarioId'),
		// GrupoUsuarioId: getStorage('GrupoUsuarioId'),
		// EmpresaId: getStorage('EmpresaId'),
		UsuarioId: 1,
		GrupoUsuarioId: 1,
		EmpresaId: 1,
	},
})

// HTTPClient.interceptors.request.use(
// 	config => {
// 		const token = getStorage('token')
// 		if (token) {
// 			config.headers.common.Authorization = `Bearer ${token}`
// 		}

// 		return config
// 	},
// 	response => Promise.reject(response)
// )

// HTTPClient.interceptors.response.use(
// 	response => {
// 		return response
// 	},
// 	error => Promise.reject(error)
// )

export default  HTTPClient
