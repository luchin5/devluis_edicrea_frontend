<template>
  <div class="relative w-full h-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

import { Line } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(
  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Tooltip,

  Legend,

  Filler,
)

const props = defineProps({
  ventas: {
    type: Array,
    default: () => [],
  },
})

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']

const chartData = computed(() => {
  const ventasPorMes = Array(12).fill(0)

  props.ventas.forEach((item) => {
    ventasPorMes[Number(item.numero_mes) - 1] = Number(item.ventas)
  })

  return {
    labels: meses,
    datasets: [
      {
        label: 'Ventas',
        data: ventasPorMes,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99,102,241,0.15)',
        fill: true,
        tension: 0.35,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        precision: 0,
        stepSize: 1,
      },
    },
  },
}
</script>
