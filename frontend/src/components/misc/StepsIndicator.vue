<template>
    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg_main text-white fw-bold fs-5 mb-3"
        style="width:3rem; height:3rem;">
        {{ index + 1 }}
    </div>
    <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
        <span v-if="step.emoji"></span>
        <i v-else :class="[step.icon, 'text-success']"></i>
        <span class="fw-semibold">{{ step.label }}</span>
    </div>
    <p class="text-muted small mb-0">{{ step.description }}</p>
</template>

<script setup>
defineProps({
    step: { type: Object, reqruied: true },
    index: { type: Number, default: 0 },
})
</script>