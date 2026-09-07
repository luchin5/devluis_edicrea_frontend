<template>
  <div class="min-h-screen bg-[#f8fafc]">
    <!-- ================================================= -->
    <!-- SIDEBAR -->
    <!-- ================================================= -->

    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- ================================================= -->
    <!-- CONTENIDO PRINCIPAL -->
    <!-- ================================================= -->

    <div class="lg:ml-[250px] min-h-screen flex flex-col">
      <!-- =============================================== -->
      <!-- HEADER -->
      <!-- =============================================== -->

      <header
        class="sticky top-0 z-30 h-[72px] shrink-0 border-b border-slate-100 bg-white/95 px-4 backdrop-blur-md md:px-6 lg:px-8"
      >
        <div class="flex h-full items-center justify-between">
          <!-- ========================================= -->
          <!-- IZQUIERDA -->
          <!-- ========================================= -->

          <div class="flex items-center gap-4">
            <!-- BOTÓN MOBILE -->

            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-[#0879a8] lg:hidden"
              @click="sidebarOpen = true"
              aria-label="Abrir menú"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <!-- INDICADOR / TÍTULO -->

            <div class="hidden sm:block">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#0879a8]">
                EDICREA
              </p>

              <p class="text-xs text-slate-400">Plataforma de gestión inmobiliaria</p>
            </div>
          </div>

          <!-- ========================================= -->
          <!-- DERECHA -->
          <!-- ========================================= -->

          <div class="flex items-center gap-3">
            <!-- NOTIFICACIONES -->

            <button
              type="button"
              class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500 transition hover:bg-[#e8f6fb] hover:text-[#0879a8]"
              aria-label="Notificaciones"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M15 17h5l-1.5-2V10a6.5 6.5 0 0 0-13 0v5L4 17h5m6 0a3 3 0 0 1-6 0"
                />
              </svg>

              <!-- INDICADOR -->

              <span
                class="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"
              ></span>
            </button>

            <!-- SEPARADOR -->

            <div class="hidden h-8 w-px bg-slate-200 sm:block"></div>

            <!-- USUARIO -->

            <div class="flex items-center gap-3">
              <img
                src="/images/user2.jpg"
                alt="Usuario"
                class="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
              />

              <div class="hidden sm:block">
                <h3 class="text-sm font-semibold leading-tight text-[#0b2d52]">
                  {{ authStore.usuario?.nombres }}
                </h3>

                <p class="mt-0.5 text-xs text-slate-400">
                  {{ authStore.usuario?.rol_id === 1 ? 'Administrador' : 'Colaborador' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- ================================================= -->
      <!-- CONTENIDO -->
      <!-- ================================================= -->

      <main class="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8">
        <div class="mx-auto w-full max-w-[1600px]">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import Sidebar from '../a_panel_inicio/components/Sidebar.vue'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const sidebarOpen = ref(false)
</script>
