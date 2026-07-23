<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { allHeroes, HeroNames, iconByName, MapNames, type Hero } from '@/utils/mockData';
import Progress from '@/components/Progress.vue';
import BaseTooltip from '@/components/BaseTooltip.vue';
import BaseHeroIcon from '@/components/BaseHeroIcon.vue';
import HeroTooltipInfo from './HeroTooltipInfo.vue';

defineProps<{
  selectedMap:MapNames,
}>()

const turn = defineModel<1 | 2 | 3>('turn', { default: 1 })
const team = defineModel<Hero[]>('team', { default: [] })
const bans = defineModel<Hero[]>('bans', { default: [] })

const enemyTeam = defineModel<Hero[]>('enemyTeam', { default: [] })
const { getPickRate } = (useAppStore())

const getHeroByName = (name: HeroNames) => 
  allHeroes.find((h) => h.name === name)!
</script>
<template>
  <div class="text-xl shrink-0">{{ turn === 1 ? 'Ваш ход' : turn === 2 ? 'Ход бана' : 'Ход врага' }}</div>
        <div class="flex w-full items-center justify-center p-4 shrink-0">
    <dvi class="flex flex-col items-center justify-center w-full h-50  hover:bg-blue-300/60 transition-all" :class="{
     'bg-blue-300/70': turn === 1,
      'bg-blue-300/40': turn !== 1
    }" @click="turn = 1">
      <h1 >Ваша команда </h1>
      <div class="pb-12">{{ team.reduce((acc, item) => acc + getPickRate(team,enemyTeam,item,selectedMap), 0) }}</div>


      <div class="flex gap-15 w-full justify-between px-10">
        <BaseTooltip v-for="hero in team" :key="hero.name" >
          <BaseHeroIcon
          :bans="bans" :hero="hero" 
          :team="team" 
          :enemyTeam="enemyTeam"  
          :selected-map="selectedMap"
          @click.stop="team = team.filter((t) => t.name !== hero.name)" :disable-opacity="true"> 
            <Progress size="82px" color="#0e4a35" class="absolute top--1.3 left--1 rotate-180deg" :value="getPickRate(team,enemyTeam,hero,selectedMap)" :max="100" />
          </BaseHeroIcon>
          <template #content> 
            <HeroTooltipInfo :hero="hero" :team="team" :bans="bans" :selectedMap="selectedMap" :enemyTeam="enemyTeam"/>
          </template>
        </BaseTooltip>

      </div>
    </dvi>
    <div class="flex flex-col items-center justify-center w-full h-50 bg-red-300/50 hover:bg-red-300/70 transition-all" :class="{
          'rgb(193 0 7)': turn !== 2,
          'bg-red-300/50': turn === 2
        }" @click="turn = 2">
      <h1>Команда врага </h1>
      <div  class="pb-12">{{ enemyTeam.reduce((acc, item) => acc + getPickRate(enemyTeam,team,item,selectedMap), 0) }}</div>





      
          <div class="flex gap-5 w-full justify-between px-10">
            <BaseTooltip v-for="hero in enemyTeam" :key="hero.name">
              <BaseHeroIcon 
              :bans="bans" 
              :hero="hero" 
              :team="team" 
              :enemyTeam="enemyTeam"  
              :selected-map="selectedMap"
              @click.stop="enemyTeam = enemyTeam.filter((t) => t.name !== hero.name)" :disable-opacity="true">
                <Progress size="82px" color="#6d131e" class="absolute top--1.3 left--1 rotate-180deg" :value="getPickRate(enemyTeam,team,hero,selectedMap)" :max="100" />            
              </BaseHeroIcon>
               <template #content>
                <HeroTooltipInfo :hero="hero" :team="team" :bans="bans" :selectedMap="selectedMap" :enemyTeam="enemyTeam"/>
               </template>
            </BaseTooltip>
            

      </div>
  
    </div>

       <dvi class="flex flex-col items-center justify-center w-full h-50  hover:bg-brown-300/60 transition-all" :class="{
      'bg-yellow-300/70': turn === 3,
      'bg-yellow-300/40': turn !== 3
    }" @click="turn = 3">
      <h1  class="pb-14">Бан </h1>


      <div class="flex gap-5 w-full justify-between px-10">
         
                  <div v-for="hero in bans" class="w-18 h-18  rounded-full flex items-center justify-center relative bg-op-50  text-gray-300"  @click.stop="
                bans = bans.filter((t) => t.name !== hero.name)"> 
            
            
            
            
            
          <div class="rounded-full overflow-hidden"  v-if="iconByName[hero.name]">
            
            <img class="w-18 h-18" :src="iconByName[hero.name]" alt=""  />
        </div>
        <div v-else>{{ hero.name }}</div>

        </div>

      </div>
    </dvi>
  </div>
</template>