<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="close"></div>

      <!-- Dialog Box -->
      <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 z-10">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <!-- Content slot -->
        <div>
          <slot></slot>
        </div>

        <!-- Footer (slot or default buttons) -->
        <div class="flex justify-end gap-2 mt-6">
          <slot name="footer">
            <button
              class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              @click="close"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              @click="$emit('confirm')"
            >
              Confirm
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: 'Dialog' },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

function close() {
  emit('update:modelValue', false)
}
</script>
