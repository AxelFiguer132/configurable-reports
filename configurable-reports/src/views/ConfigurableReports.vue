<script setup lang="ts">
import { useReportStore } from "../store/report-store";
import { useRouter } from "vue-router";
import { computed } from "vue";
import BaseButton from "../components/base/BaseButton.vue";

const router = useRouter();
const reportStore = useReportStore();
const reports = computed(() => reportStore.reports);

// 📌 Ir al listado de reportes
const goToReportList = () => {
  router.push("/reports");
};

const goToPrintView = (code: string, name: string) => {
  const safeName = encodeURIComponent(name.trim().replace(/\s+/g, "-"));
  router.push(`/print-report/${code}/${safeName}`);
};
</script>

<template>
  <div class="h-full px-5">
    <div class="bg-gray-50 sm:pb-5 lg:pb-10">
      <div class="leading-4 pt-responsive">
        <p class="text-3xl font-semibold text-shadow text-blue-900">Reportes</p>
      </div>
    </div>
    <form class="scroll overflow-auto h-mainReports">
      <div class="bg-gray-50 mb-10">
        <div
          class="flex justify-between items-center bg-blue-100 rounded-lg px-5 py-3 mb-1"
        >
          <h1 class="text-blue-600">Configurables</h1>
          <BaseButton
            color="blue"
            custom-class="mr-2 px-3"
            @click="goToReportList"
          >
            +
          </BaseButton>
        </div>

        <div class="w-full flex flex-wrap gap-3 overflow-auto py-1">
          <div
            v-for="report in reports"
            :key="report.code"
            @click="goToPrintView(report.code, report.name)"
            class="flex items-center bg-white hover:bg-gray-200 rounded-lg cursor-pointer border border-gray-100 px-4 py-3 shadow-sm transition-all duration-200"
          >
            <p
              class="text-center tracking-wider text-sm font-semibold text-blue-700 max-w-xs truncate"
            >
              {{ report.name }}
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
