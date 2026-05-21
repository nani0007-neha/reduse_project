<template>
    <div class="d-flex justify-content-center">
        <div class="card m-2 custom-recipe-card" style="width: 20rem;">
            <img v-if="recipeJson.img_src" :src="recipeJson.img_src" class="card-img-top"
                :alt="recipeJson.recipe_name" />

            <div class="card-body d-flex flex-column p-4">
                <h5 class="card-title fw-normal mb-3 text-dark">{{ recipeJson.recipe_name }}</h5>

                <div class="d-flex flex-wrap gap-2 mb-3">
                    <div v-if="recipeJson.total_time" class="recipe-badge">
                        <i class="pi pi-clock me-1"></i> {{ recipeJson.total_time }}
                    </div>

                    <div v-if="recipeJson.difficulty" class="recipe-badge">
                        <i class="pi pi-chart-bar me-1"></i> {{ recipeJson.difficulty }}
                    </div>

                    <div v-if="recipeJson.protein_class" class="recipe-badge">
                        <span class="material-symbols-outlined">humerus_alt</span> {{ recipeJson.protein_class }}
                    </div>

                    <div v-if="recipeJson.fat_class" class="recipe-badge">
                        <span class="material-symbols-outlined">water_drop</span> {{ recipeJson.fat_class }}
                    </div>
                </div>


                <div class="mt-auto pt-2">
                    <a href="javascript:void(0)" class="filter-toggle small fw-bold d-inline-flex align-items-center">
                        View Recipe
                        <i class="pi pi-arrow-right ms-1" style="font-size: 0.8rem;"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup>
defineProps({
    recipeJson: {
        type: Object,
        default: () => ({})
    },
})
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 8rem;
    min-height: 27rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: visible;
}

.card-img-top {
    width: 100%;
    height: 10rem;
    object-fit: cover;
    flex-shrink: 0;
}

.card-header {
    background-color: white;
    color: black;
    padding: 10px;
}

.difficulty-section {
    flex-grow: 1;
}

.card-body ul,
.card-body ol {
    padding-left: 1.2rem;
    margin-bottom: 0;
}


.material-symbols-outlined {
    font-size: 1.1em !important;
    margin-right: 1px;
    display: inline-block;
    transform: translateY(2px);
}

.pi {
    font-size: 0.9em;
}


.filter-toggle {
    color: #009387;
    transition: color 0.2s ease-in-out;
    text-decoration: none;
}

.filter-toggle:hover {
    color: #007f70;
}

.filter-toggle:hover .pi-arrow-right {
    transform: translateX(3px);
}

.pi-arrow-right {
    transition: transform 0.2s;
}

.recipe-badge {
    border: 1px solid #e0e0e0;
    border-radius: 7px;
    padding: 4px 12px;
    font-size: 0.85rem;
    color: #444;
    background-color: #ffffff;
}

.recipe-badge .pi,
.recipe-badge .material-symbols-outlined {
    margin-right: 6px;
}
</style>