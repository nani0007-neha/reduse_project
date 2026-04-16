<template>
    <div class="container py-5">
        <div class="row g-4 justify-content-center">

            <!-- Recipe portal -->
            <div class="col-12 col-md-6 col-lg-5">
                <div class="card border-0 shadow-sm overflow-hidden h-100">
                    <div class="position-relative">
                        <img src="../assets/FoodMainOne.png" alt="Leftover Recipes"
                            class="card-img-top object-fit-cover" style="height: 260px;">
                    </div>
                    <div class="card-body d-flex flex-column gap-2">
                        <h5 class="card-title fw-bold font_sub mb-0">Kitchen-raid Recipes</h5>
                        <p class="card-text text-muted small">Turn what's already in your home into a proper meal.
                            Search by ingredients you have on hand.</p>
                        <button class="btn mt-auto align-self-start px-4 fw-semibold"
                            style="background-color: darkgreen; color: white; border-radius: 2rem;" @click="toFoodOne">
                            Explore →
                        </button>
                    </div>
                </div>
            </div>

            <!-- Disposal portal -->
            <div class="col-12 col-md-6 col-lg-5">
                <div class="card border-0 shadow-sm overflow-hidden h-100">
                    <div class="position-relative">
                        <img src="../assets/FoodMainTwo.png" alt="Food Disposal" class="card-img-top object-fit-cover"
                            style="height: 260px;">
                    </div>
                    <div class="card-body d-flex flex-column gap-2">
                        <h5 class="card-title fw-bold font_sub mb-0">Food Disposal</h5>
                        <p class="card-text text-muted small">Not sure what bin it goes in? Find the right disposal
                            method for every type of food waste.</p>
                        <button class="btn mt-auto align-self-start px-4 fw-semibold"
                            style="background-color: darkgreen; color: white; border-radius: 2rem;" @click="toFoodTwo">
                            Explore →
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { routerPushWithBase } from '@/utils/routerManipulation';
import { useRouter } from 'vue-router';

const router = useRouter();

const toFoodOne = () => router.push(routerPushWithBase("/food1"))
const toFoodTwo = () => router.push(routerPushWithBase("/food2"))
</script>
