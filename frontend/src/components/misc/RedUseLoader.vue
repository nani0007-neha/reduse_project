<template>
    <template v-if="loading">
        <!-- Embedded: keep original small inline spinner -->
        <i v-if="imbeded" class="pi pi-spin pi-spinner font-main text-start text-white m-2"
            style="font-size: 1em; vertical-align: middle;"></i>

        <!-- Standalone: full ClothingDecodeLoading-style spinner -->
        <div v-else class="ru-loader-container">
            <div class="ru-spinner-ring">
                <svg viewBox="0 0 80 80" class="ru-spinner-svg">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E5DF" stroke-width="6" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#009387" stroke-width="6" stroke-linecap="round"
                        stroke-dasharray="60 154" class="ru-spinner-arc" />
                </svg>
                <span class="material-symbols-outlined ru-spinner-icon">psychiatry</span>
            </div>
        </div>
    </template>
</template>

<script setup>
defineProps({
    loading: { type: Boolean, required: true },
    imbeded: { type: Boolean, default: false },
})
</script>

<style scoped>
.ru-loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
}

.ru-spinner-ring {
    position: relative;
    width: 96px;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ru-spinner-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 96px;
    height: 96px;
}

.ru-spinner-arc {
    transform-origin: center;
    animation: ru-spin 1.2s linear infinite;
}

@keyframes ru-spin {
    to {
        transform: rotate(360deg);
    }
}

.ru-spinner-icon {
    font-size: 3em;
    color: #009387;
    z-index: 1;
}
</style>