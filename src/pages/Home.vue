<template>
  <div class="h-screen flex flex-col bg-gray-200">
    <Header />

    <div class="p-4">
      <h2 class="font-bold">Transactions</h2>
      <!-- show loading, then data -->
      <div v-if="transactionStore.transactions">
        <pre>{{ transactionStore.transactions }}</pre>
      </div>
      <div v-else>Loading transactions...</div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const transactionStore = useTransactionStore()

onMounted(async () => {
  await transactionStore.fetchTransactions()
})
</script>
