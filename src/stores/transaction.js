import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import api from '@/services/axios'

export const useTransactionStore = defineStore('transaction', {
  persist: true,
  state: () => ({
    transactions: null,
  }),

  actions: {
    async fetchTransactions() {
      try {
        const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/transaction`)
        console.log(res)
        this.transactions = res.data
      } catch (err) {
        console.warn('Failed to fetch Transactions')
      }
    },
  },
})
