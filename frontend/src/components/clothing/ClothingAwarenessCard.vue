<template>
    <div class="d-flex align-items-stretch gap-3">
        <div class="flex-grow-1 min-w-0">
            <slot></slot>
        </div>

        <div class="rounded-4 p-4 text-start shadow-sm" style="min-width:230px;max-width:280px;" :style="auraColor">
            <!-- Header -->
            <div class="d-flex align-items-center gap-2 mb-3">
                <span class="d-inline-flex align-items-center justify-content-center rounded-2 p-2">
                    <i :class="iconName" :style="color"></i>
                </span>
                <span class="text-uppercase fw-bold small" :style="color">{{ title }}</span>
            </div>

            <!-- Stat -->
            <label class="fw-bold mb-3" style="color:black;">{{ insights }}</label>

            <!-- Badge mini-card -->
            <div v-if="badge" class="d-flex align-items-center gap-2 rounded-3 px-3 py-2 mb-3"
                style="background:rgba(150, 150, 150, 0.20);">
                <i :class="badgeIcon" :style="color" class="small flex-shrink-0"></i>
                <span class="small fw-semibold" style="line-height:1.3" :style="color">{{ badge }}</span>
            </div>

            <hr style="border-color:rgba(1,105,111,0.2);opacity:1" class="my-0 mb-3" />

            <small class="text-secondary lh-base">{{ description }}</small>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: { type: String, default: "Key Insight" },
    insights: { type: String, default: "" },
    description: { type: String, default: "" },
    badge: { type: String, default: "" },
    badgeIcon: { type: String, default: "pi pi-arrow-up-right" },
    iconName: { type: String, default: "pi pi-chart-line" },
    color: { type: String, default: "color:#01696F" },
    auraColor: { type: String, default: "background-color:#f0fffc" },
    badgeAuraColor: { type: String, default: "background-color:#f0fffc border:1.5px solid rgba(225,225,225.25)" },
})
</script>
