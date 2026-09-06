<template>
  <div>
    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Zonas del Plano: {{ plano.nombre }}</h1>

      <p class="mt-2 text-slate-500">Administra las zonas pertenecientes al plano.</p>
    </div>

    <!-- Barra -->
    <div
      class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div class="w-full md:max-w-md">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar zona..."
          class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        v-if="authStore.usuario.rol_id === 1"
        @click="nuevaZona"
        class="w-full md:w-auto rounded-xl bg-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        + Nueva Zona
      </button>
    </div>

    <!-- Tabla -->
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-slate-100">
            <tr>
              <th class="px-6 py-4 text-left">Zona</th>
              <th class="px-6 py-4 text-center">Minimapa</th>

              <th class="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="zona in zonasFiltradas" :key="zona.id" class="hover:bg-slate-50 transition">
              <td class="px-6 py-5">
                <div class="font-semibold text-slate-800">
                  {{ zona.nombre }}
                </div>

                <div class="mt-1 text-sm text-slate-500 line-clamp-2" v-if="zona.descripcion">
                  {{ zona.descripcion }}
                </div>
              </td>

              <td class="text-center">
                <MiniMapa
                  :svg="svgPlano"
                  :svgIds="zona.svgids ? zona.svgids.split(',') : []"
                  :ocupados="pathsOcupados"
                  :color="zona.color"
                  width="500px"
                  height="400px"
                />
              </td>

              <td>
                <div class="flex justify-center gap-2">
                  <RouterLink
                    :to="`/proyectos/${route.params.proyectoId}/planos/${route.params.planoId}/zonas/${zona.id}/lotes`"
                    class="rounded-lg bg-slate-600 px-4 py-2 text-white hover:bg-slate-700"
                  >
                    Ver Lotes
                  </RouterLink>

                  <button
                    v-if="authStore.usuario.rol_id === 1"
                    @click="editarZona(zona)"
                    class="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
                  >
                    Editar
                  </button>

                  <button
                    v-if="authStore.usuario.rol_id === 1"
                    @click="abrirEliminar(zona)"
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

  <!-- Modal Nueva Zona -->
  <div
    v-if="mostrarModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div
      class="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl flex flex-col"
    >
      <!-- Header -->
      <div class="border-b px-5 py-4">
        <h2 class="text-xl font-bold text-slate-800">
          {{ modoEdicion ? 'Editar Zona' : 'Nueva Zona' }}
        </h2>

        <p class="text-sm text-slate-500">
          {{
            modoEdicion
              ? 'Modifique la información de la zona.'
              : 'Registre una nueva zona para este plano.'
          }}
        </p>
      </div>

      <!-- Body -->
      <div ref="contenidoModal" class="flex-1 overflow-y-auto p-5">
        <!-- Datos -->
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">
              Nombre de la zona
            </label>

            <input
              v-model="zona.nombre"
              type="text"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700"> Descripción </label>

            <textarea
              v-model="zona.descripcion"
              rows="2"
              class="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <!-- Contenido -->
        <div class="mt-6 grid gap-5 lg:grid-cols-3">
          <!-- Lotes -->
          <div class="lg:col-span-2">
            <div class="mb-2 flex items-center justify-between">
              <h3 class="font-semibold text-slate-700">Lotes disponibles</h3>

              <label
                v-if="!modoEdicion"
                class="flex cursor-pointer items-center gap-2 text-sm font-semibold text-indigo-600"
              >
                <input
                  v-model="seleccionarTodos"
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  @change="toggleTodosLosLotes"
                />

                Crear zona con todos
              </label>
            </div>

            <div class="max-h-72 overflow-y-auto rounded-lg border">
              <label
                v-for="path in pathsDisponibles"
                :key="path.id"
                class="flex items-center justify-between border-b px-3 py-2"
                :class="{
                  'bg-slate-100 text-slate-400': estaBloqueado(path.id),
                }"
              >
                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    :value="path.id"
                    v-model="zona.paths"
                    :disabled="estaBloqueado(path.id)"
                  />

                  <span>
                    {{ path.id }}
                  </span>
                </div>

                <span v-if="estaBloqueado(path.id)" class="text-xs text-red-500 font-semibold">
                  Ocupado
                </span>
              </label>
            </div>
          </div>

          <!-- Vista previa -->
          <div>
            <h3 class="mb-2 font-semibold text-slate-700">Vista previa</h3>

            <div class="flex justify-center rounded-lg p-3">
              <MiniMapa
                :svg="svgPlano"
                :svgIds="zona.paths"
                :ocupados="pathsOcupados"
                :color="zona.color"
                width="170px"
                height="170px"
              />
            </div>

            <div class="mt-4">
              <label class="mb-1 block text-sm font-semibold text-slate-700"> Color </label>

              <input type="color" v-model="zona.color" class="h-10 w-full rounded-lg border" />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex flex-col-reverse gap-3 border-t p-4 sm:flex-row sm:justify-end">
        <button
          @click="mostrarModal = false"
          class="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="modoEdicion ? actualizarZona() : registrarZona()"
          class="rounded-lg bg-slate-600 px-5 py-2 font-semibold text-white hover:bg-slate-700"
        >
          {{ modoEdicion ? 'Actualizar Zona' : 'Registrar Zona' }}
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

  <!-- Modal Eliminar Zona -->
  <div
    v-if="mostrarModalEliminar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl">
      <div class="border-b px-8 py-5">
        <h2 class="text-2xl font-bold text-red-600">Eliminar Zona</h2>
      </div>

      <div class="px-8 py-6">
        <p class="text-slate-700">
          ¿Está seguro que desea eliminar la zona
          <strong>{{ zonaEliminar.nombre }}</strong
          >?
        </p>

        <p class="mt-2 text-sm text-red-500">También se eliminarán todos los lotes asociados.</p>
      </div>

      <div class="flex justify-end gap-3 border-t px-8 py-5">
        <button
          @click="mostrarModalEliminar = false"
          class="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="eliminarZona"
          class="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import MiniMapa from '@/pages/inmobiliaria/components/MiniMapa.vue'

