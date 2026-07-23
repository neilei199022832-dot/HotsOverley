<script lang="ts" setup>
import { allHeroes, HeroNames, iconByMapName, iconByName, MapNames, roles, type Hero } from '@/utils/mockData';
import { group, unique } from 'radash';
import { ref } from 'vue';
import { Sword,Shield,Handshake   } from 'lucide-vue-next';
import BaseTooltip from '@/components/BaseTooltip.vue';
import BaseFormInput from '@/components/baseComponents/BaseFormInput.vue';
import { useField, useForm } from 'vee-validate';
import { useAppStore } from '@/stores/app';
import { storeToRefs } from 'pinia';
import HeroPool from '@/components/HeroPool.vue';
import Progress from '@/components/Progress.vue';
import BaseHeroIcon from '@/components/BaseHeroIcon.vue';
import BaseScroll from '@/components/BaseScroll.vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import HeroTooltipInfo from '@/components/HeroTooltipInfo.vue';

const team = ref<Hero[]>([])
const bans = ref<Hero[]>([])
const selectedMap = ref<MapNames>(MapNames.AlteracPass)
const enemyTeam = ref<Hero[]>([])
const turn = ref<1 | 2 | 3>(1)

useForm()
const {value} = useField<string | undefined>('query')


const { heroes } = storeToRefs(useAppStore())
const { getPickRate } = (useAppStore())

const onSelectHero = (hero: Hero) => {
  if (turn.value === 1) {
    team.value.push(hero)
  } else if (turn.value === 2) {
    enemyTeam.value.push(hero)
  }else {
    bans.value.push(hero)
  }
  value.value = undefined
}

const getHeroByName = (name: HeroNames) => 
  allHeroes.find((h) => h.name === name)!

const onSelect = (hero: Hero) => {
  
}

// const isSupportAvailable = (hero: Hero) => {
//   if(!yourTurn.value) return true
//   return team.value.filter((h) => h.role === roles.Support).length < 1
// }

// const isFighterAvailable = (hero: Hero) => {
//   if(!yourTurn.value) return true
//   if(team.value.length < 4) return true
  
//   return !isHealerAvailable(hero) && !isTankAvailable(hero)
// }

// const isMeleeAvailable = (hero: Hero) => {
//     if(!yourTurn.value) return true
//   if(team.value.length < 4) return true
  
//   return !isHealerAvailable(hero) && !isTankAvailable(hero)
// }

// const isRangeAvailable = (hero: Hero) => {
//     if(!yourTurn.value) return true
//   if(team.value.length < 4) return true
  
//   return !isHealerAvailable(hero) && !isTankAvailable(hero)
// }

const { enter, shift_q, shift_w, shift_r } = useMagicKeys()

whenever(() =>enter.value, () => enterHandler())

whenever(() => shift_q.value, () => turn.value = 1)
whenever(() => shift_w.value, () => turn.value = 2)
whenever(() => shift_r.value, () => turn.value = 3)

const enterHandler =() => {
  console.log(value.value)
  if(!value.value) return

  const hero = allHeroes.find((h) => h.name.toLowerCase().includes(value.value!.toLowerCase()))
  if(hero){ onSelectHero(hero)}

  
}

const isSupportAvailable = () => turn.value === 1 ? team.value.filter((h) => h.role === roles.Support).length < 1: turn.value === 2 ? enemyTeam.value.filter((h) => h.role === roles.Support).length < 1 : true
const isHealerAvailable = () => turn.value === 1 ? team.value.filter((h) => h.role === roles.Healer).length < 1: turn.value === 2 ? enemyTeam.value.filter((h) => h.role === roles.Healer).length < 1 : true
const isTankAvailable = () => turn.value === 1 ? team.value.filter((h) => h.role === roles.Tank).length < 1: turn.value === 2 ? enemyTeam.value.filter((h) => h.role === roles.Tank).length < 1 : true

</script>
<template>
  
  <div class="shrink-0 w-full">
    <BaseFormInput name="query"/>
  </div>
  <div class="flex gap-0 shrink-0">
    <BaseTooltip v-for="[mapName,icon] in Object.entries(iconByMapName)" :key="mapName">
      <img class="border-3 border-gray-500 cursor-pointer" :class="{ 'border-orange-400': selectedMap === mapName }" :src="icon" alt=""  @click="selectedMap = mapName as MapNames" />
      <template #content>
        {{ mapName }}
      </template>
    </BaseTooltip>
    

  </div>
  <HeroPool v-model:team="team" v-model:enemyTeam="enemyTeam" v-model:turn="turn" v-model:bans="bans" :selected-map="selectedMap" />
  <div class="w-full flex-1 min-h-0 flex p-2 py-0 flex-col gap-2">

    
    <!-- <div> -->
      <div class="flex flex-row gap-2 overflow-x-auto max-w-full h-full min-h-0">
        <div v-for="(category,index) in group(heroes, h => h.role)" :key="index" class="min-w-[420px] flex-1 rounded-3xl bg-gray-700/80 pr-3 pb-5 max-h-full h-full min-h-0 flex flex-col tansition-all duration-500 ease-in-out"
        :class="{'pointer-events-none op-30': category![0].role === roles.Support && !isSupportAvailable() || category![0].role === roles.Tank && !isTankAvailable() || category![0].role === roles.Healer && !isHealerAvailable()}"
        >
          <div class="text-12 font-500 pl-5 shrink-0">{{ category![0].role }}</div>
          <BaseScroll height="100%">
          
          
        <div class="flex flex-wrap gap-7 w-full items-center justify-center relative pt-4"
        >
        <div v-for="hero in category?.sort((a,b) => {
          if (turn === 1) {
            return getPickRate(team,enemyTeam,b,selectedMap) - getPickRate(team,enemyTeam,a,selectedMap)
          }else if (turn === 2) {
            return getPickRate(enemyTeam,team,b,selectedMap) - getPickRate(enemyTeam,team,a,selectedMap)
          }
          return 0
        })
      

        " @click="!team.includes(hero) && !enemyTeam.includes(hero) &&  onSelectHero(hero)">
            <BaseTooltip>
              <BaseHeroIcon :hero="hero" :team="team" :enemyTeam="enemyTeam" :bans="bans" :query="value" :selected-map="selectedMap"/>
         
        <template #content>
        <HeroTooltipInfo :hero="hero" :team="team" :bans="bans" :selectedMap="selectedMap" :enemyTeam="enemyTeam"/>
        </template>
        </BaseTooltip>
        </div>
        </div>
        </BaseScroll>
        </div>
      
      </div>

    <!-- </div> -->
  </div>
</template>
