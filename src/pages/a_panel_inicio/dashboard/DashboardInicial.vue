<template>
  <div>
    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Panel de Inicio</h1>

      <p class="mt-2 text-slate-500">
        Resumen general de la información de los proyectos y lotes registrados en el sistema.
      </p>
    </div>
    <!-- Mensaje de datos vacios -->
    <div v-if="proyectos.length === 0" class="bg-white rounded-3xl shadow-lg p-12 text-center">
      <h2 class="text-3xl font-bold text-slate-700">No existen proyectos registrados</h2>

      <p class="mt-3 text-slate-500">Registre un proyecto para comenzar a utilizar el dashboard.</p>

      <img
        src="/images/trabajando.jpg"
        alt="Sin proyectos"
        class="mx-auto mt-8 w-[200px] h-[200px]"
      />
    </div>

    <div v-else>
      <!-- Selector de proyectos -->

      <div
        class="mb-8 rounded-3xl bg-white-600 border border-slate-300 shadow-lg p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
      >
        <div>
          <p class="text-sm font-bold uppercase tracking-wider text-slate-600">Proyecto Activo</p>

          <h2 class="mt-2 text-3xl font-bold text-slate-800">
            {{ proyecto.nombre }}
          </h2>

          <p class="mt-2 text-slate-500 font-bold">
            {{ proyecto.descripcion }}
          </p>

          <p class="mt-1 text-lg text-blue-900 font-semibold">📍 {{ proyecto.ubicacion }}</p>
        </div>

        <div class="w-full lg:w-96">
          <label class="block mb-2 text-sm font-medium text-slate-600"> Cambiar proyecto </label>

          <select
            v-model="proyectoSeleccionado"
            @change="cargarDashboard"
            class="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option disabled :value="null">Seleccione...</option>

            <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
              {{ proyecto.nombre }}
            </option>
          </select>
        </div>
      </div>

      <!-- Cards -->

      <div class="grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div class="relative overflow-hidden bg-white rounded-3xl shadow-lg p-8 min-h-56">
          <img src="/images/lote.jpg" class="absolute bottom-2 right-2 w-28 opacity-100" />

          <div class="relative z-10">
            <p class="text-gray-600 font-bold text-xl">Total Lotes</p>

            <h2 class="text-5xl font-bold text-indigo-600 mt-3">{{ cards.total_lotes }}</h2>
          </div>
        </div>

        <div class="relative overflow-hidden bg-white rounded-3xl shadow-lg p-8 min-h-56">
          <img src="/images/disponible.jpg" class="absolute bottom-2 right-2 w-28 opacity-100" />

          <p class="text-gray-600 font-bold text-xl">Libres</p>

          <h2 class="text-5xl font-bold text-green-600 mt-3">
            {{ cards.libres }}
          </h2>
        </div>

        <div class="relative overflow-hidden bg-white rounded-3xl shadow-lg p-8 min-h-56">
          <img src="/images/registrado.jpg" class="absolute bottom-2 right-2 w-28 opacity-100" />
          <p class="text-gray-600 font-bold text-xl">Separados</p>

          <h2 class="text-5xl font-bold text-orange-500 mt-3">
            {{ cards.separados }}
          </h2>
        </div>

        <div class="relative overflow-hidden bg-white rounded-3xl shadow-lg p-8 min-h-56">
          <img src="/images/vendido.jpg" class="absolute bottom-2 right-2 w-28 opacity-100" />
          <p class="text-gray-600 font-bold text-xl">Vendidos</p>

          <h2 class="text-5xl font-bold text-red-500 mt-3">
            {{ cards.vendidos }}
          </h2>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid lg:grid-cols-2 gap-6 mt-8">
        <div class="bg-gray-300 rounded-3xl shadow-lg p-6 border border-slate-50">
          <h2 class="text-xl font-bold mb-5">Estado de Lotes</h2>
          <div v-if="estadoLotes.length === 0">
            <p class="text-slate-500 font-semibold">
              No hay datos disponibles para mostrar el gráfico.
            </p>
          </div>
          <div v-else class="h-80 w-full px-4">
            <PieChart :estadoLotes="estadoLotes" />
          </div>
        </div>

        <div class="bg-gray-300 rounded-3xl shadow-lg p-6 border border-slate-50">
          <h2 class="text-xl font-bold mb-5">Ventas Mensuales</h2>
          <div v-if="ventasMensuales.length === 0">
            <p class="text-slate-500 font-semibold">
              No hay datos disponibles para mostrar el gráfico.
            </p>
          </div>

          <div v-else class="h-80 w-full px-4">
            <LineChart :ventas="ventasMensuales" />
          </div>
        </div>
      </div>

      <!-- PROYECTOS -->
      <div class="mt-8">
        <!-- Tabla -->

        <div class="bg-slate-400 rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-slate-800">Proyectos</h2>

              <p class="text-slate-900 text-md font-bold">Resumen general de proyectos</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-slate-100">
                <tr>
                  <th class="px-6 py-4 text-left text-md font-bold text-slate-700">Proyecto</th>

                  <th class="px-6 py-4 text-center text-md font-bold text-slate-700">Lotes</th>

                  <th class="px-6 py-4 text-center text-md font-bold text-slate-700">Vendidos</th>

                  <th class="px-6 py-4 text-center text-md font-bold text-slate-700">Avance</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="proyecto in proyectos"
                  :key="proyecto.nombre"
                  class="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <!-- Nombre -->

                  <td class="px-6 py-5">
                    <div class="font-semibold text-slate-800">
                      {{ proyecto.nombre }}
                    </div>
                  </td>

                  <!-- Lotes -->

                  <td class="text-center">
                    <span
                      class="inline-flex px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold"
                    >
                      {{ proyecto.lotes }}
                    </span>
                  </td>

                  <!-- Vendidos -->

                  <td class="text-center">
                    <span
                      class="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold"
                    >
                      {{ proyecto.vendidos }}
                    </span>
                  </td>

                  <!-- Barra -->

                  <td class="px-6">
                    <div class="flex items-center gap-3">
                      <div class="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          class="h-full rounded-full bg-indigo-600"
                          :style="{
                            width: (proyecto.vendidos / proyecto.total_lotes) * 100 + '%',
                          }"
                        ></div>
                      </div>

                      <span class="text-sm font-semibold text-slate-600">
                        {{ Math.round((proyecto.vendidos / proyecto.lotes || 1) * 100) }}%
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PieChart from '../components/PieChart.vue'
import LineChart from '../components/LineChart.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import axios from 'axios'

// VARIABLES
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const proyectos = ref([])
const proyectoSeleccionado = ref(null)

const proyecto = ref({})
const cards = ref({})
const estadoLotes = ref([])
const ventasMensuales = ref([])

const getLoteProyecto = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(`${baseUrl}/lotes/lotes_proyectos`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    proyectos.value = response.data
    if (proyectos.value.length > 0) {
      proyectoSeleccionado.value = proyectos.value[0].id

      await cargarDashboard()
    }
  } catch (error) {
    console.error(error)
  }
}

const cargarDashboard = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.get(
      `${baseUrl}/proyectos/proyecto_id?id=${proyectoSeleccionado.value}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    proyecto.value = response.data.proyecto
    cards.value = response.data.cards
    estadoLotes.value = response.data.estadoLotes
    ventasMensuales.value = response.data.ventasMensuales
  } catch (error) {
    console.error(error)
  }
}

// ON - MOUNTED
onMounted(async () => {
  await getLoteProyecto()
})
</script>
