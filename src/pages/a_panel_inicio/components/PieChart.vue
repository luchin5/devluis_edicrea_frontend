<template>
  <div class="relative w-full h-full">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { Pie } from 'vue-chartjs'

ChartJS.register(
  ArcElement,

  Tooltip,

  Legend,
)

const props = defineProps({
  estadoLotes: {
    type: Array,
    default: () => [],
  },
})

const obtenerTotal = (estado) => {
  const item = props.estadoLotes.find((e) => e.estado === estado)
  return Number(item?.total ?? 0)
}

const chartData = computed(() => ({
  labels: ['Libres', 'Separados', 'Vendidos'],
  datasets: [
    {
      data: [obtenerTotal('Libre'), obtenerTotal('Separado'), obtenerTotal('Vendido')],
      backgroundColor: ['#2BD93B', '#FFA58C', '#928CFF'],
      borderWidth: 1,
    },
  ],
}))

const chartOptions = {
  responsive: true,

  maintainAspectRatio: false,
}
</script>
