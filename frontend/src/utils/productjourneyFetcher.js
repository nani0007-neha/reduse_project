/**
 * Fetches product journey data from our backend using API
 */

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

// Fetch product journey for a given object name
// Returns { journey, stale, message } on success, or null on failure
export const fetchProductJourney = async (objectName) => {
    try {
        const res = await fetch(`${BASE_URL}/api/product-journey/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ objectName }),
        })
        const result = await res.json()
        if (!res.ok || result.success === false) {
            throw new Error(result.message || result.error || 'Request failed')
        }
        const journey = result.data
        return { journey, stale: result.stale === true, message: result.message }
    } catch (e) {
        console.error(`Failed to fetch product journey: ${e}`)
        return null
    }
}
