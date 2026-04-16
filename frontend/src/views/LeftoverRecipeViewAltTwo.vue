<template>
    <RecipeFilterSidebar />
    <div class="d-flex" style="min-height: 100vh;">
        <div class="flex-grow-1 container" style="justify-content: center; align-items: center;">
            <div class="row mt-5">
                <div class="col-8 offset-2 col-md-4 offset-md-4 d-flex gap-2 mb-3">
                    <button class="btn btn-primary flex-fill button_main" style="background-color: darkgreen;"
                        @click="applyFilters" :disabled="searching">
                        Search Recipes</button>
                </div>
            </div>

            <div class="row g-3 justify-content-center">
                <div class="col-12 col-md-5">
                    <input class="form-control" type="text" placeholder="*Enter ingredients, separate with comma"
                        v-model="ingredientInputString" @input="onInputStringChanged">
                </div>
                <div class="col-12 col-md-5">
                    <input class="form-control" type="text"
                        placeholder="Enter ingredients to exclude, separate with comma"
                        v-model="ingrediantInputStringExclusive" @input="onInputStringExclusiveChanged">
                </div>
            </div>
            <div class="text-center">
                <i v-if="searching || modalLoading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </div>
            <div style="text-align: center; justify-content: center;">
                <label v-if="errormsg" style="color: crimson;">{{ errormsg }}</label>
            </div>

            <!-- Popup recipe card -->
            <Teleport to="body">
                <div v-if="modalRecipe" class="recipe-modal-backdrop" @click.self="modalRecipe = null">
                    <div class="recipe-modal-dialog">
                        <button class="recipe-modal-close btn btn-sm btn-light" @click="modalRecipe = null">
                            <i class="pi pi-times"></i>
                        </button>
                        <div class="recipe-modal-body">
                            <RecipeCardDetailed :recipe-json="modalRecipe" />
                        </div>
                    </div>
                </div>
            </Teleport>

            <div>
                <div v-if="recipeSearchResults.length > 0" class="row">
                    <div v-for="(result, index) in normalizedResults" :key="index" class="col-12 col-md-3 g-2"
                        @click="openModal(result)" style="cursor: pointer;">
                        <RecipeCardOverview :recipe-json="result"></RecipeCardOverview>
                    </div>
                </div>
                <!-- Pagination controls -->
                <div v-if="totalPages > 1"
                    class="d-flex justify-content-center align-items-center gap-2 mt-4 mb-4 flex-wrap">
                    <button class="btn btn-outline-primary btn-sm button_sub" :disabled="currentPage === 1"
                        @click="goToPage(currentPage - 1)">&laquo; Prev</button>
                    <template v-for="page in pageRange" :key="page">
                        <span v-if="page === '...'" class="px-2">…</span>
                        <button v-else class="btn btn-sm" @click="goToPage(page)">{{
                            page }}</button>
                    </template>
                    <button class="btn btn-outline-primary btn-sm button_sub" :disabled="currentPage === totalPages"
                        @click="goToPage(currentPage + 1)">Next &raquo;</button>
                </div>
                <div v-if="filteredResults.length > 0" class="text-center text-muted mb-3" style="font-size:0.9rem;">
                    Showing {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize,
                        filteredResults.length) }} of
                    {{ filteredResults.length }} results
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import RecipeCardOverview from '@/components/RecipeCardOverview.vue';
import RecipeCardDetailed from '@/components/RecipeCardDetailed.vue';
import RecipeFilterSidebar from '@/components/RecipeFilterSidebar.vue';
import { fetchRecipeOverview, fetchRecipeDetailed } from '@/utils/recipeFetcher';
import { passesFilters } from '@/utils/recipeFilterInstance';

const errormsg = ref("");
const searching = ref(false);
const recipeSearchResults = ref([]);
const currentPage = ref(1);
const pageSize = 20;
const modalRecipe = ref(null);
const modalLoading = ref(false);
const ingredientInputString = ref("");
const ingrediantInputStringExclusive = ref("");

const totalPages = computed(() => Math.ceil(filteredResults.value.length / pageSize));

const filteredResults = computed(() => recipeSearchResults.value.filter(passesFilters))

watch(filteredResults, (filtered) => {
    if (recipeSearchResults.value.length > 0 && filtered.length === 0) {
        errormsg.value = "No recipes found for the given ingredients and filters."
    } else if (filtered.length > 0) {
        errormsg.value = ""
    }
})

const normalizedResults = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredResults.value.slice(start, start + pageSize);
});

const pageRange = computed(() => {
    const total = totalPages.value;
    const cur = currentPage.value;
    const pages = [];
    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        pages.push(1);
        if (cur > 3) pages.push('...');
        for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
        if (cur < total - 2) pages.push('...');
        pages.push(total);
    }
    return pages;
});

const onInputStringChanged = () => {
    const raw = ingredientInputString.value.trim();
    if (!raw) {
        errormsg.value = "";
        recipeSearchResults.value = [];
        return;
    }
    if (!raw.includes(',') && raw.includes(' ')) {
        errormsg.value = "Please separate ingredients with a comma";
        return;
    }
    errormsg.value = "";
};

const onInputStringExclusiveChanged = () => {
    const raw = ingrediantInputStringExclusive.value.trim();
    if (!raw) {
        errormsg.value = "";
        ingrediantInputStringExclusive.value = "";
        return;
    }
    if (!raw.includes(',') && raw.includes(' ')) {
        errormsg.value = "Please separate ingredients with a comma";
        return;
    }
    errormsg.value = "";
};


const goToPage = (page) => {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const openModal = async (recipeObject) => {
    modalRecipe.value = null;
    modalLoading.value = true;
    modalRecipe.value = await fetchRecipeDetailed(recipeObject.id);
    modalLoading.value = false;
};

async function applyFilters() {
    const ingredientToIncludeRaw = ingredientInputString.value.trim();
    if (!ingredientToIncludeRaw) {
        errormsg.value = "Please enter at least one ingredient.";
        return;
    }
    const ingredientToExcludeRaw = ingrediantInputStringExclusive.value.trim();
    errormsg.value = "";
    searching.value = true;
    const results = await fetchRecipeOverview(ingredientToIncludeRaw, ingredientToExcludeRaw);
    recipeSearchResults.value = results;
    currentPage.value = 1;
    searching.value = false;
    if (results.length <= 0) {
        errormsg.value = "No recipes found for the given ingredients and filters.";
    }
}
</script>

<style scoped>
.recipe-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    padding: 1rem;
}

.recipe-modal-dialog {
    position: relative;
    max-width: 56rem;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 12px;
    background: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.recipe-modal-close {
    position: sticky;
    top: 0.5rem;
    float: right;
    margin: 0.5rem 0.5rem 0 0;
    z-index: 10;
}

.recipe-modal-body {
    padding: 0.5rem 0 1rem;
}
</style>
