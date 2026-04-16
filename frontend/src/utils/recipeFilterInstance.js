/**
 * Stores current recipe filter, serves as a global variable
 */

import { ref } from 'vue'

export const recipeFilters = ref({
    minTime: null,
    maxTime: null,
    difficulty: null,
})

export const resetFilters = () => {
    recipeFilters.value = { minTime: null, maxTime: null, difficulty: null }
}

export const passesFilters = (recipe) => {
    const { minTime, maxTime, difficulty } = recipeFilters.value
    if (minTime != null && recipe.total_time_mins != null && recipe.total_time_mins < minTime) return false
    if (maxTime != null && maxTime != 0 && recipe.total_time_mins != null && recipe.total_time_mins > maxTime) return false
    if (difficulty && recipe.difficulty && recipe.difficulty !== difficulty) return false
    return true
}
