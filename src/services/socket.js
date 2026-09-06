import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'

class SocketService {
  constructor() {
    this.socket = io(URL, {
      autoConnect: false,
      transports: ['websocket'],
    })
  }

  // ===============================
  // Conexión
  // ===============================

  connect(usuarioId) {
    if (!this.socket.connected) {
      this.socket.auth = {
        usuarioId,
      }

      this.socket.connect()

      console.log('🟢 Socket conectado')
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect()

      console.log('🔴 Socket desconectado')
    }
  }

  // ===============================
  // Eventos de edición
  // ===============================

  editarLote(loteId, usuarioId) {
    this.socket.emit('editarLote', {
      loteId,
      usuarioId,
    })
  }

  liberarLote(loteId) {
    this.socket.emit('liberarLote', {
      loteId,
    })
  }

  // ===============================
  // Escuchar eventos
  // ===============================

  onLoteDisponible(callback) {
    this.socket.on('loteDisponible', callback)
  }

  onLoteBloqueado(callback) {
    this.socket.on('loteBloqueado', callback)
  }

  onLoteEnEdicion(callback) {
    this.socket.on('loteEnEdicion', callback)
  }

  onLoteLiberado(callback) {
    this.socket.on('loteLiberado', callback)
  }

  onLoteActualizado(callback) {
    this.socket.on('loteActualizado', callback)
  }

  // ===============================
  // Eliminar listeners
  // ===============================

  offLoteActualizado() {
    this.socket.off('loteActualizado')
  }

  offLoteDisponible() {
    this.socket.off('loteDisponible')
  }

  offLoteBloqueado() {
    this.socket.off('loteBloqueado')
  }

  offLoteEnEdicion() {
    this.socket.off('loteEnEdicion')
  }

  offLoteLiberado() {
    this.socket.off('loteLiberado')
  }

  removeAll() {
    this.socket.removeAllListeners()
  }

  // ===============================
  // Estado
  // ===============================

  get connected() {
    return this.socket.connected
  }

  get id() {
    return this.socket.id
  }
}

export default new SocketService()
