<template>
    <div>
        <h5 class="fw-bold mb-4 text-center">How it works</h5>
        <div class="row text-center g-4">
            <div v-for="(step, i) in HOW_IT_WORKS" :key="i" class="col-12 col-md-4">
                <StepsIndicator :index="i" :step="step"></StepsIndicator>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HOW_IT_WORKS } from '@/utils/householdRoomVisualizationStaticData';
import StepsIndicator from '../misc/StepsIndicator.vue';
</script>