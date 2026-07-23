<script setup lang="ts">
import { DayFlowCalendar, useCalendarApp } from '@dayflow/vue'
import {
  createDayView,
  createWeekView,
  createMonthView,
  createEventsPlugin,
  createEvent,
  type Event
} from '@dayflow/core'
import { createDragPlugin } from '@dayflow/plugin-drag'
import '@dayflow/core/dist/styles.css'
import { onMounted, ref } from 'vue'

const currentEvents = ref<Event[]>([])

const calendar = useCalendarApp({
  views: [createDayView(), createWeekView(), createMonthView()],
  plugins: [createDragPlugin(), createEventsPlugin({})],
  callbacks: {
    onEventCreate(event) {
      currentEvents.value.push(event)
    },
    onEventUpdate(event) {
      currentEvents.value = currentEvents.value.map((e) => {
        if (e.id === event.id) {
          return event
        }
        return e
      })
    }
  },
  initialDate: new Date()
})

const { addEvent } = calendar

onMounted(() => {
  addEvent(
    createEvent({
      id: '1',
      title: 'Team Meeting',
      start: new Date(2026, 3, 20, 9, 0),
      end: new Date(2026, 3, 20, 10, 0),
      allDay: false,
      calendarId: 'blue'
    })
  )
})
</script>

<template>
  <DayFlowCalendar :calendar="calendar" />
</template>
