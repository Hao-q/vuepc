import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录页面路由
  {
    path: '/login',
    name: 'login',
    component: () =>
      import ('@/views/login')
  },
  // 首页路由
  {
    path: '/home',
    name: 'home',
    component: () =>
      import ('@/views/home'),
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      name: 'welcome',
      component: () =>
        import ('@/views/welcome')
    }]
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 强制用户登录
  var usermessage = window.sessionStorage.getItem('usermessage')
  if (!usermessage && to.path !== '/login') {
    // 实现路由跳转
    return router.push('/login')
  }
  next()
})
export default router