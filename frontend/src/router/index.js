import { createRouter, createWebHistory } from 'vue-router'
import FoodDisposalView from '@/views/FoodDisposalView.vue'
import LeftoverRecipeViewAltTwo from '@/views/LeftoverRecipeViewAltTwo.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ClothingAwarenessView from '@/views/ClothingAwarenessView.vue'
import ClothingQuestionaireView from '@/views/ClothingQuestionaireView.vue'
import ClothingDecode from '@/views/ClothingDecode.vue'
import ProductJourneyView from '@/views/ProductJourneyView.vue'
import ProductJourneyDetailedView from '@/views/ProductJourneyDetailedView.vue'
import WalkThroughHome from '@/views/WalkThroughHome.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: WelcomeView
    },
    {
        path: '/food/recipes',
        name: 'Leftover Recipe',
        component: LeftoverRecipeViewAltTwo
    },
    {
        path: '/food/disposal',
        name: 'Leftover Disposal',
        component: FoodDisposalView
    },

    {
        path: '/clothing/awareness',
        name: 'Clothing Awareness',
        component: ClothingAwarenessView
    },
    {
        path: '/clothing/questionaire',
        name: 'Clothing Questionaire',
        component: ClothingQuestionaireView
    },
    {
        path: '/clothing/textiledecode',
        name: 'Clothing Decode',
        component: ClothingDecode
    },
    {
        path: '/household/audit',
        name: 'Household Waste Audit',
        component: WalkThroughHome
    },
    {
        path: '/household/journey',
        name: 'Product Journey',
        component: ProductJourneyView
    },
    {
        path: '/household/detailedjourney',
        name: 'Product Journey Detailed',
        component: ProductJourneyDetailedView
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router