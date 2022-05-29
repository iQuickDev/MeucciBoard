import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
//@ts-ignore
import VueKinesis from 'vue-kinesis'
import "./index.css"

// @ts-ignore
createApp(App).use(router).use(VueKinesis).mount('#app')
