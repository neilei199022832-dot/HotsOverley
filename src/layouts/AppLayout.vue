<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import {shallowRef, watchEffect} from "vue";
  import AppLayoutLogin from "@/layouts/AppLayoutLogin.vue";
  import {AppLayoutsEnum} from "@/layouts/layouts.types";
  import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
  const route = useRoute()
  const component = shallowRef(AppLayoutLogin)

  watchEffect(async () => {
    if (route.meta.layout === AppLayoutsEnum.auth) {
      component.value = AppLayoutLogin
      return
    }


    component.value = AppLayoutDefault
  })
</script>

<template>
  <component :is="component">
    <slot />
  </component>
</template>
