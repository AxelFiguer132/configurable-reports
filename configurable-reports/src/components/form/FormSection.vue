<template>
    <div class="mb-5 col-span-8 sm:col-span-3 lg:col-span-2 pb-2 sm:pb-0">
      <p class="text-base font-semibold text-gray-700">{{ title }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string;
  }>();
  </script>
  