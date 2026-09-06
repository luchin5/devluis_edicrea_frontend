<template>
  <div>
    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Gestión de Proyectos</h1>

      <p class="mt-2 text-slate-500">
        Administra los proyectos inmobiliarios registrados en el sistema.
      </p>
    </div>

    <!-- Barra superior -->
    <div
      class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div class="relative w-full md:max-w-md">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar proyecto..."
          class="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          v-if="busqueda"
          @click="busqueda = ''"
          class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          title="Limpiar búsqueda"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <button
        v-if="authStore.usuario?.rol_id === 1"
        @click="mostrarModal = true"
        class="w-full md:w-auto rounded-xl bg-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        + Nuevo Proyecto
      </button>
    </div>

    <!-- Tabla -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-slate-100">
            <tr>
              <th class="px-6 py-4 text-left font-semibold text-slate-700">Proyecto</th>

              <th class="px-6 py-4 text-center font-semibold text-slate-700">LOGO</th>
              <th class="px-6 py-4 text-left font-semibold text-slate-700">Ubicación</th>

              <th class="px-6 py-4 text-center font-semibold text-slate-700">Planos</th>

              <th class="px-6 py-4 text-center font-semibold text-slate-700">Fecha Registro</th>

              <th class="px-6 py-4 text-center font-semibold text-slate-700">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="proyecto in proyectosFiltrados"
              :key="proyecto.id"
              class="border-t border-slate-100 hover:bg-slate-50 transition"
            >
              <td class="px-6 py-5">
                <div class="font-semibold text-slate-800">
                  {{ proyecto.nombre }}
                </div>

                <div class="text-sm text-slate-500">
                  {{ proyecto.descripcion }}
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center justify-center bg-slate-200 rounded-lg p-3">
                  <img
                    src="/images/proyecto_valparaiso.png"
                    alt="Logo del proyecto"
                    class="h-50 w-50 rounded-lg object-fill"
                  />
                </div>
              </td>

              <td class="px-6 py-5 text-slate-600">
                {{ proyecto.ubicacion }}
              </td>

              <td class="text-center">
                <span
                  class="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700"
                >
                  {{ proyecto.total_planos }} planos
                </span>
              </td>

              <td class="text-center text-slate-600">
                {{ formatearFecha(proyecto.fecha_registro) }}
              </td>

              <td>
                <div class="flex justify-center gap-2">
                  <RouterLink
                    :to="`/proyectos/${proyecto.id}/planos`"
                    class="rounded-lg bg-slate-600 px-4 py-2 text-white hover:bg-slate-700"
                  >
                    Ver Planos
                  </RouterLink>

                  <button
                    v-if="authStore.usuario?.rol_id === 1"
                    @click="editarProyecto(proyecto)"
                    class="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
                  >
                    Editar
                  </button>

                  <button
                    v-if="authStore.usuario?.rol_id === 1"
                    @click="confirmarEliminar(proyecto)"
                    class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- MODDAL REGISTRO DE PROYECTO-->
  <div
    v-if="mostrarModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div class="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
      <div class="border-b px-8 py-6">
        <h2 class="text-2xl font-bold text-slate-800">
          {{ editando ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
        </h2>

        <p class="mt-1 text-slate-500">Complete la información del proyecto.</p>
      </div>

      <div class="space-y-5 p-8">
        <div>
          <label class="mb-2 block font-medium text-slate-700"> Nombre </label>

          <input
            v-model="proyecto.nombre"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-slate-700"> Descripción </label>

          <textarea
            v-model="proyecto.descripcion"
            rows="3"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-slate-700"> Ubicación </label>

          <input
            v-model="proyecto.ubicacion"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-slate-700"> Fecha de registro </label>

          <input
            type="date"
            v-model="proyecto.fecha_registro"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3 border-t px-8 py-6">
        <button
          @click="mostrarModal = false"
          class="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="registrarProyecto"
          :disabled="cargando"
          class="rounded-xl bg-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {{ editando ? 'Actualizar Proyecto' : 'Registrar Proyecto' }}
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="mostrarModalEliminar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl">
      <div class="p-8 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>

        <h2 class="text-xl font-bold text-slate-800">Confirmar eliminación</h2>

        <p class="mt-3 text-slate-500">
          ¿Está seguro de eliminar el proyecto
          <strong>{{ proyectoEliminar?.nombre }}</strong
          >?
        </p>
      </div>

      <div class="flex justify-end gap-3 border-t p-6">
        <button
          @click="mostrarModalEliminar = false"
          class="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="eliminarProyecto"
          class="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>

  <!-- CIRCULAR PROGRESS-->
  <div
    v-if="cargando"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm"
  >
    <div
      class="h-16 w-16 rounded-full border-[6px] border-indigo-200 border-t-indigo-600 animate-spin"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

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
