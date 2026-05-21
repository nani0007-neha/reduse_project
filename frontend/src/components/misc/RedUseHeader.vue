<template>
    <div style="min-height: 5vh; 
     text-align: center;">
        <label v-if="isSmall" class="text-center fw-normal w-100 fs-5">
            <span class="font-inter"><b>{{ inter }}</b></span>
            <span class="font-grace"> {{ grace }}</span>
            <span class="font-inter"><b>{{ interTwo }}</b></span>
        </label>
        <h1 v-else class="text-center display-5 fw-normal" style="padding-top: 3rem;">
            <span class="font-inter"><b>{{ inter }}</b></span>
            <span class="font-grace"> {{ grace }}</span>
            <span class="font-inter"><b>{{ interTwo }}</b></span>
        </h1>
        <p>
            {{ paragraph }}
        </p>

        <div class="mt-5" v-show="!collapsed">
            <slot></slot>
        </div>

        <i v-if="collapsed" class="pi pi-angle-down"></i>
    </div>
</template>

<script setup>
defineProps({
    inter: {
        type: String,
        default: () => ("")
    },
    grace: {
        type: String,
        default: () => ("")
    },
    interTwo: {
        type: String,
        default: () => ("")
    },
    paragraph: {
        type: String,
        default: () => ("")
    },
    isSmall: {
        type: Boolean,
        default: false
    }
})
</script>
