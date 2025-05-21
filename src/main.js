import { createApp } from 'vue'
import App from './App.vue'
import { IMaskDirective } from 'vue-imask'
import './styles/main.scss'

const app = createApp(App)

app.directive('imask', IMaskDirective)

app.mount('#app')