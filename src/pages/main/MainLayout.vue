<template>
  <div class="h-screen bg-slate-100 overflow-hidden">
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="lg:ml-64 h-full flex flex-col">
      <!-- Header -->
      <header class="bg-gray-300 border-b border-slate-200 px-4 md:px-8 py-4 shrink-0">
        <div class="flex justify-between items-center">
          <!-- Izquierda -->
          <div class="flex items-center gap-3">
            <button class="lg:hidden text-3xl" @click="sidebarOpen = true">☰</button>

            <div>
              <!--logo-->

              <img src="/images/edicrea.png" alt="Logo" class="inline-block w-15 h-15 ml-2" />
            </div>
          </div>

          <!-- Derecha -->

          <div class="hidden md:flex items-center gap-3">
            <img src="/images/user2.jpg" class="w-11 h-11 rounded-full object-cover" />

            <div>
              <h3 class="text-slate-600 font-semibold text-xl">
                {{ authStore.usuario?.nombres }}
              </h3>

              <p class="text-slate-800">
                {{ authStore.usuario?.rol_id === 1 ? 'Administrador' : 'Colaborador' }}
              </p>
            </div>
          </div>
        </div>
      </header>

      <!-- AQUÍ CAMBIAN LAS VISTAS -->

      <main class="flex-1 overflow-y-auto p-8">
        <RouterView />
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
