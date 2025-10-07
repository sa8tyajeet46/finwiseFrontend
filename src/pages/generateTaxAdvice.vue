<template>
    <Header></Header>
<div v-if="taxAdviceStore.loading">Loading advice...</div>
      <div class="w-full flex flex-wrap gap-5" v-else>
       {{ taxAdviceStore.advice }}
      </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { useTaxAdviceStore } from "@/stores/advice"
import {onMounted} from "vue"

const taxAdviceStore=useTaxAdviceStore();

onMounted(() => {
  taxAdviceStore.fetchTaxAdvice();
})
</script>