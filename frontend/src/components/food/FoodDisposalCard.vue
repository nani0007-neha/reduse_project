<template>
    <div class="card h-100 text-center" v-if="method.source_link">
        <div class="card-body d-flex flex-column align-items-center gap-2 p-3">
            <span class="material-symbols-outlined fs-1">
                {{ icon }}
            </span>
            <!-- Label -->
            <b class="lh-sm">
                {{ parsed.main }}
                <span v-if="parsed.sub" class="d-block fw-normal small text-muted">({{ parsed.sub }})</span>
            </b>

            <!-- Divider -->
            <hr class="w-100 my-1">

            <!-- Stream -->
            <label :class="streamColor" class="small fw-semibold mb-0">{{ method.stream }}</label>

            <!-- Notes -->
            <span v-if="method.notes" class="text-muted small fst-italic">~ {{ method.notes }}</span>

        </div>
        <!-- Links -->
        <span class="clickable mb-1" @click="openLink(method.source_link)"
            style="text-decoration: underline; font-size: 75%; color: #009387;">Learn More
            <i class="pi pi-external-link" style="font-size: 75%; color: #009387;"></i></span>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { parseLabel } from '@/utils/labelParser'

const props = defineProps({
    method: { type: Object, required: true },
    streamColor: { type: String, default: 'text-secondary' },
    icon: { type: String, default: 'nest_eco_leaf' }
})

const parsed = computed(() => parseLabel(props.method.label))

const openLink = (link) => {
    if (link) window.open(link, '_blank')
}
</script>

<style scoped>
.clickable {
    cursor: pointer;
    transition: background-color 0.15s;
}

.clickable:hover {
    background-color: #f5f5f5;
}
</style>