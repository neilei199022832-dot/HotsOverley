import { configure, defineRule } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import ru from '@vee-validate/i18n/dist/locale/ru.json'

// define all vee-validate rules
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})

defineRule('phoneNumber', (value: string) => {
  if (!value || !value.length) {
    return true
  }

  if (value.length !== 12) {
    return 'Номер телефона должен содержать 12 символов'
  }

  return true
})



configure({
  generateMessage: localize('ru', {
    messages: {
      ...ru.messages,
      required: 'Поле обязательно для заполнения',
    },
  }),
})

setLocale('ru')
