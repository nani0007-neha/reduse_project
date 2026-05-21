// ── Hotspot Categories (from doc) ─────────────────────────────────────────────
export const HOTSPOT_CATEGORIES = {
    singleUse: {
        label: 'Single-use reliance',
        icon: '🗑️',
        bands: {
            low: {
                title: 'Low single-use reliance',
                body: 'You\'ve significantly reduced your dependence on disposable items across your home.',
                tips: ['Carry a reusable bag, bottle and wrap as your daily baseline', 'Swap the last remaining disposable item in your highest-use room', 'Share the habit — it spreads quickly in households']
            },
            mid: {
                title: 'Moderate single-use reliance',
                body: 'You\'re reducing single-use in some rooms but defaulting to disposables in others.',
                tips: ['Identify which room has the most single-use defaults', 'One conscious swap per room, one month at a time', 'Reusable wraps, cloths and containers solve most kitchen single-use habits']
            },
            high: {
                title: 'High single-use reliance',
                body: 'Single-use items are your primary waste hotspot across multiple rooms.',
                tips: ['Start with one high-frequency swap: paper towels to cloth', 'A starter reusable kit costs less than one month of disposables', 'Keep reusable items visible — if put away, they\'re forgotten']
            },
        }
    },
    refillReuse: {
        label: 'Missed refill & reuse',
        icon: '♻️',
        bands: {
            low: {
                title: 'Strong reuse & refill habits',
                body: 'You\'re actively choosing reusable and refillable alternatives across most of your home.',
                tips: ['Note what you refill — the compound effect is larger than it feels', 'Look for refill options in any rooms not yet covered', 'Share your best swap with someone in your household']
            },
            mid: {
                title: 'Some reuse & refill missed',
                body: 'You\'re reusing in some rooms but missing easy refill opportunities in others.',
                tips: ['Find the one room where you most often buy new instead of refilling', 'Bulk and concentrate options are now available for most products', 'Bathroom and laundry have the most improved reusable options available']
            },
            high: {
                title: 'Low reuse & refill engagement',
                body: 'Refillable and reusable alternatives exist for almost everything you\'re currently replacing.',
                tips: ['Start with the product you replace most often — find its refill version', 'Refill stations and bulk sections exist in most major supermarkets', 'Replacing one item per month compounds into permanent change within a year']
            },
        }
    },
    productWaste: {
        label: 'Product waste',
        icon: '📦',
        bands: {
            low: {
                title: 'Low product waste',
                body: 'You tend to finish products before replacing them — one of the most impactful low-waste habits.',
                tips: ['A use-it-up week every few months clears hidden partial items', 'Visible storage makes finishing products easier across all rooms', 'Expiry awareness applies equally to food, bathroom and cleaning products']
            },
            mid: {
                title: 'Moderate product waste',
                body: 'Some products are going unused or replaced before finishing across a few rooms.',
                tips: ['Designate a "use first" shelf in your kitchen and bathroom', 'Before buying anything new, check what\'s already at home', 'A monthly audit of unfinished products takes under 10 minutes']
            },
            high: {
                title: 'High product waste',
                body: 'Products going unfinished or unused is a significant pattern across multiple rooms.',
                tips: ['Start a use-what-you-have challenge — one room, one week', 'Unfinished products are already paid for: finishing them is pure saving', 'Smaller containers reduce the chance of items expiring before use']
            },
        }
    },
    disposal: {
        label: 'Disposal confusion',
        icon: '❓',
        bands: {
            low: {
                title: 'Clear on disposal',
                body: 'You know how to dispose of most household waste correctly — a genuinely underrated sustainability skill.',
                tips: ['Share your recycling knowledge — most households don\'t have it', 'Check your council\'s site for any recent collection rule changes', 'Soft plastics and e-waste are the two most commonly misdisposed items']
            },
            mid: {
                title: 'Some disposal gaps',
                body: 'You\'re confident about some waste streams but uncertain about others.',
                tips: ['Save your council\'s waste guide to your phone — it covers 90% of questions', 'Soft plastics, e-waste and garden chemicals all have specific drop-off points', 'One resolved disposal question per week removes confusion permanently']
            },
            high: {
                title: 'High disposal confusion',
                body: 'Uncertainty about correct disposal is leading to waste in the wrong stream across multiple rooms.',
                tips: ['Bookmark your council\'s recycling guide — it answers 90% of questions', 'REDcycle, TerraCycle and council drop-offs cover most hard-to-recycle items', 'A recycling cheat sheet on your bin takes an hour to make and lasts years']
            },
        }
    },
    overconsume: {
        label: 'Overconsumption',
        icon: '🛒',
        bands: {
            low: {
                title: 'Intentional purchasing',
                body: 'You make considered purchasing decisions and rarely end up with unnecessary items.',
                tips: ['A 48-hour pause before non-essential purchases is the most effective consumption habit', 'Tracking what you don\'t buy is as useful as tracking what you do', 'Your intentionality tends to spread to other household members over time']
            },
            mid: {
                title: 'Moderate unplanned purchasing',
                body: 'Occasional impulse purchases and unplanned buys are adding up across some rooms.',
                tips: ['Apply a 48-hour rule before any unplanned purchase', 'Write down the last 5 non-essential things bought — were they still worth it?', 'Unsubscribing from promotional emails reduces unplanned purchasing by 20–30%']
            },
            high: {
                title: 'High unnecessary purchasing',
                body: 'Unplanned and unnecessary purchasing is your primary waste and consumption driver.',
                tips: ['One rule for 30 days: nothing new unless something is broken or finished', 'Every unplanned item bought is a future disposal problem', 'Wish lists and waiting periods are the simplest tools for this pattern']
            },
        }
    },
}

// Hotspot key order matches question order (Q1–Q5 in every room)
export const HOTSPOT_ORDER = ['singleUse', 'refillReuse', 'productWaste', 'disposal', 'overconsume']


export const METRICS = [
    { icon: '🌿', label: 'CO₂ Saved', value: '12 kg' },
    { icon: '💧', label: 'Water Optimised', value: '24 L' },
    { icon: '⚡', label: 'Energy Saved', value: '8%' },
]

export const SCORE_CFG = {
    low: { label: 'Low hotspot', color: '#15803d', bg: '#f0fdf4' },
    mid: { label: 'Moderate', color: '#92400e', bg: '#fef3c7' },
    high: { label: 'High hotspot', color: '#991b1b', bg: '#fee2e2' },
}
