import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/doc",
    name:'Doc',
    component:()=>import('@/views/Doc.vue')
  },
  {
    path:"/test",
    name:'test',
    component:()=>import('@/views/test.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
