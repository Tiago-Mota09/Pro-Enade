<template>
	<v-card height="90%">
		<Header />
		<div class="home">
			<div class="home__cards">
				<div>
					<v-card
						class="home__cards__card mr-10"
						outlined
						@click="modal = true"
					>
						<v-icon color="#fff" size="40">
							description
						</v-icon>
						<h1>Cadastrar Questões</h1>
						<p>
							Clique para cadastro de questões.
						</p>
					</v-card>
					<v-card class="home__cards__card mr-10" outlined @click="pageCursos">
						<v-icon color="#fff" size="40">
							history_edu
						</v-icon>
						<h1>Cadastrar Curso</h1>
						<p>
							Clique para cadastro de cursos.
						</p>
					</v-card>
				</div>
				<div>
					<v-card class="home__cards__card" outlined @click="pageConsultar">
						<v-icon color="#fff" size="40">
							plagiarism
						</v-icon>
						<h1>Consultar</h1>
						<p>
							Clique para consultar, editar ou excluir.
						</p>
					</v-card>

					<v-card class="home__cards__card" outlined @click="pageDisciplinas">
						<v-icon color="#fff" size="40">
							collections_bookmark
						</v-icon>
						<h1>Cadastrar Disciplina</h1>
						<p>
							Clique para cadastro de disciplinas.
						</p>
					</v-card>
				</div>
			</div>
			<Modal v-if="modal">
				<v-card class="modal">
					<div class="modal__header">
						<h3 class="modal__header__title">Cadastrar nova questão</h3>
						<a @click="modal = false" name="section1" href="#">
							<img src="@/assets/Vector.svg" alt="" />
						</a>
					</div>
					<v-form class="modal__form">
						<v-row class="d-flex justify-space-between align-center">
							<div class="d-flex align-center">
								<strong class="mx-4">Tipo de questão:</strong>
								<v-radio-group row v-model="tipoQuestao">
									<v-radio
										v-for="(radio, index) in radiosQuestoes"
										:key="index"
										:label="radio.label"
										:value="radio.value"
									/>
								</v-radio-group>
							</div>
							<div class="d-flex align-center justify-end ">
								<strong>N° Questão</strong>
								<v-col md="12" lg="4">
									<v-text-field
										class="modal__form__input"
										v-model="codeQuestion"
										outlined
										hide-details
										maxLength="2"
									/>
								</v-col>
							</div>
						</v-row>
						<v-row>
							<v-col md="12" lg="6">
								<router-link class="link" to="/cadastro-cursos"
									>Não encontrou seu curso? Clique aqui
								</router-link>
								<v-autocomplete
									:items="getCursos"
									item-text="description"
									item-value="id"
									return-object
									v-model="curso"
									outlined
									label="Curso"
									clearable
									hide-details
								/>
							</v-col>
							<v-col md="12" lg="6">
								<p class="link-avulso">.</p>

								<v-text-field
									type="text"
									label="Ano"
									class="modal__form__input"
									v-model="ano"
									outlined
									maxLength="4"
									hide-details
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col md="12" lg="6">
								<router-link class="link" to="/cadastro-disciplinas"
									>Não encontrou sua disciplina? Clique aqui</router-link
								>
								<v-autocomplete
									:items="getDisciplinas"
									item-text="description"
									item-value="id"
									return-object
									v-model="disciplina1"
									outlined
									label="Disciplina 1"
									clearable
									hide-details
								/>
							</v-col>
							<v-col md="12" lg="6">
								<router-link class="link" to="/cadastro-disciplinas"
									>Não encontrou sua disciplina? Clique aqui</router-link
								>
								<v-autocomplete
									:items="getDisciplinas"
									item-text="description"
									item-value="id"
									return-object
									v-model="disciplina2"
									outlined
									label="Disciplina 2"
									clearable
									hide-details
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col md="12" lg="6">
								<router-link class="link" to="/cadastro-disciplinas"
									>Não encontrou sua disciplina? Clique aqui</router-link
								>

								<v-autocomplete
									:items="getDisciplinas"
									item-text="description"
									item-value="id"
									return-object
									v-model="disciplina3"
									outlined
									label="Disciplina 3"
									clearable
									hide-details
								/>
							</v-col>
							<v-col md="12" lg="6">
								<router-link class="link" to="/cadastro-disciplinas"
									>Não encontrou sua disciplina? Clique aqui</router-link
								>

								<v-autocomplete
									:items="getDisciplinas"
									item-text="description"
									item-value="id"
									return-object
									v-model="disciplina4"
									outlined
									label="Disciplina 4"
									clearable
									hide-details
								/>
							</v-col>
						</v-row>
						<div class="d-flex align-center justify-start">
							<strong class="mx-4">Sua questão possui imagem?</strong>
							<v-radio-group row v-model="validate">
								<v-radio
									v-for="(radio, index) in radiosValidate"
									:key="index"
									:label="radio.label"
									:value="radio.value"
								/>
							</v-radio-group>
						</div>
						<div class="modal__form__coluna">
							<v-row>
								<v-col md="14" lg="14">
									<v-textarea
										type="text"
										label="Insira o Enunciado da questão"
										class="modal__form__text"
										v-model="questao"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<strong v-if="validate === 'S'" class="mt-3 mx-4"
								>Insira sua imagem no campo abaixo.</strong
							>

							<v-row v-if="validate === 'S'">
								<v-col md="14" lg="14">
									<vue-editor
										type="text"
										label="Insira a imagem"
										class="modal__form__text"
										v-model="teste"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<strong v-if="validate === 'S'" class="mt-5 mx-4"
								>Seu Enunciado possui outra imagem? Insira no campo
								abaixo.</strong
							>

							<v-row v-if="validate === 'S'">
								<v-col md="14" lg="14">
									<vue-editor
										type="text"
										label="Insira a imagem"
										class="modal__form__text"
										v-model="teste2"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>

							<div
								v-if="tipoQuestao === 'MultiplaEscolha'"
								class="d-flex align-center justify-start my-6"
							>
								<strong class=" mx-4">Suas alternativas possui imagens?</strong>
								<v-radio-group row v-model="validateAlternativa">
									<v-radio
										v-for="(radio, index) in radiosValidateAlternativa"
										:key="index"
										:label="radio.label"
										:value="radio.value"
									/>
								</v-radio-group>
							</div>

							<v-row>
								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'N'
									"
									md="12"
									lg="12"
								>
									<v-textarea
										type="text"
										label="Alternativa A"
										class="modal__form__text"
										v-model="alternativaA"
										hide-details
										outlined
									/>
								</v-col>
								<strong
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									class=" mx-4"
									>Imagem alternativa A:</strong
								>

								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									md="12"
									lg="12"
								>
									<vue-editor
										type="text"
										label="Insira a imagem"
										class="modal__form__text"
										v-model="alternativaAImagem"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'N'
									"
									md="12"
									lg="12"
								>
									<v-textarea
										type="text"
										label="Alternativa B"
										class="modal__form__text"
										v-model="alternativaB"
										hide-details
										outlined
									/>
								</v-col>
								<strong
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									class=" mx-4"
									>Imagem alternativa B:</strong
								>

								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									md="12"
									lg="12"
								>
									<vue-editor
										type="text"
										label="Insira a imagem"
										class="modal__form__text"
										v-model="alternativaBImagem"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'N'
									"
									md="12"
									lg="12"
								>
									<v-textarea
										type="text"
										label="Alternativa C"
										class="modal__form__text"
										v-model="alternativaC"
										hide-details
										outlined
									/>
								</v-col>
								<strong
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									class=" mx-4"
									>Imagem alternativa C:</strong
								>

								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									md="12"
									lg="12"
								>
									<vue-editor
										type="text"
										label="Insira a imagem"
										class="modal__form__text"
										v-model="alternativaCImagem"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'N'
									"
									md="12"
									lg="12"
								>
									<v-textarea
										type="text"
										label="Alternativa D"
										class="modal__form__text"
										v-model="alternativaD"
										hide-details
										outlined
									/>
								</v-col>
								<strong
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									class=" mx-4"
									>Imagem alternativa D:</strong
								>

								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									md="12"
									lg="12"
								>
									<vue-editor
										type="text"
										label="Insira a imagem"
										class="modal__form__text"
										v-model="alternativaDImagem"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'N'
									"
									md="12"
									lg="12"
								>
									<v-textarea
										type="text"
										label="Alternativa E"
										class="modal__form__text"
										v-model="alternativaE"
										hide-details
										outlined
									/>
								</v-col>
								<strong
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									class=" mx-4"
									>Imagem alternativa E:</strong
								>

								<v-col
									v-if="
										tipoQuestao === 'MultiplaEscolha' &&
											validateAlternativa === 'S'
									"
									md="12"
									lg="12"
								>
									<vue-editor
										type="text"
										label="Insira a imagem"
										class="modal__form__text"
										v-model="alternativaEImagem"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col v-if="tipoQuestao === 'Discursiva'" md="12" lg="12">
									<v-textarea
										type="text"
										label="Insira sua Resposta"
										class="modal__form__text"
										v-model="respostaDiscursiva"
										hide-details
										outlined
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="12" lg="3" v-if="tipoQuestao === 'MultiplaEscolha'">
									<v-select
										:items="items"
										v-model="alternativaCorreta"
										label="Alternativa Correta"
										outlined
										hide-details
									></v-select>
								</v-col>
								<v-spacer></v-spacer>
								<div class="d-flex mr-4 align-center">
									<strong class="mx-4">Dificuldade:</strong>
									<v-radio-group row v-model="dificuldade">
										<v-radio
											v-for="(radio, index) in radios"
											:key="index"
											:label="radio.label"
											:value="radio.value"
										/>
									</v-radio-group>
								</div>
							</v-row>
							<v-row>
								<v-col md="12" lg="12">
									<v-text-field
										type="text"
										label="Digite frase ou palavra-chave"
										class="modal__form__input"
										v-model="palavraChave"
										outlined
									/>
								</v-col>
							</v-row>
						</div>
						<v-row class="d-flex justify-space-between mb-6">
							<div>
								<v-btn @click="cadastrarProva" class="modal__form__btn">
									Enviar
								</v-btn>
								<v-btn @click="modal = false" class="modal__form__back">
									Fechar
								</v-btn>
							</div>
							<a class="modal__form__link mr-4" href="#section1">
								<v-tooltip color="#FF5A00" top>
									<template v-slot:activator="{ on, attrs }">
										<v-btn icon color="primary" dark v-bind="attrs" v-on="on">
											<v-icon color="#FF5A00">arrow_upward</v-icon>
										</v-btn>
									</template>
									<span>Voltar ao topo</span>
								</v-tooltip>
							</a>
						</v-row>
					</v-form>
				</v-card>
			</Modal>
		</div>
	</v-card>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/Modal'
