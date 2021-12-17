import { set } from '@/utils/vuex'

export default {
	setFilter: (state, data) => set((state['filter'] = data)),
	setCursos: (state, data) => set((state['cursos'] = data)),
	setDisciplinas: (state, data) => set((state['disciplinas'] = data)),

	emptyList: state => set((state['filter'] = [])),
 }