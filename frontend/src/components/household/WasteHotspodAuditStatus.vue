<template>
    <div>
        <div class="row g-3 g-md-5 mt-1 justify-content-center">
            <div v-for="id in ROOM_ORDER" :key="'rs-' + id" class="col-11 col-md-5 d-flex"
                @click="$emit('open-room', id)" @mouseenter="hovered = id" @mouseleave="hovered = null">
                <MainFunctionButton :selected="completed.has(id)" :featureName="ROOMS[id].icon + ' ' + ROOMS[id].name">
                </MainFunctionButton>
            </div>
        </div>
    </div>

</template>


<script setup>
import { ref } from 'vue';
import { ROOM_ORDER } from '@/utils/householdRoomVisualizationStaticData';
import { ROOMS } from '@/utils/householdQuestionnaireStaticData'
import MainFunctionButton from '../misc/MainFunctionButton.vue';

defineEmits(['open-room']);

defineProps({
    completed: { type: Set }
});

const hovered = ref(null);
</script>
<!-- openRoom(id) -->
<!-- completed -->
<!-- hovered -->