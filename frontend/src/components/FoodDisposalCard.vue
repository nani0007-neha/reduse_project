<template>
    <div class="card h-100">
        <div class="card-header d-flex justify-content-between align-items-start gap-2">
            <span class="fw-bold">{{ method.label }}</span>
            <a v-if="method.source_link" :href="method.source_link" target="_blank" rel="noopener"
                class="text-nowrap small">Learn more (external link)</a>
        </div>
        <div class="card-body d-flex flex-column gap-2">
            <div>
                <span class="bg-success">{{ method.stream }}</span>
            </div>
            <p class="small mb-0">{{ method.steps }}</p>
            <p v-if="method.notes" class="small text-muted fst-italic mb-0">{{ method.notes }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    method: {
        type: Object,
        required: true,
    }
})
</script>