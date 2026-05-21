/**
 * Splits a label into main text and the content inside parentheses (if any).
 * e.g. "Compost (home)" → { main: "Compost", sub: "home" }
 *      "General Waste"  → { main: "General Waste", sub: "" }
 */
export function parseLabel(label) {
    const match = label?.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
    if (match) {
        return { main: match[1].trim(), sub: match[2].trim() }
    }
    return { main: label ?? '', sub: '' }
}
