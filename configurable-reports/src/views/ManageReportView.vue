<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useReportStore } from "../store/report-store";

const router = useRouter();
const route = useRoute();
const reportStore = useReportStore();
const isNew = computed(() => route.params.code === "new");

// ✅ Inicializar el reporte con estructura para las columnas dinámicas
const localReport = ref({
  code: "",
  name: "",
  layoutType: "seleccione",
  columns: [] as Array<{
    id: number;
    tipo: string;
    valor: string;
    condicion: string;
    complemento: string;
  }>,
});

//Opciones para listas desplegables (Tipo, Valor y Condición)
const tipos = ["Empleado", "Concepto"];
const valores = {
  Empleado: ["Edad", "Banco", "Sexo"],
  Concepto: ["Neto", "TD", "TP"],
};
const condiciones = ["<>", "<", ">", "<=", ">=", "="];

//Cargar datos si se edita un reporte existente
onMounted(() => {
  if (!isNew.value) {
    const report = reportStore.reports.find((r) => r.code === route.params.code);
    if (report) {
      localReport.value = { ...report };
    } else {
      alert("El reporte no existe.");
      router.push("/reports");
    }
  }
});

//Agregar una nueva columna con ID incremental
const addColumn = () => {
  const lastId =
    localReport.value.columns.length > 0
      ? localReport.value.columns[localReport.value.columns.length - 1].id
      : 0;

  //Asigna una nueva referencia al array para que Vue detecte los cambios
  localReport.value.columns = [
    ...localReport.value.columns,
    {
      id: lastId + 10,
      tipo: "",
      valor: "",
      condicion: "",
      complemento: "",
    },
  ];
};

//Eliminar una columna específica
const deleteColumn = (index: number) => {
  localReport.value.columns.splice(index, 1);
};

//Guardar o actualizar el reporte
const saveReport = () => {
  if (
    !localReport.value.code.trim() ||
    isNaN(Number(localReport.value.code)) ||
    !localReport.value.name.trim()
  ) {
    alert("El código y nombre son obligatorios.");
    return;
  }

  if (isNew.value) {
    reportStore.addReport(localReport.value);
  } else {
    reportStore.updateReport(
      localReport.value.code,
      localReport.value.name,
      localReport.value.layoutType
    );
  }

  router.push("/reports");
};
</script>

