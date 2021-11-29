import { createRouter, createWebHistory } from 'vue-router'
import NewMessage from '../views/NewMessage.vue'
import History from '../views/History.vue'

const routes = [
  {
    path: '/',
    name: 'NewMessage',
    component: NewMessage
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
