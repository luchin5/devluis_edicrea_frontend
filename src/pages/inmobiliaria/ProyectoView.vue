<template>
  <div class="w-full">
    <!-- ===================================================== -->
    <!-- ENCABEZADO -->
    <!-- ===================================================== -->

    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#0879a8]">
          Gestión inmobiliaria
        </p>

        <h1 class="mt-1 text-2xl font-bold tracking-tight text-[#0b2d52] md:text-3xl">
          Gestión de proyectos
        </h1>

        <p class="mt-2 text-sm text-slate-500 md:text-base">
          Administra los proyectos inmobiliarios registrados en el sistema.
        </p>
      </div>

      <!-- NUEVO PROYECTO -->

      <button
        v-if="authStore.usuario?.rol_id === 1"
        type="button"
        @click="mostrarModal = true"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0879a8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#06688f] hover:shadow-md"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v14M5 12h14"
          />
        </svg>

        Nuevo proyecto
      </button>
    </div>

    <!-- ===================================================== -->
    <!-- BUSCADOR -->
    <!-- ===================================================== -->

    <section class="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div class="relative max-w-xl">
        <svg
          class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>

        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar proyecto por nombre, ubicación o descripción..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
        />

        <button
          v-if="busqueda"
          type="button"
          @click="busqueda = ''"
          class="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          title="Limpiar búsqueda"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- PROYECTOS -->
    <!-- ===================================================== -->

    <section>
      <!-- CONTADOR -->

      <div class="mb-4 flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-[#0b2d52]">Proyectos registrados</p>

          <p class="mt-0.5 text-xs text-slate-400">
            {{ proyectosFiltrados.length }} proyecto{{ proyectosFiltrados.length === 1 ? '' : 's' }}
          </p>
        </div>
      </div>

      <!-- ================================================= -->
      <!-- GRID DE PROYECTOS -->
      <!-- ================================================= -->

      <div
        v-if="proyectosFiltrados.length > 0"
        class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <article
          v-for="item in proyectosFiltrados"
          :key="item.id"
          class="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <!-- ============================================= -->
          <!-- IMAGEN -->
          <!-- ============================================= -->

          <div class="relative h-48 overflow-hidden bg-slate-100">
            <img
              src="/images/proyecto_valparaiso.png"
              alt="Logo del proyecto"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <!-- Overlay -->

            <div
              class="absolute inset-0 bg-gradient-to-t from-[#0b2d52]/50 via-transparent to-transparent"
            ></div>

            <!-- Badge -->

            <div
              class="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0879a8] shadow-sm backdrop-blur-sm"
            >
              Proyecto inmobiliario
            </div>
          </div>

          <!-- ============================================= -->
          <!-- INFORMACIÓN -->
          <!-- ============================================= -->

          <div class="p-5">
            <!-- Nombre -->

            <h2 class="truncate text-lg font-bold text-[#0b2d52]" :title="item.nombre">
              {{ item.nombre }}
            </h2>

            <!-- Descripción -->

            <p class="mt-1 line-clamp-2 min-h-[40px] text-sm leading-relaxed text-slate-500">
              {{ item.descripcion || 'Sin descripción registrada.' }}
            </p>

            <!-- Ubicación -->

            <div class="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#0879a8]"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
                  />

                  <circle cx="12" cy="9" r="2.2" stroke-width="1.8" />
                </svg>
              </div>

              <span class="truncate">
                {{ item.ubicacion }}
              </span>
            </div>

            <!-- =========================================== -->
            <!-- ESTADÍSTICAS -->
            <!-- =========================================== -->

            <div class="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
              <!-- Lotes -->

              <div>
                <p class="text-xs text-slate-400">Lotes</p>

                <p class="mt-1 text-lg font-bold text-[#0b2d52]">
                  {{ item.lotes ?? 0 }}
                </p>
              </div>

              <!-- Planos -->

              <div class="border-l border-slate-100 pl-4">
                <p class="text-xs text-slate-400">Planos</p>

                <p class="mt-1 text-lg font-bold text-[#0b2d52]">
                  {{ item.total_planos ?? 0 }}
                </p>
              </div>
            </div>

            <!-- =========================================== -->
            <!-- FECHA -->
            <!-- =========================================== -->

            <div class="flex items-center justify-between text-xs text-slate-400">
              <span> Registrado </span>

              <span class="font-medium text-slate-500">
                {{ formatearFecha(item.fecha_registro) }}
              </span>
            </div>

            <!-- =========================================== -->
            <!-- ACCIONES -->
            <!-- =========================================== -->

            <div class="mt-5 flex gap-2">
              <!-- PLANOS -->

              <button
                type="button"
                @click="verPlanos(item.id)"
                class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e8f6fb] px-3 py-2.5 text-sm font-semibold text-[#0879a8] transition hover:bg-[#d8f0f7]"
              >
                <!-- tu icono de planos -->
                Ver planos
              </button>

              <!-- EDITAR -->

              <button
                v-if="authStore.usuario?.rol_id === 1"
                type="button"
                @click="editarProyecto(item)"
                class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                title="Editar proyecto"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="m16.86 3.49 3.65 3.65M5 19l3.2-.8L19.7 6.7a1.8 1.8 0 0 0 0-2.55l-.85-.85a1.8 1.8 0 0 0-2.55 0L4.8 14.8 4 18l1 1Z"
                  />
                </svg>
              </button>

              <!-- ELIMINAR -->

              <button
                v-if="authStore.usuario?.rol_id === 1"
                type="button"
                @click="confirmarEliminar(item)"
                class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                title="Eliminar proyecto"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M5 7h14M10 11v6M14 11v6M9 7V4h6v3m-9 0 1 13h10l1-13"
                  />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- ================================================= -->
      <!-- SIN RESULTADOS -->
      <!-- ================================================= -->

      <div
        v-else
        class="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#0879a8]"
        >
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h1M14 10h1M9 13h1M14 13h1"
            />
          </svg>
        </div>

        <h2 class="mt-5 text-lg font-bold text-[#0b2d52]">No encontramos proyectos</h2>

        <p class="mx-auto mt-2 max-w-md text-sm text-slate-400">
          {{
            busqueda
              ? 'Intenta realizar una búsqueda diferente.'
              : 'Todavía no existen proyectos registrados.'
          }}
        </p>

        <button
          v-if="busqueda"
          type="button"
          @click="busqueda = ''"
          class="mt-5 text-sm font-semibold text-[#0879a8] hover:text-[#0b2d52]"
        >
          Limpiar búsqueda
        </button>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- MODAL NUEVO / EDITAR -->
    <!-- ===================================================== -->

    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <!-- HEADER -->

        <div class="border-b border-slate-100 px-6 py-5 md:px-8">
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-[#0879a8]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-xl font-bold text-[#0b2d52]">
                {{ editando ? 'Editar proyecto' : 'Nuevo proyecto' }}
              </h2>

              <p class="mt-0.5 text-sm text-slate-400">Complete la información del proyecto.</p>
            </div>
          </div>
        </div>

        <!-- FORMULARIO -->

        <div class="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-6 md:px-8">
          <!-- NOMBRE -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Nombre </label>

            <input
              v-model="proyecto.nombre"
              type="text"
              placeholder="Ej. Residencial Valparaíso"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- DESCRIPCIÓN -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Descripción </label>

            <textarea
              v-model="proyecto.descripcion"
              rows="3"
              placeholder="Descripción del proyecto..."
              class="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            ></textarea>
          </div>

          <!-- UBICACIÓN -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Ubicación </label>

            <input
              v-model="proyecto.ubicacion"
              type="text"
              placeholder="Ej. Arequipa, Perú"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- FECHA -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">
              Fecha de registro
            </label>

            <input
              v-model="proyecto.fecha_registro"
              type="date"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>
        </div>

        <!-- FOOTER -->

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end md:px-8"
        >
          <button
            type="button"
            @click="mostrarModal = false"
            class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            @click="registrarProyecto"
            :disabled="cargando"
            class="rounded-xl bg-[#0879a8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06688f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ editando ? 'Actualizar proyecto' : 'Registrar proyecto' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- MODAL ELIMINAR -->
    <!-- ===================================================== -->

    <div
      v-if="mostrarModalEliminar"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div class="p-7 text-center">
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500"
          >
            <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M12 9v4m0 4h.01M5.2 19h13.6c1.55 0 2.5-1.67 1.72-3L13.72 4c-.77-1.33-2.69-1.33-3.46 0L3.48 16c-.78 1.33.17 3 1.72 3Z"
              />
            </svg>
          </div>

          <h2 class="mt-5 text-xl font-bold text-[#0b2d52]">Eliminar proyecto</h2>

          <p class="mt-3 text-sm leading-relaxed text-slate-500">
            ¿Está seguro de eliminar el proyecto
            <strong class="text-slate-700"> {{ proyectoEliminar?.nombre }} </strong>?
          </p>

          <p class="mt-2 text-xs text-slate-400">Esta acción no se puede deshacer.</p>
        </div>

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 p-5 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            @click="mostrarModalEliminar = false"
            class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            @click="eliminarProyecto"
            :disabled="cargando"
            class="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Eliminar proyecto
          </button>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- LOADING GLOBAL -->
    <!-- ===================================================== -->

    <div
      v-if="cargando || cargandoPlanos"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/25 backdrop-blur-[2px]"
    >
      <div class="flex flex-col items-center gap-3 rounded-2xl bg-white px-7 py-6 shadow-2xl">
        <svg
          class="h-9 w-9 animate-spin text-[#0879a8]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />

          <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
        </svg>

        <p class="text-sm font-semibold text-[#0b2d52]">
          {{ cargandoPlanos ? 'Abriendo planos...' : 'Procesando...' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
const cargandoPlanos = ref(false)

const toast = useToast()

const authStore = useAuthStore()
const cargando = ref(false)
const proyectos = ref([])
const mostrarModal = ref(false)
const busqueda = ref('')
const editando = ref(false)
const proyectoId = ref(null)
const mostrarModalEliminar = ref(false)
const proyectoEliminar = ref(null)

const confirmarEliminar = (proyecto) => {
  proyectoEliminar.value = proyecto
  mostrarModalEliminar.value = true
}

const editarProyecto = (item) => {
  editando.value = true
  proyectoId.value = item.id

  proyecto.value = {
    nombre: item.nombre,
    descripcion: item.descripcion,
    ubicacion: item.ubicacion,
    fecha_registro: item.fecha_registro.substring(0, 10),
  }

  mostrarModal.value = true
}
const router = useRouter()
const verPlanos = async (id) => {
  cargandoPlanos.value = true

  await new Promise((resolve) => setTimeout(resolve, 300))

  await router.push(`/proyectos/${id}/planos`)
}

const proyecto = ref({
  nombre: '',
  descripcion: '',
  ubicacion: '',
  fecha_registro: '',
})
const proyectosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  return proyectos.value.filter(
    (p) =>
      p.nombre.toLowerCase().includes(texto) ||
      p.ubicacion.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto),
  )
})

const eliminarProyecto = async () => {
  cargando.value = true

  try {
    const baseUrl = import.meta.env.VITE_API_URL

    await axios.delete(`${baseUrl}/proyectos/proyecto?id=${proyectoEliminar.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success('Proyecto eliminado correctamente')

    mostrarModalEliminar.value = false
    proyectoEliminar.value = null

    getProyectos()
  } catch (error) {
    console.error(error)
    toast.error('No se pudo eliminar el proyecto')
  } finally {
    cargando.value = false
  }
}

const registrarProyecto = async () => {
  cargando.value = true

  try {
    const baseUrl = import.meta.env.VITE_API_URL

    if (editando.value) {
      // ACTUALIZAR
      await axios.put(
        `${baseUrl}/proyectos/proyecto?id=${proyectoId.value}`,
        {
          ...proyecto.value,
          usuario_id: authStore.usuario.id,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      )

      toast.success('Proyecto actualizado correctamente')
    } else {
      // REGISTRAR
      await axios.post(
        `${baseUrl}/proyectos/proyecto`,
        {
          ...proyecto.value,
          usuario_id: authStore.usuario.id,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      )

      toast.success('Proyecto registrado correctamente')
    }

    // Mostrar spinner 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000))

    mostrarModal.value = false

    proyecto.value = {
      nombre: '',
      descripcion: '',
      ubicacion: '',
      fecha_registro: '',
    }

    editando.value = false
    proyectoId.value = null

    getProyectos()
  } catch (error) {
    console.error(error)
    toast.error(
      editando.value
        ? 'Ocurrió un error al actualizar el proyecto'
        : 'Ocurrió un error al registrar el proyecto',
    )
  } finally {
    cargando.value = false
  }
}

const getProyectos = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const { data } = await axios.get(`${baseUrl}/proyectos/proyecto`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    proyectos.value = data
  } catch (error) {
    console.error(error)
  }
}

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-PE')
}

onMounted(() => {
  getProyectos()
})
</script>
