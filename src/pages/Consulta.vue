<template>
	<v-card flat>
		<a name="section1">
			<Header />
		</a>
		<div class="home content">
			<div v-if="modalEditar === false" class="home__form">
				<v-expansion-panels multiple v-model="panel">
					<v-expansion-panel v-model="hasItems">
						<v-expansion-panel-header>
							<h3>Preencha os filtros para pesquisa</h3>
						</v-expansion-panel-header>

						<v-expansion-panel-content>
							<v-card color="#E0E0E0" class="radios" height="60" flat>
								<div class="d-flex align-center mr-5">
									<strong class="mr-4">Tipo de questão:</strong>
									<v-radio-group row v-model="tipoQuestao">
										<v-radio
											v-for="(radio, index) in radiosQuestoes"
											:key="index"
											:label="radio.label"
											:value="radio.value"
											color="#0072FF"
										/>
									</v-radio-group>
								</div>
								<div class="d-flex align-center">
									<strong class="mx-4">Dificuldade:</strong>
									<v-radio-group row v-model="dificuldade">
										<v-radio
											v-for="(radio, index) in radios"
											:key="index"
											:label="radio.label"
											:value="radio.value"
											color="#0072FF"
										/>
									</v-radio-group>
								</div>
							</v-card>
							<v-row class="mt-2">
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Cursos - Ex: ADS, ciencias da computacao..."
										class="home__form__input"
										v-model="curso"
										outlined
										hide-details
									/>
								</v-col>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Ano - Ex: 2008"
										class="home__form__input"
										v-model="ano"
										outlined
										maxLength="4"
										hide-details
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplina 1 - Ex: engenharia de software"
										class="home__form__input"
										v-model="disciplina1"
										outlined
										hide-details
									/>
								</v-col>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplinas 2 - Ex: analise e projeto de sistemas"
										class="home__form__input"
										v-model="disciplina2"
										outlined
										hide-details
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplina 3 - Ex: aplicacoes para internet"
										class="home__form__input"
										v-model="disciplina3"
										outlined
										hide-details
									/>
								</v-col>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplina 4 - Ex: gestao de TI "
										class="home__form__input"
										v-model="disciplina4"
										outlined
										hide-details
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="12" lg="10">
									<v-text-field
										type="text"
										label="Digite frase ou palavra-chave"
										class="home__form__input"
										v-model="palavraChave"
										outlined
										hide-details
									/>
								</v-col>
								<v-col md="12" lg="2">
									<v-text-field
										type="text"
										label="N° Questão"
										class="home__form__input"
										v-model="codeQuestion"
										outlined
										hide-details
									/>
								</v-col>
							</v-row>
							<div class="d-flex">
								<button
									:loading="loading"
									@click="consultarProva"
									class="home__form__btn"
								>
									Consultar
								</button>
								<button
									:loading="loading"
									@click="reset"
									class="home__form__limpar"
								>
									Limpar
								</button>
								<v-spacer></v-spacer>
								<button
									:loading="loading"
									@click="back"
									class="home__form__back"
								>
									Voltar
								</button>
							</div>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
			</div>
			<span v-if="this.provas.length > 0">Lista de questões</span>
			<v-card
				class="mx-auto home__list"
				v-for="prova in provas"
				:key="prova.id"
			>
				<v-card-text class="home__list__text">
					<div>
						<div class="home__list__text__description">
							<strong class="home__list__text__description__title"
								>Curso:</strong
							>
							<span class="home__list__text__description__subtitle">{{
								prova.curso
							}}</span>
						</div>
						<div class="home__list__text__description">
							<strong class="home__list__text__description__title"
								>Disciplina:</strong
							>
							<span class="home__list__text__description__subtitle"
								>{{ prova.disciplina1 }}
								<span
									v-if="prova.disciplina2 !== ''"
									class="home__list__text__description__subtitle"
									>,</span
								>
								{{ prova.disciplina2
								}}<span
									v-if="prova.disciplina3"
									class="home__list__text__description__subtitle"
									>,</span
								>
								{{ prova.disciplina3 }}
								<span
									v-if="prova.disciplina4"
									class="home__list__text__description__subtitle"
									>,</span
								>
								{{ prova.disciplina4 }}</span
							>
						</div>

						<div class="home__list__text__description">
							<strong class="home__list__text__description__title">Ano:</strong>
							<span class="home__list__text__description__subtitle">{{
								prova.ano
							}}</span>
						</div>
					</div>
					<div>
						<div class="home__list__text__description">
							<strong class="home__list__text__description__title"
								>Tipo:</strong
							>
							<span class="home__list__text__description__subtitle">{{
								prova.tipoQuestao
							}}</span>
						</div>
						<div class="home__list__text__description">
							<strong class="home__list__text__description__title"
								>Dificuldade:</strong
							>
							<span class="home__list__text__description__subtitle">{{
								prova.dificuldade
							}}</span>
						</div>
					</div>
				</v-card-text>
				<v-card-text class="home__list__text2">
					<strong class="home__list__text2__question"
						>Questão {{ prova.codeQuestion }} - Enunciado:</strong
					>
					<div class="d-flex justify-center flex-column mb-5">
						<div class="content-img">
							<img v-if="prova.img2" :src="getImage(prova.img2)" class="img" />
						</div>
						<p class="home__list__text2__paragrafo">
							{{ prova.questao }}
						</p>
						<div class="content-img-teste">
							<v-card class="content-cards" flat v-if="prova.teste">
								<vue-editor
									class="content-img2"
									v-model="prova.teste"
									hide-details
									outlined
									disabled
									:editor-toolbar="customToolbar"
								/>
							</v-card>
							<v-card class="content-cards" flat v-if="prova.teste2">
								<vue-editor
									class="content-img2"
									v-model="prova.teste2"
									hide-details
									outlined
									disabled
									:editor-toolbar="customToolbar"
								/>
							</v-card>
						</div>

						<div class="container-imgs">
							<div class="content-img">
								<img v-if="prova.img" :src="getImage(prova.img)" class="img" />
							</div>
							<div class="content-img">
								<img
									v-if="prova.img3"
									:src="getImage(prova.img3)"
									class="img"
								/>
							</div>
							<div class="content-img">
								<img
									v-if="prova.img4"
									:src="getImage(prova.img4)"
									class="img"
								/>
							</div>
						</div>
					</div>
					<p
						class="home__list__text2__paragrafo"
						v-if="prova.respostaDiscursiva"
					>
						<strong class="home__list__text2__alternativa mb-3"
							>Resposta:</strong
						>
						<br />
						{{ prova.respostaDiscursiva }}
					</p>
					<!-- AlternativaA -->
					<p class="home__list__text2__paragrafo" v-if="prova.alternativaA">
						<strong class="home__list__text2__alternativa mb-3">A)</strong>
						{{ prova.alternativaA }}
					</p>
					<v-card
						class="content-cards d-flex flex-column mt-5"
						flat
						v-if="prova.alternativaAImagem"
					>
						<strong class="home__list__text2__alternativa  mb-3"
							>Alternativa A:</strong
						>
						<vue-editor
							class="content-img2"
							v-model="prova.alternativaAImagem"
							hide-details
							outlined
							disabled
							:editor-toolbar="customToolbar"
						/>
					</v-card>

					<!-- AlternativaB -->
					<p class="home__list__text2__paragrafo" v-if="prova.alternativaB">
						<strong class="home__list__text2__alternativa mb-3">B)</strong>
						{{ prova.alternativaB }}
					</p>
					<v-card
						class="content-cards d-flex flex-column mt-5"
						flat
						v-if="prova.alternativaBImagem"
					>
						<strong class="home__list__text2__alternativa  mb-3"
							>Alternativa B:</strong
						>
						<vue-editor
							class="content-img2"
							v-model="prova.alternativaBImagem"
							hide-details
							outlined
							disabled
							:editor-toolbar="customToolbar"
						/>
					</v-card>
					<!-- AlternativaC -->

					<p class="home__list__text2__paragrafo" v-if="prova.alternativaC">
						<strong class="home__list__text2__alternativa mb-3">C)</strong>
						{{ prova.alternativaC }}
					</p>
					<v-card
						class="content-cards d-flex flex-column mt-5"
						flat
						v-if="prova.alternativaCImagem"
					>
						<strong class="home__list__text2__alternativa  mb-3"
							>Alternativa C:</strong
						>
						<vue-editor
							class="content-img2"
							v-model="prova.alternativaCImagem"
							hide-details
							outlined
							disabled
							:editor-toolbar="customToolbar"
						/>
					</v-card>
					<!-- AlternativaD -->
					<p class="home__list__text2__paragrafo" v-if="prova.alternativaD">
						<strong class="home__list__text2__alternativa mb-3">D)</strong>
						{{ prova.alternativaD }}
					</p>
					<v-card
						class="content-cards d-flex flex-column mt-5"
						flat
						v-if="prova.alternativaDImagem"
					>
						<strong class="home__list__text2__alternativa  mb-3"
							>Alternativa D:</strong
						>
						<vue-editor
							class="content-img2"
							v-model="prova.alternativaDImagem"
							hide-details
							outlined
							disabled
							:editor-toolbar="customToolbar"
						/>
					</v-card>
					<!-- AlternativaE -->
					<p class="home__list__text2__paragrafo" v-if="prova.alternativaE">
						<strong class="home__list__text2__alternativa mb-3">E)</strong>
						{{ prova.alternativaE }}
					</p>
					<v-card
						class="content-cards d-flex flex-column mt-5"
						flat
						v-if="prova.alternativaEImagem"
					>
						<strong class="home__list__text2__alternativa  mb-3"
							>Alternativa E:</strong
						>
						<vue-editor
							class="content-img2"
							v-model="prova.alternativaEImagem"
							hide-details
							outlined
							disabled
							:editor-toolbar="customToolbar"
						/>
					</v-card>

					<p
						class="home__list__text2__correta"
						v-if="prova.tipoQuestao === 'MultiplaEscolha'"
					>
						<strong class="home__list__text2__alternativa mb-3"
							>Alternativa correta:</strong
						>
						{{ prova.alternativaCorreta }}
					</p>
					<p class="home__list__text2__data">
						<strong class="home__list__text2__alternativa mb-3"
							>Data de cadastro da questão:</strong
						>
						{{ prova.dataAtual }}
					</p>
				</v-card-text>
				<v-card-actions class="d-flex justify-space-between">
					<div>
						<v-tooltip color="#0082ff" top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									@click=";(modalEditar = true), carregarInfo($event, prova)"
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
									@click="deletarProva($event, prova.id)"
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
					<div>
						<a class="link mr-4" href="#section1">
							<v-tooltip color="#FF5A00" top>
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon color="primary" dark v-bind="attrs" v-on="on">
										<v-icon color="#FF5A00">arrow_upward</v-icon>
									</v-btn>
								</template>
								<h4>Voltar ao topo</h4>
							</v-tooltip>
						</a>
					</div>
				</v-card-actions>
			</v-card>
			<v-card>
				<Modal v-if="modalEditar">
					<v-card class="modal">
						<div class="modal__header">
							<h3 class="modal__header__title">Editar questão</h3>

							<a @click="modalEditar = false" name="section2" href="#">
								<img src="@/assets/Vector.svg" alt="" />
							</a>
						</div>
						<v-col md="12" lg="4">
							<v-text-field
								type="text"
								label="Data de cadastro"
								class="modal__form__input"
								v-model="editar.dataAtual"
								outlined
								hide-details
							/>
						</v-col>
						<v-row class="modal__form__invisible">
							<!-- <v-col md="14" lg="14">
								<vue-editor
									type="text"
									class="modal__form__input"
									v-model="editar.teste"
									outlined
									hide-details
								/>
							</v-col>
							<v-col md="14" lg="14">
								<vue-editor
									type="text"
									class="modal__form__input"
									v-model="editar.teste2"
									outlined
									hide-details
								/>
							</v-col> -->

							<v-col md="12" lg="4">
								<v-text-field
									type="text"
									class="modal__form__input"
									v-model="editar.img"
									outlined
									hide-details
								/>
							</v-col>
							<v-col md="12" lg="4">
								<v-text-field
									type="text"
									class="modal__form__input"
									v-model="editar.img2"
									outlined
									hide-details
								/>
							</v-col>
							<v-col md="12" lg="4">
								<v-text-field
									type="text"
									class="modal__form__input"
									v-model="editar.img3"
									outlined
									hide-details
								/>
							</v-col>
						</v-row>

						<v-form class="modal__form">
							<v-row class="d-flex justify-space-between align-center">
								<v-card disabled flat class="d-flex align-center">
									<strong class="mx-4">Tipo de questão:</strong>
									<v-radio-group row v-model="editar.tipoQuestao">
										<v-radio
											v-for="(radio, index) in radiosQuestoes"
											:key="index"
											:label="radio.label"
											:value="radio.value"
										/>
									</v-radio-group>
								</v-card>
								<div class="d-flex align-center justify-end ">
									<strong>N° Questão</strong>
									<v-col md="12" lg="4">
										<v-text-field
											type="number"
											class="modal__form__input"
											v-model="editar.codeQuestion"
											outlined
											hide-details
										/>
									</v-col>
								</div>
							</v-row>
							<v-row>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Cursos"
										class="modal__form__input"
										v-model="editar.curso"
										outlined
										hide-details
									/>
								</v-col>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Ano"
										class="modal__form__input"
										v-model="editar.ano"
										outlined
										maxLength="4"
										hide-details
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplina 1"
										class="modal__form__input"
										v-model="editar.disciplina1"
										outlined
										hide-details
									/>
								</v-col>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplinas 2"
										class="modal__form__input"
										v-model="editar.disciplina2"
										outlined
										hide-details
									/>
								</v-col>
							</v-row>
							<v-row>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplina 3"
										class="modal__form__input"
										v-model="editar.disciplina3"
										outlined
									/>
								</v-col>
								<v-col md="12" lg="6">
									<v-text-field
										type="text"
										label="Disciplina 4"
										class="modal__form__input"
										v-model="editar.disciplina4"
										outlined
									/>
								</v-col>
							</v-row>
							<div class="modal__form__coluna">
								<strong class=" mx-3">Enunciado:</strong>
								<v-row>
									<v-col v-if="editar.questao" md="14" lg="14">
										<v-textarea
											type="text"
											class="modal__form__text"
											v-model="editar.questao"
											hide-details
											outlined
										/>
									</v-col>
								</v-row>
								<v-row>
									<strong
										v-if="
											editar.teste && editar.tipoQuestao === 'MultiplaEscolha'
										"
										class=" mx-4"
										>Imagem 1:</strong
									>
									<v-col
										v-if="
											editar.teste && editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="12"
										lg="12"
									>
										<vue-editor
											type="text"
											class="modal__form__input"
											v-model="editar.teste"
											outlined
											hide-details
										/>
									</v-col>
								</v-row>
								<v-row>
									<strong
										v-if="
											editar.teste2 && editar.tipoQuestao === 'MultiplaEscolha'
										"
										class=" mx-4"
										>Imagem 2:</strong
									>

									<v-col
										v-if="
											editar.teste2 && editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="12"
										lg="12"
									>
										<vue-editor
											type="text"
											class="modal__form__input"
											v-model="editar.teste2"
											outlined
											hide-details
										/>
									</v-col>
								</v-row>
								<v-row class="d-flex flex-column">
									<strong v-if="editar.alternativaAImagem" class=" mx-4"
										>Alternativa A:</strong
									>

									<v-col
										v-if="
											editar.alternativaA &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="12"
										lg="12"
									>
										<v-textarea
											type="text"
											label="Alternativa A"
											class="modal__form__text"
											v-model="editar.alternativaA"
											hide-details
											outlined
										/>
									</v-col>
									<v-col
										v-if="
											!editar.alternativaA &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="14"
										lg="14"
									>
										<vue-editor
											type="text"
											class="modal__form__input"
											v-model="editar.alternativaAImagem"
											outlined
											hide-details
										/>
									</v-col>
								</v-row>
								<v-row class="d-flex flex-column">
									<strong v-if="editar.alternativaBImagem" class=" mx-4"
										>Alternativa B:</strong
									>

									<v-col
										v-if="
											editar.alternativaB &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="12"
										lg="12"
									>
										<v-textarea
											type="text"
											label="Alternativa B"
											class="modal__form__text"
											v-model="editar.alternativaB"
											hide-details
											outlined
										/>
									</v-col>
									<v-col
										v-if="
											!editar.alternativaB &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="14"
										lg="14"
									>
										<vue-editor
											type="text"
											class="modal__form__input"
											v-model="editar.alternativaBImagem"
											outlined
											hide-details
										/>
									</v-col>
								</v-row>
								<v-row class="d-flex flex-column">
									<strong v-if="editar.alternativaCImagem" class=" mx-4"
										>Alternativa C:</strong
									>

									<v-col
										v-if="
											editar.alternativaC &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="12"
										lg="12"
									>
										<v-textarea
											type="text"
											label="Alternativa C"
											class="modal__form__text"
											v-model="editar.alternativaC"
											hide-details
											outlined
										/>
									</v-col>
									<v-col
										v-if="
											!editar.alternativaC &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="14"
										lg="14"
									>
										<vue-editor
											type="text"
											class="modal__form__input"
											v-model="editar.alternativaCImagem"
											outlined
											hide-details
										/>
									</v-col>
								</v-row>
								<v-row class="d-flex flex-column">
									<strong v-if="editar.alternativaDImagem" class=" mx-4"
										>Alternativa D:</strong
									>

									<v-col
										v-if="
											editar.alternativaD &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="12"
										lg="12"
									>
										<v-textarea
											type="text"
											label="Alternativa D"
											class="modal__form__text"
											v-model="editar.alternativaD"
											hide-details
											outlined
										/>
									</v-col>
									<v-col
										v-if="
											!editar.alternativaD &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="14"
										lg="14"
									>
										<vue-editor
											type="text"
											class="modal__form__input"
											v-model="editar.alternativaDImagem"
											outlined
											hide-details
										/>
									</v-col>
								</v-row>
								<v-row class="d-flex flex-column">
									<strong v-if="editar.alternativaEImagem" class=" mx-4"
										>Alternativa E:</strong
									>

									<v-col
										v-if="
											editar.alternativaE &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="12"
										lg="12"
									>
										<v-textarea
											type="text"
											label="Alternativa E"
											class="modal__form__text"
											v-model="editar.alternativaE"
											hide-details
											outlined
										/>
									</v-col>
									<v-col
										v-if="
											!editar.alternativaE &&
												editar.tipoQuestao === 'MultiplaEscolha'
										"
										md="14"
										lg="14"
									>
										<vue-editor
											type="text"
											class="modal__form__input"
											v-model="editar.alternativaEImagem"
											outlined
											hide-details
										/>
									</v-col>
								</v-row>
								<v-row>
									<v-col
										v-if="editar.tipoQuestao === 'Discursiva'"
										md="12"
										lg="12"
									>
										<v-textarea
											type="text"
											label="Resposta discursiva"
											class="modal__form__text"
											v-model="editar.respostaDiscursiva"
											hide-details
											outlined
										/>
									</v-col>
								</v-row>
								<v-row v-if="editar.tipoQuestao === 'MultiplaEscolha'">
									<v-col md="12" lg="4">
										<v-text-field
											type="text"
											label="Alternativa Correta"
											class="modal__form__input"
											v-model="editar.alternativaCorreta"
											outlined
											hide-details
										/>
									</v-col>
									<div class="d-flex align-center">
										<strong class="mx-4">Dificuldade:</strong>
										<v-radio-group row v-model="editar.dificuldade">
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
											v-model="editar.palavraChave"
											outlined
										/>
									</v-col>
								</v-row>
							</div>
						</v-form>

						<v-row class="d-flex justify-space-between mb-6">
							<div>
								<v-btn @click="editarQuestao" class="modal__form__btn ml-6">
									Editar
								</v-btn>
								<v-btn @click="modalEditar = false" class="modal__form__back">
									Fechar
								</v-btn>
							</div>
							<a class="modal__form__link mr-4" href="#section2">
								<v-tooltip color="#FF5A00" top>
									<template v-slot:activator="{ on, attrs }">
										<v-btn icon color="primary" dark v-bind="attrs" v-on="on">
											<v-icon color="#FF5A00">arrow_upward</v-icon>
										</v-btn>
									</template>
									<h4>Voltar ao topo</h4>
								</v-tooltip>
							</a>
						</v-row>
					</v-card>
				</Modal>
			</v-card>
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
			panel: [0, 1],
			tipoQuestao: '',
			curso: '',
			disciplina1: '',
			disciplina2: '',
			disciplina3: '',
			disciplina4: '',
			ano: '',
			questao: '',
			teste: '',
			teste2: '',
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
			dificuldade: '',
			palavraChave: '',
			codeQuestion: '',
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
			provas: {},
			editar: {
				id: '',
				tipoQuestao: '',
				curso: '',
				disciplina1: '',
				disciplina2: '',
				disciplina3: '',
				disciplina4: '',
				ano: '',
				questao: '',
				teste: '',
				teste2: '',
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
				codeQuestion: '',
				img2: '',
				img: '',
				img3: '',
			},
			customToolbar: [[''], [{ list: '' }, { list: '' }], ['', '']],
		}
	},
	watch: {
		async modalEditar() {
			if (this.modalEditar === false) {
				this.consultarProva()
			} else {
				false
			}
		},
	},
	mounted() {
		this.$store.dispatch('example/getCursos')
		this.$store.dispatch('example/getDisciplinas')
		var data = new Date()
		var dia = String(data.getDate()).padStart(2, '0')
		var mes = String(data.getMonth() + 1).padStart(2, '0')
		var ano = data.getFullYear()
		this.dataAtual = dia + '/' + mes + '/' + ano
	},
	components: {
		Modal,
		Header,
	},
	computed: {
		...mapGetters({
			getCursos: 'example/cursos',
			getDisciplinas: 'example/disciplinas',
			getFilter: 'example/filter',
			loading: 'loading',
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
		hasItems() {
			if (this.provas && this.provas.length > 0) return (this.panel = [])
			else return (this.panel = [0, 1])
		},
	},
	methods: {
		getImage(fileName) {
			if (!fileName) return
			const [name, type] = fileName.split('.')
			return require(`@/assets/${name}.${type}`)
		},
		async consultarProva() {
			this.$store.dispatch('setLoading', true)
			try {
				if (
					this.tipoQuestao === '' &&
					this.curso === '' &&
					this.ano === '' &&
					this.disciplina1 === '' &&
					this.disciplina2 === '' &&
					this.disciplina3 === '' &&
					this.disciplina4 === '' &&
					this.dificuldade === '' &&
					this.palavraChave === '' &&
					this.codeQuestion === ''
				) {
					this.$store.dispatch('setSnackbar', {
						status: true,
						message: 'Informe algum filtro.',
					})
				} else {
					const data = await this.$store.dispatch('example/getFilter', {
						tipoQuestao: this.tipoQuestao || null,
						dificuldade: this.dificuldade || null,
						curso: this.curso.toUpperCase() || null,
						ano: this.ano || null,
						disciplina1: this.disciplina1.toUpperCase() || null,
						disciplina2: this.disciplina2.toUpperCase() || null,
						disciplina3: this.disciplina3.toUpperCase() || null,
						disciplina4: this.disciplina4.toUpperCase() || null,
						palavraChave: this.palavraChave.toUpperCase() || null,
						codeQuestion: this.codeQuestion || null,
					})
					console.log('CURSOS', this.curso)
					this.provas = data
					console.log('PROVAS', this.provas)
					if (this.provas.length === 0) {
						this.$store.dispatch('setSnackbar', {
							status: true,
							message: 'Nenhum resultado para esses filtros',
						})
					}
					this.filterDisciplina()
				}
			} catch (e) {
				this.$store.dispatch('setLoading', false)

				throw e
			}
		},

		async deletarProva(e, id) {
			e.preventDefault()
			const { data } = await axios.delete(`http://localhost:3000/provas/${id}`)
			this.$store.dispatch('setSnackbar', {
				status: true,
				message: 'Questão excluída com sucesso!',
			})
			this.consultarProva()
		},
		carregarInfo(e, prova) {
			e.preventDefault()
			this.editar.id = prova.id
			this.editar.tipoQuestao = prova.tipoQuestao
			this.editar.dificuldade = prova.dificuldade
			this.editar.curso = prova.curso
			this.editar.ano = prova.ano
			this.editar.disciplina1 = prova.disciplina1
			this.editar.disciplina2 = prova.disciplina2
			this.editar.disciplina3 = prova.disciplina3
			this.editar.disciplina4 = prova.disciplina4
			this.editar.questao = prova.questao
			this.editar.teste = prova.teste
			this.editar.teste2 = prova.teste2
			this.editar.alternativaA = prova.alternativaA
			this.editar.alternativaB = prova.alternativaB
			this.editar.alternativaC = prova.alternativaC
			this.editar.alternativaD = prova.alternativaD
			this.editar.alternativaE = prova.alternativaE
			this.editar.alternativaAImagem = prova.alternativaAImagem
			this.editar.alternativaBImagem = prova.alternativaBImagem
			this.editar.alternativaCImagem = prova.alternativaCImagem
			this.editar.alternativaDImagem = prova.alternativaDImagem
			this.editar.alternativaEImagem = prova.alternativaEImagem
			this.editar.alternativaCorreta = prova.alternativaCorreta
			this.editar.respostaDiscursiva = prova.respostaDiscursiva
			this.editar.palavraChave = prova.palavraChave
			this.editar.codeQuestion = prova.codeQuestion
			this.editar.dataAtual = prova.dataAtual
			this.editar.img = prova.img
			this.editar.img2 = prova.img2
			this.editar.img3 = prova.img3
			console.log('Editar', this.editar)
		},
		async editarQuestao() {
			const { data } = await axios.put(
				`http://localhost:3000/provas/${this.editar.id}`,
				{
					tipoQuestao: this.editar.tipoQuestao,
					dificuldade: this.editar.dificuldade,
					curso: this.editar.curso,
					ano: this.editar.ano,
					disciplina1: this.editar.disciplina1,
					disciplina2: this.editar.disciplina2,
					disciplina3: this.editar.disciplina3,
					disciplina4: this.editar.disciplina4,
					questao: this.editar.questao,
					teste: this.editar.teste,
					teste2: this.editar.teste2,
					alternativaA: this.editar.alternativaA,
					alternativaB: this.editar.alternativaB,
					alternativaC: this.editar.alternativaC,
					alternativaD: this.editar.alternativaD,
					alternativaE: this.editar.alternativaE,
					alternativaAImagem: this.editar.alternativaAImagem,
					alternativaBImagem: this.editar.alternativaBImagem,
					alternativaCImagem: this.editar.alternativaCImagem,
					alternativaDImagem: this.editar.alternativaDImagem,
					alternativaEImagem: this.editar.alternativaEImagem,
					alternativaCorreta: this.editar.alternativaCorreta,
					respostaDiscursiva: this.editar.respostaDiscursiva,
					palavraChave: this.editar.palavraChave,
					codeQuestion: this.editar.codeQuestion,
					dataAtual: this.editar.dataAtual,
					img: this.editar.img,
					img2: this.editar.img2,
					img3: this.editar.img3,
				}
			)
			this.$store.dispatch('setSnackbar', {
				status: true,
				message: 'Questão alterada com sucesso!',
			})
			this.consultarProva()

			this.modalEditar = false
		},
		reset() {
			this.tipoQuestao = ''
			this.curso = ''
			this.ano = ''
			this.disciplina1 = ''
			this.disciplina2 = ''
			this.disciplina3 = ''
			this.disciplina4 = ''
			this.dificuldade = ''
			this.palavraChave = ''
			this.codeQuestion = ''
			// this.$store.dispatch('example/emptyList')
		},
		back() {
			this.$router.push('/home')
		},
		filterDisciplina() {
			const engineer = this.provas.filter(
				eng =>
					eng.disciplina1 === 'ENGENHARIA DE SOFTWARE' ||
					eng.disciplina2 === 'ENGENHARIA DE SOFTWARE' ||
					eng.disciplina3 === 'ENGENHARIA DE SOFTWARE'
			)
			this.engineering = engineer
			console.log(this.engineering.length, 'ENGINEER')
		},
	},
}
</script>
<style lang="scss" scoped>
.content {
	margin: 0 auto;
	width: 70%;
}
span {
	margin: 40px 0;
	font-size: 30px;
	font-weight: 600;
	color: #fff;
}
.radios {
	margin: 0 auto;
	display: flex;
	justify-content: center;
}
.home {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: url('../assets/Degradeok.jpg');
	background-repeat: repeat-y;
	height: auto;
	width: 100%;
	overflow-y: auto;
	&__form {
		margin-top: 30px;
		width: 70%;
		max-width: 950px;
		margin-bottom: 20px;
		z-index: 1;
		strong {
			color: #0072ff;
		}
		&__input {
			background: #fff !important;
		}
		&__btn {
			margin-top: 20px;
			margin-right: 10px;
			width: 130px;
			height: 40px;
			// padding: 10px;
			// margin-left: 10px;
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
		&__limpar {
			margin-top: 20px;
			margin-right: 10px;
			width: 90px;
			height: 40px;
			// padding: 10px;
			// margin-left: 10px;
			border: 1px solid #003fff;
			border-radius: 10px;
			background: #fff;
			font-weight: 500;
			color: #003fff;
			cursor: pointer;
			outline: 0;
			transition: 800ms;
			&:hover {
				background: #0082ff;
				color: #fff;
				border: 1px solid #0082ff;
			}
		}
		&__back {
			margin-top: 20px;
			// margin-right: 10px;
			width: 90px;
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
	&__title {
		color: #fff;
		margin: 10px auto 40px;
	}
	&__list {
		width: 70%;
		height: auto;
		max-width: 950px;
		margin-bottom: 50px;
		padding: 10px;
		&__text {
			display: flex;
			justify-content: space-between;
			align-items: center;
			&__description {
				margin-bottom: 10px;
				&__title {
					font-size: 16px;
					color: black;
					margin-right: 10px;
				}
				&__subtitle {
					font-size: 16px;

					color: #757575;
				}
			}
		}
		&__text2 {
			display: flex;
			flex-direction: column;
			&__question {
				font-size: 16px;
				color: black;
			}
			&__paragrafo {
				font-size: 15px;
				margin-top: 10px;
				color: #757575;
			}
			&__alternativa {
				font-size: 14px;
				color: black;
			}
			&__correta {
				color: red;
				font-size: 15px;
				font-weight: 600;
				margin-top: 30px;
			}
			&__data {
				color: #0072ff;
				font-size: 15px;
				font-weight: 600;
			}
		}
	}
	.modal {
		display: flex;
		flex-direction: column;
		padding: 15px;
		width: 100%;
		height: auto;
		z-index: 7;

		// background: black;
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
			justify-content: space-around;
			padding: 10px;
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
			&__invisible {
				display: none;
			}
			&__btn {
				width: 116px;
				padding: 10px;
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
			&__btn-voltar {
				border: 1px solid #fff;
				border-radius: 5px;
				outline: 0;
				background: transparent;
				color: #fff;
				padding: 10px;
				width: 116px;
				margin-right: 10px;
				transition: 800ms;
				cursor: pointer;
				&:hover {
					background: #30438f;
					color: #fff;
				}
			}
			&__link {
				text-decoration: none;
			}
		}
	}
}
strong {
	color: #003fff;
}
.link {
	text-decoration: none;
}
.container-imgs {
	width: 100%;
	display: flex;
	justify-content: center;
}
.content-img {
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.content-cards {
	width: 47%;
	display: flex;
	// justify-content: center;
	// align-items: center;
}
.content-img-teste {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.content-img2 {
	// height: 250px;
	width: 100%;
	// width: 70%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.img {
	width: 400px;
	height: 200px;
}
.ql-snow .ql-toolbar {
	border: none !important;
	box-sizing: border-box;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	padding: 0px;
}
</style>
