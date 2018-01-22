import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import Home from './components/Home.vue'
import Post from './components/Post.vue'
import VueResource from 'vue-resource'


Vue.use(VueResource)
Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
     {path: '/hist', component: Home},
     {path: '/', component: MainPage},
     {path: '/hist/:id', name:'hist', component: Post, props: true}
	],
	mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
