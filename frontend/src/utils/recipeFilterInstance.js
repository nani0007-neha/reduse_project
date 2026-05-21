/**
 * Stores current recipe filter, serves as a global variable
 */

import { ref } from 'vue'

export const recipeFilters = ref({
    minTime: null,
    maxTime: null,
    difficulty: null,
    proteinClass: null,
    fatClass: null,
})

export const resetFilters = () => {
    recipeFilters.value = { minTime: null, maxTime: null, difficulty: null, proteinClass: null, fatClass: null }
}

export const passesFilters = (recipe) => {
    const { minTime, maxTime, difficulty, proteinClass, fatClass } = recipeFilters.value
    if (minTime != null && recipe.total_time_mins != null && recipe.total_time_mins < minTime) return false
    if (maxTime != null && maxTime != 0 && recipe.total_time_mins != null && recipe.total_time_mins > maxTime) return false
    if (difficulty && recipe.difficulty !== difficulty) return false
    if (proteinClass && recipe.protein_class != null && recipe.protein_class !== proteinClass) return false
    if (fatClass && recipe.fat_class != null && recipe.fat_class !== fatClass) return false
    return true
}
