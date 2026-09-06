<template>
  <div>
    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Planos del Proyecto</h1>

      <p class="mt-2 text-slate-500">Administra los planos pertenecientes al proyecto.</p>
    </div>

    <!-- Barra -->
    <div
      class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div class="w-full md:max-w-md">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar plano..."
          class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        v-if="authStore.usuario?.rol_id === 1"
        @click="mostrarModal = true"
        class="w-full md:w-auto rounded-xl bg-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        + Nuevo Plano
      </button>
    </div>

    <!-- Tabla -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-slate-100">
            <tr>
              <th class="px-6 py-4 text-left">Plano</th>
              <th class="px-6 py-4 text-center">Archivo</th>
              <th class="px-6 py-4 text-center">Fecha Registro</th>
              <th class="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="plano in planosFiltrados"
              :key="plano.id"
              class="hover:bg-slate-50 transition"
            >
              <td class="px-6 py-5 font-semibold">
                {{ plano.nombre }}
              </td>

              <td class="text-center text-indigo-600">
                {{ plano.archivo_svg }}
              </td>

              <td class="text-center">
                {{ plano.fecha_registro }}
              </td>

              <td>
                <div class="flex justify-center gap-2">
                  <RouterLink
                    :to="`/proyectos/${route.params.proyectoId}/planos/${plano.id}/zonas`"
                    class="rounded-lg bg-slate-600 px-4 py-2 text-white hover:bg-slate-700"
                  >
                    Ver Zonas
                  </RouterLink>

                  <button
                    v-if="authStore.usuario?.rol_id === 1"
                    @click="abrirEditar(plano)"
                    class="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
                  >
                    Editar
                  </button>

                  <button
                    v-if="authStore.usuario?.rol_id === 1"
                    @click="abrirEliminar(plano)"
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
  <!-- Modal Nuevo Plano -->
  <div
    v-if="mostrarModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
      <!-- Header -->
      <div class="border-b px-8 py-5">
        <h2 class="text-2xl font-bold text-slate-800">Nuevo Plano</h2>

        <p class="mt-1 text-slate-500">Registre un nuevo plano para este proyecto.</p>
      </div>

      <!-- Formulario -->
      <div class="space-y-6 p-8">
        <!-- Nombre -->
        <div>
          <label class="mb-2 block font-medium text-slate-700"> Nombre del plano </label>

          <input
            v-model="plano.nombre"
            type="text"
            placeholder="Ej. Plano General"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Archivo -->
        <div>
          <label class="mb-2 block font-medium text-slate-700"> Archivo DWG </label>

          <label
            class="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-indigo-500 hover:bg-indigo-50"
          >
            <input type="file" accept=".dwg" class="hidden" @change="seleccionarArchivo" />

            <div class="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto mb-3 h-12 w-12 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 8v4m0 0l4-4m-4 4l-4-4"
                />
              </svg>

              <p class="font-semibold text-slate-700">Seleccionar archivo DWG</p>

              <p class="mt-1 text-sm text-slate-400">Solo archivos .dwg</p>
            </div>
          </label>

          <div v-if="archivo" class="mt-3 rounded-lg bg-green-50 px-4 py-3 text-green-700">
            📄 {{ archivo.name }}
          </div>
        </div>

        <!-- Fecha -->

        <div>
          <label class="mb-2 block font-medium text-slate-700"> Fecha de registro </label>

          <input
            v-model="plano.fecha_registro"
            type="date"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <!-- Footer -->

      <div class="flex justify-end gap-3 border-t px-8 py-5">
        <button
          @click="mostrarModal = false"
          class="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="registrarPlano"
          class="rounded-xl bg-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
        >
          Registrar Plano
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Editar Plano -->
  <div
    v-if="mostrarModalEditar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
      <!-- Header -->
      <div class="border-b px-8 py-5">
        <h2 class="text-2xl font-bold text-slate-800">Editar Plano</h2>

        <p class="mt-1 text-slate-500">Modifique la información del plano.</p>
      </div>

      <!-- Body -->
      <div class="space-y-6 p-8">
        <div>
          <label class="mb-2 block font-medium text-slate-700"> Nombre del plano </label>

          <input
            v-model="planoEditar.nombre"
            type="text"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <!-- Archivo -->
        <div>
          <label class="mb-2 block font-medium text-slate-700"> Archivo DWG </label>

          <label
            class="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-indigo-500 hover:bg-indigo-50"
          >
            <input type="file" accept=".dwg" class="hidden" @change="seleccionarArchivo" />

            <div class="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto mb-3 h-12 w-12 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 8v4m0 0l4-4m-4 4l-4-4"
                />
              </svg>

              <p class="font-semibold text-slate-700">Seleccionar archivo DWG</p>

              <p class="mt-1 text-sm text-slate-400">Solo archivos .dwg</p>
            </div>
          </label>

          <div v-if="archivo" class="mt-3 rounded-lg bg-green-50 px-4 py-3 text-green-700">
            📄 {{ archivo.name }}
          </div>
        </div>

        <div>
          <label class="mb-2 block font-medium text-slate-700"> Fecha de registro </label>

          <input
            v-model="planoEditar.fecha_registro"
            type="date"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 border-t px-8 py-5">
        <button
          @click="mostrarModalEditar = false"
          class="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="editarPlano"
          class="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
  <!-- Modal Eliminar -->
  <div
    v-if="mostrarModalEliminar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl">
      <div class="border-b px-8 py-5">
        <h2 class="text-2xl font-bold text-red-600">Eliminar Plano</h2>
      </div>

      <div class="px-8 py-6">
        <p class="text-slate-700">
          ¿Está seguro que desea eliminar el plano
          <strong>{{ planoEliminar.nombre }}</strong
          >?
        </p>

        <p class="mt-2 text-sm text-red-500">Esta acción no se puede deshacer.</p>
      </div>

      <div class="flex justify-end gap-3 border-t px-8 py-5">
        <button
          @click="mostrarModalEliminar = false"
          class="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="eliminarPlano"
          class="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  </div>
  <!-- CIRCULAR PROGRESS -->
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
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()
const busqueda = ref('')
const baseUrl = import.meta.env.VITE_API_URL

