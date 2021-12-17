import { get } from '@/utils/vuex'

export default {
	filter: get('filter'),
	cursos: get('cursos'),
	disciplinas: get('disciplinas'),

}
