import Vue from 'vue'
import VueRouter from 'vue-router'
import MyLogin from '@/views/login/MyLogin'
import MyLayout from '@/views/layout/MyLayout'
import MyHome from '@/views/home/MyHome' // 首页
import MyAnswer from '@/views/answer/MyAnswer' // 问答
import MyVideo from '@/views/video/MyVideo' // 视频
import MyMine from '@/views/mine/MyMine' // 我的
import MySearch from '@/views/search/MySearch' // 搜索
import MyArticleDetail from '@/views/article/MyArticleDetail' // 文章详情页
Vue.use(VueRouter)

// 路由表
const routes = [

  {
    path: '/',
    component: MyLayout,
    redirect: 'home',
    children: [
      { path: 'home', component: MyHome },
      { path: 'answer', component: MyAnswer },
      { path: 'video', component: MyVideo },
      { path: 'mine', component: MyMine }
    ]
  },
  { path: '/login', component: MyLogin },
  { path: '/search', component: MySearch },
  { path: '/article/:articleId', component: MyArticleDetail }
]

const router = new VueRouter({
  routes
})

export default router
