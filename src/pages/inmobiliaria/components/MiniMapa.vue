<template>
  <div
    ref="contenedor"
    :style="{
      width: props.width,
      height: props.height,
    }"
    class="relative overflow-hidden rounded-lg border bg-white"
    style="touch-action: none"
    @wheel.prevent="zoomConRueda"
    @mousedown="iniciarArrastre"
    @mousemove="moverArrastre"
    @mouseup="finalizarArrastre"
    @mouseleave="finalizarArrastre"
    @touchstart="iniciarPinch"
    @touchmove.prevent="moverPinch"
    @touchend="finalizarPinch"
  >
    <!-- CONTROLES DE ZOOM -->
    <div
      class="absolute right-3 top-3 z-20 flex flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-md"
    >
      <!-- + -->
      <button
        type="button"
        @click.stop="zoomIn"
        class="flex h-10 w-10 items-center justify-center text-xl font-bold text-slate-700 hover:bg-slate-100"
        title="Acercar"
      >
        +
      </button>

      <!-- RESET -->
      <button
        type="button"
        @click.stop="resetZoom"
        class="flex h-10 w-10 items-center justify-center border-y border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        title="Restablecer zoom"
      >
        ↺
      </button>

      <!-- - -->
      <button
        type="button"
        @click.stop="zoomOut"
        class="flex h-10 w-10 items-center justify-center text-xl font-bold text-slate-700 hover:bg-slate-100"
        title="Alejar"
      >
        −
      </button>
    </div>

    <!-- CONTENEDOR REAL DEL SVG -->
    <div ref="visor" class="flex h-full w-full items-center justify-center"></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const emit = defineEmits(['seleccionar-lote'])

const props = defineProps({
  svg: {
    type: String,
    required: true,
  },

  svgIds: {
    type: Array,
    default: () => [],
  },

  color: {
    type: String,
    default: '',
  },

  ocupados: {
    type: Array,
    default: () => [],
  },

  lotes: {
    type: Array,
    default: () => [],
  },

  width: {
    type: String,
    default: '120px',
  },

  height: {
    type: String,
    default: '120px',
  },

  zonaColor: {
    type: String,
    default: '',
  },

  loteSeleccionado: {
    type: String,
    default: '',
  },

  soloLectura: {
    type: Boolean,
    default: false,
  },
})

// ============================================================
// REFERENCIAS
// ============================================================

const contenedor = ref(null)
const visor = ref(null)

// ============================================================
// ZOOM
// ============================================================

const zoom = ref(1)

const ZOOM_MIN = 1
const ZOOM_MAX = 4
const ZOOM_STEP = 0.25

const posicionX = ref(0)
const posicionY = ref(0)

const arrastrando = ref(false)

const inicioX = ref(0)
const inicioY = ref(0)

const posicionInicialX = ref(0)
const posicionInicialY = ref(0)

// ============================================================
// PINCH PARA CELULAR
// ============================================================

const distanciaInicial = ref(0)
const zoomInicial = ref(1)

// ============================================================
// CALCULAR DISTANCIA ENTRE DOS DEDOS
// ============================================================

///
const restaurarVista = () => {
  zoom.value = 1
  posicionX.value = 0
  posicionY.value = 0

  aplicarTransformacion()
}
///
const calcularDistancia = (touch1, touch2) => {
  const dx = touch1.clientX - touch2.clientX
  const dy = touch1.clientY - touch2.clientY

  return Math.sqrt(dx * dx + dy * dy)
}
const iniciarArrastre = (event) => {
  if (event.button !== 0) return

  arrastrando.value = true

  inicioX.value = event.clientX
  inicioY.value = event.clientY

  posicionInicialX.value = posicionX.value
  posicionInicialY.value = posicionY.value
}

const moverArrastre = (event) => {
  if (!arrastrando.value) return

  const diferenciaX = event.clientX - inicioX.value

  const diferenciaY = event.clientY - inicioY.value

  posicionX.value = posicionInicialX.value + diferenciaX

  posicionY.value = posicionInicialY.value + diferenciaY

  aplicarTransformacion()
}

