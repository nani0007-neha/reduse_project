<template>
    <aside class="filter-sidebar">
        <div class="row">
            <div class="col-12 col-md-6 mb-4">
                <label class="filter-label fw-bold small">
                    <i class="pi pi-stopwatch" style="color: #444;"></i>
                    Duration (mins)</label>
                <div class="d-flex gap-2 mt-1">

                    <!-- Duration -->
                    <div class="flex-grow-1">
                        <input type="number" class="form-control form-control-sm" placeholder="Min" min="0"
                            :class="{ 'is-invalid': isTimeRangeInvalid }" :value="recipeFilters.minTime ?? ''"
                            @input="recipeFilters.minTime = toNum($event.target.value)" />
                        <div v-if="recipeFilters.minTime !== null && recipeFilters.minTime !== ''"
                            class="text-muted extra-small-duration mt-1 px-1">
                            Min
                        </div>
                    </div>

                    <div class="flex-grow-1">
                        <input type="number" class="form-control form-control-sm" placeholder="Max" min="0"
                            :class="{ 'is-invalid': isTimeRangeInvalid }" :value="recipeFilters.maxTime ?? ''"
                            @input="recipeFilters.maxTime = toNum($event.target.value)" />
                        <div v-if="recipeFilters.maxTime !== null && recipeFilters.maxTime !== ''"
                            class="text-muted extra-small-duration mt-1 px-1">
                            Max
                        </div>
                    </div>
                </div>
                <div v-if="isTimeRangeInvalid" class="text-danger extra-small-duration mt-1">
                    Time range is invalid!
                </div>
            </div>

            <!-- Difficulty -->
            <div class="col-12 col-md-6 mb-2">
                <label class="filter-label fw-bold small"><i class="pi pi-chart-bar me-1"></i>Difficulty</label>
                <div class="d-flex gap-2 mt-1">
                    <button v-for="level in difficulties" :key="level" class="btn btn-sm difficulty-btn flex-grow-1"
                        :class="recipeFilters.difficulty === level ? 'active' : ''" @click="toggleDifficulty(level)">
                        {{ level }}
                    </button>
                </div>
            </div>

            <!-- Protein Selection -->
            <div class="col-12 col-md-6 mb-2">
                <label class="filter-label fw-bold small">
                    <span class="material-symbols-outlined">humerus_alt</span>
                    Protein Level</label>
                <div class="d-flex gap-2 mt-1">
                    <button v-for="level in proteinLevels" :key="level" class="btn btn-sm difficulty-btn flex-grow-1"
                        :class="recipeFilters.proteinClass === level ? 'active' : ''"
                        @click="toggleProteinLevel(level)">
                        {{ level }}
                    </button>
                </div>
            </div>

            <!-- Fat Selection -->
            <div class="col-12 col-md-6 mb-2">
                <label class="filter-label fw-bold small">
                    <span class="material-symbols-outlined">water_drop</span>
                    Fat Level</label>
                <div class="d-flex gap-2 mt-1">
                    <button v-for="level in fatLevels" :key="level" class="btn btn-sm difficulty-btn flex-grow-1"
                        :class="recipeFilters.fatClass === level ? 'active' : ''" @click="toggleFatLevel(level)">
                        {{ level }}
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { computed } from 'vue'
import { recipeFilters } from '@/utils/recipeFilterInstance'

const isTimeRangeInvalid = computed(() => {
    const min = recipeFilters.value.minTime
    const max = recipeFilters.value.maxTime
    return (min !== null && max !== null && min > max) || min > 1500
})

const difficulties = ['Easy', 'Medium', 'Hard']
const proteinLevels = ['Low Protein', 'Moderate Protein', 'High Protein']
const fatLevels = ['Low Fat', 'Moderate Fat', 'High Fat']
const toNum = (val) => val === '' ? null : Number(val)

const toggleDifficulty = (level) => {
    recipeFilters.value.difficulty = recipeFilters.value.difficulty === level ? null : level
}

const toggleProteinLevel = (level) => {
    recipeFilters.value.proteinClass = recipeFilters.value.proteinClass === level ? null : level
}

const toggleFatLevel = (level) => {
    recipeFilters.value.fatClass = recipeFilters.value.fatClass === level ? null : level
}

</script>

<style scoped>
.filter-sidebar {
    border-radius: 8px;
}

.filter-label {
    letter-spacing: 0.04em;
    color: #444;
    ;
    display: block;
}

.extra-small-duration {
    font-size: 0.7rem;
    line-height: 1;
    font-weight: 500;
}

.difficulty-btn {
    background: white;
    border: 1px solid #dddddd;
    color: #444444;
    border-radius: 0.4rem;
    transition: all 0.2s;
}

.difficulty-btn.active {
    background-color: #009387;
    border-color: #009387;
    color: white;
}


.material-symbols-outlined {
    font-size: 15px;
    transform: translateY(2px);
}


.pi {
    font-size: 0.9em;
}
</style>