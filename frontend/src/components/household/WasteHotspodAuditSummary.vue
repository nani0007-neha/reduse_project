<template>
    <div style="display:flex;flex-direction:column;height:100%;">
        <!-- Header -->
        <div
            style="padding:1rem 1.125rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
            <div>
                <h3 style="font-size:0.9375rem;font-weight:800;color:#111827;margin:0 0 2px;">Your Waste Profile</h3>
            </div>
            <button @click="$emit('closePanel')"
                style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;">✕</button>
        </div>

        <p class="w-100 p-1" style="text-align: start; font-size: 75%;">{{
            summaryMsg }}</p>

        <!-- Scrollable content -->
        <div style="flex:1;overflow-y:auto;padding:0 1.125rem 0.75rem;">

            <!-- PRIMARY HOTSPOT -->
            <div v-if="hotspotRanking[0]"
                style="background:#fff1f1;border:1.5px solid #fecaca;border-radius:14px;padding:1rem;margin-bottom:0.5rem;">
                <div style="display:flex;align-items:flex-start;gap:0.625rem;margin-bottom:0.5rem;">
                    <span style="font-size:1.5rem;flex-shrink:0;line-height:1;margin-top:2px;">{{ hotspotRanking[0].icon
                        }}</span>
                    <div style="flex:1;min-width:0;">
                        <div style="display:flex;align-items:center;gap:0.375rem;margin-bottom:2px;">
                            <span
                                style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#dc2626;background:#fee2e2;padding:2px 6px;border-radius:4px;">Primary
                                hotspot</span>
                        </div>
                        <p class="text-black w-100">{{ hotspotRanking[0].band.title }}</p>
                    </div>
                    <div
                        style="background:white;border:1px solid #fecaca;border-radius:9999px;padding:3px 8px;flex-shrink:0;">
                        <span style="font-size:0.5625rem;font-weight:800;color:#dc2626;">{{ hotspotRanking[0].score
                            }}<span style="color:#fca5a5;">/{{ hotspotRanking[0].maxScore }}</span></span>
                    </div>
                </div>
                <p class="w-100 text-black" style="font-size: 75%;">{{ hotspotRanking[0].band.body }}</p>
                <div style="display:flex;flex-direction:column;gap:0.35rem;">
                    <div v-for="(tip, i) in hotspotRanking[0].band.tips" :key="i"
                        style="display:flex;gap:0.5rem;align-items:flex-start;">
                        <div
                            style="width:4px;height:4px;border-radius:50%;background:#dc2626;margin-top:7px;flex-shrink:0;" />
                        <p class="w-100 text-black" style="font-size: 60%;">{{ tip }}</p>
                    </div>
                </div>
            </div>

            <!-- SECONDARY HOTSPOT -->
            <div v-if="hotspotRanking[1]"
                style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:14px;padding:0.875rem;margin-bottom:0.625rem;">
                <div style="display:flex;align-items:flex-start;gap:0.5rem;margin-bottom:0.375rem;">
                    <span style="font-size:1.125rem;flex-shrink:0;line-height:1;margin-top:2px;">{{
                        hotspotRanking[1].icon
                        }}</span>
                    <div style="flex:1;min-width:0;">
                        <div style="margin-bottom:2px;">
                            <span
                                style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#d97706;background:#fef3c7;padding:2px 6px;border-radius:4px;">Secondary
                                hotspot</span>
                        </div>
                        <p class="text-black w-100">{{
                            hotspotRanking[1].band.title }}</p>
                    </div>
                    <div
                        style="background:white;border:1px solid #fde68a;border-radius:9999px;padding:3px 8px;flex-shrink:0;">
                        <span style="font-size:0.5625rem;font-weight:800;color:#d97706;">{{ hotspotRanking[1].score
                            }}<span style="color:#fbbf24;">/{{ hotspotRanking[1].maxScore }}</span></span>
                    </div>
                </div>
                <p class="text-black w-100" style="font-size: 75%;">{{
                    hotspotRanking[1].band.body }}</p>
                <div style="display:flex;flex-direction:column;gap:0.3rem;">
                    <div v-for="(tip, i) in hotspotRanking[1].band.tips.slice(0, 2)" :key="i"
                        style="display:flex;gap:0.5rem;align-items:flex-start;">
                        <div
                            style="width:4px;height:4px;border-radius:50%;background:#d97706;margin-top:7px;flex-shrink:0;" />
                        <p class="text-black w-100" style="font-size: 60%;">{{ tip }}</p>
                    </div>
                </div>
            </div>

            <!-- All 5 categories ranked -->
            <p
                style="font-size:0.4375rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9ca3af;margin:0.5rem 0 0.375rem;">
                All categories ranked</p>
            <div v-for="(cat, i) in hotspotRanking" :key="cat.key"
                style="display:flex;align-items:center;gap:0.5rem;background:#f8faf8;border:1px solid #eef1ee;border-radius:9px;padding:0.4375rem 0.625rem;margin-bottom:0.25rem;">
                <span
                    style="font-size:0.5rem;font-weight:800;color:#9ca3af;width:14px;text-align:center;flex-shrink:0;">#{{
                        i + 1 }}</span>
                <span style="font-size:0.875rem;flex-shrink:0;">{{ cat.icon }}</span>
                <span style="font-size:0.75rem;font-weight:600;color:#111827;flex:1;min-width:0;line-height:1.3;">{{
                    cat.label }}</span>
                <div
                    :style="{ background: SCORE_CFG[cat.level].bg, border: `1px solid ${SCORE_CFG[cat.level].color}44`, borderRadius: '9999px', padding: '2px 8px', flexShrink: 0 }">
                    <span :style="{ fontSize: '0.4375rem', fontWeight: 700, color: SCORE_CFG[cat.level].color }">{{
                        cat.score
                        }}/{{ cat.maxScore }}</span>
                </div>
            </div>

        </div>

        <!-- Footer -->
        <div style="padding:0.75rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;">
            <button @click="$emit('reset')"
                style="width:100%;background:transparent;border:1.5px solid #e5e7eb;border-radius:11px;padding:10px;font-size:0.8125rem;font-weight:700;color:#6b7280;cursor:pointer;font-family:Inter,sans-serif;">Start
                Over →</button>
        </div>
    </div>
</template>

<script setup>
import { SCORE_CFG } from '@/utils/householdHotspotStaticData';

defineEmits(['closePanel', 'reset']);

defineProps({
    summaryMsg: { type: String, required: true },
    hotspotRanking: { type: Array, required: true },
});
</script>