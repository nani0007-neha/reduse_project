<template>
    <!-- Intro -->
    <ClothingActionCard v-if="questionIndex === -1" icon="pi pi-check-square" :title="title" :description="description"
        :leftButtonLabel="confirmLabel" :rightButtonLabel="skipLabel" :onLeftClick="startQuestionaire"
        :onRightClick="() => router.push('/')" />

    <!-- Question cards -->
    <ClothingQuestionaireSubCard v-else-if="questions.length > 0 && questionIndex < questions.length"
        :key="questionIndex" :question="questions[questionIndex]" :questionNumber="questionIndex + 1"
        :totalQuestions="questions.length" />

    <!-- Results card -->
    <ClothingQuestionaireResultCard v-else-if="resultsData" :results="resultsData"
        @openCalculator="$emit('openCalculator')" />

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getQuestionIndex, moveToNextQuestion, resetQuestionaire } from '@/utils/questionaireController'
import ClothingActionCard from '@/components/clothing/ClothingActionCard.vue'
import ClothingQuestionaireSubCard from '@/components/clothing/ClothingQuestionaireSubCard.vue'
import ClothingQuestionaireResultCard from '@/components/clothing/ClothingQuestionaireResultCard.vue'

const router = useRouter()

defineProps({
    title: { type: String, required: true },
    description: { type: String },
    confirmLabel: { type: String, required: true },
    skipLabel: { type: String, required: true },
})

defineEmits(['openCalculator'])

const questions = ref([])
const resultsData = ref(null)
const questionIndex = getQuestionIndex

onMounted(async () => {
    // Fetch questionaire json data
    resetQuestionaire()
    const base = import.meta.env.BASE_URL
    const [qRes, rRes] = await Promise.all([
        fetch(base + 'questions.json', { cache: 'no-store' }),
        fetch(base + 'questionaireResults.json', { cache: 'no-store' }),
    ])
    questions.value = (await qRes.json()).questions
    resultsData.value = await rRes.json()
})

const startQuestionaire = () => {
    moveToNextQuestion()
}
</script>
