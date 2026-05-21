<template>
    <div class="container-fluid card gap-4" style="justify-content: center; align-items: center;
    text-align: center; background-color: white; padding: 2rem;  width: 100%;">
        <!-- Back button -->
        <button @click="resetQuestionaire"
            style="color: grey; border: none; margin-left: auto; background-color: transparent; text-decoration: underline;">back</button>
        <!-- Progress -->
        <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between; color: #777;">
                <span>Question {{ questionNumber }} of {{ totalQuestions }}</span>
                <span>{{ Math.round((questionNumber / totalQuestions) * 100) }}%</span>
            </div>
            <div style="background: #ddd; border-radius: 9999px; height: 6px; width: 100%;">
                <div :style="{ width: (questionNumber / totalQuestions * 100) + '%' }"
                    style="background: #009387; height: 6px; border-radius: 9999px; transition: width 0.3s;">
                </div>
            </div>
        </div>

        <!-- Question text -->
        <h2 style="font-size: 1.3rem; font-weight: bold; color: #222; margin: 0;">{{ question.text }}</h2>
        <p v-if="question.subLabel" style="color: #666; margin: -0.5rem 0 0; font-size: 0.9rem; font-style: italic;">
            {{ question.subLabel }}
        </p>

        <!-- Options -->
        <div class="row gap-2" style="width: 100%; justify-content: center;">
            <button v-for="(option, index) in question.options" :key="index" class="questionaireButton option-btn"
                :class="{ 'selected-option': selectedIndex === index }" :disabled="selectedIndex !== null"
                @click="selectOption(option, index)" style="width: 100%; text-align: left; padding: 0.75rem 1.25rem;">
                {{ option.text }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { addScore, moveToNextQuestion, recordAnswer, resetQuestionaire } from '@/utils/questionaireController'

const props = defineProps({
    question: {
        type: Object,
        required: true,
    },
    questionNumber: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    }
})

const selectedIndex = ref(null)

const selectOption = (option, index) => {
    selectedIndex.value = index
    setTimeout(() => {
        if (option.points !== undefined) {
            addScore(option.points)
        }
        recordAnswer(props.question.id, index)
        moveToNextQuestion()
        selectedIndex.value = null
    }, 280)
}
</script>

<style scoped>
.option-btn {
    background-color: white;
    color: #333;
    border: 2px solid #ccc;
    border-radius: 0.75rem;
    transition: all 0.15s;
}

.option-btn:hover:not(:disabled) {
    border-color: #009387;
    color: #009387;
    background-color: #f5fffe;
}

.selected-option {
    background-color: #009387 !important;
    color: white !important;
    border-color: #009387 !important;
}

.option-btn:disabled {
    cursor: default;
}
</style>
