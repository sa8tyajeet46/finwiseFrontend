<template>
  <div class="h-screen flex flex-col bg-gray-200 justify-center items-center">
    <div class="w-96 py-4 px-2 rounded-md flex flex-col items-center shadow-lg space-y-3">
      <form
        @submit.prevent="signInWithCredentials"
        class="w-full flex flex-col items-center space-y-3"
      >
        <router-link to="/"><div class="text-[24px] font-semibold">Finwise</div></router-link>

        <Input id="email" label="Email" v-model="email" placeholder="Enter registered Email id" />
        <Input
          id="password"
          label="Password"
          v-model="password"
          type="password"
          placeholder="Enter Password"
        />

        <button type="submit" class="bg-blue-600 text-white px-2 py-1 rounded-md cursor-pointer">
          Login
        </button>
      </form>

      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
        <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-gray-200 left-1/2"
          >or</span
        >
      </div>
      <button class="flex space-x-2 px-3 py-1 items-center cursor-pointer" @click="signInWithGoole">
        <i class="pi pi-google"></i><span>Sign in with Google</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import Input from '@/components/Input.vue'
import { useAuthStore } from '@/stores/auth'
import { useErrorDialogStore } from '@/stores/errorDialog'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()
const useErrorDialog = useErrorDialogStore()
const authStore = useAuthStore()
async function signInWithCredentials() {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, {
      email: email.value,
      password: password.value,
    })
    await authStore.login(res.data.token)
    router.push('/')
  } catch (err) {
    const errorResponse = err?.response?.data
    if (errorResponse?.errors) {
      useErrorDialog.setValidationError(errorResponse?.errors || [])
    }
    useErrorDialog.setError(
      errorResponse?.message || errorResponse?.error || 'Internal server error',
    )
  }
}
function signInWithGoole() {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  window.location.href = `${backend_url}/user/google`
}
</script>
