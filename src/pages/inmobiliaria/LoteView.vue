<template>
  <div class="w-full">
    <!-- ===================================================== -->
    <!-- ENCABEZADO -->
    <!-- ===================================================== -->

    <div class="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div class="min-w-0">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#0879a8]">
          Gestión inmobiliaria
        </p>

        <h1 class="mt-1 text-2xl font-bold tracking-tight text-[#0b2d52] md:text-3xl">
          Lotes de la zona
        </h1>

        <div class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
          <span>
            Proyecto:
            <span class="font-semibold text-slate-700">
              {{ zona.proyecto }}
            </span>
          </span>

          <span class="text-slate-300">•</span>

          <span>
            Plano:
            <span class="font-semibold text-slate-700">
              {{ zona.plano }}
            </span>
          </span>

          <span class="text-slate-300">•</span>

          <span>
            Zona:
            <span class="font-semibold text-slate-700">
              {{ zona.nombre }}
            </span>
          </span>
        </div>
      </div>

      <!-- VOLVER -->

      <RouterLink
        :to="`/proyectos/${route.params.proyectoId}/planos/${route.params.planoId}/zonas`"
        class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0879a8]/30 hover:bg-[#e8f6fb] hover:text-[#0879a8] hover:shadow-md"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M19 12H5m7 7-7-7 7-7"
          />
        </svg>

        Volver a zonas
      </RouterLink>
    </div>

    <!-- ===================================================== -->
    <!-- CONTENIDO PRINCIPAL -->
    <!-- ===================================================== -->

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <!-- =================================================== -->
      <!-- PLANO INTERACTIVO -->
      <!-- =================================================== -->

      <section
        class="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm xl:col-span-8"
      >
        <!-- HEADER PLANO -->

        <div
          class="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6"
        >
          <div>
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f6fb] text-[#0879a8]"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
                  />

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M7 15 10 12l2 2 3-4 2 3"
                  />
                </svg>
              </div>

              <div>
                <h2 class="text-base font-bold text-[#0b2d52] md:text-lg">Plano interactivo</h2>

                <p class="mt-0.5 text-xs text-slate-400">
                  Seleccione un lote para visualizar su información.
                </p>
              </div>
            </div>
          </div>

          <!-- INDICADOR -->

          <div
            class="inline-flex items-center gap-2 self-start rounded-xl bg-[#e8f6fb] px-3 py-2 text-xs font-semibold text-[#0879a8] sm:self-auto"
          >
            <span class="h-2 w-2 rounded-full bg-[#0879a8]"></span>
            {{ lotes.length }} lotes
          </div>
        </div>

        <!-- =================================================== -->
        <!-- ESTADÍSTICAS RESUMIDAS -->
        <!-- =================================================== -->

        <div class="grid grid-cols-2 border-b border-slate-100 bg-white md:grid-cols-4">
          <!-- DISPONIBLES -->
          <div
            class="flex items-center justify-between gap-3 border-b border-r border-slate-100 px-4 py-4 md:border-b-0 md:px-5"
          >
            <div class="min-w-0">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Disponibles
              </p>

              <p class="mt-1 text-xl font-bold text-[#0b2d52]">
                {{ estadisticas.disponibles }}
              </p>
            </div>

            <span
              class="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-slate-700 bg-white"
            ></span>
          </div>

          <!-- SEPARADOS -->
          <div
            class="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 md:border-b-0 md:border-r md:px-5"
          >
            <div class="min-w-0">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Separados
              </p>

              <p class="mt-1 text-xl font-bold text-[#0b2d52]">
                {{ estadisticas.separados ?? estadisticas.reservados ?? 0 }}
              </p>
            </div>

            <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-purple-500"></span>
          </div>

          <!-- AMORTIZADOS -->
          <div
            class="flex items-center justify-between gap-3 border-r border-slate-100 px-4 py-4 md:px-5"
          >
            <div class="min-w-0">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Amortizados
              </p>

              <p class="mt-1 text-xl font-bold text-[#0b2d52]">
                {{ estadisticas.amortizados ?? 0 }}
              </p>
            </div>

            <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400"></span>
          </div>

          <!-- VENDIDOS -->
          <div class="flex items-center justify-between gap-3 px-4 py-4 md:px-5">
            <div class="min-w-0">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Vendidos
              </p>

              <p class="mt-1 text-xl font-bold text-[#0b2d52]">
                {{ estadisticas.vendidos ?? 0 }}
              </p>
            </div>

            <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500"></span>
          </div>
        </div>

        <!-- MAPA -->

        <div class="flex min-h-[620px] items-center justify-center bg-slate-50 p-4 md:p-6">
          <div
            class="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-inner"
          >
            <MiniMapa
              :svg="svgPlano"
              :svgIds="zona.svg_paths"
              :color="zona.color"
              :lotes="lotes"
              :loteSeleccionado="loteSeleccionado?.coordenadas_svg"
              width="100%"
              height="620px"
              @seleccionar-lote="seleccionarLote"
            />
          </div>
        </div>
      </section>

      <!-- =================================================== -->
      <!-- PANEL DERECHO -->
      <!-- =================================================== -->

      <div class="flex flex-col gap-6 xl:col-span-4">
        <!-- ================================================= -->
        <!-- LOTE SELECCIONADO -->
        <!-- ================================================= -->

        <section class="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <!-- HEADER -->

          <div class="border-b border-slate-100 bg-[#e8f6fb] px-5 py-5 md:px-6">
            <div class="flex items-center gap-3">
              <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0879a8] shadow-sm"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
                  />

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M8 9h8M8 12h5M8 15h4"
                  />
                </svg>
              </div>

              <div class="min-w-0">
                <p class="text-xs font-semibold uppercase tracking-wide text-[#0879a8]">
                  Lote seleccionado
                </p>

                <h2
                  class="mt-1 truncate text-lg font-bold text-[#0b2d52]"
                  :title="
                    loteSeleccionado
                      ? `Manzana ${loteSeleccionado.manzana} - Lote ${loteSeleccionado.numero}`
                      : 'Seleccione un lote'
                  "
                >
                  {{
                    loteSeleccionado
                      ? `Manzana ${loteSeleccionado.manzana} - Lote ${loteSeleccionado.numero}`
                      : 'Seleccione un lote'
                  }}
                </h2>
              </div>
            </div>
          </div>

          <!-- BODY -->

          <div class="p-5 md:p-6">
            <!-- SIN SELECCIÓN -->

            <div
              v-if="!loteSeleccionado"
              class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center"
            >
              <div
                class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm"
              >
                <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
                  />
                </svg>
              </div>

              <p class="mt-4 text-sm font-semibold text-slate-600">Seleccione un lote</p>

              <p class="mt-1 text-xs leading-relaxed text-slate-400">
                Haga clic sobre un lote del plano para consultar su información.
              </p>
            </div>

            <!-- INFORMACIÓN -->

            <div v-else class="space-y-5">
              <!-- COLABORADOR -->

              <div class="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0879a8] shadow-sm"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-5A3.5 3.5 0 0 0 4 17.5V19m6-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-3a3 3 0 0 1 0 6m3 6v-1.5a3.5 3.5 0 0 0-2.5-3.35"
                    />
                  </svg>
                </div>

                <div class="min-w-0">
                  <p class="text-xs text-slate-400">Colaborador</p>

                  <p class="truncate text-sm font-semibold text-slate-700">
                    {{ loteSeleccionado.nombres }}
                    {{ loteSeleccionado.apellidos }}
                  </p>
                </div>
              </div>

              <!-- MANZANA / NÚMERO -->

              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p class="text-xs font-medium text-slate-400">Manzana</p>

                  <p class="mt-2 text-2xl font-bold text-[#0b2d52]">
                    {{ loteSeleccionado.manzana || '--' }}
                  </p>
                </div>

                <div class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p class="text-xs font-medium text-slate-400">Número</p>

                  <p class="mt-2 text-2xl font-bold text-[#0879a8]">
                    {{ loteSeleccionado.numero || '--' }}
                  </p>
                </div>
              </div>

              <!-- ÁREA / PERÍMETRO -->

              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-xl bg-slate-50 px-4 py-3">
                  <p class="text-xs text-slate-400">Área</p>

                  <p class="mt-1 text-sm font-bold text-slate-700">
                    {{ loteSeleccionado.area || '--' }} m²
                  </p>
                </div>

                <div class="rounded-xl bg-slate-50 px-4 py-3">
                  <p class="text-xs text-slate-400">Perímetro</p>

                  <p class="mt-1 text-sm font-bold text-slate-700">
                    {{ loteSeleccionado.perimetro || '--' }} m
                  </p>
                </div>
              </div>

              <!-- ESTADO -->

              <div class="rounded-2xl border border-slate-100 p-4">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-sm text-slate-500"> Estado </span>

                  <span
                    class="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-bold"
                    :class="estados[loteSeleccionado?.estado_id]?.color"
                  >
                    {{ estados[loteSeleccionado?.estado_id]?.nombre || '--' }}
                  </span>
                </div>
              </div>

              <!-- PRECIO -->

              <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                <span class="text-sm text-slate-500"> Precio </span>

                <span class="text-lg font-bold text-[#0b2d52]">
                  S/
                  {{ loteSeleccionado.precio || '--' }}
                </span>
              </div>

              <!-- VERSIÓN -->

              <div class="flex items-center justify-between">
                <span class="text-sm text-slate-500"> Versión </span>

                <span class="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                  v{{ loteSeleccionado.version_actual || 1 }}
                </span>
              </div>

              <!-- ACTUALIZACIÓN -->

              <div class="flex items-center justify-between gap-4">
                <span class="text-sm text-slate-500"> Última actualización </span>

                <span class="text-right text-xs font-semibold text-slate-700">
                  {{
                    loteSeleccionado.fecha_actualizacion
                      ? new Date(loteSeleccionado.fecha_actualizacion).toLocaleDateString()
                      : '--'
                  }}
                </span>
              </div>

              <!-- ACCIONES -->

              <div class="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
                <button
                  v-if="authStore.usuario?.rol_id === 1"
                  type="button"
                  @click="abrirModalEditar"
                  class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="m16.86 3.49 3.65 3.65M5 19l3.2-.8L19.7 6.7a1.8 1.8 0 0 0 0-2.55l-.85-.85a1.8 1.8 0 0 0-2.55 0L4.8 14.8 4 18l1 1Z"
                    />
                  </svg>

                  Editar
                </button>

                <button
                  v-if="authStore.usuario?.rol_id === 2"
                  type="button"
                  @click="cambiarEstado"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0879a8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#06688f] hover:shadow-md"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M12 3v18m9-9H3"
                    />
                  </svg>

                  Cambiar estado
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

  <!-- ======================================================= -->
  <!-- MODAL EDITAR LOTE -->
  <!-- ======================================================= -->

  <div
    v-if="mostrarModalEditar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
  >
    <div
      class="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
    >
      <!-- HEADER -->

      <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5 md:px-7">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="m16.86 3.49 3.65 3.65M5 19l3.2-.8L19.7 6.7a1.8 1.8 0 0 0 0-2.55l-.85-.85a1.8 1.8 0 0 0-2.55 0L4.8 14.8 4 18l1 1Z"
              />
            </svg>
          </div>

          <div>
            <h2 class="text-xl font-bold text-[#0b2d52]">Editar lote</h2>

            <p class="mt-0.5 text-sm text-slate-400">
              Modifique la información del lote seleccionado.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="mostrarModalEditar = false"
          class="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          title="Cerrar"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- BODY -->

      <div class="flex-1 overflow-y-auto p-6 md:p-7">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <!-- NÚMERO -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Número </label>

            <input
              v-model="loteForm.numero"
              type="text"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- ÁREA -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Área (m²) </label>

            <input
              v-model="loteForm.area"
              type="number"
              step="0.01"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- PRECIO -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Precio </label>

            <div class="relative">
              <span
                class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400"
              >
                S/
              </span>

              <input
                v-model="loteForm.precio"
                type="number"
                step="0.01"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
              />
            </div>
          </div>

          <!-- ESTADO -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Estado </label>

            <select
              v-model="loteForm.estado_id"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            >
              <option :value="1">Disponible</option>

              <option :value="2">Reservado</option>

              <option :value="3">Vendido</option>

              <option :value="4">Amortizado</option>
            </select>
          </div>
        </div>

        <!-- ÚLTIMA ACTUALIZACIÓN -->

        <div class="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p class="text-xs font-medium text-slate-400">Última actualización</p>

          <p class="mt-1 text-sm font-semibold text-slate-700">
            {{
              loteSeleccionado?.fecha_actualizacion
                ? new Date(loteSeleccionado.fecha_actualizacion).toLocaleString()
                : 'Nunca'
            }}
          </p>
        </div>
      </div>

      <!-- FOOTER -->

      <div
        class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end md:px-7"
      >
        <button
          type="button"
          @click="mostrarModalEditar = false"
          class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancelar
        </button>

        <button
          type="button"
          @click="guardarEdicion"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0879a8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06688f] hover:shadow-md"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M5 12.5 9.5 17 19 7.5"
            />
          </svg>

          Guardar cambios
        </button>
      </div>
    </div>
  </div>

  <!-- ======================================================= -->
  <!-- MODAL CAMBIAR ESTADO -->
  <!-- ======================================================= -->

  <div
    v-if="mostrarModalEstado"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
  >
    <div class="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
      <!-- HEADER -->

      <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6fb] text-[#0879a8]"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M12 6v6l4 2"
              />

              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
            </svg>
          </div>

          <div>
            <h2 class="text-xl font-bold text-[#0b2d52]">Actualizar estado</h2>

            <p class="mt-0.5 text-sm text-slate-400">Lote {{ loteSeleccionado?.numero }}</p>
          </div>
        </div>

        <button
          type="button"
          @click="cancelarEstado"
          class="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          title="Cerrar"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- BODY -->

      <div class="space-y-5 p-6">
        <!-- ESTADO ACTUAL -->

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700"> Estado actual </label>

          <div
            class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <span class="text-sm font-semibold text-slate-700">
              {{ estados[loteSeleccionado?.estado_id]?.nombre }}
            </span>

            <span
              class="h-3 w-3 rounded-full"
              :class="{
                'bg-white border border-slate-300': loteSeleccionado?.estado_id === 1,
                'bg-purple-500': loteSeleccionado?.estado_id === 2,
                'bg-red-500': loteSeleccionado?.estado_id === 3,
                'bg-sky-400': loteSeleccionado?.estado_id === 4,
              }"
            ></span>
          </div>
        </div>

        <!-- NUEVO ESTADO -->

        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700"> Nuevo estado </label>

          <select
            v-model="estadoForm.estado_id"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
          >
            <!-- LIBRE -->

            <template v-if="loteSeleccionado?.estado_id === 1">
              <option :value="2">Separado — 5 días</option>

              <option :value="4">Amortizado — 15 días</option>

              <option :value="3">Vendido</option>
            </template>

            <!-- SEPARADO -->

            <template v-else-if="loteSeleccionado?.estado_id === 2">
              <option :value="4">Amortizado — 15 días</option>

              <option :value="3">Vendido</option>
            </template>

            <!-- AMORTIZADO -->

            <template v-else-if="loteSeleccionado?.estado_id === 4">
              <option :value="3">Vendido</option>
            </template>

            <!-- VENDIDO -->

            <template v-else-if="loteSeleccionado?.estado_id === 3">
              <option :value="3">Vendido</option>
            </template>
          </select>
        </div>
      </div>

      <!-- FOOTER -->

      <div
        class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end"
      >
        <button
          type="button"
          @click="cancelarEstado"
          class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancelar
        </button>

        <button
          type="button"
          @click="guardarEstado"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0879a8] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06688f] hover:shadow-md"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M5 12.5 9.5 17 19 7.5"
            />
          </svg>

          Guardar estado
        </button>
      </div>
    </div>
  </div>

  <!-- ======================================================= -->
  <!-- LOADING GLOBAL -->
  <!-- ======================================================= -->

  <div
    v-if="cargando"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/25 backdrop-blur-[2px]"
  >
    <div class="flex flex-col items-center gap-3 rounded-2xl bg-white px-7 py-6 shadow-2xl">
      <svg
        class="h-9 w-9 animate-spin text-[#0879a8]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />

        <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
      </svg>

      <p class="text-sm font-semibold text-[#0b2d52]">Procesando...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import MiniMapa from '@/pages/inmobiliaria/components/MiniMapa.vue'
