<template>
	<div class="container">
		<div class="container__login">
			<form class="container__login__form" @submit.prevent="submit">
				<h1 class="container__login__form__title">Entre com sua conta</h1>
				<input
					type="email"
					placeholder="Digite seu e-mail"
					class="container__login__form__input"
					v-model="email"
				/>
				<input
					type="password"
					placeholder="Digite sua senha"
					class="container__login__form__input"
					v-model="senha"
				/>
				<button
					:loading="loading"
					type="submit"
					class="container__login__form__button"
				>
					Entrar
				</button>
			</form>

			<router-link to="/cadastro" class="container__login__cadastro"
				>Cadastre-se</router-link
			>
		</div>
		<div class="container__logo">
			<img src="@/assets/proenade.svg" class="container__logo__img" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
	data() {
		return {
			email: '',
			senha: '',
		}
	},
	computed: {
		...mapGetters({
			loading: 'loading',
			getSnackbar: 'snackbar',
			snackbarMessage: 'snackbarMessage',
		}),
	},
	methods: {
		async submit() {
			this.$store.dispatch('setLoading', true)

			const { data } = await axios.get('http://localhost:3000/usuarios', {
				params: {
					email: this.email,
					senha: this.senha,
				},
			})
			if (data.length > 0) {
				this.$router.push('/home')
			} else {
				this.$store.dispatch('setSnackbar', {
					status: true,
					message: 'Usuário ou senha incorretos',
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	background-image: url('../assets/Degradeok.jpg');
	justify-content: space-around;
	align-items: center;
	&__logo {
		display: flex;
		align-items: center;
		width: 45%;
		height: 100%;
		&__img {
			width: 500px;
		}
	}
	&__login {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 33%;
		height: 100%;
		margin: 0 auto;
		&__form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			&__title {
				width: 100%;
				text-align: center;
				color: white;
				// margin-right: 30px;
			}
			&__input {
				outline: 0;
				border-radius: 5px;
				border: 0;
				padding: 15px;
				margin: 10px 0;
				background: white;
				width: 450px;
				height: 60px;
			}
			&__button {
				margin-top: 10px;
				margin-bottom: 10px;
				border: 0;
				padding: 15px;
				border-radius: 5px;
				background: #003fff;
				color: #fff;
				font-weight: 500;
				font-size: 16px;
				cursor: pointer;
				transition: 800ms;
				outline: 0;
				width: 450px;
				height: 60px;
				&:hover {
					background: #0082ff;
				}
			}
		}
		&__cadastro {
			border: 1px solid #003fff;
			text-decoration: none;
			color: #fff;
			padding: 15px;
			border-radius: 5px;
			margin-top: 10px;
			text-align: center;
			font-size: 16px;
			transition: 800ms;
			outline: 0;
			width: 450px;
			height: 60px;
			&:hover {
				background: #0082ff;
			}
		}
	}
}
</style>
