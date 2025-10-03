<template>
  <div class="h-screen flex flex-col bg-gray-200">
    <Header />

    <div class="p-4">
      <!-- Header -->
      <div class="w-full flex justify-between py-4">
        <h2 class="font-bold">Transactions</h2>
        <button
          class="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          @click="openDialog"
        >
          Add Transaction
        </button>
      </div>

      <!-- Dialog -->
      <DialogWrapper
        v-model="showDialog"
        title="Add Transaction"
        @confirm="saveTransaction"
      >
        <form class="space-y-4" @submit.prevent="saveTransaction">
          <div>
            <label class="block text-sm font-medium text-gray-700">Amount</label>
            <input
              v-model="form.amount"
              type="number"
              class="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
      <label class="block text-sm font-medium text-gray-700">Date</label>
      <Datepicker
        v-model="form.date"
        :enable-time-picker="false"
        class="w-full mt-1"
      />
    </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <input
              v-model="form.category"
              type="text"
              class="w-full mt-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Note</label>
            <textarea
              v-model="form.note"
              class="w-full mt-1 px-3 py-2 border rounded-lg"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select
              v-model="form.type"
              class="w-full mt-1 px-3 py-2 border rounded-lg"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>
           
        </form>

        <!-- Footer slot -->
        <template #footer>
          <button
            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            @click="closeDialog"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            @click="saveTransaction"
          >
            Save
          </button>
        </template>
      </DialogWrapper>

      <!-- Transactions list -->
      <div v-if="transactionStore.loading">Loading transactions...</div>
      <div
        class="w-full flex flex-wrap gap-5"
        v-else-if="transactionStore.transactions.length"
      >
        <TransactionCard
          v-for="transaction in transactionStore.transactions"
          :key="transaction._id"
          :transaction="transaction"
        />
      </div>
      <div v-else>No transactions found</div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { onMounted, ref } from 'vue'
import Datepicker from 'vue3-datepicker'
import { useTransactionStore } from '@/stores/transaction'
import TransactionCard from '@/components/TransactionCard.vue'
import DialogWrapper from '@/components/DialogWrapper.vue'

const transactionStore = useTransactionStore()

const showDialog = ref(false)

const form = ref({
  amount: '',
  category: '',
  note: '',
  type: 'EXPENSE',
  date: new Date()
})

// ✅ Only fetch once
onMounted(() => {
  transactionStore.fetchTransactions()
})

function openDialog() {
  showDialog.value = true
}

function closeDialog() {
  showDialog.value = false
}

async function saveTransaction() {
  await transactionStore.addTransaction(
    form.value.amount,
    form.value.type,
    form.value.category,
    form.value.note,
    form.value.date
  )

  // Close and reset
  closeDialog()
  form.value = { amount: '', category: '', note: '', type: 'EXPENSE', date:new Date() }
}
</script>
