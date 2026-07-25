<script setup lang="ts">
import router from '@/router';
import { useAppStore } from '@/stores/app';
import {  iconByMapName, iconByName, iconBySkillName, SkilsNames } from '@/utils/mockData';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

    
    const { heroes } = storeToRefs(useAppStore())
    const { setDataToLocalStorage } =  useAppStore()



    const hero = computed(() => heroes.value.find((f) => f.name === router.currentRoute.value.params.heroName))

    const toggleSkill = (skillName: SkilsNames) => {
        if(!hero.value) return
        console.log(hero.value)
        const sills = hero.value?.skills
        if(sills?.includes(skillName)) {
            hero.value.skills = hero.value.skills.filter((s) => s !== skillName)
        }else {
            hero.value.skills = [...hero.value.skills, skillName]
        }
        setDataToLocalStorage()
    }

    const data =computed(() => [
        {name:`Союзники для  ${hero.value?.name}`,value:hero?.value?.friendHeroes},
        {name:`${hero.value?.name} полезен для героев`,value:hero?.value?.addictedHeroes},
        {name:`${hero.value?.name} враг для героя`,value:hero?.value?.vulnerableHeroes},
        {name:`Враги для ${hero.value?.name}`,value:hero?.value?.enemyHeroes},
    ])


const baseClass= 'max-w-300px min-w-300px  h-fit flex flex-col flex items-center gap-2'
</script>
<template>
    <div>
    <div v-if="hero"  class="float-left rounded-8  max-w-78 gap-2 flex flex-col justify-between bg-blue-500/30 pb-6">
        
    <img class="w-78 h-78 rounded-t-8" :src="iconByName[hero.name]" alt=""  />
    <h1 class="text-xl text-center w-full border-b-3 border-gray-500">{{ hero.name }}</h1>
    <div class="flex grid grid-cols-4 gap-2 p-2 w-full">
          <BaseTooltip v-for="[skillName,icon] in Object.entries(iconBySkillName)" :key="skillName">
      <img class="border-3 w-18 border-gray-500 cursor-pointer" :class="{ 'border-orange-400': hero?.skills?.includes(skillName as SkilsNames) }" :src="icon" alt=""  @click="toggleSkill(skillName as SkilsNames)" />
      <template #content>
        {{ skillName }}
      </template>
    </BaseTooltip>
    </div>
    </div>
     <div class="flex flex-wrap justify-center items-center gap-2">
    <BaseTooltip v-for="[name,icon] in Object.entries(iconByMapName)" :key="name">
      <img class="border-3 border-gray-500 cursor-pointer" :src="icon" alt=""   />
      <template #content>
        {{ name }}
      </template>
    </BaseTooltip>
    

  </div>
    <div class="flex flex-wrap gap-4 p-4">
        <div v-for="item in data" class="baseClass bg-gray-600 rounded-8 p-6 px-6 w-fit gap-2 flex flex-col justify-between">
            <h1 class="text-center pb-2 font-600 text-lg">{{ item.name }}</h1>
            <div class="flex gap-3 flex-wrap">
                <div v-for="ally in item.value" class="flex flex-col items-center">
                    
                    <img class="w-18 h-18" :src="iconByName[ally]" alt=""  />
                    
                </div>
            </div>
        </div>
   
    </div>
    </div>
</template>