import Header from '@/components/Header'
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			teste: '',
			teste2: '',
			tipoQuestao: 'MultiplaEscolha',
			validate: 'N',
			validateAlternativa: 'N',
			codeQuestion: '',
			curso: '',
			disciplina1: '',
			disciplina2: '',
			disciplina3: '',
			disciplina4: '',
			ano: '',
			questao: '',
			alternativaA: '',
			alternativaB: '',
			alternativaC: '',
			alternativaD: '',
			alternativaE: '',
			alternativaAImagem: '',
			alternativaBImagem: '',
			alternativaCImagem: '',
			alternativaDImagem: '',
			alternativaEImagem: '',
			alternativaCorreta: '',
			respostaDiscursiva: '',
			dificuldade: '',
			palavraChave: '',
			dataAtual: '',
			modal: false,
			modalEditar: false,
			radios: [
				{ label: 'Fácil', value: 'Facil' },
				{ label: 'Médio', value: 'Medio' },
				{ label: 'Difícil', value: 'Dificil' },
			],
			radiosQuestoes: [
				{ label: 'Múltipla Escolha', value: 'MultiplaEscolha' },
				{ label: 'Discursiva', value: 'Discursiva' },
			],
			radiosValidate: [
				{ label: 'Sim', value: 'S' },
				{ label: 'Não', value: 'N' },
			],
			radiosValidateAlternativa: [
				{ label: 'Sim', value: 'S' },
				{ label: 'Não', value: 'N' },
			],
			items: ['A', 'B', 'C', 'D', 'E'],
			provas: [],
		}
	},

	components: {
		Modal,
		Header,
	},
	computed: {
		...mapGetters({
			getFilter: 'example/filter',
			getCursos: 'example/cursos',
			getDisciplinas: 'example/disciplinas',
			loading: 'loading',
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	mounted() {
		this.$store.dispatch('example/getCursos')
		this.$store.dispatch('example/getDisciplinas')
		var data = new Date()
		var dia = String(data.getDate()).padStart(2, '0')
		var mes = String(data.getMonth() + 1).padStart(2, '0')
		var ano = data.getFullYear()
		this.dataAtual = dia + '/' + mes + '/' + ano
		console.log(this.dataAtual)
	},
	methods: {
		async cadastrarProva(e) {
			e.preventDefault()
			if (this.curso === '') {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Inclua um curso',
				})
			} else if (this.disciplina === '') {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Inclua uma disciplina',
				})
			} else if (this.codeQuestion === '') {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Inclua o número da questão',
				})
			} else if (this.ano === '') {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Inclua o ano',
				})
			} else if (this.questao === '') {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Inclua uma questão',
				})
			} else if (this.dificuldade === '') {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Selecione a Dificuldade',
				})
			} else {
				const { data } = await axios.post('http://localhost:3000/provas', {
					teste: this.teste,
					teste2: this.teste2,
					tipoQuestao: this.tipoQuestao,
					codeQuestion: this.codeQuestion,
					curso: this.curso.description,
					disciplina1: this.disciplina1.description,
					disciplina2: this.disciplina2.description,
					disciplina3: this.disciplina3.description,
					disciplina4: this.disciplina4.description,
					ano: this.ano,
					questao: this.questao,
					alternativaA: this.alternativaA,
					alternativaB: this.alternativaB,
					alternativaC: this.alternativaC,
					alternativaD: this.alternativaD,
					alternativaE: this.alternativaE,
					alternativaAImagem: this.alternativaAImagem,
					alternativaBImagem: this.alternativaBImagem,
					alternativaCImagem: this.alternativaCImagem,
					alternativaDImagem: this.alternativaDImagem,
					alternativaEImagem: this.alternativaEImagem,
					alternativaCorreta: this.alternativaCorreta.toUpperCase(),
					respostaDiscursiva: this.respostaDiscursiva,
					dificuldade: this.dificuldade,
					palavraChave: this.palavraChave.toUpperCase(),
					dataAtual: this.dataAtual,
				})
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Questão cadastrada com sucesso!',
				})
			}
			this.validate = 'N'
			this.teste = ''
			this.teste2 = ''
			this.curso = ''
			this.codeQuestion = ''
			this.disciplina1 = ''
			this.disciplina2 = ''
			this.disciplina3 = ''
			this.disciplina4 = ''
			this.ano = ''
			this.questao = ''
			this.alternativaA = ''
			this.alternativaB = ''
			this.alternativaC = ''
			this.alternativaD = ''
			this.alternativaE = ''
			this.alternativaAImagem = ''
			this.alternativaBImagem = ''
			this.alternativaCImagem = ''
			this.alternativaDImagem = ''
			this.alternativaEImagem = ''
			this.alternativaCorreta = ''
			this.respostaDiscursiva = ''
			this.dificuldade = ''
			this.palavraChave = ''
		},
		pageConsultar() {
			this.$router.push({ name: 'Consulta' })
		},
		pageCursos() {
			this.$router.push({ name: 'Cursos' })
		},
		pageDisciplinas() {
			this.$router.push({ name: 'Disciplinas' })
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	margin: 0 auto;
	width: 70%;
}

