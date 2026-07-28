<script setup lang="ts">
import { Checkbox } from '@ark-ui/vue/checkbox'
import { CheckIcon } from 'lucide-vue-next'
import { ref, watch } from 'vue'
//3 Бан
//1 Пик
//2 Вражеский пик
const props = defineProps<{
  currentRound: number
}>()

const auto = ref(true)
const first = ref(true)

const turn = defineModel<number>('turn')

const maxLength = ref(0)
const qeue = [3,3,3,3,1,2,2, 1,1, 3,3, 2,2, 1,1, 2]

watch(() => props.currentRound, () => {
  if(maxLength.value > props.currentRound) return
  maxLength.value = props.currentRound
  if(props.currentRound === 0) {
    maxLength.value = 0
    return
  }
  if(auto.value === false) {
    return
  }
  
  
  if(maxLength.value === qeue.length ) {
    return
  }
  console.log(maxLength.value );
  const currentTurn = qeue[maxLength.value]
  
  if(currentTurn === 3) {
    turn.value = 3
  }else {
    if(first.value){
    currentTurn === 1 ? turn.value = 1 : turn.value = 2 
    }else {
      currentTurn === 1 ? turn.value = 2 : turn.value = 1
    }
  }
  
})


</script>
<template>
  
  
  <div class="flex gap-2 w-84">
  <Checkbox.Root v-model:checked="auto" class="Root">
    <Checkbox.Control class="Control !border-#6b95c2">
      <Checkbox.Indicator class="Indicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class="Label">Автоочередь</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
    
  <Checkbox.Root v-model:checked="first" class="Root">
    <Checkbox.Control class="Control !border-#6b95c2">
      <Checkbox.Indicator class="Indicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label class="Label max-w-82">Наша команда первая</Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
  </div>
</template>
<style scoped>
.Root {
  
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  gap: 0.5rem;
  position: relative;

  &[data-disabled] {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}

.Label {
  font-size: 1rem;
  line-height: 1.25rem;
  user-select: none;
  
}

.Control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid;
  border-radius: 0.25rem;
  background: transparent;
  color: #182634;

  &[data-state='checked'],
  &[data-state='indeterminate'] {
    background: #6b95c2;
    border-color: #182634;
  }

  &[data-focus-visible] {
    outline: 2px solid #6b95c2;
    outline-offset: 2px;
  }

  &[data-invalid] {
    border-color: #6d131e;
  }

  &[data-invalid][data-focus-visible] {
    border-color: #6d131e;
    box-shadow: 0 0 0 1px #6d131e;
  }

  & svg {
    width: 0.875rem;
    height: 0.875rem;
  }
}

.Indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.Group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}


</style>