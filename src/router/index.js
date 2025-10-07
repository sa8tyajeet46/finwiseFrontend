import AuthCallback from '@/pages/AuthCallback.vue'
import Dashboard from '@/pages/Dashboard.vue'
import GenerateTaxAdvice from '@/pages/generateTaxAdvice.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import SubscriptionSuccess from '@/pages/SubscriptionSuccess.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/auth/callback', component: AuthCallback },
    { path: '/subscription/success', component: SubscriptionSuccess },
    { path: '/generate/taxadvice', component: GenerateTaxAdvice },
  ],
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated && to.path !== '/login' && to.path !== '/auth/callback') {
    // redirect the user to the login page
    return { path: '/login' }
  }
})

export default router
