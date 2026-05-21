<template>
    <div v-if="!selected" :class="['capture-option', colClass]" @click="$emit('cardFuntion')">
        <!-- <span class="material-symbols-outlined icon-md">{{ icon }}</span> -->
        <span v-if="emoji">{{ emoji }}</span>
        <i v-if="iconName" class="icon-md" :class="iconName"></i>
        <span class="text-sm font-medium">{{ featureName }}</span>
    </div>

    <div v-else class="capture-option" style="background-color: #009387;" @click="$emit('cardFuntion')">
        <span v-if="emoji">{{ emoji }}</span>
        <i v-if="iconName" class="icon-md" :class="iconName"></i>
        <span class="text-sm font-medium text-white">{{ featureName }}</span>
    </div>

</template>

<script setup>
defineEmits(['cardFuntion']);

defineProps({
    featureName: {
        type: String,
        default: () => ("")
    },
    iconName: {
        type: String,
        default: () => ("")
    }, emoji: {
        type: String,
        default: ""
    },
    colClass: {
        type: String,
        default: () => ("col-12 col-md-3")
    },
    selected: {
        stype: Boolean,
        default: false
    }
})
</script>