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
          Zonas del plano
        </h1>

        <div class="mt-2 flex items-center gap-2">
          <svg
            class="h-4 w-4 shrink-0 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M5 4h10l4 4v12H5V4Z"
            />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 4v5h4" />
          </svg>

          <p class="truncate text-sm text-slate-500 md:text-base">
            {{ plano.nombre }}
          </p>
        </div>
      </div>

      <!-- NUEVA ZONA -->

      <button
        v-if="authStore.usuario?.rol_id === 1"
        type="button"
        @click="nuevaZona"
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

        Nueva zona
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
          placeholder="Buscar zona por nombre o color..."
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
          <p class="text-sm font-semibold text-[#0b2d52]">Zonas registradas</p>

          <p class="mt-0.5 text-xs text-slate-400">
            {{ zonasFiltradas.length }}
            zona{{ zonasFiltradas.length === 1 ? '' : 's' }}
          </p>
        </div>
      </div>

      <!-- ===================================================== -->
      <!-- GRID DE ZONAS -->
      <!-- ===================================================== -->

      <div v-if="zonasFiltradas.length > 0" class="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <article
          v-for="zona in zonasFiltradas"
          :key="zona.id"
          class="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <!-- ================================================= -->
          <!-- CABECERA -->
          <!-- ================================================= -->

          <div
            class="relative flex min-h-[92px] items-center justify-between overflow-hidden bg-[#e8f6fb] px-5 py-4"
          >
            <div class="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/50"></div>

            <div class="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-[#0879a8]/5"></div>

            <div class="relative flex min-w-0 items-center gap-3">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm"
                :style="{ color: zona.color }"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              <div class="min-w-0">
                <p class="text-xs font-medium uppercase tracking-wide text-[#0879a8]">Zona</p>

                <h2 class="truncate text-lg font-bold text-[#0b2d52]" :title="zona.nombre">
                  {{ zona.nombre }}
                </h2>
              </div>
            </div>

            <!-- COLOR -->

            <div
              class="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-sm"
              :style="{ backgroundColor: zona.color }"
              :title="`Color: ${zona.color}`"
            ></div>
          </div>

          <!-- ================================================= -->
          <!-- CONTENIDO -->
          <!-- ================================================= -->

          <div class="p-5">
            <!-- DESCRIPCIÓN -->

            <div class="min-h-[42px]">
              <p
                v-if="zona.descripcion"
                class="line-clamp-2 text-sm leading-relaxed text-slate-500"
              >
                {{ zona.descripcion }}
              </p>

              <p v-else class="text-sm italic text-slate-400">Sin descripción registrada.</p>
            </div>

            <!-- ================================================= -->
            <!-- MINIMAPA -->
            <!-- ================================================= -->

            <div class="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <div class="mb-2 flex items-center justify-between px-1">
                <div class="flex items-center gap-2">
                  <svg
                    class="h-4 w-4 text-[#0879a8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

                  <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Vista de zona
                  </span>
                </div>

                <span
                  class="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm"
                >
                  Minimapa
                </span>
              </div>

              <div class="flex items-center justify-center overflow-hidden rounded-xl bg-white">
                <MiniMapa
                  :svg="svgPlano"
                  :svgIds="zona.svgids ? zona.svgids.split(',') : []"
                  :ocupados="pathsOcupados"
                  :color="zona.color"
                  width="500px"
                  height="400px"
                />
              </div>
            </div>

            <!-- ================================================= -->
            <!-- ACCIONES -->
            <!-- ================================================= -->

            <div class="mt-5 flex gap-2">
              <!-- VER LOTES -->

              <RouterLink
                :to="`/proyectos/${route.params.proyectoId}/planos/${route.params.planoId}/zonas/${zona.id}/lotes`"
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
                    d="M7 16h10M7 12h10M7 8h5"
                  />
                </svg>

                Ver lotes
              </RouterLink>

              <!-- EDITAR -->

              <button
                v-if="authStore.usuario?.rol_id === 1"
                type="button"
                @click="editarZona(zona)"
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                title="Editar zona"
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
                @click="abrirEliminar(zona)"
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                title="Eliminar zona"
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
              d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
            />

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M8 9h8M8 12h8M8 15h5"
            />
          </svg>
        </div>

        <h2 class="mt-5 text-lg font-bold text-[#0b2d52]">No encontramos zonas</h2>

        <p class="mx-auto mt-2 max-w-md text-sm text-slate-400">
          {{
            busqueda
              ? 'Intenta realizar una búsqueda diferente.'
              : 'Todavía no existen zonas registradas para este plano.'
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
    <!-- MODAL NUEVA / EDITAR ZONA -->
    <!-- ===================================================== -->

    <div
      v-if="mostrarModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
    >
      <div
        class="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
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
              <h2 class="text-xl font-bold text-[#0b2d52]">
                {{ modoEdicion ? 'Editar zona' : 'Nueva zona' }}
              </h2>

              <p class="mt-0.5 text-sm text-slate-400">
                {{
                  modoEdicion
                    ? 'Modifique la información y los lotes de la zona.'
                    : 'Registre una nueva zona para este plano.'
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- BODY -->

        <div ref="contenidoModal" class="flex-1 overflow-y-auto px-6 py-6 md:px-8">
          <!-- INFORMACIÓN -->

          <div class="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
            <div class="mb-4">
              <h3 class="text-sm font-bold text-[#0b2d52]">Información de la zona</h3>

              <p class="mt-0.5 text-xs text-slate-400">
                Configure los datos principales de la zona.
              </p>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <!-- NOMBRE -->

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Nombre de la zona
                </label>

                <input
                  v-model="zona.nombre"
                  type="text"
                  placeholder="Ej. Zona A"
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:ring-4 focus:ring-[#0879a8]/10"
                />
              </div>

              <!-- COLOR -->

              <div>
                <label class="mb-2 block text-sm font-semibold text-slate-700">
                  Color de la zona
                </label>

                <div class="flex items-center gap-3">
                  <input
                    type="color"
                    v-model="zona.color"
                    class="h-11 w-16 cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
                  />

                  <div
                    class="flex h-11 flex-1 items-center gap-3 rounded-xl bg-white px-4 text-sm font-medium text-slate-600"
                  >
                    <span
                      class="h-5 w-5 rounded-full border border-slate-200"
                      :style="{ backgroundColor: zona.color }"
                    ></span>

                    {{ zona.color }}
                  </div>
                </div>
              </div>

              <!-- DESCRIPCIÓN -->

              <div class="md:col-span-2">
                <label class="mb-2 block text-sm font-semibold text-slate-700"> Descripción </label>

                <textarea
                  v-model="zona.descripcion"
                  rows="2"
                  placeholder="Descripción de la zona..."
                  class="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0879a8] focus:ring-4 focus:ring-[#0879a8]/10"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- LOTES + PREVISUALIZACIÓN -->

          <div class="mt-6 grid gap-6 lg:grid-cols-5">
            <!-- LOTES -->

            <div class="lg:col-span-3">
              <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 class="text-sm font-bold text-[#0b2d52]">Lotes disponibles</h3>

                  <p class="mt-0.5 text-xs text-slate-400">
                    Seleccione los lotes que pertenecerán a esta zona.
                  </p>
                </div>

                <label
                  v-if="!modoEdicion"
                  class="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#0879a8]"
                >
                  <input
                    v-model="seleccionarTodos"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#0879a8] focus:ring-[#0879a8]"
                    @change="toggleTodosLosLotes"
                  />

                  Seleccionar todos
                </label>
              </div>

              <div class="max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50">
                <label
                  v-for="path in pathsDisponibles"
                  :key="path.id"
                  class="flex cursor-pointer items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
                  :class="{
                    'bg-slate-100 text-slate-400': estaBloqueado(path.id),
                    'bg-white hover:bg-[#f8fcfd]': !estaBloqueado(path.id),
                  }"
                >
                  <div class="flex items-center gap-3">
                    <input
                      type="checkbox"
                      :value="path.id"
                      v-model="zona.paths"
                      :disabled="estaBloqueado(path.id)"
                      class="h-4 w-4 rounded border-slate-300 text-[#0879a8] focus:ring-[#0879a8]"
                    />

                    <div>
                      <p class="text-sm font-medium text-slate-700">
                        {{ path.id }}
                      </p>

                      <p v-if="path.numero" class="mt-0.5 text-xs text-slate-400">
                        Lote {{ path.numero }}
                      </p>
                    </div>
                  </div>

                  <span
                    v-if="estaBloqueado(path.id)"
                    class="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500"
                  >
                    Ocupado
                  </span>
                </label>
              </div>
            </div>

            <!-- VISTA PREVIA -->

            <div class="lg:col-span-2">
              <div class="mb-3">
                <h3 class="text-sm font-bold text-[#0b2d52]">Vista previa</h3>

                <p class="mt-0.5 text-xs text-slate-400">
                  Visualización de los lotes seleccionados.
                </p>
              </div>

              <div
                class="flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div class="overflow-hidden rounded-xl bg-white shadow-sm">
                  <MiniMapa
                    :svg="svgPlano"
                    :svgIds="zona.paths"
                    :ocupados="pathsOcupados"
                    :color="zona.color"
                    width="250px"
                    height="250px"
                  />
                </div>
              </div>

              <div class="mt-3 flex items-center justify-between rounded-xl bg-[#e8f6fb] px-4 py-3">
                <span class="text-xs font-medium text-slate-500"> Lotes seleccionados </span>

                <span class="text-sm font-bold text-[#0879a8]">
                  {{ zona.paths.length }}
                </span>
              </div>
            </div>
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
            @click="modoEdicion ? actualizarZona() : registrarZona()"
            :disabled="cargando"
            class="rounded-xl bg-[#0879a8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06688f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ modoEdicion ? 'Actualizar zona' : 'Registrar zona' }}
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

          <h2 class="mt-5 text-xl font-bold text-[#0b2d52]">Eliminar zona</h2>

          <p class="mt-3 text-sm leading-relaxed text-slate-500">
            ¿Está seguro de eliminar la zona
            <strong class="text-slate-700"> {{ zonaEliminar.nombre }} </strong>?
          </p>

          <div class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-left">
            <p class="text-xs font-semibold text-red-600">Importante</p>

            <p class="mt-1 text-xs leading-relaxed text-red-500">
              Esta acción eliminará la zona y sus asociaciones de lotes.
            </p>
          </div>
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
            @click="eliminarZona"
            :disabled="cargando"
            class="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Eliminar zona
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
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import MiniMapa from '@/pages/inmobiliaria/components/MiniMapa.vue'

//nuevo
const seleccionarTodos = ref(false)
const authStore = useAuthStore()
const toast = useToast()
const busqueda = ref('')
const baseUrl = import.meta.env.VITE_API_URL
const contenidoModal = ref(null)
const route = useRoute()
const cargando = ref(false)
const mostrarModal = ref(false)
const zonas = ref([])
const pathsDisponibles = ref([])
const modoEdicion = ref(false)
const mostrarModalEliminar = ref(false)
const plano = ref({
  id: null,
  nombre: '',
})
const zonaEliminar = ref({
  id: null,
  nombre: '',
})

const abrirEliminar = (item) => {
  zonaEliminar.value = {
    id: item.id,
    nombre: item.nombre,
  }

  mostrarModalEliminar.value = true
}
const nuevaZona = () => {
  modoEdicion.value = false
  seleccionarTodos.value = false
  zona.value = {
    nombre: '',
    descripcion: '',
    color: '#e5e7eb',
    paths: [],
  }

  mostrarModal.value = true
  nextTick(() => {
    contenidoModal.value?.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  })
}

// nueva función que selecciona todos los lotes
const toggleTodosLosLotes = () => {
  if (seleccionarTodos.value) {
    zona.value.paths = pathsDisponibles.value
      .filter((path) => !estaBloqueado(path.id))
      .map((path) => path.id)
  } else {
    zona.value.paths = []
  }
}

const pathsOcupados = computed(() => {
  return zonas.value
    .filter((z) => z.id !== zona.value.id)
    .flatMap((z) => z.svgids.split(','))
    .filter(Boolean)
})

const obtenerPaths = (svg) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(svg, 'image/svg+xml')

  const paths = xml.querySelectorAll('path[id]')

  pathsDisponibles.value = [...paths].map((p) => ({
    id: p.getAttribute('id'),
    numero: p.getAttribute('data-lote') || '',
    manzana: p.getAttribute('data-manzana') || '',
    area: Number(p.getAttribute('data-area')) || 0,
  }))
}
const zona = ref({
  nombre: '',
  descripcion: '',
  color: '#ffffff',
  paths: [],
})
const zonasFiltradas = computed(() => {
  const texto = busqueda.value.toLowerCase().trim()

  return zonas.value.filter(
    (z) => z.nombre.toLowerCase().includes(texto) || z.color.toLowerCase().includes(texto),
  )
})
const svgPlano = ref('')

const registrarZona = async () => {
  try {
    cargando.value = true

    const lotes = zona.value.paths.map((pathId) => {
      const lote = pathsDisponibles.value.find((p) => p.id === pathId)

      return {
        numero: lote?.numero || pathId,
        coordenadas_svg: pathId,
        area: lote?.area || 0,
        precio: 0,
        estado_id: 1,
        usuario_id: authStore.usuario.id,
        version_actual: 1,
      }
    })

    const body = {
      nombre: zona.value.nombre,
      descripcion: zona.value.descripcion,
      color: zona.value.color,
      plano_id: Number(route.params.planoId),
      lotes,
    }

    await axios.post(`${baseUrl}/zonas/zonas`, body, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Zona registrada correctamente')

    mostrarModal.value = false

    await getZonas()
  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message ?? 'No se pudo registrar la zona')
  } finally {
    cargando.value = false
  }
}

const getZonas = async () => {
  const { data } = await axios.get(`${baseUrl}/zonas/zonas_svg`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })
  console.log(data)
  zonas.value = data.filter((z) => z.plano_id === Number(route.params.planoId))
}

const cargarPlano = async () => {
  const { data } = await axios.get(`${baseUrl}/planos/plano_id?id=${route.params.planoId}`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })

  plano.value = data
  const uploadsUrl = import.meta.env.VITE_UPLOADS_URL
  const respuesta = await axios.get(`${uploadsUrl}/uploads/planos/${data.archivo_svg}`)

  svgPlano.value = respuesta.data

  obtenerPaths(svgPlano.value)
}

const editarZona = (z) => {
  zona.value = {
    id: z.id,
    nombre: z.nombre,
    descripcion: z.descripcion,
    color: z.color,
    paths: z.svgids.split(','),
  }
  console.log(z.color)
  modoEdicion.value = true
  mostrarModal.value = true
  nextTick(() => {
    contenidoModal.value?.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  })
}
const eliminarZona = async () => {
  try {
    await axios.delete(`${baseUrl}/zonas/zonas?id=${zonaEliminar.value.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Zona eliminada correctamente')

    mostrarModalEliminar.value = false

    await getZonas()
  } catch (error) {
    toast.error(error.response?.data?.message ?? 'No se pudo eliminar la zona')
  }
}
const actualizarZona = async () => {
  try {
    cargando.value = true

    const lotes = zona.value.paths.map((pathId) => {
      const lote = pathsDisponibles.value.find((p) => p.id === pathId)

      return {
        numero: pathId,
        coordenadas_svg: pathId,
        area: lote?.area || 0,
        precio: 0,
        estado_id: 1,
        usuario_id: authStore.usuario.id,
        version_actual: 1,
      }
    })

    const body = {
      nombre: zona.value.nombre,
      descripcion: zona.value.descripcion,
      color: zona.value.color,
      plano_id: Number(route.params.planoId),
      lotes,
    }

    await axios.put(`${baseUrl}/zonas/zonas?id=${zona.value.id}`, body, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    toast.success('Zona actualizada')

    mostrarModal.value = false
    modoEdicion.value = false

    await getZonas()
  } catch (error) {
    toast.error(error.response?.data?.message ?? 'Error al actualizar')
  } finally {
    cargando.value = false
  }
}
const estaBloqueado = (id) => {
  if (!modoEdicion.value) {
    return pathsOcupados.value.includes(id)
  }

  return pathsOcupados.value.includes(id) && !zona.value.paths.includes(id)
}

onMounted(() => {
  cargarPlano()
  getZonas()
})
</script>
