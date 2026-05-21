/**
 * Shared color palette for consistent coloring across the app.
 * Each entry has Bootstrap utility classes (text/bg) and a hex value.
 */
export const COLOR_PALETTE = [
    { text: 'text-success', bg: 'bg-success-subtle', hex: '#198754' },
    { text: 'text-primary', bg: 'bg-primary-subtle', hex: '#0d6efd' },
    { text: 'text-warning', bg: 'bg-warning-subtle', hex: '#e6a817' },
    { text: 'text-danger', bg: 'bg-danger-subtle', hex: '#dc3545' },
    { text: 'text-info', bg: 'bg-info-subtle', hex: '#0dcaf0' },
    { text: 'text-secondary', bg: 'bg-secondary-subtle', hex: '#6c757d' },
]

/**
 * Returns a palette entry by cycling through the array using an index.
 * Useful for coloring items in a list consistently.
 * @param {number} index
 * @returns {{ text: string, bg: string, hex: string }}
 */
export function getColorByIndex(index) {
    return COLOR_PALETTE[Math.abs(index) % COLOR_PALETTE.length]
}

/**
 * Returns a palette entry deterministically from a string (e.g. a category name).
 * Same string always yields the same color.
 * @param {string} str
 * @returns {{ text: string, bg: string, hex: string }}
 */
export function getColorByString(str) {
    let hash = 0
    for (const ch of (str ?? '')) hash = (hash * 31 + ch.charCodeAt(0)) | 0
    return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length]
}
