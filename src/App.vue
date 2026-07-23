<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<template>
  <div class="bg-red text-blue">1</div>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

