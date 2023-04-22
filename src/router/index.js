import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/views/login/MyLogin'
Vue.use(VueRouter)

// 路由表
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: MyLogin }
]

const router = new VueRouter({
  routes
})

export default router
