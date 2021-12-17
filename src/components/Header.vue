<template>
	<v-card class="header" flat>
		<div class="header__container content">
			<router-link to="/home">
				<img src="@/assets/proenade.svg" class="header__container__img" />
			</router-link>
			<v-tooltip color="#FF5A00" right>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						@click="logout"
						icon
						color="primary"
						dark
						v-bind="attrs"
						v-on="on"
					>
						<v-icon color="#FF5A00">logout</v-icon>
					</v-btn>
				</template>
				<span>SAIR</span>
			</v-tooltip>
		</div>
	</v-card>
</template>
<script>
import axios from 'axios'
export default {
	data() {
		return {}
	},
	methods: {
		logout() {
			this.$router.push('/')
		},
	},
}
</script>
<style lang="scss" scoped>
.content {
	margin: 0 auto;
	width: 70%;
}
.header {
	background-image: url('../assets/Degradeok.jpg');
	width: 100%;
	height: 60px;
	border-bottom: 1px solid #0082ff !important;
	border-radius: 0 !important;
	&__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
		max-width: 970px;
		&__img {
			width: 100px;
		}
		&__sair {
			color: #fff;
			text-decoration: none;
			cursor: pointer;
		}
	}
}
</style>
