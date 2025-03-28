<!-- ✅ DynamicColumsTable.vue -->
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import FormInput from "../form/FormInput.vue";
import FormSelect from "../form/FormSelect.vue";

const props = defineProps<{
  columns: Record<string, any>[];
  tipos: string[];
  valores: Record<string, string[]>;
  condiciones: string[];
}>();

const emit = defineEmits(["update:columns", "delete"]);

const updateColumn = (index: number, key: string, value: string) => {
  const updated = [...props.columns];
  updated[index][key] = value;
  emit("update:columns", updated);
};
</script>

<template>
  <table class="min-w-full table-auto shadow-lg">
    <thead class="h-14">
      <tr>
        <th class="w-10"></th>
        <th v-for="header in ['Tipo', 'Valor', 'Condición', 'Complemento']" :key="header" class="text-left px-2 text-sm">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(col, index) in columns" :key="col.id">
        <td>
          <button class="text-red-600" @click="$emit('delete', index)">x</button>
        </td>
        <td>
          <FormSelect
            v-model="col.tipo"
            :options="tipos"
            placeholder="Tipo"
          />
        </td>
        <td>
          <FormSelect
            v-model="col.valor"
            :options="valores[col.tipo] || []"
            placeholder="Valor"
          />
        </td>
        <td>
          <FormSelect
            v-model="col.condicion"
            :options="condiciones"
            placeholder="Condición"
          />
        </td>
        <td>
          <FormInput
            v-model="col.complemento"
            placeholder="Complemento"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>