<script setup lang="ts">
import { allHeroes, type Hero, type MapNames } from '@/utils/mockData';
import BaseHeroIcon from '@/components/BaseHeroIcon.vue';
import BaseScroll from './BaseScroll.vue';

defineProps<{
        hero:Hero,
        team:Hero[],
        bans:Hero[],
        selectedMap:MapNames,
        enemyTeam:Hero[],
}>()
const getHeroByName = (name:string) => {
    return allHeroes.find((f) => f.name === name)!
}
</script>
<template>
    
        <BaseScroll height="600px">
            <div class="pl-3">
            <div class="flex flex-col gap-4">
              <h1 class="text-2xl font-500"> Союзники</h1>
              <div div class="flex gap-x-14 gap-y-6 flex-wrap">
                <BaseHeroIcon v-for="item in hero.friendHeroes" :hero="getHeroByName(item)" :team="team" :enemyTeam="enemyTeam" :bans="bans" :selected-map="selectedMap" />
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <h1 class="text-2xl font-500 pt-2"> Враги</h1>
              <div class="flex gap-x-14 gap-y-6 flex-wrap">
                <BaseHeroIcon v-for="item in hero.enemyHeroes" :hero="getHeroByName(item)" :team="team" :enemyTeam="enemyTeam" :bans="bans" :selected-map="selectedMap" />
              </div>
            </div>
            <div v-if="hero.vulnerableHeroes" class="flex flex-col gap-2">
              <h1 class="text-2xl font-500 pt-2"> Враг для</h1>
                <div div class="flex gap-x-14 gap-y-6 flex-wrap">
                  <BaseHeroIcon v-for="item in hero.vulnerableHeroes" :hero="getHeroByName(item)" :team="team" :enemyTeam="enemyTeam" :bans="bans" :selected-map="selectedMap" />
                </div>
            </div>
            </div>
            </BaseScroll>
            
</template>