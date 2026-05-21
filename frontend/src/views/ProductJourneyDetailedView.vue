<script setup>
import RedUseHeader from '@/components/misc/RedUseHeader.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import journey1 from '@/assets/Journey_1.png';
import journey2 from '@/assets/Journey_2.png';
import journey3 from '@/assets/Journey_3.png';
import journey4 from '@/assets/journey_4.png';
const router = useRouter();
const journey = ref(null);
const stale = ref(false);
const staleMessage = ref('');

const chapterColors = [
    { bg: 'bg-success-subtle', text: 'text-success', circle: '#198754' },
    { bg: 'bg-primary-subtle', text: 'text-primary', circle: '#0d6efd' },
    { bg: 'bg-warning-subtle', text: 'text-warning', circle: '#e6a817' },
    { bg: 'bg-danger-subtle', text: 'text-danger', circle: '#dc3545' },
];

const chapterIcons = {
    origin: 'pi pi-globe',
    journey: 'pi pi-truck',
    purchase: 'pi pi-shopping-bag',
    end_of_life: 'pi pi-trash',
};

const chapterImages = {
    origin: journey1,
    journey: journey2,
    purchase: journey3,
    end_of_life: journey4,
}


const getChapterIcon = (id) => chapterIcons[id] ?? 'pi pi-circle';
const getChapterImage = (id) => chapterImages[id] ?? null;

onMounted(() => {
    const state = window.history.state;
    if (state?.journeyData) {
        journey.value = state.journeyData;
        stale.value = state.stale === true;
        staleMessage.value = state.staleMessage || '';
    }
});

const goBack = () => router.push('/household/journey');
</script>

<template>
    <div class="container mt-5 mb-5">

        <!-- No data fallback -->
        <div v-if="!journey" class="text-center mt-5">
            <i class="pi pi-map text-muted" style="font-size: 3rem;"></i>
            <p class="text-muted mt-3">No journey data found. Please search for an item first.</p>
            <button class="btn btn-success fw-semibold" @click="goBack">
                <i class="pi pi-arrow-left me-2"></i>Go Back
            </button>
        </div>

        <div v-else>
            <!-- Stale cache warning banner -->
            <div v-if="stale" class="alert alert-warning d-flex align-items-center gap-2 mb-4" role="alert">
                <i class="pi pi-exclamation-triangle"></i>
                <span>{{ staleMessage || 'Sorry, live results are temporarily unavailable. Please try again later'
                }}</span>
            </div>

            <!-- Hero Section -->
            <div class="text-center mb-5">
                <RedUseHeader :paragraph="journey.heroSubtitle" inter="The hidden journey of "
                    :grace="journey.displayName"></RedUseHeader>
                <div class="alert alert-light border d-inline-flex align-items-center gap-2 mt-2 py-2 px-3 small">
                    <i class="pi pi-info-circle text-muted"></i>
                    <span>{{ journey.assumptionNote }}</span>
                </div>
            </div>

            <!-- Chapter Timeline -->
            <div class="mb-5">
                <div v-for="(chapter, i) in journey.chapters" :key="chapter.id">
                    <!-- Connector line between chapters -->
                    <div v-if="i > 0" style="margin-left: calc(16.6667% + 1.5rem + 1.75rem - 1px);">
                        <div class="bg_main" style="width: 2px; height: 2rem;"></div>
                    </div>

                    <div class="card border-0 shadow-sm overflow-hidden">
                        <div class="row g-0">
                            <!-- Chapter image -->
                            <div v-if="getChapterImage(chapter.id)"
                                class="col-md-3 col-12 d-flex align-items-center justify-content-center">
                                <img :src="getChapterImage(chapter.id)" :alt="chapter.title" class="w-100 h-100"
                                    style="object-fit: contain;" />
                            </div>

                            <!-- Chapter content -->
                            <div :class="getChapterImage(chapter.id) ? 'col-md-9' : 'col-12'">
                                <div class="card-body p-4 d-flex row h-100" style="align-items: center;">
                                    <!-- Main info -->
                                    <div class="col-md-8 col-12 mb-5">
                                        <!-- Step header -->
                                        <div class="align-items-center gap-3">
                                            <div class="flex-row d-flex">
                                                <div class="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                                                    :class="chapterColors[i % chapterColors.length].bg"
                                                    :style="{ width: '3.5rem', height: '3.5rem', color: chapterColors[i % chapterColors.length].circle }">
                                                    {{ chapter.stepNumber }}
                                                </div>
                                                <p class="small fw-bold text-uppercase" style="margin-left: 5rem;"
                                                    :class="chapterColors[i % chapterColors.length].text">
                                                    <i :class="getChapterIcon(chapter.id)"></i>
                                                    {{ chapter.stepLabel }}
                                                </p>
                                            </div>
                                            <div>
                                                <h5 class="fw-bold" style="text-align: center;">{{ chapter.title }}
                                                </h5>
                                            </div>
                                        </div>

                                        <p class="text-secondary mb-3" style="text-align: start; width: 75%;">{{
                                            chapter.text }}</p>

                                        <!-- Micro facts -->
                                        <div class="row gap-2" style="justify-content: center;">
                                            <span v-for="fact in chapter.microFacts" :key="fact" class="col-auto"
                                                :class="[chapterColors[i % chapterColors.length].text]"
                                                style="font-size: 0.8rem; padding: 0.4em 0.9em;">
                                                {{ fact }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Impact box -->
                                    <div class="rounded col-md-4 col-12"
                                        :class="chapterColors[i % chapterColors.length].bg"
                                        style="text-align: center; height: 35vh;">
                                        <p class="mb-3 mt-5" style="font-size: 110%; width: 100%;"
                                            :class="chapterColors[i % chapterColors.length].text">
                                            <i class="pi pi-bolt me-1"></i>{{ chapter.impactTitle }}
                                        </p>
                                        <label class="p-3">{{ chapter.impactText }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary Panel -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-5">
                    <div class="row">
                        <div class="col-12 col-md-2">
                            <img src="../assets/badge.png" alt="reduse_badge" class="w-100 h-100"
                                style="object-fit: contain;">
                        </div>

                        <div class="col-12 col-md-5 offset-md-1 row gap-2">
                            <div>
                                <h5 class="fw-bold mb-2">{{ journey.summaryPanel.title }}</h5>
                                <label class="text-secondary mb-4 col-md-7 mx-auto">{{ journey.summaryPanel.text
                                }}</label>
                            </div>

                            <div class="row">
                                <h5 class="fw-bold mb-2">One Small Change</h5>
                                <label class="text-secondary">{{ journey.oneSmallChange }}</label>
                            </div>

                            <button class="questionaireButton px-4" @click="goBack">
                                <i class="pi pi-search me-2"></i>{{ journey.summaryPanel.ctaPrimary }}
                            </button>
                        </div>
                        <div class="col-12 col-md-4 d-flex align-items-center gap-3">
                            <div class="bg_main flex-shrink-0"
                                style="width: 3px; border-radius: 2px; align-self: stretch;"></div>
                            <label class="fst-italic"
                                style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                <b style="font-size: 200%; color: #009387">"</b>{{ journey.closingStatement }}
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
