import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Cadastro from '@/pages/Cadastro'
import Consulta from '@/pages/Consulta'
import CadastroCurso from '@/pages/CadastroCurso'
import CadastroDisciplina from '@/pages/CadastroDisciplina'
import Login from '@/pages/Login'

Vue.use(VueRouter)

const routes = [
	{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path: '/consulta',
    name: 'Consulta',
    component: Consulta
  },
  {
    path: '/cadastro-cursos',
    name: 'Cursos',
    component: CadastroCurso
  },
  {
    path: '/cadastro-disciplinas',
    name: 'Disciplinas',
    component: CadastroDisciplina
  },
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
