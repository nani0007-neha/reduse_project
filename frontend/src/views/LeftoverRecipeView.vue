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
            <button class="col-4 offset-4 btn btn-primary mb-5" @click="generateRecipe"
                :disabled="generating">Generate</button>
        </div>
        <div class="text-center">
            <i v-if="generating" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
        <div style="text-align: center; justify-content: center;">
            <label v-if="errormsg" style="color: crimson;">{{ errormsg }}</label>
        </div>
        <div>
            <RecipeCard v-if="currentRecipe.difficulty" :recipe-json="currentRecipe"></RecipeCard>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { GoogleGenAI } from "@google/genai";
// import RecipeCard from '@/components/RecipeCard.vue';


const leftoverList = ref([]);
const errormsg = ref("");
const generating = ref(false);
const currentRecipe = ref({
    title: "",
    time: "",
    difficulty: "",
    steps: []
});

let ai = null;
const getAI = () => {
    if (!ai) {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Gemini API key is not configured.");
        }
        ai = new GoogleGenAI({ apiKey });
    }
    return ai;
};

// Template for the AI response structure
const templateJson = {
    title: "",
    time: "",
    difficulty: "",
    steps: []
};

// Clears the error message
const clearErrorMsg = () => {
    errormsg.value = "";
};

// Add item to ingrediants
const addToleftover = () => {
    let newItem = "";
    clearErrorMsg()
    if (leftoverList.value.length < 10) {
        leftoverList.value.push(newItem)
        return;
    }
    errormsg.value = "You can only input 10 ingrediants!"

}

// Remove item from ingrediants
const removeToleftover = (item) => {
    clearErrorMsg()
    if (leftoverList.value.length > 1) {
        leftoverList.value.pop(item)
        return;
    }

    errormsg.value = "At leat 1 ingrediant is required"
}

// Check input length
const checkInput = (userInput, index) => {
    let result = userInput.length < 50
    clearErrorMsg()
    if (!result) {
        errormsg.value = "You cannot enter a string that is longer than 50"
    }
    if (leftoverList.value[index]) {
        leftoverList.value[index] = leftoverList.value[index].slice(0, 50)
    }
    return result

}

const generateRecipe = async () => {

    // Validate input
    clearErrorMsg();
    if (leftoverList.value[0] == "") {
        errormsg.value = "Make sure the first ingrediant is not empty!"
        return;
    }
    generating.value = true
    try {
        let ingrediants = leftoverList.value.toString()
        console.log("Ingrediants: " + leftoverList.value.toString())

        // Call gemini 2.5 API
        const response = await getAI().models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Your job is to create a recipe based on a list of leftover ingredients.
            Respond ONLY with a JSON object wrapped in <Json></Json> tags, matching this template exactly:
            ${JSON.stringify(templateJson, null, 2)}
            Where:
            - title: name of the recipe (string)
            - time: estimated cooking time e.g. "30 minutes" (string)
            - difficulty: one of "Easy", "Medium", or "Hard" (string)
            - steps: ordered list of cooking instructions, including time (array of strings)
              Return "Invalid Input" for every field if you encounter any empty or invalid words;
            Return "Improper ingrediant" for every field if you encounter ingrediant that cannot be used for cooking;
            Ingredients list: ${ingrediants}.`,
        });

        // Extract JSON from between <Json></Json> tags
        const raw = response.text;
        const match = raw.match(/<Json>([\s\S]*?)<\/Json>/i);
        if (match) {
            // Strip markdown code fences if present
            const cleaned = match[1].trim().replace(/^```[\w]*\n?/, "").replace(/```$/, "").trim();
            const recipe = JSON.parse(cleaned);
            currentRecipe.value = recipe;
            console.log("Recipe JSON:", recipe);
        } else {
            console.warn("No <Json> block found in response:", raw);
        }
    } catch (e) {
        errormsg.value = e.message || "Failed to generate recipe.";
    }
    generating.value = false
}


onMounted(() => {
    addToleftover("")
});
</script>