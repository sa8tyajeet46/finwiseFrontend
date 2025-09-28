<template>
  <div class="flex w-full flex-col items-start space-y-1">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="p-1 w-full border-2 rounded-sm border-gray-400"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>
