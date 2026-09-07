<template>
  <!-- ===================================================== -->
  <!-- SIDEBAR -->
  <!-- ===================================================== -->

  <aside
    class="fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col border-r border-slate-100 bg-white text-slate-700 shadow-sm transition-transform duration-300 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- ================================================= -->
    <!-- LOGO -->
    <!-- ================================================= -->

    <div class="flex h-[90px] items-center justify-center border-b border-slate-100 px-6">
      <img src="/images/edicrea.png" alt="EDICREA" class="w-[125px] object-contain" />

      <!-- Cerrar móvil -->

      <button
        type="button"
        class="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
        @click="emit('close')"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- ================================================= -->
    <!-- NAVEGACIÓN -->
    <!-- ================================================= -->

    <nav class="flex-1 space-y-1.5 px-3 py-5">
      <!-- DASHBOARD -->

      <RouterLink to="/dashboard" class="menu-item" @click="emit('close')">
        <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M3 12h7V3H3v9ZM14 21h7v-9h-7v9ZM14 3h7v5h-7V3ZM3 16h7v5H3v-5Z"
          />
        </svg>

        <span>Dashboard</span>
      </RouterLink>

      <!-- PROYECTOS -->

      <RouterLink to="/proyectos" class="menu-item" @click="emit('close')">
        <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M4 7h16M4 12h16M4 17h10"
          />
        </svg>

        <span>Proyectos</span>
      </RouterLink>

      <!-- CAPACITACIÓN -->

      <RouterLink to="/capacitaciones" class="menu-item" @click="emit('close')">
        <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M4 5h16v14H4V5ZM8 9h8M8 13h5"
          />
        </svg>

        <span>Capacitación</span>
      </RouterLink>

      <!-- USUARIOS -->

      <RouterLink
        v-if="authStore.usuario?.rol_id === 1"
        to="/usuarios"
        class="menu-item"
        @click="emit('close')"
      >
        <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          />
        </svg>

        <span>Usuarios</span>
      </RouterLink>
    </nav>

    <!-- ================================================= -->
    <!-- PARTE INFERIOR -->
    <!-- ================================================= -->

    <div class="border-t border-slate-100 p-3">
      <!-- SALIR -->

      <button type="button" class="menu-item text-left" @click="cerrarSesion">
        <svg class="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5"
          />
        </svg>

        <span>Salir</span>
      </button>
    </div>

    <!-- ================================================= -->
    <!-- VERSIÓN -->
    <!-- ================================================= -->

    <div class="px-6 pb-5">
      <p class="text-[11px] font-medium tracking-wide text-slate-400">EDICREA · v1.0</p>
    </div>
  </aside>

  <!-- ===================================================== -->
  <!-- OVERLAY MÓVIL -->
  <!-- ===================================================== -->

  <div
    v-if="open"
    class="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] lg:hidden"
    @click="emit('close')"
  />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

defineProps({
  open: Boolean,
})

const emit = defineEmits(['close'])

const router = useRouter()
const authStore = useAuthStore()

const cerrarSesion = () => {
  authStore.logout()

  router.replace('/login')
}
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;

  padding: 11px 14px;

  border-radius: 12px;

  color: #64748b;

  font-size: 14px;

  font-weight: 500;

  text-decoration: none;

  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.menu-item:hover {
  background: #f0f9fc;

  color: #0879a8;
}

.menu-icon {
  width: 19px;

  height: 19px;

  flex-shrink: 0;

  transition: color 0.2s ease;
}

/* Elemento activo */

.router-link-active,
.router-link-exact-active {
  background: #e8f6fb;

  color: #0879a8;

  font-weight: 600;
}

.router-link-active .menu-icon,
.router-link-exact-active .menu-icon {
  color: #0879a8;
}
</style>
