import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useDiveLogStore } from './stores/diveLogStore'
import { useRegistrationStore } from './stores/registrationStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const diveLogStore = useDiveLogStore()
const registrationStore = useRegistrationStore()

diveLogStore.loadDives()
registrationStore.loadRegistrations()