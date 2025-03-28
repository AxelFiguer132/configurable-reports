<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 📌 Obtener el código del reporte desde la URL
const reportCode = route.params.code as string;
const rawName = decodeURIComponent(route.params.name as string);

// Reemplaza guiones por espacios
const reportName = rawName.replace(/-/g, " ");

// 📌 Estado de los filtros de impresión
const filters = ref({
  dateFrom: "",
  dateTo: "",
  format: "PDF",
  includeHeader: true,
});

// 📌 Opciones de formato de impresión
const formats = ["PDF", "Excel", "CSV"];

// 📌 Generar reporte
const generateReport = () => {
  alert(`Generando reporte ${reportCode} en formato ${filters.value.format}`);
};

// 📌 Volver a la pantalla anterior
const goBack = () => {
  router.push("/");
};
</script>

<template>
    <div class="w-full max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold text-blue-900 mb-5">
        Filtros de Impresión - {{ reportCode }} - {{ reportName }}
      </h1>

      <!-- 📌 Formulario de Filtros -->
      <form @submit.prevent="generateReport" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-800">Fecha Desde</label>
          <input type="date" v-model="filters.dateFrom" class="form-input w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-800">Fecha Hasta</label>
          <input type="date" v-model="filters.dateTo" class="form-input w-full" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-800">Formato de Reporte</label>
          <select v-model="filters.format" class="form-input w-full">
            <option v-for="format in formats" :key="format" :value="format">{{ format }}</option>
          </select>
        </div>

        <div class="flex items-center">
          <input type="checkbox" v-model="filters.includeHeader" class="mr-2" />
          <label class="text-sm text-gray-800">Incluir Encabezado</label>
        </div>

        <!-- 📌 Botones de acción -->
        <div class="flex justify-between mt-5">
          <button @click="goBack" type="button" class="btn-gray">← Volver</button>
          <button type="submit" class="btn-blue">Generar Reporte</button>
        </div>
      </form>
    </div>
</template>
