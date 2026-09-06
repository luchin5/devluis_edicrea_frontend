<template>
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-slate-800">Usuarios</h1>

      <p class="mt-1 text-slate-500">Administración de usuarios del sistema.</p>
    </div>

    <button
      @click="abrirNuevoUsuario"
      class="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
    >
      <i class="fa-solid fa-user-plus mr-2"></i>
      Nuevo Usuario
    </button>
  </div>

  <div class="mb-5">
    <div class="relative">
      <i
        class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        v-model="buscar"
        placeholder="Buscar por nombre o usuario..."
        class="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  </div>

  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="max-h-[350px] overflow-auto">
      <table class="min-w-full border-separate border-spacing-0">
        <thead class="sticky top-0 z-10 bg-slate-100">
          <tr>
            <th
              class="border-b border-slate-200 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Nombre
            </th>

            <th
              class="border-b border-slate-200 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Usuario
            </th>

            <th
              class="border-b border-slate-200 px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Rol
            </th>

            <th
              class="border-b border-slate-200 px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600"
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="usuario in usuariosFiltrados"
            :key="usuario.id"
            class="transition hover:bg-indigo-50"
          >
            <td class="border-b border-slate-100 px-6 py-4">
              <div class="font-semibold text-slate-800">
                {{ usuario.nombres }} {{ usuario.apellidos }}
              </div>

              <div class="mt-1 text-xs text-slate-500">ID: {{ usuario.id }}</div>
            </td>

            <td class="border-b border-slate-100 px-6 py-4">
              <span class="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {{ usuario.nickname }}
              </span>
            </td>

            <td class="border-b border-slate-100 px-6 py-4">
              <span
                v-if="usuario.rol_id === 1"
                class="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700"
              >
                Administrador
              </span>

              <span
                v-else
                class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700"
              >
                Colaborador
              </span>
            </td>

            <td class="border-b border-slate-100 px-6 py-4">
              <div class="flex justify-center gap-2">
                <button
                  @click="editarUsuario(usuario)"
                  class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  <i class="fa-solid fa-pen-to-square mr-1"></i>
                  Editar
                </button>

                <button
                  @click="abrirModalEliminar(usuario)"
                  class="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  <i class="fa-solid fa-trash mr-1"></i>
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal para crear o editar usuario -->
  <div v-if="mostrarModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="w-full max-w-lg rounded-2xl bg-white p-6">
      <h2 class="mb-6 text-2xl font-bold">
        {{ modoEdicion ? 'Editar Usuario' : 'Nuevo Usuario' }}
      </h2>

      <div class="space-y-4">
        <input
          v-model="usuarioForm.nombres"
          placeholder="Nombres"
          class="w-full rounded-lg border p-3"
        />

        <input
          v-model="usuarioForm.apellidos"
          placeholder="Apellidos"
          class="w-full rounded-lg border p-3"
        />

        <input
          v-model="usuarioForm.nickname"
          placeholder="Usuario"
          class="w-full rounded-lg border p-3"
        />

        <select v-model="usuarioForm.rol_id" class="w-full rounded-lg border p-3">
          <option :value="1">Administrador</option>

          <option :value="2">Asesor</option>
        </select>

        <input
          v-if="!modoEdicion"
          v-model="usuarioForm.contrasena"
          type="password"
          placeholder="Contraseña"
          class="w-full rounded-lg border p-3"
        />
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button @click="mostrarModal = false" class="rounded-lg border px-5 py-2">Cancelar</button>

        <button @click="guardarUsuario" class="rounded-lg bg-indigo-600 px-5 py-2 text-white">
          Guardar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Eliminar -->
  <div
    v-if="mostrarModalEliminar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-2xl font-bold text-slate-800">Eliminar Usuario</h2>

      <p class="mt-4 text-slate-600">
        ¿Está seguro de eliminar al usuario
        <span class="font-semibold"> {{ usuarioEliminar?.nickname }} </span>?
      </p>

      <p class="mt-2 text-sm text-red-500">Esta acción no se puede deshacer.</p>

      <div class="mt-8 flex justify-end gap-3">
        <button
          @click="mostrarModalEliminar = false"
          class="rounded-xl border border-slate-300 px-5 py-2 hover:bg-slate-100"
        >
          Cancelar
        </button>

        <button
          @click="eliminarUsuario"
          class="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Eliminar
        </button>
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
