<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center py-6 px-4">
    <div
      class="w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2"
    >
      <!-- Panel izquierdo -->
      <div class="hidden lg:flex bg-gray-200 text-slate-800 flex-col justify-center p-5">
        <div class="mt-5">
          <img src="/images/edicrea.png" class="w-full max-h-100 object-cover rounded-2xl" />
        </div>
      </div>

      <!-- Panel derecho -->
      <div class="p-8 md:p-12">
        <div class="flex justify-center lg:hidden mb-8">
          <img src="/images/edicrea.png" alt="Constructora CRM" class="w-20 h-20 object-contain" />
        </div>

        <h2 class="text-3xl font-bold text-slate-800 text-center lg:text-left">Iniciar Sesión</h2>

        <p class="text-gray-500 mt-2 text-center lg:text-left">
          Ingrese sus credenciales para continuar.
        </p>

        <form @submit.prevent="login" class="mt-10 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Usuario </label>

            <input
              v-model="nickname"
              type="text"
              placeholder="Ingrese su usuario"
              class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"> Contraseña </label>

            <div class="relative">
              <input
                v-model="contrasena"
                :type="mostrarContrasena ? 'text' : 'password'"
                placeholder="********"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="button"
                @click="mostrarContrasena = !mostrarContrasena"
                class="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-orange-50 hover:text-orange-500 transition"
                :title="mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                <!-- Ojo abierto -->
                <svg
                  v-if="!mostrarContrasena"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12Z"
                  />

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <!-- Ojo tachado -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.8"
                  stroke="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c1.5 2.7 4.5 6.75 9.75 6.75a9.77 9.77 0 0 0 4.17-.91"
                  />

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.23 6.23C7.8 5.16 9.73 4.5 12 4.5c5.25 0 8.25 4.05 9.75 7.5a13.6 13.6 0 0 1-3.14 4.47"
                  />

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.23 6.23 3 3m3.23 3.23 4.54 4.54m3.46 3.46L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-black hover:bg-gray-500 text-white py-3 rounded-xl font-semibold transition"
          >
            Ingresar
          </button>
        </form>

        <div class="mt-10 text-center text-sm text-gray-500">© 2026 Constructora CRM</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// VARIABLES
const mostrarContrasena = ref(false)
const router = useRouter()
const nickname = ref('')
const contrasena = ref('')
const authStore = useAuthStore()

const login = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL
    console.log('base ...url', baseUrl)
    console.log('nickname', nickname, contrasena)
    const response = await axios.post(`${baseUrl}/login`, {
      nickname: nickname.value,
      contrasena: contrasena.value,
    })
    console.log(response.data)
    authStore.login(response.data)
    // NAVEGAR A RUTA
    router.replace('/dashboard')
  } catch (error) {
    alert(error.response?.data?.message || 'Error al iniciar sesión')
  }
}
</script>
