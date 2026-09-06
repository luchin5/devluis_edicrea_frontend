<template>
  <div>
    <!-- Encabezado -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-800">Lotes de la Zona: {{ zona.nombre }}</h1>
        <p class="mt-2 text-slate-500">
          Proyecto:
          <span class="font-medium">{{ zona.proyecto }}</span>

          · Plano:
          <span class="font-medium">{{ zona.plano }}</span>

          · Zona:
          <span class="font-medium">{{ zona.nombre }}</span>
        </p>
        <!--p class="mt-2 text-slate-500">
          Seleccione un lote del plano para visualizar o modificar su información.
        </p-->
      </div>

      <RouterLink
        :to="`/proyectos/${route.params.proyectoId}/planos/${route.params.planoId}/zonas`"
        class="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
      >
        ← Volver a Zonas
      </RouterLink>
    </div>

    <!-- CONTENIDO PRINCIPAL -->
    <div class="grid grid-cols-12 gap-6">
      <!-- PLANO -->
      <div class="col-span-12 lg:col-span-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b px-6 py-4">
          <h2 class="text-xl font-semibold text-slate-800">Plano Interactivo</h2>

          <p class="text-sm text-slate-500">Haga clic sobre un lote.</p>
        </div>

        <div class="flex h-[700px] items-center justify-center bg-slate-50 p-6">
          <MiniMapa
            :svg="svgPlano"
            :svgIds="zona.svg_paths"
            :color="zona.color"
            :lotes="lotes"
            :loteSeleccionado="loteSeleccionado?.coordenadas_svg"
            width="100%"
            height="620px"
            @seleccionar-lote="seleccionarLote"
          />
        </div>
      </div>

      <!-- PANEL DERECHO -->
      <div class="col-span-12 lg:col-span-4 space-y-6">
        <!-- LOTE -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b px-6 py-4">
            <h2 class="font-semibold text-slate-800">
              {{
                loteSeleccionado
                  ? `Manzana ${loteSeleccionado.manzana} - Lote ${loteSeleccionado.numero}`
                  : 'Lote Seleccionado'
              }}
            </h2>
          </div>

          <div class="space-y-4 p-6">
            <div class="flex justify-between">
              <span class="text-slate-500">Colaborador: </span>
              <span class="font-semibold text-slate-800">
                {{ loteSeleccionado?.nombres }}
                {{ loteSeleccionado?.apellidos }}
              </span>
            </div>
            <div>
              <div class="text-sm text-slate-500">Manzana</div>

              <div class="text-2xl font-bold text-red-600">
                {{ loteSeleccionado?.manzana || '--' }}
              </div>
            </div>
            <div>
              <div class="text-sm text-slate-500">Número</div>
              <div class="text-2xl font-bold text-indigo-700">
                {{ loteSeleccionado?.numero || '--' }}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- ÁREA -->
              <div>
                <div class="text-sm text-slate-500">Área</div>
                <div class="font-semibold">{{ loteSeleccionado?.area || '--' }} m²</div>
              </div>

              <!-- PERÍMETRO -->
              <div>
                <div class="text-sm text-slate-500">Perímetro</div>
                <div class="font-semibold">{{ loteSeleccionado?.perimetro || '--' }} m</div>
              </div>
            </div>

            <!-- ESTADO -->
            <div>
              <div class="text-sm text-slate-500 font-semibold">Estado</div>

              <div :class="[estados[loteSeleccionado?.estado_id]?.color, 'font-bold']">
                {{ estados[loteSeleccionado?.estado_id]?.nombre || '--' }}
              </div>
            </div>

            <div>
              <div class="text-sm text-slate-500">Precio</div>

              <div class="font-semibold">S/ {{ loteSeleccionado?.precio || '--' }}</div>
            </div>

            <div>
              <div class="text-sm text-slate-500">Versión</div>

              v{{ loteSeleccionado?.version_actual || 1 }}
            </div>

            <div>
              <div class="text-sm text-slate-500">Última actualización</div>

              <div class="font-semibold">
                {{
                  loteSeleccionado?.fecha_actualizacion
                    ? new Date(loteSeleccionado.fecha_actualizacion).toLocaleDateString()
                    : '--'
                }}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 pt-4">
              <button
                v-if="authStore.usuario?.rol_id === 1"
                @click="abrirModalEditar"
                class="rounded-lg bg-amber-500 py-2 text-white hover:bg-amber-600"
              >
                Editar
              </button>

              <button
                v-if="authStore.usuario?.rol_id === 2"
                @click="cambiarEstado"
                class="rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700"
              >
                Estado
              </button>
            </div>
          </div>
        </div>

        <!-- ESTADISTICAS -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b px-6 py-4">
            <h2 class="font-semibold text-slate-800">Estadísticas</h2>
          </div>

          <div class="space-y-5 p-6">
            <div class="flex items-center justify-between">
              <span class="text-slate-600"> 🟢 Disponibles </span>

              <span class="font-bold">
                {{ estadisticas.disponibles }}
              </span>
            </div>

            <!-- SEPARADOS -->
            <div class="flex items-center justify-between">
              <span class="text-slate-600"> 🟡 Separados </span>

              <span class="font-bold">
                {{ estadisticas.separados ?? estadisticas.reservados ?? 0 }}
              </span>
            </div>

            <!-- AMORTIZADOS -->
            <div class="flex items-center justify-between">
              <span class="text-slate-600"> 🟠 Amortizados </span>

              <span class="font-bold">
                {{ estadisticas.amortizados ?? 0 }}
              </span>
            </div>

            <!-- VENDIDOS -->
            <div class="flex items-center justify-between">
              <span class="text-slate-600"> 🔴 Vendidos </span>

              <span class="font-bold">
                {{ estadisticas.vendidos ?? 0 }}
              </span>
            </div>

            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Editar Lote ADMINISTRADOR -->
  <div
    v-if="mostrarModalEditar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div class="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">Editar Lote</h2>
          <p class="mt-1 text-sm text-slate-500">Modifique la información del lote seleccionado.</p>
        </div>

        <button
          @click="mostrarModalEditar = false"
          class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Número -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700"> Número </label>

            <input
              v-model="loteForm.numero"
              type="text"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
          </div>

          <!-- Área -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700"> Área (m²) </label>

            <input
              v-model="loteForm.area"
              type="number"
              step="0.01"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
          </div>

          <!-- Precio -->
          <div class="md:col-span-2">
            <label class="mb-2 block text-sm font-medium text-slate-700"> Precio </label>

            <input
              v-model="loteForm.precio"
              type="number"
              step="0.01"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            />
            <label class="mb-2 block text-sm font-medium text-slate-700"> Estado </label>

            <select
              v-model="loteForm.estado_id"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            >
              <option :value="1">🟢 Disponible</option>
              <option :value="2">🟡 Reservado</option>
              <option :value="3">🔴 Vendido</option>
              <option :value="4">⚫ Bloqueado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5">
        <button
          @click="mostrarModalEditar = false"
          class="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="guardarEdicion"
          class="rounded-xl bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-700"
        >
          <i class="fa-solid fa-floppy-disk mr-2"></i>
          Guardar Cambios
        </button>
      </div>

      <div class="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4">
        <div class="text-sm text-slate-500">Última actualización</div>

        <div class="font-semibold text-slate-700">
          {{
            loteSeleccionado?.fecha_actualizacion
              ? new Date(loteSeleccionado.fecha_actualizacion).toLocaleString()
              : 'Nunca'
          }}
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Cambiar Estado VENDEDOR-->
  <div
    v-if="mostrarModalEstado"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">Actualizar Estado</h2>

          <p class="mt-1 text-sm text-slate-500">Lote {{ loteSeleccionado?.numero }}</p>
        </div>

        <button @click="cancelarEstado" class="rounded-lg p-2 hover:bg-slate-100">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2"> Estado actual </label>

          <div class="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-semibold">
            {{ estados[loteSeleccionado?.estado_id]?.nombre }}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2"> Nuevo Estado </label>

          <select
            v-model="estadoForm.estado_id"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <!-- LIBRE -->
            <template v-if="loteSeleccionado?.estado_id === 1">
              <option :value="2">🟡 Separado — 5 días</option>
              <option :value="4">🟠 Amortizado — 15 días</option>
              <option :value="3">🔵 Vendido</option>
            </template>

            <!-- SEPARADO -->
            <template v-else-if="loteSeleccionado?.estado_id === 2">
              <option :value="4">🟠 Amortizado — 15 días</option>
              <option :value="3">🔵 Vendido</option>
            </template>

            <!-- AMORTIZADO -->
            <template v-else-if="loteSeleccionado?.estado_id === 4">
              <option :value="3">🔵 Vendido</option>
            </template>

            <!-- VENDIDO -->
            <template v-else-if="loteSeleccionado?.estado_id === 3">
              <option :value="3">🔵 Vendido</option>
            </template>
          </select>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5">
        <button
          @click="cancelarEstado"
          class="rounded-xl border border-slate-300 bg-white px-5 py-2.5 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="guardarEstado"
          class="rounded-xl bg-indigo-600 px-6 py-2.5 text-white hover:bg-indigo-700"
        >
          <i class="fa-solid fa-floppy-disk mr-2"></i>
          Guardar Estado
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
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import MiniMapa from '@/pages/inmobiliaria/components/MiniMapa.vue'
import { useAuthStore } from '@/stores/auth'
import socketService from '@/services/socket.js'

