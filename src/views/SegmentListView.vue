<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const reportCode = route.params.code || "Desconocido";
const segments = ref<any[]>([]);
const isModalOpen = ref(false);
const newSegment = ref({
  id: "",
  name: "",
  type: "Encabezado",
});

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/externos/reports/${reportCode}/segments`);
    const data = await res.json();
    segments.value = data;
  } catch (error) {
    console.error("\u274C Error al cargar los segmentos:", error);
    alert("No se pudieron cargar los segmentos del reporte.");
    router.push("/reports");
  }
});

const openAddSegmentModal = () => {
  newSegment.value = { id: "", name: "", type: "Encabezado" };
  isModalOpen.value = true;
};

const saveSegment = async () => {
  if (!newSegment.value.id.trim() || !newSegment.value.name.trim()) {
    alert("ID y Nombre son obligatorios.");
    return;
  }

  const typeMap: Record<string, string> = {
    "Encabezado": "constant",
    "Detalle": "detail",
    "Totales": "total",
  };

  try {
    await fetch(`http://localhost:3000/externos/reports/${reportCode}/segments/${newSegment.value.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newSegment.value.name,
        type: typeMap[newSegment.value.type],
      }),
    });

    const res = await fetch(`http://localhost:3000/externos/reports/${reportCode}/segments`);
    segments.value = await res.json();
    isModalOpen.value = false;
  } catch (error) {
    console.error("\u274C Error al guardar el segmento:", error);
    alert("No se pudo guardar el segmento.");
  }
};

const configureSegment = (segment: any) => {
  router.push({
    path: `/reports/${reportCode}/segments/${segment.id}/configure`,
    query: {
      name: segment.name,
      type: segment.type,
    },
  });
};

const deleteSegment = async (segmentId: string) => {
  const confirmDelete = confirm(`\u00bfSeguro que deseas eliminar el segmento ${segmentId}?`);
  if (!confirmDelete) return;

  try {
    await fetch(`http://localhost:3000/externos/reports/${reportCode}/segments/${segmentId}`, {
      method: "DELETE",
    });
    segments.value = segments.value.filter(segment => segment.id !== segmentId);
  } catch (error) {
    console.error("\u274C Error al eliminar el segmento:", error);
    alert("No se pudo eliminar el segmento.");
  }
};

const goToReportList = () => {
  router.push("/reports");
};
</script>


<template>
  <div class="w-full overflow-hidden mb-1">
    <div class="h-full px-5">
      <!-- Encabezado -->
      <div class="bg-gray-50 sm:pb-5 lg:pb-10">
        <div class="leading-4 pt-responsive">
          <p class="text-3xl font-semibold text-shadow text-blue-900">
            Gestión de Segmentos - Reporte {{ reportCode }}
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
              @click="goToReportList"
              class="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
            ← Volver
            </button>
            <button
              @click="openAddSegmentModal"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Agregar Segmento
            </button>
          </div>
        </div>
      </div>

      <!-- 📌 Tabla de Segmentos -->
      <div class="table-scroll z-0 pb-6">
        <div class="relative overflow-x-auto rounded-lg h-full scroll">
          <table class="min-w-full table-auto shadow-lg">
            <thead class="h-14">
              <tr>
                <th class="sticky top-0 bg-white cursor-pointer">
                  <div
                    class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap"
                  >
                    Id
                  </div>
                </th>
                <th class="sticky top-0 bg-white cursor-pointer">
                  <div
                    class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap"
                  >
                    Nombre
                  </div>
                </th>
                <th class="sticky top-0 bg-white cursor-pointer">
                  <div
                    class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap"
                  >
                    Tipo
                  </div>
                </th>
                <th class="sticky top-0 bg-white cursor-pointer">
                  <div
                    class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap"
                  ></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="segment in segments"
                :key="segment.id"
                class="bg-white border-y-2 border-gray-100 h-tr hover:bg-gray-100"
              >
                <td class="p-3">
                  <div
                    class="max-w-xs overflow-hidden whitespace-pre-line text-ellipsis flex break-all justify-start"
                    style="inline-size: max-content"
                  >
                    {{ segment.id }}
                  </div>
                </td>
                <td class="p-3">
                  <div
                    class="max-w-xs overflow-hidden whitespace-pre-line text-ellipsis flex break-all justify-start"
                    style="inline-size: max-content"
                  >
                    {{ segment.name }}
                  </div>
                </td>
                <td class="p-3">
                  <div
                    class="max-w-xs overflow-hidden whitespace-pre-line text-ellipsis flex break-all justify-start"
                    style="inline-size: max-content"
                  >
                    {{ segment.type }}
                  </div>
                </td>
                <td class="px-3 sticky right-0 bg-white">
                  <div class="flex py-2.5 justify-end gap-1">
                    <svg
                      @click="configureSegment(segment)"
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
                      @click="deleteSegment(segment.id)"
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

      <!-- 📌 Modal de Agregar Segmento -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 class="text-xl font-semibold mb-4 text-blue-900">
            Agregar Segmento
          </h2>
          <label class="block text-sm font-medium text-gray-800 mb-1"
            >ID del Segmento</label
          >
          <input
            v-model="newSegment.id"
            class="border border-gray-300 p-2 rounded w-full mb-3"
          />

          <label class="block text-sm font-medium text-gray-800 mb-1"
            >Nombre del Segmento</label
          >
          <input
            v-model="newSegment.name"
            class="border border-gray-300 p-2 rounded w-full mb-3"
          />

          <label class="block text-sm font-medium text-gray-800 mb-1"
            >Tipo de Segmento</label
          >
          <select
            v-model="newSegment.type"
            class="border border-gray-300 p-2 rounded w-full"
          >
            <option value="Encabezado">Encabezado</option>
            <option value="Detalle">Detalle</option>
            <option value="Totales">Totales</option>
          </select>

          <div class="flex justify-end space-x-2 mt-5">
            <button
              @click="isModalOpen = false"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              @click="saveSegment"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
