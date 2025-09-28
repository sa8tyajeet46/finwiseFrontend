<!-- views/AuthCallback.vue -->
<template>
  <div>Signing you in...</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // ✅ import the store

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

onMounted(async () => {
  if (route.query.token) {
    await auth.login(route.query.token)
    router.push('/') // ✅ redirect after login
  } else {
    // no token found, send user back to login
    router.push('/login')
  }
})
</script>
