// ── Room polygon points (viewBox 0 0 100 75) ──────────────────────────────────
export const ROOM_POINTS = {
    kitchen: [[8, 23], [20, 15], [33, 9], [45, 6], [52, 10], [52, 22], [44, 29], [32, 38], [18, 44], [8, 37]],
    bathroom: [[52, 10], [62, 4], [70, 8], [72, 16], [70, 27], [62, 33], [52, 28], [52, 20]],
    bedroom: [[68, 10], [80, 4], [90, 8], [90, 22], [88, 36], [86, 48], [78, 56], [66, 50], [64, 36], [66, 20]],
    living: [[8, 42], [22, 44], [36, 40], [40, 49], [38, 59], [28, 63], [10, 61], [6, 55], [6, 48]],
    laundry: [[40, 43], [52, 37], [62, 43], [65, 51], [63, 61], [52, 65], [40, 61], [38, 53]],
    outdoor: [[65, 52], [80, 46], [91, 52], [93, 61], [90, 69], [79, 73], [65, 68], [62, 60]],
}

export function pointsToPath(points) {
    return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ') + ' Z'
}

export const ROOM_PATHS = Object.fromEntries(
    Object.entries(ROOM_POINTS).map(([id, pts]) => [id, pointsToPath(pts)])
)

export const DEBUG_ROOM_COLORS = { kitchen: '#40c974', bathroom: '#3b82f6', bedroom: '#a855f7', living: '#f59e0b', laundry: '#14b8a6', outdoor: '#ef4444' }
export const DEBUG_ROOM_STROKES = { kitchen: '#16a34a', bathroom: '#2563eb', bedroom: '#7c3aed', living: '#d97706', laundry: '#0f766e', outdoor: '#b91c1c' }

export const CALLOUTS = {
    kitchen: { lx: 22, ly: 24, ax: 26, ay: 27 },
    bathroom: { lx: 62, ly: 13, ax: 61, ay: 20 },
    bedroom: { lx: 80, ly: 32, ax: 78, ay: 34 },
    living: { lx: 16, ly: 58, ax: 20, ay: 52 },
    laundry: { lx: 50, ly: 62, ax: 50, ay: 53 },
    outdoor: { lx: 80, ly: 67, ax: 79, ay: 61 },
}

export const ROOM_ORDER = ['kitchen', 'bathroom', 'laundry', 'bedroom', 'living', 'outdoor']

export const ROOM_TIPS = {
    kitchen: { emoji: '🍳', text: 'Kitchens are one of the top sources of household waste — from food and packaging to unplanned grocery purchases.' },
    bathroom: { emoji: '🚿', text: 'The average person owns 9+ bathroom products. Most go unused. Fewer products = less plastic, less spend.' },
    laundry: { emoji: '🫧', text: 'Only running full loads saves up to 50% water and energy. Most people also use 2–3× the detergent needed.' },
    bedroom: { emoji: '🛏️', text: 'Bedrooms generate quiet waste through unfinished items, early replacements and single-use storage materials.' },
    living: { emoji: '🛋️', text: 'Living rooms see the most impulse purchasing — décor, accessories and entertainment items that quickly go unused.' },
    outdoor: { emoji: '🌱', text: 'Outdoor spaces see high seasonal purchasing and single-use entertaining habits that add up quietly over time.' },
}

export const HOW_IT_WORKS = [
    { label: 'Click on any room', description: 'Select a room on the house to start your audit.' },
    { label: 'Answer 5 questions', description: 'Honest answers work best — no right or wrong.' },
    { label: 'See your hotspots', description: 'Discover your top waste patterns with personalised insights.' },
]
