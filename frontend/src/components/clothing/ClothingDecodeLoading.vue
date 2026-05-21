<template>
  <div class="loading-container animate-in">
    <div class="spinner-ring">
      <svg viewBox="0 0 80 80" class="spinner-svg">
        <circle cx="40" cy="40" r="34" fill="none" stroke="#E5E5DF" stroke-width="6" />
        <circle cx="40" cy="40" r="34" fill="none" stroke="#009387" stroke-width="6"
          stroke-linecap="round" stroke-dasharray="60 154" class="spinner-arc" />
      </svg>
      <span class="material-symbols-outlined spinner-icon">psychiatry</span>
    </div>

    <h2 class="loading-title">{{ config.title }}</h2>
    <p class="loading-sub">{{ config.subtitle }}</p>

    <div class="loading-steps">
      <div
        v-for="(step, index) in config.steps"
        :key="index"
        class="step-row"
        :class="{ done: progress > index, active: progress === index }"
      >
        <span class="step-dot"></span>
        <span>{{ step }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  mode: {
    type: String,
    default: 'analyse'  // 'extract' | 'analyse'
  }
});

const CONFIGS = {
  extract: {
    title: 'Reading Label...',
    subtitle: 'Our AI is scanning your image and pulling out the composition, brand, and care details.',
    steps: [
      'Reading label image...',
      'Extracting fibre composition...',
      //'Detecting brand & country...',
      'Preparing confirm screen...'
    ]
  },
  analyse: {
    title: 'Analysing Garment...',
    subtitle: 'Our AI is extracting fibre blends, care symbols, and identifying sustainable pathways.',
    steps: [
      'Reading fibre composition...',
      'Estimating carbon & water footprint...',
      'Checking brand ethics...',
      'Finding end-of-life pathway...'
    ]
  }
};

const config = computed(() => CONFIGS[props.mode] ?? CONFIGS.analyse);

const progress = ref(0);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    if (progress.value < config.value.steps.length - 1) progress.value++;
  }, 2000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.loading-container {
  max-width: 400px;
  margin: 80px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  text-align: center;
}

/* Spinner */
.spinner-ring {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.spinner-svg {
  position: absolute;
  top: 0; left: 0;
  width: 96px; height: 96px;
}

.spinner-arc {
  transform-origin: center;
  animation: spin 1.2s linear infinite;
  will-change: transform; /* optimize for smoother animation in local testing */
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner-icon {
  font-size: 3em;
  color: #009387;
  z-index: 1;
}

/* Text */
.loading-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
}

.loading-sub {
  font-size: 1rem;
  color: #606060;
  width: 100%; 
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
  text-align: center;
  text-wrap: balance;
}

/* Step rows */
.loading-steps {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  text-align: left;
}

.step-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #BDBDBD;
  transition: color 0.4s ease;
}

.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #D4D4D4;
  flex-shrink: 0;
  transition: background 0.4s ease;
}

/* Active pulsing dot */
.step-row.active .step-dot {
  background: #57CABC;
  animation: pulse 1s ease-in-out infinite;
}

/* Done dot */
.step-row.done .step-dot {
  background: #009387;
  animation: none;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

/* Animation */
.animate-in {
  animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>