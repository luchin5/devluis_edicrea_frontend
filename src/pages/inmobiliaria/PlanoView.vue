<template>
  <div class="w-full">
    <!-- ===================================================== -->
    <!-- ENCABEZADO -->
    <!-- ===================================================== -->

    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#0879a8]">
          Gestión inmobiliaria
        </p>

        <h1 class="mt-1 text-2xl font-bold tracking-tight text-[#0b2d52] md:text-3xl">
          Planos del proyecto
        </h1>

        <p class="mt-2 text-sm text-slate-500 md:text-base">
          Administra los planos pertenecientes al proyecto.
        </p>
      </div>

      <!-- NUEVO PLANO -->

      <button
        v-if="authStore.usuario?.rol_id === 1"
        type="button"
        @click="mostrarModal = true"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0879a8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#06688f] hover:shadow-md"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="M12 5v14M5 12h14"
          />
        </svg>

        Nuevo plano
      </button>
    </div>

    <!-- ===================================================== -->
    <!-- BUSCADOR -->
    <!-- ===================================================== -->

    <section class="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div class="relative max-w-xl">
        <svg
          class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.8"
            d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0c0-3.87 3.13-7 7-7a7 7 0 0 1 7 7Z"
          />
        </svg>

        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar plano por nombre o archivo..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
        />

        <button
          v-if="busqueda"
          type="button"
          @click="busqueda = ''"
          class="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          title="Limpiar búsqueda"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- CONTADOR -->
    <!-- ===================================================== -->

    <section>
      <div class="mb-4 flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-[#0b2d52]">Planos registrados</p>

          <p class="mt-0.5 text-xs text-slate-400">
            {{ planosFiltrados.length }}
            plano{{ planosFiltrados.length === 1 ? '' : 's' }}
          </p>
        </div>
      </div>

      <!-- ===================================================== -->
      <!-- GRID DE PLANOS -->
      <!-- ===================================================== -->

      <div
        v-if="planosFiltrados.length > 0"
        class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <article
          v-for="plano in planosFiltrados"
          :key="plano.id"
          class="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <!-- CABECERA DE TARJETA -->

          <div class="relative flex h-36 items-center justify-center overflow-hidden bg-[#e8f6fb]">
            <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/50"></div>

            <div class="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-[#0879a8]/10"></div>

            <div
              class="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#0879a8] shadow-sm"
            >
              <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d="M5 4.5A1.5 1.5 0 0 1 6.5 3h7L19 8.5V19a2 2 0 0 1-2 2H6.5A1.5 1.5 0 0 1 5 19V4.5Z"
                />

                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.7"
                  d="M13 3v6h6M8 13h8M8 16h5"
                />
              </svg>
            </div>
          </div>

          <!-- INFORMACIÓN -->

          <div class="p-5">
            <!-- NOMBRE -->

            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Plano</p>

                <h2 class="mt-1 truncate text-lg font-bold text-[#0b2d52]" :title="plano.nombre">
                  {{ plano.nombre }}
                </h2>
              </div>

              <span
                class="shrink-0 rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-semibold text-[#0879a8]"
              >
                DWG
              </span>
            </div>

            <!-- ARCHIVO -->

            <div class="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M6 3h8l5 5v13H6V3Z"
                  />

                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M14 3v6h5"
                  />
                </svg>
              </div>

              <div class="min-w-0">
                <p class="text-xs text-slate-400">Archivo</p>

                <p class="truncate text-sm font-medium text-slate-600" :title="plano.archivo_svg">
                  {{ plano.archivo_svg }}
                </p>
              </div>
            </div>

            <!-- FECHA -->

            <div
              class="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs"
            >
              <span class="text-slate-400"> Registrado </span>

              <span class="font-medium text-slate-500">
                {{ plano.fecha_registro }}
              </span>
            </div>

            <!-- ACCIONES -->

            <div class="mt-5 flex gap-2">
              <!-- VER ZONAS -->

              <RouterLink
                :to="`/proyectos/${route.params.proyectoId}/planos/${plano.id}/zonas`"
                class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#e8f6fb] px-3 py-2.5 text-sm font-semibold text-[#0879a8] transition hover:bg-[#d8f0f7]"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    d="m7 15 3-3 2 2 3-4 2 3"
                  />
                </svg>

                Ver zonas
              </RouterLink>

              <!-- EDITAR -->

              <button
                v-if="authStore.usuario?.rol_id === 1"
                type="button"
                @click="abrirEditar(plano)"
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                title="Editar plano"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="m16.86 3.49 3.65 3.65M5 19l3.2-.8L19.7 6.7a1.8 1.8 0 0 0 0-2.55l-.85-.85a1.8 1.8 0 0 0-2.55 0L4.8 14.8 4 18l1 1Z"
                  />
                </svg>
              </button>

              <!-- ELIMINAR -->

              <button
                v-if="authStore.usuario?.rol_id === 1"
                type="button"
                @click="abrirEliminar(plano)"
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                title="Eliminar plano"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M5 7h14M10 11v6M14 11v6M9 7V4h6v3m-9 0 1 13h10l1-13"
                  />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- ===================================================== -->
      <!-- SIN RESULTADOS -->
      <!-- ===================================================== -->

      <div
        v-else
        class="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-[#0879a8]"
        >
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M5 4h10l4 4v12H5V4Z"
            />

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M15 4v5h4M8 13h8M8 16h5"
            />
          </svg>
        </div>

        <h2 class="mt-5 text-lg font-bold text-[#0b2d52]">No encontramos planos</h2>

        <p class="mx-auto mt-2 max-w-md text-sm text-slate-400">
          {{
            busqueda
              ? 'Intenta realizar una búsqueda diferente.'
              : 'Todavía no existen planos registrados para este proyecto.'
          }}
        </p>

        <button
          v-if="busqueda"
          type="button"
          @click="busqueda = ''"
          class="mt-5 text-sm font-semibold text-[#0879a8] transition hover:text-[#0b2d52]"
        >
          Limpiar búsqueda
        </button>
      </div>
    </section>

    <!-- ===================================================== -->
    <!-- MODAL NUEVO PLANO -->
    <!-- ===================================================== -->

    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <!-- HEADER -->

        <div class="border-b border-slate-100 px-6 py-5 md:px-8">
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-[#0879a8]"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="M12 5v14M5 12h14"
                />
              </svg>
            </div>

            <div>
              <h2 class="text-xl font-bold text-[#0b2d52]">Nuevo plano</h2>

              <p class="mt-0.5 text-sm text-slate-400">
                Registre un nuevo plano para este proyecto.
              </p>
            </div>
          </div>
        </div>

        <!-- FORMULARIO -->

        <div class="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-6 md:px-8">
          <!-- NOMBRE -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">
              Nombre del plano
            </label>

            <input
              v-model="plano.nombre"
              type="text"
              placeholder="Ej. Plano General"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- ARCHIVO -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Archivo DWG </label>

            <label
              class="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 transition hover:border-[#0879a8] hover:bg-[#e8f6fb]"
            >
              <input type="file" accept=".dwg" class="hidden" @change="seleccionarArchivo" />

              <div class="text-center">
                <div
                  class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0879a8] shadow-sm"
                >
                  <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M12 16V5m0 0L8 9m4-4 4 4M5 19h14"
                    />
                  </svg>
                </div>

                <p class="font-semibold text-slate-700">Seleccionar archivo DWG</p>

                <p class="mt-1 text-sm text-slate-400">Solo archivos .dwg</p>
              </div>
            </label>

            <div
              v-if="archivo"
              class="mt-3 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700"
            >
              <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="m5 12 4 4L19 6"
                />
              </svg>

              <span class="truncate text-sm font-medium">
                {{ archivo.name }}
              </span>
            </div>
          </div>

          <!-- FECHA -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">
              Fecha de registro
            </label>

            <input
              v-model="plano.fecha_registro"
              type="date"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>
        </div>

        <!-- FOOTER -->

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end md:px-8"
        >
          <button
            type="button"
            @click="mostrarModal = false"
            class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            @click="registrarPlano"
            :disabled="cargando"
            class="rounded-xl bg-[#0879a8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06688f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Registrar plano
          </button>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- MODAL EDITAR PLANO -->
    <!-- ===================================================== -->

    <div
      v-if="mostrarModalEditar"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <!-- HEADER -->

        <div class="border-b border-slate-100 px-6 py-5 md:px-8">
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
              <h2 class="text-xl font-bold text-[#0b2d52]">Editar plano</h2>

              <p class="mt-0.5 text-sm text-slate-400">Modifique la información del plano.</p>
            </div>
          </div>
        </div>

        <!-- FORMULARIO -->

        <div class="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-6 md:px-8">
          <!-- NOMBRE -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">
              Nombre del plano
            </label>

            <input
              v-model="planoEditar.nombre"
              type="text"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>

          <!-- ARCHIVO -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700"> Archivo DWG </label>

            <label
              class="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 transition hover:border-[#0879a8] hover:bg-[#e8f6fb]"
            >
              <input type="file" accept=".dwg" class="hidden" @change="seleccionarArchivo" />

              <div class="text-center">
                <div
                  class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0879a8] shadow-sm"
                >
                  <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M12 16V5m0 0L8 9m4-4 4 4M5 19h14"
                    />
                  </svg>
                </div>

                <p class="font-semibold text-slate-700">Seleccionar archivo DWG</p>

                <p class="mt-1 text-sm text-slate-400">Solo archivos .dwg</p>
              </div>
            </label>

            <div
              v-if="archivo"
              class="mt-3 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700"
            >
              <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.8"
                  d="m5 12 4 4L19 6"
                />
              </svg>

              <span class="truncate text-sm font-medium">
                {{ archivo.name }}
              </span>
            </div>
          </div>

          <!-- FECHA -->

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">
              Fecha de registro
            </label>

            <input
              v-model="planoEditar.fecha_registro"
              type="date"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0879a8] focus:bg-white focus:ring-4 focus:ring-[#0879a8]/10"
            />
          </div>
        </div>

        <!-- FOOTER -->

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-end md:px-8"
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
            @click="editarPlano"
            :disabled="cargando"
            class="rounded-xl bg-[#0879a8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06688f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- MODAL ELIMINAR -->
    <!-- ===================================================== -->

    <div
      v-if="mostrarModalEliminar"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
    >
      <div class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div class="p-7 text-center">
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500"
          >
            <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M12 9v4m0 4h.01M5.2 19h13.6c1.55 0 2.5-1.67 1.72-3L13.72 4c-.77-1.33-2.69-1.33-3.46 0L3.48 16c-.78 1.33.17 3 1.72 3Z"
              />
            </svg>
          </div>

          <h2 class="mt-5 text-xl font-bold text-[#0b2d52]">Eliminar plano</h2>

          <p class="mt-3 text-sm leading-relaxed text-slate-500">
            ¿Está seguro de eliminar el plano
            <strong class="text-slate-700"> {{ planoEliminar.nombre }} </strong>?
          </p>

          <p class="mt-2 text-xs text-slate-400">Esta acción no se puede deshacer.</p>
        </div>

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 p-5 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            @click="mostrarModalEliminar = false"
            class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            @click="eliminarPlano"
            :disabled="cargando"
            class="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Eliminar plano
          </button>
        </div>
      </div>
    </div>

    <!-- ===================================================== -->
    <!-- LOADING GLOBAL -->
    <!-- ===================================================== -->

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
          <circle
            class="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />

          <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
        </svg>

        <p class="text-sm font-semibold text-[#0b2d52]">Procesando...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()
const busqueda = ref('')
const baseUrl = import.meta.env.VITE_API_URL

const route = useRoute()
const cargando = ref(false)
const mostrarModal = ref(false)
const planos = ref([])
const archivo = ref(null)
const mostrarModalEliminar = ref(false)
const abrirEliminar = (item) => {
  planoEliminar.value = {
    id: item.id,
    nombre: item.nombre,
  }

  mostrarModalEliminar.value = true
}
const planoEliminar = ref({
  id: null,
  nombre: '',
})
const eliminarPlano = async () => {
  try {
    await axios.delete(`${baseUrl}/planos/plano?id=${planoEliminar.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Plano eliminado correctamente')

    mostrarModalEliminar.value = false

    await getPlanos()
  } catch (error) {
    console.error(error)

    toast.error(error.response?.data?.error ?? 'No se pudo eliminar el plano')
  }
}

const mostrarModalEditar = ref(false)

const planoEditar = ref({
  id: null,
  nombre: '',
  archivo_svg: '',
  fecha_registro: '',
  proyecto_id: null,
})
const abrirEditar = (item) => {
  planoEditar.value = {
    id: item.id,
    nombre: item.nombre,
    archivo_svg: item.archivo_svg,
    fecha_registro: item.fecha_registro.split('T')[0],
    proyecto_id: item.proyecto_id,
  }

  archivo.value = null
  mostrarModalEditar.value = true
}
const plano = ref({
  nombre: '',
  fecha_registro: '',
})
const planosFiltrados = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  return planos.value.filter(
    (p) => p.nombre.toLowerCase().includes(texto) || p.archivo_svg.toLowerCase().includes(texto),
  )
})
const seleccionarArchivo = (event) => {
  archivo.value = event.target.files[0]
}

const editarPlano = async () => {
  cargando.value = true
  try {
    const formData = new FormData()

    formData.append('nombre', planoEditar.value.nombre)
    formData.append('fecha_registro', planoEditar.value.fecha_registro)
    formData.append('proyecto_id', planoEditar.value.proyecto_id)

    if (archivo.value) {
      formData.append('archivo_dwg', archivo.value)
    } else {
      formData.append('archivo_svg', planoEditar.value.archivo_svg)
    }
    await axios.put(`${baseUrl}/planos/plano?id=${planoEditar.value.id}`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    toast.success('Plano actualizado correctamente')

    mostrarModalEditar.value = false

    archivo.value = null

    await getPlanos()
  } catch (error) {
    console.error(error)

    toast.error(error.response?.data?.error ?? 'No se pudo actualizar el plano')
  } finally {
    cargando.value = false
  }
}

const registrarPlano = async () => {
  if (!plano.value.nombre.trim()) {
    toast.warning('Ingrese el nombre del plano')
    return
  }

  if (!archivo.value) {
    toast.warning('Seleccione un archivo DWG')
    return
  }

  if (!plano.value.fecha_registro) {
    toast.warning('Seleccione la fecha')
    return
  }

  cargando.value = true

  try {
    const formData = new FormData()

    formData.append('nombre', plano.value.nombre)
    formData.append('archivo_dwg', archivo.value)
    formData.append('fecha_registro', plano.value.fecha_registro)
    formData.append('proyecto_id', route.params.proyectoId)

    await axios.post(`${baseUrl}/planos/plano`, formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Plano registrado correctamente')

    mostrarModal.value = false

    plano.value = {
      nombre: '',
      fecha_registro: '',
    }

    archivo.value = null

    // Aquí luego llamaremos:
    await getPlanos()
  } catch (error) {
    console.error(error)

    toast.error(error.response?.data?.error ?? 'No se pudo registrar el plano')
  } finally {
    cargando.value = false
  }
}

const getPlanos = async () => {
  cargando.value = true

  try {
    const { data } = await axios.get(`${baseUrl}/planos/plano`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    // Solo mostrar los planos del proyecto actual
    planos.value = data.filter((p) => p.proyecto_id === Number(route.params.proyectoId))
  } catch (error) {
    console.error(error)

    if (error.response?.status === 404) {
      planos.value = []
      toast.info('No existen planos registrados')
      return
    }

    toast.error(error.response?.data?.error ?? 'No se pudieron cargar los planos')
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  getPlanos()
})
// Aquí irá:
// GET /proyectos/:proyectoId/planos
</script>