const finalizarArrastre = () => {
  arrastrando.value = false
}
// ============================================================
// APLICAR ZOOM AL SVG
// ============================================================
/*
const aplicarZoom = () => {
  const svg = visor.value?.querySelector('svg')

  if (!svg) return

  svg.style.transform = `scale(${zoom.value})`

  svg.style.transformOrigin = 'center center'

  svg.style.transition = 'transform 0.15s ease'
}
*/ const aplicarTransformacion = () => {
  const svg = visor.value?.querySelector('svg')

  if (!svg) return

  svg.style.transform = `translate(${posicionX.value}px, ${posicionY.value}px) scale(${zoom.value})`

  svg.style.transformOrigin = 'center center'
  svg.style.transition = 'transform 0.05s linear'
}
// ============================================================
// ZOOM +
// ============================================================

const zoomIn = () => {
  zoom.value = Math.min(ZOOM_MAX, zoom.value + ZOOM_STEP)

  aplicarTransformacion()
}

// ============================================================
// ZOOM -
// ============================================================

const zoomOut = () => {
  zoom.value = Math.max(ZOOM_MIN, zoom.value - ZOOM_STEP)

  aplicarTransformacion()
}

// ============================================================
// RESTABLECER
// ============================================================

const resetZoom = () => {
  zoom.value = 1

  aplicarTransformacion()
}

// ============================================================
// ZOOM CON RUEDA DEL MOUSE
// ============================================================

const zoomConRueda = (event) => {
  if (event.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

// ============================================================
// PINCH - INICIO
// ============================================================

// ============================================================
// TOUCH / MÓVIL
// ============================================================

const iniciarPinch = (event) => {
  // ----------------------------------------------------------
  // UN DEDO → ARRASTRAR MAPA
  // ----------------------------------------------------------
  if (event.touches.length === 1) {
    arrastrando.value = true

    inicioX.value = event.touches[0].clientX
    inicioY.value = event.touches[0].clientY

    posicionInicialX.value = posicionX.value
    posicionInicialY.value = posicionY.value

    distanciaInicial.value = 0

    return
  }

  // ----------------------------------------------------------
  // DOS DEDOS → PINCH / ZOOM
  // ----------------------------------------------------------
  if (event.touches.length === 2) {
    arrastrando.value = false

    distanciaInicial.value = calcularDistancia(event.touches[0], event.touches[1])

    zoomInicial.value = zoom.value
  }
}

const moverPinch = (event) => {
  // ----------------------------------------------------------
  // UN DEDO → MOVER MAPA
  // ----------------------------------------------------------
  if (event.touches.length === 1 && arrastrando.value) {
    const diferenciaX = event.touches[0].clientX - inicioX.value

    const diferenciaY = event.touches[0].clientY - inicioY.value

    posicionX.value = posicionInicialX.value + diferenciaX

    posicionY.value = posicionInicialY.value + diferenciaY

    aplicarTransformacion()

    return
  }

  // ----------------------------------------------------------
  // DOS DEDOS → ZOOM
  // ----------------------------------------------------------
  if (event.touches.length === 2) {
    const distanciaActual = calcularDistancia(event.touches[0], event.touches[1])

    if (!distanciaInicial.value) return

    const factor = distanciaActual / distanciaInicial.value

    zoom.value = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomInicial.value * factor))

    aplicarTransformacion()
  }
}

const finalizarPinch = () => {
  arrastrando.value = false
  distanciaInicial.value = 0
}

// ============================================================
// DIBUJAR SVG
// ============================================================

const obtenerColorEstado = (estadoId) => {
  switch (Number(estadoId)) {
    case 1:
      // Disponible
      return '#ffffff'

    case 2:
      // Separado
      return '#a855f7'

    case 3:
      // Vendido
      return '#ef4444'

    case 4:
      // Amortizado
      return '#38bdf8'

    default:
      return '#ffffff'
  }
}

