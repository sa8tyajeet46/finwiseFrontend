import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    isAuthenticated: false,
    token: localStorage.getItem('token') || '',
    user: null,
  }),

  actions: {
    async login(token) {
      localStorage.setItem('token', token)
      this.token = token
      this.isAuthenticated = true
      await this.fetchUser()
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.user = res.data
        this.isAuthenticated = true
      } catch (err) {
        console.error('Token invalid or expired', err)
        this.logout()
      }
    },

    async validateToken() {
      if (!this.token) return false
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/validate`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        this.isAuthenticated = true
        return true
      } catch (err) {
        this.logout()
        return false
      }
    },

    logout() {
      localStorage.removeItem('token')
      this.token = ''
      this.isAuthenticated = false
      this.user = null
      window.location.href = '/login'
    },
  },
})
