<template>
    <div class="section-separator mt-5 animate-in">
        <div class="tip-toggle">
            <span class="material-symbols-outlined icon-xs">shield_lock</span><b> Transparency & Privacy</b>
        </div>
        <div class="tip-content mt-2">
            <p class="mb-2 w-100 text-start"><strong>{{ contextOneLabel }}</strong>{{ contextOne }}</p>
            <p class="w-100 text-start"><strong>{{ contextTwoLabel }}</strong> {{ contextTwo }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    contextOneLabel: { type: String, required: true },
    contextOne: { type: String, required: true },
    contextTwoLabel: { type: String, default: "" },
    contextTwo: { type: String, default: "" }
}
)
</script>