<template>
    <div class="p-5 bg-white shadow-md rounded-md">
      <h2 class="text-lg font-semibold">{{ isEditing ? 'Editar Reporte' : 'Crear Reporte' }}</h2>
      <input v-model="report.name" class="border rounded-md p-2 w-full mt-2" placeholder="Nombre del Reporte" />
      <div class="flex justify-end gap-2 mt-4">
        <button @click="close" class="bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancelar</button>
        <button @click="save" class="bg-blue-600 text-white px-4 py-2 rounded">{{ isEditing ? 'Guardar' : 'Agregar' }}</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  
  const props = defineProps<{ reportId: string | null }>();
  const emit = defineEmits(['close', 'save']);
  
  const report = ref({ id: '', name: '' });
  const isEditing = ref(false);
  
  watch(() => props.reportId, (newId) => {
    if (newId) {
      isEditing.value = true;
      report.value = { id: newId, name: 'Ejemplo de Reporte' }; // Simulación de carga de datos
    } else {
      isEditing.value = false;
      report.value = { id: Date.now().toString(), name: '' };
    }
  }, { immediate: true });
  
  const save = () => {
    emit('save', report.value);
    emit('close');
  };
  
  const close = () => {
    emit('close');
  };
  </script>
  