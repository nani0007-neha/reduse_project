import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import FoodMainView from '@/views/FoodMainView.vue'
import LeftoverRecipeView from '@/views/LeftoverRecipeView.vue'
import FoodDisposalView from '@/views/FoodDisposalView.vue'
import LeftoverRecipeViewAlt from '@/views/LeftoverRecipeViewAlt.vue'
import LeftoverRecipeViewAltTwo from '@/views/LeftoverRecipeViewAltTwo.vue'
import WelcomeView from '@/views/WelcomeView.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: WelcomeView
    },
    {
        path: '/food',
        name: 'Food',
        component: FoodMainView
    },
    {
        path: '/food1',
        name: 'Leftover Recipe',
        component: LeftoverRecipeViewAltTwo
    },
    {
        path: '/food2',
        name: 'Leftover Disposal',
        component: FoodDisposalView
    }
]

const router = createRouter({
    history: createWebHistory('/FIT5120-Consumption-Advisor/'),
    routes
})

export default router