const authStore = useAuthStore()
const route = useRoute()
const toast = useToast()
const baseUrl = import.meta.env.VITE_API_URL
const cargando = ref(false)
const svgPlano = ref('')
const zona = ref({})
const loteSeleccionado = ref(null)
const lotes = ref([])
const mostrarModalEditar = ref(false)

const mostrarModalEstado = ref(false)

const estadoForm = reactive({
  estado_id: 1,
})
const estadisticas = ref({
  disponibles: 0,
  reservados: 0,
  vendidos: 0,
  bloqueados: 0,
})
const cambiarEstado = () => {
  if (!loteSeleccionado.value) return

  // Vendido
  if (loteSeleccionado.value.estado_id === 3) {
    toast.info('Este lote ya fue vendido.')
    return
  }

  // Bloqueado por administrador
  if (loteSeleccionado.value.estado_id === 4) {
    toast.warning('Este lote está amortizado.')
    return
  }

  // Ya lo está editando otro colaborador
  if (loteSeleccionado.value.enEdicion) {
    toast.warning('Otro colaborador está editando este lote.')
    return
  }

  // Recién aquí consulto al servidor
  socketService.editarLote(loteSeleccionado.value.id, authStore.usuario.id)
}
const guardarEstado = async () => {
  try {
    cargando.value = true

    await axios.put(
      `${baseUrl}/lotes/lotes_vendedor?id=${loteSeleccionado.value.id}`,
      {
        estado_id: estadoForm.estado_id,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    loteSeleccionado.value.estado_id = estadoForm.estado_id

    toast.success('Estado actualizado correctamente.')

    mostrarModalEstado.value = false
  } catch (error) {
    console.error(error)

    toast.error('No se pudo actualizar el estado.')
  } finally {
    if (loteSeleccionado.value) {
      socketService.liberarLote(loteSeleccionado.value.id)
    }

    cargando.value = false
  }
}
const cancelarEstado = () => {
  if (loteSeleccionado.value) {
    socketService.liberarLote(loteSeleccionado.value.id)
  }

  mostrarModalEstado.value = false
}
const loteForm = reactive({
  id: null,
  numero: '',
  area: 0,
  precio: 0,
  estado_id: 1,
})
const guardarEdicion = async () => {
  try {
    cargando.value = true

    await axios.put(
      `${baseUrl}/lotes/lotes?id=${loteForm.id}`,
      {
        numero: loteForm.numero,
        area: loteForm.area,
        precio: loteForm.precio,
        estado_id: loteForm.estado_id,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    Object.assign(loteSeleccionado.value, {
      numero: loteForm.numero,
      area: loteForm.area,
      precio: loteForm.precio,
      estado_id: loteForm.estado_id,
    })

    const index = lotes.value.findIndex((l) => l.id === loteForm.id)

    if (index !== -1) {
      Object.assign(lotes.value[index], {
        numero: loteForm.numero,
        area: loteForm.area,
        precio: loteForm.precio,
        estado_id: loteForm.estado_id,
      })
    }

    toast.success('Lote actualizado.')

    mostrarModalEditar.value = false

    await cargarLotes()
  } catch (error) {
    console.error(error)

    toast.error('No se pudo actualizar el lote.')
  } finally {
    cargando.value = false
  }
}
const abrirModalEditar = () => {
  if (!loteSeleccionado.value) return

  loteForm.id = loteSeleccionado.value.id
  loteForm.numero = loteSeleccionado.value.numero
  loteForm.area = loteSeleccionado.value.area
  loteForm.precio = loteSeleccionado.value.precio
  loteForm.estado_id = loteSeleccionado.value.estado_id

  mostrarModalEditar.value = true
}

const estados = {
  1: {
    nombre: 'Disponible',
    color: 'text-green-600',
  },
  2: {
    nombre: 'Separado',
    color: 'text-yellow-600',
  },
  3: {
    nombre: 'Vendido',
    color: 'text-red-600',
  },
  4: {
    nombre: 'Amortizado',
    color: 'text-slate-600',
  },
}
const cargarEstadisticas = async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/lotes/estadisticas_zona_id?id=${route.params.zonaId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )
    console.log(`${baseUrl}/lotes/estadisticas_zona_id?id=${route.params.zonaId}`)
    console.log('cargarEstadisticas', data)
    estadisticas.value = data
  } catch (error) {
    console.error('Error al cargar estadísticas:', error)
  }
}
const seleccionarLote = (datos) => {
  loteSeleccionado.value = lotes.value.find((l) => l.coordenadas_svg === datos.id) || null

  if (loteSeleccionado.value) {
    loteSeleccionado.value = {
      ...loteSeleccionado.value,
      manzana: datos.manzana,
      perimetro: datos.perimetro,
    }
  }
}
/*
const seleccionarLote = (svgId) => {
  loteSeleccionado.value = lotes.value.find((l) => l.coordenadas_svg === svgId) || null
}*/

const cargarZona = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/zonas/zonas_id?id=${route.params.zonaId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    zona.value = {
      ...data,
      svg_paths: data.svgids ? data.svgids.split(',') : [],
    }

    console.log('cargar zona', zona.value)
    console.log('cargar zona', zona.value)
  } catch (error) {
    console.error('Error al cargar la zona:', error)
  }
}

const cargarPlano = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/planos/plano_id?id=${route.params.planoId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    const respuesta = await fetch(
      `${baseUrl.replace('/api_v1', '')}/uploads/planos/${data.archivo_svg}`,
    )

    svgPlano.value = await respuesta.text()
  } catch (error) {
    console.error('Error al cargar el SVG:', error)
  }
}

