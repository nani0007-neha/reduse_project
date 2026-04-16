<template>
    <div class="font_sub" style="font-size: 150%; text-align: center; margin-bottom: 5%;">
        <label>What type of food waste do you want to dispose of?</label>
    </div>
    <div class="container col-12 col-md-6 offset-md-3 basic">
        <select class="form-select" v-model="selectedCategory">
            <option value="">All categories</option>
            <option v-for="method in allMethods" :key="method.id" :value="method.food_category">
                {{ method.label }}
            </option>
        </select>
    </div>
    <div v-if="loading" class="text-center mt-5">Loading...</div>
    <div v-else-if="filteredMethods.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mt-3 px-3">
        <div v-for="method in filteredMethods" :key="method.id" class="col">
            <FoodDisposalCard :method="method" />
        </div>
    </div>
    <div v-else class="text-center mt-5 text-muted">No disposal methods found.</div>
</template>

<script setup>
import FoodDisposalCard from '@/components/FoodDisposalCard.vue';
import { onMounted, ref, computed } from 'vue';
import { fetchDisposalMethods } from '@/utils/disposalmethodFetcher';

const allMethods = ref([]);
const selectedCategory = ref('');
const loading = ref(true);

const filteredMethods = computed(() =>
    selectedCategory.value
        ? allMethods.value.filter(m => m.food_category === selectedCategory.value)
        : allMethods.value
);

onMounted(async () => {
    allMethods.value = await fetchDisposalMethods();
    loading.value = false;
});
</script>