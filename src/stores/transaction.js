import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import api from '@/services/axios'
import { apiCall } from '@/services/apiRequest'

export const useTransactionStore = defineStore('transaction', {
  // persist: true,
  state: () => ({
    transactions: [],
    loading: false,
  }),

  actions: {
    async fetchTransactions() {
      this.loading = true
      try {
        const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/transaction`)
        console.log(res.data.transactions)
        this.transactions = res.data.transactions
        this.loading = false
      } catch (err) {
        console.warn('Failed to fetch Transactions')
      }
    },
    async addTransaction(amount, type, category, note, date) {
      const data = await apiCall('/transaction', {
        amount: amount,
        type: type,
        category: category,
        note: note,
        date: date,
      })
      this.transactions.push(data.transaction)
    },
    async deleteTransaction(id) {
      const data = await apiCall(`/transaction/${id}`, {}, 'delete')
      this.transactions = this.transactions.filter((transaction) => transaction._id != id)
    },
    async editTransaction(amount, type, category, note, id, date) {
      const data = await apiCall(
        '/transaction',
        {
          id: id,
          amount: amount,
          type: type,
          category: category,
          note: note,
          date: date,
        },
        'patch',
      )
      const index = this.transactions.findIndex((obj) => obj._id == id)

      console.log(index, 'index found')
      console.log(data, 'transaction to be updated')

      if (index !== -1) {
        this.transactions[index] = data.transaction // Merge existing object with updates
      }
    },
  },
})
