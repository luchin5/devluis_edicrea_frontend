<template>
  <div class="relative h-full w-full">
    <Doughnut :data="chartData" :options="chartOptions" :plugins="[centerTextPlugin]" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

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

const totalLotes = computed(() => {
  return obtenerTotal('Libre') + obtenerTotal('Separado') + obtenerTotal('Vendido')
})

const chartData = computed(() => ({
  labels: ['Libres', 'Separados', 'Vendidos'],

  datasets: [
    {
      data: [obtenerTotal('Libre'), obtenerTotal('Separado'), obtenerTotal('Vendido')],

      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],

      borderColor: '#ffffff',

      borderWidth: 3,

      hoverOffset: 5,
    },
  ],
}))

/*
 * Texto central del Doughnut
 */
const centerTextPlugin = {
  id: 'centerText',

  beforeDraw(chart) {
    const { ctx } = chart

    const meta = chart.getDatasetMeta(0)

    if (!meta.data.length) return

    const x = meta.data[0].x
    const y = meta.data[0].y

    ctx.save()

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Número
    ctx.font = '700 24px Inter, sans-serif'
    ctx.fillStyle = '#0b2d52'

    ctx.fillText(totalLotes.value, x, y - 7)

    // Texto
    ctx.font = '500 10px Inter, sans-serif'
    ctx.fillStyle = '#94a3b8'

    ctx.fillText('Lotes totales', x, y + 14)

    ctx.restore()
  },
}

const chartOptions = {
  responsive: true,

  maintainAspectRatio: false,

  cutout: '68%',

  plugins: {
    legend: {
      position: 'right',

      labels: {
        usePointStyle: true,

        pointStyle: 'circle',

        padding: 18,

        color: '#475569',

        font: {
          size: 12,
          weight: '500',
        },
      },
    },

    tooltip: {
      backgroundColor: '#0b2d52',

      padding: 12,

      cornerRadius: 10,

      callbacks: {
        label: (context) => {
          const valor = context.raw

          const total = totalLotes.value

          const porcentaje = total > 0 ? ((valor / total) * 100).toFixed(1) : 0

          return ` ${context.label}: ${valor} (${porcentaje}%)`
        },
      },
    },
  },
}
</script>
