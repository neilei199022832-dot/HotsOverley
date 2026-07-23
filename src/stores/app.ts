import { defineStore } from 'pinia'
import {  ref } from 'vue'
import {  unique } from 'radash'
import { allHeroes, HeroNames, MapNames, type Hero } from '@/utils/mockData'

export const useAppStore = defineStore('app', () => {

  const setVulnerableHeroes = () => {
  return allHeroes.map(hero => {
    const vulnerableHeroes:HeroNames[] = []
    
    const addictedHeroes:HeroNames[] = []
    allHeroes.forEach(h => {

      if (h.enemyHeroes?.includes(hero.name)) {

      
        vulnerableHeroes.push(h.name)
      }
      if (h.friendHeroes?.includes(hero.name)) {

      
        addictedHeroes.push(h.name)
      }
    })
    return {
      ...hero,
      vulnerableHeroes,
      addictedHeroes,
    }
  })
}

  const heroes = ref<Hero[]>([])
 const init = () => {
    heroes.value = setVulnerableHeroes()
    console.log(heroes.value)
 }

 //max 4 min 0
 //Полезные для героя персонажи
  const getHeroSinergyRate = (team: Hero[], hero: Hero) =>
team.filter((item) => hero.friendHeroes.includes(item.name)).length

  //max 4 min 0
  //Персонажи которым полезен герой
    const getHeroAddictedRate = (team: Hero[], hero: Hero) =>
team.filter((item) => item.friendHeroes.includes(hero.name)).length


  //max 5 min 0
  const  getHeroVulnerablePickRateRate = (enemy: Hero[], hero: Hero) =>
enemy.filter((item) => hero.vulnerableHeroes?.includes(item.name)).length ?? 0

  //max 5 min -5
  const  getMapPickRateRate = (hero: Hero, selectedMap?: MapNames) =>
    selectedMap? hero.goodMaps?.includes(selectedMap)? 5: hero.badMaps?.includes(selectedMap)? -5: 0: 0 

  //max 0 min -5
const getHeroAntiPickRateRate = (enemy: Hero[], hero: Hero) =>
enemy.filter((item) => hero.enemyHeroes.includes(item.name)).length * -1

const getPickRate = (team: Hero[], enemy: Hero[], hero: Hero, selectedMap?: MapNames) => {
  const heroSinergyRate = getHeroSinergyRate(team, hero)
  const heroAddictedRate = getHeroAddictedRate(team, hero)
  const heroVulnerablePickRateRate = getHeroVulnerablePickRateRate(enemy, hero)
  const heroAntiPickRateRate = getHeroAntiPickRateRate(enemy, hero)
  
  const mapPickRateRate = getMapPickRateRate(hero, selectedMap)
  //min=-10 max=20
 const value = (heroSinergyRate * 1.125) + heroVulnerablePickRateRate + heroAntiPickRateRate + mapPickRateRate + (heroAddictedRate * 1.125)
 const min = -10
 const max = 20
  return Number((((value + min * -1) / (max - min)) * 100).toFixed(0))
}


init()

  return { heroes,getPickRate }
})
