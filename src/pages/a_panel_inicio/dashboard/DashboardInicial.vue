<template>
  <div class="w-full">
    <!-- ===================================================== -->
    <!-- ENCABEZADO -->
    <!-- ===================================================== -->

    <div class="mb-6 flex flex-col gap-1">
      <h1 class="text-2xl font-bold tracking-tight text-[#0b2d52] md:text-3xl">Panel de Inicio</h1>

      <p class="text-sm text-slate-500 md:text-base">
        Resumen general de tus proyectos y lotes inmobiliarios.
      </p>
    </div>

    <!-- ===================================================== -->
    <!-- SIN PROYECTOS -->
    <!-- ===================================================== -->

    <div
      v-if="proyectos.length === 0"
      class="rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm"
    >
      <div class="mx-auto max-w-md">
        <img
          src="/images/trabajando.jpg"
          alt="Sin proyectos"
          class="mx-auto h-44 w-44 object-contain"
        />

        <h2 class="mt-6 text-2xl font-bold text-[#0b2d52]">No existen proyectos registrados</h2>

        <p class="mt-3 text-sm leading-relaxed text-slate-500">
          Registre un proyecto para comenzar a utilizar el dashboard.
        </p>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- DASHBOARD -->
    <!-- ===================================================== -->

    <div v-else class="space-y-6">
      <!-- =================================================== -->
      <!-- BANNER PRINCIPAL -->
      <!-- =================================================== -->

      <section class="relative min-h-[190px] overflow-hidden rounded-3xl bg-[#0b2d52]">
        <!-- Imagen -->
        <img
          src="/images/casa3.jpg"
          alt=""
          class="absolute inset-0 h-full w-full object-cover object-center"
        />

        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-[#062b4f]/95 via-[#0879a8]/70 to-transparent"
        ></div>

        <!-- Contenido -->
        <div
          class="relative z-10 flex min-h-[190px] items-center justify-between px-7 py-7 md:px-10"
        >
          <div class="max-w-xl">
            <p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              Plataforma EDICREA
            </p>

            <h2 class="text-2xl font-bold leading-tight text-white md:text-3xl">
              Construyendo lugares
              <span class="block text-cyan-200"> para grandes historias. </span>
            </h2>

            <p class="mt-3 text-sm text-white/75">Gestión eficiente de proyectos inmobiliarios.</p>
          </div>

          <!-- Frase -->
          <div
            class="hidden max-w-xs rounded-2xl bg-white/95 px-6 py-5 shadow-xl backdrop-blur-sm lg:block"
          >
            <p class="text-sm font-semibold leading-relaxed text-[#0b2d52]">
              "Más que terrenos,
              <span class="block"> oportunidades de vida." </span>
            </p>

            <div class="mt-4 h-1 w-10 rounded-full bg-[#0879a8]"></div>
          </div>
        </div>
      </section>

      <!-- =================================================== -->
      <!-- PROYECTO ACTIVO -->
      <!-- =================================================== -->

      <section class="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm md:p-6">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <!-- Información -->

          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-[#0879a8]">
              Proyecto activo
            </p>

            <h2 class="mt-1 text-2xl font-bold text-[#0b2d52]">
              {{ proyecto.nombre }}
            </h2>

            <p v-if="proyecto.descripcion" class="mt-1 text-sm text-slate-500">
              {{ proyecto.descripcion }}
            </p>

            <p class="mt-2 flex items-center gap-1 text-sm font-medium text-slate-600">
              <span class="text-[#0879a8]">●</span>
              {{ proyecto.ubicacion }}
            </p>
          </div>

          <!-- Selector -->

          <div class="w-full lg:w-72">
            <label class="mb-2 block text-xs font-semibold text-slate-500">
              Cambiar proyecto
            </label>

            <select
              v-model="proyectoSeleccionado"
              @change="cargarDashboard"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            >
              <option disabled :value="null">Seleccione...</option>

              <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
                {{ proyecto.nombre }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- =================================================== -->
      <!-- KPIs -->
      <!-- =================================================== -->

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <!-- TOTAL -->

        <div
          class="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">Total lotes</p>

              <p class="mt-2 text-3xl font-bold text-[#304ffe]">
                {{ cards.total_lotes }}
              </p>
            </div>

            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-[#304ffe]"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M3 10.5 12 4l9 6.5M5 10v9h14v-9M9 19v-5h6v5"
                />
              </svg>
            </div>
          </div>

          <p class="mt-4 text-xs text-slate-400">Lotes registrados en el proyecto</p>
        </div>

        <!-- LIBRES -->

        <div
          class="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">Libres</p>

              <p class="mt-2 text-3xl font-bold text-emerald-600">
                {{ cards.libres }}
              </p>
            </div>

            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                />
                <circle cx="12" cy="9" r="2.2" stroke-width="1.8" />
              </svg>
            </div>
          </div>

          <p class="mt-4 text-xs text-slate-400">Disponibles para comercialización</p>
        </div>

        <!-- SEPARADOS -->

        <div
          class="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">Separados</p>

              <p class="mt-2 text-3xl font-bold text-orange-500">
                {{ cards.separados }}
              </p>
            </div>

            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M7 3h10a2 2 0 0 1 2 2v16l-7-3-7 3V5a2 2 0 0 1 2-2Z"
                />
              </svg>
            </div>
          </div>

          <p class="mt-4 text-xs text-slate-400">Lotes actualmente separados</p>
        </div>

        <!-- VENDIDOS -->

        <div
          class="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">Vendidos</p>

              <p class="mt-2 text-3xl font-bold text-red-500">
                {{ cards.vendidos }}
              </p>
            </div>

            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M4 19V9M10 19V5M16 19v-7M22 19V3"
                />
              </svg>
            </div>
          </div>

          <p class="mt-4 text-xs text-slate-400">Lotes comercializados</p>
        </div>
      </section>

      <!-- =================================================== -->
      <!-- GRÁFICOS -->
      <!-- =================================================== -->

      <section class="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <!-- ESTADO DE LOTES -->

        <div class="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-[#0b2d52]">Estado de lotes</h2>

              <p class="mt-1 text-xs text-slate-400">Distribución actual del proyecto</p>
            </div>
          </div>

          <div v-if="estadoLotes.length === 0">
            <div class="flex h-72 items-center justify-center text-sm text-slate-400">
              No hay datos disponibles para mostrar el gráfico.
            </div>
          </div>

          <div v-else class="h-72 w-full">
            <PieChart :estadoLotes="estadoLotes" />
          </div>
        </div>

        <!-- VENTAS -->

        <div class="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-bold text-[#0b2d52]">Ventas mensuales</h2>

              <p class="mt-1 text-xs text-slate-400">Evolución de ventas del proyecto</p>
            </div>

            <span class="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
              Este año
            </span>
          </div>

          <div v-if="ventasMensuales.length === 0">
            <div class="flex h-72 items-center justify-center text-sm text-slate-400">
              No hay datos disponibles para mostrar el gráfico.
            </div>
          </div>

          <div v-else class="h-72 w-full">
            <LineChart :ventas="ventasMensuales" />
          </div>
        </div>
      </section>

      <!-- =================================================== -->
      <!-- PROYECTOS -->
      <!-- =================================================== -->

      <section class="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <!-- CABECERA -->

        <div
          class="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6"
        >
          <div>
            <h2 class="text-lg font-bold text-[#0b2d52]">Proyectos</h2>

            <p class="mt-1 text-sm text-slate-400">Resumen general de proyectos inmobiliarios.</p>
          </div>

          <button
            type="button"
            class="rounded-xl bg-[#0879a8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#06688f]"
          >
            Ver proyectos
          </button>
        </div>

        <!-- TABLA -->

        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-slate-50">
              <tr>
                <th
                  class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:px-6"
                >
                  Proyecto
                </th>

                <th
                  class="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Lotes
                </th>

                <th
                  class="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  Vendidos
                </th>

                <th
                  class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:px-6"
                >
                  Avance
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="proyecto in proyectos"
                :key="proyecto.nombre"
                class="transition hover:bg-slate-50"
              >
                <!-- Proyecto -->

                <td class="px-5 py-4 md:px-6">
                  <div class="font-semibold text-slate-700">
                    {{ proyecto.nombre }}
                  </div>
                </td>

                <!-- Lotes -->

                <td class="px-5 py-4 text-center">
                  <span
                    class="inline-flex rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600"
                  >
                    {{ proyecto.lotes }}
                  </span>
                </td>

                <!-- Vendidos -->

                <td class="px-5 py-4 text-center">
                  <span
                    class="inline-flex rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600"
                  >
                    {{ proyecto.vendidos }}
                  </span>
                </td>

                <!-- Avance -->

                <td class="px-5 py-4 md:px-6">
                  <div class="flex min-w-[180px] items-center gap-3">
                    <div class="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        class="h-full rounded-full bg-[#304ffe] transition-all"
                        :style="{
                          width:
                            proyecto.total_lotes > 0
                              ? (proyecto.vendidos / proyecto.total_lotes) * 100 + '%'
                              : '0%',
                        }"
                      ></div>
                    </div>

                    <span class="w-10 text-right text-xs font-semibold text-slate-500">
                      {{
                        proyecto.total_lotes > 0
                          ? Math.round((proyecto.vendidos / proyecto.total_lotes) * 100)
                          : 0
                      }}%
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
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
