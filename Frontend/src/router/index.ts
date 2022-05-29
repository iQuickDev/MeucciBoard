import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Landing from "../views/Landing.vue"


const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Login",
        component: Landing
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
