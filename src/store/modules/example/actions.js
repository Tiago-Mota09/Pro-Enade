import loadFields from '@/services/loadFields'
export default {
	async getFilter(
		{ commit, dispatch },
		{tipoQuestao, dificuldade, curso, ano, disciplina1, disciplina2, disciplina3, disciplina4, palavraChave, codeQuestion}
	) {
    try {
      const { data } = await loadFields.getFilter(
        tipoQuestao, dificuldade, curso, ano, disciplina1, disciplina2, disciplina3, disciplina4, palavraChave, codeQuestion
        )
        commit('setFilter', data)
        return data
		} catch (e) {
			// const { message } = JSON.parse(e.response.data)
			dispatch(
				'setSnackbar',
				{
					status: true,
					message:'Nenhum resultado encontrado para esses filtros'
				},
			)
			throw e
		}
	},
	async getCursos({ commit }, query) {
		try {
			const { data } = await loadFields.getCursos(query)
			commit('setCursos', data)
		} catch (e) {
			throw e
		}
	},
	async getDisciplinas({ commit }, query) {
		try {
			const { data } = await loadFields.getDisciplinas(query)
			commit('setDisciplinas', data)
		} catch (e) {
			throw e
		}
	},
	emptyList({ commit }) {
		commit('emptyList')
	},
}