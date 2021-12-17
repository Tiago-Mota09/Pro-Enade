<template>
	<v-card height="42%">
		<Header />
		<div class="home">
			<div v-if="modalEditar === false" class="home__card">
				<v-expansion-panels multiple v-model="panel">
					<v-expansion-panel>
						<v-expansion-panel-header class="pt-4">
							<h3>
								Inserir uma nova disciplina
							</h3>
						</v-expansion-panel-header>

						<v-expansion-panel-content>
							<v-card height="200px" width="51%" flat class="home__card">
								<v-col cols="12" sm="10">
									<v-text-field
										type="text"
										label="Inclua o nome da disciplina"
										class="home__input"
										v-model="description"
										outlined
										hide-details
									/>
								</v-col>
								<div class="d-flex button">
									<button
										:loading="loading"
										@click="cadastrarDisciplina"
										class="home__btn"
									>
										Cadastrar
									</button>

									<button :loading="loading" @click="back" class="home__back">
										Voltar
									</button>
								</div>
							</v-card>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</div>
			<v-card class="overflow">
				<table class="home__table content ">
					<thead>
						<tr>
							<th>Disciplinas Cadastradas</th>
							<th>Ações</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="disciplina in disciplinas" :key="disciplina.id">
							<td>{{ disciplina.description }}</td>
							<td>
								<div>
									<v-tooltip color="#0082ff" top>
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												@click="
													;(modalEditar = true),
														carregarInfo($event, disciplina)
												"
												icon
												color="primary"
												dark
												v-bind="attrs"
												v-on="on"
											>
												<v-icon color="#0082ff">mode_edit_outline</v-icon>
											</v-btn>
										</template>
										<h4>EDITAR</h4>
									</v-tooltip>
									<v-tooltip color="red" top>
										<template v-slot:activator="{ on, attrs }">
											<v-btn
												@click="deletarCurso($event, disciplina.id)"
												icon
												color="primary"
												dark
												v-bind="attrs"
												v-on="on"
											>
												<v-icon color="red">delete</v-icon>
											</v-btn>
										</template>
										<h4>EXCLUIR</h4>
									</v-tooltip>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</v-card>
			<ModalEditar v-if="modalEditar">
				<v-card class="modal">
					<div class="modal__header">
						<h3 class="modal__header__title">Editar Disciplina</h3>
						<a href="#" @click="modalEditar = false">
							<img src="@/assets/Vector.svg" />
						</a>
					</div>
					<form class="modal__form">
						<v-col cols="12" sm="12">
							<v-text-field
								type="text"
								label="Nome da disciplina"
								class="home__input"
								v-model="editar.description"
								outlined
								hide-details
							/>
						</v-col>
						<div class="actions">
							<button
								:loading="loading"
								@click="editarDisciplina"
								class="home__btn"
							>
								Editar
							</button>

							<button
								:loading="loading"
								@click="modalEditar = false"
								class="home__back"
							>
								Cancelar
							</button>
						</div>
					</form>
				</v-card>
			</ModalEditar>
		</div>
	</v-card>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import ModalEditar from '@/components/ModalEditar'
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			description: '',
			// panel: [0, 1],
			modalEditar: false,
			disciplinas: [],
			editar: {
				id: '',
				description: '',
			},
		}
	},
	components: {
		Header,
		ModalEditar,
	},
	mounted() {
		this.carregarDisciplina()
		this.panel = []
	},
	computed: {
		...mapGetters({
			loading: 'loading',
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	methods: {
		async cadastrarDisciplina(e) {
			e.preventDefault()
			if (this.description === '') {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Inclua uma disciplina',
				})
			} else {
				const { data } = await axios.post('http://localhost:3000/disciplinas', {
					description: this.description.toUpperCase(),
				})
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Disciplina cadastrada com sucesso !',
				})
			}
			this.panel = []
			this.carregarDisciplina()

			this.description = ''
		},
		back() {
			this.$router.push('/home')
		},
		async carregarDisciplina() {
			const { data } = await axios.get('http://localhost:3000/disciplinas')
			this.disciplinas = data
		},
		async deletarCurso(e, id) {
			e.preventDefault()
			const { data } = await axios.delete(
				`http://localhost:3000/disciplinas/${id}`
			)
			this.$store.dispatch('setSnackbar', {
				status: true,
				message: 'Curso excluído com sucesso !',
			})
			this.carregarDisciplina()
		},
		carregarInfo(e, disciplinas) {
			e.preventDefault()
			this.editar.id = disciplinas.id
			this.editar.description = disciplinas.description
		},
		async editarDisciplina(e) {
			e.preventDefault()
			const { data } = await axios.put(
				`http://localhost:3000/disciplinas/${this.editar.id}`,
				{
					description: this.editar.description.toUpperCase(),
				}
			)
			this.modalEditar = false
			this.carregarDisciplina()
		},
	},
}
</script>

<style lang="scss" scoped>
.content {
	margin: 0 auto;
	width: 70%;
}
.overflow {
	overflow-y: auto;
	max-height: 420px !important;
	width: 950px;
	border: 2px solid #ff5a00;
	margin-top: 20px;
	margin-bottom: 40px;
}
.home {
	display: flex;
	flex-direction: column;
	// justify-content: center;
	align-items: center;
	background-image: url('../assets/Degradeok.jpg');
	// height: 100%;
	width: 100%;
	max-height: 1000px !important;

	// padding-top: 30px;
	&__card {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 950px !important;
		// height: auto !important;
		margin-top: 50px;
	}
	h3 {
		color: #003fff;
		// margin: 10px auto 50px;
		// text-align: center;
	}

	&__input {
		max-width: 800px;
		margin: 0 auto;
	}
	&__btn {
		margin-right: 10px;
		width: 130px;
		height: 40px;
		border: 0;
		border-radius: 10px;
		background: #003fff;
		font-weight: 500;
		color: #fff;
		cursor: pointer;
		outline: 0;
		transition: 800ms;
		&:hover {
			background: #0082ff;
			color: #fff;
		}
	}
	&__table {
		background: #fff;
		border-radius: 5px;
		width: 900px;
		max-height: 1000px !important;

		thead {
			tr {
				th {
					padding: 10px 0;
					color: #003fff;
					font-weight: 500;
					font-size: 18px;
					border-bottom: 1px solid #d0d0d6;
				}
			}
		}
		tbody {
			tr {
				td {
					padding: 10px 0;
					color: black;
					text-align: center;
					font-weight: 500;
					a {
						margin: 0 10px;
						cursor: pointer;
					}
				}
			}
		}
	}

	&__back {
		width: 120px;
		height: 40px;
		// padding: 10px;
		// margin-left: 10px;
		border: 0;
		border-radius: 10px;
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
}

strong {
	color: #0082ff;
}
.button {
	margin-top: -50px;
}
.modal {
	display: flex;
	flex-direction: column;
	padding: 15px;
	width: 100%;
	&__header {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		margin-left: 13px;

		&__title {
			color: #0082ff;
		}
	}
	&__form {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		padding: 10px;
		&__input {
			outline: 0;
			padding: 10px;
			width: calc(50% - 5px);
			margin-bottom: 10px;
			border-radius: 5px;
			border: 0;
			&:nth-child(1) {
				margin-right: 5px;
			}
			&:nth-child(3) {
				margin-right: 5px;
			}
		}
	}
}
.actions {
	margin: 0 auto;
	margin-top: 30px;
}
</style>
