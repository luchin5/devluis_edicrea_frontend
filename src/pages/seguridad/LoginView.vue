<template>
  <div
    class="min-h-screen bg-[#f8fafc] flex items-center justify-center p-3 overflow-y-auto md:p-4"
  >
    <!-- CONTENEDOR PRINCIPAL -->
    <div
      class="relative w-full max-w-6xl min-h-[calc(100vh-32px)] h-auto lg:h-[calc(100vh-32px)] lg:max-h-[720px] overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
    >
      <!-- IMAGEN DE FONDO DE TODA LA COMPOSICIÓN -->
      <img src="/images/casa4.png" alt="" class="absolute inset-0 h-full w-full object-cover" />

      <!-- CAPA DE LECTURA -->
      <div class="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>

      <!-- ========================================= -->
      <!-- DECORACIÓN DE FONDO -->
      <!-- ========================================= -->

      <div class="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-sky-50"></div>

      <div
        class="absolute -bottom-40 left-[35%] w-[500px] h-[500px] rounded-full bg-blue-50/80"
      ></div>

      <div class="absolute top-20 right-[35%] w-64 h-64 rounded-full bg-cyan-50/70 blur-2xl"></div>

      <!-- ========================================= -->
      <!-- CONTENIDO -->
      <!-- ========================================= -->

      <div class="relative z-10 grid min-h-full lg:h-full lg:grid-cols-2">
        <!-- ========================================= -->
        <!-- PANEL IZQUIERDO -->
        <!-- ========================================= -->

        <section
          class="relative flex h-auto min-h-[420px] flex-col justify-between overflow-hidden px-6 py-8 md:px-10 md:py-10 lg:h-full xl:px-14"
        >
          <!-- DECORACIÓN -->
          <div class="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-sky-50"></div>

          <div
            class="absolute bottom-[-180px] left-[-100px] h-[420px] w-[420px] rounded-full bg-blue-50"
          ></div>

          <div
            class="absolute right-[-120px] top-[20%] h-[300px] w-[300px] rounded-full bg-cyan-50/60 blur-3xl"
          ></div>

          <!-- CONTENIDO -->
          <div
            class="relative z-10 flex h-auto min-h-[420px] flex-col p-6 md:p-10 lg:h-full xl:p-14"
          >
            <!-- LOGO -->
            <div>
              <img
                src="/images/edicrea.png"
                alt="EDICREA - Constructora Inmobiliaria"
                class="w-[180px] xl:w-[200px] object-contain"
              />
            </div>

            <!-- TEXTO -->
            <div class="my-auto max-w-lg">
              <div class="mb-6 h-1 w-16 rounded-full bg-[#0879a8]"></div>

              <h1
                class="text-4xl font-bold leading-[1.08] tracking-tight text-[#0b2d52] xl:text-5xl"
              >
                Construyendo lugares
                <span class="block text-[#0879a8]"> para grandes historias. </span>
              </h1>

              <p class="mt-6 max-w-md text-base leading-relaxed text-slate-500 xl:text-lg">
                Administramos hoy los espacios del mañana.
              </p>
            </div>

            <!-- INDICADORES DECORATIVOS -->
            <div class="flex items-center gap-2">
              <div class="h-2.5 w-9 rounded-full bg-[#0879a8]"></div>

              <div class="h-2.5 w-9 rounded-full bg-slate-300"></div>

              <div class="h-2.5 w-9 rounded-full bg-slate-300"></div>
            </div>
          </div>
        </section>

        <!-- ========================================= -->
        <!-- PANEL DERECHO -->
        <!-- ========================================= -->

        <section
          class="relative flex h-full items-center justify-center overflow-hidden px-6 py-6 md:px-10 lg:px-12"
        >
          <!-- ========================================= -->
          <!-- IMAGEN DE FONDO -->
          <!-- ========================================= -->

          <!-- ========================================= -->
          <!-- CAPA SUAVE SOBRE LA IMAGEN -->
          <!-- ========================================= -->

          <!-- ========================================= -->
          <!-- LOGIN -->
          <!-- ========================================= -->

          <div
            class="relative z-10 w-[calc(100%-2rem)] max-w-md rounded-[1.75rem] bg-white/95 p-7 shadow-2xl backdrop-blur-sm md:p-9"
          >
            <!-- LOGO MOBILE -->
            <div class="mb-6 flex justify-center lg:hidden">
              <img src="/images/edicrea.png" alt="EDICREA" class="h-20 w-auto object-contain" />
            </div>

            <!-- TITULO -->

            <div class="mb-7">
              <p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0879a8]">
                Plataforma EDICREA
              </p>

              <h2 class="text-3xl font-bold tracking-tight text-[#0b2d52]">Iniciar sesión</h2>

              <p class="mt-2 text-sm text-slate-500">Ingrese sus credenciales para continuar.</p>
            </div>

            <!-- FORMULARIO -->

            <form @submit.prevent="login" class="space-y-5">
              <!-- USUARIO -->

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700"> Usuario </label>

                <div class="relative">
                  <div
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <!-- tu SVG de usuario -->
                    <img src="/images/user.jpg" alt="Usuario" class="h-5 w-5" />
                  </div>

                  <input
                    v-model="nickname"
                    type="text"
                    placeholder="Ingrese su usuario"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
                  />
                </div>
              </div>

              <!-- CONTRASEÑA -->

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700"> Contraseña </label>

                <div class="relative">
                  <input
                    v-model="contrasena"
                    :type="mostrarContrasena ? 'text' : 'password'"
                    placeholder="Ingrese su contraseña"
                    class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-4 pr-12 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
                  />

                  <!-- CONSERVA AQUÍ TU BOTÓN DEL OJO -->
                  <button
                    type="button"
                    @click="mostrarContrasena = !mostrarContrasena"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <!-- Mdi del ojo -->
                    <svg
                      v-if="mostrarContrasena"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.64 21.64 0 0 1 5.06-6.06"
                      ></path>
                      <path d="M1 1l22 22"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- OPCIONES -->

              <div class="flex items-center justify-between">
                <label class="flex cursor-pointer items-center gap-2 text-sm text-slate-500">
                  <input
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#0879a8] focus:ring-[#0879a8]"
                  />

                  <span>Recordarme</span>
                </label>

                <button
                  type="button"
                  class="text-sm font-semibold text-[#0879a8] transition hover:text-[#0b2d52]"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>

              <!-- BOTÓN -->

              <button
                type="submit"
                :disabled="cargando"
                class="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0879a8] py-3.5 font-semibold text-white shadow-lg shadow-[#0879a8]/20 transition hover:-translate-y-0.5 hover:bg-[#06688f] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:translate-y-0"
              >
                <!-- CIRCULAR PROGRESS -->
                <svg
                  v-if="cargando"
                  class="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-30"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />

                  <path
                    class="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>

                <span>
                  {{ cargando ? 'Ingresando...' : 'Ingresar' }}
                </span>
              </button>
            </form>

            <!-- SEGURIDAD -->

            <div class="mt-6 flex items-start gap-3 border-t border-slate-200 pt-5">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e5f5fa] text-[#0879a8]"
              >
                🔒
              </div>

              <div>
                <p class="text-sm font-semibold text-slate-700">Acceso protegido</p>

                <p class="mt-1 text-xs leading-relaxed text-slate-500">
                  Tu información está protegida mediante mecanismos de seguridad y autenticación.
                </p>
              </div>
            </div>

            <p class="mt-5 text-center text-xs text-slate-400">
              © 2026 EDICREA · Constructora Inmobiliaria
            </p>
          </div>
        </section>
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
const cargando = ref(false)

const login = async () => {
  if (cargando.value) return

  cargando.value = true

  try {
    const baseUrl = import.meta.env.VITE_API_URL

    const response = await axios.post(`${baseUrl}/login`, {
      nickname: nickname.value,
      contrasena: contrasena.value,
    })

    authStore.login(response.data)

    router.replace('/dashboard')
  } catch (error) {
    alert(error.response?.data?.message || 'Error al iniciar sesión')
  } finally {
    cargando.value = false
  }
}
</script>