<template>
    <div class="w-full overflow-hidden mb-1">
      <div class="h-full px-5">
        <!--Encabezado -->
        <div class="bg-gray-50 pb-4">
          <div class="leading-4 pt-responsive">
            <p class="text-3xl font-semibold text-shadow text-blue-900">
              {{ isNew ? "Agregar Reporte" : "Editar Reporte" }}
            </p>
          </div>
        </div>

        <form class="pt-responsive w-full">
          <ul class="h-full flex flex-row overflow-auto px-4">
            <li
              class="w-min text-base font-semibold tracking-normal p-3 text-center cursor-pointer break-words whitespace-nowrap overflow-hidden border-b-2 border-blue-600 text-blue-600">
              Datos
            </li>
          </ul>

          <div class="content shadow-md rounded-b-none rounded-md overflow-y-auto w-full bg-white pt-1.5">
            <div class="tabs__content">
              <div class="px-6 py-4">
                <!-- Sección de Datos Básicos -->
                <div class="mb-5 col-span-8 sm:col-span-3 lg:col-span-2 pb-2 sm:pb-0">
                  <p class="text-base font-semibold text-gray-700">Básicos</p>
                </div>

                <div class="fields-group col-span-8 sm:col-span-5 lg:col-span-6 grid grid-cols-6 gap-x-6 gap-y-4">
                  <!-- Código del Reporte -->
                  <div class="relative block dynamic-field col-span-8 sm:col-span-6 lg:col-span-3 xl:col-span-2">
                    <label class="block text-sm font-medium text-gray-800 mb-1.5">Código</label>
                    <input v-model="localReport.code" type="text" class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                      :disabled="!isNew" placeholder="Ingrese el código" />
                  </div>

                  <!-- Nombre del Reporte -->
                  <div class="relative block dynamic-field col-span-8 sm:col-span-6 lg:col-span-3 xl:col-span-2">
                    <label class="block text-sm font-medium text-gray-800 mb-1.5">Nombre</label>
                    <input v-model="localReport.name" type="text" class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                      placeholder="Ingrese el nombre" />
                  </div>

                  <!-- Tipo de Layout -->
                  <div class="relative block dynamic-field col-span-8 sm:col-span-6 lg:col-span-3 xl:col-span-2">
                    <label class="block text-sm font-medium text-gray-800 mb-1.5">Tipo</label>
                    <select v-model="localReport.layoutType" class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2">
                      <option value="seleccione">Seleccionar...</option>
                      <option value="empresa">Empresa</option>
                      <option value="pais">País</option>
                    </select>
                  </div>
                </div>
                <!-- Sección Datos Condiciones -->
                <div class="mb-5 col-span-8 sm:col-span-3 lg:col-span-2 pb-2 sm:pb-0">
                  <p class="text-base font-semibold text-gray-700">Condiciones</p>
                </div>
                <!-- Tabla de Columnas -->
                <div class="table-scroll z-0 pb-6">
                  <div class="relative overflow-x-auto rounded-lg h-full">
                    <table class="min-w-full table-auto shadow-lg">
                      <thead class="h-14">
                        <tr>
                          <!-- Columna para el botón de eliminar -->
                          <th class="text-left text-sm font-medium text-gray-800 mb-1.5" style="z-index: 1; width: 50px;"></th>
                          <th class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5" style="z-index: 1">Id</th>
                          <th class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5" style="z-index: 1">Tipo</th>
                          <th class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5" style="z-index: 1">Valor</th>
                          <th class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5" style="z-index: 1">Operación</th>
                          <th class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5" style="z-index: 1">Condición</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(col, index) in localReport.columns" :key="col.id">
                          <!-- Nueva columna para el botón de eliminar -->
                          <td class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5">
                            <button @click="deleteColumn(index)" class="text-red-600">x</button>
                          </td>

                          <!-- Columna de ID correctamente alineada -->
                          <td class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5">{{ col.id }}</td>

                          <!-- Columna de Tipo -->
                          <td class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5">
                            <select v-model="col.tipo" class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2">
                              <option value="">Seleccionar...</option>
                              <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
                            </select>
                          </td>

                          <!-- Columna de Valor -->
                          <td class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5">
                            <select v-model="col.valor" class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2">
                              <option value="">Seleccionar...</option>
                              <option v-for="valor in valores[col.tipo]" :key="valor" :value="valor">{{ valor }}
                              </option>
                            </select>
                          </td>

                          <!-- Columna de Condición -->
                          <td class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5">
                            <select v-model="col.condicion" class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2">
                              <option value="">Seleccionar...</option>
                              <option v-for="cond in condiciones" :key="cond" :value="cond">{{ cond }}</option>
                            </select>
                          </td>

                          <!-- Columna de Complemento -->
                          <td class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5">
                            <input v-model="col.complemento" type="text" class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                              placeholder="Valor Condición" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- Botón para agregar columnas -->
                  <div class="flex justify-center mt-3">
                    <button @click.prevent="addColumn" class="inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer font-semibold py-1 text-base">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 bg-white shadow-md h-24 rounded-br-md rounded-bl-md">
            <hr class="pb-5">
            <button @click="router.push('/reports')"
              class="inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300 cursor-pointer font-semibold py-1 text-base mr-3">
              Cancelar
            </button>
            <button @click="saveReport" class="inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer font-semibold py-1 text-base">
              {{ isNew ? "Guardar" : "Actualizar" }}
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
