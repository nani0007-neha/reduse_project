<template>
    <div class="container" style="justify-content: center; align-items: center;">
        <div class="row mt-5">
            <label class="mb-5" style="text-align: center; font-size: 150%;">What do you have?</label>
            <button class="col-4 offset-4 btn btn-primary mb-5" @click="addToleftover">Add</button>
            <div class="d-flex flex-wrap justify-content-center  mb-2">
                <ul v-for="(leftover, index) in leftoverList" :key="index">
                    <div class="row">
                        <input class="col-5" type="text" v-model="leftoverList[index]"
                            @input="checkInput(leftoverList[index], index)">
                        <button class="col-4 btn btn-secoundary" @click="removeToleftover(leftover)">Remove</button>
                    </div>

                </ul>
            </div>
            <label class="mb-3" style="text-align: center; font-size: 150%;">Select your dietary type</label>
            <div class="col-6 offset-3 mb-5">
                <input type="text" class="form-control" v-model="dietaryFilter"
                    placeholder="e.g. Dessert, Soup, Chicken, Vegetarian..." />
                <div class="form-text text-center">leave blank for all</div>
            </div>

            <button class="col-4 offset-4 btn btn-primary mb-5" @click="searchRecipe"
                :disabled="searching">Search</button>
        </div>
        <div class="text-center">
            <i v-if="searching" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
        <div style="text-align: center; justify-content: center;">
            <label v-if="errormsg" style="color: crimson;">{{ errormsg }}</label>
        </div>
        <div>
            <div v-if="recipeSearchResults.length > 0" class="row">
                <div v-for="(result, index) in recipeSearchResults" :key="index" class="col-12 col-md-3"
                    @click="toRecipeDetailed(result)">
                    <RecipeCardOverview :recipe-json="result"></RecipeCardOverview>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Papa from 'papaparse';
import RecipeCardOverview from '@/components/RecipeCardOverview.vue';
import { routerPushWithBase } from '@/utils/routerManipulation';
import { useRouter } from 'vue-router';
import { selectedRecipe } from '@/utils/recipeSelector';

const leftoverList = ref([]);
const errormsg = ref("");
const searching = ref(false);
const recipeSearchResults = ref([]);
const allRecipes = ref([]);
const dietaryFilter = ref("");

onMounted(async () => {
    try {
        const res = await fetch(import.meta.env.BASE_URL + 'recipes.csv');
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        allRecipes.value = parsed.data;
        leftoverList.value.push("");
    } catch {
        errormsg.value = "Failed to load recipe data.";
    }
});

const router = useRouter();

const toRecipeDetailed = (recipeObject) => {
    router.push(routerPushWithBase("/recipeDetailed"))
    selectedRecipe.value = recipeObject
}


const addToleftover = () => {
    if (leftoverList.value.length >= 10) {
        errormsg.value = "Maximum 10 ingredients allowed.";
        return;
    }
    errormsg.value = "";
    leftoverList.value.push("");
}

function removeToleftover(item) {
    leftoverList.value = leftoverList.value.filter(i => i !== item);
}

function checkInput(value, index) {
    if (value.length > 50) {
        leftoverList.value[index] = value.slice(0, 50);
    }
}

function searchRecipe() {
    errormsg.value = "";
    const keywords = leftoverList.value
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);

    if (keywords.length === 0) {
        errormsg.value = "Please add at least one ingredient.";
        return;
    }

    searching.value = true;

    const scored = allRecipes.value
        .map(recipe => {
            const ingredientsLower = (recipe.ingredients || "").toLowerCase();
            const matched = keywords.filter(kw => ingredientsLower.includes(kw));
            return { ...recipe, matchCount: matched.length, matchedIngredients: matched };
        })
        .filter(r => r.matchCount > 0)
        .filter(r => {
            if (!dietaryFilter.value.trim()) return true;
            return (r.cuisine_path || "").toLowerCase().includes(dietaryFilter.value.trim().toLowerCase());
        })
        .sort((a, b) => {
            if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
            return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        })
        .slice(0, 20);

    recipeSearchResults.value = scored;
    searching.value = false;

    if (scored.length === 0) {
        errormsg.value = "No recipes found matching your ingredients.";
    }
}
</script>