export const ROOMS = {
    kitchen: {
        id: 'kitchen', name: 'Kitchen', icon: '🍳', label: 'Food, packaging & pantry waste',
        questions: [
            {
                hotspot: 'singleUse',
                q: 'How often do you use disposable kitchen items like paper towels, cling wrap, or takeaway packaging?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'refillReuse',
                q: 'How often do you refill or reuse containers for kitchen or pantry essentials?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'productWaste',
                q: 'How often does food go unused or expire before you finish it?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'disposal',
                q: 'How often are you unsure how to dispose of food scraps, soft plastics, or takeaway containers?',
                options: ['Never', 'Rarely', 'Sometimes', 'Often'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'overconsume',
                q: 'How often do you buy kitchen or pantry items that were not planned or turn out to be unnecessary?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
        ],
        results: {
            low: { title: 'Your kitchen is running lean.', body: 'You rarely use single-use items, refill consistently, and keep food waste low. These habits matter more than most people realise.', tips: ['Keep one reusable wrap visible — it prevents reaching for cling film', 'Shop with a list: it\'s the single highest-impact kitchen habit', 'Check your council\'s guide on soft plastic and food scraps disposal'] },
            mid: { title: 'Your kitchen has some quiet waste.', body: 'Food expiry, single-use packaging and unplanned purchases are the three key areas showing up in your audit.', tips: ['One swap: a reusable wrap instead of cling film', 'Do a fridge check before every shop — not after', 'Research soft plastic drop-off points in your area'] },
            high: { title: 'Your kitchen is your primary waste room.', body: 'Single-use reliance and unplanned purchasing are compounding daily. Even one targeted change creates visible results.', tips: ['Start with paper towels → cloth. It\'s the highest-frequency kitchen swap', 'Write a shopping list before every shop, no exceptions', 'Add a recycling guide to your fridge for disposal confusion'] },
        },
    },
    bathroom: {
        id: 'bathroom', name: 'Bathroom', icon: '🚿', label: 'Product accumulation & disposal',
        questions: [
            {
                hotspot: 'singleUse',
                q: 'How often do you buy disposable bathroom items like wipes, cotton pads, or razors?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'refillReuse',
                q: 'How often do you choose refill packs, reusable alternatives, or low-waste formats for bathroom products?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'productWaste',
                q: 'How often are bathroom products thrown away before they are fully used?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'disposal',
                q: 'How often are you unsure whether bathroom product containers can be recycled correctly?',
                options: ['Never', 'Rarely', 'Sometimes', 'Often'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'overconsume',
                q: 'How often do you buy extra bathroom products before finishing the ones already at home?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
        ],
        results: {
            low: { title: 'Your bathroom shows real intentionality.', body: 'Low single-use items, refill habits and product completion are all working together here.', tips: ['Check one label a week for recycling instructions — small knowledge compounds', 'Consider a bar shampoo to permanently cut one plastic bottle', 'Finish what\'s already there before any new purchase'] },
            mid: { title: 'Your bathroom has some accumulation.', body: 'Unfinished products, new purchases before finishing existing ones, and disposal uncertainty are the key patterns.', tips: ['Shelf audit: anything untouched in 3 months — reassess it', 'Look for one refill option for your most-used product', 'A small recycling bin in the bathroom changes disposal behaviour'] },
            high: { title: 'Your bathroom is quietly overcrowded.', body: 'High single-use reliance, unfinished products and pre-purchase of extras are all active habits here.', tips: ['One rule: nothing new until something is fully finished', 'Replace wipes with a reusable cloth — cost difference reverses within a month', 'Check one packaging label per day for recyclability'] },
        },
    },
    laundry: {
        id: 'laundry', name: 'Laundry', icon: '🫧', label: 'Water, detergent & product habits',
        questions: [
            {
                hotspot: 'singleUse',
                q: 'How often do you use single-use laundry items such as dryer sheets, stain wipes, or disposable cleaning pads?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'refillReuse',
                q: 'How often do you choose refill, bulk-buy, or reusable laundry options?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'productWaste',
                q: 'How often do laundry products sit unused or get replaced before they are finished?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'disposal',
                q: 'How often are you unsure how to dispose of detergent bottles, boxes, or specialty packaging?',
                options: ['Never', 'Rarely', 'Sometimes', 'Often'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'overconsume',
                q: 'How often do you buy new laundry products before finishing the ones you already have at home?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
        ],
        results: {
            low: { title: 'Your laundry habits are already lean.', body: 'You\'re choosing considered products, avoiding unnecessary single-use items, and finishing what you have.', tips: ['Try a concentrated eco refill for your current detergent', 'Air worn-once items before washing — most odour releases without water', 'Line drying works above 10°C — it just takes a little longer'] },
            mid: { title: 'Your laundry has some quiet inefficiency.', body: 'Product replacement habits, disposal questions, and occasional pre-purchasing are the key areas.', tips: ['Full loads only — the single highest-impact laundry change', 'Measure detergent once, then remember that visual amount', 'Check what detergent packaging is accepted at your local recycling point'] },
            high: { title: 'Laundry is a high-resource room for you.', body: 'Single-use laundry items, product pre-purchasing and disposal confusion are compounding regularly.', tips: ['Machine runs only when full — start this rule today', 'Dryer sheets are easily replaceable with one reusable wool ball alternative', 'Check your council\'s guide for detergent and specialty packaging disposal'] },
        },
    },
    bedroom: {
        id: 'bedroom', name: 'Bedroom', icon: '🛏️', label: 'Textiles, items & replacement habits',
        questions: [
            {
                hotspot: 'singleUse',
                q: 'How often do you use single-use items in this space, such as disposable storage liners, packaging, or short-life accessories?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'refillReuse',
                q: 'How often do you repair, reuse, or repurpose items before replacing them?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'productWaste',
                q: 'How often do usable items in this space stay unused, unfinished, or get discarded early?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'disposal',
                q: 'How often are you unsure how to dispose of unwanted textiles, accessories, or small household items from this space?',
                options: ['Never', 'Rarely', 'Sometimes', 'Often'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'overconsume',
                q: 'How often do purchases for this space result in duplicate or unnecessary items?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
        ],
        results: {
            low: { title: 'Your bedroom is running consciously.', body: 'You repair and reuse rather than replace, and make considered purchases. Textile habits are particularly strong.', tips: ['Donate rather than bin unwanted textiles — most councils have textile streams', 'Check your council\'s guide for disposing of old bedding and small accessories', 'The chair pile is fine — airing worn items reduces unnecessary washing'] },
            mid: { title: 'Your bedroom has some unconsidered habits.', body: 'Replacement timing, single-use storage items and disposal questions are the areas to focus on.', tips: ['Before replacing anything: is it broken, or just familiar?', 'Check how to recycle textiles locally — more options exist than most people think', 'Repair one item this month instead of replacing it'] },
            high: { title: 'Your bedroom has significant room to improve.', body: 'Single-use items, early replacements and disposal uncertainty are all active across this space.', tips: ['Apply a 30-day rule before replacing any non-broken item', 'Textile swap shops and clothing libraries are free alternatives to buying new', 'Your council\'s website has specific guidance on small item and textile disposal'] },
        },
    },
    living: {
        id: 'living', name: 'Living Room', icon: '🛋️', label: 'Impulse purchasing & energy habits',
        questions: [
            {
                hotspot: 'singleUse',
                q: 'How often do you use disposable items in this space, such as tissues, single-use décor, or short-life accessories?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'refillReuse',
                q: 'How often do you reuse, repair, or repurpose living room items before replacing them?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'productWaste',
                q: 'How often do decorative, entertainment, or household items in this space go unused or get replaced early?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'disposal',
                q: 'How often are you unsure how to dispose of décor, broken small electronics, candles, or packaging from this space?',
                options: ['Never', 'Rarely', 'Sometimes', 'Often'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'overconsume',
                q: 'How often do you buy living room items that were not planned or turn out to be unnecessary?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
        ],
        results: {
            low: { title: 'Your living room is your most intentional space.', body: 'Deliberate purchasing, reuse habits and disposal awareness are working well together here.', tips: ['A 48-hour pause before any non-essential purchase is the most effective habit', 'Check what small electronics and packaging can be recycled near you', 'Reusable alternatives for candles and décor now exist across most categories'] },
            mid: { title: 'Your living room has some drift.', body: 'Occasional impulse purchases, early replacement of items and some disposal gaps are showing up.', tips: ['Wait 48 hours before buying any non-essential item for this room', 'Look for one item to repair or repurpose this month', 'Most councils offer free bulky item or e-waste pickup — check yours'] },
            high: { title: 'Your living room is your highest consumption space.', body: 'Unplanned purchasing and unclear disposal are the two dominant patterns here.', tips: ['Track non-essential purchases for this room for one month', 'Write down the last 5 things bought here — were they genuinely needed?', 'Your council almost certainly has an e-waste and décor drop-off point'] },
        },
    },
    outdoor: {
        id: 'outdoor', name: 'Outdoor', icon: '🌱', label: 'Garden, entertaining & seasonal waste',
        questions: [
            {
                hotspot: 'singleUse',
                q: 'How often do you use disposable items for outdoor meals, gardening, or gatherings?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'refillReuse',
                q: 'How often do you reuse pots, tools, containers, or outdoor materials?',
                options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'productWaste',
                q: 'How often do outdoor or garden items go unused, unfinished, or get discarded before their useful life is over?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
            {
                hotspot: 'disposal',
                q: 'How often are you unsure how to dispose of plant pots, soil bags, garden chemicals, or outdoor packaging?',
                options: ['Never', 'Rarely', 'Sometimes', 'Often'],
                scores: [1, 2, 3, 4],
            },
            {
                hotspot: 'overconsume',
                q: 'How often do you buy outdoor or garden items that turn out to be unnecessary or unused?',
                options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
                scores: [4, 3, 2, 1],
            },
        ],
        results: {
            low: { title: 'Your outdoor space shows sustainable habits.', body: 'You reuse garden items, keep single-use entertaining low, and make considered outdoor purchases.', tips: ['Compost organic outdoor scraps — it\'s the highest-impact outdoor habit', 'Share garden tools with neighbours to prevent unnecessary purchasing', 'Check council drop-off points for soil bags and plant pots'] },
            mid: { title: 'Your outdoor space has some areas to address.', body: 'Single-use entertaining items, early product replacement and disposal questions are showing up.', tips: ['Swap disposable outdoor plates and cups for one reusable set', 'Before buying any garden item, check if something at home can substitute', 'Most councils accept soil bags and plant pots at specific collection points'] },
            high: { title: 'Your outdoor space has significant waste habits.', body: 'Single-use purchasing, unused garden items and disposal confusion are all active patterns here.', tips: ['One swap: reusable plates and cups for all outdoor meals', 'Check council guidelines specifically for garden chemicals and packaging', 'A tool library or community swap eliminates most unnecessary garden purchases'] },
        },
    },
}