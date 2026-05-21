<template>
    <div class="validator-body bg_sub">
        <div class="card validator-card col-12 col-md-4 p-5">
            <img src="@/assets/Icon_reduse.png" alt="RedUse Logo" class="validator-logo" />
            <RedUseHeader :is-small="true" inter="Red" grace="Use"></RedUseHeader>
            <h5 class="mb-5 fw-bold" style="text-align: center;">This website is password protected</h5>
            <input v-model="userInput" type="password" placeholder="Please enter website password"
                style="width: 100%; height:auto; border-radius: 1rem; padding: 1rem; border-style: solid;"
                @keyup.enter="onClick">
            <button class="mt-5 w-100 questionaireButton" @click="onClick" :disabled="loading">
                Confirm
            </button>
            <RedUseLoader class="mt-3" :loading="loading" />
            <RedUseErrorMessage class="mt-1" v-if="passwordMessage" :msg="passwordMessage"></RedUseErrorMessage>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { isPasswordCorrect, validatePassword } from '@/utils/PasswordFetcher';
import RedUseHeader from '../misc/RedUseHeader.vue';
import RedUseLoader from '../misc/RedUseLoader.vue';
import RedUseErrorMessage from '../misc/RedUseErrorMessage.vue';

const userInput = ref("");
const passwordMessage = ref("");
const loading = ref(false);

const onClick = async () => {
    if (loading.value) return;
    loading.value = true;
    passwordMessage.value = "";
    try {
        if (userInput.value === '') {
            passwordMessage.value = "Empty input field.";
            loading.value = false;
            return;
        }
        const valid = await validatePassword(userInput.value);
        if (valid) {
            isPasswordCorrect.value = true;
        } else {
            passwordMessage.value = "Password incorrect. Please try again.";
        }
    } catch {
        passwordMessage.value = "Error connecting to server. Please try again.";
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.validator-body {
    border: black;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    display: flex;
}

.validator-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
}

.validator-logo {
    width: clamp(48px, 10vw, 96px);
    height: auto;
    display: block;
    margin: 0 auto;
}

@media (max-width: 991.98px) {
    .validator-card {
        height: 100vh;
    }
}
</style>