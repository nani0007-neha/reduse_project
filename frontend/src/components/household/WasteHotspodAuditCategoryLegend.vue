<template>
    <div style="padding:0.875rem 1rem; border-bottom:1px solid #f3f4f6;">
        <p
            style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.5rem;">
            5 Hotspot Categories</p>
        <div style="display:flex; flex-direction:column; gap:0.3rem;">
            <div v-for="(cat, key) in HOTSPOT_CATEGORIES" :key="key"
                style="display:flex; align-items:center; gap:0.4rem;">
                <span style="font-size:0.75rem; flex-shrink:0;">{{ cat.icon }}</span>
                <span style="font-size:0.5625rem; color:#6b7280; line-height:1.4;">{{ cat.label }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HOTSPOT_CATEGORIES } from '@/utils/householdHotspotStaticData';
</script>
