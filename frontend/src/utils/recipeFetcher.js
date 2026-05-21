/**
 * Fetches recipe data from our backend using API
 */

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

// Normalized Overview data 
const normalizeOverview = (item) => ({
    id: item.id ?? item.recipe_id,
    recipe_name: item.title,
    img_src: item.image_url,
    total_time: item.total_time_mins != null ? `${item.total_time_mins} mins` : '',
    total_time_mins: item.total_time_mins ?? null,
    difficulty: item.difficulty ?? null,
    rating: item.rating ?? null,
    matchedIngredients: item.matchedIngredients ?? [],
    protein_class: item.protein_class?.trim() ?? null,
    fat_class: item.fat_class?.trim() ?? null,
})

// Normalized Detailed data
const normalizeDetailed = (item) => ({
    id: item.id ?? item.recipe_id,
    recipe_name: item.title,
    img_src: item.image_url,
    total_time: item.total_time_mins != null ? `${item.total_time_mins} mins` : '',
    total_time_mins: item.total_time_mins ?? null,
    difficulty: item.difficulty ?? null,
    rating: item.rating ?? null,
    url: item.url ?? null,
    matchedIngredients: item.matchedIngredients ?? [],
    ingredients: item.ingredients_clean ?? '',
    directions: item.instructions ?? '',
    protein_class: item.protein_class?.trim() ?? null,
    fat_class: item.fat_class?.trim() ?? null,
})

// Raw Overview data
export const fetchRecipeOverview = async (userInput, userExcludeInput, filters = {}) => {
    try {
        const params = new URLSearchParams({ include: userInput })
        if (userExcludeInput) params.set('exclude', userExcludeInput)
        if (filters.proteinClass) params.set('protein_class', filters.proteinClass)
        if (filters.fatClass) params.set('fat_class', filters.fatClass)
        if (filters.difficulty) params.set('difficulty', filters.difficulty)
        const listRes = await fetch(`${BASE_URL}/api/recipes/?${params}`)
        const listData = await listRes.json()
        const normalized = listData.map(normalizeOverview)
        const seen = new Set()
        // Remove all duplications
        console.log(normalized[0])
        return normalized.filter((r) => {
            if (seen.has(r.recipe_name)) return false
            seen.add(r.recipe_name)
            return true
        })
    } catch (e) {
        console.error(`Failed to fetch overview recipe: ${e}`)
        return []
    }

}

// Raw Detailed data
export const fetchRecipeDetailed = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/api/recipes/${id}/`)
        const data = await res.json()
        console.log(data)

        return normalizeDetailed(data)
    } catch (e) {
        console.error(`Failed to fetch detailed recipe: ${e}`)
        return {}
    }
}