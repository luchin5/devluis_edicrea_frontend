<template>
  <div class="relative h-full w-full">
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

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
    const mes = Number(item.numero_mes)

    if (mes >= 1 && mes <= 12) {
      ventasPorMes[mes - 1] = Number(item.ventas)
    }
  })

  return {
    labels: meses,

    datasets: [
      {
        label: 'Ventas',
        data: ventasPorMes,

        borderColor: '#0879a8',
        backgroundColor: 'rgba(8, 121, 168, 0.10)',

        fill: true,

        tension: 0.4,

        borderWidth: 2.5,

        pointRadius: 3,
        pointHoverRadius: 6,

        pointBackgroundColor: '#0879a8',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,

        cubicInterpolationMode: 'monotone',
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  interaction: {
    intersect: false,
    mode: 'index',
  },

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      backgroundColor: '#0b2d52',

      titleColor: '#ffffff',
      bodyColor: '#ffffff',

      padding: 12,

      cornerRadius: 10,

      displayColors: false,

      callbacks: {
        label: (context) => {
          return ` ${context.parsed.y} venta${context.parsed.y === 1 ? '' : 's'}`
        },
      },
    },
  },

  scales: {
    x: {
      border: {
        display: false,
      },

      grid: {
        display: false,
      },

      ticks: {
        color: '#94a3b8',
        font: {
          size: 11,
        },
      },
    },

    y: {
      beginAtZero: true,

      border: {
        display: false,
      },

      grid: {
        color: '#e2e8f0',
        drawTicks: false,
      },

      ticks: {
        color: '#94a3b8',

        padding: 8,

        precision: 0,

        stepSize: 1,

        font: {
          size: 11,
        },
      },
    },
  },
}
</script>
