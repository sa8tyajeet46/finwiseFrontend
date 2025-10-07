<template>
  <div class="usage-bar">
    <p>
      {{ remainingUses }} of {{ maxUses }} AI advice left this month
    </p>

    <div class="progress-bar">
      <div
        class="progress-fill"
        :style="{ width: `${(remainingUses / maxUses) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  maxUses: {
    type: Number,
    required: true
  },
  remainingUses: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.usage-bar {
  width: 100%;
  margin-top: 1rem;
}
.progress-bar {
  height: 8px;
  background: #ddd;
  border-radius: 10px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}
</style>
