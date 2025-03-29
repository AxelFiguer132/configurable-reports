<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useReportStore } from "../store/report-store";

import BaseButton from "../components/base/BaseButton.vue";
import SearchBar from "../components/base/SearchBar.vue";
import ReportTable from "../components/table/ReportTable.vue";

const router = useRouter();
const reportStore = useReportStore();

// 🔍 Buscador
const searchQuery = ref("");
const allReports = computed(() => reportStore.reports);
const reports = computed(() => {
  if (!searchQuery.value) return allReports.value;
  return allReports.value.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// ✅ Al montar, carga los reportes desde el backend
onMounted(() => {
  reportStore.fetchReports();
});

// 🔘 Agregar nuevo reporte
const addReport = () => {
  router.push("/manage-report/new");
};

// ✏️ Editar reporte
const editReport = (code: string) => {
  router.push(`/manage-report/${code}`);
};

// ⚙️ Configurar segmentos
const configureReport = (code: string) => {
  router.push(`/reports/${code}/segments`);
};

// 🗑️ Eliminar reporte usando el store
const deleteReport = async (code: string) => {
  const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este reporte?");
  if (!confirmDelete) return;

  await reportStore.deleteReport(code);
};

// ⬅️ Volver a inicio
const goToMainPage = () => {
  router.push("/");
};

// 🔍 Evento del componente SearchBar
const handleSearch = (query: string) => {
  searchQuery.value = query;
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
          <BaseButton color="gray" custom-class="mr-2 px-3" @click="goToMainPage">
            ← Volver
          </BaseButton>
          <BaseButton color="blue" custom-class="mr-2 px-3" @click="addReport">
            + Agregar Reporte
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="table-scroll z-0 pb-6">
      <div class="relative overflow-x-auto rounded-lg h-full scroll">
        <ReportTable
          :columns="[
            { label: 'Código', key: 'code' },
            { label: 'Nombre', key: 'name' },
            { label: 'Tipo', key: 'layoutType' },
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
