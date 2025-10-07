<template>
  <div class="flex w-full bg-transparent h-20 items-center justify-between px-8">
    <!-- logo -->
    <router-link to="/"><div class="text-[24px] font-semibold">Finwise</div></router-link>
    <div class="flex space-x-5">
      <ServiceUseProgressbar :max-uses="auth.user.subscription.plan === 'PRO' ? 10 : 1" :remaining-uses="auth.remainingUses"></ServiceUseProgressbar>
      <button
        @click="openPaymentGateway"
        :class="[
          'cursor-pointer rounded-md px-4 py-1',
          auth.user.subscription.plan == 'PRO' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white',
        ]"
      >
        {{ auth.user.subscription.plan == 'PRO' ? 'PRO' : 'upgrade to PRO' }}
      </button>
      <button class="flex space-x-2 items-center cursor-pointer" @click="logout">
        <i class="pi pi-sign-out"></i><span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { apiCall } from '@/services/apiRequest'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import ServiceUseProgressbar from './ServiceUseProgressbar.vue'
const auth = useAuthStore()

async function openPaymentGateway() {
  if (auth.user.subscription.plan == 'PRO') {
    return
  }
  const data = await apiCall(
    '/subscription/create-checkout-session',
    {
      planId: 'price_1SEVqJCZvmF7A74PwhjUBFu7',
    },
    'POST',
  )
  window.location.href = data.url
}

console.log(auth.user)
const router = useRouter()

function logout() {
  const auth = useAuthStore()
  auth.logout()
  router.push('/login')
}
</script>
