<template>
    <div>
        <div>
            <p class="text-black">
                {{ contextualTip.emoji }}
                {{ panelOpen && activeRoom ? activeRoom.name + ' tip' : 'Tip' }}
            </p>
            <p style="font-size: 65%;">{{ contextualTip.text }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    panelOpen: { type: Boolean },
    activeRoom: { type: Object },
    contextualTip: { type: Object }
})
</script>