//nuevo
const seleccionarTodos = ref(false)
const authStore = useAuthStore()
const toast = useToast()
const busqueda = ref('')
const baseUrl = import.meta.env.VITE_API_URL
const contenidoModal = ref(null)
const route = useRoute()
const cargando = ref(false)
const mostrarModal = ref(false)
const zonas = ref([])
const pathsDisponibles = ref([])
const modoEdicion = ref(false)
const mostrarModalEliminar = ref(false)
const plano = ref({
  id: null,
  nombre: '',
})
const zonaEliminar = ref({
  id: null,
  nombre: '',
})

const abrirEliminar = (item) => {
  zonaEliminar.value = {
    id: item.id,
    nombre: item.nombre,
  }

  mostrarModalEliminar.value = true
}
const nuevaZona = () => {
  modoEdicion.value = false
  seleccionarTodos.value = false
  zona.value = {
    nombre: '',
    descripcion: '',
    color: '#e5e7eb',
    paths: [],
  }

  mostrarModal.value = true
  nextTick(() => {
    contenidoModal.value?.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  })
}

// nueva función que selecciona todos los lotes
const toggleTodosLosLotes = () => {
  if (seleccionarTodos.value) {
    zona.value.paths = pathsDisponibles.value
      .filter((path) => !estaBloqueado(path.id))
      .map((path) => path.id)
  } else {
    zona.value.paths = []
  }
}

const pathsOcupados = computed(() => {
  return zonas.value
    .filter((z) => z.id !== zona.value.id)
    .flatMap((z) => z.svgids.split(','))
    .filter(Boolean)
})