const pintarSVG = async () => {
  console.log(props.svgIds)
  console.log('color:', props.color)

  await nextTick()

  if (!visor.value) return

  // Insertar SVG
  visor.value.innerHTML = props.svg

  const svg = visor.value.querySelector('svg')

  if (!svg) return

  // ==========================================================
  // VIEWBOX
  // ==========================================================

  if (!svg.hasAttribute('viewBox')) {
    const bbox = svg.getBBox()

    svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`)
  }

  // ==========================================================
  // DIMENSIONES
  // ==========================================================

  svg.removeAttribute('width')
  svg.removeAttribute('height')

  svg.style.width = '100%'
  svg.style.height = '100%'
  svg.style.display = 'block'

  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

  // ==========================================================
  // TODO GRIS
  // ==========================================================

  svg.querySelectorAll('path').forEach((path) => {
    path.setAttribute('fill', '#d1d5db')

    path.setAttribute('stroke', '#ffffff')
    path.setAttribute('stroke-width', '1')
  })

  // ==========================================================
  // LOTES OCUPADOS
  // ==========================================================

  props.ocupados.forEach((id) => {
    const elemento = svg.getElementById(id.trim())

    if (!elemento) return

    elemento.setAttribute('fill', '#9ca3af')
  })

  // ==========================================================
  // LOTES INTERACTIVOS
  // ==========================================================

  const ids = props.svgIds || []

  ids.forEach((id) => {
    const elemento = svg.getElementById(id.trim())

    if (!elemento) return

    const lote = props.lotes.find((l) => String(l.coordenadas_svg).trim() === id.trim())

    const colorEstado = obtenerColorEstado(lote?.estado_id)

    elemento.setAttribute('fill', colorEstado)

    // Cursor
    elemento.style.cursor = 'pointer'

    // ========================================================
    // MOUSE ENTER
    // ========================================================

    elemento.addEventListener('mouseenter', () => {
      elemento.setAttribute('fill', '#93c5fd')
    })

    elemento.addEventListener('mouseleave', () => {
      const lote = props.lotes.find((l) => String(l.coordenadas_svg).trim() === id.trim())

      elemento.setAttribute('fill', obtenerColorEstado(lote?.estado_id))
    })

    // ========================================================
    // CLICK
    // ========================================================

    elemento.addEventListener('click', () => {
      emit('seleccionar-lote', {
        id: id.trim(),
        manzana: elemento.getAttribute('data-manzana') || '',
        lote: elemento.getAttribute('data-lote') || '',
        area: elemento.getAttribute('data-area') || '',
        perimetro: elemento.getAttribute('data-perimetro') || '',
      })
    })
  })

  // ==========================================================
  // RESTABLECER COLOR DE LOTES
  // ==========================================================

  /* ids.forEach((id) => {
    const elemento = svg.getElementById(id.trim())

    if (elemento) {
      elemento.setAttribute('fill', props.color)
    }
  })*/

  // ==========================================================
  // LOTE SELECCIONADO
  // ==========================================================
  /*
  if (props.loteSeleccionado) {
    const lote = svg.getElementById(props.loteSeleccionado.trim())

    if (lote) {
      lote.setAttribute('fill', '#f97316')

      lote.setAttribute('stroke', '#111827')

      lote.setAttribute('stroke-width', '2')
    }
  }*/

  // ==========================================================
  // CONSERVAR ZOOM
  // ==========================================================

  //aplicarZoom()
  ///aplicarTransformacion()
  restaurarVista()
}

// ============================================================
// WATCH
// ============================================================

watch(() => [props.svg, props.svgIds, props.color, props.ocupados, props.lotes], pintarSVG, {
  immediate: true,
  deep: true,
})

watch(
  () => props.loteSeleccionado,
  (nuevoId) => {
    const svg = visor.value?.querySelector('svg')

    if (!svg) return

    // Quitar selección anterior
    svg.querySelectorAll('path').forEach((path) => {
      path.setAttribute('stroke', '#ffffff')
      path.removeAttribute('stroke-width')
    })

    // Aplicar nueva selección
    if (nuevoId) {
      const lote = svg.getElementById(nuevoId.trim())

      if (lote) {
        lote.setAttribute('fill', '#f97316')

        lote.setAttribute('stroke', '#111827')

        lote.setAttribute('stroke-width', '2')
      }
    }
  },
)
</script>