const cargarLotes = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/lotes/lotes`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    console.log('cargar lotes', (lotes.value = data))
    // Solo los lotes de esta zona
    lotes.value = data.filter((l) => l.zona_id == route.params.zonaId)

    // Seleccionar automáticamente el primero
    if (lotes.value.length > 0) {
      loteSeleccionado.value = lotes.value[0]
    }
  } catch (error) {
    console.error('Error al cargar lotes:', error)
  }
}
const registrarEventos = () => {
  socketService.onLoteDisponible(({ loteId }) => {
    const lote = lotes.value.find((l) => l.id === loteId)

    if (!lote) return

    lote.enEdicion = true

    if (loteSeleccionado.value?.id !== loteId) return

    estadoForm.estado_id = lote.estado_id

    mostrarModalEstado.value = true
  })

  socketService.onLoteBloqueado(({ mensaje }) => {
    toast.warning(mensaje)
  })

  socketService.onLoteEnEdicion(({ loteId }) => {
    const lote = lotes.value.find((l) => l.id === loteId)

    if (!lote) return

    lote.enEdicion = true
    // Solo aviso si el usuario tiene seleccionado ese lote AQUI OJO REVISAR SI CONVIENE O NO ESTA MODIFICACION DEL TOAST
    if (loteSeleccionado.value?.id === loteId) {
      toast.info(`El lote ${lote.numero} está siendo gestionado por otro colaborador.`)
    }
  })

  socketService.onLoteLiberado(({ loteId }) => {
    const lote = lotes.value.find((l) => l.id === loteId)

    if (!lote) return

    lote.enEdicion = false

    // toast.success(`Lote ${lote.numero} liberado.`)
  })

  socketService.onLoteActualizado((loteActualizado) => {
    const lote = lotes.value.find((l) => l.id === loteActualizado.id)

    if (!lote) return

    Object.assign(lote, loteActualizado)

    lote.enEdicion = false

    if (loteSeleccionado.value && loteSeleccionado.value.id === loteActualizado.id) {
      Object.assign(loteSeleccionado.value, loteActualizado)
      loteSeleccionado.value.enEdicion = false
    }
    cargarEstadisticas()
  })
}
onMounted(async () => {
  socketService.connect(authStore.usuario.id)

  await cargarZona()
  await cargarPlano()
  await cargarLotes()
  await cargarEstadisticas()

  registrarEventos()
})

onUnmounted(() => {
  if (loteSeleccionado.value) {
    socketService.liberarLote(loteSeleccionado.value.id)
  }

  socketService.removeAll()
  socketService.disconnect()
})
</script>
