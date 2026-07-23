import { defineStore } from 'pinia'
import {  ref } from 'vue'
import {  unique } from 'radash'
import { allHeroes, HeroNames, MapNames, type Hero } from '@/utils/mockData'

export const useAppStore = defineStore('app', () => {

  const setVulnerableHeroes = () => {
  return allHeroes.map(hero => {
    const vulnerableHeroes:HeroNames[] = []
    const friendHeroes:HeroNames[] = []
    allHeroes.forEach(h => {

      if (h.enemyHeroes?.includes(hero.name)) {

      
        vulnerableHeroes.push(h.name)
      }
      if (h.friendHeroes?.includes(hero.name)) {

      
        friendHeroes.push(h.name)
      }
    })
    return {
      ...hero,
      vulnerableHeroes,
      friendHeroes:unique([...hero.friendHeroes, ...friendHeroes])
    }
  })
}

  const heroes = ref<Hero[]>([])
 const init = () => {
    heroes.value = setVulnerableHeroes()
    console.log(heroes.value)
 }

 //max 4 min 0
  const getHeroSinergyRate = (team: Hero[], hero: Hero) =>
team.filter((item) => hero.friendHeroes.includes(item.name)).length

  //max 5 min 0
  const  getHeroVulnerablePickRateRate = (enemy: Hero[], hero: Hero) =>
enemy.filter((item) => hero.vulnerableHeroes?.includes(item.name)).length ?? 0

  //max 5 min -5
  const  getMapPickRateRate = (hero: Hero, selectedMap: MapNames) =>
    hero.goodMaps?.includes(selectedMap)? 5: hero.badMaps?.includes(selectedMap)? -5: 0 

  //max 0 min -5
const getHeroAntiPickRateRate = (enemy: Hero[], hero: Hero) =>
enemy.filter((item) => hero.enemyHeroes.includes(item.name)).length * -1

const getPickRate = (team: Hero[], enemy: Hero[], hero: Hero, selectedMap: MapNames) => {
  const heroSinergyRate = getHeroSinergyRate(team, hero)
  const heroVulnerablePickRateRate = getHeroVulnerablePickRateRate(enemy, hero)
  const heroAntiPickRateRate = getHeroAntiPickRateRate(enemy, hero)
  const mapPickRateRate = getMapPickRateRate(hero, selectedMap)
  //min=-10 max=14
 const value = heroSinergyRate + heroVulnerablePickRateRate + heroAntiPickRateRate + mapPickRateRate
 const min = -10
 const max = 14
  return Number((((value + min * -1) / (max - min)) * 100).toFixed(0))
}


init()

  return { heroes,getPickRate }
})
