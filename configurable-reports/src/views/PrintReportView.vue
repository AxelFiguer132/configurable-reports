<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const reportCode = route.params.code as string;
const rawName = decodeURIComponent(route.params.name as string);
const reportName = rawName.replace(/-/g, " ");

const filters = ref({
  dateFrom: "",
  dateTo: "",
  format: "PDF",
  nomina: "",
  proceso: "",
  concepto: "",
});

const formats = ["PDF", "Excel", "CSV"];
const nominas = ["Nómina 1", "Nómina 2", "Nómina 3"];
const procesos = ["Proceso A", "Proceso B", "Proceso C"];
const conceptos = ["Concepto X", "Concepto Y", "Concepto Z"];

const generateReport = () => {
  alert(`Generando reporte ${reportCode} en formato ${filters.value.format}`);
};

const goBack = () => {
  router.push("/");
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-semibold text-blue-900 mb-5">
      Filtros de Impresión - {{ reportCode }} - {{ reportName }}
    </h1>

    <form @submit.prevent="generateReport" class="space-y-4">
      <!-- Fechas -->
      <div>
        <label class="block text-sm font-medium text-gray-800">Fecha Desde</label>
        <input type="date" v-model="filters.dateFrom" class="form-input w-full" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-800">Fecha Hasta</label>
        <input type="date" v-model="filters.dateTo" class="form-input w-full" />
      </div>

      <!-- Selects personalizados -->
      <div>
        <label class="block text-sm font-medium text-gray-800">Nómina</label>
        <select v-model="filters.nomina" class="form-input w-full">
          <option disabled value="">Selecciona una opción</option>
          <option v-for="n in nominas" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-800">Proceso</label>
        <select v-model="filters.proceso" class="form-input w-full">
          <option disabled value="">Selecciona un proceso</option>
          <option v-for="p in procesos" :key="p" :value="p">{{ p }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-800">Concepto</label>
        <select v-model="filters.concepto" class="form-input w-full">
          <option disabled value="">Selecciona un concepto</option>
          <option v-for="c in conceptos" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <!-- Formato -->
      <div>
        <label class="block text-sm font-medium text-gray-800">Formato de Reporte</label>
        <select v-model="filters.format" class="form-input w-full">
          <option v-for="format in formats" :key="format" :value="format">{{ format }}</option>
        </select>
      </div>

      <!-- Botones -->
      <div class="flex justify-between mt-5">
        <button @click="goBack" type="button" class="btn-gray">← Volver</button>
        <button type="submit" class="btn-blue">Generar Reporte</button>
      </div>
    </form>
  </div>
</template>
