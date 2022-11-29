import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/Layout.vue'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { affix: true, icon: 'el-icon-data-board' }
      },
      {
        path: '/icon',
        name: 'Icon',
        component: () => import('@/views/Icon.vue'),
        meta: { icon: 'el-icon-watermelon' }
      },
      {
        path: '/amap',
        name: 'AMap',
        component: () => import('@/views/AMap.vue'),
        meta: { icon: 'el-icon-map-location' }
      },
      {
        path: '/video',
        name: 'AMap',
        component: () => import('@/views/Video.vue'),
        meta: { icon: '' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue'),
  },
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
