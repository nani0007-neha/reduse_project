<template>
    <div class="container-fluid card gap-4" style="justify-content: center; align-items: center;
    text-align: center; background-color: white; padding: 2rem; width: 100%;">

        <div v-if="result" style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 1rem;">

            <!-- Badge + Label -->
            <div class="badge" style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em;
                padding: 0.3rem 0.9rem; border-radius: 10rem;">
                {{ result.label }}
                <span>{{ result.badge }}</span>
            </div>

            <!-- Status -->
            <h1 style="font-weight: bold; color: #222; margin: 0;">{{ result.status }}</h1>

            <!-- Headline -->
            <p style="font-size: 1rem; font-weight: 600; color: #444; margin: 0;">{{ result.headline }}</p>

            <!-- Body -->
            <p style="color: #555; max-width: 480px; margin: 0;">{{ result.body }}</p>

            <!-- Dynamic reasons -->
            <div v-if="dynamicReasons.length > 0" class="card p-5"
                style="background: #eee; border-radius: 0.75rem; width: 60%;">
                <p
                    style="font-size: 0.8rem; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">
                    A few things to consider:
                </p>
                <ul style="text-align: start; padding-left: 1.2rem;">
                    <li class="p-1" v-for="(reason, i) in dynamicReasons" :key="i">{{ reason }}</li>
                </ul>
            </div>

            <div class="row gap-5" style="width: 100%; justify-content: center;">
                <!-- Calculator Button -->
                <button class="questionaireButton" @click="$emit('openCalculator')">
                    Clothing Care Calculator →
                </button>
            </div>
            <!-- Tip -->
            <p style="color: #888; font-style: italic; font-size: 0.9rem; margin: 0;">{{ result.tip }}</p>

            <!-- Reset -->
            <button style="border: none; color: #888;" @click="resetQuestionaire">
                <i class="pi pi-refresh"></i> Reset Questionaire
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { getScore, getAnswers, resetQuestionaire } from '@/utils/questionaireController'

defineEmits(['openCalculator'])
const props = defineProps({
    results: {
        type: Object,
        required: true,
    }
})

const result = computed(() => {
    const score = getScore.value
    return props.results.scoreMappings.find(m => score >= m.range[0] && score <= m.range[1]) ?? null
})

const dynamicReasons = computed(() => {
    const reasons = []
    if (getScore.value >= 7) return reasons
    const dynamicMap = props.results.dynamicReasons
    const userAnswers = getAnswers.value
    for (const [questionId, optionMap] of Object.entries(dynamicMap)) {
        const selectedIndex = userAnswers[questionId]
        if (selectedIndex !== undefined) {
            const tip = optionMap[String(selectedIndex)]
            if (tip) reasons.push(tip)
        }
    }
    return reasons
})
</script>

<style scoped>
.badge {
    background-color: #fff;
    color: grey;
}
</style>
