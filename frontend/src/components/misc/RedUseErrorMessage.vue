<template>
    <p class="w-100 text-center fs-5" style="
    color: #f77; font-family: sans-serif;">
        {{ msg }}
    </p>
</template>

<script setup>
defineProps({ msg: { type: String, default: 'Sorry, we encountered an issue' }, })
</script>