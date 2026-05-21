<template>
    <div class="chart-wrapper">
        <apexchart type="line" :options="chartOptions" :series="series" height="400" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
})

const categories = computed(() => props.data.map((d) => d.financial_year))

const series = computed(() => [
    {
        name: 'Disposal',
        data: props.data.map((d) => Math.round(d.disposal)),
    },
    {
        name: 'International Export',
        data: props.data.map((d) => Math.round(d.international_export)),
    },
    {
        name: 'Interstate Export',
        data: props.data.map((d) => Math.round(d.interstate_export)),
    },
    {
        name: 'Processed Locally',
        data: props.data.map((d) => Math.round(d.processed_locally)),
    },
])

const chartOptions = computed(() => ({
    chart: {
        type: "line",
        stacked: false,
        toolbar: { show: false },
        background: '#fff'
    },
    xaxis: {
        categories: categories.value,
        title: { text: 'Financial Year' },
    },
    yaxis: {
        title: { text: 'Tonnes' },
        labels: {
            formatter: (val) => `${(val / 1000).toFixed(0)}k`,
        },
    },
    legend: {
        position: 'top',
    },
    tooltip: {
        y: {
            formatter: (val) => `${val.toLocaleString()} tonnes`,
        },
    },
    colors: ['#E53935', '#FB8C00', '#43A047', '#1E88E5'],
    title: {
        text: '1. Australian Textile Waste by Financial Year',
        align: 'center',
        style: { fontSize: '16px', fontWeight: '600' },
    },
}))
</script>

<style scoped>
.chart-wrapper {
    width: 100%;
    padding: 1rem;
}
</style>
