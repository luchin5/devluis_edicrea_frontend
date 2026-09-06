import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    usuario: JSON.parse(localStorage.getItem('usuario')) || null,
  }),

  actions: {
    login(data) {
      this.token = data.usuario.token
      this.usuario = data.usuario.usuario

      localStorage.setItem('token', data.usuario.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario.usuario))
    },

    logout() {
      this.token = null
      this.usuario = null
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
    },
  },
})