.home {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: url('../assets/Degradeok.jpg');
	height: 100%;
	width: 100%;
	&__cards {
		display: flex;
		justify-content: center;
		// max-width: 1500px;
		&__card {
			width: 400px !important;
			height: 200px !important;
			display: flex;
			flex-direction: column;
			justify-content: center;
			transition: transform 0.8s; /* Animation */
			padding: 27px;
			background: #003fff !important;
			border-radius: 10px !important;
			margin-top: 8%;
			h1 {
				text-align: center;
				margin-top: 10px;
				color: #fff;
				font-weight: 500;
			}
			p {
				text-align: center;
				margin-top: 10px;
				color: #fff;
				font-weight: 400;
			}
			&:hover {
				transform: scale(
					1.1
				); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
				// z-index: 1;
				// box-shadow: rgba(247, 246, 250, 0.15) 0px 48px 100px 0px;
				background: #ff5a00 !important;
			}
		}
	}
	&__title {
		color: #fff;
		margin: 10px auto 40px;
	}
	&__table {
		background: #303030;
		border-radius: 5px;
		border-collapse: collapse;
		thead {
			tr {
				th {
					padding: 10px 0;
					color: #fff;
					border-bottom: 1px solid #d0d0d6;
				}
			}
		}
		tbody {
			tr {
				td {
					padding: 10px 0;
					color: #626262;
					text-align: center;
					a {
						margin: 0 10px;
						cursor: pointer;
					}
				}
			}
		}
	}
	.modal {
		display: flex;
		flex-direction: column;
		padding: 10px;
		width: 100%;
		height: auto;
		// background: black;
		// z-index: 7;
		&__header {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			&__title {
				color: #0082ff;
			}
		}
		&__form {
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-around;
			padding: 10px;
			strong {
				color: #0082ff;
			}
			&__title {
				color: #fff;
				margin: 20px 0;
				text-align: initial;
			}
			&__coluna {
				width: 100%;
				display: flex;
				flex-direction: column;
			}
			&__btn {
				width: 116px;
				padding: 10px;
				margin-left: 10px;
				margin-right: 10px;
				border: 0;
				border-radius: 5px;
				background: #003fff;
				font-weight: 500;
				color: #fff;
				cursor: pointer;
				outline: 0;
				transition: 800ms;
				&:hover {
					background: #0082ff;
				}
			}
			&__back {
				width: 90px;
				padding: 10px;
				border: 0;
				border-radius: 5px;
				background: #ff5a00;
				font-weight: 500;
				color: #fff;
				cursor: pointer;
				outline: 0;
				transition: 800ms;
				&:hover {
					background: #fff;
					color: #ff5a00;
					border: 1px solid #ff5a00;
				}
			}
			&__link {
				text-decoration: none;
			}
		}
	}
}
strong {
	color: #0082ff;
}
.link {
	font-size: 14px;
	font-weight: 500;
	color: #bdbdbd;
	margin-bottom: 0;
	text-decoration: none;
	&:hover {
		color: #ff5a00;
	}
}
.link-avulso {
	font-size: 16px;
	font-weight: 500;
	color: #fff;
	margin-bottom: 0;
	text-decoration: none;
}
</style>
