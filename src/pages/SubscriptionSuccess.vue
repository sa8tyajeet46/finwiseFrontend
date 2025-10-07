<template>
 success
</template>

<script setup>

import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'


const authStore = useAuthStore();



// ✅ Only fetch once
onMounted(() => {
  authStore.fetchUser()
})

</script>