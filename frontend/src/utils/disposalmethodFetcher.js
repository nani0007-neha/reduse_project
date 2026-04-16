/**
 * Fetches disposal data from our backend using API
 */

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

// Normalized disposal data
const normalizeDisposalData = (item) => ({
    id: item.id,
    food_category: item.food_category,
    label: item.label,
    stream: item.stream,
    steps: item.steps,
    notes: item.notes ?? '',
    source_link: item.source_link,
})

// Fetch all disposal methods
export const fetchDisposalMethods = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/food-disposal/`)
        const data = await res.json()
        return data.map(normalizeDisposalData)
    } catch (e) {
        console.error(`Failed to fetch disposal methods: ${e}`)
        return []
    }
}