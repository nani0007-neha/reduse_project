<template>
    <div v-if="!show" class="d-flex justify-content-center mt-5">
        <button class="btn btn-link" style="color: black;
        border-radius: 5%;
        border-width: 0;
        padding: 1%;" @click="showFilters">Filters</button>
    </div>
    <aside v-if="show" class="filter-sidebar p-3">
        <div class="d-flex justify-content-center align-items-center mb-3">
            <!-- <span class="fw-semibold" style="color: darkgreen;">Filters</span> -->
            <button class="btn btn-link" style="color: black;" @click="hideFilters">Collapse</button>
        </div>

        <!-- Duration -->
        <div class="mb-4">
            <label class="filter-label">Duration (mins)</label>
            <div class="d-flex gap-2 mt-1">
                <input type="number" class="form-control form-control-sm" placeholder="Min" min="0"
                    :value="recipeFilters.minTime ?? ''" @change="recipeFilters.minTime = toNum($event.target.value)" />
                <input type="number" class="form-control form-control-sm" placeholder="Max" min="0"
                    :value="recipeFilters.maxTime ?? ''" @change="recipeFilters.maxTime = toNum($event.target.value)" />
            </div>
        </div>

        <!-- Difficulty -->
        <div class="mb-2">
            <label class="filter-label">Difficulty</label>
            <div class="d-flex flex-column gap-1 mt-1">
                <button v-for="level in difficulties" :key="level" class="btn btn-sm difficulty-btn"
                    :class="recipeFilters.difficulty === level ? 'active' : ''" @click="toggleDifficulty(level)">
                    {{ level }}
                </button>
            </div>
        </div>
        <button class="col-12 btn btn-link" style="color: black;" @click="reset">Reset</button>

    </aside>
</template>

<script setup>
import { ref } from 'vue';
import { recipeFilters, resetFilters } from '@/utils/recipeFilterInstance'


const difficulties = ['Easy', 'Medium', 'Hard']

const toNum = (val) => val === '' ? null : Number(val)

const show = ref(false);

const toggleDifficulty = (level) => {
    recipeFilters.value.difficulty = recipeFilters.value.difficulty === level ? null : level
}

const reset = () => resetFilters()

const showFilters = () => {
    show.value = true;
}

const hideFilters = () => {
    show.value = false;
}
</script>

<style scoped>
.filter-sidebar {
    border-right: 1px solid #e5e5e5;
    min-width: 160px;
}

.filter-label {
    letter-spacing: 0.06em;
    color: #000;
}

.difficulty-btn {
    text-align: left;
    background: white;
    border: 1px solid #ddd;
    color: #444;
    border-radius: 0.4rem;
}

.difficulty-btn.active {
    background-color: darkgreen;
    border-color: darkgreen;
    color: white;
}
</style>
