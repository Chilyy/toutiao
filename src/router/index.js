import Vue from 'vue'
import VueRouter from 'vue-router'

// import MyLogin from '@/views/login/MyLogin'
// import MyLayout from '@/views/layout/MyLayout'
// import MyHome from '@/views/home/MyHome' // 首页
// import MyAnswer from '@/views/answer/MyAnswer' // 问答
// import MyVideo from '@/views/video/MyVideo' // 视频
// import MyMine from '@/views/mine/MyMine' // 我的
// import MySearch from '@/views/search/MySearch' // 搜索
// import MyArticleDetail from '@/views/article/MyArticleDetail' // 文章详情页
// import UserInfo from '@/views/userinfo/UserInfo' // 编辑个人信息
// import ChatAi from '@/views/chat/ChatAi' // 小珠同学
Vue.use(VueRouter)

// 路由表
const routes = [

  {
    path: '/',
    component: () => import(/* webpackChunkName: "MyLayout" */ '@/views/layout/MyLayout'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "MyHome" */ '@/views/home/MyHome'),
        meta: {
          scrollT: 0
        }
      },
      { path: 'answer', component: () => import(/* webpackChunkName: "MyAnswer" */ '@/views/answer/MyAnswer') },
      { path: 'video', component: () => import(/* webpackChunkName: "MyVideo" */ '@/views/video/MyVideo') },
      { path: 'mine', component: () => import(/* webpackChunkName: "MyMine" */ '@/views/mine/MyMine') }
    ]
  },
  { path: '/login', component: () => import(/* webpackChunkName: "MyLogin" */ '@/views/login/MyLogin') },
  { path: '/search', component: () => import(/* webpackChunkName: "MySearch" */ '@/views/search/MySearch') },
  { path: '/article/:articleId', component: () => import(/* webpackChunkName: "MyArticleDetail" */ '@/views/article/MyArticleDetail'), props: true },
  { path: '/info', component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/userinfo/UserInfo') },
  { path: '/chat', component: () => import(/* webpackChunkName: "ChatAi" */ '@/views/chat/ChatAi') }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next(false)
//   } else {
//     next() // 其他情况通通放行
//   }
// })
export default router
