<template>
    <div style="display:flex; flex-direction:column; height:100%;">
        <!-- Room result header -->
        <div class="flex-row d-flex">
            <div class="col-1">{{ activeRoom.icon }}</div>
            <label class="col-5">{{ activeRoom.name }} Results
            </label>
            <button class="col-1 offset-4 btn" @click="$emit('closePanel')">✕</button>
        </div>

        <div style="flex:1;overflow-y:auto;padding:0.875rem 1.125rem;">

            <!-- Top hotspot badge for this room -->
            <div v-if="topRoomHotspot" style="text-align: center;">
                <span style="font-size:1.375rem;flex-shrink:0;">{{ topRoomHotspot.icon }}
                    <p style="font-size: 75%;">{{ topRoomHotspot.label }}
                    </p>
                </span>

            </div>

            <!-- Result summary card -->
            <div style="text-align: center;">
                <h4>{{ roomResult.title }}
                </h4>
                <p style="font-size: 75%; width: 110%;">{{ roomResult.body }}</p>
            </div>

            <!-- What to try -->
            <div style="text-align: center;">
                <p style="text-transform:uppercase; font-size: 75%;">
                    What to try</p>
                <div v-for="(tip, i) in roomResult.tips" :key="i" style="display: flex; justify-content: center;">
                    <span style="font-size: 75%;">{{ i + 1 }}</span>
                    <p style="font-size:0.75rem; margin:0;">{{ tip }}</p>
                </div>
            </div>
        </div>

        <div
            style="padding:0.75rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;display:flex;flex-direction:column;gap:0.3rem;">
            <button @click="$emit('handleBack')" class="questionaireButton">
                {{ completed.size < ROOM_ORDER.length ? '← Back to House' : 'See Hotspot Profile →' }} </button>
                    <button @click="$emit('retakeRoom')" class="questionaireButton questionaireSubButton">Redo
                        this room</button>

        </div>
    </div>
</template>

<script setup>
import { ROOM_ORDER } from '@/utils/householdRoomVisualizationStaticData';

defineEmits(['closePanel', 'handleBack', 'retakeRoom']);

defineProps({
    activeRoom: { type: Object },
    completed: { type: Set },
    roomResult: { type: Object },
    topRoomHotspot: { type: Object },
    scoreLevel: { type: String }
})
</script>

<!-- activeRoom -->
<!-- roomResult -->
<!-- completed -->