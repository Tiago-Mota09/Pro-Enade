<template>
	<div class="container">
		<div class="container__cadastro">
			<img src="@/assets/proenade.svg" class="container__cadastro__img" />

			<h1 class="container__cadastro__titulo">Novo cadastro</h1>

			<form class="container__cadastro__form" @submit.prevent="save">
				<input type="text" placeholder="Digite seu nome" v-model="nome" />
				<!-- {{ nome }} -->
				<input
					type="text"
					placeholder="Digite seu sobrenome"
					v-model="sobrenome"
				/>
				<input type="email" placeholder="Digite seu email" v-model="email" />
				<input type="password" placeholder="Digite sua senha" v-model="senha" />
				<input
					type="password"
					placeholder="Confirme sua senha"
					v-model="confirmarSenha"
				/>
				<button type="submit" class="container__cadastro__form__button">
					Cadastrar
				</button>
			</form>
			<router-link to="/" class="container__cadastro__voltar"
				>Voltar</router-link
			>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			nome: '',
			sobrenome: '',
			email: '',
			senha: '',
			confirmarSenha: '',
		}
	},
	computed: {
		...mapGetters({
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	methods: {
		async save() {
			if (
				this.nome === '' ||
				this.sobrenome === '' ||
				this.email === '' ||
				this.senha === ''
			) {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Preencha todos os campos',
				})
			} else if (this.senha !== this.confirmarSenha) {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Senha e Confirme a senha devem ser iguais',
				})
			} else {
				const data = await axios.post('http://localhost:3000/usuarios', {
					nome: this.nome,
					sobrenome: this.sobrenome,
					email: this.email,
					senha: this.senha,
				})
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Usuário cadastrado com sucesso!',
				})
				this.$router.push('/')
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	background-image: url('../assets/Degradeok.jpg');
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	&__cadastro {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 30%;
		&__img {
			width: 250px;
			margin-bottom: 20px;
			margin-left: 90px;
		}
		&__titulo {
			color: #fff;
			font-size: 32px;
			margin-bottom: 20px;
			margin-left: 115px;
		}
		&__form {
			display: flex;
			flex-direction: column;
			input {
				background: white;
				padding: 10px;
				margin-bottom: 10px;
				border-radius: 5px;
				outline: 0;
				border: 0;
				width: 450px;
				height: 50px;
			}
			&__button {
				outline: 0;
				border: 0;
				color: #ffffff;
				background: #003fff;
				padding: 10px;
				border-radius: 5px;
				font-size: 16px;
				cursor: pointer;
				transition: 800ms;
				width: 450px;
				height: 50px;
				&:hover {
					background: #0082ff;
				}
			}
		}
		&__voltar {
			border: 1px solid #003fff;
			text-decoration: none;
			padding: 12px;
			border-radius: 5px;
			margin-top: 10px;
			text-align: center;
			font-size: 16px;
			color: #fff;
			transition: 800ms;
			outline: 0;
			width: 450px;
			height: 50px;
			&:hover {
				background: #0082ff;
				border: 1px solid #0082ff;
			}
		}
	}
}
</style>
