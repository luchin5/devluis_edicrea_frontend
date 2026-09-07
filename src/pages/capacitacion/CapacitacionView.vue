<template>
  <div class="flex min-h-[calc(100vh-120px)] items-center justify-center">
    <div
      class="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
    >
      <!-- Decoración -->
      <div class="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-sky-50"></div>

      <div class="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-cyan-50"></div>

      <!-- Contenido -->

      <div
        class="relative z-10 flex flex-col items-center px-6 py-14 text-center md:px-12 md:py-20"
      >
        <!-- Icono -->

        <div
          class="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#e8f6fb] text-[#0879a8]"
        >
          <svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M4 5h16v14H4V5ZM8 9h8M8 13h5"
            />
          </svg>
        </div>

        <!-- Etiqueta -->

        <p class="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#0879a8]">
          Centro de capacitación
        </p>

        <!-- Título -->

        <h1 class="mt-3 text-3xl font-bold tracking-tight text-[#0b2d52] md:text-4xl">
          Aprende. Mejora. Construye.
        </h1>

        <!-- Descripción -->

        <p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
          Estamos preparando un espacio de capacitación para ayudarte a aprovechar al máximo las
          herramientas y funcionalidades de la plataforma EDICREA.
        </p>

        <!-- Estado -->

        <div
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-[#0879a8]"
        >
          <span class="h-2 w-2 rounded-full bg-[#0879a8]"></span>

          Próximamente
        </div>

        <!-- Separador -->

        <div class="mt-10 h-px w-full max-w-md bg-slate-100"></div>

        <!-- Pie -->

        <div class="mt-6 flex items-center gap-3">
          <img src="/images/edicrea.png" alt="EDICREA" class="h-10 w-auto object-contain" />

          <div class="h-8 w-px bg-slate-200"></div>

          <p class="text-xs text-slate-400">Formación y conocimiento</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
