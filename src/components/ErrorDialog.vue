<template>
  <div
    v-if="useErrorDialog.visible"
    class="h-screen absolute bg-transparent w-full flex justify-center items-center z-500 cursor-pointer"
    @click.prevent="resetErrorDialog"
  >
    <div
      class="w-96 p-10 bg-white border-[1px] rounded-md border-red-600 justify-center items-center flex flex-col"
    >
      <div>{{ useErrorDialog.errorMessage }}</div>
      <div>
        <ul v-for="message in useErrorDialog.validationErrorMessages" :key="message">
          {{
            message
          }}
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useErrorDialogStore } from '@/stores/errorDialog'
import { ref } from 'vue'

const useErrorDialog = useErrorDialogStore()
function resetErrorDialog() {
  useErrorDialog.resetError()
}
</script>