const route = useRoute()
const cargando = ref(false)
const mostrarModal = ref(false)
const planos = ref([])
const archivo = ref(null)
const mostrarModalEliminar = ref(false)
const abrirEliminar = (item) => {
  planoEliminar.value = {
    id: item.id,
    nombre: item.nombre,
  }

  mostrarModalEliminar.value = true
}
const planoEliminar = ref({
  id: null,
  nombre: '',
})
const eliminarPlano = async () => {
  try {
    await axios.delete(`${baseUrl}/planos/plano?id=${planoEliminar.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Plano eliminado correctamente')

    mostrarModalEliminar.value = false

    await getPlanos()
  } catch (error) {
    console.error(error)

    toast.error(error.response?.data?.error ?? 'No se pudo eliminar el plano')
  }
}

const mostrarModalEditar = ref(false)

const planoEditar = ref({
  id: null,
  nombre: '',
  archivo_svg: '',
  fecha_registro: '',
  proyecto_id: null,
})
const abrirEditar = (item) => {
  planoEditar.value = {
    id: item.id,
    nombre: item.nombre,
    archivo_svg: item.archivo_svg,
    fecha_registro: item.fecha_registro.split('T')[0],
    proyecto_id: item.proyecto_id,
  }

  archivo.value = null
  mostrarModalEditar.value = true
}
const plano = ref({
  nombre: '',
  fecha_registro: '',
})
const planosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  return planos.value.filter(
    (p) => p.nombre.toLowerCase().includes(texto) || p.archivo_svg.toLowerCase().includes(texto),
  )
})
const seleccionarArchivo = (event) => {
  archivo.value = event.target.files[0]
}

const editarPlano = async () => {
  try {
    const formData = new FormData()

    formData.append('nombre', planoEditar.value.nombre)
    formData.append('fecha_registro', planoEditar.value.fecha_registro)
    formData.append('proyecto_id', planoEditar.value.proyecto_id)

    if (archivo.value) {
      formData.append('archivo_dwg', archivo.value)
    } else {
      formData.append('archivo_svg', planoEditar.value.archivo_svg)
    }
    await axios.put(`${baseUrl}/planos/plano?id=${planoEditar.value.id}`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    toast.success('Plano actualizado correctamente')

    mostrarModalEditar.value = false

    archivo.value = null

    await getPlanos()
  } catch (error) {
    console.error(error)

    toast.error(error.response?.data?.error ?? 'No se pudo actualizar el plano')
  }
}

const registrarPlano = async () => {
  if (!plano.value.nombre.trim()) {
    toast.warning('Ingrese el nombre del plano')
    return
  }

  if (!archivo.value) {
    toast.warning('Seleccione un archivo DWG')
    return
  }

  if (!plano.value.fecha_registro) {
    toast.warning('Seleccione la fecha')
    return
  }

  cargando.value = true

  try {
    const formData = new FormData()

    formData.append('nombre', plano.value.nombre)
    formData.append('archivo_dwg', archivo.value)
    formData.append('fecha_registro', plano.value.fecha_registro)
    formData.append('proyecto_id', route.params.proyectoId)

    await axios.post(`${baseUrl}/planos/plano`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Plano registrado correctamente')

    mostrarModal.value = false

    plano.value = {
      nombre: '',
      fecha_registro: '',
    }

    archivo.value = null

    // Aquí luego llamaremos:
    await getPlanos()
  } catch (error) {
    console.error(error)

    toast.error(error.response?.data?.error ?? 'No se pudo registrar el plano')
  } finally {
    cargando.value = false
  }
}

const getPlanos = async () => {
  cargando.value = true

  try {
    const { data } = await axios.get(`${baseUrl}/planos/plano`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    // Solo mostrar los planos del proyecto actual
    planos.value = data.filter((p) => p.proyecto_id === Number(route.params.proyectoId))
  } catch (error) {
    console.error(error)

    if (error.response?.status === 404) {
      planos.value = []
      toast.info('No existen planos registrados')
      return
    }

    toast.error(error.response?.data?.error ?? 'No se pudieron cargar los planos')
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  getPlanos()
})
// Aquí irá:
// GET /proyectos/:proyectoId/planos
</script>
