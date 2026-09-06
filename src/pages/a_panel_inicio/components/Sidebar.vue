<template>
  <aside
    class="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-slate-800 text-white transform transition-transform duration-300 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b border-violet-800">
      <h2 class="text-2xl font-bold">Menú</h2>

      <button class="lg:hidden text-2xl" @click="emit('close')">✕</button>
    </div>

    <!-- Menú -->
    <nav class="flex-1 p-4 space-y-2">
      <RouterLink to="/dashboard" class="menu-item" @click="emit('close')">
        🏠
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink to="/proyectos" class="menu-item" @click="emit('close')">
        🗺️
        <span>Proyectos</span>
      </RouterLink>

      <RouterLink to="/capacitaciones" class="menu-item" @click="emit('close')">
        🎓
        <span>Capacitación</span>
      </RouterLink>

      <RouterLink
        v-if="authStore.usuario?.rol_id === 1"
        to="/usuarios"
        class="menu-item"
        @click="emit('close')"
      >
        👤
        <span>Usuarios</span>
      </RouterLink>
    </nav>
    <button class="menu-item text-left" @click="cerrarSesion">
      🚪
      <span>Salir</span>
    </button>
    <div class="border-t border-violet-800 p-5">
      <p class="text-sm text-slate-400">Versión 1.0</p>
    </div>
  </aside>

  <div v-if="open" class="fixed inset-0 z-40 bg-black/40 lg:hidden" @click="emit('close')" />
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
  authStore.logout() // limpia todo el store

  router.replace('/login')
}
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;

  padding: 14px 16px;

  border-radius: 12px;

  transition: 0.25s;

  text-decoration: none;

  color: white;
}

.menu-item:hover {
  background: rgb(30 41 59);
}

.router-link-active,
.router-link-exact-active {
  background: #2563eb;
  font-weight: 600;
}
</style>
