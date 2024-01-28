<template>
  <div>Nuxt module playground!</div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log(
    "Show me the module options : ",
    useRuntimeConfig().public.basicOptimizer
  );
});
</script>
