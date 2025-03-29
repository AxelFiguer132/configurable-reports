<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 📌 Obtener valores de la URL correctamente
const reportCode = ref(route.params.code || "Desconocido");
const segmentId = ref(route.params.segmentId || "");
const segmentName = ref(route.query.name || "");
const segmentType = ref(route.query.type || "Encabezado");

// 📌 Estado del segmento
const segment = ref({
  id: segmentId.value,
  name: segmentName.value,
  type: segmentType.value,
  dateFormat: "dd/mm/yyyy",
  removeSpaces: false,
  removeSpecialChars: false,
  nameOrder: "name",
  decimalSeparator: ".",
  lines: [] as Array<{
    id: number;
    etiqueta: string;
    tipo: string;
    valor: string;
    longitud: number;
    justificacion: string;
    separador: string;
    relleno: string;
    condicion: string;
  }>,
});

// 📌 Asignar valores al montar
onMounted(async () => {
  segment.value.id = segmentId.value;
  segment.value.name = segmentName.value;
  segment.value.type = segmentType.value;

  try {
    const res = await fetch(`http://localhost:3000/externos/reports/${reportCode.value}`);
    const data = await res.json();

    const id = String(segmentId.value); // aseguras que es string
    const lines = data.segments?.M?.[id]?.M?.lines?.L || [];

    segment.value.lines = lines.map((line: any, index: number) => ({
      id: (index + 1) * 10,
      etiqueta: line.M.label.S || "",
      tipo: line.M.dataType.S || "",
      valor: line.M.value?.S || "",
      longitud: parseInt(line.M.length?.N || "0", 10),
      justificacion: line.M.alignment?.S === "right" ? "Derecha" : "Izquierda",
      separador: line.M.separator?.S || "",
      relleno: line.M.padding?.S || "",
      condicion: "", // Este puedes mapearlo después si usas condiciones
    }));
  } catch (error) {
    console.error("❌ Error al cargar líneas:", error);
    alert("No se pudieron cargar las líneas del segmento.");
  }
});


