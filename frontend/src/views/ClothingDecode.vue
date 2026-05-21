<template>
  <div class="d-flex flex-column" style="min-height: 100vh;">
    <div class="container mt-5 flex-grow-1">

      <!-- Screen 1 header -->
      <div v-if="currentScreen === 1" class="text-center mb-4">
        <h1 class="display-5 fw-normal">
          <span class="font-inter"><b>Decode</b></span>
          <span class="font-grace"> your wardrobe</span>
        </h1>
        <p class="text-secondary fs-8">
          Check any label to uncover the environmental cost and life of your clothes.
        </p>
      </div>

      <!-- Screen 2 header -->
      <div v-if="currentScreen === 2" class="text-center mb-4">
        <h1 class="display-5 fw-normal">
          <span class="font-inter"><b>Does this</b></span>
          <span class="font-grace"> look right?</span>
        </h1>
        <p class="text-secondary fs-8">Take a quick look and correct anything before running the analysis.</p>
      </div>

      <!-- Screen 3 header -->
      <div v-if="currentScreen === 3" class="text-center mb-4">
        <h1 class="display-5 fw-normal">
          <span class="font-grace">The tea </span>
          <span class="font-inter"><b>on you garment</b></span>
        </h1>
        <p class="text-secondary fs-8">Here's everything we found about your garment. Straight up, no fluff.</p>
      </div>

      <DecodeInput v-if="currentScreen === 1" @next="goToConfirm" />
      <DecodeLoading v-if="currentScreen === 1.5" mode="extract" />

      <DecodeConfirm v-if="currentScreen === 2" :formData="formData" @back="currentScreen = 1"
        @analyse="onAnalyseRequested" />
      <DecodeLoading v-if="currentScreen === 2.5" mode="analyse" />

      <DecodeResult v-if="currentScreen === 3" :formData="formData" :analysis="analysisResult"
        @back="currentScreen = 2" />

      <RedUseAIAcknowledgement v-if="currentScreen === 1" style="max-width: 560px; margin: 0 auto;"
        context-one-label="AI Usage: "
        context-one="We use AI to extract fabric details from your labels and to analyze your garment."
        context-two-label="Your Privacy: "
        context-two="We do not store your photos. Images are processed and then discarded."></RedUseAIAcknowledgement>

    </div>
  </div>
</template>

<script setup lang="ts">

/// <reference types="vite/client" />
import { ref, reactive } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import DecodeInput from '@/components/clothing/ClothingDecodeInput.vue';
import DecodeConfirm from '@/components/clothing/ClothingDecodeConfirm.vue';
import DecodeLoading from '@/components/clothing/ClothingDecodeLoading.vue';
import DecodeResult from '@/components/clothing/ClothingDecodeResult.vue';
import RedUseAIAcknowledgement from '@/components/misc/RedUseAIAcknowledgement.vue';


// ===== DEV TESTING ==========================================================
const USE_RESULT_TEST_MODE = false;
const DEV_TEST_CASE = 'allNatural'; // change to: allNatural | syntheticBlend | naErrors | unknownBrand

