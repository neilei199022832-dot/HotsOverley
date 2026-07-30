<script setup lang="ts">
import router from '@/router';
import { useAppStore } from '@/stores/app';
import BasePopover from '@/components/BasePopover.vue';
import {  iconByMapName, iconByName, iconBySkillName, MapNames, SkilsNames } from '@/utils/mockData';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

    
    const { heroes } = storeToRefs(useAppStore())
    const { setDataToLocalStorage,initHeroCalcData } =  useAppStore()



    const hero = computed(() => heroes.value.find((f) => f.name === router.currentRoute.value.params.heroName))

    const toggleSkill = (skillName: SkilsNames) => {
        if(!hero.value) return
        
        const sills = hero.value?.skills
        if(sills?.includes(skillName)) {
            hero.value.skills = hero.value.skills.filter((s) => s !== skillName)
        }else {
            hero.value.skills = [...hero.value.skills, skillName]
        }
        initHeroCalcData()
        setDataToLocalStorage()
    }

    const data =computed(() => [
        {name:`Союзники для  ${hero.value?.name}`,value:hero?.value?.friendHeroes},
        {name:`${hero.value?.name} полезен для героев`,value:hero?.value?.addictedHeroes},
        {name:`${hero.value?.name} враг для героя`,value:hero?.value?.vulnerableHeroes},
        {name:`Враги для ${hero.value?.name}`,value:hero?.value?.enemyHeroes},
    ])

const toggleGoodMap = (mapName: MapNames) => {
    if(!hero.value) return
     
    const goodMaps = hero.value?.goodMaps
    if(goodMaps?.includes(mapName)) {
        hero.value.goodMaps = hero.value.goodMaps?.filter((s) => s !== mapName)
    }else {
        hero.value.goodMaps = [...hero.value.goodMaps ?? [], mapName]
    }
    hero.value.badMaps = hero.value.badMaps?.filter((s) => s !== mapName)
    setDataToLocalStorage()
    initHeroCalcData()
}

const toggleBadMap = (mapName: MapNames) => {
    if(!hero.value) return
     
    const badMaps = hero.value?.badMaps
    if(badMaps?.includes(mapName)) {
        hero.value.badMaps = hero.value.badMaps?.filter((s) => s !== mapName)
    }else {
        hero.value.badMaps = [...hero.value.badMaps ?? [], mapName]
    }
    hero.value.goodMaps = hero.value.goodMaps?.filter((s) => s !== mapName)
    setDataToLocalStorage()
    initHeroCalcData()
}

</script>
<template>
    <div>
    <div v-if="hero"  class="float-left rounded-8  max-w-78 gap-2 flex flex-col justify-between bg-blue-500/30 pb-6">
        
    <img class="w-78 h-78 rounded-t-8" :src="iconByName[hero.name]" alt=""  />
    <h1 class="text-xl text-center w-full border-b-3 border-gray-500">{{ hero.name }}</h1>
    <div class="grid grid-cols-4 gap-2 p-1 w-full">
          <BasePopover type="tooltip" v-for="[skillName,icon] in Object.entries(iconBySkillName)" :key="skillName">
        <template #trigger>
        <img class="border-3 !min-w-12 border-gray-500 cursor-pointer" :class="{ 'border-orange-400': hero?.skills?.includes(skillName as SkilsNames) }" :src="icon" alt=""  @click="toggleSkill(skillName as SkilsNames)" />
      </template>
      <template #content>
        {{ skillName }}
      </template>
    </BasePopover>
    </div>
    </div>
     <div class="flex flex-wrap justify-center items-center gap-2">
    <BasePopover type="tooltip" v-for="[name,icon] in Object.entries(iconByMapName)" :key="name">
        <template #trigger>
      <img @click.left="toggleGoodMap(name as MapNames)" @click.right="toggleBadMap(name as MapNames)" @contextmenu.prevent class="border-2 rounded-2 border-gray-500 cursor-pointer w-28" :src="icon" alt="" :class="{
        'border-red-600 shadow-lg  shadow-red-500': hero?.badMaps?.includes(name as MapNames),
        'border-green-700 shadow-lg shadow-green-600': hero?.goodMaps?.includes(name as MapNames)
      }"   />
      </template>
      <template #content>
        {{ name }}
      </template>
    </BasePopover>
    

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