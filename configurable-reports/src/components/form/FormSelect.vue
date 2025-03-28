<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  options: string[];
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-800 mb-1.5">{{ label }}</label>
    <select
      :value="modelValue"
      @change="(e) => emit('update:modelValue', (e.target as HTMLSelectElement).value)"
      class="bg-white border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
    >
      <option value="">{{ placeholder || 'Seleccionar...' }}</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>
