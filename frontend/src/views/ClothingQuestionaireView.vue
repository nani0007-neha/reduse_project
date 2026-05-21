<script setup>
import ClothingQuestionaireCard from '@/components/clothing/ClothingQuestionaireCard.vue';
import ClothingActionCard from '@/components/clothing/ClothingActionCard.vue';
import LifetimeValueAnalyzer from '@/components/clothing/LifetimeValueAnalyzer.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getQuestionIndex } from '@/utils/questionaireController';
import RedUseHeader from '@/components/misc/RedUseHeader.vue';

const router = useRouter();
const calculatorOpen = ref(false);
const openCalculator = () => { calculatorOpen.value = true; };
const seeData = () => router.push('/clothing/awareness');
</script>

<template>
    <div style="align-items: center;
    justify-content: center;">
        <RedUseHeader v-if="getQuestionIndex === -1" paragraph="Aussies buy 27kg of new clothes a year and toss most of it.
            Before you add to
            that pile, just 6 quick
            questions.
            No judgment, no pressure." inter="Your Cart Can Wait," grace="wardrobe can't"></RedUseHeader>

        <div class="row justify-content-center align-items-stretch g-4" style="margin: 0;">
            <div :class="getQuestionIndex === -1 ? 'col-12 col-lg-5' : 'col-12'">
                <ClothingQuestionaireCard title="About to tap &quot;buy&quot;?"
                    description="Six quick questions, no judgement, no pressure -- just a pause"
                    confirmLabel=" Let's do it →" skipLabel="Already decided? Make it last"
                    @openCalculator="openCalculator" />
            </div>
            <div v-if="getQuestionIndex === -1" class="col-12 col-lg-5">
                <ClothingActionCard icon="pi pi-tag" title="Already bought it?"
                    description="See what wear actually costs -- and how to stretch it."
                    leftButtonLabel="Open Calculator " rightButtonLabel="See the data" :onLeftClick="openCalculator"
                    :onRightClick="seeData" />
            </div>
        </div>
    </div>
    <LifetimeValueAnalyzer :isOpen="calculatorOpen" @close="calculatorOpen = false" />
</template>

<style scoped>
span {
    color: #009387;
    font-family: 'Covered By Your Grace'
}

p {
    color: grey;
    text-align: center;
    width: 50%;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;
}
</style>