import './index.css'
import 'virtual:uno.css'
import { initThemes } from '@/composables/useTheme'
import { initUiScale } from '@/composables/useUiScale'

initUiScale()

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'

import App from './App.vue'
import router from './router'
import Tooltip from 'primevue/tooltip'
import Dialog from 'primevue/dialog'
import ProgressBar from 'primevue/progressbar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import Ripple from 'primevue/ripple'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Skeleton from 'primevue/skeleton'
import Panel from 'primevue/panel'
import FloatLabel from 'primevue/floatlabel'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'

// global validators
import '@/utils/validators'

const app = createApp(App)

app.use(createPinia())

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.directive('ripple', Ripple)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Image', Image)
app.component('Panel', Panel)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('Column', Column)
app.component('Divider', Divider)
app.component('DataTable', DataTable)
app.component('Skeleton', Skeleton)
app.component('FloatLabel', FloatLabel)
app.component('ProgressBar', ProgressBar)
app.component('Select', Select)
app.directive('tooltip', Tooltip)

app.use(router)

// Initialize theme palettes
initThemes()

app.mount('#app')
