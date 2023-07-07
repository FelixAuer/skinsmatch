import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Dice from "../views/Dice.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/dice",
        name: "Dice",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Dice,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
