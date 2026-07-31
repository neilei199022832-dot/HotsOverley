import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { allHeroes, HeroNames, MapNames, skillMap, SkilsNames, type Hero } from '@/utils/mockData'
import { useClipboard } from '@vueuse/core'
import { flat, unique } from 'radash'

export const useAppStore = defineStore('app', () => {
  const copyData = () => {
    useClipboard().copy(JSON.stringify(heroes.value))
  }

  const setDataFromClickBoard = async () => {
    try {
      const data = await navigator.clipboard.readText()
      if (!data) return
      const parsedData = JSON.parse(data) as Hero[]
      heroes.value = heroes.value.map((h) => {
        const inputHero = parsedData.find((f) => f.name === h.name)
        return {
          name: h.name,
          role: h.role,
          friendHeroes: unique([...(inputHero?.friendHeroes ?? []), ...h.friendHeroes ]),
          enemyHeroes: unique([...(inputHero?.enemyHeroes ?? []), ...h.enemyHeroes ]),
          goodMaps: unique([...(inputHero?.goodMaps ?? []), ...h.goodMaps ?? [] ]),
          badMaps: unique([...(inputHero?.badMaps ?? []), ...h.badMaps ?? [] ]),
          vulnerableHeroes: unique([...(inputHero?.vulnerableHeroes ?? []), ...h.vulnerableHeroes ?? [] ]),
          skills: unique([...(inputHero?.skills ?? []), ...h.skills ?? [] ]),
          addictedHeroes: unique([...(inputHero?.addictedHeroes ?? []), ...h.addictedHeroes ?? [] ]),
        }
      })
      setDataToLocalStorage()
      init()
    } catch (error) {}
  }

  const removeLocalStorage = () => {
    localStorage.removeItem('heroes')
    init()
  }

  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('heroes')
    if (data) {
      return JSON.parse(data)
    }
  }

  const setDataToLocalStorage = () => {
    localStorage.setItem('heroes', JSON.stringify(heroes.value))
  }

  const heroSkillsMap = computed(() => {
    const heroSkillsMap = heroes.value.reduce(
      (acc, hero) => {
        hero.skills.forEach((s) => {
          acc[s] ? acc[s].push(hero.name) : (acc[s] = [hero.name])
        })
        return acc
      },
      {} as Record<SkilsNames, HeroNames[]>
    )

    return Object.fromEntries(
      Object.entries(heroSkillsMap).map(([skill, heroes]) => {
        return [skill, unique(heroes)]
      })
    )
  })

  const setFriendAndEnemy = () => {
    console.log(heroSkillsMap.value)
    heroes.value.forEach((h) => {
      const friendHeroes: HeroNames[][] = []
      const enemyHeroes: HeroNames[][] = []

      h.skills.forEach((s) => {
        const counter = skillMap[s].counter
        h.name === HeroNames.Junkrat && console.log(s, counter)
        const enemy = flat(counter.map((skill) => heroSkillsMap.value[skill] ?? []))

        const sinargy = skillMap[s].sinargy

        const friend = flat(sinargy.map((skill) => heroSkillsMap.value[skill] ?? []))
        friendHeroes.push(friend)
        enemyHeroes.push(enemy)
      })

      h.friendHeroes = unique(flat(friendHeroes ?? [])).filter((f) => f !== h.name)
      h.enemyHeroes = unique(flat(enemyHeroes ?? [])).filter((f) => f !== h.name)
    })
  }

  const setVulnerableHeroes = () => {
    heroes.value = heroes.value.map((hero) => {
      const vulnerableHeroes: HeroNames[] = []

      const addictedHeroes: HeroNames[] = []
      heroes.value.forEach((h) => {
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
        addictedHeroes
      }
    })
  }

  const initHeroCalcData = () => {
    setFriendAndEnemy()
    setVulnerableHeroes()
  }

  const heroes = ref<Hero[]>([])
  const init = () => {
    heroes.value = allHeroes
    const data = getDataFromLocalStorage()
    if (data) {
      heroes.value = data
      initHeroCalcData()
    } else {
      initHeroCalcData()
      setDataToLocalStorage()
    }
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
  const getHeroVulnerablePickRateRate = (enemy: Hero[], hero: Hero) =>
    enemy.filter((item) => hero.vulnerableHeroes?.includes(item.name)).length ?? 0

  //max 5 min -5
  const getMapPickRateRate = (hero: Hero, selectedMap?: MapNames) =>
    selectedMap
      ? hero.goodMaps?.includes(selectedMap)
        ? 5
        : hero.badMaps?.includes(selectedMap)
          ? -5
          : 0
      : 0

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
    const value =
      heroSinergyRate * 1.125 +
      heroVulnerablePickRateRate +
      heroAntiPickRateRate +
      mapPickRateRate +
      heroAddictedRate * 1.125
    const min = -10
    const max = 20
    return Number((((value + min * -1) / (max - min)) * 100).toFixed(0))
  }

  init()

  return {
    heroes,
    getPickRate,
    setDataToLocalStorage,
    removeLocalStorage,
    setDataFromClickBoard,
    copyData,
    initHeroCalcData
  }
})