import { useAuthStore } from '@/stores/auth'
import socketService from '@/services/socket.js'

const authStore = useAuthStore()
const route = useRoute()
const toast = useToast()
const baseUrl = import.meta.env.VITE_API_URL
const cargando = ref(false)
const svgPlano = ref('')
const zona = ref({})
const loteSeleccionado = ref(null)
const lotes = ref([])
const mostrarModalEditar = ref(false)

const mostrarModalEstado = ref(false)

const estadoForm = reactive({
  estado_id: 1,
})
const estadisticas = ref({
  disponibles: 0,
  reservados: 0,
  vendidos: 0,
  bloqueados: 0,
})
const cambiarEstado = () => {
  if (!loteSeleccionado.value) return

  // Vendido
  if (loteSeleccionado.value.estado_id === 3) {
    toast.info('Este lote ya fue vendido.')
    return
  }

  // Bloqueado por administrador
  /*if (loteSeleccionado.value.estado_id === 4) {
    toast.warning('Este lote está amortizado.')
    return
  }*/

  // Ya lo está editando otro colaborador
  if (loteSeleccionado.value.enEdicion) {
    toast.warning('Otro colaborador está editando este lote.')
    return
  }

  // Recién aquí consulto al servidor
  socketService.editarLote(loteSeleccionado.value.id, authStore.usuario.id)
}
const guardarEstado = async () => {
  try {
    cargando.value = true

    await axios.put(
      `${baseUrl}/lotes/lotes_vendedor?id=${loteSeleccionado.value.id}`,
      {
        estado_id: estadoForm.estado_id,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    loteSeleccionado.value.estado_id = estadoForm.estado_id

    toast.success('Estado actualizado correctamente.')

    mostrarModalEstado.value = false
  } catch (error) {
    console.error(error)

    toast.error('No se pudo actualizar el estado.')
  } finally {
    if (loteSeleccionado.value) {
      socketService.liberarLote(loteSeleccionado.value.id)
    }

    cargando.value = false
  }
}
const cancelarEstado = () => {
  if (loteSeleccionado.value) {
    socketService.liberarLote(loteSeleccionado.value.id)
  }

  mostrarModalEstado.value = false
}
const loteForm = reactive({
  id: null,
  numero: '',
  area: 0,
  precio: 0,
  estado_id: 1,
})
const guardarEdicion = async () => {
  try {
    cargando.value = true

    await axios.put(
      `${baseUrl}/lotes/lotes?id=${loteForm.id}`,
      {
        numero: loteForm.numero,
        area: loteForm.area,
        precio: loteForm.precio,
        estado_id: loteForm.estado_id,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    Object.assign(loteSeleccionado.value, {
      numero: loteForm.numero,
      area: loteForm.area,
      precio: loteForm.precio,
      estado_id: loteForm.estado_id,
    })

    const index = lotes.value.findIndex((l) => l.id === loteForm.id)

    if (index !== -1) {
      Object.assign(lotes.value[index], {
        numero: loteForm.numero,
        area: loteForm.area,
        precio: loteForm.precio,
        estado_id: loteForm.estado_id,
      })
    }

    toast.success('Lote actualizado.')

    mostrarModalEditar.value = false

    await cargarLotes()
  } catch (error) {
    console.error(error)

    toast.error('No se pudo actualizar el lote.')
  } finally {
    cargando.value = false
  }
}
const abrirModalEditar = () => {
  if (!loteSeleccionado.value) return

  loteForm.id = loteSeleccionado.value.id
  loteForm.numero = loteSeleccionado.value.numero
  loteForm.area = loteSeleccionado.value.area
  loteForm.precio = loteSeleccionado.value.precio
  loteForm.estado_id = loteSeleccionado.value.estado_id

  mostrarModalEditar.value = true
}

const estados = {
  1: {
    nombre: 'Disponible',
    color: 'text-slate-700',
  },
  2: {
    nombre: 'Separado',
    color: 'text-purple-600',
  },
  3: {
    nombre: 'Vendido',
    color: 'text-red-600',
  },
  4: {
    nombre: 'Amortizado',
    color: 'text-sky-600',
  },
}
const cargarEstadisticas = async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/lotes/estadisticas_zona_id?id=${route.params.zonaId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )
    console.log(`${baseUrl}/lotes/estadisticas_zona_id?id=${route.params.zonaId}`)
    console.log('cargarEstadisticas', data)
    estadisticas.value = data
  } catch (error) {
    console.error('Error al cargar estadísticas:', error)
  }
}
const seleccionarLote = (datos) => {
  loteSeleccionado.value = lotes.value.find((l) => l.coordenadas_svg === datos.id) || null

  if (loteSeleccionado.value) {
    loteSeleccionado.value = {
      ...loteSeleccionado.value,
      manzana: datos.manzana,
      perimetro: datos.perimetro,
    }
  }
}
/*
const seleccionarLote = (svgId) => {
  loteSeleccionado.value = lotes.value.find((l) => l.coordenadas_svg === svgId) || null
}*/

const cargarZona = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/zonas/zonas_id?id=${route.params.zonaId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    zona.value = {
      ...data,
      svg_paths: data.svgids ? data.svgids.split(',') : [],
    }

    console.log('cargar zona', zona.value)
    console.log('cargar zona', zona.value)
  } catch (error) {
    console.error('Error al cargar la zona:', error)
  }
}

const cargarPlano = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/planos/plano_id?id=${route.params.planoId}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    const respuesta = await fetch(
      `${baseUrl.replace('/api_v1', '')}/uploads/planos/${data.archivo_svg}`,
    )

    svgPlano.value = await respuesta.text()
  } catch (error) {
    console.error('Error al cargar el SVG:', error)
  }
}

