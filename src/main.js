import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vue2Editor from "vue2-editor"

Vue.config.productionTip = false
Vue.use(Vue2Editor);


new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app')
