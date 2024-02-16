<template>
  <div>Page Number : {{ page }}</div>
</template>

<script setup>
import { ref, useRoute } from "#imports";

const page = ref(useRoute().params.page);
</script>
