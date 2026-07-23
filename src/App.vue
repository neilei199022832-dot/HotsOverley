<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <div class="ui-viewport">
    <div id="ui-canvas" class="ui-canvas">
      <AppLayout>
        <RouterView />
      </AppLayout>
    </div>
  </div>
</template>