// 📌 Guardar segmento
const saveSegment = async () => {
  try {
    // Mapea cada línea al DTO esperado por el backend
    const payload = segment.value.lines.map(line => ({
      label: line.etiqueta,
      dataType: line.tipo,
      value: line.valor || '',
      length: line.longitud,
      padding: line.relleno || ' ',
      alignment: line.justificacion.toLowerCase() === 'derecha' ? 'right' : 'left',
      separator: line.separador || '',
      formatOptions: {
        dateFormat: segment.value.dateFormat,
        nameOrder: segment.value.nameOrder,
        currencyFormat: {
          decimalSeparator: segment.value.decimalSeparator
        }
      }
      // Puedes agregar condition cuando lo implementes
    }));

    await fetch(`http://localhost:3000/externos/reports/${reportCode.value}/segments/${segmentId.value}/lines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    alert("✅ Líneas del segmento guardadas exitosamente.");
    router.push(`/reports/${reportCode.value}/segments`);

  } catch (error) {
    console.error("❌ Error al guardar el segmento:", error);
    alert("Hubo un error al guardar las líneas del segmento.");
  }
};


// 📌 Volver a la lista de segmentos
const goToSegmentList = () => {
  router.push(`/reports/${reportCode.value}/segments`);
};

// 📌 Agregar una nueva línea dinámica
const addLine = () => {
  const lastId =
    segment.value.lines.length > 0
      ? segment.value.lines[segment.value.lines.length - 1].id
      : 0;

  segment.value.lines.push({
    id: lastId + 10,
    etiqueta: "",
    tipo: "",
    valor: "",
    longitud: 0,
    justificacion: "Izquierda",
    separador: "",
    relleno: "",
    condicion: "",
  });
};

// 📌 Eliminar una línea específica
const deleteLine = (index: number) => {
  segment.value.lines.splice(index, 1);
};

// 📌 Opciones disponibles
const tipos = ["Constante", "Empleado", "Concepto"];
const valores = {
  Empleado: ["NOMBRECOM", "EDAD", "SEXO", "NUMEROEM"],
  Concepto: ["NETO", "TD", "TP"],
};

const modalOpen = ref(false);
const modalValues = ref<string[]>([]);
const currentLine = ref<any>(null);

const openModal = (line: any) => {
  modalValues.value = valores[line.tipo as keyof typeof valores] || [];
  currentLine.value = line;
  modalOpen.value = true;
};

const selectFromModal = (value: string) => {
  if (currentLine.value) {
    currentLine.value.valor = value;
    modalOpen.value = false;
  }
}
</script>

<template>
  <div class="w-full overflow-hidden mb-1">
    <div class="h-full px-5">
      <div class="bg-gray-50 sm:pb-5 lg:pb-10">
        <div class="leading-4 pt-responsive">
          <p class="text-3xl font-semibold text-shadow text-blue-900">
            Configuración del Reporte {{ reportCode }} - Segmento
            {{ segmentId }}
          </p>
        </div>
      </div>

      <!-- Formulario de Configuración del Segmento -->
      <div class="bg-white shadow-md rounded-md p-6 mt-4">
        <p class="text-lg font-semibold text-gray-700 mb-4">Datos generales</p>
        <div class="grid grid-cols-12 gap-4">
          <!-- Código del Segmento -->
          <div class="col-span-4 sm:col-span-3 lg:col-span-2">
            <label class="block text-sm font-medium text-gray-800 mb-1"
              >Código del segmento</label
            >
            <input
              v-model="segment.id"
              class="border border-gray-300 p-2 rounded w-full"
              disabled
            />
          </div>

          <!-- Tipo de Segmento -->
          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label class="block text-sm font-medium text-gray-800 mb-1"
              >Tipo de Segmento</label
            >
            <input
              v-model="segment.type"
              class="border border-gray-300 p-2 rounded w-full"
              disabled
            />
          </div>

          <!-- Formato de Fecha -->
          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label class="block text-sm font-medium text-gray-800 mb-1"
              >Formato de fecha</label
            >
            <select
              v-model="segment.dateFormat"
              class="border border-gray-300 p-2 rounded w-full"
            >
              <option value="dd/mm/yyyy">dd/mm/yyyy</option>
              <option value="yyyy/mm/dd">yyyy/mm/dd</option>
              <option value="mm/dd/yyyy">mm/dd/yyyy</option>
            </select>
          </div>

          <!-- Separador de Decimales -->
          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label class="block text-sm font-medium text-gray-800 mb-1"
              >Separador de decimales</label
            >
            <input
              v-model="segment.decimalSeparator"
              class="border border-gray-300 p-2 rounded w-full"
            />
          </div>

          <!-- Orden del nombre -->
          <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <label class="block text-sm font-medium text-gray-800 mb-1"
              >Orden del nombre</label
            >
            <select
              v-model="segment.nameOrder"
              class="border border-gray-300 p-2 rounded w-full"
            >
              <option value="name">
                Nombre / Apellido Materno / Apellido Paterno
              </option>
              <option value="last name">
                Apellido Materno / Apellido paterno / Nombre
              </option>
            </select>
          </div>

          <!-- Eliminar espacios -->
          <div
            class="col-span-6 sm:col-span-3 lg:col-span-2 flex items-center mt-6"
          >
            <input
              type="checkbox"
              id="removeSpaces"
              v-model="segment.removeSpaces"
              class="mr-2"
            />
            <label for="removeSpaces" class="text-sm text-gray-800">
              Eliminar espacios
            </label>
          </div>

          <!-- Eliminar caracteres especiales -->
          <div
            class="col-span-6 sm:col-span-3 lg:col-span-2 flex items-center mt-6"
          >
            <input
              type="checkbox"
              id="removeSpecialChars"
              v-model="segment.removeSpecialChars"
              class="mr-2"
            />
            <label for="removeSpecialChars" class="text-sm text-gray-800">
              Eliminar caracteres especiales
            </label>
          </div>
        </div>

        <!-- Tabla de Líneas Dinámicas -->
        <p class="text-lg font-semibold text-gray-700 mb-4">
          Estructura del reporte
        </p>
        <div class="relative overflow-x-auto rounded-lg">
          <div class="relative overflow-x-auto rounded-lg h-full">
            <table class="min-w-full table-auto shadow-lg">
              <thead class="h-14">
                <tr>
                  <th
                    class="text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1; width: 50px"
                  ></th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    ID
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Etiqueta
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Tipo
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Valor
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Longitud
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Justificación
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Separador
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Relleno
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Tipo de condición
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Valor condición
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Operador
                  </th>
                  <th
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                    style="z-index: 1"
                  >
                    Condición
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(line, index) in segment.lines" :key="line.id">
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <button @click="deleteLine(index)" class="text-red-600">
                      x
                    </button>
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    {{ line.id }}
                  </td>
                  <td class="p-2">
                    <input
                      v-model="line.etiqueta"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    />
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <select
                      v-model="line.tipo"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    >
                      <option v-for="tipo in tipos" :key="tipo" :value="tipo">
                        {{ tipo }}
                      </option>
                    </select>
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <div class="relative flex items-center">
                      <input
                        v-model="line.valor"
                        class="bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent w-full shadow-sm text-sm rounded-md py-2 px-2 pr-8"
                        placeholder="Escribe o selecciona..."
                      />
                      <button
                        type="button"
                        class="absolute right-2 text-blue-600 hover:text-blue-800"
                        @click="openModal(line)"
                        title="Buscar opción"
                      >
                        🔍
                      </button>
                    </div>
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <input
                      v-model="line.longitud"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                      type="double"
                    />
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <select
                      v-model="line.justificacion"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    >
                      <option value="Izquierda">Izquierda</option>
                      <option value="Derecha">Derecha</option>
                    </select>
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <input
                      v-model="line.separador"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    />
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <input
                      v-model="line.relleno"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    />
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <select
                      v-model="s"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    >
                      <option value="Izquierda">Empleado</option>
                      <option value="Derecha">Concepto</option>
                    </select>
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <select
                      v-model="s"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    >
                      <option value="Izquierda"></option>
                      <option value="Derecha">Derecha</option>
                    </select>
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <select
                      v-model="s"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    >
                      <option value="Izquierda">Izquierda</option>
                      <option value="Derecha">Derecha</option>
                    </select>
                  </td>
                  <td
                    class="px-3 py-2 text-left text-sm font-medium text-gray-800 mb-1.5"
                  >
                    <input
                      v-model="s"
                      class="bg-white pl border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-center mt-3">
            <button
              @click="addLine"
              class="inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer font-semibold py-1 text-base"
            >
              +
            </button>
          </div>
        </div>
        <div class="p-5 bg-white shadow-md h-24 rounded-br-md rounded-bl-md">
          <hr class="pb-5" />
          <button
            @click="goToSegmentList"
            class="inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300 cursor-pointer font-semibold py-1 text-base mr-3"
          >
            Cancelar
          </button>
          <button
            @click="saveSegment"
            class="inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer font-semibold py-1 text-base"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="modalOpen"
    class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-md shadow-md w-full max-w-md">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Opciones para "{{ currentLine?.tipo }}"
      </h3>

      <ul class="space-y-2 max-h-60 overflow-y-auto">
        <li
          v-for="value in modalValues"
          :key="value"
          class="cursor-pointer text-blue-600 hover:text-blue-800 border-b py-1"
          @click="selectFromModal(value)"
        >
          {{ value }}
        </li>
      </ul>

      <div class="mt-6 text-right">
        <button
          @click="modalOpen = false"
          class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md text-sm"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
