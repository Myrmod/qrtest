import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import { useAuth } from '@/modules/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () => import('@/pages/QRCode.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const { user } = useAuth()

  if (to.meta.requiresAuth === true && !user?.value) {
    next({ name: 'login' })
  } else if (to.name === 'login' && user?.value) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
