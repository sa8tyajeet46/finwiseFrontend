<template>
  <div class="flex w-full bg-transparent h-20 items-center justify-between px-8">
    <!-- logo -->
    <router-link to="/"><div class="text-[24px] font-semibold">Finwise</div></router-link>
    <div>
      <button class="flex space-x-2 items-center cursor-pointer" @click="logout">
        <i class="pi pi-sign-out"></i><span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  const auth = useAuthStore()
  auth.logout()
  router.push('/login')
}
</script>
