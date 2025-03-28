<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['search']);
const searchText = ref('');

const emitSearch = () => {
  emit('search', searchText.value.trim());
};
</script>

<template>
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
          v-model="searchText"
          placeholder="Buscar..."
          type="text"
          autocomplete="off"
          class="bg-white pl-9 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent block w-full shadow-sm text-sm border rounded-md py-2 px-2"
          @keyup.enter="emitSearch"
        />
      </div>
      <button
        @click="emitSearch"
        type="button"
        class="mr-2 inline-flex text-sm justify-center items-center py-1.5 px-4 border border-transparent shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer"
      >
        Buscar
      </button>
    </div>
  </template>
  