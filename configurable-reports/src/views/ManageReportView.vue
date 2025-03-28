// ✅ ManageReportView.vue
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useReportStore } from "../store/report-store";

import FormInput from "../components/form/FormInput.vue";
import FormSelect from "../components/form/FormSelect.vue";
import BaseButton from "../components/base/BaseButton.vue";
import DynamicColumnsTable from "../components/table/DynamicColumsTable.vue";

const router = useRouter();
const route = useRoute();
const reportStore = useReportStore();
const isNew = computed(() => route.params.code === "new");

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

const tipos = ["Empleado", "Concepto"];
const valores = {
  Empleado: ["Edad", "Banco", "Sexo"],
  Concepto: ["Neto", "TD", "TP"],
};
const condiciones = ["<>", "<", ">", "<=", ">=", "="];

onMounted(() => {
  if (!isNew.value) {
    const report = reportStore.reports.find(
      (r) => r.code === route.params.code
    );
    if (report) {
      localReport.value = { ...report };
    } else {
      alert("El reporte no existe.");
      router.push("/reports");
    }
  }
});

const addColumn = () => {
  const lastId =
    localReport.value.columns.length > 0
      ? localReport.value.columns[localReport.value.columns.length - 1].id
      : 0;

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

const deleteColumn = (index: number) => {
  localReport.value.columns.splice(index, 1);
};

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
    reportStore.addReport({ ...localReport.value });
  } else {
    reportStore.updateReport(
      localReport.value.code,
      localReport.value.name,
      localReport.value.layoutType,
      localReport.value.columns
    );
  }

  router.push("/reports");
};
</script>

<template>
  <div class="w-full overflow-hidden mb-1">
    <div class="h-full px-5">
      <div class="bg-gray-50 pb-4">
        <div class="leading-4 pt-responsive">
          <p class="text-3xl font-semibold text-shadow text-blue-900">
            {{ isNew ? "Agregar Reporte" : "Editar Reporte" }}
          </p>
        </div>
      </div>

      <form class="pt-responsive w-full">
        <div class="px-6 py-4 bg-white rounded shadow-md">
          <p class="text-base font-semibold text-gray-700 mb-4">Datos Básicos</p>
          <div class="grid grid-cols-6 gap-4">
            <FormInput
              v-model="localReport.code"
              label="Código"
              placeholder="Ingrese el código"
              :disabled="!isNew"
            />
            <FormInput
              v-model="localReport.name"
              label="Nombre"
              placeholder="Ingrese el nombre"
            />
            <FormSelect
              v-model="localReport.layoutType"
              label="Tipo"
              :options="['seleccione', 'empresa', 'pais']"
            />
          </div>

          <div class="mt-8">
            <p class="text-base font-semibold text-gray-700 mb-2">Condiciones</p>
            <DynamicColumnsTable
              v-model:columns="localReport.columns"
              :tipos="tipos"
              :valores="valores"
              :condiciones="condiciones"
              @delete="deleteColumn"
            />
            <div class="flex justify-center mt-3">
              <BaseButton color="blue" @click.prevent="addColumn">+</BaseButton>
            </div>
          </div>
        </div>

        <div class="p-5 bg-white shadow-md h-24 rounded-b-md">
          <hr class="pb-5" />
          <BaseButton color="gray" @click="router.push('/reports')" class="mr-3">
            Cancelar
          </BaseButton>
          <BaseButton color="blue" @click="saveReport">
            {{ isNew ? "Guardar" : "Actualizar" }}
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
