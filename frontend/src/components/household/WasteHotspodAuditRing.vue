<template>
    <!-- Eco Score ring -->
    <div style="padding:1.125rem 1.125rem 1rem; border-bottom:1px solid #f3f4f6;">
        <div style="display:flex; align-items:center; gap:0.875rem;">
            <div style="position:relative; width:68px; height:68px; flex-shrink:0;">
                <svg width="68" height="68" viewBox="0 0 68 68">
                    <circle cx="34" cy="34" r="27" fill="none" stroke="#f0f9f4" stroke-width="5.5" />
                    <circle cx="34" cy="34" r="27" fill="none" stroke="#01696F" stroke-width="5.5"
                        stroke-linecap="round" :stroke-dasharray="170"
                        :stroke-dashoffset="170 * (1 - sustainabilityScore / 100)" transform="rotate(-90 34 34)"
                        style="transition:stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1);" />
                </svg>
                <p style="width: 100%; font-size: 60%;">Household Eco Score</p>
                <div
                    style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                    <span style="font-size:1.125rem;font-weight:800;color:#01696F;line-height:1;">{{ sustainabilityScore
                        }}</span>
                    <span style="font-size:0.4375rem;color:#9ca3af;font-weight:600;">/100</span>
                </div>
            </div>
            <div style="flex:1;min-width:0;">
                <p class="text-black text-start" style="width: 100%;">
                    {{ scoreMessage }}</p>
                <div style="display:flex;align-items:center;gap:0.375rem;">
                    <div style="flex:1;height:3px;background:#f0f9f4;border-radius:9999px;overflow:hidden;">
                        <div
                            :style="{ width: completedPct + '%', height: '100%', background: 'linear-gradient(90deg,#fff,#01696F)', borderRadius: '9999px', transition: 'width 0.7s ease' }" />
                    </div>
                    <span style="font-size:0.5rem;font-weight:700;color:#01696F;white-space:nowrap;">{{ completed.size
                        }}/6 rooms</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    sustainabilityScore: { type: Number },
    scoreMessage: { type: String },
    completedPct: { type: Number },
    completed: { type: Set }
})
</script>