import { createApp } from 'vue'
import router from "./router/index"
import App from './App.vue'
import GAuth from 'vue3-google-oauth2'
//@ts-ignore
import VueKinesis from 'vue-kinesis'
import "./index.css"

const gAuthOptions = { clientId: 'YOUR_CLIENT_ID', scope: 'email', prompt: 'consent', fetch_basic_profile: false }


createApp(App).use(router).use(VueKinesis).use(GAuth, .mount('#app')
