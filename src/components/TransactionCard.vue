<template>
  <div
    class="bg-white shadow-md rounded-xl p-4 mb-3 border flex justify-between items-center hover:shadow-lg transition"
  >
    <!-- Left side: category & note -->
    <div>
      <h3 class="font-semibold text-lg capitalize text-gray-800">
        {{ transaction.category }}
      </h3>
      <p class="text-gray-500 text-sm italic">{{ transaction.note }}</p>
      <p class="text-gray-400 text-xs mt-1">
        {{ formatDate(transaction.date) }}
      </p>
      <div class=" flex space-x-3">
        <button @click="isDeleteDialogOpen = true"><i class="pi pi-trash cursor-pointer"></i></button>
        <button @click="isEditDialogOpen = true"><i class="pi pi-pencil cursor-pointer"></i></button>
      </div>
    </div>

    <!-- Right side: amount & type -->
    <div class="text-right">
      <p
        :class="[
          'font-bold text-lg',
          transaction.type === 'EXPENSE' ? 'text-red-500' : 'text-green-600',
        ]"
      >
        {{ transaction.type === 'EXPENSE' ? '-' : '+' }}₹{{ transaction.amount }}
      </p>
      <p class="text-xs text-gray-400">{{ transaction.source }}</p>
    </div>
    <DialogWrapper
      v-model="isDeleteDialogOpen"
      title="Delete Transaction"
      @confirm="deleteTransaction"
    >
    <div>Are you sure you want to delete the transaction?</div>
    <template #footer>
        <button
          class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          @click="isDeleteDialogOpen = false"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          @click="deleteTransaction"
        >
          Confirm
        </button>
      </template>
  </DialogWrapper>

  <DialogWrapper
      v-model="isEditDialogOpen"
      title="Edit Transaction"
      @confirm="editTransaction"
    >
    <form class="space-y-4">
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
    <template #footer>
        <button
          class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          @click="isEditDialogOpen = false"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          @click="editTransaction"
        >
          Confirm
        </button>
      </template>
  </DialogWrapper>
  </div>
</template>

<script setup>
import { defineProps,ref } from 'vue'
import DialogWrapper from './DialogWrapper.vue';
import { useTransactionStore } from '@/stores/transaction';
import Datepicker from 'vue3-datepicker'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const transactionStore = useTransactionStore()
let isDeleteDialogOpen=ref(false);
let isEditDialogOpen=ref(false);

const form = ref({
  amount: props.transaction.amount,
  category: props.transaction.category,
  note: props.transaction.note,
  type: props.transaction.type,
  date:new Date(props.transaction.date)
});

async function deleteTransaction(){
   await transactionStore.deleteTransaction(props.transaction._id);
   isDeleteDialogOpen.value=false;
}

async function editTransaction(){
   await transactionStore.editTransaction(form.value.amount,form.value.type,form.value.category,form.value.note,props.transaction._id,form.value.date);
   isEditDialogOpen.value=false;
}



function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
