<template>
    <div class="d-flex flex-wrap justify-content-center">
        <div class="card m-2" style="width: 50rem;">
            <img v-if="recipeJson.img_src" :src="recipeJson.img_src" class="card-img-top"
                :alt="recipeJson.recipe_name" />
            <div class="card-header">
                {{ recipeJson.recipe_name }}
            </div>
            <div class="card-header d-flex justify-content-between">
                <span v-if="recipeJson.total_time">{{ recipeJson.total_time }}</span>
                <span v-if="recipeJson.rating">⭐ {{ recipeJson.rating }}</span>
                <span v-if="recipeJson.difficulty">Difficulty: {{ recipeJson.difficulty }}</span>
            </div>
            <div class="card-body" v-if="recipeJson.matchedIngredients && recipeJson.matchedIngredients.length">
                <strong>Matched:</strong> {{ recipeJson.matchedIngredients.join(', ') }}
            </div>
            <div class="card-body">
                <strong>Ingredients:</strong>
                <ul>
                    <li v-for="(ing, i) in ingredientList" :key="i">{{ ing }}</li>
                </ul>
            </div>
            <div class="card-body">
                <strong>Directions:</strong>
                <ol>
                    <li v-for="(step, index) in directionSteps" :key="index">{{ step }}</li>
                </ol>
            </div>
            <div class="card-footer" v-if="recipeJson.url">
                <a :href="recipeJson.url" target="_blank" rel="noopener noreferrer">View full recipe</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    recipeJson: {
        type: Object,
        default: () => ({})
    },
})

const ingredientList = computed(() => {
    if (!props.recipeJson.ingredients) return []
    return props.recipeJson.ingredients.split(',').map(s => s.trim()).filter(Boolean)
})

const directionSteps = computed(() => {
    if (!props.recipeJson.directions) return []
    const steps = props.recipeJson.directions.split('\n').map(s => s.trim()).filter(Boolean)
    // Remove extra lines
    if (steps.length > 0) {
        const last = steps[steps.length - 1]
        const isByline = !last.endsWith('.') && last.split(' ').length <= 6
        if (isByline) steps.pop()
    }
    return steps
})
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    height: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-img-top {
    max-height: 300px;
    object-fit: cover;
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
}

.card-body ul,
.card-body ol {
    padding-left: 1.2rem;
    margin-bottom: 0;
}

.card-footer a {
    color: #275FDA;
    text-decoration: none;
    font-weight: bold;
}
</style>