import { createApp } from 'vue'
import App from './App.vue'

let myWindow = window as any;
createApp(App).mount('#'+myWindow.asoneId)