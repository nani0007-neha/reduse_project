import { computed, ref } from "vue";

const questionIndex = ref(-1)
const currentScore = ref(0)
const answers = ref({})

export const getQuestionIndex = computed(() => questionIndex.value)
export const getScore = computed(() => currentScore.value)
export const getAnswers = computed(() => answers.value)

export const moveToNextQuestion = () => {
    questionIndex.value++
}

export const resetQuestionaire = () => {
    questionIndex.value = -1
    currentScore.value = 0
    answers.value = {}
}

export const returntoLastQuestion = () => {
    questionIndex.value -= 1
    // currentScore.value = 0
    // answers.value = {}
}

export const addScore = (val) => {
    currentScore.value += val;
}

export const recordAnswer = (questionId, optionIndex) => {
    answers.value = { ...answers.value, [questionId]: optionIndex }
}