const testCases: Record<string, any> = {
  allNatural: {
    formData: { brand: 'Patagonia', composition: 'Cotton 85%, Linen 15%', made_in: 'Portugal' },
    analysis: {
      materials: [{ name: 'Cotton', percent: 85 }, { name: 'Linen', percent: 15 }],
      badges: ['organic', 'biodegradable'],
      carbon_kg: 3.2, water_liters: 2700, estimated_lifespan: '5-7 years with proper care',
      care_warnings: ['Wash at 30°C or below - high heat shrinks natural fibres.', 'Do not tumble dry - line dry in shade to preserve colour.'],
      end_of_life_recommendation: { option: 'Compost or Donate', reason: 'Natural fibres are biodegradable. If worn out, compost in home bin. If still wearable, donate to a local op shop or clothing exchange.' },
      faqs: [{ question: 'Is cotton sustainable?' }, { question: 'How do I wash this without damaging it?' }, { question: 'Can I compost this garment?' }, { question: 'What does "Made in Portugal" mean for ethics?' }]
    }
  },
  syntheticBlend: {
    formData: { brand: 'Shein', composition: 'Polyester 80%, Elastane 20%', made_in: 'China' },
    analysis: {
      materials: [{ name: 'Polyester', percent: 80 }, { name: 'Elastane', percent: 20 }],
      badges: ['synthetic', 'non-biodegradable', 'microplastics'],
      carbon_kg: 14.8, water_liters: 620, estimated_lifespan: '1-2 years (fast fashion quality)',
      care_warnings: ['Use a Guppyfriend microfibre filter bag when washing - each wash releases thousands of plastic microfibres into waterways.', 'Avoid high heat - synthetic fibres melt and release toxic fumes when ironed.'],
      end_of_life_recommendation: { option: 'Textile Recycling Bin', reason: 'Polyester and elastane cannot be composted or easily recycled domestically. Drop off at H&M, Uniqlo or Upparel collection points in Australia.' },
      faqs: [{ question: 'What are microplastics and why do they matter?' }, { question: 'Is Shein considered an ethical brand?' }, { question: 'Can polyester clothing be recycled in Australia?' }, { question: 'How many times can I wear this before disposing?' }]
    }
  },
  unknownBrand: {
    formData: { brand: null, composition: 'Wool 45%, Nylon 35%, Acrylic 20%, Polyester 80%, Elastane 20%', made_in: null },
    analysis: {
      materials: [{ name: 'Wool', percent: 30 }, { name: 'Nylon', percent: 30 }, { name: 'Acrylic', percent: 10 }, { name: 'Polyester', percent: 20 }, { name: 'Elastane', percent: 10 }],
      badges: ['mixed-fibre', 'dry-clean-only'],
      carbon_kg: 9.1, water_liters: 1100, estimated_lifespan: '3-5 years with careful maintenance',
      care_warnings: ['Dry clean only - water can felt and permanently shrink wool fibres.', 'Store folded, not hung - wool stretches under its own weight on a hanger.'],
      end_of_life_recommendation: { option: 'Specialist Textile Recycler', reason: 'Mixed fibres (wool + nylon + acrylic) cannot be separated at home. Take to a Upparel or Textile Recyclers Australia drop-off point.' },
      faqs: [{ question: 'How do I find out the brand of this garment?' }, { question: 'Is wool an ethical material?' }, { question: 'Why is acrylic considered unsustainable?' }, { question: 'Where can I recycle mixed-fibre clothes in Australia?' }]
    }
  },
  naErrors: {
    formData: { brand: null, composition: 'Cotton 90%, Polyester 10%', made_in: null },
    analysis: {
      materials: [{ name: 'Cotton', percent: 90 }, { name: 'Polyester', percent: 10 }],
      badges: [], carbon_kg: 'N/A', water_liters: 'N/A', estimated_lifespan: 'N/A',
      care_warnings: 'N/A', brand_rating: null,
      end_of_life_recommendation: { option: 'Recycling', reason: 'N/A' },
      faqs: [{ question: 'What are microplastics and why do they matter?' }, { question: 'Can polyester clothing be recycled in Australia?' }]
    }
  }
};

// test data for dev env only; empty state in prod
const IS_DEV = import.meta.env.DEV;
const currentScreen = ref(IS_DEV ? 3 : 1); // dev debug lock page
const formData = reactive(IS_DEV ? testCases[DEV_TEST_CASE].formData : { brand: '', composition: '', made_in: '' });
const analysisResult = ref(IS_DEV ? testCases[DEV_TEST_CASE].analysis : null);

// ===== END DEV TESTING ======================================================



const goToConfirm = async (data: Record<string, any>) => {
  // skip extract loading for manual input
  if (data?.skipExtract) {
    formData.brand = data.brand || '';
    formData.composition = data.composition || '';
    formData.made_in = data.made_in || data.madeIn || '';
    currentScreen.value = 2;
    return;
  }

  currentScreen.value = 1.5;   // loading page for AI extraction

  const fd = new FormData();
  fd.append('file', data.file);

  try {
    const response = await axios.post(
      'https://redusetagdecoder-gbhfdmdddgfaaec2.canadacentral-01.azurewebsites.net/api/extract', fd
    );
    formData.brand = response.data.brand || '';
    formData.composition = response.data.composition || '';
    formData.made_in = response.data.made_in || '';
    currentScreen.value = 2;
  } catch (err) {
    console.error('Extract failed:', err);
    currentScreen.value = 1; // backend failure handling (back to photo tab)
    Swal.fire({
      title: 'Scan Failed',
      text: 'The AI couldn\'t read the label. Please try again or enter details manually.',
      icon: 'warning',
      confirmButtonColor: '##009387'
    });
  }
};


const onAnalyseRequested = async (confirmedData: Record<string, any>) => {
  formData.brand = confirmedData.brand || '';
  formData.composition = confirmedData.composition || '';
  formData.made_in = confirmedData.made_in || '';

  currentScreen.value = 2.5;   // loading page for AI analyze

  try {
    const response = await axios.post(
      'https://redusetagdecoder-gbhfdmdddgfaaec2.canadacentral-01.azurewebsites.net/api/decode',
      { composition: formData.composition, brand: formData.brand || null }
    );
    const raw = response.data;
    analysisResult.value = typeof raw === 'string' ? JSON.parse(raw) : raw;
    
    currentScreen.value = 3;
  } catch (err) {
    console.error('Analysis failed:', err);
    currentScreen.value = 2; // back to confirm if fail
    Swal.fire({
      title: 'Analysis Failed',
      text: 'Could not analyse this garment. Please try again.',
      icon: 'error',
      confirmButtonColor: '#009387'
    });
  }
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  color: black;
}

.font-grace {
  font-family: 'Covered By Your Grace';
  color: #009387;
  font-size: clamp(24px, 5vw, 60px);
  margin-bottom: 20px;
  word-spacing: -7px;
}
</style>