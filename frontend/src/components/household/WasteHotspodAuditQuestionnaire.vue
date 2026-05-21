<template>
    <div class="d-flex flex-column h-100">

        <!-- Header -->
        <div class="px-3 pt-3 pb-2 flex-shrink-0" style="border-bottom: 1.5px solid #009387;">
            <div class="d-flex align-items-center justify-content-between mb-3">

                <!-- Room info -->
                <div class="d-flex align-items-center gap-2">
                    <div class="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                        style="width:2.25rem;height:2.25rem;background:#f0fdf4;font-size:1.1rem;">
                        {{ activeRoom.icon }}
                    </div>
                </div>
                <div style="border:black;">
                    <p class="mb-0 fw-bold text-dark" style="font-size:0.875rem;">{{ activeRoom.name }}</p>
                    <p class="mb-0 text-secondary" style="font-size:0.625rem; width: 100%;">{{ activeRoom.label }}</p>
                </div>

                <!-- Right controls -->
                <div class="d-flex align-items-center gap-2">
                    <span class="badge rounded-pill fw-bold"
                        style="background:#f0fdf4;border:1px solid #bbf7d0;color:#15803d;font-size:0.6875rem;">
                        {{ answeredCount }}/{{ activeRoom.questions.length }}
                    </span>
                    <button @click="$emit('closePanel')"
                        class="btn btn-sm d-flex align-items-center justify-content-center rounded-circle border text-secondary p-0"
                        style="width:1.75rem;height:1.75rem;font-size:0.6875rem;">✕</button>
                </div>

            </div>

            <!-- Progress segments -->
            <div class="d-flex gap-1">
                <div v-for="(_, i) in activeRoom.questions" :key="i" :style="{
                    flex: 1, height: '4px', borderRadius: '9999px', transition: 'background 0.35s',
                    background: selectedAnswers[i] != null ? '#009387' : '#eef1ee'
                }" />
            </div>
        </div>

        <!-- Question grid -->
        <div class="flex-grow-1 overflow-auto p-3">
            <div class="row g-2 align-items-start">

                <div v-for="(q, qi) in activeRoom.questions" :key="qi"
                    :class="qi === activeRoom.questions.length - 1 && activeRoom.questions.length % 2 !== 0 ? 'col-12' : 'col-6'">
                    <div class="h-100 d-flex flex-column gap-2 rounded-3 p-2" :style="{
                        background: selectedAnswers[qi] != null ? '#f5fffe' : '#fafafa',
                        border: `1.5px solid ${selectedAnswers[qi] != null ? '#009387' : '#f0f0f0'}`,
                        transition: 'border-color 0.2s, background 0.2s',
                    }">

                        <!-- Card header: number badge + hotspot label -->
                        <div class="d-flex align-items-center gap-2">
                            <div class="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                                :style="{
                                    width: '1.375rem', height: '1.375rem',
                                    background: selectedAnswers[qi] != null ? '#009387' : '#e5e7eb',
                                    transition: 'background 0.2s'
                                }">
                                <span class="fw-bold text-white" style="font-size:0.5rem;">{{ qi + 1 }}</span>
                            </div>
                            <div class="d-flex align-items-center gap-1 flex-grow-1">
                                <span>{{ HOTSPOT_CATEGORIES[q.hotspot].icon }}</span>
                                <span class="text-secondary" style="font-size:0.5rem;">{{
                                    HOTSPOT_CATEGORIES[q.hotspot].label }}</span>
                            </div>
                        </div>

                        <!-- Question text -->
                        <p class="mb-0 text-dark" style="font-size:0.75rem; width: 85%;">{{ q.q }}</p>

                        <!-- Options -->
                        <div class="d-flex flex-column gap-1 mt-auto">
                            <button v-for="(opt, oi) in q.options" :key="oi" @click="$emit('selectAnswer', qi, oi)"
                                class="d-flex align-items-center gap-2 w-100 text-start rounded-2 border-0" :style="{
                                    padding: '0.4375rem 0.625rem',
                                    background: selectedAnswers[qi] === oi ? '#009387' : 'white',
                                    border: `1.5px solid ${selectedAnswers[qi] === oi ? '#16a34a' : '#ebebeb'} !important`,
                                    cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif',
                                }">
                                <!-- Radio dot -->
                                <div class="d-flex align-items-center justify-content-center flex-shrink-0 rounded-circle"
                                    :style="{
                                        width: '12px', height: '12px',
                                        border: `2px solid ${selectedAnswers[qi] === oi ? 'rgba(255,255,255,0.7)' : '#d1d5db'}`,
                                        background: selectedAnswers[qi] === oi ? 'rgba(255,255,255,0.25)' : 'white',
                                        transition: 'all 0.15s'
                                    }">
                                    <div v-if="selectedAnswers[qi] === oi" class="rounded-circle bg-white"
                                        style="width:4px;height:4px;" />
                                </div>
                                <span :style="{
                                    fontSize: '0.6875rem',
                                    color: selectedAnswers[qi] === oi ? 'white' : '#374151',
                                    fontWeight: selectedAnswers[qi] === oi ? 600 : 400,
                                    lineHeight: '1.4', flex: 1
                                }">{{ opt }}</span>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- Submit bar -->
        <div class="px-3 py-2 border-top flex-shrink-0 d-flex align-items-center gap-3">
            <p class="mb-0 flex-grow-1 text-secondary" style="font-size:0.625rem;line-height:1.4;">
                {{ answeredCount === activeRoom.questions.length
                    ? 'All questions answered — ready to submit.'
                    : `${activeRoom.questions.length - answeredCount} question${activeRoom.questions.length - answeredCount
                        > 1 ? 's' : ''} left` }}
            </p>
            <button @click="$emit('submitAnswers')" :disabled="answeredCount < activeRoom.questions.length"
                class="btn fw-bold flex-shrink-0" :style="{
                    borderRadius: '11px', padding: '10px 20px',
                    fontSize: '0.875rem', fontFamily: 'Inter,sans-serif',
                    background: answeredCount === activeRoom.questions.length ? '#009387' : '#f3f4f6',
                    color: answeredCount === activeRoom.questions.length ? 'white' : '#9ca3af',
                    cursor: answeredCount === activeRoom.questions.length ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                }">
                Submit →
            </button>
        </div>

    </div>
</template>

<script setup>
import { HOTSPOT_CATEGORIES } from '@/utils/householdHotspotStaticData';

defineEmits(['closePanel', 'selectAnswer', 'submitAnswers']);

defineProps({
    activeRoom: {
        type: Object,
        required: true
    },
    answeredCount: {
        type: Number,
        required: true
    },
    selectedAnswers: {
        type: Array,
        required: true
    }
});
</script>