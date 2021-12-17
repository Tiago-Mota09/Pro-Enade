import Http from '@/utils/request'
import axios from 'axios'
import { getStorage } from '../utils/storage'

export default {
	getFilter: (tipoQuestao, dificuldade, curso, ano, disciplina1, disciplina2, disciplina3, disciplina4, palavraChave, codeQuestion) =>
		Http.get('provas', {
			params: {
				tipoQuestao,
				dificuldade,
        curso,
        ano,
        disciplina1,
        disciplina2,
        disciplina3,
        disciplina4,
        palavraChave,
        codeQuestion
			},
		}),
    getCursos: query =>
		Http.get('cursos', { params: { description: query } }),
    getDisciplinas: query =>
		Http.get('disciplinas', { params: { description: query } }),

}
