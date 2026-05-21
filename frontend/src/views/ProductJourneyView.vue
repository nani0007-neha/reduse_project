<script setup>
/**
 * Hardcorded example items.
 */
import MainFunctionButton from '@/components/misc/MainFunctionButton.vue';
import RedUseHeader from '@/components/misc/RedUseHeader.vue';
import StepsIndicator from '@/components/misc/StepsIndicator.vue';
import RedUseLoader from '@/components/misc/RedUseLoader.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchProductJourney } from '@/utils/productjourneyFetcher';
import RedUseErrorMessage from '@/components/misc/RedUseErrorMessage.vue';
import RedUseAIAcknowledgement from '@/components/misc/RedUseAIAcknowledgement.vue';

const router = useRouter();

const popularItems = [
    { name: 'Plastic Bottle', icon: 'pi pi-star' },
    { name: 'T-shirt', icon: 'pi pi-star' },
    { name: 'Laptop', icon: 'pi pi-desktop' },
    { name: 'Chair', icon: 'pi pi-home' },
    { name: 'Shopping Bag', icon: 'pi pi-shopping-bag' },
]

const steps = [
    { icon: 'pi pi-search', label: 'Search for an item', description: 'Type any household product to get started.' },
    { icon: 'pi pi-map', label: 'We reveal its full journey', description: 'From raw materials to disposal, laid out clearly.' },
    { icon: 'pi pi-heart', label: 'Make mindful choices', description: 'Use what you learn to reduce your footprint.' },
]

const searchedItem = ref("")
const errormsg = ref("")
const searching = ref(false)

const search = async (itemName) => {
    const query = (itemName || searchedItem.value).trim()
    if (!query) return
    searching.value = true
    const result = await fetchProductJourney(query)
    searching.value = false
    if (result) {
        router.push({
            path: '/household/detailedjourney',
            state: { journeyData: result.journey, stale: result.stale, staleMessage: result.message }
        })
    }
}

const onEnter = () => {
    errormsg.value = "";
    if (searchedItem.value.length > 20) {
        errormsg.value = "This input is too long."
    }
}
</script>

<template>
    <RedUseHeader paragraph="Every item has a journey -- from where it begins,
        how it reaches you, to where it ends up.
        Search any household item to see its full story." inter="Uncover the hidden journey of " grace="any item "
        inter-two="you use">
    </RedUseHeader>

    <!-- Search for an item -->
    <div class="p-4 mb-4">
        <div class="col-12 row gap-1 justify-content-center">
            <div class="col-md-3 col-12">
                <input class="form-control" type="text" placeholder="e.g. chair, desk fan" v-model="searchedItem"
                    @input="onEnter()" @keyup.enter="search()" :disabled="searching">
            </div>
            <button class="btn btn-success fw-bold col-auto" @click="search()" :disabled="searching || errormsg != ''">
                <RedUseLoader :loading="searching" :imbeded="true" />
                <i v-if="!searching" class="pi pi-search me-2"></i>
                {{ searching ? 'Searching...' : 'Explore journey' }}
            </button>
        </div>
        <RedUseErrorMessage class="mt-3" :msg="errormsg"></RedUseErrorMessage>
    </div>

    <!-- Popular items to explore -->
    <div class="card p-4 mb-4">
        <h5 class="fw-bold mb-3">Popular items to explore</h5>
        <div class="row g-4 justify-content-center">
            <div v-for="item in popularItems" :key="item.name" class="col-6 col-md-2">
                <MainFunctionButton :feature-name="item.name" :icon-name="item.icon" col-class=""
                    @card-funtion="search(item.name)" />
            </div>
        </div>
    </div>

    <!-- How it works -->
    <div class="card p-4">
        <h5 class="fw-bold mb-4">How it works</h5>
        <div class="row text-center g-4">
            <div v-for="(step, i) in steps" :key="i" class="col-12 col-md-4">
                <StepsIndicator :index="i" :step="step"></StepsIndicator>
            </div>
        </div>
    </div>
    <RedUseAIAcknowledgement class="mb-5" style="max-width: 560px; margin: 0 auto;" context-one-label="AI Usage: "
        context-one=" We use Gemini AI to create hidden journies for items" context-two-label="Your Privacy: "
        context-two="We do not store your personal information, we simply cache user inputs to reduce token cost.">
    </RedUseAIAcknowledgement>
</template>
