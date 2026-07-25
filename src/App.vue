<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import { useAppStore } from './stores/app';

const {removeLocalStorage,setDataFromClickBoard,copyData} = useAppStore()
</script>

<template>
  <div class="ui-viewport">
    <div class="flex flex-col gap-1 w-50 p-2">
      <Button @click="copyData()" class="self-start w-full !bg-gray-500 !border-0 ">Скопировать конфиг</Button>
      <Button @click="setDataFromClickBoard()"  class="self-start w-full !bg-gray-500 !border-0">Вставить конфиг</Button>
      <Button @click="removeLocalStorage()" class="self-start w-full !bg-gray-500 !border-0">Удалить конфиг</Button>
    </div>
    <div id="ui-canvas" class="ui-canvas">
      <AppLayout>
        <RouterView />
      </AppLayout>
    </div>
  </div>
</template>