const obtenerPaths = (svg) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(svg, 'image/svg+xml')

  const paths = xml.querySelectorAll('path[id]')

  pathsDisponibles.value = [...paths].map((p) => ({
    id: p.getAttribute('id'),
    numero: p.getAttribute('data-lote') || '',
    manzana: p.getAttribute('data-manzana') || '',
    area: Number(p.getAttribute('data-area')) || 0,
  }))
}
const zona = ref({
  nombre: '',
  descripcion: '',
  color: '#ffffff',
  paths: [],
})
const zonasFiltradas = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  return zonas.value.filter(
    (z) => z.nombre.toLowerCase().includes(texto) || z.color.toLowerCase().includes(texto),
  )
})
const svgPlano = ref('')

const registrarZona = async () => {
  try {
    cargando.value = true

    const lotes = zona.value.paths.map((pathId) => {
      const lote = pathsDisponibles.value.find((p) => p.id === pathId)

      return {
        numero: lote?.numero || pathId,
        coordenadas_svg: pathId,
        area: lote?.area || 0,
        precio: 0,
        estado_id: 1,
        usuario_id: authStore.usuario.id,
        version_actual: 1,
      }
    })

    const body = {
      nombre: zona.value.nombre,
      descripcion: zona.value.descripcion,
      color: zona.value.color,
      plano_id: Number(route.params.planoId),
      lotes,
    }

    await axios.post(`${baseUrl}/zonas/zonas`, body, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Zona registrada correctamente')

    mostrarModal.value = false

    await getZonas()
  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message ?? 'No se pudo registrar la zona')
  } finally {
    cargando.value = false
  }
}

const getZonas = async () => {
  const { data } = await axios.get(`${baseUrl}/zonas/zonas_svg`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })
  console.log(data)
  zonas.value = data.filter((z) => z.plano_id === Number(route.params.planoId))
}

const cargarPlano = async () => {
  const { data } = await axios.get(`${baseUrl}/planos/plano_id?id=${route.params.planoId}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })

  plano.value = data
  const respuesta = await fetch(`http://localhost:3000/uploads/planos/${data.archivo_svg}`)

  svgPlano.value = await respuesta.text()

  obtenerPaths(svgPlano.value)
}

const editarZona = (z) => {
  zona.value = {
    id: z.id,
    nombre: z.nombre,
    descripcion: z.descripcion,
    color: z.color,
    paths: z.svgids.split(','),
  }
  console.log(z.color)
  modoEdicion.value = true
  mostrarModal.value = true
  nextTick(() => {
    contenidoModal.value?.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  })
}
const eliminarZona = async () => {
  try {
    await axios.delete(`${baseUrl}/zonas/zonas?id=${zonaEliminar.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Zona eliminada correctamente')

    mostrarModalEliminar.value = false

    await getZonas()
  } catch (error) {
    toast.error(error.response?.data?.message ?? 'No se pudo eliminar la zona')
  }
}
const actualizarZona = async () => {
  try {
    cargando.value = true

    const lotes = zona.value.paths.map((pathId) => {
      const lote = pathsDisponibles.value.find((p) => p.id === pathId)

      return {
        numero: pathId,
        coordenadas_svg: pathId,
        area: lote?.area || 0,
        precio: 0,
        estado_id: 1,
        usuario_id: authStore.usuario.id,
        version_actual: 1,
      }
    })

    const body = {
      nombre: zona.value.nombre,
      descripcion: zona.value.descripcion,
      color: zona.value.color,
      plano_id: Number(route.params.planoId),
      lotes,
    }

    await axios.put(`${baseUrl}/zonas/zonas?id=${zona.value.id}`, body, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Zona actualizada')

    mostrarModal.value = false
    modoEdicion.value = false

    await getZonas()
  } catch (error) {
    toast.error(error.response?.data?.message ?? 'Error al actualizar')
  } finally {
    cargando.value = false
  }
}
const estaBloqueado = (id) => {
  if (!modoEdicion.value) {
    return pathsOcupados.value.includes(id)
  }

  return pathsOcupados.value.includes(id) && !zona.value.paths.includes(id)
}

onMounted(() => {
  cargarPlano()
  getZonas()
})
</script>
