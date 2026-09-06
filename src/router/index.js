import { createRouter, createWebHistory } from 'vue-router'
//import DashboardCard from '@/pages/DashboardCard.vue'
//import DashboardView from '@/pages/DashboardView.vue'

// COMPONENTES IMPORTADOS
import LoginView from '@/pages/seguridad/LoginView.vue'
import DashboardInicial from '@/pages/a_panel_inicio/dashboard/DashboardInicial.vue'
import ProyectoView from '@/pages/inmobiliaria/ProyectoView.vue'
import MainLayout from '@/pages/main/MainLayout.vue'
import PlanoView from '@/pages/inmobiliaria/PlanoView.vue'
import ZonasView from '@/pages/inmobiliaria/ZonasView.vue'
import LoteView from '@/pages/inmobiliaria/LoteView.vue'
import RolesView from '@/pages/seguridad/RolesView.vue'
import CapacitacionView from '@/pages/capacitacion/CapacitacionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Primera pantalla del sistema
    {
      path: '/',
      redirect: '/login',
    },

    // Login
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },

    // Sistema
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardInicial,
        },
        {
          path: 'proyectos',
          name: 'Proyectos',
          component: ProyectoView,
        },
        {
          path: 'usuarios',
          name: 'Usuarios',
          component: RolesView,
          meta: {
            roles: [1],
          },
        },
        {
          path: 'capacitaciones',
          name: 'Capacitacion',
          component: CapacitacionView,
        },
        {
          path: 'proyectos/:proyectoId/planos',
          name: 'Planos',
          component: PlanoView,
        },
        {
          path: 'proyectos/:proyectoId/planos/:planoId/zonas',
          name: 'Zonas',
          component: ZonasView,
        },
        {
          path: 'proyectos/:proyectoId/planos/:planoId/zonas/:zonaId/lotes',
          name: 'Lotes',
          component: LoteView,
        },
      ],
    },

    // Ruta no encontrada
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
  ],
})

// 👇 AQUÍ VA EL beforeEach
router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.path === '/login') {
    return true
  }

  if (!token) {
    return '/login'
  }

  return true
})

export default router
