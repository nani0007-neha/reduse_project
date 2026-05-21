<template>
    <div class="clothing-awareness-view">
        <RedUseHeader inter="The " grace="Story behind " inter-two="our wardrobes" paragraph="Australia sends 100,000+ tonnes of textiles to landfill every year. Here's
            what
            the numbers actually look like."></RedUseHeader>
        <RedUseLoader :loading="loading" />
        <RedUseErrorMessage v-if="error && !loading" msg="Failed to load data. Please try again." />
        <div v-if="!error && !loading" class="charts-column">
            <div class="card" style="padding: 5%;">
                <ClothingAwarenessCard title="Key insight"
                    description="Over 200,000 tonnes of textile waste are still sent to landfill each year — significantly more than any other pathway."
                    insights="Landfill remains the dominant disposal pathway"
                    badge=">3× more than the next largest pathway" badge-icon="pi pi-arrow-up-right"
                    color="color:#c2185b" aura-color="background-color:#fff0f6"
                    badge-aura-color="background-color:#eee0e6">
                    <ClothingAwarenessChartDisposal :data="textileData" />
                </ClothingAwarenessCard>
            </div>
            <div class="card" style="padding: 5%;">
                <div class="row gap-5" style="justify-content: center; align-items: center;">
                    <div class="tabs">
                        <button class="tab" :class="{ active: textileDataIndex === 0 }"
                            @click="textileDataIndex = 0">Material</button>
                        <button class="tab" :class="{ active: textileDataIndex === 1 }"
                            @click="textileDataIndex = 1">Source Sector</button>
                    </div>
                </div>
                <ClothingAwarenessCard v-if="textileDataIndex == 0" title="key insight"
                    description="Clothing makes up the largest share of textile waste"
                    insights="clothing waste is consistently higher than other txtiles, peaking at 120,000 tons in 2019-2020"
                    badge="~55% of total textile waste is clothing" color="color:#2e7d32"
                    aura-color="background-color:#f1fff3">
                    <ClothingAwarenessChartMaterials :data="materialsData" />
                </ClothingAwarenessCard>
                <ClothingAwarenessCard v-else title="key insight"
                    description="Municipal waste is the biggest source of textile waste" insights="textile waste from municipal solid waste is the highest across all sectors, 
                    contributing more than half of the total" badge=">50% of textile waste comes from municiple waste"
                    color="color:#e65100" aura-color="background-color:#fff8f0">
                    <ClothingAwarenessChartSectors :data="detailsData" />
                </ClothingAwarenessCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClothingAwarenessChartDisposal from '@/components/clothing/ClothingAwarenessChartDisposal.vue'
import ClothingAwarenessChartMaterials from '@/components/clothing/ClothingAwarenessChartMaterials.vue'
import ClothingAwarenessChartSectors from '@/components/clothing/ClothingAwarenessChartSectors.vue'
import { fetchTextileYears, fetchTextileMaterials, fetchTextileDetails } from '@/utils/clothingAwarenessStasticsFetcher'
import RedUseHeader from '@/components/misc/RedUseHeader.vue'
import RedUseLoader from '@/components/misc/RedUseLoader.vue'
import RedUseErrorMessage from '@/components/misc/RedUseErrorMessage.vue'
import ClothingAwarenessCard from '@/components/clothing/ClothingAwarenessCard.vue'

const textileData = ref([])
const materialsData = ref([])
const detailsData = ref([])
const textileDataIndex = ref(0)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
    const [yearly, materials, details] = await Promise.all([
        fetchTextileYears(),
        fetchTextileMaterials(),
        fetchTextileDetails(),
    ])
    if (!yearly?.length || !materials?.length || !details?.length) {
        error.value = true
    } else {
        textileData.value = yearly ?? []
        materialsData.value = materials ?? []
        detailsData.value = details ?? []
    }
    loading.value = false
})
</script>

<style scoped>
.clothing-awareness-view {
    /* padding: 2rem; */
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
}

.view-title {
    margin-bottom: 1.0rem;
    text-align: center;
}

.charts-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
</style>
