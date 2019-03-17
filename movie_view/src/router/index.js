import Vue from 'vue'
import Router from 'vue-router'
import VueResourse from 'vue-resource'

import IndexPage from '../pages/index.vue'
import movieList from '../pages/movieList.vue'
import movieDetail from '../pages/movieDetail'
import NewsDetail from '../pages/newsDetail'
import Login from '../pages/login'
import Regist from '../pages/regist'

import robotTest from '../components/robottest'
Vue.use(VueResourse)

Vue.use(Router)
// const routes = [{
//   path: '/',
//   component: resolve => require(IndexPage, resolve),
//   meta: {
//     title: 'home'
//   }
// }]
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage
    },
    {
      path: '/movieList',
      name: 'movieList',
      component: movieList
    },
    {
      path: '/robottest',
      component: robotTest
    },
    {
      path: '/movieDetail',
      component: movieDetail
    },
    {
      path: '/newsDetail',
      component: NewsDetail
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/regist',
      component: Regist
    }
  ]
})
