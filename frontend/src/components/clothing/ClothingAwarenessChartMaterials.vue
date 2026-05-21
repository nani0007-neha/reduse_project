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

const years = computed(() =>
    [...new Set(props.data.map((d) => d.financial_year))].sort()
)

const materials = computed(() =>
    [...new Set(props.data.map((d) => d.material_name).filter(Boolean))]
)

const series = computed(() =>
    materials.value.map((material) => ({
        name: material,
        data: years.value.map((year) => {
            const item = props.data.find(
                (d) => d.material_name === material && d.financial_year === year
            )
            return item ? Math.round(item.disposal) : 0
        }),
    }))
)

const chartOptions = computed(() => ({
    chart: {
        type: 'line',
        stacked: false,
        toolbar: { show: false },
        background: '#fff',
    },
    xaxis: {
        categories: years.value,
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
    title: {
        text: '2. Textile Waste Disposal by Material',
        align: 'center',
        style: { fontSize: '16px', fontWeight: '600' },
    },
    stroke: {
        width: 2,
        curve: 'smooth',
    },
}))
</script>

<style scoped>
.chart-wrapper {
    width: 100%;
    padding: 1rem;
}
</style>
