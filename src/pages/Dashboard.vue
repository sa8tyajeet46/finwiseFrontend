<template>{{ auth?.user?.email }}</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const token = localStorage.getItem('token')
</script>
