import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '../tools/utils'
import routerConfig from './vouter.config'

Vue.use(VueRouter)

const routes = routerConfig

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果没有Token，并且不是登录页，就跳转到登录页
  if (to.meta.isNeedToken && !utils.getToken() && to.name !== 'Login') {
    next({path: '/'})
  }
  next()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
