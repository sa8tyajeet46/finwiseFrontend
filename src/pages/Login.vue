<template>
  <div class="h-screen flex flex-col bg-gray-200 justify-center items-center">
    <div class="w-96 py-4 px-2 rounded-md flex flex-col items-center shadow-lg space-y-3">
      <div class="w-full flex justify-between items-center">
        <button
          class="w-1/2 flex justify-center items-center cursor-pointer"
          :class="{ 'bg-blue-500 text-white': isLogin, 'bg-gray-200 text-black': !isLogin }"
          @click="alterLogin(true)"
        >
          login
        </button>
        <button
          class="w-1/2 flex justify-center items-center cursor-pointer"
          :class="{ 'bg-blue-500 text-white': !isLogin, 'bg-gray-200 text-black': isLogin }"
          @click="alterLogin(false)"
        >
          signup
        </button>
      </div>
      <form
        @submit.prevent="isLogin ? signInWithCredentials() : signUpWithCredentials()"
        class="w-full flex flex-col items-center space-y-3"
      >
        <router-link to="/"><div class="text-[24px] font-semibold">Finwise</div></router-link>
        <Input
          v-if="!isLogin"
          id="name"
          label="Name"
          v-model="name"
          type="text"
          placeholder="Enter Name"
        />
        <Input id="email" label="Email" v-model="email" placeholder="Enter registered Email id" />
        <Input
          id="password"
          label="Password"
          v-model="password"
          type="password"
          placeholder="Enter Password"
        />
        <button type="submit" class="bg-blue-600 text-white px-2 py-1 rounded-md cursor-pointer">
          {{ isLogin ? 'Login' : 'Signup' }}
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
import { apiCall } from '@/services/apiRequest'
import { useAuthStore } from '@/stores/auth'
import { useErrorDialogStore } from '@/stores/errorDialog'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const name = ref('')
let isLogin = ref(true)
const router = useRouter()

const authStore = useAuthStore()
function alterLogin(value) {
  isLogin.value = value
}
async function signInWithCredentials() {
  const data = await apiCall('/user/signin', {
    email: email.value,
    password: password.value,
  })
  await authStore.login(data.token)
  router.push('/')
}

async function signUpWithCredentials() {
  const data = await apiCall('/user/signup', {
    email: email.value,
    password: password.value,
    name: name.value,
  })
  await authStore.login(data.token)
  router.push('/')
}
function signInWithGoole() {
  const backend_url = import.meta.env.VITE_BACKEND_URL
  window.location.href = `${backend_url}/user/google`
}
</script>
