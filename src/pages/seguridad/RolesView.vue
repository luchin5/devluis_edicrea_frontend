<template>
  <div class="w-full">
    <!-- ===================================================== -->
    <!-- ENCABEZADO -->
    <!-- ===================================================== -->

    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#0879a8]">
          Administración
        </p>

        <h1 class="mt-1 text-2xl font-bold tracking-tight text-[#0b2d52] md:text-3xl">Usuarios</h1>

        <p class="mt-2 text-sm text-slate-500 md:text-base">
          Administración de usuarios del sistema.
        </p>
      </div>

      <!-- NUEVO USUARIO -->

      <button
        type="button"
        @click="abrirNuevoUsuario"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0879a8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#06688f] hover:shadow-md"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M15 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 3 17.5V19m6-8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6-2v6m-3-3h6"
          />
        </svg>

        Nuevo usuario
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
            d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0c0-3.87 3.13-7 7-7a7 7 0 0 1 7 7Z"
          />
        </svg>

        <input
          v-model="buscar"
          type="text"
          placeholder="Buscar por nombre o usuario..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
        />

        <button
          v-if="buscar"
          type="button"
          @click="buscar = ''"
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
    <!-- RESUMEN -->
    <!-- ===================================================== -->

    <div class="mb-4 flex items-center justify-between">
      <div>
        <p class="text-sm font-semibold text-[#0b2d52]">Usuarios registrados</p>

        <p class="mt-0.5 text-xs text-slate-400">
          {{ usuariosFiltrados.length }}
          usuario{{ usuariosFiltrados.length === 1 ? '' : 's' }}
        </p>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- TABLA -->
    <!-- ===================================================== -->

    <section class="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <!-- HEADER -->

          <thead class="border-b border-slate-100 bg-[#e8f6fb]">
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#0b2d52]"
              >
                Usuario
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#0b2d52]"
              >
                Cuenta
              </th>

              <th
                class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#0b2d52]"
              >
                Rol
              </th>

              <th
                class="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#0b2d52]"
              >
                Acciones
              </th>
            </tr>
          </thead>

          <!-- BODY -->

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="usuario in usuariosFiltrados"
              :key="usuario.id"
              class="transition hover:bg-slate-50"
            >
              <!-- USUARIO -->

              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f6fb] text-sm font-bold text-[#0879a8]"
                  >
                    {{ usuario.nombres?.charAt(0)?.toUpperCase() }}
                  </div>

                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-[#0b2d52]">
                      {{ usuario.nombres }} {{ usuario.apellidos }}
                    </p>

                    <p class="mt-0.5 text-xs text-slate-400">ID: {{ usuario.id }}</p>
                  </div>
                </div>
              </td>

              <!-- NICKNAME -->

              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600"
                >
                  {{ usuario.nickname }}
                </span>
              </td>

              <!-- ROL -->

              <td class="px-6 py-4">
                <span
                  v-if="usuario.rol_id === 1"
                  class="inline-flex items-center gap-2 rounded-full bg-[#e8f6fb] px-3 py-1.5 text-xs font-bold text-[#0879a8]"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-[#0879a8]"></span>
                  Administrador
                </span>

                <span
                  v-else
                  class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Colaborador
                </span>
              </td>

              <!-- ACCIONES -->

              <td class="px-6 py-4">
                <div class="flex justify-center gap-2">
                  <!-- EDITAR -->

                  <button
                    type="button"
                    @click="editarUsuario(usuario)"
                    class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                    title="Editar usuario"
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
                    type="button"
                    @click="abrirModalEliminar(usuario)"
                    class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    title="Eliminar usuario"
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- SIN RESULTADOS -->

      <div
        v-if="usuariosFiltrados.length === 0"
        class="border-t border-slate-100 px-6 py-14 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-300"
        >
          <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19m6-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 1h5m-2.5-2.5V13.5"
            />
          </svg>
        </div>

        <h2 class="mt-4 text-base font-bold text-[#0b2d52]">No encontramos usuarios</h2>

        <p class="mt-1 text-sm text-slate-400">
          {{
            buscar
              ? 'Intenta realizar una búsqueda diferente.'
              : 'Todavía no existen usuarios registrados.'
          }}
        </p>

        <button
          v-if="buscar"
          type="button"
          @click="buscar = ''"
          class="mt-4 text-sm font-semibold text-[#0879a8] hover:text-[#0b2d52]"
        >
          Limpiar búsqueda
        </button>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- MODAL CREAR / EDITAR -->
    <!-- ===================================================== -->

    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <!-- HEADER -->

        <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6fb] text-[#0879a8]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M15 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 3 17.5V19m6-8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm6-2v6m-3-3h6"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-xl font-bold text-[#0b2d52]">
                {{ modoEdicion ? 'Editar usuario' : 'Nuevo usuario' }}
              </h2>

              <p class="mt-0.5 text-sm text-slate-400">
                {{
                  modoEdicion
                    ? 'Actualice la información del usuario.'
                    : 'Registre un nuevo usuario en el sistema.'
                }}
              </p>
            </div>
          </div>

          <button
            type="button"
            @click="mostrarModal = false"
            class="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            title="Cerrar"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- BODY -->

        <div class="space-y-5 p-6">
          <!-- NOMBRES -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Nombres </label>

            <input
              v-model="usuarioForm.nombres"
              type="text"
              placeholder="Ingrese los nombres"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- APELLIDOS -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Apellidos </label>

            <input
              v-model="usuarioForm.apellidos"
              type="text"
              placeholder="Ingrese los apellidos"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- USUARIO + ROL -->

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700"> Usuario </label>

              <input
                v-model="usuarioForm.nickname"
                type="text"
                placeholder="Nombre de usuario"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700"> Rol </label>

              <select
                v-model="usuarioForm.rol_id"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
              >
                <option :value="1">Administrador</option>

                <option :value="2">Asesor</option>
              </select>
            </div>
          </div>

          <!-- CONTRASEÑA -->

          <div v-if="!modoEdicion">
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Contraseña </label>

            <input
              v-model="usuarioForm.contrasena"
              type="password"
              placeholder="Ingrese una contraseña"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>
        </div>

        <!-- FOOTER -->

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end"
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
            @click="guardarUsuario"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0879a8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06688f] hover:shadow-md"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M5 12.5 9.5 17 19 7.5"
              />
            </svg>

            {{ modoEdicion ? 'Guardar cambios' : 'Crear usuario' }}
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
                d="M12 9v4m0 4h.01M5.2 19h13c1.55 0 2.5-1.67 1.72-3L13.72 4c-.77-1.33-2.69-1.33-3.46 0L3.48 16c-.78 1.33.17 3 1.72 3Z"
              />
            </svg>
          </div>

          <h2 class="mt-5 text-xl font-bold text-[#0b2d52]">Eliminar usuario</h2>

          <p class="mt-3 text-sm leading-relaxed text-slate-500">
            ¿Está seguro de eliminar al usuario
            <strong class="text-slate-700"> {{ usuarioEliminar?.nickname }} </strong>?
          </p>

          <div class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-left">
            <p class="text-xs font-semibold text-red-600">Importante</p>

            <p class="mt-1 text-xs leading-relaxed text-red-500">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <!-- FOOTER -->

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
            @click="eliminarUsuario"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M5 7h14M10 11v6M14 11v6M9 7V4h6v3m-9 0 1 13h10l1-13"
              />
            </svg>

            Eliminar usuario
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const mostrarModalEliminar = ref(false)
const usuarioEliminar = ref(null)
const baseUrl = import.meta.env.VITE_API_URL
const toast = useToast()

const usuarios = ref([])
const buscar = ref('')
const mostrarModal = ref(false)
const modoEdicion = ref(false)

const usuarioForm = reactive({
  id: null,
  nombres: '',
  apellidos: '',
  nickname: '',
  contrasena: '',
  rol_id: 2,
})
const abrirModalEliminar = (usuario) => {
  usuarioEliminar.value = usuario
  mostrarModalEliminar.value = true
}
const limpiarFormulario = () => {
  usuarioForm.id = null
  usuarioForm.nombres = ''
  usuarioForm.apellidos = ''
  usuarioForm.nickname = ''
  usuarioForm.contrasena = ''
  usuarioForm.rol_id = 2
}

const abrirNuevoUsuario = () => {
  modoEdicion.value = false

  limpiarFormulario()

  mostrarModal.value = true
}
const eliminarUsuario = async () => {
  try {
    await axios.delete(`${baseUrl}/usuarios/usuario?id=${usuarioEliminar.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Usuario eliminado correctamente.')

    mostrarModalEliminar.value = false

    usuarioEliminar.value = null

    await cargarUsuarios()
  } catch (error) {
    console.error(error)

    toast.error('No se pudo eliminar el usuario.')
  }
}

const editarUsuario = (usuario) => {
  modoEdicion.value = true

  usuarioForm.id = usuario.id
  usuarioForm.nombres = usuario.nombres
  usuarioForm.apellidos = usuario.apellidos
  usuarioForm.nickname = usuario.nickname
  usuarioForm.rol_id = usuario.rol_id
  usuarioForm.contrasena = ''

  mostrarModal.value = true
}

const guardarUsuario = async () => {
  try {
    if (modoEdicion.value) {
      await axios.put(
        `${baseUrl}/usuarios/usuarios?id=${usuarioForm.id}`,
        {
          nombres: usuarioForm.nombres,
          apellidos: usuarioForm.apellidos,
          nickname: usuarioForm.nickname,
          rol_id: usuarioForm.rol_id,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      )
    } else {
      await axios.post(
        `${baseUrl}/usuarios/usuarios`,
        {
          nombres: usuarioForm.nombres,
          apellidos: usuarioForm.apellidos,
          nickname: usuarioForm.nickname,
          contrasena: usuarioForm.contrasena,
          rol_id: usuarioForm.rol_id,
        },
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        },
      )
    }

    mostrarModal.value = false

    limpiarFormulario()

    toast.success(`Usuario ${modoEdicion.value ? 'actualizado' : 'creado'} correctamente.`)

    await cargarUsuarios()
  } catch (error) {
    toast.error(`Error al guardar usuario: ${error.response?.data?.message || error.message}`)
    console.error('Error al guardar usuario:', error)
  }
}

const usuariosFiltrados = computed(() => {
  const texto = buscar.value.toLowerCase()

  return usuarios.value.filter((u) => {
    return (
      u.nombres.toLowerCase().includes(texto) ||
      u.apellidos.toLowerCase().includes(texto) ||
      (u.nickname ?? '').toLowerCase().includes(texto)
    )
  })
})

const cargarUsuarios = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/usuarios/usuarios`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    usuarios.value = data
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>