const cargarLotes = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/lotes/lotes`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    console.log('cargar lotes', (lotes.value = data))
    // Solo los lotes de esta zona
    lotes.value = data.filter((l) => l.zona_id == route.params.zonaId)

    // Seleccionar automáticamente el primero
    if (lotes.value.length > 0) {
      loteSeleccionado.value = lotes.value[0]
    }
  } catch (error) {
    console.error('Error al cargar lotes:', error)
  }
}
const registrarEventos = () => {
  socketService.onLoteDisponible(({ loteId }) => {
    const lote = lotes.value.find((l) => l.id === loteId)

    if (!lote) return

    lote.enEdicion = true

    if (loteSeleccionado.value?.id !== loteId) return

    estadoForm.estado_id = lote.estado_id

    mostrarModalEstado.value = true
  })
  /*
  socketService.onLoteBloqueado(({ mensaje }) => {
    toast.warning(mensaje)
  })*/
  socketService.onLoteBloqueado(({ loteId, mensaje }) => {
    const lote = lotes.value.find((l) => l.id === loteId)

    if (lote) {
      lote.enEdicion = true
    }

    if (loteSeleccionado.value?.id === loteId) {
      mostrarModalEstado.value = false
    }

    toast.warning(mensaje)
  })

  socketService.onLoteEnEdicion(({ loteId }) => {
    const lote = lotes.value.find((l) => l.id === loteId)

    if (!lote) return

    lote.enEdicion = true
    // Solo aviso si el usuario tiene seleccionado ese lote AQUI OJO REVISAR SI CONVIENE O NO ESTA MODIFICACION DEL TOAST
    if (loteSeleccionado.value?.id === loteId) {
      mostrarModalEstado.value = false
      toast.warning(`El lote ${lote.numero} está siendo gestionado por otro colaborador.`)
    }
  })

  socketService.onLoteLiberado(({ loteId }) => {
    const lote = lotes.value.find((l) => l.id === loteId)

    if (!lote) return

    lote.enEdicion = false

    // toast.success(`Lote ${lote.numero} liberado.`)
  })

  socketService.onLoteActualizado((loteActualizado) => {
    const lote = lotes.value.find((l) => l.id === loteActualizado.id)

    if (!lote) return

    Object.assign(lote, loteActualizado)

    lote.enEdicion = false

    if (loteSeleccionado.value && loteSeleccionado.value.id === loteActualizado.id) {
      Object.assign(loteSeleccionado.value, loteActualizado)
      loteSeleccionado.value.enEdicion = false
    }
    cargarEstadisticas()
  })
}
onMounted(async () => {
  socketService.connect(authStore.usuario.id)
  registrarEventos()
  await cargarZona()
  await cargarPlano()
  await cargarLotes()
  await cargarEstadisticas()
})

onUnmounted(() => {
  if (loteSeleccionado.value) {
    socketService.liberarLote(loteSeleccionado.value.id)
  }

  socketService.removeAll()
  socketService.disconnect()
})
</script>
