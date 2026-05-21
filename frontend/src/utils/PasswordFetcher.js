import { ref } from "vue"

const BASE_URL = 'https://redusetagdecoder-gbhfdmdddgfaaec2.canadacentral-01.azurewebsites.net'

export const isPasswordCorrect = ref(false);

export async function validatePassword(password) {
    const response = await fetch(`${BASE_URL}/api/validate-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
    return response.ok;
}

