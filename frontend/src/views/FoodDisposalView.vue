<template>
    <RedUseHeader paragraph="Pick your food waste type and stop guessing. Green bin, recycling,
            or
            general waste, we got you." inter="Bin it " grace="Smart"></RedUseHeader>
    <RedUseLoader :loading="loading" />
    <div class="flex-grow-1 container" style="text-align: center;">
        <div class="d-flex" style="justify-content: center; align-items: center;">
            <div v-if="filteredMethods.length" class="row row-cols-md-4 g-3 mt-3">
                <div v-for="(method, index) in filteredMethods" :key="method.id" style="display: block;">
                    <FoodDisposalCard :icon="staticIcons.at(index)" :method="method"
                        :stream-color="getColorByIndex(index).text" />
                </div>
            </div>
            <div v-else class="text-center mt-5 text-muted">No disposal methods found.</div>
        </div>
    </div>
</template>

<script setup>
import FoodDisposalCard from '@/components/food/FoodDisposalCard.vue';
import { onMounted, ref, computed } from 'vue';
import { fetchDisposalMethods } from '@/utils/disposalmethodFetcher';
import RedUseHeader from '@/components/misc/RedUseHeader.vue';
import RedUseLoader from '@/components/misc/RedUseLoader.vue';
import { getColorByIndex } from '@/utils/colorPalette';

const allMethods = ref([]);
const selectedCategory = ref('');
const loading = ref(true);

const filteredMethods = computed(() =>
    selectedCategory.value
        ? allMethods.value.filter(m => m.food_category === selectedCategory.value)
        : allMethods.value
);

const staticIcons = ['cookie', 'no_meals', 'dining', 'compost'];

onMounted(async () => {
    allMethods.value = await fetchDisposalMethods();
    loading.value = false;
});
</script>
