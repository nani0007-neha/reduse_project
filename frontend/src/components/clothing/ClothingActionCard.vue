<template>
    <div class="h-100" style="display: flex; justify-content: center; align-items: stretch; width: 100%;">
        <div class="card gap-4 col-12 h-100" style="justify-content: space-between; align-items: center; text-align: center; flex-direction: column;
            background-color: #fff; padding: 3% 5% 5% 5%;">
            <div v-if="icon" style="padding-top: 1rem;">
                <i :class="icon" style="font-size: 2rem; color: #009387;"></i>
            </div>
            <h1 style="font-weight: bold;">{{ title }}</h1>
            <label v-if="description" style="color: #555; width: 75%;">{{ description }}</label>
            <div class="row gap-2 mb-3" style="width: 100%; justify-content: center;">
                <button class="questionaireButton" @click="onLeftClick">{{ leftButtonLabel }}</button>
                <!-- <button class="questionaireButton questionaireSubButton" @click="onRightClick">{{ rightButtonLabel
                    }}</button> -->
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    icon: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    leftButtonLabel: { type: String, required: true },
    rightButtonLabel: { type: String, required: true },
    onLeftClick: { type: Function, required: true },
    onRightClick: { type: Function, required: true },
})
</script>
