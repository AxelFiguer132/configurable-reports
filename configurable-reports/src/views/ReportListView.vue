<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useReportStore } from "../store/report-store";
import BaseButton from "../components/base/BaseButton.vue";
import SearchBar from "../components/base/SearchBar.vue";
import ReportTable from "../components/table/ReportTable.vue";

const router = useRouter();
const reportStore = useReportStore();
const reports = ref(reportStore.reports);

// Ir a la pantalla de agregar reporte
const addReport = () => {
  router.push("/manage-report/new");
};

// Regresar a la pantalla principal
const goToMainPage = () => {
  router.push("/");
};

const handleSearch = (query: string) => {
  console.log("Buscando:", query);
  // Aquí puedes filtrar tu tabla, o hacer un fetch, etc.
};

// Ir a la pantalla de editar reporte
const editReport = (code: string) => {
  router.push(`/manage-report/${code}`);
};

// Eliminar un reporte
const deleteReport = (code: string) => {
  if (confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
    reportStore.deleteReport(code);
  }
};

// Ir a la pantalla de configuración del reporte
const configureReport = (code: string) => {
  router.push(`/reports/${code}/segments`);
};
</script>

<template>
  <div class="h-full px-5">
    <div class="bg-gray-50 pb-4">
      <div class="leading-4 pt-responsive">
        <p class="text-3xl font-semibold text-shadow text-blue-900">
          Reportes Configurables
        </p>
        <p class="text-gray-500 text-shadow">
          Reportes configurables disponibles en el sistema
        </p>
      </div>
      <div class="sm:flex justify-between pt-8">
        <SearchBar @search="handleSearch" />
        <div class="flex justify-between">
          <BaseButton
            color="gray"
            custom-class="mr-2 px-3"
            @click="goToMainPage"
          >
            ← Volver
          </BaseButton>
          <BaseButton @click="addReport" color="blue" custom-class="mr-2 px-3">
            + Agregar Reporte
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="table-scroll z-0 pb-6">
      <div class="relative overflow-x-auto rounded-lg h-full scroll">
        <ReportTable
          :columns="[
            { label: 'Código', key: 'code' },
            { label: 'Nombre', key: 'name' },
            { label: 'Tipo', key: 'tipe' },
          ]"
          :rows="reports"
          :hasActions="true"
          :actions="{
            edit: editReport,
            config: configureReport,
            delete: deleteReport,
          }"
        />
      </div>
    </div>
  </div>
</template>
