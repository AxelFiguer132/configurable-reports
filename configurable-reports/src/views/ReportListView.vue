<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useReportStore } from "../store/report-store";

const router = useRouter();
const reportStore = useReportStore();
const reports = ref(reportStore.reports);

// Ir a la pantalla de agregar reporte
const addReport = () => {
  router.push("/manage-report/new");
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

// Regresar a la pantalla principal
const goToMainPage = () => {
  router.push("/");
};
</script>

<template>
  <div class="w-full overflow-hidden mb-1">
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
          <div class="flex mb-3 sm:mb-0 max-w-2xl sm:w-2/3 md:w-1/2 lg:w-5/12">
            <div class="relative mr-2 w-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-300 absolute pt-2 pl-2 w-7 h-7"
              >
                <path
                  d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <input
                placeholder="Buscar..."
                type="text"
                autocomplete="off"
                class="bg-white pl-9 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                step="any"
              />
            </div>
            <button
              type="submit"
              class="mr-2 inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer"
            >
              Buscar
            </button>
          </div>
          <div class="flex justify-between">
            <button
              @click="goToMainPage"
              class="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              ← Volver
            </button>
            <button
              @click="addReport"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Agregar Reporte
            </button>
          </div>
        </div>
      </div>

      <!-- Tabla de Reportes -->
      <div class="table-scroll z-0 pb-6">
        <div class="relative overflow-x-auto rounded-lg h-full scroll">
          <table class="min-w-full table-auto shadow-lg">
            <thead class="h-14">
              <tr>
                <th class="sticky top-0 bg-white cursor-pointer">
                  <div class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap">
                    Código
                  </div>
                </th>
                <th class="sticky top-0 bg-white cursor-pointer">
                  <div class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap">
                    Nombre
                  </div>
                </th>
                <th class="sticky top-0 bg-white cursor-pointer">
                  <div class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap"></div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-50 shadow-xl">
              <tr
                v-for="report in reports"
                :key="report.code"
                class="bg-white border-y-2 border-gray-100 h-tr hover:bg-gray-100"
              >
                <td class="px-3">
                  <div
                    class="max-w-xs overflow-hidden whitespace-pre-line text-ellipsis flex break-all justify-start"
                    style="inline-size: max-content"
                  >
                    {{ report.code }}
                  </div>
                </td>
                <td class="px-3">
                  <div
                    class="max-w-xs overflow-hidden whitespace-pre-line text-ellipsis flex break-all justify-start"
                    style="inline-size: max-content"
                  >
                    {{ report.name }}
                  </div>
                </td>
                <td class="px-3 sticky right-0 bg-white">
                  <div class="flex py-2.5 justify-end gap-1">
                    <svg
                      @click="editReport(report.code)"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 mx-2 cursor-pointer text-gray-600"
                    >
                      <path
                        d="M12 20H21M3.00003 20H4.67457C5.16376 20 5.40835 20 5.63852 19.9447C5.84259 19.8957 6.03768 19.8149 6.21663 19.7053C6.41846 19.5816 6.59141 19.4086 6.93732 19.0627L19.5001 6.49998C20.3285 5.67156 20.3285 4.32841 19.5001 3.49998C18.6716 2.67156 17.3285 2.67156 16.5001 3.49998L3.93729 16.0627C3.59139 16.4086 3.41843 16.5816 3.29475 16.7834C3.18509 16.9624 3.10428 17.1574 3.05529 17.3615C3.00003 17.5917 3.00003 17.8363 3.00003 18.3255V20Z"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                    <svg
                      @click="configureReport(report.code)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-6 w-6 mx-2 cursor-pointer text-gray-600"
                    >
                      <path
                        d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Z"
                      />
                      <path
                        d="M19.8 13a7 7 0 0 0 0-2l2.1-1.6a0.5 0.5 0 0 0 .1-0.7l-2-3.5a0.5 0.5 0 0 0-0.6-0.2l-2.5 1a7 7 0 0 0-1.7-1L15 2.2a0.5 0.5 0 0 0-0.5-0.5h-4a0.5 0.5 0 0 0-0.5 0.5L9.2 4a7 7 0 0 0-1.7 1L5 3.8a0.5 0.5 0 0 0-0.6 0.2l-2 3.5a0.5 0.5 0 0 0 .1 0.7L4.5 10.9a7 7 0 0 0 0 2L2.5 14.5a0.5 0.5 0 0 0-.1 0.7l2 3.5a0.5 0.5 0 0 0 0.6 0.2l2.5-1a7 7 0 0 0 1.7 1L9 21.8a0.5 0.5 0 0 0 .5 0.5h4a0.5 0.5 0 0 0 .5-0.5L14.8 20a7 7 0 0 0 1.7-1l2.5 1a0.5 0.5 0 0 0 .6-0.2l2-3.5a0.5 0.5 0 0 0-.1-0.7L19.8 13Z"
                      />
                    </svg>
                    <svg
                      @click="deleteReport(report.code)"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 mx-2 cursor-pointer text-gray-600"
                    >
                      <path
                        d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
                        stroke="currentColor"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
