<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { iconByName, MapNames, type Hero } from '@/utils/mockData';
import Progress from '@/components/Progress.vue';
import { computed } from 'vue';

const props = defineProps<{
    hero:Hero,
    team:Hero[],
    bans:Hero[],
    selectedMap:MapNames,
    enemyTeam:Hero[],
    query?:string
    hideProgress?:boolean
    disableOpacity?:boolean
}>()

const isPickedClass = computed(() => {
    if(props.enemyTeam.find((f) => f.name === props.hero.name))
        return props.disableOpacity? 'shadow-xl shadow-red-700': 'shadow-xl shadow-red-700 !op-30'
    if(props.team.find((f) => f.name === props.hero.name))
        return props.disableOpacity? 'shadow-xl shadow-blue': 'shadow-xl shadow-blue !op-30' 
    if(props.bans.find((f) => f.name === props.hero.name)){
        return props.disableOpacity? 'shadow-xl shadow-yellow-800': 'shadow-xl shadow-yellow-800 !op-30'
    }
    return ''
})
const { getPickRate } = (useAppStore())
</script>
<template>
    
           <div class="w-18 h-18 group  rounded-full flex items-center justify-center relative bg-op-50  text-gray-300" :class="`${isPickedClass} ${query ? hero.name.toLowerCase().includes(query.toLowerCase()) ? 'op-100 animate-bounce' : 'op-50':''}`  " > 
            
            
            <Progress v-if="!hideProgress" size="92px" color="#0e4a35" class="absolute top--2.45 left--1.8" show-value :value="getPickRate(team,enemyTeam,hero,selectedMap)" :max="100" value-class="absolute right-7 bottom-8  bg-gray-400 rounded-full p-1 text-green-800 !font-500 op-40 group-hover:op-100 transition-all" />
            <Progress v-if="!hideProgress" size="82px" color="#6d131e" class="absolute top--1.3 left--1 rotate-180deg" show-value :value="getPickRate(enemyTeam,team,hero,selectedMap)" :max="100" value-class="absolute right-6 top-8 rotate-180 bg-gray-400 rounded-full p-1 text-red-800 !font-500 !z-1000 op-40 group-hover:op-100 transition-all" />
            
            
            
          <div class="rounded-full overflow-hidden"  v-if="iconByName[hero.name]">
            
            <img class="w-18 h-18" :src="iconByName[hero.name]" alt=""  />
        </div>
        
        <div v-else>{{ hero.name }}</div>
        
        </div>
</template>