<template>
    <div class="d-flex flex-column h-100">
        <!-- Header -->
        <div
            style="padding:0.875rem 1.125rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:0.5625rem;flex-shrink:0;">
            <div
                style="width:1.875rem;height:1.875rem;border-radius:8px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;font-size:0.9375rem;flex-shrink:0;">
                {{ activeRoom.icon }}</div>
            <div style="flex:1;min-width:0;">
                <p style="width: 100%; font-size:0.875rem;font-weight:800;color:#111827;margin:0;line-height:1.2;">{{
                    activeRoom.name
                }} complete</p>
                <p style="width: 100%; font-size:0.5625rem;color:#9ca3af;margin:0;">{{ completed.size }} of {{
                    ROOM_ORDER.length }}
                    rooms audited</p>
            </div>
            <button @click="$emit('closePanel')"
                style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;flex-shrink:0;">✕</button>
        </div>

        <!-- Central success visual -->
        <div
            style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.25rem 1.25rem 0.75rem;gap:1rem;overflow-y:auto;">

            <!-- Animated checkmark -->
            <div style="position:relative;width:72px;height:72px;">
                <div
                    style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#dcfce7,#bbf7d0);border:2px solid #86efac;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px rgba(134,239,172,0.12),0 4px 24px rgba(74,222,128,0.2);">
                    <span style="font-size:2rem;line-height:1;">✓</span>
                </div>
            </div>

            <!-- Message -->
            <div style="text-align:center;">
                <p class="text-black">
                    {{ completed.size === ROOM_ORDER.length ? 'All rooms complete!' : 'Room audited!' }}
                </p>
                <p style="font-size: 75%; width: 100%;">
                    {{ completed.size === ROOM_ORDER.length
                        ? 'Your full waste hotspot profile is ready to view.'
                        : `${ROOM_ORDER.length - completed.size} room${ROOM_ORDER.length - completed.size > 1 ? 's' : ''}
                    left
                    — or see this room\'s results first.` }}
                </p>
            </div>

            <!-- Room progress strip -->
            <div style="display:flex;align-items:center;gap:0.3rem;margin-top:0.25rem;">
                <template v-for="(id, i) in ROOM_ORDER" :key="'sp-' + id">
                    <div :style="{
                        width: completed.has(id) ? '1.5rem' : '0.35rem',
                        height: '0.35rem', borderRadius: '9999px', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                        background: completed.has(id) ? '#16a34a' : '#e5e7eb'
                    }" />
                    <div v-if="i < ROOM_ORDER.length - 1"
                        :style="{ width: '0.625rem', height: '1.5px', borderRadius: '9999px', background: completed.has(id) ? '#4ade80' : '#e5e7eb', transition: 'background 0.4s' }" />
                </template>
            </div>
        </div>

        <!-- Two action buttons -->
        <div
            style="padding:0.875rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;display:flex;flex-direction:column;gap:0.4375rem;">

            <!-- Primary: continue -->
            <button @click="$emit('continueFromSubmitted')" class="questionaireButton">
                <span>{{ completed.size === ROOM_ORDER.length ? 'See Full Hotspot Profile' : `Next:
                    ${ROOMS[nextRoom].name}`
                }}</span>
                <span style="opacity:0.85;">→</span>
            </button>

            <!-- Secondary: see this room's result -->
            <button @click="$emit('updatePanelMode', 'results')" class="questionaireButton questionaireSubButton">
                <span>See {{ activeRoom.name }} results</span>
                <span style="font-size:0.75rem;color:#9ca3af;">›</span>
            </button>

        </div>
    </div>
</template>

<script setup>
import { ROOM_ORDER } from '@/utils/householdRoomVisualizationStaticData';
import { ROOMS } from '@/utils/householdQuestionnaireStaticData';

defineEmits(['closePanel', 'continueFromSubmitted', 'updatePanelMode']);

defineProps({
    activeRoom: { type: Object },
    completed: { type: Set },
    panelMode: { type: String },
    nextRoom: { type: String }
});
</script>