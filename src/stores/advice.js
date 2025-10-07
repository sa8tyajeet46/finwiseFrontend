import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import api from '@/services/axios'
import { apiCall } from '@/services/apiRequest'

export const useTaxAdviceStore = defineStore('advice', {
  // persist: true,
  state: () => ({
    advice: null,
    loading: false,
  }),

  actions: {
    async fetchTaxAdvice() {
    const auth = useAuthStore()
      this.loading = true
      try {
        const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/transaction/getTaxAdvice`)
        this.advice = res.data.aiAdvice;
        await auth.fetchUser();
        this.loading = false
      } catch (err) {
        console.warn('Failed to fetch Transactions')
      }
    },
   
  },
})
