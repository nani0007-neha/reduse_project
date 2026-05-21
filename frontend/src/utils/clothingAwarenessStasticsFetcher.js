/**
 * Fetches clothing/textiles awareness statistics from our backend API
 */

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

const normalizeTextileYear = (item) => ({
    financial_year: item.financial_year,
    financial_year_start: item.financial_year_start,
    disposal: item.disposal ?? 0,
    international_export: item['international_export'] ?? 0,
    interstate_export: item['interstate_export'] ?? 0,
    processed_locally: parseFloat(item.processed_locally_including_wte) ?? 0,
    total_generation: item['Total Generation'] ?? 0,
    recovery_rate_pct: parseFloat(item.recovery_rate_pct) ?? 0,
    disposal_rate_pct: parseFloat(item.disposal_rate_pct) ?? 0,
    export_rate_pct: parseFloat(item.export_rate_pct) ?? 0,
})

const normalizeTextileYearMaterials = (item) => ({
    ...normalizeTextileYear(item),
    material_name: item.material_name,
})
const normalizeTextileYearDetails = (item) => ({
    ...normalizeTextileYear(item),
    material_name: item.material_name,
    source_sector: item.source_sector,
    source_sector_label: item.source_sector_label
})

export const fetchTextileYears = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/textiles-xls/yearly/`)
        const data = await res.json()
        return data.map(normalizeTextileYear)
    } catch (e) {
        console.error(`Failed to fetch textile year statistics: ${e}`)
        return []
    }
}

export const fetchTextileMaterials = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/textiles-xls/materials/`)
        const data = await res.json()
        return data.map(normalizeTextileYearMaterials)
    }
    catch (e) {
        console.error(`Failed to fetch textile materials statistics: ${e}`)
        return []
    }
}

export const fetchTextileDetails = async () => {
    try {
        const res = await fetch(`${BASE_URL}/api/textiles-xls/detail/`)
        const data = await res.json()
        return data.map(normalizeTextileYearDetails)
    }
    catch (e) {
        console.error(`Failed to fetch textile detailed statistics: ${e}`)
        return []
    }
}



